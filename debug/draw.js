// Create a 100x100 2D array filled with 'O's
const array = new Array(100).fill(null).map(() => new Array(100).fill('O'));

// List of points from your provided list
const points = [
    [4, 70], [4, 71], [4, 72], [4, 73], [5, 74], [6, 75], [7, 76], [8, 77], [8, 78], [8, 79],
    [8, 80], [9, 81], [9, 82], [9, 83], [9, 84], [9, 85], [8, 85], [7, 85], [6, 85], [5, 85],
    [4, 85], [3, 86], [2, 87], [1, 88], [1, 89], [1, 90], [0, 91], [0, 92], [0, 93], [0, 94],
    [1, 95], [2, 96]
];

// Mark the points with 'X'
for (const point of points) {
    const [x, y] = point;
    array[y][x] = 'X';
}

// Print the 2D array to the console
for (let i = 0; i < 100; i++) {
    console.log(array[i].join(' '));
}
