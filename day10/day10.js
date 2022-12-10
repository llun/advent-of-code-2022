const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input"))
  .toString("utf-8")
  .split("\n");

const strength = (x, cycle) => x * cycle;

const solve1 = (input) => {
  let strengths = [];
  let X = 1;
  let cycle = 1;
  const sequences = [20, 60, 100, 140, 180, 220];
  for (const value of input) {
    if (value === "noop") {
      cycle++;
      if (sequences.includes(cycle)) strengths.push(strength(X, cycle));
      continue;
    }

    cycle++;
    if (sequences.includes(cycle)) strengths.push(strength(X, cycle));

    const [, addValue] = value.split(" ");
    const addNumber = parseInt(addValue, 10);
    X += addNumber;
    cycle++;
    if (sequences.includes(cycle)) strengths.push(strength(X, cycle));
  }
  return strengths.reduce((sum, i) => sum + i, 0);
};

console.log(solve1(input));

const shouldDraw = (position, X) => position >= X - 1 && position <= X + 1;

const solve2 = (input) => {
  let grid = [[], [], [], [], [], [], []];
  let X = 1;
  let cycle = 0;
  let currentRow = 0;
  for (const value of input) {
    // Cycle operation
    let row = grid[currentRow];
    row[cycle % 40] = shouldDraw(cycle % 40, X) ? "█" : " ";

    // Cycle increment
    cycle++;
    if (cycle % 40 === 0 && cycle > 0) {
      currentRow += 1;
    }

    if (value === "noop") continue;

    // Cycle operation
    row = grid[currentRow];
    row[cycle % 40] = shouldDraw(cycle % 40, X) ? "█" : " ";

    const [, addValue] = value.split(" ");
    X += parseInt(addValue, 10);

    // Cycle increment
    cycle++;
    if (cycle % 40 === 0 && cycle > 0) {
      currentRow += 1;
    }
  }
  return grid;
};

console.log(
  solve2(input)
    .map((row) => row.join(""))
    .join("\n")
);
