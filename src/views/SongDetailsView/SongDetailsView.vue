<template>
  <div class="" :style="{ background: color }">
    <div ref="top">
      <!--  头部 -->
      <div
        @scroll="handleScroll"
        :style="{ background: color }"
        class="fixed top-0 left-0 w-[100vw] h-[14vw] z-20"
      >
        <div class="flex justify-between pt-[4vw] px-[4vw]">
          <div class="flex item-center">
            <Icon
              icon="ph:arrow-left-light"
              width="6vw"
              height="6vw"
              @click.native="$router.push('/')"
              class="text-[#fff]"
            />
            <div class="flex">
              <div class="overflow-hidden relative w-[50vw] h-[8vw]">
                <transition name="Seamless">
                  <h1
                    v-show="topscroll"
                    class="absolute left-0 top-0 whitespace-nowrap text-[#fff] text-[4vw] ml-[4vw]"
                  >
                    歌单
                  </h1>
                </transition>
                <transition name="Seamless2">
                  <h1
                    v-show="!topscroll"
                    class="absolute left-0 top-0 alimition whitespace-nowrap text-[#fff] text-[4vw] ml-[4vw]"
                  >
                    {{ title2 }}
                  </h1>
                </transition>
              </div>
              <!-- 收藏 -->
              <div
                v-show="!topscroll"
                class="px-[2vw] flex items-center justify-center h-[7vw] rounded-[20px] bg-[#dedede] bg-opacity-10 text-[#f8fefe] text-[3vw] font-semibold"
              >
                <Icon
                  icon="mdi:favorite-add"
                  color="white"
                  class="text-[5vw] mr-[1vw]"
                />
                收藏
              </div>
            </div>
          </div>
          <div class="flex">
            <Icon
              icon="tabler:search"
              width="6vw"
              height="6vw"
              class="text-[#fff] mr-[3vw]"
            />
            <Icon
              icon="solar:menu-dots-bold"
              width="6vw"
              height="6vw"
              :rotate="1"
              class="text-[#fff]"
            />
          </div>
        </div>
      </div>
      <!-- 歌单 -->
      <div
        :style="{ height: show ? '60vw' : '70vw' }"
        class="relative mt-[14vw] z-10"
      >
        <transition name="abc">
          <div v-show="show" class="h-[50vw]">
            <div class="flex h-[31vw] px-[3.82vw] mt-[7.85vw]">
              <!-- 左边头像 -->
              <div class="relative w-[26vw] h-[31vw]">
                <div
                  class="w-[24vw] h-[20vw] bg-[#ddd] absolute top-[0vw] left-1/2 -translate-x-1/2 rounded-[8px] z-[0]"
                ></div>
                <div class="absolute z-5">
                  <img
                    :src="title?.coverImgUrl"
                    alt=""
                    class="w-[31vw] mt-[1vw] rounded-[8px]"
                  />
                </div>
              </div>
              <!-- 右边文字 -->
              <div class="ml-[3vw] w-[54vw]">
                <!-- 头部文字 -->
                <h1 class="text-[#fff] text-[3.54vw]">
                  {{ title?.name }}
                </h1>
                <!-- 歌单详情 -->
                <div class="flex items-center mt-[3.26vw]">
                  <img
                    :src="title?.creator?.avatarUrl"
                    alt=""
                    class="w-[8vw] rounded-[50%]"
                  />
                  <h1 class="ml-[2vw] text-[rgb(195,194,194)] text-[2.22vw]">
                    {{ title?.gradeStatus }}
                  </h1>
                  <div
                    class="ml-[2.18vw] w-[13.46vw] text-center rounded-[15px] leading-[6vw] text-[2vw] bg-[rgba(250,250,250,.3)] text-[rgb(229,229,230)]"
                  >
                    + 关注
                  </div>
                </div>
                <!-- 华语小标签 -->
                <div class="mt-[2.57vw] ml-[2.57vw] flex">
                  <div
                    v-for="item in title?.tags"
                    :key="item.id"
                    class="items-center mr-[1.5vw] justify-center pt-[1vw] px-[1vw] leading-[6vw] text-[2vw] text-center rounded-[5px] bg-[rgba(250,250,250,.3)] text-[rgb(229,229,230)] flex"
                  >
                    <p class="text-[#fff] mb-[0.5vw]">{{ item }}</p>
                    <Icon
                      icon="teenyicons:right-outline"
                      color="white"
                      class="text-[2.5vw]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- 一行字 -->
            <div class="relative">
              <div
                class="px-[3.68vw] mt-[3.89vw] text-[rgb(195,194,194)] text-[2.22vw] w-[90vw] overflow-hidden whitespace-nowrap"
              >
                {{ title?.description }}
              </div>
              <Icon
                icon="teenyicons:right-outline"
                color="white"
                class="text-[2.5vw] absolute right-[3vw] top-[1vw]"
              />
            </div>
          </div>
        </transition>

        <transition name="abc">
          <div v-show="!show" class="h-[50vw]">
            <div class="pt-[2.85vw] absolute left-0 top-0">
              <!-- 头部一行字 -->
              <div class="text-[2.56vw] px-[5.5vw] text-[rgb(210,188,186)]">
                喜欢这个歌单的用户也听了
              </div>
              <div
                class="scroll-wrapper w-[100vw] overflow-hidden"
                ref="wrapper2"
              >
                <div
                  class="flex w-[152vw] px-[3.93vw] mt-[3.16vw] scroll-content"
                >
                  <div
                    class="w-[27.95vw] h-[42vw] pt-[1vw] mr-[2.4vw] scroll-item relative"
                    v-for="item in related"
                    :key="item.id"
                  >
                    <div
                      class="w-[22vw] h-[25vw] bg-[#ddd] absolute top-[0vw] left-1/2 -translate-x-1/2 rounded-[8px] z-[0]"
                    ></div>
                    <div class="absolute z-5">
                      <img
                        :src="item.coverImgUrl"
                        alt=""
                        class="w-[27.95vw] rounded-[8px]"
                      />
                      <p
                        class="text-[2.74vw] line-clamp-2 dark:text-[rgb(234,234,236)] text-[#fff] mt-[1.5vw]"
                      >
                        {{ item.name }}
                      </p>
                      <div
                        class="absolute right-[2vw] top-[2vw] text-[2.5vw] font-bold text-white flex"
                      >
                        <Icon
                          icon="basil:play-solid"
                          color="white"
                          class="mt-[0.5vw]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- ⚪图标 -->
        <div
          class="bg-[rgba(250,250,250,.3)] p-[1.2vw] rounded-[50%] absolute top-0 right-[4vw]"
          @click="show = !show"
        >
          <Icon
            icon="ep:arrow-up-bold"
            color="white"
            v-if="show"
            :rotate="2"
            class="text-[3vw]"
          />
          <Icon
            icon="ep:arrow-up-bold"
            color="white"
            v-else
            :rotate="4"
            class="text-[3vw]"
          />
        </div>
        <!-- 转发评论 -->
        <transition name="abc2">
          <div
            v-show="show"
            class="absolute w-[100vw] bottom-0 transition-all h-auto"
          >
            <div class="flex justify-around mt-[5vw] pb-[4.8vw]">
              <div
                class="w-[28.82vw] text-[2vw] font-extrabold flex items-center justify-center h-[9.72vw] rounded-[20px] bg-[rgba(250,250,250,.3)] text-[#fff]"
              >
                <Icon icon="majesticons:share" class="text-[4vw] mb-[1vw]" />
                {{ title?.shareCount }}
              </div>
              <div
                class="w-[28.82vw] text-[2vw] font-extrabold flex items-center justify-center h-[9.72vw] rounded-[20px] bg-[rgba(250,250,250,.3)] text-[#fff]"
              >
                <Icon
                  icon="ant-design:message-filled"
                  class="text-[4vw] mb-[1vw]"
                />
                {{ title?.commentCount }}
              </div>
              <div
                class="w-[28.82vw] bg-[rgb(255,45,77)] text-[2vw] font-extrabold flex items-center justify-center h-[9.72vw] rounded-[20px] text-[#fff]"
              >
                <Icon icon="mdi:favorite-add" class="text-[4vw] mb-[1vw]" />
                {{
                  title?.subscribedCount > 10000
                    ? Math.ceil(title?.subscribedCount / 10000) + '万'
                    : title?.subscribedCount
                }}
              </div>
            </div>
          </div>
        </transition>
        <!-- 转发评论2 -->
        <transition name="abc3">
          <div
            v-show="!show"
            class="absolute w-[100vw] bottom-0 transition-all h-auto"
          >
            <div class="flex justify-around mt-[5vw] pb-[4.8vw]">
              <div
                class="w-[28.82vw] text-[2vw] font-extrabold flex items-center justify-center h-[9.72vw] rounded-[20px] bg-[rgba(250,250,250,.3)] text-[#fff]"
              >
                <Icon icon="majesticons:share" class="text-[4vw] mb-[1vw]" />
                {{ title?.shareCount }}
              </div>
              <div
                class="w-[28.82vw] text-[2vw] font-extrabold flex items-center justify-center h-[9.72vw] rounded-[20px] bg-[rgba(250,250,250,.3)] text-[#fff]"
              >
                <Icon
                  icon="ant-design:message-filled"
                  class="text-[4vw] mb-[1vw]"
                />
                {{ title?.commentCount }}
              </div>
              <div
                class="w-[28.82vw] bg-[rgb(255,45,77)] text-[2vw] font-extrabold flex items-center justify-center h-[9.72vw] rounded-[20px] text-[#fff]"
              >
                <Icon icon="mdi:favorite-add" class="text-[4vw] mb-[1vw]" />
                {{
                  title?.subscribedCount > 10000
                    ? Math.ceil(title?.subscribedCount / 10000) + '万'
                    : title?.subscribedCount
                }}
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- 播放列表 -->
    <div class="rounded-t-[15px] bg-[#fff]">
      <!-- 播放全部 -->
      <div class="flex justify-between px-[3.68vw] pt-[3.58vw] pb-[4vw] play">
        <div class="flex items-center">
          <Icon
            icon="carbon:play-filled"
            @click.native="playAll"
            color="red"
            class="text-[5vw]"
          />
          <h1 class="text-[3.5vw] ml-[4vw]">
            播放全部<span class="text-[#ccc] text-[2vw] ml-[2vw]"
              >({{ this.data.length }})</span
            >
          </h1>
        </div>
        <div class="flex items-center">
          <Icon icon="clarity:download-line" color="black" class="text-[5vw]" />
          <Icon
            icon="solar:list-check-bold"
            color="black"
            class="text-[5vw] ml-[3vw]"
          />
        </div>
      </div>
      <!-- 播放列表 -->
      <div
        class="flex items-center pb-[6vw] px-[5vw]"
        v-for="(item, index) in data"
        :key="item.id"
        @click="playSingle(item.id)"
      >
        <!-- 排号 -->
        <div class="w-[11vw] relative text-[#bfbfbf] text-[5vw] font-medium">
          <p v-if="!(item.id == $player._currentTrack.id)">{{ index + 1 }}</p>
          <img
            src="/static/wave.gif"
            class="red-image w-[2vw] h-[2vw] absolute top-[50%] translate-y-[-50%]"
            v-if="item.id == $player._currentTrack.id"
            alt=""
          />
        </div>
        <!-- 播放音浪 -->
        <!-- <div class="w-[11vw]">
          <img
            src="/static/wave.gif"
            class="red-image w-[2vw] h-[2vw]"
            v-if="item.id == $player._currentTrack.id"
            alt=""
          />
        </div> -->
        <div class="font-medium text-[3.6vw] flex-1 single-line">
          <div
            :class="item.id == $player._currentTrack.id ? 'text-[#D15B57]' : ''"
            class="w-[60vw] text-[4vw] text-ellipsis overflow-hidden whitespace-nowrap"
          >
            <span>{{ item.name }}</span>
            <span class="text-[#949797]" v-if="item && item?.tns"
              >({{ item?.tns[0] }})</span
            >
          </div>
          <div
            class="w-[60vw] text-[3.4vw] text-ellipsis overflow-hidden whitespace-nowrap"
          >
            <span
              v-if="item.fee == 1"
              data-v-034931a5=""
              class="w-[10vw] rounded-[5px] border-[1px] border-[red] font-[600] text-[2vw] text-[red] text-center leading-[6vw] scale-50 ml-[0] mr-[1vw]"
              >vip</span
            >

            <span class="text-[#808080] text-[2.6vw]"
              >{{ item.ar[0].name }} </span
            ><span class="text-[#808080] text-[2.6vw] ml-[1vw]"
              >{{ item.ar[1]?.name }}
            </span>
          </div>
        </div>
        <div>
          <Icon icon="arcticons:fpt-play" color="#b2b2b2" class="text-[6vw]" />
        </div>
        <div class="ml-[3vw]">
          <Icon
            icon="ri:more-2-line"
            class="text-[6vw] text-[#b2b2b2] dark:text-[#e0e0e2]"
          />
        </div>
      </div>
    </div>
    <!-- 全部结束 -->
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import store from 'storejs';
import RecommendedSongList from '../HomeView/components/RecommendedSongList.vue';
import {
  fetchPlaylistDetailAll,
  fetchRelatedPlaylist,
  fetchPlaylistDetail,
} from '../../request';
export default {
  components: { RecommendedSongList },
  data() {
    return {
      data: [],
      title: [],
      related: [],
      show: true,
      title2: '',
      color: '',
      topscroll: true,
    };
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  updated() {
    this.bs.refresh();
  },
  mounted() {
    this.init();
    this.rgb();
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.wrapper2, {
        scrollX: true,
        probeType: 3,
        disableMouse: false,
        disableTouch: false,
        mouseWheel: true,
        click: true,
      });
    },
    playSingle(id) {
      console.log(id);
      store.set('cookie_music_id', id);
      this.$player.replacePlaylist(
        this.data.map((data) => data.id),
        '',
        '',
        id
      );
      store.set('cookie_music', this.data);
      this.$router.push('/PlayerHome');
    },
    playAll() {
      // this.data
      this.$router.push('/PlayerHome');
      this.$player.replacePlaylist(
        this.data.map((data) => data.id),
        '',
        ''
      );
      store.set('cookie_music', this.data);
      // console.log(666, this.$player);
    },
    // 改变标题文本
    handleScroll() {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      // 根据需要改变标题文本
      // this.title2 =
      //   scrollPosition > this.$refs.top.clientHeight
      //     ? this.title?.name
      //     : '歌单';
      if (scrollPosition > this.$refs.top.clientHeight) {
        this.title2 = this.title?.name;
        this.topscroll = false;
      } else {
        this.topscroll = true;
      }
      // console.log(this.$refs.top.clientHeight);
      // console.log(scrollPosition);
    },
    //rgb颜色随机
    rgb() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      this.color = `rgb(${r},${g},${b})`;
      return `rgb(${r},${g},${b})`;
    },
  },
  async created() {
    // 获取歌单详情
    const res = await fetchPlaylistDetailAll(
      this.$route.params?.id?.replace(':id=', '')
    );
    this.data = res.data.songs;
    // console.log(this.data);
    const res2 = await fetchPlaylistDetail(
      this.$route.params?.id?.replace(':id=', '')
    );
    this.title = res2.data.playlist;
    // console.log('身体', this.data);
    // console.log('头部', this.title);
    const res3 = await fetchRelatedPlaylist(
      this.$route.params?.id?.replace(':id=', '')
    );
    this.related = res3.data.playlists;
    // console.log(this.related);
  },
};
</script>

<style>
.play {
  position: sticky;
  top: 14vw;
  z-index: 15;
  left: 0;
  background-color: white;
}

.alimition {
  animation-name: roll;
  animation-duration: 5s;
  animation-delay: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes roll {
  from {
    transform: translate(60vw, 0);
  }
  to {
    transform: translate(-100%, 0);
  }
}

.abc-enter {
  opacity: 0;
}
.abc-enter-active {
  transition: all ease-in-out 1s;
}
.abc-enter-to {
  opacity: 1;
}

.abc-leave {
  opacity: 1;
}
.abc-leave-active {
  transition: all ease-in-out 1s;
}
.abc-leave-to {
  opacity: 0;
}

/* 转发评论 */
.abc2-enter {
  opacity: 0;
}
.abc2-enter-active {
  transition: all ease-in-out 1s;
}
.abc2-enter-to {
  opacity: 1;
}

.abc2-leave {
  /* transform: translateY(0); */
  opacity: 1;
}
.abc2-leave-active {
  transition: all ease-in-out 1s;
}
.abc2-leave-to {
  /* transform: translateY(20vw); */
  opacity: 0;
}
/* 转发评论2 */
.abc3-enter {
  opacity: 0;
}
.abc3-enter-active {
  transition: all ease-in-out 1s;
}
.abc3-enter-to {
  opacity: 1;
}

.abc3-leave {
  opacity: 1;
  /* transform: translateY(0); */
}
.abc3-leave-active {
  transition: all ease-in-out 1.5s;
}
.abc3-leave-to {
  opacity: 0;
  /* transform: translateY(-20vw); */
}

/* 歌单 */
.Seamless-enter {
  transform: translateY(50%);
  opacity: 0;
}
.Seamless-enter-active,
.Seamless-leave-active {
  transition: all ease-in-out 0.5s;
}
.Seamless-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.Seamless-leave {
  transform: translateY(0);
  opacity: 1;
}
.Seamless-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
/*  标题 */
.Seamless2-enter {
  transform: translateY(50%);
  opacity: 0;
}
.Seamless2-enter-active,
.Seamless2-leave-active {
  transition: all ease-in-out 0.5s;
}
.Seamless2-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.Seamless2-leave {
  transform: translateY(0);
  opacity: 1;
}
.Seamless2-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
