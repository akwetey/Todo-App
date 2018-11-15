<template>
<div class='ui centered card'>
    <div class="content" v-show="!isEditing">
      <div class='header'>
          {{ todo.title }}
      </div>
      <div class='meta'>
          {{ todo.project }}
      </div>
      <div class='extra content'>
          <span class='right floated edit icon' v-on:click="showForm">
          <i class='edit icon'></i>
        </span>
        <span class='right floated trash icon' v-on:click="deleteTodo(todo)">
          <i class='trash icon'></i>
        </span>
      </div>
    </div>
    <div class="content" v-show="isEditing">
      <div class='ui form'>
        <div class='field'>
          <label>Title</label>
          <input type='text' v-model.trim="todo.title" >
        </div>
        <div class='field'>
          <label>Project</label>
          <input type='text' v-model.trim="todo.project" >
        </div>
        <div class='ui two button attached buttons'>
          <button class='ui basic blue button' v-on:click="hideForm">
            Close X
          </button>
        </div>
      </div>
    </div>
    <div class='ui bottom attached green basic button' v-show="!isEditing && todo.done" disabled>
        Completed
    </div>
    <div class='ui bottom attached red basic button' v-on:click="completeTodo(todo)" v-show="!isEditing && !todo.done">
        Pending
    </div>
  </div>

</template>


<script>
export default {
  //passing data to props property
props:['todo'],

data:function(){
  return{
  //set editing to false to hide it unless clicked
isEditing:false,

  };
},
methods:{
  // display form when the edit button is clicked
  showForm(){
    this.isEditing =true;

  },
  // close form when done with editing
  hideForm(){
    this.isEditing=false;
  },
  // delete a todo
  deleteTodo(todo) {
      this.$emit('delete-todo', todo);
    },
 // complete todo
  completeTodo(todo){
   this.$emit('complete-todo', todo);
  }
},
};
// end of method
</script>

