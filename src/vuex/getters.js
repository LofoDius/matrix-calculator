export default {
    getCellValue: (state) => (cell) => state.cells[cell],

    isInFirstMatrix: (state) => (cell) => state.firstMatrix.includes(cell),
    isInSecondMatrix: (state) => (cell) => state.secondMatrix.includes(cell),
    isInResultMatrix: (state) => (cell) => state.resultMatrix.includes(cell),

    getFirstMatrixWidth: (state) => state.firstMatrixWidth,
    getFirstMatrixHeight: (state) => state.firstMatrixHeight,

    getSecondMatrixWidth: (state) => state.secondMatrixWidth,
    getSecondMatrixHeight: (state) => state.secondMatrixHeight,

    isFirstMatrixSaved: (state) => state.isFirstMatrixSaved,
    isSecondMatrixSaved: (state) => state.isSecondMatrixSaved,

    getFirstMatrixLastCell: (state) => state.firstMatrixLastCell,
    getSecondMatrixLastCell: (state) => state.secondMatrixLastCell,

    getFirstMatrixIsBottomClear: (state) => state.firstMatrixIsBottomClear,
    getSecondMatrixIsBottomClear: (state) => state.secondMatrixIsBottomClear,

    getResultMatrixX: (state) => state.resultMatrixX,
    getResultMatrixY: (state) => state.resultMatrixY,
    getResultMatrixWidth: (state) => state.resultMatrixWidth,
    getResultMatrixHeight: (state) => state.resultMatrixHeight
}