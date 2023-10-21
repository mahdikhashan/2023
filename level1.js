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
    const positionXY = line.split(",")
    INPUTS.push(positionXY);
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

  const getTypeAtXY = function(x, y) {
    return MAP[y][x];
  };

  for (const INPUT of INPUTS) {
    const x = INPUT[0];
    const y = INPUT[1]

    OUTPUT.push(getTypeAtXY(x, y));
  }

  for (const result of OUTPUT) {
    console.log(result)
  }
})();