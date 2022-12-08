const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input"))
  .toString("utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split("").map((item) => parseInt(item, 10)));

const isVisible = (grid, itemCoordinate) => {
  const [x, y] = itemCoordinate;
  const currentColumn = grid.map((row) => row[x]);
  const currentRow = grid[y];
  const currentValue = grid[y][x];

  const top = Math.max(...currentColumn.slice(0, y));
  const bottom = Math.max(...currentColumn.slice(y + 1));
  const before = Math.max(...currentRow.slice(0, x));
  const after = Math.max(...currentRow.slice(x + 1));
  return (
    currentValue > top ||
    currentValue > bottom ||
    currentValue > before ||
    currentValue > after
  );
};

const solve1 = (input) => {
  const visibles = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const coordinate = [x, y];
      if (isVisible(input, coordinate)) visibles.push(coordinate);
    }
  }

  return visibles.length;
};

console.log(solve1(input));

const counter = (row, currentValue) => {
  if (!row.length) return 1;
  let counter = 0;
  for (let i = 0; i < row.length; i++) {
    counter++;
    if (row[i] >= currentValue) break;
  }
  return counter;
};

const score = (grid, itemCoordinate) => {
  const [x, y] = itemCoordinate;
  const currentColumn = grid.map((row) => row[x]);
  const currentRow = grid[y];
  const currentValue = grid[y][x];

  const top = counter(currentColumn.slice(0, y).reverse(), currentValue);
  const bottom = counter(currentColumn.slice(y + 1), currentValue);
  const before = counter(currentRow.slice(0, x).reverse(), currentValue);
  const after = counter(currentRow.slice(x + 1), currentValue);
  return top * bottom * before * after;
};

const solve2 = (input) => {
  let max = Number.MIN_SAFE_INTEGER;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input.length; x++) {
      max = Math.max(max, score(input, [x, y]));
    }
  }
  return max;
};

console.log(solve2(input));
