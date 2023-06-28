import Vue from 'vue';
import { Icon } from '@iconify/vue2';
import App from './App.vue';

Vue.component('Icon', Icon);
const vm = new Vue({
  el: '#app', // 挂载节点
  components: { App },
  template: '<App />',
});
