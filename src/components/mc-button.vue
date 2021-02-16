<template>
  <button class="mc-button" @click="$emit('onButtonClick', label)"> {{ label }} </button>
</template>

<script>
  export default {
    name: "mc-button",

    props: {
      label: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
.mc-button {
  width: 10vw;
  height: 5vh;

  font-size: calc(0.8vw + 0.8vh);
  vertical-align: center;
  background-color: #977390;
  color: white;
  border-radius: 30px;
  border: 2px #706079 solid;
}

.mc-button:hover {
  background-color: #A88AA2;
}

.mc-button:active {
  background-color: #BAA1B5;
}

.mc-button:focus {
  outline: 0;
}
</style>