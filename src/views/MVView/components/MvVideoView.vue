<template>
  <div class="bg-black w-screen h-screen">
    <!-- {/* 加载效果开始 */} -->
    <div
      class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-[#fff]"
      v-show="isLoading"
    >
      <img
        src="/static/wave.gif"
        class="red-image w-[8vw] h-[8vw] mx-[auto] mb-[1vw]"
      />
      正在加载...
    </div>
    <!-- {/* 加载效果结束 */} -->

    <!-- 内容开始 -->
    <div v-show="!isLoading" class="w-screen h-screen flex flex-wrap absolute">
      <!-- {/* 头部开始 */} -->
      <div
        class="flex justify-between items-center px-[6vw] pt-[3vw] w-[100%] h-[12vw]"
        v-show="!showcomment"
      >
        <Icon
          class="text-[6vw] text-[#fefefe]"
          icon="ep:arrow-up-bold"
          :rotate="3"
          @click.native="
            () => {
              $router.push('/MVView');
            }
          "
        />
        <div class="flex items-center">
          <Icon
            icon="fluent:picture-in-picture-enter-24-regular"
            horizontalFlip="{true}"
            class="text-[6vw] text-[#fefefe] mr-[7vw]"
          />
          <Icon
            icon="ri:more-2-fill"
            horizontalFlip="{true}"
            class="text-[6vw] text-[#fefefe]"
          />
        </div>
      </div>
      <!-- {/* 头结束部 */}  -->

      <!-- {/* 视频开始 */} -->
      <div
        class="w-[100%] h-[54vw] absolute overflow-hidden transition-all duration-[600ms]"
        @click="togglePlayPause($event)"
        :style="!showcomment ? 'top:12%' : 'top:0'"
      >
        <video
          ref="videoPlayer"
          :src="currentPlaybackVideoPath"
          loop
          autoplay
        ></video>
        <Icon
          icon="solar:play-bold"
          v-show="playbackStatus"
          class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[14vw] text-[rgba(255,255,255,0.4)]"
        />
      </div>
      <!-- {/* 视频结束 */}  -->

      <!-- {/* 底部开始 */} -->
      <div class="w-[100%] absolute bottom-[0vw]">
        <div
          class="flex justify-between px-[4vw] items-end pb-[3vw]"
          v-show="!touchTheProgressBar"
        >
          <!-- 作者信息、MV信息、歌曲名称轮播 开始 -->
          <div class="flex-1 mr-[10vw]">
            <!-- {/* 作者信息开始 */} -->
            <div
              class="flex items-center mb-[3vw]"
              v-if="currentPlayingVideoData?.artists"
            >
              <img
                :src="currentPlayingVideoData?.artists[0]?.img1v1Url"
                alt=""
                class="w-[9vw] h-[9vw] rounded-[50%] border-[2px] border-[#ffffff]"
              />
              <span class="mx-[2vw] text-[#ffffff] text-[4vw]">{{
                currentPlayingVideoData.artists[0].name
              }}</span>
              <div
                class="bg-[#eb4d44] h-[5vw] w-[7vw] flex items-center justify-center rounded-[2vw]"
              >
                <Icon icon="mingcute:add-fill" class="text-[#fff] text-[4vw]" />
              </div>
            </div>
            <!-- {/* 作者信息结束 */}  -->

            <!-- {/* MV消息开始 */} -->
            <van-collapse v-model="activeNames" class="mb-[5vw]">
              <van-collapse-item name="1">
                <template #title>
                  <div>
                    <h1 class="text-[3.2vw]">
                      <span
                        class="w-[7.3vw] mr-[2vw] leading-[5.2vw] text-center inline-block bg-[#333333] text-[#ACACAC] rounded-[5px]"
                      >
                        MV
                      </span>
                      {{ currentPlayingVideoData?.name }}
                    </h1>
                  </div>
                </template>
                <div class="whitespace-pre-wrap">
                  {{ currentPlayingVideoData?.desc }}
                </div>
              </van-collapse-item>
            </van-collapse>
            <!-- {/* MV消息结束 */} -->

            <!-- 歌曲名称轮播开始 -->
            <div class="flex items-center">
              <Icon icon="entypo:note" class="text-[4vw] text-[#b3b3b3]" />
              <van-notice-bar
                scrollable
                :text="currentPlayingVideoData?.name"
                class="w-[34vw]"
                :speed="20"
              />
              <Icon
                icon="ant-design:heart-outlined"
                class="text-[4vw] text-[#b3b3b3]"
              />
            </div>
            <!-- 歌曲名称轮播结束 -->
          </div>
          <!-- 作者信息、MV信息、歌曲名称轮播 结束 -->

          <!-- 点赞、评论、分享、收藏、唱片 开始 -->
          <div class="w-[10vw]">
            <!-- {/* 点赞开始 */} -->
            <div
              class="flex items-center flex-col justify-center mb-[4vw]"
              @click="like = !like"
            >
              <Icon
                class="text-[6vw] mb-[2vw] text-[#eaeaea]"
                icon="bxs:like"
                :class="{ 'text-[#eb4d44]': like, 'jello-vertical': like }"
              />
              <span class="text-[#eaeaea] text-[3vw]">{{
                dataTruncation(currentVideoInteractionData?.likedCount)
              }}</span>
            </div>
            <!-- {/* 点赞结束 */}  -->

            <!-- {/* 评论开始 */} -->
            <div
              class="flex items-center flex-col justify-center mb-[4vw]"
              @click="showcomment = !showcomment"
            >
              <Icon
                class="text-[6vw] mb-[2vw] text-[#eaeaea]"
                icon="uis:comment-dots"
              />
              <span class="text-[#eaeaea] text-[3vw]">{{
                dataTruncation(currentVideoInteractionData?.commentCount)
              }}</span>
            </div>
            <!-- {/* 评论结束 */} -->

            <!-- {/* 分享开始 */} -->
            <div
              class="flex items-center flex-col justify-center mb-[4vw]"
              @click="popupSharing = !popupSharing"
            >
              <Icon
                class="text-[6vw] mb-[2vw] text-[#eaeaea]"
                icon="majesticons:share"
                :class="{ 'jello-vertical': popupSharing }"
              />
              <span class="text-[#eaeaea] text-[3vw]">{{
                dataTruncation(currentVideoInteractionData?.shareCount)
              }}</span>
            </div>
            <!-- {/* 分享结束 */} -->

            <!-- {/* 收藏开始 */} -->
            <div class="flex items-center flex-col justify-center mb-[4vw]">
              <Icon
                class="text-[6vw] mb-[2vw] text-[#eaeaea]"
                icon="fluent:collections-24-filled"
              />
              <span class="text-[#eaeaea] text-[3vw]">收藏</span>
            </div>
            <!-- {/* 收藏结束 */}  -->

            <!-- {/* 旋转唱片开始 */} -->
            <div class="relative flex items-center justify-center">
              <img
                src="/static/d7e4e3a244701ee85fecb5d4f6b5bd57.png"
                alt=""
                class="w-[10vw] h-[10vw] rounded-[50%]"
              />
              <img
                :src="currentPlayingVideoData?.cover"
                alt=""
                class="w-[7vw] h-[7vw] rounded-[50%] absolute rotateAnimation"
              />
            </div>
          </div>
          <!-- 点赞、评论、分享、收藏、唱片 结束-->
        </div>
        <!-- 当前播放时间、总时间 开始 -->
        <div
          class="text-[5vw] flex items-center justify-center h-[44vw]"
          v-show="touchTheProgressBar"
        >
          <span class="text-[#ffffff]">{{ currentPlaybackDuration }}</span>
          <span class="text-[#666666]"
            >/{{ currentTotalPlaybackDuration }}</span
          >
        </div>
        <!-- 当前播放时间、总时间 结束 -->

        <!-- 进度条开始 -->
        <vue-slider
          v-model="progress"
          :process="true"
          tooltip="none"
          :drag-on-click="true"
          :min="0"
          :max="100"
          :interval="0.1"
          :duration="0"
          class="videoProgressBar"
          @dragging="handleProgressChange"
          @drag-end="touchTheProgressBar = false"
        ></vue-slider>
        <!-- 进度条开始 -->

        <!-- 发表评论 开始 -->
        <div
          class="w-[100%] flex items-center justify-between text-[#4d4d4d] px-[4vw] py-[4vw] text-[4vw]"
          @click="showcomment = !showcomment"
        >
          发条评论结识有趣的人
          <Icon icon="bx:expand-alt" :rotate="3" class="text-[4vw]" />
        </div>
        <!-- 发表评论 结束 -->
      </div>
      <!-- {/* 底部结束 */} -->
    </div>
    <!-- 内容结束 -->

    <!--弹出框 分享 开始 -->
    <van-popup
      v-model="popupSharing"
      round
      position="bottom"
      :style="{ height: '45vw' }"
      class="bg-[#272727] p-[4vw]"
    >
      <h3 class="text-[#a8a8a8] text-[4vw] font-semibold mb-[4vw]">分享</h3>
      <div class="w-[100%] overflow-y-auto pb-[5vw]">
        <div class="w-[160vw] flex relative">
          <div
            class="flex items-center justify-center flex-wrap w-[25vw]"
            v-for="(item, index) in socialMedia"
            :key="index.id"
          >
            <div
              class="flex items-center justify-center flex-wrap w-[12vw] h-[12vw] rounded-[50%] bg-[#3c3c3c] mb-[2vw]"
            >
              <Icon :icon="item.icon" class="text-[#d8d8d8] text-[7vw]" />
            </div>
            <span class="text-[2.6vw] text-[#fff]">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </van-popup>
    <!--弹出框 分享 结束 -->

    <!-- 评论 -->
    <van-popup
      v-model="showcomment"
      position="bottom"
      :style="{ height: '70%' }"
      :overlay-style="{ 'background-color': 'transparent' }"
    >
      <div class="py-[7.3vw] px-[4.2vw]">
        <!-- 头部开始 -->
        <div class="flex justify-between">
          <h1 class="text-[3.5vw] font-bold">
            评论(<span>{{ addComment }}</span
            >)
          </h1>
          <div class="flex justify-around items-center">
            <div
              class="w-[10.2vw] text-[3.1vw] items-center leading-[3.1vw] text-center"
              :style="{
                borderRight: index < 2 ? '0.5px solid #E6E6E6' : '',
                color: index == 0 ? '#333334' : 'rgb(153,153,153)',
              }"
              v-for="(item, index) in comment"
              :key="index.id"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <!-- 头部结束 -->
        <!-- 评论开始 -->
        <div class="h-[58vh] overflow-auto">
          <div class="mt-[4vw]" v-for="item in MvComment" :key="item.id">
            <!-- 评论头部 -->
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <img
                  :src="item.user.avatarUrl"
                  alt=""
                  class="w-[9.1vw] h-[9.1vw] rounded-[50%]"
                />
                <div class="ml-[2.7vw]">
                  <h1 class="text-[3.4vw] text-[#666666]">
                    {{ item.user.nickname }}
                  </h1>
                  <p class="text-[#9C9C9C] text-[2vw]">
                    {{ item.timeStr }} <span>福建</span>
                  </p>
                </div>
              </div>
              <div class="flex">
                <p class="text-[2.5vw] text-[rgb(153,153,153)] mr-[1vw]">
                  {{ item.likedCount }}
                </p>
                <Icon
                  icon="iconamoon:like"
                  class="text-[4vw] text-[rgb(153,153,153)]"
                />
              </div>
            </div>
            <!-- 评论头部结束 -->
            <div
              class="ml-[12vw] mt-[3.5vw] mr-[3vw] border-b-2 border-[#e7e7e7]"
            >
              <p class="text-[3.4vw]">
                {{ item.content }}
              </p>
              <div
                class="text-[2.8vw] text-[#5D7EAC] py-[2.4vw] flex items-center"
              >
                25条回复 <Icon icon="mingcute:right-line" class="text-[4vw]" />
              </div>
            </div>
          </div>
        </div>
        <!-- 评论结束 -->
      </div>
    </van-popup>
    <!-- {/* 底部结束 */} -->
  </div>
</template>

<script>
import {
  featMvUrl,
  featMvDetail,
  featMvDetailInfo,
  featMvComment,
  featMvCommentFloor,
} from '@/request/index.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  components: { VueSlider },
  data() {
    return {
      isLoading: true, // 加载状态
      activeNames: [1],
      videoInformation: null, // 视频信息
      currentPlaybackVideoPath: null, //当前播放视频路径
      currentPlayingVideoData: null, // 当前播放视频数据 作者信息等
      currentVideoInteractionData: null, //当前播放视频交互数据
      player: null, // 播放器实例
      progress: 0, // 进度
      playbackStatus: false, // 播放状态
      plyrOptions: {
        // 播放器实例规则
        controls: [],
      },
      currentPlaybackDuration: '00:00', // 当前播放时长
      currentTotalPlaybackDuration: '00:00', // 当前播放总时长
      touchTheProgressBar: false, // 触摸进度条
      like: false, // 点赞
      popupSharing: false, // 分享
      socialMedia: [
        // 分享数据
        { icon: 'tabler:brand-netease-music', text: '云音乐动态' },
        { icon: 'icon-park-outline:friends-circle', text: '微信朋友圈' },
        { icon: 'ic:twotone-wechat', text: '微信好友' },
        { icon: 'cib:qzone', text: 'QQ空间' },
        { icon: 'uiw:qq', text: 'QQ好友' },
        { icon: 'ri:weibo-fill', text: '微博' },
        { icon: 'ant-design:dingding-outlined', text: '钉钉' },
        { icon: 'solar:letter-linear', text: '私信' },
        { icon: 'mingcute:link-line', text: '复制链接' },
      ],
      comment: ['推荐', '最热', '最新'],
      showcomment: false,
      MvComment: [], //热门评论
      addComment: [], //获取评论数量
    };
  },
  async created() {
    try {
      // 视频
      const res1 = await featMvUrl(this.$route.params.id);
      this.videoInformation = res1.data.data;

      // 作者信息等
      const res2 = await featMvDetail(this.$route.params.id);
      this.currentPlayingVideoData = res2.data.data;

      // 交互数据
      const res3 = await featMvDetailInfo(this.$route.params.id);
      this.currentVideoInteractionData = res3.data;

      // 评论数据
      const res4 = await featMvComment(this.$route.params.id);
      this.MvComment = res4.data.hotComments;
      this.addComment = res4.data.total;
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false; // 请求完成后取消加载状态
    }
  },
  mounted() {
    // 监听isLoading 其值发生改变时执行下方代码块
    this.$watch('isLoading', () => {
      this.currentPlaybackVideoPath = this?.videoInformation?.url;
      this.initPlayer();
      if (this.$player._playing) {
        this.$player.playOrPause();
      }
    });
  },
  methods: {
    // 数据截取
    dataTruncation(playVolume) {
      if (playVolume > 100000000) {
        return `${Math.floor(playVolume / 100000000)}亿`;
      } else if (playVolume >= 10000) {
        return `${(playVolume / 10000).toFixed(1)}万`;
      } else {
        return playVolume?.toString();
      }
    },
    // 初始化视频
    initPlayer() {
      this.player = new Plyr(this.$refs.videoPlayer, this.plyrOptions);

      // 监听 Plyr 播放器的时间更新事件
      this.player.on('timeupdate', this.handleTimeUpdate);
    },
    // 计算进度 获取 当前播放时间于总时长
    handleTimeUpdate(event) {
      // 根据 Plyr 播放器的当前时间更新进度条
      this.progress =
        (event.detail.plyr.currentTime / event.detail.plyr.duration) * 100;

      this.currentPlaybackDuration = this.formatTime(
        event.detail.plyr.currentTime
      ); //当前播放时长
      this.currentTotalPlaybackDuration = this.formatTime(
        event.detail.plyr.duration
      ); //当前播放总时长
    },
    // 点击 拖到进度条视频跳转到对应进度
    handleProgressChange() {
      // 根据进度条的值计算视频的播放时间
      const currentTime = (this.progress / 100) * this.player.duration;

      // 更新 Plyr 播放器的当前时间
      this.player.currentTime = currentTime;

      // 切换为播放状态
      this.player.play();
      this.playbackStatus = false;

      // 显示时间
      this.touchTheProgressBar = true;
      this.currentPlaybackDuration = this.formatTime(currentTime);
    },
    // 切换播放状态
    togglePlayPause(e) {
      if (this.player.playing) {
        this.player.pause();
        this.playbackStatus = true;
      } else {
        this.player.play();
        this.playbackStatus = false;
      }
    },
    // 将时间格式化为分钟和秒钟的形式（例如：01:30）
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    },
  },
  beforeDestroy() {
    // 销毁视频
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
  },
};
</script>

<style>
.van-cell--clickable:active {
  background-color: transparent !important;
}

.van-collapse {
  height: 100%;
}

.van-cell {
  background: none;
  padding: 0;
  line-height: normal;
}

.van-cell__title {
  color: #ffffff;
}

.van-hairline--top-bottom::after,
.van-cell::after {
  border: none;
}

.van-cell--clickable:active {
  background-color: #000;
}

.van-collapse-item__content {
  background: none;
  padding: 0;
  color: #ffffff;
  max-height: 97vw;
  overflow: auto;
}

.van-notice-bar {
  background: none;
  height: 5vw;
  color: #e8e8e8;
}

.rotateAnimation {
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.videoProgressBar .vue-slider-rail {
  background: #5f5f5f;
  border-radius: 0;
}

.videoProgressBar .vue-slider-process {
  background: #dfdfdf;
  border-radius: 0;
}

.videoProgressBar .vue-slider-dot,
.videoProgressBar .vue-slider-dot-handle {
  width: 2vw;
  height: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

::-webkit-scrollbar {
  width: 8px; /* 设置滚动条宽度 */
  background-color: transparent; /* 设置滚动条背景色为透明 */
}

.jello-vertical {
  animation: jello-vertical 0.9s both;
}

@keyframes jello-vertical {
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(0.75, 1.25, 1);
  }
  40% {
    transform: scale3d(1.25, 0.75, 1);
  }
  50% {
    transform: scale3d(0.85, 1.15, 1);
  }
  65% {
    transform: scale3d(1.05, 0.95, 1);
  }
  75% {
    transform: scale3d(0.95, 1.05, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
