<template>
  <v-snackbar v-model="snackbar" timeout="2000">
    <span> {{snackMessage}}</span>
  </v-snackbar>

  <div class="studentForm">

    <v-btn class="createButton" @click="toggleCreateStudent"> Cadastrar novo aluno</v-btn>

    <v-card class="createStudentForm" v-if="createMode">
      <v-card-item>
        <v-text-field v-model="createStudentData.nome" label="Nome"/>
        <v-text-field v-model="createStudentData.matricula" label="Matricula"/>
        <v-text-field v-model="createStudentData.hobbies" label="Hobbies"/>
      </v-card-item>

      <v-card-actions class="buttons">
        <v-btn class="registerButton" @click="createStudent">cadastrar</v-btn>
        <v-btn class="cancelRegistration" @click="cancelRegistration">cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {createStudent, getAllStudents} from "@/services/students.js";

export default {
  created() {
    this.getStudents()
  },
  data() {
    return {
      students: [],
      createMode: false,
      snackbar: false,
      createStudentData: {
        nome: '',
        matricula: '',
        hobbies: '',
      },
      snackMessage: '',
    }
  },
  methods: {
    async getStudents() {
      const students = await getAllStudents();
      this.students = students;
    },
    toggleCreateStudent() {
      this.createMode = !this.createMode;
    },
    async createStudent() {
      try{
        await createStudent(this.createStudentData);
        this.toggleCreateStudent();
        this.snackMessage = 'Legal, você criou um aluno!';
        this.snackbar = !this.snackbar;
        this.$emit('refreshStudents');
        this.createStudentData = ' ';
      }
      catch (e){
        this.snackMessage = 'Não foi possível criar um aluno!\n' +
            `Erro: ${e.response.data.message}`;
        this.snackbar = !this.snackbar;
      }
    },
    cancelRegistration(){
      this.createStudentData = ' ';
      this.toggleCreateStudent();
      this.$emit('refreshStudents');
    }
  },

}
</script>

<style scoped>

.studentForm {
  width: 50vw;
  display: flex;
  flex-direction: column;
  margin-bottom: 15vh;
  background-color: rgb(24, 26, 27);
}

.createStudentForm {
  background-color: rgb(24, 26, 27);
  color: rgb(232, 230, 227);
}
.createButton {
  color:white;
  background-color: hsla(160, 100%, 37%, 1);
}
.registerButton{
  background-color: hsla(160, 100%, 37%, 1);
}
.cancelRegistration {
  background-color: rgb(153, 153, 0);
}
</style>