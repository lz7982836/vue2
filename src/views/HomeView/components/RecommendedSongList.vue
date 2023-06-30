<template>
  <div>
    <img
      :src="personalized.uiElement.image.imageUrl"
      alt=""
      class="w-[40vw] rounded-[20px]"
    />
    <p class="text-[3.5vw]">{{ personalized.uiElement.mainTitle.title }}</p>
    <div
      class="absolute right-[2vw] top-[2vw] text-[2.5vw] font-bold text-white flex"
    >
      <Icon icon="basil:play-solid" color="white" class="mt-[0.5vw]" />
      {{
        personalized.resources[0].resourceExtInfo.playCount > 10000
          ? Math.floor(
              personalized.resources[0].resourceExtInfo.playCount / 10000
            ) + '万'
          : personalized.resources[0].resourceExtInfo.playCount
      }}
    </div>
    <Icon
      icon="basil:play-solid"
      color="white"
      class="absolute right-[2vw] bottom-[12vw]"
      width="5vw"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {},
  props: ['personalized'],
};
</script>

<style></style>
