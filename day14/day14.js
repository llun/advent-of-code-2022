const fs = require("fs");
const path = require("path");

const input = (filename) =>
  fs
    .readFileSync(path.resolve(__dirname, filename))
    .toString("utf-8")
    .trim()
    .split("\n")
    .map((line) =>
      line
        .split(" -> ")
        .map((item) => item.split(",").map((item) => parseInt(item, 10)))
    );

const xBoundary = (input) => {
  const sorted = input.flat().sort((a, b) => a[0] - b[0]);
  const minX = sorted[0][0] - 1;
  const maxX = sorted[sorted.length - 1][0] + 1;
  return [minX, maxX];
};

const yBoundary = (input) => {
  const sorted = input.flat().sort((a, b) => a[1] - b[1]);
  const minY = sorted[0][1];
  const maxY = sorted[sorted.length - 1][1];
  return [minY, maxY + 1];
};

const grid = (input) => {
  const [minX, maxX] = xBoundary(input);
  const [minY, maxY] = yBoundary(input);

  const grid = new Array(maxY);
  for (let i = 0; i < maxY; i++) {
    grid[i] = new Array(maxX - minX).fill(".");
  }

  for (const line of input) {
    for (let i = 0; i < line.length - 1; i++) {
      const [start, end] = [line[i], line[i + 1]];

      const diffX = start[0] - end[0];
      const diffY = start[1] - end[1];
      if (diffX !== 0) {
        const sorted = [start, end].sort((a, b) => a[0] - b[0]);
        const y = start[1];
        for (let x = sorted[0][0]; x <= sorted[1][0]; x++) {
          grid[y][x - minX] = "#";
        }
        continue;
      }

      if (diffY !== 0) {
        const sorted = [start, end].sort((a, b) => a[1] - b[1]);
        const x = start[0] - minX;
        for (let y = sorted[0][1]; y < sorted[1][1]; y++) {
          grid[y][x] = "#";
        }
        continue;
      }
    }
  }

  return grid;
};

const dropSand = (grid, minX, maxX) => {
  let x = 500 - minX;
  let y = 0;

  while (true) {
    if (x < 0) return false;
    if (x >= grid[0].length - 1) return false;
    if (y >= grid.length) return false;

    if (grid[y][x] !== ".") {
      if (grid[y][x - 1] === ".") {
        x--;
        y++;
        continue;
      }
      if (grid[y][x + 1] === ".") {
        x++;
        y++;
        continue;
      }
      break;
    } else {
      y++;
    }
  }

  if (y === 1) {
    grid[y - 1][x] = "o";
    return false;
  }
  grid[y - 1][x] = "o";
  return true;
};

const print = (grid) => {
  console.log(grid.map((line) => line.join(" ")).join("\n"));
};

const solve1 = (input) => {
  const table = grid(input);

  const [minX, maxX] = xBoundary(input);
  let counter = 0;
  while (true) {
    if (!dropSand(table, minX, maxX)) {
      break;
    }
    counter++;
  }

  return counter;
};

// console.log(solve1(input("sample")));
// console.log(solve1(input("input.txt")));

const gridWithFloor = (input) => {
  const [minX, maxX] = [0, 1000];
  const [minY, maxY] = yBoundary(input);

  const floorY = maxY + 2;

  const grid = new Array(floorY);
  for (let i = 0; i < floorY; i++) {
    grid[i] = new Array(maxX - minX).fill(".");
  }

  for (const line of input) {
    for (let i = 0; i < line.length - 1; i++) {
      const [start, end] = [line[i], line[i + 1]];

      const diffX = start[0] - end[0];
      const diffY = start[1] - end[1];
      if (diffX !== 0) {
        const sorted = [start, end].sort((a, b) => a[0] - b[0]);
        const y = start[1];
        for (let x = sorted[0][0]; x <= sorted[1][0]; x++) {
          grid[y][x - minX] = "#";
        }
        continue;
      }

      if (diffY !== 0) {
        const sorted = [start, end].sort((a, b) => a[1] - b[1]);
        const x = start[0] - minX;
        for (let y = sorted[0][1]; y < sorted[1][1]; y++) {
          grid[y][x] = "#";
        }
        continue;
      }
    }
  }

  for (let x = 0; x < grid[grid.length - 1].length; x++) {
    grid[grid.length - 1][x] = "#";
  }

  return [grid, minX, maxX];
};

const solve2 = (input) => {
  const [table, minX, maxX] = gridWithFloor(input);
  let counter = 0;
  while (true) {
    if (!dropSand(table, minX, maxX)) {
      counter++;
      break;
    }

    counter++;
  }
  return counter;
};

console.log(solve2(input("sample")));
console.log(solve2(input("input.txt")));
