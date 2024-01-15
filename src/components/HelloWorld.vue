<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
       Este é o portal de cadastro de alunos da
      <a href="https://www.instagram.com/equipesiga_ufrj/" target="_blank">Equipe Siga</a>
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
.greetings {
  text-align: center;
  margin-top: 8vh;
}

@media (min-width: 1024px) {
  .greetings {
    text-align: left;
  }
}
</style>
