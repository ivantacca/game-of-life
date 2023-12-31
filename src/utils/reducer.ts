import type { Cell } from "types";

export function toggleInitialCell(activeCells: Array<Cell>, data: Cell) {
  const isActive = activeCells.find((c) => c.x === data.x && c.y === data.y);
  if (isActive) {
    // If cell alive, remove from active cells list
    const newCells = activeCells.filter(
      (c) => !(c.x === data.x && c.y === data.y)
    );
    return newCells;
  } else {
    // If cell dead, add to active cells list
    return [...activeCells, data];
  }
}

export function getNextGeneration(aliveCells: Array<Cell>) {
  const neighborOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  // Create a map to count the number of live neighbors for each cell
  const neighborCountMap: any = new Map();

  // Iterate through the alive cells and update the neighbor counts
  for (const { x, y } of aliveCells) {
    for (const [dx, dy] of neighborOffsets) {
      const neighborX = x + dx;
      const neighborY = y + dy;
      const neighborKey = `${neighborX}-${neighborY}`;

      // Increment the neighbor count for the current cell
      neighborCountMap.set(
        neighborKey,
        (neighborCountMap.get(neighborKey) || 0) + 1
      );
    }
  }

  // Create the next generation of alive cells based on the rules
  const nextGeneration = [];

  for (const { x, y } of aliveCells) {
    const neighborCount = neighborCountMap.get(`${x}-${y}`);

    if (neighborCount === 2 || neighborCount === 3) {
      // Rule 2: Cell lives on
      nextGeneration.push({ x, y });
    }
  }

  // Iterate through neighbor counts to apply Rule 4
  for (const [key, count] of neighborCountMap.entries()) {
    const [neighborX, neighborY] = key.split("-").map(Number);

    if (
      !aliveCells.some(({ x, y }) => x === neighborX && y === neighborY) &&
      count === 3
    ) {
      // Rule 4: Dead cell becomes alive
      nextGeneration.push({ x: neighborX, y: neighborY });
    }
  }
  return nextGeneration;
}

export function getInitialFromFile(data: any) {
  let aliveFromFile: Array<Cell> = [];
  data.population_state.map((row: Array<any>, y: number) => {
    row.map((cell: string, x: number) => {
      if (cell === "*") aliveFromFile.push({ x, y });
      return cell
    });
    return row
  });
  return aliveFromFile;
}

export function getAliveFromGeneration(cells: Array<Cell>, generation: number) {
  if (!generation) return cells;
  else {
    let newGeneration = cells;
    for (let g = 0; g < generation; g++) {
      newGeneration = getNextGeneration(newGeneration);
    }
    return newGeneration;
  }
}
