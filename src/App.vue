<template>

 <div class="body">
   <header style="flex-direction: column">
     <div class="wrapper">
       <img alt="Vue logo" class="logo" src="./assets/logo.png" width="125" height="125"/>
       <HelloWorld msg="Boas Vindas!"/>
     </div>
     <StudentForm @refreshStudents="getStudents"/>

   </header>
   <main class="cardContainer">

     <v-container>
       <v-row align="center" justify="center">
         <v-col v-for="(student, i) in students" :key="i" cols="auto">
           <StudentCard :student="student" @refreshStudents="getStudents"/>
         </v-col>
       </v-row>
     </v-container>
   </main>
 </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import StudentCard from './components/StudentCard.vue'
import StudentForm from "./components/StudentForm.vue";

import {getAllStudents} from "@/services/students.js";

export default {
  components: {
    StudentForm,
    HelloWorld,
    StudentCard
  },
  created() {
    this.getStudents()
  },
  data() {
    return {
      students: [],
      createMode: false,
      snackbar: false,
      snackMessage: '',
    }
  },
  props: {
    student: {
      type: Object,
      required: true,
    }
  },
  methods: {
    async getStudents() {
      const students = await getAllStudents();
      this.students = students;
    }
  },

}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 3rem 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    margin: 1rem 0 5rem 0;
  }

  .cardContainer {
    max-height: 100vh;
    overflow-x: scroll;
    flex-direction: row;
    display: flex;
  }
  .cardContainer::-webkit-scrollbar {
    display: none;
  }
.body{
  display: flex;
  flex-direction: column;
  width: 80vw;
}

}
</style>
