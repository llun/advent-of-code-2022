const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input"))
  .toString("utf-8")
  .split("\n")
  .map((item) => item.split(" "));

const map = {
  A: "R",
  B: "P",
  C: "S",
  X: "R",
  Y: "P",
  Z: "S",
};

const score = (a, b) => {
  const p1 = map[a];
  const p2 = map[b];

  if (p1 === p2 && p2 === "R") return 3 + 1;
  if (p1 === p2 && p2 === "P") return 3 + 2;
  if (p1 === p2 && p2 === "S") return 3 + 3;

  if (p1 === "R" && p2 === "S") return 3;
  if (p1 === "S" && p2 === "P") return 2;
  if (p1 === "P" && p2 === "R") return 1;

  if (p2 === "R" && p1 === "S") return 6 + 1;
  if (p2 === "S" && p1 === "P") return 6 + 3;
  if (p2 === "P" && p1 === "R") return 6 + 2;
};

console.log(input.map(([a, b]) => score(a, b)).reduce((sum, i) => sum + i, 0));

const map2 = (a, b) => {
  if (b === "Y") return a;
  if (b === "X") {
    if (a === "R") return "S";
    if (a === "P") return "R";
    if (a === "S") return "P";
  }
  if (b === "Z") {
    if (a === "R") return "P";
    if (a === "P") return "S";
    if (a === "S") return "R";
  }
};

const score2 = (a, b) => {
  a = map[a];
  b = map2(a, b);

  if (a === b && b === "R") return 3 + 1;
  if (a === b && b === "P") return 3 + 2;
  if (a === b && b === "S") return 3 + 3;

  if (a === "R" && b === "S") return 3;
  if (a === "S" && b === "P") return 2;
  if (a === "P" && b === "R") return 1;

  if (b === "R" && a === "S") return 6 + 1;
  if (b === "S" && a === "P") return 6 + 3;
  if (b === "P" && a === "R") return 6 + 2;
};

console.log(input.map(([a, b]) => score2(a, b)).reduce((sum, i) => sum + i, 0));
