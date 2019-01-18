<template>
    <div id="app">
        <h1 class="ui dividing centered header">Vue.js Todo App</h1>
<div class="pagination">
  <button class="btn btn-primary" v-on:click="fetchPaginate(pagination.prev_page_url)" :disabled="!pagination.prev_page_url" >Previous</button>
  <span>Page {{pagination.current_page}} of {{pagination.last_page}}</span>
  <button  class="btn btn-primary" style="margin-left:5px" v-on:click="fetchPaginate(pagination.next_page_url)" :disabled="!pagination.next_page_url" >Next</button>
</div>
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
             makePagination(data){
             let pagination = {
             current_page: data.current_page,
             last_page: data.last_page,
             next_page_url: data.next_page_url,
             prev_page_url: data.prev_page_url
             }
            this.pagination = pagination
            },

            fetchPaginate(url){
            this.url = url
            this.getTodos()
            },
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
                  getTodos(){
                 var _self = this;
                 //let $this = this;
                 axios.get(this.url)
                .then(function (response) {
                    TodoStore.commit('Load', response.data.data);
                    _self.todos = TodoStore.state.todos;
                    _self.makePagination(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
              },
        },
        data() {
            return {
                todos: [],
                pagination:{},
                url: 'http://localhost:8000/api/todos',
            }
        },
        mounted() {
          this.getTodos();
        }
    };
</script>

<style>

</style>
