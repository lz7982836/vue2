<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
  <div
    :class="{ dark: darkMode }"
    class="h-[100vh]"
    :style="{ overflow: drawerVisible ? 'hidden' : 'auto' }"
  >
    <div
      class="dark:bg-gradient-to-r dark:from-[rgb(28,25,52)] dark:to-[rgb(27,27,35)] bg-[#F4F4F4]"
    >
      <div
        class="bg-gradient-to-b from-[#E6E6FB] to-[#f1f1f1] opacity-0.2 dark:bg-gradient-to-r dark:from-[rgb(28,25,52)] dark:to-[rgb(27,27,35)]"
      >
        <div
          class="w-[100vw] h-[20vw] p-[3vw] flex justify-between items-center"
        >
          <Icon
            icon="vaadin:lines"
            @click.native="drawerVisible = !drawerVisible"
            width="6vw"
            height="6vw"
            class="dark:text-[rgb(234,234,236)] text-[black]"
          />

          <div class="relative">
            <label for="">
              <input
                type="text"
                :placeholder="defaultSearch.showKeyword"
                v-model="userSearchKeywords"
                @focus="search"
                class="dark:bg-gradient-to-r dark:from-[rgb(28,25,52)] dark:to-[rgb(27,27,35)] dark:border-2 dark:border-[rgb(49,45,78)] text-[3vw] pl-[8vw] bg-gradient-to-r from-[#d9ddfd] to-[#f3d9ef] opacity-0.2 text-[#8189A1] w-[75vw] h-[10vw] border-2 border-[#CCCEF7] rounded-[25px]"
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

          <Icon
            icon="vaadin:mute"
            width="6vw"
            height="6vw"
            class="dark:text-[rgb(234,234,236)] text-[black]"
          />
        </div>
      </div>
      <!-- 轮播图 -->
      <section
        class="w-[90] h-[36vw] flex items-center overflow-hidden justify-center"
      >
        <van-swipe
          :autoplay="2000"
          class="w-[90%] h-[100%] overflow-hidden relative rounded-[10px]"
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
      <Panel label="推荐歌单" :length="6" :width="31" :margin="4.5">
        <template #header>
          <div class="relative w-[31vw] mr-[5vw]">
            <div
              class="w-[31vw] h-[35vw] ml-[0vw] mr-[4.5vw] pt-[3vw] overflow-hidden relative"
            >
              <Animation
                v-for="(item, index) in personalizedtwo"
                :key="index.id"
                :personalizedtwo="item"
                :personalizedthree="personalizedtwo"
                :index="index"
                v-bind:text.sync="text"
              ></Animation>
              <div
                class="w-[26vw] h-[31vw] bg-[#ccc] absolute top-[0vw] left-1/2 -translate-x-1/2 rounded-[8px] z-[0]"
              ></div>
            </div>
            <p
              class="text-[2.78vw] ml-[2vw] absolute top-[35vw] dark:text-[rgb(234,234,236)]"
            >
              {{
                text === null
                  ? personalizedtwo[0]?.uiElement.mainTitle.title
                  : text
              }}
            </p>
          </div>
          <RecommendedSongList
            :personalized="item"
            v-for="item in personalized"
            :key="item.id"
            class="w-[31vw] h-[50vw] pt-[1vw] mr-[3vw] scroll-item relative"
          ></RecommendedSongList>
        </template>
      </Panel>

      <!-- 新歌速递 -->
      <Panel label="新歌新碟\数字专辑" :length="32" :width="85" :margin="10">
        <template #header>
          <NewSongExpress
            :item="item"
            v-for="item in song"
            :key="item.song"
            class="w-[82vw] scroll-item mb-[2.5vw]"
          ></NewSongExpress>
        </template>
      </Panel>

      <!-- 排行榜 -->
      <Panel label="排行榜" :length="6" :width="90" :margin="2">
        <template #header>
          <TheCharts
            v-for="item in blocks"
            :item="item"
            :key="item.id"
            class="p-[2vw] mr-[2vw] overflow-hidden w-[90vw] mb-[0vw] ml-0 h-[68vw] bg-white dark:bg-[rgb(37,37,45)] scroll-item rounded-[15px]"
            ref="song"
          ></TheCharts>
        </template>
      </Panel>

      <!-- 热门话题 -->
      <Panel label="热门话题" :length="5" :width="65" :margin="2.8">
        <template #header>
          <HotTopic
            v-for="item in hot"
            :key="item.id"
            :item="item"
            class="scroll-item py-[4vw] px-[3vw] w-[65vw] mr-[2.8vw] mt-[3vw] mb-[5vw] bg-slate-500 h-[30vw] rounded-[10px]"
          ></HotTopic>
        </template>
      </Panel>
      <!-- 音乐日历 -->
      <Panel label="音乐日历">
        <template #header>
          <div
            class="w-[90vw] ml-0 m-[3vw] mt-[0vw] bg-white rounded-[15px] p-[5vw] pb-[2vw] dark:bg-[rgb(37,37,45)]"
          >
            <MusicCalendar
              v-for="(item, index) in calendar"
              class="w-[80vw] h-[15vw] flex justify-between mb-[10vw] mt-[2vw]"
              :key="index.id"
              :item="item"
              :index="index"
            >
            </MusicCalendar>
          </div>
        </template>
      </Panel>
      <!-- <div class="m-[5vw] pb-[20vw]">
      <div class="flex items-center">
        <h1 class="text-[5vw] text-white">音乐日历</h1>
        <div
          class="flex w-[18vw] h-[5vw] rounded-[5vw] ml-[2vw] mt-[1.5vw] bg-[#e8e6e6] justify-center opacity-0.2 text-[3vw]"
        >
          今日2条<Icon icon="uiw:right" class="mt-[1vw]" />
        </div>
      </div>
      <div class="w-[90vw] ml-0 m-[3vw] bg-white rounded-[15px]">
        <div class="p-[5vw] w-[100%] pb-[2vw]">
          <MusicCalendar
            v-for="(item, index) in calendar"
            class="w-[80vw] h-[15vw] flex justify-between mb-[7vw] mt-[2vw]"
            :key="index.id"
            :item="item"
            :index="index"
          >
          </MusicCalendar>
        </div>
      </div>
    </div> -->
      <!-- 无 ->有（enter进场动画）
    .[name]-enter{}
    .[name]-enter-to{}

     有->(leave离场动画)
     .[name]-leave{}
    .[name]-leave-to{}
    -->
      <!-- <button @click="visible = !visible">toggle</button>
    <div class="w-[200px] h-[200px] border-[1px] overflow-hidden relative">
      <transition name="abc" class="">
        <div
          v-if="visible"
          class="w-[200px] h-[200px] bg-orange-600 absolute top-0 left-0"
        ></div>
      </transition>
      <transition name="abc">
        <div
          v-if="!visible"
          class="w-[200px] h-[200px] bg-teal-400 absolute top-0 left-0"
        ></div>
      </transition>
    </div> -->

      <!-- <button @click="drawerVisible = !drawerVisible">drawerVisibleToggle</button> -->
      <!-- <Drawer :visible="drawerVisible" @自定义事件="(e) => (drawerVisible = e)"> -->

      <!--侧边栏抽屉-->
      <Drawer :visible.sync="drawerVisible" direction="ltr" :no="noscroll">
        <template #head>
          <div
            class="flex justify-between items-center h-[16vw] px-[5vw] w-[84vw] dark:bg-black bg-[#f1f1f1]"
          >
            <!-- 用户头像开始 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div
                  class="w-[7vw] h-[7vw] rounded-[50%] mr-[2vw] bg-[#f4f4f1] flex items-center justify-center overflow-hidden"
                >
                  <Icon
                    icon="gridicons:user"
                    class="w-[7vw] h-[7vw] text-[#f9dada] dark:text-[white]"
                  />
                </div>
                <span class="text-[3.5vw] text-[#000] dark:text-[white]"
                  >立即登录</span
                >
                <Icon
                  icon="mingcute:right-line"
                  class="text-[4vw] text-[#383838] dark:text-[white]"
                />
              </div>
            </div>
            <Icon
              icon="teenyicons:scan-outline"
              class="text-[5vw] text-[#383838] dark:text-[white]"
            />
            <!-- 用户头像结束 -->
          </div>
        </template>
        <div
          class="dark:bg-black pt-[5vw] bg-[#f1f1f1] h-[95vh] scroll-wrapper overflow-hidden"
          ref="scroll5"
        >
          <div class="scroll-content h-[420vw]">
            <div
              class="mx-auto w-[76vw] h-[27.66vw] bg-gradient-to-r from-[#3b3b3b] to-[#5f5050] px-[3.96vw] text-[#9e8f8f] rounded-[20px]"
            >
              <div class="h-[10vw] flex justify-between items-center">
                <h1 class="text-[3.6vw] text-[#ffeeeb]">开通黑胶VIP</h1>
                <div
                  class="w-[15.78vw] h-[6.56vw] leading-[6vw] text-center rounded-[100px] border-[1px] border-[#9e8f8f] text-[2.5vw] mt-[3vw]"
                >
                  会员中心
                </div>
              </div>
              <div class="h-[7vw] border-b-[1px] border-[#494443]">
                <p class="text-[2.73vw]">点击恢复超21项专属特权</p>
              </div>
              <div
                class="h-[11vw] leading-[11vw] flex justify-between items-center mr-[4.45vw]"
              >
                <div class="text-[2.5vw] h-[11vw]">
                  受邀专享，黑胶VIP低至0.27元/天!
                </div>
                <div class="scale-50 w-[8vw]">
                  <div
                    class="w-[22vw] h-[22vw] rounded-[10px] bg-[#e54701] text-[#fff] pl-[3vw] text-[8vw] scale-50"
                  >
                    受邀专享
                  </div>
                </div>
              </div>
            </div>
            <LeftSidebarModuleView
              v-for="item in DrawerData"
              :key="item"
              :item="item"
              :checks.sync="darkMode"
            />
            <div
              class="dark:bg-[#2c2c2c] h-[12vw] px-[3.6vw] bg-[#fff] w-[76vw] mt-[4vw] rounded-[15px] mx-auto leading-[12vw] text-center text-[3.6vw] text-[#ef4239]"
            >
              关闭云音乐
            </div>
          </div>
        </div>
      </Drawer>
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
import Panel from './components/Panel.vue';
import Animation from './components/Animation.vue';
import HotTopic from './components/HotTopic.vue';
import MusicCalendar from './components/MusicCalendar.vue';
import LeftSidebarModuleView from './components/LeftSidebarModuleView.vue';
// import _ from 'lodash';
import ScrollBar from '@better-scroll/scroll-bar';

BScroll.use(ScrollBar);
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
    Panel,
    Animation,
    HotTopic,
    MusicCalendar,
    LeftSidebarModuleView,
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
      drawerVisible: false,
      personalizedtwo: [],
      text: null,
      DrawerData: [
        {
          title: false,
          data: [
            { icon: 'solar:letter-linear', name: '我的消息', rigth: false },
            { icon: 'cib:shell', name: '云贝中心', rigth: '签到' },
            { icon: 'mingcute:light-line', name: '创作者中心', rigth: false },
          ],
        },
        {
          title: '音乐服务',
          data: [
            {
              icon: 'ph:star-of-david-light',
              name: '趣测',
              rigth: '点击查看今日运势',
            },
            { icon: 'ion:ticket-outline', name: '云村有票', rigth: false },
            {
              icon: 'mdi:help-box-outline',
              name: '多多西西口袋',
              rigth: false,
            },
            { icon: 'ep:handbag', name: '商城', rigth: false },
            {
              icon: 'streamline:interface-signal-square-heart-line-stats-beat-square-graph',
              name: 'Beat专区',
              rigth: '顶尖制作邀你创作',
            },
            { icon: 'tabler:bell-ringing-2', name: '口袋彩铃', rigth: false },
            {
              icon: 'icon-park-outline:gamepad',
              name: '游戏专区',
              rigth: '音乐浇灌治愈花园',
            },
          ],
        },
        {
          title: '其他',
          data: [
            { icon: 'ri:settings-line', name: '设置', rigth: false },
            {
              icon: 'line-md:moon-loop',
              name: '深色模式',
              rigth: false,
              btn: true,
            },
            { icon: 'mdi:alarm-clock', name: '定时关闭', rigth: false },
            { icon: 'ph:t-shirt-thin', name: '个性装扮', rigth: false },
            {
              icon: 'iconoir:headset-issue',
              name: '边听边存',
              rigth: '未开启',
            },
            {
              icon: 'iconoir:headset-issue',
              name: '在线听歌免流量',
              rigth: false,
            },
            { icon: 'solar:card-linear', name: '音乐黑名单', rigth: '未开启' },
            {
              icon: 'ant-design:stop-outlined',
              name: '青少年模式',
              rigth: '未开启',
            },
            { icon: 'ep:alarm-clock', name: '音乐闹钟', rigth: false },
          ],
        },
        {
          title: false,
          data: [
            { icon: 'iconoir:page', name: '我的订单', rigth: false },
            { icon: 'ion:ticket-outline', name: '优惠券', rigth: false },
            { icon: 'ep:service', name: '我的客服', rigth: false },
            {
              icon: 'ri:share-circle-line',
              name: '分享网易云音乐',
              rigth: false,
            },
            {
              icon: 'ph:file-thin',
              name: '个人信息收集与使用清单',
              rigth: false,
            },
            {
              icon: 'icon-park-outline:circle-five-line',
              name: '个人信息第三方共享清单',
              rigth: false,
            },
            { icon: 'icons8:share', name: '个人信息与隐私保护', rigth: false },
            { icon: 'icon-park-outline:attention', name: '关于', rigth: false },
          ],
        },
      ],
      darkMode: false,
    };
  },
  updated() {
    this.bs.refresh();
  },
  beforeUnmount() {
    this.bs.destroy();
  },
  mounted() {
    this.init(this.$refs.scroll);
    this.init1(this.$refs.scroll5);
  },
  methods: {
    boolean() {
      this.drawerVisible = false;
    },
    search() {
      this.$router.push('/SearchView');
    },
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
    init1(name) {
      this.bs = new BScroll(name, {
        scrollY: true,
        probeType: 3,
        disableMouse: true,
        disableTouch: false,
        mouseWheel: true,
        click: true,
        scrollbar: true,
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
    this.personalized = res3.data.data.blocks[1].creatives.slice(1, 6);

    const restwo = await fetchpersonalized();
    this.personalizedtwo = restwo.data.data.blocks[1].creatives.slice(
      0,
      1
    )[0].resources;

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
    this.calendar = res7.data.data.calendarEvents.slice(0, 2);
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
</style>
