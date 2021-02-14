<template>
  <div id="app"
       @mousedown="onmousedown"
       @mouseup="onmouseup">
    <div v-for="i in 20" :key="i">
      <mc-cell
          v-for="j in 20"
          :key="i + 'x' + j"
          :index="i + 'x' + j"
          :id="i + 'x' + j"/>
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
        mouseDownCell: ''
      }
    },

    methods: {
      onmousedown(e) {
        this.mouseDownCell = e.path[1].id;
      },

      onmouseup(e) {
        console.log('UPSUKA');
        this.$store.commit('UPDATE_MATRIX', {firstCell: this.mouseDownCell, secondCell: e.path[1].id});
        this.mouseDownCell = '';
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
