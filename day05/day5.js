const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input"))
  .toString("utf8");

const getStack = (input) => {
  const [state] = input.split("\n\n");

  const lines = state.split("\n");
  const numbers = lines.pop();

  const matches = Array.from(numbers.matchAll(/\d/g)).map(
    (column) => column.index
  );

  lines.reverse();
  const columns = new Array(matches.length);
  for (let i = 0; i < matches.length; i++) {
    columns[i] = [];
  }

  for (const line of lines) {
    const row = matches.map((index) => (line[index] || "").trim());
    for (const index in row) {
      if (!row[index]) continue;
      columns[index].push(row[index]);
    }
  }
  return columns;
};

const getInstruction = (input) => {
  const [, instructions] = input.split("\n\n");
  return instructions
    .split("\n")
    .filter((i) => i)
    .map((line) =>
      Array.from(line.matchAll(/\d+/g)).map((i) => parseInt(i[0], 10))
    );
};

const solve1 = (input) => {
  const stack = getStack(input);
  const instructions = getInstruction(input);
  for (const index in instructions) {
    const line = instructions[index];
    const [totalMove, from, to] = line;
    const fromColumn = stack[from - 1];
    const toColumn = stack[to - 1];
    const moveItems = fromColumn
      .splice(fromColumn.length - totalMove)
      .reverse();
    toColumn.push(...moveItems);
  }
  return stack.map((item) => item[item.length - 1]).join("");
};
console.log(solve1(input));

const solve2 = (input) => {
  const stack = getStack(input);
  const instructions = getInstruction(input);
  for (const index in instructions) {
    const line = instructions[index];
    const [totalMove, from, to] = line;
    const fromColumn = stack[from - 1];
    const toColumn = stack[to - 1];
    const moveItems = fromColumn.splice(fromColumn.length - totalMove);
    toColumn.push(...moveItems);
  }
  return stack.map((item) => item[item.length - 1]).join("");
};
console.log(solve2(input));
