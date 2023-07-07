<template>
  <div>
    <!-- <div @click="count++">{{ count }}</div> -->
    <div @click="fn" ref="hs">{{ count }}</div>
    <button @click="changeAbc">666</button>
  </div>
</template>

<script>
// data中的数据变化（同步） => 数据对应的视图更新 (异步)
import Vue from 'vue';
export default {
  data() {
    return {
      count: 123,
      abc: 456,
    };
  },
  methods: {
    fn() {
      this.count = 1234;
      this.$nextTick(() => console.log(this.$refs.hs.innerText));
    },
    changeAbc() {
      this.abc = 4321;
      console.log(this.abc);
    },
  },
  updated() {
    console.log('updated');
    // console.log('updated', this.$refs.hs.innerText);
  },
};
</script>
