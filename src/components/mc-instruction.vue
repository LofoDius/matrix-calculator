<template>
  <div class="mc-instruction__container">
    <h1>А как этим пользоваться???</h1>
    <ol>
      <li>Введите какие-нибудь числа в ячейки</li>
      <li>Выделите две области - это будут матрицы. Пустые ячейки заполнятся нулями, поэтому нули можно не вводить</li>
      <li>Нажмите на кнопочку с нужным вам действием</li>
      <li>Кликните на какую-нибудь ячейку - в подсвеченную область будет помощен результат вычислений</li>
    </ol>
    <span>Пункты 1 и 2 можно поменять местами</span>
  </div>
</template>

<script>
  export default {
    name: "mc-instruction"
  }
</script>

<style scoped>
  h1 {
    margin-bottom: 0;
  }
  .mc-instruction__container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    font-family: "Roboto", sans-serif;
    font-size: 1.1rem;
    color: #F4EDED;

    background-color: #747798;

    /*border: 2px #6096BA solid;*/
    border-radius: 20px;

    padding: 0 15px 25px 15px;
    margin-left: 10px;
  }
</style>