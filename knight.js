class ChessBoard {
    constructor() {
        this.BOARD_SIZE = 8;
    }

    getValidMoves(pos) {
        // All possible L-shaped moves a knight can make
        const moveOffsets = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];

        return moveOffsets
            .map(([dx, dy]) => [pos[0] + dx, pos[1] + dy])
            .filter(([x, y]) => this.isOnBoard(x, y));
    }

    isOnBoard(x, y) {
        return x >= 0 && x < this.BOARD_SIZE && 
               y >= 0 && y < this.BOARD_SIZE;
    }

    validatePosition(position) {
        if (!Array.isArray(position) || position.length !== 2) {
            throw new Error('Position must be an array of two numbers');
        }
        if (!this.isOnBoard(position[0], position[1])){
            throw new Error('Position must be on the board (0-7)');
        }
    }

    findPath(start, end) {
        this.validatePosition(start);
        this.validatePosition(end);

        const startStr = start.toString();
        const endStr = end.toString();
    
        if (startStr === endStr) {
            return [start];
        }
    
        const queue = [[start, [start]]];
        const visited = new Set([startStr]);

        while (queue.length > 0) {
            const [currentPos, path] = queue.shift();
            
            // Get all valid moves from current position
            for (const nextPos of this.getValidMoves(currentPos)) {
                const nextPosStr = nextPos.toString();
                
                if (nextPosStr === endStr) {
                    return [...path, nextPos];
                }
                
                if (!visited.has(nextPosStr)) {
                    visited.add(nextPosStr);
                    queue.push([nextPos, [...path, nextPos]]);
                }
            }
        }
        
        return null;
    }
}

function knightMoves(start, end) {
    try {
        const board = new ChessBoard();
        const path = board.findPath(start, end);

        if (!path) {
            return "No valid path found!";
        }

        const moves = path.length - 1;
        let output = `You made it in ${moves} moves! Here's your path:\n`;

        path.forEach(position => {
            output += `[${position[0]},${position[1]}]\n`;
        });

        return output;
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

// Test cases
console.log(knightMoves([3,3], [4,3]));
console.log(knightMoves([0,0], [7,7]));
console.log(knightMoves([3,3], [3,3]));

// Error cases
console.log(knightMoves([8,8], [3,3])); // Position out of bounds
console.log(knightMoves([3,3], [-1,5])); // Position out of bounds