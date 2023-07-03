import HomeView from '../views/HomeView/HomeView.vue';
import SearchView from '../views/SearchView/SearchView.vue';
import Singer from '../views/SearchView/Singer.vue';
import Genre from '../views/SearchView/Genre.vue';
import Zone from '../views/SearchView/Zone.vue';

export default [
  {
    path: '/',
    redirect: '/HomeView',
  },
  {
    path: '/HomeView',
    component: HomeView,
  },
  {
    path: '/SearchView',
    component: SearchView,
  },
  {
    path: '/Singer',
    component: Singer,
  },
  {
    path: '/Genre',
    component: Genre,
  },
  {
    path: '/Zone',
    component: Zone,
  },
];
