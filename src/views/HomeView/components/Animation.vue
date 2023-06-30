<template>
  <div>
    <transition name="animation">
      <div
        v-if="visible === index + 1"
        class="w-[40vw] absolute top-[1vw] left-0 mr-[4.5vw] scroll-item z-[5]"
      >
        <img
          :src="personalizedtwo.uiElement.image.imageUrl"
          alt=""
          class="w-[40vw] rounded-[20px]"
        />

        <div
          class="absolute right-[2vw] top-[2vw] text-[2.5vw] font-bold text-white flex"
        >
          <Icon icon="basil:play-solid" color="white" class="mt-[0.5vw]" />
          {{
            personalizedtwo.resourceExtInfo?.playCount > 10000
              ? Math.floor(personalizedtwo.resourceExtInfo?.playCount / 10000) +
                '万'
              : personalizedtwo.resourceExtInfo?.playCount
          }}
        </div>
        <Icon
          icon="basil:play-solid"
          color="white"
          class="absolute right-[2vw] bottom-[2vw]"
          width="5vw"
        />
      </div>
    </transition>
    <!-- <p class="text-[3.5vw]">
      {{ text[0] }}
    </p> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: 1,
    };
  },
  props: ['personalizedtwo', 'index', 'personalizedthree'],
  created() {
    setInterval(() => {
      this.visible += 1;
      if (this.visible > 3) {
        this.visible = 1;
      }
      this.$emit(
        'update:text',
        this.personalizedthree[this.visible - 1].uiElement.mainTitle.title
      );
    }, 4000);
  },
};
</script>
<style>
.animation-enter {
  transform: translateY(100%) scale(0.7);
}
.animation-enter-active {
  transition: all ease-in-out 0.5s;
}
.animation-enter-to {
  transform: translateY(0) scale(1);
}
.animation-leave {
  transform: translateY(0) scale(1);
}
.animation-leave-active {
  transition: all ease-in-out 0.5s;
}
.animation-leave-to {
  transform: translateY(-100%) scale(0.7);
}
</style>
