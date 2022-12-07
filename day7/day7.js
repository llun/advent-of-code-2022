const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input"))
  .toString("utf-8")
  .split("\n");

class File {
  constructor(name, size, parent) {
    this.name = name;
    this.children = {};
    this.size = size;
    this.parent = parent;
  }

  addFile(name, size) {
    this.children[name] = new File(name, size, this);
  }

  addDirectory(name) {
    this.children[name] = new File(name, 0, this);
  }

  getSize() {
    if (Object.keys(this.children).length === 0) return this.size;

    return Object.values(this.children).reduce(
      (sum, child) => sum + child.getSize(),
      0
    );
  }

  getPath() {
    const path = [];
    let current = this;
    while (current) {
      path.push(current.name);
      current = current.parent;
    }
    return path.reverse().join("/");
  }

  getChild(name) {
    return this.children[name];
  }
}

function travel(tree, visited, minimum) {
  const path = tree.getPath();
  if (!visited[path]) {
    if (Object.keys(tree.children).length === 0) return 0;
    if (!minimum) {
      visited[path] = tree.getSize();
    } else if (minimum && tree.getSize() >= minimum) {
      visited[path] = tree.getSize();
    }
  }
  for (const child of Object.values(tree.children)) {
    travel(child, visited, minimum);
  }
  return visited;
}

function getRoot(input) {
  let root = null;
  let current = null;

  for (const line of input) {
    // Command
    if (line.startsWith("$ cd ")) {
      const directory = line.slice("$ cd ".length);
      const name = directory === "/" ? "root" : directory;

      if (directory === "..") {
        current = current.parent;
      } else {
        const file =
          (current && current.getChild(name)) || new File(name, 0, current);
        if (!root) root = file;
        current = file;
      }
      continue;
    }

    if (line.startsWith("$ ls")) {
      // or mark as begin listing
      continue;
    }

    // Directory content
    if (line.startsWith("dir")) {
      const [, name] = line.split(" ");
      if (!current.children[name]) {
        current.addDirectory(name);
      }
      continue;
    }

    if (/^\d+ /.test(line)) {
      const [size, name] = line.split(" ");
      current.addFile(name, parseInt(size));
    }
  }

  return root;
}

const solve1 = (input) => {
  const root = getRoot(input);
  const result = travel(root, {});
  return Object.values(result).reduce((sum, i) => {
    if (i > 100000) return sum;
    return sum + i;
  }, 0);
};

console.log(solve1(input));

const solve2 = (input) => {
  const root = getRoot(input);
  const totalSize = root.getSize();
  const freeSpace = 70_000_000 - totalSize;
  const minSpace = 30_000_000 - freeSpace;

  const result = travel(root, {}, minSpace);
  return Object.values(result).sort((a, b) => a - b)[0];
};

console.log(solve2(input));
