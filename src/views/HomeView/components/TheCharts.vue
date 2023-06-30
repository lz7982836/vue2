<template>
  <div>
    <div class="flex justify-between w-[100%]">
      <h1
        class="text-[5vw] font-semibold w-[25vw] leading-[10vw] text-[black] dark:text-[rgb(234,234,236)]"
      >
        {{ item.uiElement?.mainTitle?.title }}
      </h1>
      <p
        class="text-[3vw] leading-[10vw] text-ellipsis overflow-hidden whitespace-nowrap w-[30vw] text-[black] dark:text-[rgb(144,144,152)]"
      >
        {{ item.uiElement?.mainTitle?.titleDesc }}
      </p>
    </div>
    <ul class="">
      <li v-for="(items, indexs) in 3" :key="indexs.id" class="m-[3vw]">
        <div class="flex relative w-[100%] h-[10vw]">
          <img
            :src="
              item.resources[indexs].resourceExtInfo?.songData.album.blurPicUrl
            "
            class="w-[10vw]"
            alt=""
          />
          <p
            class="text-[5vw] w-[10vw] text-center leading-[10vw]"
            :style="{ color: getColor(indexs + 1) }"
          >
            {{ indexs + 1 }}
          </p>
          <div>
            <p
              class="text-[3.5vw] font-normal w-[40vw] text-ellipsis overflow-hidden whitespace-nowrap text-[black] dark:text-[rgb(234,234,236)]"
            >
              {{ item.resources[indexs].resourceExtInfo?.songData.name }}
            </p>
            <p class="text-[2.5vw] text-[black] dark:text-[rgb(144,144,152)]">
              {{ item.resources[indexs].resourceExtInfo?.artists[0].name }}
              <span
                class="absolute w-[8vw] h-[5vw] right-[3vw] text-[3vw] top-[2vw]"
                ref="sps"
                :style="{
                  color:
                    item.resources[indexs]?.uiElement.labelText?.text == '新晋'
                      ? 'green'
                      : 'red',
                }"
                >{{ item.resources[indexs]?.uiElement.labelText?.text }}</span
              >
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    getColor(index) {
      const colorMap = {
        0: '#bd9642',
        1: '#747e9c',
        default: '#ae734e',
      };
      return colorMap[index] || colorMap['default'];
    },
  },
  props: ['item'],
};
</script>

<style></style>
