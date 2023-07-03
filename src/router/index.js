import HomeView from '../views/HomeView/HomeView.vue';
const viewMap = {
  HomeView,
};

export default {
  data() {
    return {
      visibleView: 'HomeView',
    };
  },
  beforeCreate() {
    window.onhashchange = () => {
      this.visibleView = location.hash.replace('#', '');
    };
  },
  // 动态返回一个数据的data
  computed: {
    currentComponent() {
      return viewMap[this.visibleView];
    },
  },
};
