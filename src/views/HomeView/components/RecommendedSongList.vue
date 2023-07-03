<template>
  <div>
    <div
      class="w-[26vw] h-[31vw] bg-[#ddd] absolute top-[0vw] left-1/2 -translate-x-1/2 rounded-[8px] z-[0]"
    ></div>
    <div class="absolute z-5">
      <img
        :src="personalized.uiElement.image.imageUrl"
        alt=""
        class="w-[31vw] rounded-[8px]"
      />
      <p class="text-[2.78vw] dark:text-[rgb(234,234,236)] mt-[2vw]">
        {{ personalized.uiElement.mainTitle.title }}
      </p>
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
