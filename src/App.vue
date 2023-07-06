<template>
  <div :class="{ dark: darkMode }">
    <!-- 声明式导航 -->
    <!-- <router-link to="/></router-link> -->
    <!-- <router-link :to="{ path: '/IndexView', query: { id: 123 } }"
      >go tu IndexView</router-link
    > -->
    <router-view> </router-view>
  </div>
</template>

<script>
import store from './store';
export default {
  computed: {
    darkMode() {
      return store.state.darkMode;
    },
  },
  data() {
    return {
      // darkMode: false,
    };
  },
  async created() {},
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
