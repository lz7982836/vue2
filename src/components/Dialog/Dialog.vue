<template>
  <div>
    <div
      v-show="visible"
      class="fixed translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] w-[70vw] text-[3.5vw] rounded-[12px] bg-[#fff] z-[20]"
    >
      <div class="pt-[26px] font-medium leading-[24px] text-center">
        {{ title }}
      </div>
      <div>
        <div
          class="pt-[8px] pb-[26px] px-[24px] box-border text-[#646566] text-[3vw]"
        >
          {{ message }}
        </div>
      </div>
      <div
        class="flex text-centert text-[red] h-[48px] items-center justify-center border-t border-[#ebedf0] cursor-pointer"
      >
        <div
          @click="cancel"
          class="flex-1 text-center border-r border-[#ebedf0] box-border leading-[48px]"
        >
          <span>取消</span>
        </div>
        <div class="flex-1 text-center leading-[48px]" @click="confirm">
          <span>确认</span>
        </div>
      </div>
    </div>
    <div
      v-show="visible"
      class="fixed top-0 left-0 right-0 bottom-0 bg-[#000] opacity-50 z-[15]"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    hide() {
      this.visible = false;
    },
    cancel() {
      this.hide();
      this.reject();
    },
    confirm() {
      this.hide();
      this.resolve();
    },
  },
  // props: {
  //   title: {
  //     type: String,
  //   },
  //   message: {
  //     type: String,
  //     require: true,
  //   },
  // },
};
</script>
