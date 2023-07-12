<template>
  <div class="relative h-[100vh] z-[13] overflow-hidden">
    <div class="flex flex-wrap z-[3] h-[100vh]">
      <!--头部-->
      <div
        class="h-[15vw] w-[100vw] z-[5] flex items-center px-[4vw] justify-between"
      >
        <Icon
          icon="ep:arrow-up-bold"
          class="dark:text-[#EEEEEE] text-[6vw] mt-[0.6vw] text-[#fff]"
          :rotate="2"
          @click.native="$router.go(-1)"
        />
        <div class="text-center">
          <p class="h-[4vw] text-[4vw] text-[#fff]">
            {{ $player._currentTrack.name }}
          </p>
          <p
            v-if="$player._currentTrack && $player._currentTrack?.ar"
            class="text-[2.8vw] text-[#BCBFBF] mt-[2vw] font-[400]"
          >
            {{ $player._currentTrack?.ar[0]?.name }}
            <span
              class="px-[1.6vw] py-[0.8vw] text-[#D8DBDB] text-[2vw] rounded-[8px] bg-[#84868B] ml-[1vw]"
              >关注</span
            >
          </p>
        </div>
        <Icon icon="carbon:share" class="text-[6vw] text-[#fff]" />
      </div>

      <div class="relative top-[0] w-[100vw] h-[120vw]">
        <div
          ref="zhen"
          class="absolute top-[10%] left-[50%] translate-x-[-50%] z-[10] rotated w-[40vw] h-[50vw]"
          :style="
            !$player._playing
              ? `transform:rotate(-45deg)`
              : `transform:rotate(-10deg)`
          "
        >
          <img
            src="/static/needle-ab.png"
            alt=""
            class="h-[40vw] absolute top-[-3.2vw] left-[-3.2vw]"
          />
        </div>
        <!-- 唱片-->
        <div
          class="w-[80vw] h-[80vw] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-45%] z-[5]"
        >
          <img src="/static/cp.png" alt="" class="w-[80vw] h-[80vw]" />
          <img
            :src="$player._currentTrack?.al?.picUrl"
            alt=""
            class="w-[50vw] h-[50vw] absolute top-1/2 left-1/2 rounded-[50%] border-[5px] border-[#000] rotateAnimation1"
            :class="{ 'paused-animation': !this?.$player?._playing }"
          />
        </div>
      </div>

      <div class="w-[100vw] flex justify-evenly items-center z-[5]">
        <div @click="love = !love">
          <Icon
            icon="ant-design:heart-filled"
            v-if="love"
            class="text-[#FE3C3A] text-[6vw]"
          />
          <Icon
            icon="ant-design:heart-outlined"
            class="text-[6vw] text-[#fff]"
            v-else
          />
        </div>
        <Icon
          icon="streamline:interface-download-circle-arrow-circle-down-download-internet-network-server-upload"
          class="text-[5vw] text-[#fff]"
        />
        <Icon icon="carbon:user-multiple" class="text-[5vw] text-[#fff]" />
        <Icon icon="uil:comment-message" class="text-[6vw] text-[#fff]" />
        <Icon icon="ri:more-2-line" class="text-[6vw] text-[#fff]" />
      </div>
      <div class="w-[100vw] flex z-[200] px-[5vw]">
        <!-- 当前播放时间开始 -->
        <div class="text-[#fff] text-[1.6vw]">
          {{ timeModification($player._progress) }}
        </div>
        <!-- 当前播放时间结束 -->
        <vue-slider
          v-model="$player.progress"
          :process="true"
          tooltip="none"
          :drag-on-click="true"
          :min="0"
          :interval="0.1"
          :duration="0"
          :max="$player._duration"
          class="mx-[3vw] flex-1 vue-slider-rall w-[30vw]"
        ></vue-slider>
        <!-- 总时长开始 -->
        <div class="text-[#fff] text-[1.6vw]">
          {{ timeModification($player._duration) }}
        </div>
        <!-- 总时长结束 -->
      </div>
      <div class="h-[12.3vw] flex w-[100vw] items-center justify-evenly z-[5]">
        <div v-if="false">
          <Icon icon="icon-park-outline:loop-once" v-if="false" />
          <span v-if="false"></span>
        </div>
        <Icon icon="ps:random" v-if="true" class="text-[#fff]" />
        <!--上一曲-->
        <Icon
          icon="fluent:previous-16-filled"
          class="text-[#fff]"
          @click.native="PrevTrackCallback"
        />
        <div
          class="w-[12vw] h-[12vw] rounded-[50%] bg-[#fff] flex items-center justify-center"
        >
          <Icon
            :icon="`${
              $player._playing ? 'carbon:pause-filled' : 'ph:play-fill'
            }`"
            width="20px"
            @click.native="playFn"
          />
        </div>
        <!--下一曲-->
        <Icon
          icon="fluent:next-20-filled"
          class="text-[#fff]"
          @click.native="nextTrackCallback"
        />
        <Icon
          icon="iconamoon:playlist-fill"
          @click.native="show = !show"
          class="text-[6vw] text-[#fff]"
        />
      </div>
    </div>

    <!-- 播放列表 -->
    <van-popup
      class="rounded-t-[20px] px-[5.4vw]"
      v-model="show"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="playmusic py-[6vw]">
        <h1 class="text-[4vw] font-extrabold">
          当前播放 <span class="text-[2vw] text-[#929293]">(26)</span>
        </h1>
        <div class="flex justify-between mt-[6.6vw] items-center">
          <div class="flex">
            <!-- 列表循环图标 -->
            <Icon
              icon="arcticons:loopboard"
              :horizontalFlip="true"
              class="text-[5vw] text-[#B1B1B1]"
            />
            <h1 class="ml-[1.5vw] text-[3.4vw] font-medium">列表循环</h1>
          </div>
          <div class="flex w-[30vw] justify-between">
            <!-- 下载图标 -->
            <Icon
              icon="mi:download"
              :horizontalFlip="true"
              class="text-[5vw] text-[#B1B1B1]"
            />
            <!-- 收藏图标 -->
            <Icon
              icon="fluent:collections-20-regular"
              :horizontalFlip="true"
              class="text-[5vw] text-[#B1B1B1]"
            />
            <!-- 删除 -->
            <Icon
              icon="fluent-mdl2:delete"
              :horizontalFlip="true"
              class="text-[5vw] text-[#B1B1B1]"
            />
          </div>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div>
        <div
          v-for="(item, index) in music"
          :key="item.id"
          @click="playSingle(item.id)"
          class="flex justify-between items-center h-[14vw]"
        >
          <div class="flex items-center">
            <img
              src="/static/wave.gif"
              class="red-image w-[2vw] h-[2vw]"
              v-if="item.id == $player._currentTrack.id"
              alt=""
            />
            <h1
              class="text-[4.1vw] ml-[2vw] w-[60vw] line-clamp-1"
              :class="
                item.id == $player._currentTrack.id ? 'text-[#D15B57]' : ''
              "
            >
              {{ item.name }}
              <span
                :class="
                  item.id == $player._currentTrack.id ? 'text-[#D15B57]' : ''
                "
                class="text-[3vw] text-[#BCBCBC]"
                >-{{ item.ar[0].name }}</span
              >
            </h1>
          </div>
          <div class="flex items-center">
            <p
              class="text-[3vw] mr-[6vw] text-[#BCBCBC]"
              v-if="item.id == $player._currentTrack.id"
            >
              播放来源
            </p>
            <Icon
              @click.native="fn(index, item.id)"
              icon="ic:baseline-close"
              :horizontalFlip="true"
              class="text-[5vw] text-[#B1B1B1]"
            />
          </div>
        </div>
      </div>
    </van-popup>

    <div
      class="element fixed z-[1] top-0 left-0 right-0 bottom-0"
      :style="`background-image: url(${$player._currentTrack?.al?.picUrl})`"
    ></div>
    <div class="fixed z-[2] bgColor top-0 left-0 right-0 bottom-0"></div>
  </div>
</template>
<script>
import VueSlider from 'vue-slider-component';
import store from 'storejs';
import 'vue-slider-component/theme/default.css';
export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      love: false,
      value: 0,
      show: false,
      music: [],
    };
  },
  methods: {
    fn(index, id) {
      if (this.$player._currentTrack.id == id) {
        this.playSingle(this.music[index + 1].id);
      }
      this.music.splice(index, 1);
      store.set('cookie_music', this.music);
    },
    // 播放器 播放单个
    playSingle(id) {
      // console.log(id);
      store.set('cookie_music_id', id);
      this.$player.replacePlaylist(
        this.music.map((data) => data.id),
        '',
        '',
        id
      );
      store.set('cookie_music', this.music);
    },
    nextTrackCallback() {
      this.$refs.zhen.style = 'transform:rotate(-45deg)';
      setTimeout(() => {
        this.$player.playOrPause();
        this.$player._nextTrackCallback();
      }, 500);
    },
    // 上一首
    PrevTrackCallback() {
      this.$refs.zhen.style = 'transform:rotate(-45deg)';
      setTimeout(() => {
        this.$player.playOrPause();
        if (this.$player.list.indexOf(this.$player._currentTrack.id) == 0) {
          this.playSingle(this.$player.list[this.$player.list.length - 1]);
        } else {
          this.playSingle(
            this.$player.list[
              this.$player.list.indexOf(this.$player._currentTrack.id) - 1
            ]
          );
        }
      }, 500);
    },
    // 播放器 播放单个
    playSingle(id) {
      this.$player.replacePlaylist(
        this.$player.list.map((data) => data),
        '',
        '',
        id
      );
    },
    playFn() {
      this.$player.playOrPause();
    },
    // 时间修改
    timeModification(time) {
      const minutes = Math.floor(time / 60);
      const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
        Math.floor(time % 60)
      ).padStart(2, '0')}`;

      return formattedTime;
    },
  },
  created() {
    this.music = store.get('cookie_music');
  },
};
</script>

<style scoped>
.rotateAnimation1 {
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: translateX(-50%) translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) translateY(-50%) rotate(360deg);
  }
}
.paused-animation {
  animation-play-state: paused;
}
.element {
  background-size: 100% 100%;
  filter: blur(24px);
}
.bgColor {
  background-color: rgba(0, 0, 0, 0.5);
}
.rotated {
  transition: all 1s;
  transform-origin: left top;
}
.vue-slider-rail {
  background: rgba(255, 255, 255, 0.2);
}

.vue-slider-process {
  background: rgba(255, 255, 255, 0.5);
}
</style>
