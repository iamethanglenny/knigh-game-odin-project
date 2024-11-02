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

    function getValidMoves(pos) {
        const moves = [
            [pos[0] + 2, pos[1] + 1], [pos[0] + 2, pos[1] - 1],
            [pos[0] - 2, pos[1] + 1], [pos[0] - 2, pos[1] - 1],
            [pos[0] + 1], [pos[1] + 2], [pos[0] + 1], [pos[1] - 2],
            [pos[0] - 1], [pos[1] + 2], [pos[0] - 1], [pos[1] - 2]
        ];

        return moves.filter(move => 
            move[0] >= 0 && move[0] <= 7 &&
            move[1] >= 0 && move[1] <= 7
        );
    }

    

    while (queue.length > 0) {
        const [currentPos, path] = queue.shift();

        for (const nextPos of getValidMoves(currentPos)) {
            const nextPosStr = nextPos.toString();

            if (nextPosStr === endStr) {
                return [...path, nextPos];
            }

            if (!visited.has(nextPosStr)) {
                visited.add(nextPosStr);
                queue.push([nextPos, [...path, nextPos]])
            }
        }
    }

    return null;
}