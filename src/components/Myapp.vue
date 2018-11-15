<template>
  <div>
    <p class="tasks">Completed Tasks: {{todos.filter(todo => {return todo.done === true}).length}}</p>
    <p class="tasks">Pending Tasks: {{todos.filter(todo => {return todo.done === false}).length}}</p>
    <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="todo in todos" :key="todo.id"  v-bind:todo="todo"></todo>
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
  // delete method
    deleteTodo(todo) {
       this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,


       }).then((result) => {
         const todoIndex = this.todos.indexOf(todo);
         this.todos.splice(todoIndex, 1)
         if (result.value){
           this.$swal('Deleted!', 'Your Todo has been deleted', 'success')
         }
         else{
           this.$swal('Canceled', 'Your Todo is still in place', 'info')
         }

       });
    },
   //complete method
    completeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].done = true;
      this.$swal('Success', 'Todo Completed!', 'success');
    },
  }
};
//end of method
</script>

<style scoped>
p.tasks {
  text-align: center;
}
</style>






