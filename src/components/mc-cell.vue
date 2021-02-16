<template>
  <div class="mc-cell__container"
       :class="[{
         'first-matrix': isInFirstMatrix,
       'second-matrix': isInSecondMatrix,
       'result-matrix': isInResultMatrix
       }]">
    <input
        class="mc-cell__input"
        v-model="value"
        @keypress="inputCheck"
    />
    <div :class="[{
      'mc-cell__clear-bottom': isBottomClear,
      'mc-cell__clear-top': !isBottomClear
    }]"
         v-if="lastCell"
         @click="clearMatrix">X
    </div>
  </div>
</template>

<script>
  export default {
    name: "mc-cell",

    props: {
      index: {
        type: String,
        default: ''
      }
    },

    computed: {
      lastCell() {
        return this.$store.getters.getFirstMatrixLastCell === this.index ||
            this.$store.getters.getSecondMatrixLastCell === this.index
      },

      value: {
        get() {
          return this.$store.getters.getCellValue(this.index);
        },

        set(val) {
          this.$store.commit('UPDATE_CELL', {cell: this.index, newValue: val})
        }
      },

      isInFirstMatrix() {
        return this.$store.getters.isInFirstMatrix(this.index);
      },

      isInSecondMatrix() {
        return this.$store.getters.isInSecondMatrix(this.index);
      },

      isInResultMatrix() {
        return this.$store.getters.isInResultMatrix(this.index);
      },

      isBottomClear() {
        if (this.$store.getters.getFirstMatrixLastCell === this.index) {
          return this.$store.getters.getFirstMatrixIsBottomClear
        } else if (this.$store.getters.getSecondMatrixLastCell === this.index) {
          return this.$store.getters.getSecondMatrixIsBottomClear;
        } else {
          return false;
        }
      }
    },

    methods: {
      clearMatrix() {
        this.$store.commit('CLEAR_MATRIX', {lastCell: this.index});
      },

      inputCheck(e) {
        if (this.value.length >= 5) e.preventDefault();
        if (e.key === 'Backspace' || e.key === 'Delete') {
          return true;
        }
        if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode !== 46 && e.keyCode !== 45) {
          e.preventDefault();
        }
        if (e.key === '.' && this.value.includes('.')) e.preventDefault();
        if (e.key === '-' && this.value.includes('-')) e.preventDefault();

      }
    }
  }
</script>

<style scoped>
  .mc-cell__container {
    position: relative;
    display: inline-block;
    width: 4vw;
    height: 4vh;
  }

  .mc-cell__input {
    width: 4vw;
    height: 4vh;

    background-color: #F4EDED;

    font-family: "Droid Sans Mono", Monospaced, monospace;
    font-size: calc(0.7vh + 0.7vw);
    text-align: center;
    user-select: none;
  }

  .result-matrix input {
    background-color: #6096BA;
  }

  .first-matrix input {
    background-color: #1DD3B0;
  }

  .second-matrix input {
    background-color: #EF8354;
  }

  .first-matrix.second-matrix input {
    /*background-color: #849960;*/
    background-color: #A3A075;
  }

  .mc-cell__clear-bottom {
    font-family: "Droid Sans Mono", Monospaced, monospace;
    font-weight: bold;

    position: absolute;
    bottom: -5px;
    right: -5px;
    z-index: 99;

    height: 2vh;
    width: 2vw;

    line-height: 2vh;
    color: white;
    background-color: red;
    border-radius: 15px;
    user-select: none;
  }

  .mc-cell__clear-top {
    font-family: "Droid Sans Mono", Monospaced, monospace;
    font-weight: bold;

    position: absolute;
    top: -5px;
    left: -5px;
    z-index: 99;

    height: 2vh;
    width: 2vw;

    line-height: 2vh;
    color: white;
    background-color: red;
    border-radius: 15px;
    user-select: none;
  }

  .mc-cell__input:focus {
    outline: none;
  }
</style>