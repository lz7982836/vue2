<template>
  <div>
    <!-- 内置组件 component:渲染其他组件的组件 它的is属性指向谁就渲染谁-->
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
// 动态返回组件的这些逻辑 全部单独封装为一个js文件
import router from './router/index';
export default {
  // 混合
  mixins: [router],
  data() {
    return {
      a: 123,
    };
  },
  created() {
    window.vm = this;
  },
  // ...router,
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
