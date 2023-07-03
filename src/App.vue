<template>
  <div>
    <!-- 声明式导航 -->
    <!-- <router-link to="/></router-link> -->
    <!-- <router-link :to="{ path: '/IndexView', query: { id: 123 } }"
      >go tu IndexView</router-link
    > -->
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    // setTimeout(() => {
    //   // 编程式导航
    //   // this.$router.push('/')
    // }, 1000);
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
