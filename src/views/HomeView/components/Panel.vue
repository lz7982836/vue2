<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="m-[5vw]">
    <div>
      <div class="flex justify-between items-center">
        <div class="flex">
          <p
            class="text-[5vw] font-medium flex text-[black] dark:text-[rgb(234,234,236)]"
          >
            {{ label }}
          </p>
          <Icon
            icon="uiw:right"
            class="mt-[1.5vw] text-[5vw] text-[black] dark:text-[rgb(234,234,236)]"
          />
        </div>
        <Icon
          icon="ant-design:more-outlined"
          width="5vw"
          height="5vw"
          @click.native="drawerVisible = !drawerVisible"
          class="text-[black] dark:text-[rgb(234,234,236)]"
        />
      </div>
    </div>
    <div
      ref="wrapper"
      class="scroll-wrapper overflow-hidden w-[90vw] m-[4.5vw] ml-0"
    >
      <div
        class="flex scroll-content flex-wrap"
        :style="{ width: widthLength() }"
      >
        <slot name="header"></slot>
      </div>
    </div>
    <Drawer :visible.sync="drawerVisible" direction="btt">
      <template #head>
        <div
          class="flex justify-between items-center h-[10vw] border-b-[0.35vw] border-b-[#E8e8e8] dark:border-b-[rgb(69,69,69)] px-[5vw]"
        >
          <p
            class="text-[3vw] text-[#939BA1] font-[800] dark:text-[rgb(125,125,125)]"
          >
            {{ label }}
          </p>
          <Icon
            @click.native="drawerVisible = !drawerVisible"
            icon="ic:outline-close"
            class="w-[6vw] h-[6vw] rounded-[50%] bg-[#f2f2f3] dark:bg-[rgb(47,47,47)] text-[#696d73] dark:text-[rgb(234,234,236)]"
          />
        </div>
      </template>
      <div class="ml-[5vw]">
        <div class="h-[12vw] flex items-center">
          <Icon
            icon="iconamoon:like-light"
            class="w-[6vw] h-[6vw] mr-[2vw] dark:text-[rgb(234,234,236)]"
          />
          <p
            class="h-[3vw] text-[3vw] text-[#3a393f] dark:text-[rgb(234,234,236)]"
          >
            优先推荐
          </p>
        </div>
        <div class="h-[12vw] flex items-center">
          <Icon
            icon="basil:heart-off-outline"
            class="w-[6vw] h-[6vw] mr-[2vw] dark:text-[rgb(234,234,236)]"
          />
          <p
            class="h-[4vw] text-[3vw] text-[#3a393f] dark:text-[rgb(234,234,236)]"
          >
            减少推荐
          </p>
        </div>
        <div class="h-[12vw] flex items-center">
          <Icon
            icon="icon-park-outline:more-two"
            :rotate="1"
            class="w-[6vw] h-[6vw] mr-[2vw] dark:text-[rgb(234,234,236)]"
          />
          <p
            class="h-[5vw] text-[3vw] text-[#3a393f] dark:text-[rgb(234,234,236)]"
          >
            更多内容
          </p>
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
  methods: {
    widthLength() {
      return this.length * this.width + this.length * this.margin + 'vw';
    },
  },
  updated() {
    this.bs.refresh();
  },
  props: {
    label: {
      require: true,
      type: String,
    },
    length: {
      type: Number,
      require: true,
    },
    width: {
      type: Number,
      require: true,
    },
    margin: {
      type: Number,
      require: true,
    },
  },
};
</script>
