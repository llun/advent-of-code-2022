const fs = require("fs");
const path = require("path");

const input = (filename) =>
  fs
    .readFileSync(path.resolve(__dirname, filename))
    .toString("utf-8")
    .split("\n")
    .map((line) =>
      line
        .split("")
        .map((c) => (c === "S" ? 0 : c === "E" ? 27 : c.charCodeAt(0) - 96))
    );

const startingPoint = (input) => {
  for (let y = 0; y < input.length; y++) {
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
      if (line[x] === 0) return [x, y];
    }
  }
  return [-1, -1];
};

const endingPoint = (input) => {
  for (let y = 0; y < input.length; y++) {
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
      if (line[x] === 27) return [x, y];
    }
  }
  return [-1, -1];
};

const neighbour = (grid, current, visited) => {
  const [x, y] = current.position;
  const value = current.value;
  const around = [
    { position: [x, y - 1], value: grid[y - 1]?.[x], step: current.step + 1 },
    { position: [x, y + 1], value: grid[y + 1]?.[x], step: current.step + 1 },
    { position: [x - 1, y], value: grid[y][x - 1], step: current.step + 1 },
    { position: [x + 1, y], value: grid[y][x + 1], step: current.step + 1 },
  ].filter(
    (item) =>
      item.value !== undefined &&
      value - item.value < 2 &&
      !visited.has(item.position.join(","))
  );
  return around;
};

const solve1 = (input) => {
  const start = endingPoint(input);
  const visited = new Set();

  const queue = [{ position: start, value: 27, step: 0 }];
  while (queue.length) {
    const head = queue.shift();
    if (head.value === 0) {
      return head.step;
    }
    if (visited.has(head.position.join(","))) {
      continue;
    }

    visited.add(head.position.join(","));
    const next = neighbour(input, head, visited);
    queue.push(...next);
  }

  return -1;
};
console.log(solve1(input("sample")));
console.log(solve1(input("input.txt")));

const solve2 = (input) => {
  const start = endingPoint(input);
  const visited = new Set();

  const queue = [{ position: start, value: 27, step: 0 }];
  while (queue.length) {
    const head = queue.shift();
    if (head.value === 1) {
      return head.step;
    }
    if (visited.has(head.position.join(","))) {
      continue;
    }

    visited.add(head.position.join(","));
    const next = neighbour(input, head, visited);
    queue.push(...next);
  }

  return -1;
};
console.log(solve2(input("sample")));
console.log(solve2(input("input.txt")));
