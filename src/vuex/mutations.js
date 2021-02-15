import Vue from 'vue'

function prepareCoords(firstCell, secondCell) {
    let coords = {
        first: {
            x: Math.min(firstCell.split('x')[1], secondCell.split('x')[1]),
            y: Math.min(firstCell.split('x')[0], secondCell.split('x')[0])
        },
        second: {
            x: Math.max(firstCell.split('x')[1], secondCell.split('x')[1]),
            y: Math.max(firstCell.split('x')[0], secondCell.split('x')[0])
        }
    }
    let arr = []
    for (let i = coords.first.y; i <= coords.second.y; i++) {
        for (let j = coords.first.x; j <= coords.second.x; j++) {
            arr.push(i + 'x' + j);
        }
    }
    return arr;
}

export default {
    INIT_STORE: (state) => {
        const SIZE = 20;
        for (let i = 1; i < SIZE + 1; i++) {
            for (let j = 1; j < SIZE + 1; j++) {
                Vue.set(state.cells, i.toString() + 'x' + j.toString(), 0);
            }
        }
    },

    UPDATE_CELL: (state, {cell, newValue}) => {
        Vue.set(state.cells, cell, newValue);
    },

    UPDATE_MATRIX: (state, {firstCell, secondCell}) => {
        let matrixName = state.isFirstMatrixSaved ? 'secondMatrix' : 'firstMatrix';
        let arr = prepareCoords(firstCell, secondCell);
        Vue.set(state, matrixName, arr);
    },

    SAVE_MATRIX: (state, {firstCell, secondCell}) => {
        let matrixName = state.isFirstMatrixSaved ? 'secondMatrix' : 'firstMatrix';
        let arr = prepareCoords(firstCell, secondCell);
        Vue.set(state, matrixName, arr);

        switch (matrixName) {
            case 'firstMatrix': {
                let lastCell = arr[arr.length - 1];
                if (state.secondMatrixLastCell === lastCell) {
                    lastCell = arr[0];
                }

                Vue.set(state, 'firstMatrixLastCell', lastCell);
                Vue.set(state, 'isFirstMatrixSaved', true);
                break;
            }
            case 'secondMatrix': {
                let lastCell = arr[arr.length - 1];
                if(state.firstMatrixLastCell === lastCell) {
                    lastCell = arr[0];
                }

                Vue.set(state, 'secondMatrixLastCell', lastCell);
                Vue.set(state, 'isSecondMatrixSaved', true);
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
    }
}