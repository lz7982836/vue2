<template>
  <div>
    <div class="">
      <div class="flex items-center">
        <!-- 点击跳转 -->
        <div @click="$router.push('/PlayerHome')" class="flex mt-[1vw]">
          <div class="relative w-[11vw] h-[11vw]">
            <img
              src="/static/hk.png"
              alt=""
              class="w-[11vw] h-[11vw] absolute left-0 top-0"
            />
            <img
              :class="{ 'paused-animation': !this?.$player?._playing }"
              :src="$player._currentTrack?.al?.picUrl"
              alt=""
              class="w-[7.5vw] rotateAnimation rounded-[50%] h-[7.5vw] absolute left-[1.8vw] top-[1.8vw]"
            />
          </div>
          <div
            class="w-[58.5vw] ml-[2.8vw] line-clamp-1 text-[3.5vw] leading-[11vw]"
          >
            <p class="text-[3vw] text-[#3b4152] flex-1 line-clamp-1">
              {{ $player._currentTrack?.name }}
              <span class="text-[#80838f]">
                -
                {{ $player._currentTrack.ar[0]?.name }}
              </span>
            </p>
          </div>
        </div>
        <!-- 播放按钮 -->
        <div class="relative w-[6vw] h-[6vw]" @click="Pause">
          <van-circle
            v-model="currentRate"
            :rate="($player._progress / $player._duration) * 100"
            :speed="100"
            size="5.6vw"
            :stroke-width="120"
            color="#475165"
            layer-color="#C7CBD2"
            class="absolute top-0 left-0"
          />
          <!-- 播放按钮 -->
          <Icon
            :icon="$player._playing ? 'solar:pause-bold' : 'solar:play-bold'"
            class="text-[10px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#3b4152]"
          />
        </div>

        <!-- 播放列表 -->
        <Icon
          @click.native="show = !show"
          icon="iconamoon:playlist-fill"
          class="text-[6vw] text-[#3b4152] ml-[6vw]"
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
          当前播放
          <span class="text-[2vw] text-[#929293]">({{ music.length }})</span>
        </h1>
        <div class="flex justify-between mt-[6.6vw] items-center">
          <div class="flex">
            <!-- 列表循环图标 -->
            <Icon
              @click.native="$player.boolea = !$player.boolea"
              :icon="$player.boolea ? 'fad:repeat' : 'fad:repeat-one'"
              class="text-[#ccc] text-[8vw]"
            />

            <h1
              class="ml-[1.5vw] text-[3.4vw] font-medium"
              v-if="$player.boolea"
            >
              列表循环
            </h1>
            <h1 class="ml-[1.5vw] text-[3.4vw] font-medium" v-else>单曲循环</h1>
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
              <span
                v-if="item.fee == 1"
                data-v-034931a5=""
                class="w-[10vw] rounded-[5px] border-[1px] border-[red] font-[600] text-[2vw] text-[red] text-center leading-[6vw] scale-50 ml-[0] mr-[1vw]"
                >vip</span
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
              class="text-[3vw] mr-[4vw] text-[#BCBCBC]"
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
  </div>
</template>

<script>
// import Player from '../../views/Player/player';
import store from 'storejs';
export default {
  name: 'Player',
  data() {
    return {
      currentRate: 0,
      show: false,
      music_id: '',
      suoy: '',
    };
  },
  methods: {
    Pause() {
      console.log(this.$player);
      // console.log(Reflect.has(this.$player, 'list'));
      if (Reflect.has(this.$player, 'list')) {
        this.$player.playOrPause();
      } else {
        this.playSingle(this.music_id);
      }
    },
    fn(index, id) {
      if (this.$player._currentTrack.id == id) {
        this.playSingle(this.music[index + 1].id);
      }
      this.music.splice(index, 1);
      store.set('cookie_music', this.music);
    },
    // 播放器 播放单个
    playSingle(id) {
      console.log(id);
      store.set('cookie_music_id', id);
      this.$player.replacePlaylist(
        this.music.map((data) => data.id),
        '',
        '',
        id
      );
      store.set('cookie_music', this.music);
    },
    init_music() {
      this.music_id = store.get('cookie_music_id');
      this.suoy = this.music.filter((item, index) => {
        return item.id == this.music_id;
      });
      // console.log(666, this.suoy);
    },
    playerAll() {
      this.$player.replacePlaylist(
        this.music.map((data) => data.id),
        '',
        ''
      );
    },
  },
  async created() {
    this.music = store.get('cookie_music');
  },
};
</script>
<style>
.red-image {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}
.playmusic {
  position: sticky;
  top: 0;
  z-index: 999;
  left: 0;
  background-color: white;
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
.paused-animation {
  animation-play-state: paused;
}
</style>
