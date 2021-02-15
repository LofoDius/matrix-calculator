<template>
  <div class="mc-cell__container"
       :class="[{
         'first-matrix': isInFirstMatrix,
       'second-matrix': isInSecondMatrix,
       }]">
    <input
        class="mc-cell__input"
        v-model="value"
    />
    <div class="mc-cell__clear" v-if="lastCell" @click="clearMatrix">X</div>
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
        if (this.$store.getters.isInFirstMatrix(this.index)) {
          return this.$store.getters.getFirstMatrixLastCell === this.index;
        } else if (this.$store.getters.isInSecondMatrix(this.index)){
          return this.$store.getters.getSecondMatrixLastCell === this.index;
        } else {
          return false;
        }
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
      }
    },

    methods: {
      clearMatrix() {
        console.log('here');
        this.$store.commit('CLEAR_MATRIX', {lastCell: this.index});
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

    border: 1px solid black;
    border-radius: 0;
  }

  .first-matrix input {
    background-color: rgba(46, 148, 247, 50);
  }

  .second-matrix input {
    background-color: rgba(3, 199, 22, 50);
  }

  .first-matrix.second-matrix input {
    background-color: #2c5e9f;
  }

  .mc-cell__clear {
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
  }

</style>