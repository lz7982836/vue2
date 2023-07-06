<template>
  <div>
    <!-- 头部 -->
    <div class="flex justify-between px-[5.64vw] mt-[5.64vw] items-center">
      <Icon
        icon="teenyicons:left-outline"
        width="6vw"
        height="6vw"
        @click.native="$router.push('/')"
        class="text-[#000]"
      />
      <h1 class="text-[3.76vw] text-[rgb(110,110,110)]">游客登录</h1>
    </div>
    <!-- 初始 -->
    <div
      v-show="!succeeded"
      class="text-center fixed mt-[-45vw] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
    >
      <img src="/static/logo.fill.svg" alt="" class="w-[39.32vw] ml-[3.8vw]" />
      <img :src="qrcode" alt="" class="w-[47.32vw] mt-[10vw]" />
      <h1 class="text-[2.74vw] text-[#000]">
        使用
        <span class="cursor-pointer text-[rgb(23,118,193)] text-[2.74vw]"
          >网易云音乐APP</span
        >
        扫码登录
      </h1>
    </div>
    <!-- 底部 -->
    <div class="w-[100vw] fixed bottom-0 left-0">
      <img src="/static/background.png" alt="" />
    </div>
    <!-- 失效 -->
    <div
      v-show="loseEfficacy"
      class="text-center w-[47.32vw] h-[47.32vw] bg-[rgba(214,214,214,.3)] fixed mt-[-40vw] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
    >
      <button
        @click="fn"
        class="mt-[20vw] bg-gradient-to-r from-[rgb(251,84,50)] to-[rgb(240,22,37)] text-[2.91vw] rounded-[20px] w-[20vw] h-[7.78vw] text-[#fff]"
      >
        点击刷新
      </button>
    </div>
    <!-- 成功 -->
    <div
      v-show="succeeded"
      class="text-center fixed mt-[-45vw] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
    >
      <img src="/static/logo.fill.svg" alt="" class="w-[39.32vw] ml-[3.8vw]" />
      <img src="/static/succeeded.png" alt="" class="w-[47.32vw] mt-[10vw]" />
      <h1 class="mt-[6vw] font-extrabold text-[4.27vw] text-[#000]">
        扫描成功
      </h1>
      <h1 class="text-[3.5vw] mt-[6vw] font-extrabold text-[#000]">
        请在手机上确认登录
      </h1>
    </div>
  </div>
</template>

<script>
import { fetchQRKey, getQrInfo, checkQrStatus } from '../request';
import store from 'storejs';

export default {
  name: 'Login',
  data() {
    return {
      qrcode: '',
      loseEfficacy: false,
      succeeded: false,
      unikey: '',
    };
  },
  methods: {
    pollingCheck(key, interval = 1000) {
      const timer = setInterval(async () => {
        const res = await checkQrStatus(key);
        if (res.data.code === 800) {
          clearInterval(timer);
          // alert('此二维码已过期,请刷新后重试！');
          this.loseEfficacy = true;
          this.succeeded = false;
        } else if (res.data.code === 803) {
          clearInterval(timer);
          // console.log(res.data.cookie);
          store.set('__m__cookie', res.data.cookie);
          this.$router.push('/');
          this.succeeded = false;
        } else if (res.data.code === 802) {
          this.succeeded = true;
          this.loseEfficacy = false;
        }
      }, interval);
      this.$on('hook:beforeDestroy', function () {
        clearInterval(timer);
      });
    },
    async fn() {
      const res2 = await fetchQRKey();
      const qrInfo2 = await getQrInfo(res2.data.data.unikey);
      this.qrcode = qrInfo2.data.data.qrimg;
      this.loseEfficacy = false;
      this.pollingCheck(res2.data.data.unikey);
    },
  },
  async created() {
    const res = await fetchQRKey().catch((err) => {
      console.log(err);
    });
    this.unikey = res.data.data.unikey;
    const qrInfo = await getQrInfo(res.data.data.unikey).catch((err) => {
      console.log(err);
    });
    this.qrcode = qrInfo.data.data.qrimg;
    // console.log(qrInfo.data.data.qrimg);

    this.pollingCheck(res.data.data.unikey);
  },
  beforeDestroy() {
    // 页面销毁前做一些事
  },
};
</script>
