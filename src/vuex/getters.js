export default {
    getCellValue: (state) => (cell) => state.cells[cell],

    isInFirstMatrix: (state) => (cell) => state.firstMatrix.includes(cell),
    isInSecondMatrix: (state) => (cell) => state.secondMatrix.includes(cell),

    isFirstMatrixSaved: (state) => state.isFirstMatrixSaved,
    isSecondMatrixSaved: (state) => state.isSecondMatrixSaved,

    getFirstMatrixLastCell: (state) => state.firstMatrixLastCell,
    getSecondMatrixLastCell: (state) => state.secondMatrixLastCell
}