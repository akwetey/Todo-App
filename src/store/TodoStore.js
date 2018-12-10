import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const TodoStore = new Vuex.Store({
    debug: true,
    state: {
        todos: [],
        completed_count: 0,
        pending_count: 0,
    },
    mutations: {
        Add(state, data) {
            state.todos.push(data);
        },
        Load(state, data) {
            state.completed_count = 0;
            state.pending_count = 0;
            data.forEach(function (key) {
                if (key.is_complete === 1) {
                    state.completed_count++;
                } else if (key.is_complete === 0) {
                    state.pending_count++;
                }
            });
            state.todos = data;
        },
        Get(state) {
            return state.todos;
        },
        Delete(state, data) {
            let index = state.todos.indexOf(data.id);
            state.todos.splice(index, 1)
        }
    },
    actions: {},
    computed: {},
    getters: {
        getCompleted: state => {
            return state.completed_count;
        },
        getPending: state => {
            return state.pending_count;
        }
    }
});

export default TodoStore;