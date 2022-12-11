const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input"))
  .toString("utf-8");

const solve1 = (input) => {
  let buffer = [];
  for (const index in input) {
    const char = input[index];
    if (buffer.length === 4) return index;

    if (buffer.indexOf(char) > -1) {
      buffer = buffer.slice(buffer.indexOf(char) + 1);
    }
    buffer.push(char);
  }
  return -1;
};
console.log(solve1("bvwbjplbgvbhsrlpgdmjqwftvncz"));
console.log(solve1("nppdvjthqldpwncqszvftbrmjlhg"));
console.log(solve1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"));
console.log(solve1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"));
console.log(solve1(input));

const solve2 = (input) => {
  let buffer = [];
  for (const index in input) {
    const char = input[index];
    if (buffer.length === 14) return index;

    if (buffer.indexOf(char) > -1) {
      buffer = buffer.slice(buffer.indexOf(char) + 1);
    }
    buffer.push(char);
  }
  return -1;
};

console.log(solve2("mjqjpqmgbljsphdztnvjfqwrcgsmlb"));
console.log(solve2("bvwbjplbgvbhsrlpgdmjqwftvncz"));
console.log(solve2("nppdvjthqldpwncqszvftbrmjlhg"));
console.log(solve2("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"));
console.log(solve2("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"));
console.log(solve2(input));
