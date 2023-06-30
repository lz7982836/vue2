<template>
  <div @click="clickHandler">
    <transition name="slide">
      <div
        v-show="visible"
        class="w-screen fixed left-0 bottom-0 z-[999] h-[60vw] bg-[#fff] rounded-[5vw] rounded-b-[0] px-[4vw]"
      >
        <div>
          <slot name="head"></slot>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    </transition>
    <div
      v-if="visible"
      class="w-screen h-screen bg-black opacity-20 fixed left-0 bottom-0 z-[998]"
      ref="drawerMask"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    clickHandler(e) {
      if (e.target === this.$refs.drawerMask) {
        // this.visible = false;
        this.$emit('update:visible', false);
      }
    },
  },
};
</script>

<style scoped>
.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: all ease-in-out 0.5s;
}
.slide-enter-to,
.slide-leave {
  transform: translateY(0);
}
</style>
