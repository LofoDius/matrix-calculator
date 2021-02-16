import Vue from 'vue'

const SIZE = 20;

function prepareArray(firstCell, secondCell) {
    let coords = prepareCoords(firstCell, secondCell);
    let arr = []
    for (let i = coords.first.y; i <= coords.second.y; i++) {
        for (let j = coords.first.x; j <= coords.second.x; j++) {
            arr.push(i + 'x' + j);
        }
    }
    return arr;
}

function prepareCoords(firstCell, secondCell) {
    return {
        first: {
            x: Math.min(firstCell.split('x')[1], secondCell.split('x')[1]),
            y: Math.min(firstCell.split('x')[0], secondCell.split('x')[0])
        },
        second: {
            x: Math.max(firstCell.split('x')[1], secondCell.split('x')[1]),
            y: Math.max(firstCell.split('x')[0], secondCell.split('x')[0])
        }
    };
}

export default {
    INIT_STORE: (state) => {
        for (let i = 1; i < SIZE + 1; i++) {
            for (let j = 1; j < SIZE + 1; j++) {
                Vue.set(state.cells, i.toString() + 'x' + j.toString(), '');
            }
        }

        Vue.set(state, 'isFirstMatrixSaved', false);
        Vue.set(state, 'isSecondMatrixSaved', false);
        Vue.set(state, 'firstMatrixLastCell', '');
        Vue.set(state, 'secondMatrixLastCell', '');
        Vue.set(state, 'resultMatrix', []);
    },

    UPDATE_CELL: (state, {cell, newValue}) => {
        Vue.set(state.cells, cell, newValue);
    },

    UPDATE_MATRIX: (state, {firstCell, secondCell}) => {
        let matrixName = state.isFirstMatrixSaved ? 'secondMatrix' : 'firstMatrix';
        let arr = prepareArray(firstCell, secondCell);
        Vue.set(state, matrixName, arr);
    },

    SAVE_MATRIX: (state, {firstCell, secondCell}) => {
        let matrixName = state.isFirstMatrixSaved ? 'secondMatrix' : 'firstMatrix';
        let arr = prepareArray(firstCell, secondCell);
        let coords = prepareCoords(firstCell, secondCell);
        Vue.set(state, matrixName, arr);

        switch (matrixName) {
            case 'firstMatrix': {
                let lastCell = arr[arr.length - 1];
                let isBottomClear = true;
                if (state.secondMatrixLastCell === lastCell) {
                    lastCell = arr[0];
                    isBottomClear = false;
                }

                Vue.set(state, 'firstMatrixWidth', coords.second.x - coords.first.x + 1);
                Vue.set(state, 'firstMatrixHeight', coords.second.y - coords.first.y + 1);
                Vue.set(state, 'firstMatrixLastCell', lastCell);
                Vue.set(state, 'isFirstMatrixSaved', true);
                Vue.set(state, 'firstMatrixIsBottomClear', isBottomClear);
                break;
            }
            case 'secondMatrix': {
                let lastCell = arr[arr.length - 1];
                let isBottomClear = true;
                if (state.firstMatrixLastCell === lastCell) {
                    lastCell = arr[0];
                    isBottomClear = false;
                }

                Vue.set(state, 'secondMatrixWidth', coords.second.x - coords.first.x + 1);
                Vue.set(state, 'secondMatrixHeight', coords.second.y - coords.first.y + 1);
                Vue.set(state, 'secondMatrixLastCell', lastCell);
                Vue.set(state, 'isSecondMatrixSaved', true);
                Vue.set(state, 'secondMatrixIsBottomClear', isBottomClear);
                break;
            }
        }
    },

    CLEAR_TEMP_MATRIX: (state, {lastHoveredCell}) => {
        if (state.secondMatrix.includes(lastHoveredCell)) {
            Vue.set(state, 'secondMatrix', [])
            Vue.set(state, 'isSecondMatrixSaved', false);
            Vue.set(state, 'secondMatrixLastCell', '');
        } else if (state.firstMatrix.includes(lastHoveredCell)) {
            Vue.set(state, 'firstMatrix', []);
            Vue.set(state, 'isFirstMatrixSaved', false);
            Vue.set(state, 'firstMatrixLastCell', '');
        }
    },

    CLEAR_MATRIX: (state, {lastCell}) => {
        if (state.secondMatrixLastCell === lastCell) {
            Vue.set(state, 'secondMatrix', [])
            Vue.set(state, 'isSecondMatrixSaved', false);
            Vue.set(state, 'secondMatrixLastCell', '');
        } else if (state.firstMatrixLastCell === lastCell) {
            Vue.set(state, 'firstMatrix', []);
            Vue.set(state, 'isFirstMatrixSaved', false);
            Vue.set(state, 'firstMatrixLastCell', '');
        }
    },

    INSERT_RESULT: (state) => {
        for (let i = 0; i < state.resultMatrixHeight; i++) {
            for (let j = 0; j < state.resultMatrixWidth; j++) {
                let x = parseInt(state.resultMatrixX) + j;
                let y = parseInt(state.resultMatrixY) + i;
                Vue.set(
                    state.cells,
                    y + 'x' + x,
                    state.resultMatrixValues[i * state.resultMatrixWidth + j]
                );
            }
        }
        //Vue.set(state, 'resultMatrix', []);
        Vue.set(state, 'firstMatrix', []);
        Vue.set(state, 'secondMatrix', []);
        Vue.set(state, 'isFirstMatrixSaved', false);
        Vue.set(state, 'isSecondMatrixSaved', false);
        Vue.set(state, 'firstMatrixLastCell', '');
        Vue.set(state, 'secondMatrixLastCell', '');
    },

    UPDATE_RESULT_COORDS: (state, {cell}) => {
        let x = cell.split('x')[1];
        let y = cell.split('x')[0];
        if (parseInt(x) + state.resultMatrixWidth - 1 > SIZE) {
            x = SIZE - state.resultMatrixWidth + 1;
        }
        if(parseInt(y) + state.resultMatrixHeight - 1 > SIZE) {
            y = SIZE - state.resultMatrixHeight + 1;
        }

        Vue.set(state, 'resultMatrixX', x);
        Vue.set(state, 'resultMatrixY', y);

        let firstCell = y + 'x' + x;
        let secondCell = (parseInt(y) + state.resultMatrixHeight - 1) +
            'x' +
            (parseInt(x) + state.resultMatrixWidth - 1);
        Vue.set(state, 'resultMatrix', prepareArray(firstCell, secondCell));
    },

    ADD: (state) => {
        let resultArr = [];
        for (let i = 0; i < state.firstMatrixHeight; i++) {
            for (let j = 0; j < state.firstMatrixWidth; j++) {
                let firstCell = parseFloat(state.cells[state.firstMatrix[i * state.firstMatrixWidth + j]]);
                let secondCell = parseFloat(state.cells[state.secondMatrix[i * state.secondMatrixWidth + j]]);

                if (isNaN(firstCell)) {
                    firstCell = 0;
                    Vue.set(state.cells, state.firstMatrix[i * state.firstMatrixWidth + j], 0);
                }
                if (isNaN(secondCell)) {
                    secondCell = 0;
                    Vue.set(state.cells, state.secondMatrix[i* state.secondMatrixWidth + j], 0);
                }
                resultArr.push((firstCell + secondCell).toString());
            }
        }
        Vue.set(state, 'resultMatrixHeight', state.firstMatrixHeight);
        Vue.set(state, 'resultMatrixWidth', state.firstMatrixWidth);
        Vue.set(state, 'resultMatrixValues', resultArr);
    },

    SUBTRACT: (state) => {
        let resultArr = [];
        for (let i = 0; i < state.firstMatrixHeight; i++) {
            for (let j = 0; j < state.firstMatrixWidth; j++) {
                let firstCell = parseFloat(state.cells[state.firstMatrix[i * state.firstMatrixWidth + j]]);
                let secondCell = parseFloat(state.cells[state.secondMatrix[i * state.secondMatrixWidth + j]]);
                resultArr.push((firstCell - secondCell).toString());
            }
        }

        Vue.set(state, 'resultMatrixValues', resultArr);
        Vue.set(state, 'resultMatrixHeight', state.firstMatrixHeight);
        Vue.set(state, 'resultMatrixWidth', state.firstMatrixWidth);
    },

    MULTIPLY: (state) => {
        let resultArr = new Array(state.firstMatrixHeight * state.secondMatrixWidth);
        for (let i = 0; i < state.firstMatrixHeight; i++) {
            for (let j = 0; j < state.secondMatrixWidth; j++) {
                let index = i * state.secondMatrixWidth + j
                resultArr[index] = 0;
                for (let k = 0; k < state.secondMatrixHeight; k++) {
                    resultArr[index] += parseFloat(state.cells[state.firstMatrix[i * state.firstMatrixWidth + k]]) *
                        parseFloat(state.cells[state.secondMatrix[k * state.secondMatrixWidth + j]]);
                }
            }
        }

        Vue.set(state, 'resultMatrixValues', resultArr);
        Vue.set(state, 'resultMatrixWidth', state.secondMatrixWidth);
        Vue.set(state, 'resultMatrixHeight', state.firstMatrixHeight);
    }
}