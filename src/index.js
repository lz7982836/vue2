/* eslint-disable vue/multi-word-component-names */
/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import { Icon } from '@iconify/vue2';
import Drawer from './components/Drawer.vue';

import App from './App.vue';

// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Icon', Icon);
Vue.component('Drawer', Drawer);

const vm = new Vue({
  el: '#app', // 挂载节点
  components: { App },
  template: '<App />',
});
