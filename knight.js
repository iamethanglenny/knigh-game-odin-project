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

    const startStr = start.toString();
    const endStr = end.toString();

    if (startStr === endStr) {
        return [start];
    }

    const queue = [[start, [start]]];
    const visited = new Set([startStr]);

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