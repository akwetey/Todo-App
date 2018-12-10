import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const TodoStore = new Vuex.Store({
    state: {
        todos: []
    },
    mutations: {
        Add(state,data) {
            state.todos.push(data);
        },
        Load(state,data){
            state.todos=data;
        }
    },
    actions:{

    }
})

export default TodoStore;