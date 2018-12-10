<template>
    <div>
        <p class="tasks">Completed Tasks: {{completed_count}}</p>
        <p class="tasks">Pending Tasks: {{pending_count}} </p>
        <todo
                v-on:delete-todo="$emit('delete-todo', todo)"
                v-on:complete-todo="$emit('complete-todo', todo)"
                v-for="todo in todos" :key="todo.id"
                v-bind:todo="todo">
        </todo>
    </div>
</template>


<script>

    import Todo from './Todo';
    import TodoStore from '../store/TodoStore';


    export default {
        name: 'Myapp',
        props: ['todos'],
        components: {
            Todo,
        },
        computed:{
            completed_count(){
                return TodoStore.state.completed_count;
            },
            pending_count(){
                return TodoStore.state.pending_count;
            }
        }
    };
</script>

<style scoped>
    p.tasks {
        text-align: center;
    }
</style>






