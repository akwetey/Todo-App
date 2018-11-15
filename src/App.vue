<template>
  <div id="app">
    <h1 class="ui dividing centered header">Vue.js Todo App</h1>
    <div class='ui three column centered grid'>
      <div class='column'>
        <myapp v-bind:todos="todos"></myapp>
        <add-todo v-on:add-todo="addTodo"></add-todo>
      </div>
    </div>
  </div>

</template>

<script>
//import component created
import Myapp from './components/Myapp';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';

export default {

  //name of the main component
  name: 'App',

// register component
  components:{
    Myapp,
    Todo,
    AddTodo,
  },
  methods: {
    addTodo(newTodo){
         this.todos.push(newTodo);
     
    }
  },
  // data supplied to main component
  data:function () {
    //return an array of data
    return {
      todos: [{
        title: 'Project 1',
        project: 'School',
        done: true,
      }, {
        title: 'Project 2',
        project: 'Mosque',
        done: true,
      }, {
        title: 'Project 3',
        project: 'Bank',
        done: false,
      },
        {
        title: 'Project 4',
        project: 'Hospital',
        done: false,
      },
      {
        title: 'Project 5',
        project: 'Church',
        done: false,
      }],
    }

  }
};
</script>

<style>

</style>
