const fs = require("fs");
const path = require("path");
const peggy = require("peggy");

const parser = peggy.generate(
  fs.readFileSync(path.resolve(__dirname, "grammar.peggy")).toString("utf-8")
);
const input = (filename) => {
  return fs.readFileSync(path.resolve(__dirname, filename)).toString("utf-8");
};

const solve1 = (input) => {
  const monkeys = parser.parse(input);

  const inspectionsCount = new Array(monkeys.length).fill(0);
  const inspections = new Array(monkeys.length);
  for (let i = 0; i < inspections.length; i++) {
    inspections[i] = monkeys[i].items;
  }

  const mod = monkeys.reduce((a, c) => a * c.test, 1);

  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      const items = monkey.items;
      while (items.length) {
        const item = items.shift();
        const worryLevel = Math.floor((monkey.operation(item) % mod) / 3);
        inspections[monkey.results[Math.sign(worryLevel % monkey.test)]].push(
          worryLevel
        );
        inspectionsCount[monkey.index]++;
      }
    }
  }
  console.log(inspectionsCount);
  const ordered = inspectionsCount.sort((a, b) => b - a);
  return ordered[0] * ordered[1];
};
console.log(solve1(input("sample")));
console.log(solve1(input("input.txt")));

const solve2 = (input) => {
  const monkeys = parser.parse(input);

  const inspectionsCount = new Array(monkeys.length).fill(0);
  const inspections = new Array(monkeys.length);
  for (let i = 0; i < inspections.length; i++) {
    inspections[i] = monkeys[i].items;
  }

  const mod = monkeys.reduce((a, c) => a * c.test, 1);

  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      const items = monkey.items;
      while (items.length) {
        const item = items.shift();
        const worryLevel = monkey.operation(item) % mod;
        inspections[monkey.results[Math.sign(worryLevel % monkey.test)]].push(
          worryLevel
        );
        inspectionsCount[monkey.index]++;
      }
    }
  }
  console.log(inspectionsCount);
  const ordered = inspectionsCount.sort((a, b) => b - a);
  return ordered[0] * ordered[1];
};

console.log(solve2(input("sample")));
console.log(solve2(input("input.txt")));
