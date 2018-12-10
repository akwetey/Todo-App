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
                    <input type='text' v-model.trim="todo.title">
                </div>
                <div class='field'>
                    <label>Project</label>
                    <input type='text' v-model.trim="todo.project">
                </div>
                <div class='ui two button attached buttons'>
                    <button class='ui basic blue button' v-on:click="hideForm(todo)">
                        Close X
                    </button>
                </div>
            </div>
        </div>
        <div class='ui bottom attached green basic button' v-show="!isEditing && todo.is_complete" disabled>
            Completed
        </div>
        <div class='ui bottom attached red basic button' v-on:click="completeTodo(todo)"
             v-show="!isEditing && !todo.is_complete">
            Pending
        </div>
    </div>

</template>



<script>
    import axios from 'axios';
    import {API_URL} from '../../config/dev.env.js';
    import TodoStore from '../store/TodoStore';
    export default {
        props: ['todo'],
        data() {
            return {
                isEditing: false,
            };
        },
        methods: {
            showForm() {
                this.isEditing = true;
            },
            hideForm(todo) {
                this.isEditing = false;
                let _self = this;
                axios.post(API_URL + '/update_todo', {
                    data: todo
                }).then(function (response) {
                        _self.todos = TodoStore.state.todos;
                }).catch(function (error) {
                        console.log(error);
                });
            },
            deleteTodo(todo) {
                this.$emit('delete-todo', todo);
            },
            completeTodo(todo) {
                this.$emit('complete-todo', todo);
            }
        },
    };
    // end of method
</script>

