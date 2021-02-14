import Vue from 'vue'

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
        let matrixName = state.firstMatrix.length ? 'secondMatrix' : 'firstMatrix';
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

        Vue.set(state, matrixName, arr);
    }
}