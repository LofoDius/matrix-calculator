<template>
  <div id="app"
       @mousedown="onmousedown"
       @mouseup="onmouseup"
       @mouseover="onmouseover"
  >
    <div v-for="i in 20" :key="i">
      <mc-cell
          v-for="j in 20"
          :key="i + 'x' + j"
          :index="i + 'x' + j"
          :id="i + 'x' + j"

      />
    </div>
  </div>
</template>

<script>
  import McCell from "@/components/mc-cell";

  export default {
    name: 'App',
    components: {
      McCell
    },

    mounted() {
      this.$store.commit("INIT_STORE");
    },

    data() {
      return {
        mouseDownCell: '',
        lastHoveredCell: ''
      }
    },

    methods: {
      onmousedown(e) {
        if (!this.$store.getters.isFirstMatrixSaved || !this.$store.getters.isSecondMatrixSaved) {
          this.mouseDownCell = e.path[1].id;
          this.lastHoveredCell = e.path[1].id;
        }
      },

      onmouseup(e) {
        if (this.mouseDownCell !== '') {
          if (this.lastHoveredCell === this.mouseDownCell) {
            this.$store.commit('CLEAR_TEMP_MATRIX', {lastCell: this.lastHoveredCell});
            this.mouseDownCell = '';
            return;
          }

          this.$store.commit('SAVE_MATRIX', {firstCell: this.mouseDownCell, secondCell: e.path[1].id});
          this.mouseDownCell = '';
        }
      },

      onmouseover(e) {
        if (this.mouseDownCell === '') {
          return 0;
        }

        if (e.path[1].id === 'app') {
          return 0;
        }

        if (e.path[1].id !== this.lastHoveredCell) {
          this.lastHoveredCell = e.path[1].id;
          this.$store.commit('UPDATE_MATRIX',
              {firstCell: this.mouseDownCell, secondCell: this.lastHoveredCell});
        }
      }
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    background-color: #2c3e50;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

  }
</style>
