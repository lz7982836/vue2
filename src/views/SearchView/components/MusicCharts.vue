<template>
  <div class="w-[100vw] overflow-hidden mt-[5vw] px-[3vw]">
    <van-swipe class="rotationChart" :loop="false" :width="slideWidth">
      <van-swipe-item
        v-for="item in Playlist.slice(0, 10)"
        :key="item.id"
        class="w-[65vw] px-[4vw] bg-[#fff] dark:bg-[#31333a] rounded-[2vw] mr-[2.344vw]"
      >
        <!-- 标题开始 -->
        <div
          class="w-[100%] h-[12.422vw] flex items-center border-b-[2px] border-b-[#eaeaea] dark:border-b-[#43454c]"
        >
          <span
            class="text-[4vw] text-[#000] dark:text-[#e9e9e9] mr-[3.359vw]"
            >{{ item.name }}</span
          >
          <div
            class="h-[5.235vw] bg-[#f3f4f1] dark:bg-[#393b42] flex items-center px-[2vw] rounded-[3vw]"
          >
            <Icon
              icon="solar:play-bold"
              class="text-[#000] dark:text-[#e9e9e9] mr-[0.7vw] text-[2.6vw]"
            />
            <span class="text-[2.6vw] text-[#000] dark:text-[#e9e9e9]"
              >播放</span
            >
          </div>
        </div>
        <!-- 标题结束 -->
        <div class="py-[0.5vw]">
          <div
            v-for="(items, indexs) in item.tracks.slice(0, 20)"
            :key="indexs.id"
            class="my-[2.7vw] flex items-center"
          >
            <span
              class="text-[3.2vw] mr-[4vw]"
              :class="{ text_ff2c41d: indexs < 3, text_7d848d: indexs >= 3 }"
              >{{ indexs + 1 }}</span
            >
            <span
              class="text-[3.2vw] text-[#000] dark:text-[#e9e9e9] mr-[1vw] text-ellipsis overflow-hidden whitespace-nowrap"
              :style="{ fontWeight: indexs < 3 ? 600 : 400 }"
              >{{ items.name }}</span
            >
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';

export default {
  data() {
    return {};
  },
  props: {
    Playlist: {
      type: Array,
    },
  },
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
  },
  computed: {
    // 轮播图计算宽度
    slideWidth() {
      return `${window.innerWidth * 0.7}`; // 将宽度设置为视窗宽度的80%
    },
  },
};
</script>

<style lang="less">
.text_ff2c41d {
  color: #ff2c41;
  font-weight: 600;
}

.text_7d848d {
  color: #7d848d;
}

.rotationChart .van-swipe__indicators {
  display: none;
}
</style>
