<template>
  <VTooltip class="mc-instruction-dropdown__container">
    <button class="mc-instruction-dropdown__button">?</button>
    <template #popper>
      <mc-instruction/>
    </template>
  </VTooltip>
</template>

<script>
  import McInstruction from "@/components/mc-instruction";

  export default {
    name: "mc-instruction-dropdown",
    components: {McInstruction}
  }
</script>

<style scoped>
  .mc-instruction-dropdown__button {
    border-radius: 25%;
    outline: none;
    border: none;
    font-size: calc(0.7vh + 0.7vw);
  }
</style>