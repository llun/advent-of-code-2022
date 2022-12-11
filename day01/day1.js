const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input"))
  .toString("utf-8");
const groups = input.split("\n\n").map((group) =>
  group
    .split("\n")
    .map((item) => parseInt(item, 10))
    .reduce((sum, i) => sum + i, 0)
);
const max = Math.max(...groups);
console.log(max);

const topThree = groups
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((sum, i) => sum + i, 0);
console.log(topThree);
