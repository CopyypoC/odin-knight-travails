// x and y are between 0 and 7 for 8x8 chess board
function isValidMove([x, y]) {
  if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
    return true;
  }
  return false;
}

// Start and end are arrays that hold the vertex/coordinate
// i.e. [0,0] for upper left corner of the board
export function knightMoves(start, end) {
  let curr = start;
  let x = curr[0];
  let y = curr[1];
  let xShift = 0;
  let yShift = 0;
  const queue = [curr];
  const visited = new Set();
  const routes = new Map();
  visited.add(JSON.stringify(curr));

  while (queue.length !== 0) {
    x = queue[0][0];
    y = queue[0][1];

    // At the end point, reconstruct the path using the chain of
    // coordinates saved in the routes Map
    if (x === end[0] && y === end[1]) {
      const path = [];
      curr = JSON.stringify(end);

      while (curr) {
        path.unshift(curr);
        curr = routes.get(curr);
      }

      return path.map((coord) => JSON.parse(coord));
    }
    // Shifting for all possible moves.
    // x and y are the shifts. Start at 1 and 2
    // * = flip x
    //  +x, +y 0
    //  +x, -y 1 *
    //  -x, +y 2
    //  -x, -y 3 * x and y swap to 2 and 1
    //  +x, +y 4
    //  +x, -y 5 *
    //  -x, +y 6
    //  -x, -y 7 *
    // Possible moves are x ± 1, y ± 2 and x ± 2, y ± 1.
    // This loop is organized to flip yShift every iteration
    // and flip xShift every other iteration. Breakpoint
    // set at i = 3 to swap x and y shift to 2 and 1
    // instead of 1 and 2 to get the last 4 moves.
    xShift = 1;
    yShift = 2;
    for (let i = 0; i < 8; i++) {
      let nextCoord = [x + xShift, y + yShift];
      if (isValidMove(nextCoord) && !visited.has(JSON.stringify(nextCoord))) {
        queue.push(nextCoord);
        // Each array is a reference or pointer to a specific instance,
        // so each new array will point to a different one even if 2
        // hold the same values. Convert them to strings instead so
        // the unique value checking actually works.
        visited.add(JSON.stringify(nextCoord));
        // To create the path the knight takes, store the current
        // move as the value of the next move. This allows for
        // backward movement from the end of the path to the start
        // by continually finding the parent node.
        routes.set(JSON.stringify(nextCoord), JSON.stringify(curr));
      }

      yShift *= -1;
      if (i % 2 === 1) xShift *= -1;
      if (i === 3) {
        xShift = 2;
        yShift = 1;
      }
    }

    queue.shift();
    curr = queue[0];
    x = curr[0];
    y = curr[1];
  }
}
