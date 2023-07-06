<template>
  <div>
    <h1>Foo</h1>
    <button @click="fn">点我</button>
  </div>
</template>
<script>
import Dialog from '../components/Dialog/index.js';
import { getUserAccount, getUserDetail } from '../request';
// import { mapState } from '../vuex';
export default {
  methods: {
    fn() {
      Dialog({ title: '警告', message: '我是提示内容' })
        .then(function () {
          console.log('点击确定');
        })
        .catch(function () {
          console.log('点击取消');
        });
    },
  },
  async created() {
    const res = await getUserAccount();
    console.log('cookie', res);
    const detail = await getUserDetail(res.data.profile.userId);
    console.log(detail);
  },
};
</script>
