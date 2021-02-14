export default {
    getCellValue: (state) => (cell) => state.cells[cell],

    isInFirstMatrix: (state) => (cell) => state.firstMatrix.includes(cell),
    isInSecondMatrix: (state) => (cell) => state.secondMatrix.includes(cell)
}