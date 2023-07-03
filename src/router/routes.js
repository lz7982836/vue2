import HomeView from '../views/HomeView/HomeView.vue';
export default [
  {
    path: '/',
    redirect: '/HomeView',
  },
  {
    path: '/HomeView',
    component: HomeView,
  },
];
