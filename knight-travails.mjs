// Board - 2D Array
// Graph structure:
//  - Vertex is a subarray that represents a coordinate
//  - No explicit edges, moving from one vertex to another
//    is like an implicit edge
// Adjacency list to track moves:
//  - Array of linked lists
//  - The list represents the full move order of a certain
//    path taken
//  - Try every move order and return the shortest linked list
// [
//   (vertex1) -> (vertex2) -> (vertex3)
//   (vertex7) -> (vertex12) -> (vertex4)
// ]
// Search algorithm:
//  - Breadth first search, goes to all adjacent nodes first
//    used in the level order binary search
//  - All possible moves are the adjacent nodes
// [
//   [0,0], [0,1] ... [0,7]
//   [1,0], [1,1] ... [1,7]
//   ...
//   [7,0], [7,1] ... [7,7]
// ]

// Shifting
//  +x, +y 0
//  +x, -y 1 *
//  -x, +y 2
//  -x, -y 3 *
//  +x, +y 4
//  +x, -y 5 *
//  -x, +y 6
//  -x, -y 7 *

// Start and end are arrays that hold the vertex/coordinate
// i.e. [0,0] for upper left corner of the board
function isValidMove(x, y) {
  if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
    return true;
  }
  return false;
}

export function knightMoves(start, end) {
  let curr = start;
  let x = curr[0];
  let y = curr[1];
  let xShift = 0;
  let yShift = 0;
  const queue = [curr];
  const visited = new Set();

  while (queue.length !== 0) {
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
      if (
        isValidMove(x + xShift, y + yShift) &&
        !visited.has(JSON.stringify([x + xShift, y + yShift]))
      ) {
        queue.push([x + xShift, y + yShift]);
        visited.add(JSON.stringify([x + xShift, y + yShift]));
      }

      yShift *= -1;
      if (i % 2 === 1) xShift *= -1;
      if (i === 3) {
        xShift = 2;
        yShift = 1;
      }
    }

    x = queue[0][0];
    y = queue[0][1];
    if (x === end[0] && y === end[1]) {
      console.log(`Moved to [${x}, ${y}]`);
      return;
    }
    queue.shift();
    curr = queue[0];
    x = curr[0];
    y = curr[1];
    console.log(`Moved to [${x}, ${y}]`);
  }
  // Loop through queue until first item is not in the Set
  // Then curr is next queue item
}
