<template>
  <div class="bg-gradient-to-r from-violet-300 to-indigo-100 opacity-0.2">
    <div class="w-[100vw] h-[20vw] p-[3vw] flex justify-between items-center">
      <Icon icon="vaadin:lines" color="black" width="6vw" height="6vw" />
      <div class="relative">
        <label for="">
          <input
            type="text"
            :placeholder="defaultSearch.showKeyword"
            v-model="userSearchKeywords"
            class="text-[3vw] pl-[8vw] bg-gradient-to-r from-violet-300 to-indigo-200 opacity-0.2 text-zinc-50 w-[75vw] h-[10vw] border-2 border-violet-400 rounded-[25px]"
          />
        </label>
        <Icon
          icon="tabler:search"
          color="#6f778f"
          class="absolute left-[3.68vw] top-[3vw]"
          width="4.5vw"
          @click.native="searchHandler"
        />
        <Icon
          icon="tabler:scan"
          color="#78758b"
          class="absolute right-[3.68vw] top-[3vw]"
          width="4.5vw"
        />
      </div>

      <Icon icon="vaadin:mute" color="black" width="6vw" height="6vw" />
    </div>
    <!-- 轮播图 -->
    <section
      class="w-[100%] h-[36vw] rounded-2xl flex items-center overflow-hidden"
    >
      <van-swipe
        :autoplay="2000"
        class="w-[100%] h-[100%] overflow-hidden relative"
      >
        <van-swipe-item v-for="item in menu" :key="item.id">
          <img :src="item.pic" class="w-[100%] h-[100%]" />
        </van-swipe-item>
      </van-swipe>
      <van-pagination :total-items="6" :items-per-page="1" />
    </section>
    <!-- 每日推荐 -->
    <div
      class="w-[90vw] ml-[4.5vw] mr-[4.5vw] scroll-wrapper overflow-hidden"
      ref="scroll"
    >
      <RecommondMenu
        :menulist="menulist"
        class="flex w-[187vw] justify-center scroll-content relative"
      ></RecommondMenu>
    </div>
    <!-- 推荐歌单 -->
    <div class="m-[5vw]">
      <h1 class="text-[5vw] font-medium flex">
        推荐歌单<Icon icon="uiw:right" class="mt-[1.5vw]" />
      </h1>
      <div
        class="scroll-wrapper overflow-hidden w-[90vw] m-[4.5vw] ml-0"
        ref="presona"
      >
        <RecommendedSongList
          class="flex w-[500vw] scroll-content"
          :personalized="personalized"
        />
      </div>
    </div>
    <!-- 新歌速递 -->
    <div class="m-[5vw]">
      <h1 class="text-[5vw] font-semibold text-white flex">
        新歌新碟\ 数字专辑<Icon icon="uiw:right" class="mt-[1.5vw]" />
      </h1>
      <div
        class="scroll-wrapper overflow-hidden w-[90vw] m-[4.5vw] ml-0"
        ref="song"
      >
        <NewSongExpress
          class="flex w-[2990vw] flex-wrap scroll-content"
          :song="song"
        />
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="m-[5vw]">
      <h1 class="text-[5vw] font-semibold text-black">排行榜\</h1>
      <div class="w-[90vw] scroll-wrapper overflow-hidden" ref="blocks">
        <TheCharts class="w-[600vw] flex scroll-content" :blocks="blocks" />
      </div>
    </div>
    <!-- 热门话题 -->
    <div class="m-[5vw]">
      <div>
        <h1 class="text-[4vw] text-white">热门话题</h1>
      </div>
      <div class="scroll-wrapper overflow-hidden" ref="hot">
        <div class="flex w-[540vw] scroll-content">
          <div
            v-for="item in hot"
            :key="item.id"
            class="scroll-item p-[5vw] w-[90vw] mr-[5vw] mt-[3vw] mb-[5vw] bg-slate-500 h-[35vw] rounded-[15px]"
          >
            <div class="flex">
              <Icon icon="uiw:message" color="white" width="5vw" height="5vw" />
              <h1 class="text-white text-[4vw] ml-[2vw]">
                {{ item.user.nickname }}
              </h1>
            </div>
            <p class="text-[#ccc] text-[3vw]">
              {{ item.tailMark?.circle?.member }}热度
            </p>
            <div class="flex justify-between">
              <p class="text-white leading-[25vw] text-[3vw]">
                {{ item.tailMark?.markTitle }}
              </p>
              <img
                :src="item.tailMark?.circle?.imageUrl"
                alt=""
                class="w-[15vw] h-[15vw]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 音乐日历 -->
    <div class="m-[5vw]">
      <div>
        <h1 class="text-[5vw] text-white">
          音乐日历&nbsp;<span
            class="inline-block w-[15vw] h-[4vw] rounded-[15px] bg-[#ccc] text-center opacity-0.2 text-[3vw]"
            >今日2条></span
          >
        </h1>
      </div>
      <div class="w-[90vw] ml-0 m-[3vw] bg-cyan-100">
        <ul class="p-[5vw] w-[100%] pb-[2vw]">
          <li
            v-for="(item, index) in calendar"
            :key="index.id"
            class="w-[80vw] h-[15vw] flex justify-between mb-[4vw]"
          >
            <div>
              <h1 class="text-[3vw]">
                {{
                  new Date().getMonth() +
                  1 +
                  '/' +
                  (new Date().getDate() - index)
                }}
                <span class="ml-[1vw] text-[2.5vw]">{{ item.tag }}</span>
              </h1>
              <p class="text-[3.5vw]">{{ item.title }}</p>
            </div>
            <img :src="item.imgUrl" alt="" class="w-[15vw] h-[15vw]" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core';
import { Swipe, SwipeItem } from 'vant';
import RecommondMenu from './components/RecommondMenu.vue';
import NewSongExpress from './components/NewSongExpress.vue';
import TheCharts from './components/TheCharts.vue';
import RecommendedSongList from './components/RecommendedSongList.vue';
// import _ from 'lodash';
import {
  fetchSearchDefault,
  fetchSearchSuggest,
  fetchSearchResult,
  fetchmenu,
  fetchmenulist,
  fetchpersonalized,
  fetchsong,
  fetchblocks,
  fetchhot,
  fetchcalendar,
} from '../../request/index';

export default {
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    RecommondMenu,
    RecommendedSongList,
    NewSongExpress,
    TheCharts,
  },
  data() {
    return {
      ranking: [],
      menu: [],
      menulist: [],
      playlists: [],
      activeMenuItem: '',
      personalized: [],
      song: [],
      blocks: [],
      hot: [],
      userSearchKeywords: '',
      defaultSearch: [],
      searchSuggest: [],
      calendar: [],
      day: '',
    };
  },
  beforeUnmount() {
    this.bs.destroy();
  },
  mounted() {
    this.init(this.$refs.scroll);
    this.init(this.$refs.presona);
    this.init(this.$refs.song);
    this.init(this.$refs.blocks);
    this.init(this.$refs.hot);
  },
  methods: {
    init(name) {
      this.bs = new BScroll(name, {
        scrollX: true,
        probeType: 3,
        disableMouse: false,
        disableTouch: false,
        mouseWheel: true,
        click: true,
      });
    },
    async searchHandler() {
      const res = await fetchSearchResult({
        keywords: this.userSearchKeywords || this.defaultSearch.showKeyword,
      });
      console.log(res);
    },
  },
  async created() {
    // 搜索框
    const res = await fetchSearchDefault();
    this.defaultSearch = res.data.data;

    // 轮播
    const res1 = await fetchmenu();
    this.menu = res1.data.data.blocks[0].extInfo.banners;

    // 菜单
    const res2 = await fetchmenulist();
    this.menulist = res2.data.data;

    // 推荐歌单
    const res3 = await fetchpersonalized();
    this.personalized = res3.data.result.slice(0, 12);

    // 新歌速递
    const res4 = await fetchsong();
    this.song = res4.data.data;

    // 排行榜
    const res5 = await fetchblocks();
    this.blocks = res5.data.data.blocks[3].creatives;

    // 热门话题
    const res6 = await fetchhot();
    this.hot = res6.data.events;

    // 音乐日历
    const res7 = await fetchcalendar();
    this.calendar = res7.data.data.calendarEvents;
  },
  watch: {
    async userSearchkeywords(keywords) {
      const res = await fetchSearchSuggest(keywords);
      console.log(res);
      this.searchSuggest = res.result.songs;
    },
    // userSearchKeywords:_.debounce(async function (keywords) {
    //   const res = await fetchSearchSuggest(keywords);
    //   this.searchSuggest = res.result.songs;
    // },300)
  },
};
</script>
<style>
.swiper-container {
  width: 90vw;
  height: 40vw;
}
.red-image {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}

.van-swipe__indicators {
  position: absolute;
  left: 2vw;
  bottom: 2vw;
  display: flex;
}

.van-swipe__indicators i {
  display: inline-block;
  width: 2vw;
  height: 2vw;
  background-color: #999;
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
}

.van-swipe__indicators .van-swipe__indicator--active {
  background-color: #fff;
}
.van-swipe__track {
  display: flex !important;
}

.red-image {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}
</style>
