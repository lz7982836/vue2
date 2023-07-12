/* eslint-disable vue/multi-word-component-names */
/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import { Icon } from '@iconify/vue2';
import App from './App.vue';
import router from './router';
import { Drawer } from './components';

import {
  Button,
  Popup,
  Area,
  Picker,
  Cell,
  Circle,
  Pagination,
  DatetimePicker,
  TabbarItem,
  Tabbar,
  Tabs,
  Tab,
} from 'vant';
import formateTime from './utills/formateTime';

// eslint-disable-next-line vue/multi-word-component-names
// import Dialog from './components/Dialog';
import Player from './components/Player';
Vue.use(Player);

Vue.component('Icon', Icon);
Vue.use(Drawer)
  // .use(VideoView)
  .use(DatetimePicker)
  .use(Popup)
  .use(Picker)
  .use(Pagination)
  .use(Tabs)
  .use(Tab)
  .use(Circle)
  .use(Area)
  .use(Cell)
  .use(TabbarItem)
  .use(Tabbar)
  .use(formateTime);
// Vue.component('Drawer', Drawer);

const app = new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App />',
});
