/* eslint-disable vue/multi-word-component-names */
/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import { Icon } from '@iconify/vue2';
import Drawer from './components/Drawer';
import App from './App.vue';
import router from './router';

// eslint-disable-next-line vue/multi-word-component-names
// import Dialog from './components/Dialog';
Vue.component('Icon', Icon);
Vue.use(Drawer);
// Vue.component('Drawer', Drawer);

// Vue.extent给Vue构造函数配置项设置默认值
// const store = new Vuex.Store({
//   state: {
//     count: 123,
//     msg: 'hello, vuex!',
//   },
//   mutations: {},
// });
const app = new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App />',
  // created() {
  //   console.log(this.$store);
  // },
});
// Vue.extend()
// const vm = new Vue({
//   // el: '#app', // 挂载节点
//   router,
//   components: { App },
//   template: '<App />',
// });
// vm.$mount(); // 把模板编译为浏览器能够识别的html片段并赋值给app的$el属性
// setTimeout(() => {
//   document.querySelector('body').appendChild(vm.$el);
// }, 5000);
// window.vm = vm;
// console.log(vm);
