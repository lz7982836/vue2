<template>
  <div class="bg-[rgb(248,249,253)] dark:bg-[#1a1c23]">
    <!-- 搜索框 -->
    <div class="w-[100vw] h-[20vw] p-[3vw] flex justify-between items-center">
      <!-- 返回图标 -->
      <Icon
        icon="ph:arrow-left-light"
        width="8vw"
        class="text-[#000] dark:text-[#e9e9e9]"
        @click.native="home"
      />
      <!-- 搜索框 -->
      <div class="relative">
        <label for="">
          <input
            type="text"
            :placeholder="defaultSearch.showKeyword"
            v-model="userSearchKeywords"
            class="dark:bg-[#31333a] dark:text-[#e9e9e9] pl-[8vw] bg-white opacity-0.2 text-[3vw] text-[#ccc] w-[75vw] h-[10vw] border-2 border-[#fff] rounded-[25px] dark:border-2 dark:border-[#31333a]"
          />
        </label>
        <Icon
          icon="tabler:search"
          color="#6f778f"
          class="absolute left-[3.68vw] top-[3vw] text-[#000] dark:text-[#e9e9e9]"
          width="4.5vw"
          @click.native="searchHandler"
        />
      </div>
      <div class="font-semibold text-[4vw] dark:text-[#e9e9e9] text-[#283349]">
        搜索
      </div>
    </div>
    <div v-if="userSearchKeywords == ''">
      <!-- 导航栏 -->
      <div class="flex justify-around mt-[3vw]">
        <div
          v-for="(item, index) in menu"
          :key="index.id"
          @click="sertchMenutwo(index)"
          class="flex items-center w-[25vw] justify-center border-[#e2e6ea] dark:border-[rgb(45,45,53)]"
          :class="{ 'border-r-[0.4vw]': index < 3 }"
        >
          <Icon :icon="item.icon" color="red" width="5vw" />
          <p class="ml-[2vw] text-[3vw] text-[#000] dark:text-[#e9e9e9]">
            {{ item.text }}
          </p>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <div class="mt-[5vw]">
        <div class="flex justify-between px-[3vw]">
          <h1
            class="font-semibold text-[4vw] text-[#283349] dark:text-[#e9e9e9]"
          >
            猜你喜欢
          </h1>
          <Icon
            icon="ic:baseline-refresh"
            color="#acafae"
            width="5vw"
            @click.native="rotateItems"
          />
        </div>
        <div class="flex px-[4vw]">
          <div
            v-for="item in displayedItems"
            :key="item.id"
            class="p-[2vw] mr-[2vw] text-[3vw] dark:bg-[#31333a] dark:text-[#e9e9e9] text-[#535c6a] mt-[3vw] bg-[#fff] px-[3vw] rounded-[20px]"
          >
            {{ item.searchWord }}
          </div>
        </div>
      </div>
      <!-- 排行榜 -->
      <MusicCharts :Playlist="Playlist"></MusicCharts>
    </div>
  </div>
</template>

<script>
import {
  fetchSearchDefault,
  fetchSearchResult,
  fetchSearchDetail,
  fetchPlaylist,
} from '../../request/index';
import _ from 'lodash';
import MusicCharts from './components/MusicCharts.vue';

export default {
  components: {
    MusicCharts,
    fetchPlaylist,
  },
  data() {
    return {
      menu: [
        {
          icon: 'octicon:person-fill-24',
          text: '歌手',
        },
        {
          icon: 'clarity:book-solid',
          text: '曲风',
        },
        {
          icon: 'fluent-emoji-high-contrast:musical-notes',
          text: '专区',
        },
        {
          icon: 'ph:microphone-fill',
          text: '识曲',
        },
      ],
      userSearchKeywords: '',
      defaultSearch: [],
      sertchMenu: ['/Singer', '/Genre', '/Zone', ''],
      like: null,
      displayedItems: [],
      Playlist: [],
    };
  },
  methods: {
    home() {
      this.$router.push('/');
    },
    sertchMenutwo(num) {
      this.$router.push(this.sertchMenu[num]);
    },
    async searchHandler() {
      const res2 = await fetchSearchResult({
        keywords: this.userSearchKeywords || this.defaultSearch.showKeyword,
      });
      console.log(res2);
    },
    rotateItems() {
      this.like.push(...this.like.splice(0, 5));
      this.displayedItems = this.like.slice(0, 5);
    },
  },
  async created() {
    // 搜索框;
    const res = await fetchSearchDefault();
    this.defaultSearch = res.data.data;
    // 猜你喜欢
    const res2 = await fetchSearchDetail();
    this.like = res2.data.data;
    this.displayedItems = this.like.slice(0, 5);
    // 排行榜
    const res3 = await fetchPlaylist();
    this.Playlist = res3;
    // console.log(this.Playlist);
  },
  watch: {
    userSearchKeywords: _.debounce(async function (keywords) {
      console.log(keywords);
      const res = await fetchSearchResult({ keywords: keywords });
      console.log(res);
    }, 1000),
  },
};
</script>
<style></style>
