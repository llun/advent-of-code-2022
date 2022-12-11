const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input"))
  .toString("utf-8")
  .split("\n")
  .map((line) => line.split(","));

const isFullyContain = (group1, group2) => {
  const [g1min, g1max] = group1;
  const [g2min, g2max] = group2;
  if (g1min <= g2min && g1max >= g2max) return true;
  return false;
};

const isOverlapping = (group1, group2) => {
  const [g1min, g1max] = group1;
  const [g2min, g2max] = group2;
  if (g1min >= g2min && g1min <= g2max) return true;
  if (g1max >= g2min && g1max <= g2max) return true;
  return false;
};

const solve1 = (input) => {
  const contains = input
    .map((line) => line.map((i) => i.split("-").map((i) => parseInt(i, 10))))
    .map(
      (line) =>
        isFullyContain(line[0], line[1]) || isFullyContain(line[1], line[0])
    );
  return contains.filter((i) => i).length;
};
console.log(solve1(input));

const solve2 = (input) => {
  const contains = input
    .map((line) => line.map((i) => i.split("-").map((i) => parseInt(i, 10))))
    .map(
      (line) =>
        isOverlapping(line[0], line[1]) || isOverlapping(line[1], line[0])
    );
  return contains.filter((i) => i).length;
};
console.log(solve2(input));
