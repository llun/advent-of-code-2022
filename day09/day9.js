const fs = require("fs");
const path = require("path");

const PLANK_LENGTH = 1.61;

const getInput = (filename) =>
  fs
    .readFileSync(path.resolve(__dirname, filename))
    .toString("utf-8")
    .split("\n")
    .map((line) =>
      line.split(" ").map((v, i) => (i === 1 ? parseInt(v, 10) : v))
    );

const distance = (p1, p2) => {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const move = (direction, head, tail) => {
  switch (direction) {
    case "R": {
      head = [head[0] + 1, head[1]];
      const d = distance(head, tail);
      if (d > PLANK_LENGTH) {
        if (head[0] > tail[0]) {
          tail = [tail[0] + 1, tail[1]];
        } else if (head[0] < tail[0]) {
          tail = [tail[0] - 1, tail[1]];
        }
        if (head[1] > tail[1]) {
          tail = [tail[0], tail[1] + 1];
        } else if (head[1] < tail[1]) {
          tail = [tail[0], tail[1] - 1];
        }
      }
      return [head, tail];
    }
    case "U": {
      head = [head[0], head[1] + 1];
      const d = distance(head, tail);
      if (d > PLANK_LENGTH) {
        if (d > PLANK_LENGTH) {
          if (head[0] > tail[0]) {
            tail = [tail[0] + 1, tail[1]];
          } else if (head[0] < tail[0]) {
            tail = [tail[0] - 1, tail[1]];
          }
          if (head[1] > tail[1]) {
            tail = [tail[0], tail[1] + 1];
          } else if (head[1] < tail[1]) {
            tail = [tail[0], tail[1] - 1];
          }
        }
      }
      return [head, tail];
    }
    case "L": {
      head = [head[0] - 1, head[1]];
      const d = distance(head, tail);
      if (d > PLANK_LENGTH) {
        if (d > PLANK_LENGTH) {
          if (head[0] > tail[0]) {
            tail = [tail[0] + 1, tail[1]];
          } else if (head[0] < tail[0]) {
            tail = [tail[0] - 1, tail[1]];
          }
          if (head[1] > tail[1]) {
            tail = [tail[0], tail[1] + 1];
          } else if (head[1] < tail[1]) {
            tail = [tail[0], tail[1] - 1];
          }
        }
      }
      return [head, tail];
    }
    case "D": {
      head = [head[0], head[1] - 1];
      const d = distance(head, tail);
      if (d > PLANK_LENGTH) {
        if (d > PLANK_LENGTH) {
          if (head[0] > tail[0]) {
            tail = [tail[0] + 1, tail[1]];
          } else if (head[0] < tail[0]) {
            tail = [tail[0] - 1, tail[1]];
          }
          if (head[1] > tail[1]) {
            tail = [tail[0], tail[1] + 1];
          } else if (head[1] < tail[1]) {
            tail = [tail[0], tail[1] - 1];
          }
        }
      }
      return [head, tail];
    }
    default:
      return [head, tail];
  }
};

const process = (input, positions, head, tail) => {
  const [direction, step] = input;
  for (let i = 0; i < step; i++) {
    [head, tail] = move(direction, head, tail);
    positions.push(tail);
  }
  return [head, tail];
};

const solve1 = (input) => {
  const positions = [];
  let head = [0, 0];
  let tail = [0, 0];
  for (const line of input) {
    [head, tail] = process(line, positions, head, tail);
  }
  const set = new Set();
  for (const position of positions) {
    const [x, y] = position;
    set.add(`${x},${y}`);
  }
  return set.size;
};
console.log(solve1(getInput("sample")));
console.log(solve1(getInput("input")));

const moveTen = (direction, knots) => {
  switch (direction) {
    case "R": {
      let currentHead = 0;
      knots[currentHead] = [knots[currentHead][0] + 1, knots[currentHead][1]];
      for (let currentTail = 1; currentTail < knots.length; currentTail++) {
        const d = distance(knots[currentHead], knots[currentTail]);
        if (d > PLANK_LENGTH) {
          if (knots[currentHead][0] > knots[currentTail][0]) {
            knots[currentTail] = [
              knots[currentTail][0] + 1,
              knots[currentTail][1],
            ];
          } else if (knots[currentHead][0] < knots[currentTail][0]) {
            knots[currentTail] = [
              knots[currentTail][0] - 1,
              knots[currentTail][1],
            ];
          }
          if (knots[currentHead][1] > knots[currentTail][1]) {
            knots[currentTail] = [
              knots[currentTail][0],
              knots[currentTail][1] + 1,
            ];
          } else if (knots[currentHead][1] < knots[currentTail][1]) {
            knots[currentTail] = [
              knots[currentTail][0],
              knots[currentTail][1] - 1,
            ];
          }
        }
        currentHead = currentTail;
      }
      return knots;
    }
    case "U": {
      let currentHead = 0;
      knots[currentHead] = [knots[currentHead][0], knots[currentHead][1] + 1];
      for (let currentTail = 1; currentTail < knots.length; currentTail++) {
        const d = distance(knots[currentHead], knots[currentTail]);
        if (d > PLANK_LENGTH) {
          if (knots[currentHead][0] > knots[currentTail][0]) {
            knots[currentTail] = [
              knots[currentTail][0] + 1,
              knots[currentTail][1],
            ];
          } else if (knots[currentHead][0] < knots[currentTail][0]) {
            knots[currentTail] = [
              knots[currentTail][0] - 1,
              knots[currentTail][1],
            ];
          }
          if (knots[currentHead][1] > knots[currentTail][1]) {
            knots[currentTail] = [
              knots[currentTail][0],
              knots[currentTail][1] + 1,
            ];
          } else if (knots[currentHead][1] < knots[currentTail][1]) {
            knots[currentTail] = [
              knots[currentTail][0],
              knots[currentTail][1] - 1,
            ];
          }
        }
        currentHead = currentTail;
      }

      return knots;
    }
    case "L": {
      let currentHead = 0;
      knots[currentHead] = [knots[currentHead][0] - 1, knots[currentHead][1]];
      for (let currentTail = 1; currentTail < knots.length; currentTail++) {
        const d = distance(knots[currentHead], knots[currentTail]);
        if (d > PLANK_LENGTH) {
          if (knots[currentHead][0] > knots[currentTail][0]) {
            knots[currentTail] = [
              knots[currentTail][0] + 1,
              knots[currentTail][1],
            ];
          } else if (knots[currentHead][0] < knots[currentTail][0]) {
            knots[currentTail] = [
              knots[currentTail][0] - 1,
              knots[currentTail][1],
            ];
          }
          if (knots[currentHead][1] > knots[currentTail][1]) {
            knots[currentTail] = [
              knots[currentTail][0],
              knots[currentTail][1] + 1,
            ];
          } else if (knots[currentHead][1] < knots[currentTail][1]) {
            knots[currentTail] = [
              knots[currentTail][0],
              knots[currentTail][1] - 1,
            ];
          }
        }
        currentHead = currentTail;
      }
      return knots;
    }
    case "D": {
      let currentHead = 0;
      knots[currentHead] = [knots[currentHead][0], knots[currentHead][1] - 1];
      for (let currentTail = 1; currentTail < knots.length; currentTail++) {
        const d = distance(knots[currentHead], knots[currentTail]);
        if (d > PLANK_LENGTH) {
          if (knots[currentHead][0] > knots[currentTail][0]) {
            knots[currentTail] = [
              knots[currentTail][0] + 1,
              knots[currentTail][1],
            ];
          } else if (knots[currentHead][0] < knots[currentTail][0]) {
            knots[currentTail] = [
              knots[currentTail][0] - 1,
              knots[currentTail][1],
            ];
          }
          if (knots[currentHead][1] > knots[currentTail][1]) {
            knots[currentTail] = [
              knots[currentTail][0],
              knots[currentTail][1] + 1,
            ];
          } else if (knots[currentHead][1] < knots[currentTail][1]) {
            knots[currentTail] = [
              knots[currentTail][0],
              knots[currentTail][1] - 1,
            ];
          }
        }
        currentHead = currentTail;
      }
      return knots;
    }
    default:
      return knots;
  }
};

const processTen = (input, positions, knots) => {
  const [direction, step] = input;
  for (let i = 0; i < step; i++) {
    knots = moveTen(direction, knots);
    positions.push(knots[knots.length - 1]);
  }
  return knots;
};

const solve2 = (input) => {
  const positions = [];
  let knots = [];
  for (let i = 0; i < 10; i++) {
    knots.push([0, 0]);
  }

  for (const line of input) {
    knots = processTen(line, positions, knots);
  }
  const set = new Set();
  for (const position of positions) {
    const [x, y] = position;
    set.add(`${x},${y}`);
  }
  return set.size;
};
console.log(solve2(getInput("sample2")));
console.log(solve2(getInput("input")));
