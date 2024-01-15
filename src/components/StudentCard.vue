<template>

  <v-snackbar v-model="snackbar" timeout="2000">
    <span> {{snackMessage}}</span>
  </v-snackbar>

  <v-card v-if="!editMode">
    <v-card-item>
      <div>
        <v-card-title
          >{{ student?.nome }} - {{ student?.matricula }}</v-card-title
        >
        <v-card-subtitle>{{ student?.situacaoMatricula.nome }}</v-card-subtitle>
        <v-card-subtitle>Meus Hobbies</v-card-subtitle>
        <v-card-text>{{ student?.hobbies }}</v-card-text>
      </div>
    </v-card-item>

    <v-card-actions class="buttons">
      <v-btn class="editButton" @click="toggleEditStudent">editar</v-btn>
      <v-btn class="deleteButton" @click="deleteStudent">deletar</v-btn>
    </v-card-actions>
  </v-card>

  <v-card v-if="editMode">
    <v-card-item>
      <v-text-field v-model="studentData.nome" label="Nome" />
      <v-text-field v-model="studentData.matricula" label="Matricula" />
      <v-text-field v-model="studentData.hobbies" label="Hobbies" />
    </v-card-item>

    <v-card-actions class="buttons">
      <v-btn class="editButton" @click="saveStudent" >salvar</v-btn>
      <v-btn class="cancelButton" @click="cancelRegistration">cancelar</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import {
  deleteStudentByMatricula, updateStudent,
} from '@/services/students.js';

export default {
  data() {
    return {
      editMode: false,
      studentData:{
        ...this.$props.student
      },
      snackbar: false,
      snackMessage: '',
    };

  },
  computed: {
    updatedStudent: {
      get() {
        return this.$props.student;
      },
      set(value) {
        this.$props.student = value;
      },
    },
  },
  props: {
    student: {
      type: Object,
      required: true,
    }
  },
  methods: {
    toggleEditStudent() {
      this.editMode = !this.editMode;
    },
    async saveStudent() {
      await updateStudent(this.student.matricula ,this.studentData);
      this.snackMessage = 'Que legal, você editou um aluno!';
      this.snackbar = !this.snackbar;
      this.$emit('refreshStudents');
      this.toggleEditStudent();

    },
    async deleteStudent() {
      this.snackMessage = 'Que pena, você deletou um aluno!';
      this.snackbar = !this.snackbar;
      await deleteStudentByMatricula(this.student.matricula);
      this.$emit('refreshStudents');
    },
    cancelRegistration(){
      this.studentData = this.student;
      this.toggleEditStudent();
      this.$emit('refreshStudents');
    }

  },
};
</script>

<style scoped>
.v-card {
  min-width: 344px;
  background-color: rgb(24, 26, 27);
  color: rgb(232, 230, 227);
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.editButton {
  background-color: hsla(160, 100%, 37%, 1);
}

.deleteButton {
  background-color: red;
}

.cancelButton {
  background-color: rgb(153, 153, 0);
}
</style>
