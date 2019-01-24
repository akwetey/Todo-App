<template>
    <div id="app">
        <h1 class="ui dividing centered header">Vue.js Todo App</h1>
        <div class='ui three column centered grid'>
            <div class='column'>

                <add-todo v-on:add-todo="addTodo"></add-todo>
                <myapp v-bind:todos="todos"
                       v-on:delete-todo="deleteTodo"
                       v-on:complete-todo="completeTodo">
                </myapp> <!-- v-on: listening for the events -->


            </div>
        </div>
<!--         <Pagination v-bind:totalPages="totalPages" 
        v-bind:total="total"
        v-bind:currentPage="currentPage"  /> -->

        <Pagination
   :total-pages="totalPages"
   :total="total"
   :per-page="perPage"
   :current-page="currentPage"
   @pagechanged="onPageChange"
 />
    </div>

</template>

<script>

    import {API_URL} from '../config/dev.env.js';
    import Myapp from './components/Myapp';
    import Todo from './components/Todo';
    import AddTodo from './components/AddTodo';
    import TodoStore from './store/TodoStore';

    import axios from 'axios';
    import Pagination from './components/pagination';
    export default {
        name: 'App',
        components: {
            Myapp,
            Todo,
            AddTodo,
            Pagination
        },
        methods: {
            addTodo(newTodo) {
                let _self = this;
                axios.post(API_URL + '/save_todo', {
                    data: newTodo
                }).then(function (response) {
                    axios.get(API_URL + '/todo_list')
                        .then(function (response) {
                            TodoStore.commit('Load', response.data.data);
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
                                    TodoStore.commit('Load', response.data.data);
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
                                TodoStore.commit('Load', response.data.data);
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
                onPageChange(page) {
      console.log(page)
      this.currentPage = page;

      var _self = this;
            axios.get(API_URL + '/todo_list?page='+page)
                .then(function (response) {
                    _self.totalPages     = response.data.last_page;
                    _self.per_page     =response.data.per_page;
                    _self.currentPage   =response.data.current_page;
                    _self.total             =response.data.total;
                    TodoStore.commit('Load', response.data.data);
                    _self.todos = TodoStore.state.todos;
                })
                .catch(function (error) {
                    console.log(error);
                });
    }
        },
        data() {
            return {
                todos: [],
                totalPages:0,
                currentPage:1,
                total:1,
                perPage:5
            }
        },
        mounted() {
            var _self = this;
            axios.get(API_URL + '/todo_list')
                .then(function (response) {
                    _self.totalPages     = response.data.last_page;
                    _self.per_page     =response.data.per_page;
                    _self.currentPage   =response.data.current_page;
                    _self.total             =response.data.total;
                    TodoStore.commit('Load', response.data.data);
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
