<template>
  <div
    :class="{
      dark: darkMode(),
      'pb-[0]': $player.list == undefined,
      'pb-[24vw]': $player.list != undefined,
    }"
    class=""
  >
    <!-- 声明式导航 -->
    <!-- <router-link to="/></router-link> -->
    <!-- <router-link :to="{ path: '/IndexView', query: { id: 123 } }"
      >go tu IndexView</router-link
    > -->
    <transition name="rotate">
      <router-view> </router-view>
    </transition>

    <Player
      v-if="$player.list == undefined ? false : showPlayer"
      class="h-[15.1vw] px-[4.3vw] py-[1.2vw] bg-[rgb(246,249,249)] w-[100vw] fixed z-[22]"
      :style="{ bottom: showMenu() ? '15vw' : '0vw' }"
    ></Player>
    <!-- 菜单 -->
    <van-tabbar route v-if="showHome">
      <!-- 首页 -->
      <van-tabbar-item replace to="/HomeView"
        >首页
        <template #icon>
          <Icon icon="ri:netease-cloud-music-fill" />
        </template>
      </van-tabbar-item>
      <!-- 排行榜 -->
      <van-tabbar-item replace to="MVView"
        >排行榜
        <template #icon>
          <Icon icon="ion:podium-sharp" />
        </template>
      </van-tabbar-item>
      <!-- 我的 -->
      <van-tabbar-item replace to="/PersonalHomepageView"
        >我的
        <template #icon>
          <Icon icon="mingcute:music-line" />
        </template>
      </van-tabbar-item>
      <!-- 关注 -->
      <van-tabbar-item replace to=""
        >关注
        <template #icon>
          <Icon icon="iconoir:user-love" />
        </template>
      </van-tabbar-item>
      <!-- 社区 -->
      <!-- <van-tabbar-item replace to=""
        >社区
        <template #icon>
          <Icon icon="ph:wechat-logo" />
        </template>
      </van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
// import Player from './components/Player/player.vue';
import store from './store';
export default {
  // components: { Player },
  computed: {
    showPlayer() {
      if (
        this.$route.path === '/InformationView' ||
        this.$route.path === '/PlayerHome'
      ) {
        console.log(777);
        return false;
      }
      // console.log(888);
      return true;
    },
    showHome() {
      if (
        this.$route.path === '/HomeView' ||
        this.$route.path === '/PersonalHomepageView' ||
        this.$route.path === '/MVView'
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      // darkMode: false,
    };
  },
  methods: {
    darkMode() {
      return store.state.darkMode;
    },
    showMenu() {
      if (
        this.$route.path === '/HomeView' ||
        this.$route.path === '/PersonalHomepageView' ||
        this.$route.path === '/MVView'
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.rotate-enter,
.rotate-leave-to {
  height: 0;
  opacity: 0;
  overflow: hidden;
}
.rotate-active,
.rotate-leave-active {
  transition: all 0.5s;
}
.rotate-enter-to,
.rotate-leave {
  height: 100vh;
  opacity: 1;
}
/* 修改高度 */
.van-hairline--top-bottom {
  height: 15vw;
}

.van-tabbar-item {
  color: #9297a1;
}

.van-tabbar-item--active {
  color: #eb4954;
}
</style>
