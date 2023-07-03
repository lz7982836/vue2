<template>
  <div>
    <!-- 声明式导航 -->
    <!-- <router-link to="/></router-link> -->
    <!-- <router-link :to="{ path: '/IndexView', query: { id: 123 } }"
      >go tu IndexView</router-link
    > -->
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  create() {},
  methods: {},
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
