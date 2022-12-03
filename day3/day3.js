const fs = require("fs");
const path = require("path");

const lines = fs
  .readFileSync(path.resolve(__dirname, "input"))
  .toString("utf-8")
  .split("\n");

const priority = (char) => {
  const p = char.charCodeAt(0) - 96;
  return p > 0 ? p : p + 32 + 26;
};

const solve1 = (lines) => {
  const input = lines.map((line) => [
    line.slice(0, line.length / 2),
    line.slice(line.length / 2),
  ]);
  const duplicate = [];
  for (const line of input) {
    const firstBagSet = new Set(line[0].split(""));
    const duplicateInLine = new Set();
    for (const c of line[1]) {
      if (firstBagSet.has(c)) duplicateInLine.add(c);
    }
    duplicate.push(...Array.from(duplicateInLine.values()));
  }

  return duplicate.map((s) => priority(s)).reduce((sum, i) => sum + i, 0);
};

console.log(solve1(lines));

const intersection = (set1, set2) => {
  const result = new Set();
  for (const c of set2) {
    if (set1.has(c)) result.add(c);
  }
  return result;
};

const solve2 = (lines) => {
  const groups = lines.reduce((groups, item, index) => {
    const group = index % 3 === 0 ? [] : groups[groups.length - 1];
    if (index % 3 === 0) groups.push(group);
    group.push(item);
    return groups;
  }, []);

  const badges = groups.map((group) => {
    const firstTwoIntersection = intersection(
      new Set(group[0]),
      new Set(group[1])
    );
    const anotherIntersection = intersection(
      firstTwoIntersection,
      new Set(group[2])
    );
    return anotherIntersection;
  });
  return badges
    .map((badge) => priority(Array.from(badge)[0]))
    .reduce((sum, i) => sum + i, 0);
};

console.log(solve2(lines));
