<template>
  <div id="app"
       @mousedown="onmousedown"
       @mouseup="onmouseup"
       @mouseover="onmouseover"
  >
    <mc-operations @onButtonClick="onButtonClick"/>
    <mc-instruction-dropdown class="mc-instruction-dropdown"/>
    <div v-for="i in 20" :key="i">
      <mc-cell
          v-for="j in 20"
          :key="i + 'x' + j"
          :index="i + 'x' + j"
          :id="i + 'x' + j"
      />
    </div>
    <notifications class="notification" position="bottom right"/>
  </div>
</template>

<script>
  import McCell from "@/components/mc-cell";
  import McOperations from "@/components/mc-operations";

  import McInstructionDropdown from "@/components/mc-instruction-dropdown";
  export default {
    name: 'App',
    components: {
      McInstructionDropdown,
      McOperations,
      McCell,
    },

    mounted() {
      this.$store.commit("INIT_STORE");
    },

    data() {
      return {
        mouseDownCell: '',
        lastHoveredCell: '',
        isInsertMode: false
      }
    },

    methods: {
      onmousedown(e) {
        if (this.isInsertMode) {
          this.$store.commit('INSERT_RESULT');
          this.isInsertMode = false;
          return;
        }
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
        if (e.path[1].id === 'app') {
          return 0;
        }

        if (this.mouseDownCell === '') {
          if (this.isInsertMode) {
            this.$store.commit('UPDATE_RESULT_COORDS', {cell: e.path[1].id});
          }

          return 0;
        }

        if (e.path[1].id !== this.lastHoveredCell) {
          this.lastHoveredCell = e.path[1].id;
          this.$store.commit('UPDATE_MATRIX',
              {firstCell: this.mouseDownCell, secondCell: this.lastHoveredCell});
        }
      },

      onButtonClick(label) {
        if (label === 'Очистить') {
          this.$store.commit('INIT_STORE');
          return;
        }
        if (!this.$store.getters.isFirstMatrixSaved || !this.$store.getters.isSecondMatrixSaved) {
          this.$notify({
            type: 'info', title: 'Ошибка ввода', text: 'Выделите две области, а уже потом ' +
                'рассчеты свои вот эти вот все калькулируйте!', duration: 4000
          });
          return;
        }
        switch (label) {
          case 'Сложить': {
            if (this.$store.getters.getFirstMatrixHeight !== this.$store.getters.getSecondMatrixHeight
            || this.$store.getters.getSecondMatrixWidth !== this.$store.getters.getFirstMatrixWidth) {
              this.$notify({
                type: 'error', title: 'Неправильные размеры',
                text: 'Для сложения выделите одинаковые по размеру матрицы'
              });
              return;
            }

            this.$store.commit('ADD');
            this.isInsertMode = true;
            this.$notify({
              type: 'info', title: 'Результат сложения',
              text: 'Выберите область для вставки результата'
            });
            break;
          }
          case 'Умножить': {
            if (this.$store.getters.getFirstMatrixWidth !== this.$store.getters.getSecondMatrixHeight) {
              this.$notify({
                type: 'error', title: 'Неправильные размеры',
                text: 'Для умножения ширина первой матрицы должна равняться высоте второй матрицы'
              });
              return;
            }

            this.$store.commit('MULTIPLY');
            this.isInsertMode = true;
            this.$notify({
              type: 'info', title: 'Результат умножения',
              text: 'Выберите область для вставки результата'
            });
            break;
          }
          case 'Вычесть': {
            if (this.$store.getters.getFirstMatrixHeight !== this.$store.getters.getSecondMatrixHeight
                || this.$store.getters.getSecondMatrixWidth !== this.$store.getters.getFirstMatrixWidth) {
              this.$notify({
                type: 'error', title: 'Неправильные размеры',
                text: 'Для вычитания выделите одинаковые по размеру матрицы'
              });
              return;
            }

            this.$store.commit('SUBTRACT');
            this.isInsertMode = true;
            this.$notify({
              type: 'info', title: 'Результат вычитания',
              text: 'Выберите область для вставки результата'
            });
            break;
          }
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

  .notification-content {
    font-size: 15px;
  }

  .mc-instruction-dropdown {
    display: flex;
    width:2vh;
    justify-self: start;
    margin: 5px 8vw;
  }

</style>
