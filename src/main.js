// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import TodoStore from './store/TodoStore';
import Vuex from 'vuex'
Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.use(VueSweetalert2);
/* eslint-disable no-new */
new Vue({
  TodoStore,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
