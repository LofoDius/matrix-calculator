<template>
  <div class="mc-operations__container">
    <mc-button
        v-for="operation in operations"
        :key="operation"
        :label="operation"
        @onButtonClick="onButtonClick"
    />
  </div>
</template>

<script>
  import McButton from "@/components/mc-button";

  export default {
    name: "mc-operations",
    components: {McButton},

    data() {
      return {
        operations: ['Сложить', 'Умножить', 'Вычесть', 'Очистить']
      }
    },

    methods: {
      onButtonClick(label) {
        this.$emit('onButtonClick', label);
      }
    }
  }
</script>

<style scoped>
.mc-operations__container {
  display: flex;
  height: 5vh;
  width: 80vw;
  margin: 2vh auto;
  justify-content: space-around;
}
</style>