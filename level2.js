const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
  crlfDelay: Infinity
});

;(async function() {
  var currentLine = 0;
  
  var MAP = [];
  var MAP_SIZE = 0;

  var INPUTS = [];
  var INPUT_POSITION;
  var INPUT_SIZE;

  var OUTPUT = [];

  const buildMap = function(line) {
    const tiles = line.split("")
    MAP.push(tiles)    
  };

  const buildInput = function(line) {
    const positions = line.split(" ")

    const first = positions[0].split(",")
    const second = positions[1].split(",")

    INPUTS.push([first, second]);
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

  const isSameIsland = function(grid, point1, point2) {
    function exploreLand(x, y, landNumber) {
      if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] !== 'L') {
        return;
      }
      grid[x][y] = landNumber;
      exploreLand(x - 1, y, landNumber);
      exploreLand(x + 1, y, landNumber);
      exploreLand(x, y - 1, landNumber);
      exploreLand(x, y + 1, landNumber);
    }
  
    let landNumber = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === 'L') {
          landNumber++;
          exploreLand(i, j, landNumber);
        }
      }
    }
  
    const landNumber1 = grid[point1[1]][point1[0]];
    const landNumber2 = grid[point2[1]][point2[0]];
  
    return landNumber1 === landNumber2;
  }

  const getTypeAtXY = function(point_1, point_2) {
    return isSameIsland(MAP, point_1, point_2) ? "SAME" : "DIFFERENT";
  };
  
  for (const INPUT of INPUTS) {
    const point_1 = INPUT[0];
    const point_2 = INPUT[1]

    OUTPUT.push(getTypeAtXY(point_1, point_2));
  }

  for (const result of OUTPUT) {
    console.log(result)
  }
})();