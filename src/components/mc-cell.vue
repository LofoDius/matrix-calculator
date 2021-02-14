<template>
  <div class="mc-cell__container" :class="[{'first-matrix': isInFirstMatrix, 'second-matrix': isInSecondMatrix}]">
    <input class="mc-cell__input" v-model="value"/>
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
  }


}
</script>

<style scoped>
  .mc-cell__container {
    display: inline-block;
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

</style>