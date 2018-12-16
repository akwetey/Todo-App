<template>
    <div id="app">
        <h1 class="ui dividing centered header">Vue.js Todo App</h1>
        <div class='ui three column centered grid'>
            <div class='column'>

                <add-todo v-on:add-todo="addTodo"></add-todo>
                <myapp v-bind:todos="todos"
                       v-on:delete-todo="deleteTodo"
                       v-on:complete-todo="completeTodo"
                       v-on:hide-form="hideForm">
                </myapp> <!-- v-on: listening for the events -->


            </div>
        </div>
    </div>

</template>

<script>

    import {API_URL} from '../config/dev.env.js';
    import Myapp from './components/Myapp';
    import Todo from './components/Todo';
    import AddTodo from './components/AddTodo';
    import TodoStore from './store/TodoStore';

    import axios from 'axios';

    export default {
        name: 'App',
        components: {
            Myapp,
            Todo,
            AddTodo,
        },
        methods: {
            addTodo(newTodo) {
                let _self = this;
                axios.post(API_URL + '/save_todo', {
                    data: newTodo
                }).then(function (response) {
                    axios.get(API_URL + '/todo_list')
                        .then(function (response) {
                            TodoStore.commit('Load', response.data);
                            _self.todos = TodoStore.state.todos;
                        }).catch(function (error) {
                            console.log(error);
                        });
                }).catch(function (error) {
                    console.log(error);
                });
            },
            deleteTodo(todo) {
                let _self = this;
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
                        axios.post(API_URL + '/delete_todo', {
                            data: todo
                        }).then(function (response) {
                            TodoStore.commit('Delete', todo);
                            axios.get(API_URL + '/todo_list')
                                .then(function (response) {
                                    TodoStore.commit('Load', response.data);
                                    _self.todos = TodoStore.state.todos;
                                }).catch(function (error) {
                                    console.log(error);
                                });
                        }).catch(function (error) {
                            console.log(error);
                        });
                        this.$swal('Deleted!', 'Your Todo has been deleted', 'success')
                    } else {
                        this.$swal('Canceled', 'Your Todo is still in place', 'info')
                    }

                });
            },
              hideForm(todo) {
                this.isEditing = false;
                let _self = this;
                this.$swal('Success', 'Todo Updated!', 'success').then((result)=>{
                axios.post(API_URL + '/update_todo', {
                    data: todo
                }).then(function (response) {
                        _self.todos = TodoStore.state.todos;
                }).catch(function (error) {
                        console.log(error);
                });
              });
            },

            completeTodo(todo) {
                let _self = this;
                const todoIndex = this.todos.indexOf(todo);
                this.todos[todoIndex].done = true;
                this.$swal('Success', 'Todo Completed!', 'success').then((result)=>{
                    axios.post(API_URL + '/complete_todo', {
                        data: todo
                    }).then(function (response) {
                        axios.get(API_URL + '/todo_list')
                            .then(function (response) {
                                TodoStore.commit('Load', response.data);
                                _self.todos = TodoStore.state.todos;
                                todo.is_complete=1;
                            }).catch(function (error) {
                            console.log(error);
                        });
                        }).catch(function (error) {
                        console.log(error);
                    });
                });
            },
        },
        data() {
            return {
                todos: [],
            }
        },
        mounted() {
            var _self = this;
            axios.get(API_URL + '/todo_list')
                .then(function (response) {
                    TodoStore.commit('Load', response.data);
                    _self.todos = TodoStore.state.todos;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
</script>

<style>

</style>
