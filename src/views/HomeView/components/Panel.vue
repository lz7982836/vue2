<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="m-[5vw]">
    <div>
      <div class="flex justify-between items-center">
        <div class="flex">
          <p class="text-[5vw] font-medium flex">{{ label }}</p>
          <Icon icon="uiw:right" class="mt-[1.5vw]" />
        </div>
        <Icon
          icon="ant-design:more-outlined"
          width="5vw"
          height="5vw"
          @click.native="drawerVisible = !drawerVisible"
        />
      </div>
    </div>
    <div
      ref="wrapper"
      class="scroll-wrapper overflow-hidden w-[90vw] m-[4.5vw] ml-0"
    >
      <div class="flex w-[270vw] scroll-content">
        <slot name="header"></slot>
      </div>
    </div>
    <Drawer :visible.sync="drawerVisible">
      <template #head>
        <div class="flex justify-between items-center">
          <p class="mt-[3vw]">{{ label }}</p>
          <Icon
            icon="ph:x-bold"
            width="5vw"
            height="5vw"
            class="mt-[3vw]"
            @click.native="drawerVisible = !drawerVisible"
          />
        </div>
      </template>
      <div>
        <div class="h-[12vw] flex items-center">
          <Icon icon="iconamoon:like-light" class="w-[6vw] h-[6vw] mr-[2vw]" />
          <p class="h-[3vw] text-[3vw]">优先推荐</p>
        </div>
        <div class="h-[12vw] flex items-center">
          <Icon
            icon="basil:heart-off-outline"
            class="w-[6vw] h-[6vw] mr-[2vw]"
          />
          <p class="h-[4vw] text-[3vw]">减少推荐</p>
        </div>
        <div class="h-[12vw] flex items-center">
          <Icon
            icon="icon-park-outline:more-two"
            :rotate="1"
            class="w-[6vw] h-[6vw] mr-[2vw]"
          />
          <p class="h-[5vw] text-[3vw]">更多内容</p>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';

export default {
  data() {
    return {
      drawerVisible: false,
    };
  },
  mounted() {
    this.bs = new BScroll(this.$refs.wrapper, {
      scrollX: true,
      probeType: 3,
      disableMouse: false,
      disableTouch: false,
      mouseWheel: true,
      click: true,
    });
  },
  updated() {
    this.bs.refresh();
  },
  props: {
    label: {
      require: true,
      type: String,
    },
  },
};
</script>
