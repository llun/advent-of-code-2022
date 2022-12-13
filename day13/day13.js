const fs = require("fs");
const path = require("path");

const input = (filename) =>
  fs
    .readFileSync(path.resolve(__dirname, filename))
    .toString("utf-8")
    .split("\n\n")
    .map((pair) => pair.split("\n").map((item) => eval(item)));

const isRightOrder = (packet1, packet2) => {
  const left = packet1;
  const right = packet2;

  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (right < left) return false;
    if (left < right) return true;
    return undefined;
  }

  if (Number.isInteger(left) && !Number.isInteger(right)) {
    return isRightOrder([left], right);
  }

  if (!Number.isInteger(left) && Number.isInteger(right)) {
    return isRightOrder(left, [right]);
  }

  const n = Math.max(left.length, right.length);
  for (let i = 0; i < n; i++) {
    const leftVal = left[i];
    const rightVal = right[i];

    if (leftVal !== undefined && rightVal === undefined) return false;
    if (leftVal === undefined && rightVal !== undefined) return true;

    const compare = isRightOrder(leftVal, rightVal);
    if (compare !== undefined) return compare;
  }
  return undefined;
};

const solve1 = (input) => {
  const indexes = [];
  for (let i = 0; i < input.length; i++) {
    if (isRightOrder(...input[i])) {
      indexes.push(i + 1);
    }
  }
  return indexes.reduce((sum, i) => sum + i, 0);
};

console.log(solve1(input("sample")));
console.log(solve1(input("input.txt")));

const solve2 = (input) => {
  const list = input
    .concat([[[[2]], [[6]]]])
    .flat()
    .sort((a, b) => {
      const compare = isRightOrder(a, b);
      if (compare) return -1;
      return 1;
    })
    .map((item) => JSON.stringify(item));
  const first = list.indexOf("[[2]]");
  const second = list.indexOf("[[6]]");
  return (first + 1) * (second + 1);
};

console.log(solve2(input("sample")));
console.log(solve2(input("input.txt")));
