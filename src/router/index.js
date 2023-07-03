// 1、引入
import VueRouter from 'vue-router';
import routes from './routes.js';
// 2、注册全局
import Vue from 'vue';
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});
export default router;
