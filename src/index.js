/* eslint-disable vue/multi-word-component-names */
/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import { Icon } from '@iconify/vue2';
import Drawer from './components/Drawer.vue';
import App from './App.vue';
import router from './router';
// 1、引入路由插件
// import VueRouter from 'vue-router';
// 2、注册全局组件
// Vue.use(VueRouter);
// 3、实例化组件
// import HomeView from './views/HomeView/HomeView.vue';
// const router = new VueRouter({
//   routes: [
//     {
//       path: '/',
//       redirect: '/HomeView',
//     },
//     {
//       path: '/HomeView',
//       component: HomeView,
//     },
//   ],
// });

// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Icon', Icon);
Vue.component('Drawer', Drawer);

const vm = new Vue({
  el: '#app', // 挂载节点
  // 4、将实例化的router注入到root中
  // 提供了两个vue实例（全局的）属性 $router===router 、$route
  router,
  components: { App },
  template: '<App />',
});
