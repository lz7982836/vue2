<template>
  <div>
    <HomeView />
  </div>
</template>

<script>
import HomeView from './views/HomeView/HomeView.vue';

export default {
  components: {
    HomeView,
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
