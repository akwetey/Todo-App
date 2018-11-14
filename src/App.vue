<template>
  <div>
    <myapp v-bind:todos="todos"></myapp>
  </div>

</template>

<script>
//import component created
import Myapp from './components/Myapp';
export default {

  //name of the main component
  name: 'App',

// register component
  components:{
    Myapp,
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
