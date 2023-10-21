const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
  crlfDelay: Infinity
});

; (async function () {
  var currentLine = 0;

  var MAP = [];
  var MAP_SIZE = 0;

  var INPUTS = [];
  var INPUT_POSITION;
  var INPUT_SIZE;

  var OUTPUT = [];

  const buildMap = function (line) {
    const tiles = line.split("")
    MAP.push(tiles)
  };

  const buildInput = function (line) {
    const positions = line.split(" ")

    let route = [];
    for (const position of positions) {
      const coordinates = position.split(",")
      route.push(coordinates)
    }

    INPUTS.push(route)
  }

  for await (const line of rl) {
    ++currentLine;

    if (currentLine === 1) {
      MAP_SIZE = +line;
      INPUT_POSITION = MAP_SIZE + 1;
    }

    if (currentLine > 1 && currentLine <= INPUT_POSITION) {
      buildMap(line);
    }

    if (currentLine === (INPUT_POSITION + 1)) {
      INPUT_SIZE = line;
    }

    if (currentLine > (INPUT_POSITION + 1)) {
      buildInput(line)
    }
  }

  // function orientation(p, q, r) {
  //   const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
  //   if (val === 0) {
  //     return 0; // Collinear
  //   }
  //   return val > 0 ? 1 : 2; // Clockwise or Counterclockwise
  // }

  // function doSegmentsIntersect(segment1, segment2) {
  //   const [p1, q1] = segment1;
  //   const [p2, q2] = segment2;

  //   const o1 = orientation(p1, q1, p2);
  //   const o2 = orientation(p1, q1, q2);
  //   const o3 = orientation(p2, q2, p1);
  //   const o4 = orientation(p2, q2, q1);

  //   if (o1 !== o2 && o3 !== o4) {
  //     return true; // Segments intersect
  //   }

  //   return false;
  // }

  function sameTileIsTwice(route) {
    if (route.length !== new Set(route).size) {
      return true;
    }

    return false;
  }

  class Complex {
    constructor(real, imag) {
      this.real = real;
      this.imag = imag;
    }

    static subtract(a, b) {
      return new Complex(a.real - b.real, a.imag - b.imag);
    }

    static cross(a, b) {
      return a.real * b.imag - a.imag * b.real;
    }
  }

  function areDiagonalStepsCrossing(route) {
    for (let i = 0; i < route.length - 2; i++) {
      for (let j = i + 2; j < route.length; j++) {
        const p1 = new Complex(route[i][0], route[i][1]);
        const p2 = new Complex(route[i + 1][0], route[i + 1][1]);
        const p3 = new Complex(route[j][0], route[j][1]);
        const p4 = new Complex(route[j - 1][0], route[j - 1][1]);

        if (areDiagonal(p1, p2) && areDiagonal(p3, p4)) {
          if (doLinesCross(p1, p2, p3, p4)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  function areDiagonal(p1, p2) {
    return Math.abs(p2.real - p1.real) === 1 && Math.abs(p2.imag - p1.imag) === 1;
  }

  function doLinesCross(p1, p2, p3, p4) {
    const v1 = Complex.subtract(p3, p1);
    const v2 = Complex.subtract(p4, p1);
    const v3 = Complex.subtract(p2, p1);

    const cross1 = Complex.cross(v1, v2);
    const cross2 = Complex.cross(v1, v3);

    return cross1 * cross2 >= 0;
  }


  for (const INPUT of INPUTS) {
    const hasIntersection = sameTileIsTwice(INPUT) || areDiagonalStepsCrossing(INPUT) ? "INVALID" : "VALID";
    OUTPUT.push(hasIntersection);
  }

  for (const result of OUTPUT) {
    console.log(result)
  }
})();
