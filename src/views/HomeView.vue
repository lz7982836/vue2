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
      <ul class="flex w-[187vw] justify-center scroll-content">
        <li
          v-for="item in menulist"
          :key="item.id"
          class="w-[16vw] mr-[3.5vw] scroll-item"
        >
          <img :src="item.iconUrl" alt="" class="red-image w-[15vw]" />
          <p class="text-[3vw] text-center">{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <!-- 推荐歌单 -->
    <div class="m-[5vw]">
      <h1 class="text-[5vw] font-medium">推荐歌单></h1>
      <div
        class="scroll-wrapper overflow-hidden w-[90vw] m-[4.5vw] ml-0"
        ref="presona"
      >
        <ul class="flex w-[500vw] scroll-content">
          <li
            v-for="item in personalized"
            :key="item.id"
            class="w-[40vw] mr-[4.5vw] scroll-item"
          >
            <img :src="item.picUrl" alt="" class="w-[40vw] rounded-[20px]" />
            <p class="text-[3.5vw]">{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 新歌速递 -->
    <div class="m-[5vw]">
      <h1 class="text-[5vw] font-semibold text-white">新歌新碟\ 数字专辑></h1>
      <div
        class="scroll-wrapper overflow-hidden w-[90vw] m-[4.5vw] ml-0"
        ref="song"
      >
        <ul class="flex w-[2990vw] flex-wrap scroll-content">
          <li
            v-for="item in song"
            :key="item.song"
            class="w-[85vw] scroll-item"
          >
            <div class="flex">
              <img :src="item.album.picUrl" alt="" class="w-[25vw]" />
              <div class="pl-[3vw] pt-[3vw] pb-[3vw] w-[40vw]">
                <h1
                  class="text-ellipsis overflow-hidden whitespace-nowrap leading-[15vw] text-[3vw]"
                >
                  {{ item.album.name }}
                </h1>
                <p
                  class="text-ellipsis overflow-hidden whitespace-nowrap text-[3vw]"
                >
                  {{ item.album.alias[0] }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="m-[5vw]">
      <h1 class="text-[5vw] font-semibold text-black">排行榜\</h1>
      <div class="w-[90vw] scroll-wrapper overflow-hidden" ref="blocks">
        <div class="w-[600vw] flex scroll-content">
          <div
            v-for="item in blocks"
            :key="item.id"
            class="p-[2vw] mr-[10vw] overflow-hidden w-[90vw] m-[2.5vw] ml-0 h-[50vw] bg-white scroll-item"
            ref="song"
          >
            <div class="flex justify-between w-[100%]">
              <h1 class="text-[5vw] font-semibold w-[25vw] leading-[10vw]">
                {{ item.uiElement.mainTitle.title }}
              </h1>
              <p
                class="text-[3vw] leading-[10vw] text-ellipsis overflow-hidden whitespace-nowrap w-[30vw]"
              >
                {{ item.uiElement.mainTitle.titleDesc }}
              </p>
            </div>
            <ul class="">
              <li
                v-for="(items, indexs) in 3"
                :key="indexs.id"
                class="mb-[3vw]"
              >
                <div class="flex relative w-[100%]">
                  <img
                    :src="
                      item.resources[indexs].resourceExtInfo?.songData.album
                        .blurPicUrl
                    "
                    class="w-[10vw]"
                    alt=""
                  />
                  <p class="text-[5vw] w-[10vw] text-center">
                    {{ indexs + 1 }}
                  </p>
                  <div>
                    <p
                      class="text-[3.5vw] font-normal w-[40vw] text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {{
                        item.resources[indexs].resourceExtInfo?.songData.name
                      }}
                    </p>
                    <p class="text-[2.5vw]">
                      {{
                        item.resources[indexs].resourceExtInfo?.artists[0].name
                      }}
                      <span
                        class="absolute w-[8vw] h-[5vw] right-[3vw] text-[3vw] top-[1vw]"
                        ref="sps"
                        :style="{ color: 'red' }"
                        >{{
                          item.resources[indexs]?.uiElement.labelText.text
                        }}</span
                      >
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
            v-for="item in calendar"
            :key="item.id"
            class="w-[80vw] h-[15vw] flex justify-between mb-[4vw]"
          >
            <div>
              <h1 class="text-[3vw]">
                今天 06/27
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
} from '../request/index';

export default {
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
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
    console.log(this.calendar);
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
