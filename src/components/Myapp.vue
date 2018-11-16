<template>
  <div>
    <p class="tasks">Completed Tasks: {{todos.filter(todo => {return todo.done === true}).length}}</p>
    <p class="tasks">Pending Tasks: {{todos.filter(todo => {return todo.done === false}).length}}</p>
    <todo
    v-on:delete-todo="$emit('delete-todo', todo)"
    v-on:complete-todo="$emit('complete-todo', todo)"
    v-for="todo in todos" :key="todo.id"
    v-bind:todo="todo">
</todo>
  </div>
</template>


<script>
//import component todo
import Todo from './Todo';
export default {
  // name of component created
name:'Myapp',
// passing todos property from parent component to child
props: ['todos'],
//register component todo
components:{
  Todo,
},
methods: {

  },
};
//end of method
</script>

<style scoped>
p.tasks {
  text-align: center;
}
</style>






