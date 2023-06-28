<template>
  <div>
    <div
      v-for="item in blocks"
      :key="item.id"
      class="p-[2vw] mr-[10vw] overflow-hidden w-[90vw] m-[2.5vw] ml-0 h-[50vw] bg-white scroll-item"
      ref="song"
    >
      <div class="flex justify-between w-[100%]">
        <h1 class="text-[5vw] font-semibold w-[25vw] leading-[10vw]">
          {{ item.uiElement.mainTitle.title }}
        </h1>
        <p
          class="text-[3vw] leading-[10vw] text-ellipsis overflow-hidden whitespace-nowrap w-[30vw]"
        >
          {{ item.uiElement.mainTitle.titleDesc }}
        </p>
      </div>
      <ul class="">
        <li v-for="(items, indexs) in 3" :key="indexs.id" class="mb-[3vw]">
          <div class="flex relative w-[100%]">
            <img
              :src="
                item.resources[indexs].resourceExtInfo?.songData.album
                  .blurPicUrl
              "
              class="w-[10vw]"
              alt=""
            />
            <p class="text-[5vw] w-[10vw] text-center">
              {{ indexs + 1 }}
            </p>
            <div>
              <p
                class="text-[3.5vw] font-normal w-[40vw] text-ellipsis overflow-hidden whitespace-nowrap"
              >
                {{ item.resources[indexs].resourceExtInfo?.songData.name }}
              </p>
              <p class="text-[2.5vw]">
                {{ item.resources[indexs].resourceExtInfo?.artists[0].name }}
                <span
                  class="absolute w-[8vw] h-[5vw] right-[3vw] text-[3vw] top-[1vw]"
                  ref="sps"
                  :style="{ color: 'red' }"
                  >{{ item.resources[indexs]?.uiElement.labelText.text }}</span
                >
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {},
  props: ['blocks'],
};
</script>

<style></style>
