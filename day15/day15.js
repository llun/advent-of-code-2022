const fs = require("fs");
const path = require("path");
const peggy = require("peggy");
const mergeRanges = require("merge-ranges");

const parser = peggy.generate(
  fs.readFileSync(path.resolve(__dirname, "grammar.peggy")).toString("utf-8")
);

const input = (filename) =>
  parser.parse(
    fs.readFileSync(path.resolve(__dirname, filename)).toString("utf-8")
  );

const solve1 = (input, targetLineNumber) => {
  const set = new Set();
  for (const line of input) {
    set.add(line.sensor.join(","));
    set.add(line.beacon.join(","));
  }

  const targetLine = new Set();
  for (const line of input) {
    const size = 2 * line.distance + 1;
    let width = 1;
    for (let i = 0; i < size; i++) {
      const y = line.sensor[1] - line.distance + i;
      const b = line.sensor[0] - Math.floor(width / 2);
      if (y === targetLineNumber) {
        for (let start = b; start < b + width; start++) {
          const pair = [start, y].join(",");
          if (!set.has(pair)) targetLine.add(pair);
        }
      }

      if (y < line.sensor[1]) width += 2;
      else width -= 2;
    }
  }

  return targetLine.size;
};
console.log(solve1(input("sample"), 10));
console.log(solve1(input("input.txt"), 2000000));

const seen = (input, line, maxX) => {
  const scan = input
    .sort((item) => item.minY)
    .filter((item) => line >= item.minY && line <= item.maxY);

  const ranges = [];
  for (const item of scan) {
    const { sensor, distance } = item;
    const startX =
      sensor[0] - (distance - Math.abs(sensor[1] - line)) < 0
        ? 0
        : sensor[0] - (distance - Math.abs(sensor[1] - line)) > maxX
        ? maxX
        : sensor[0] - (distance - Math.abs(sensor[1] - line));
    const width = 2 * (distance - Math.abs(sensor[1] - line)) + 1;
    const endX = startX + width > maxX ? maxX : startX + width;
    ranges.push([startX, endX]);
  }

  return mergeRanges(ranges);
};

const solve2 = (input, max) => {
  for (let row = 0; row < max; row++) {
    const ranges = seen(input, row, max);
    if (ranges.length !== 1) {
      return ranges[0][1] * 4000000 + row;
    }
  }
  return -1;
};
console.log(solve2(input("sample"), 20));
console.log(solve2(input("input.txt"), 4000000));
