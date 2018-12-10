<template>
    <div id="app">
        <h1 class="ui dividing centered header">Vue.js Todo App</h1>
        <div class='ui three column centered grid'>
            <div class='column'>
                <myapp v-bind:todos="todos"
                       v-on:delete-todo="deleteTodo"
                       v-on:complete-todo="completeTodo">
                </myapp> <!-- v-on: listening for the events -->

                <add-todo v-on:add-todo="addTodo"></add-todo>
            </div>
        </div>
    </div>

</template>

<script>
    //import component created
    const API_URL = 'http://localhost:8001/api';
    import Myapp from './components/Myapp';
    import Todo from './components/Todo';
    import AddTodo from './components/AddTodo';
    import TodoStore from './store/TodoStore';

    import axios from 'axios';

    export default {

        //name of the main component
        name: 'App',

// register component
        components: {
            Myapp,
            Todo,
            AddTodo,
        },
        methods: {
            addTodo(newTodo) {
                axios.post(API_URL + '/save_todo', {
                    data: newTodo
                }).then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                TodoStore.commit('Add', newTodo)
            },
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

                    if (result.value) {

                        axios.post(API_URL + '/todo_list',{
                            data:todo
                        })
                            .then(function (response) {
                                //TodoStore.commit('Load', response.data)
                                _self.todos = TodoStore.state.todos;
                                console.log(response.data);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        // const todoIndex = this.todos.indexOf(todo);
                        // this.todos.splice(todoIndex, 1)
                        this.$swal('Deleted!', 'Your Todo has been deleted', 'success')
                    } else {
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
        },
        // data supplied to main component
        data: function () {
            //return an array of data
            return {
                todos: [],
            }

        },
        mounted() {
            var _self =this;
            axios.get(API_URL + '/todo_list')
                .then(function (response) {
                    TodoStore.commit('Load', response.data)
                    _self.todos = TodoStore.state.todos;
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });


        }
    };
</script>

<style>

</style>
