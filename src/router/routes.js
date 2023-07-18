import HomeView from '../views/HomeView/HomeView.vue';
import SearchView from '../views/SearchView/SearchView.vue';
import Singer from '../views/SearchView/Singer.vue';
import Genre from '../views/SearchView/Genre.vue';
import Zone from '../views/SearchView/Zone.vue';
import SongDetailsView from '../views/SongDetailsView/SongDetailsView.vue';
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
  {
    path: '/SongDetailsView:id',
    component: SongDetailsView,
  },
  {
    path: '/Foo',
    // 懒加载组件
    component: () => import('../views/Foo.vue'),
  },
  {
    path: '/Login',
    // 懒加载组件
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/Rest',
    // 懒加载组件
    component: () => import(/* webpackChunkName:'rest' */ '../views/Rest.vue'),
  },
  {
    path: '/PersonalHomepageView',
    // 懒加载组件
    component: () =>
      import(
        /* webpackChunkName:'rest' */ '../views/PersonalHomepageView/PersonalHomepageView.jsx'
      ),
  },
  {
    path: '/InformationView',
    // 懒加载组件
    component: () => import('../views/InformationView/InformationView.jsx'),
  },
  {
    path: '/0708',
    // 懒加载组件
    component: () => import('../views/Feat-0708.vue'),
  },
  {
    path: '/Player',
    // 懒加载组件
    component: () => import('../components/Player/Player.vue'),
  },
  {
    path: '/PlayerHome',
    // 懒加载组件
    component: () => import('../views/PlayerHome/PlayerHome.vue'),
  },
  {
    path: '/MVView',
    // 懒加载组件
    component: () => import('../views/MVView/MVView.jsx'),
  },
  {
    path: '/MvVideoView/:id',
    component: () => import('../views/MVView/components/MvVideoView.vue'),
  },
];
