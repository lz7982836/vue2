<template>
  <div>
    <div class="flex justify-between w-[100%]">
      <h1
        class="text-[4vw] font-semibold w-[25vw] ml-[2vw] leading-[10vw] text-[rgb(62,72,92)] dark:text-[rgb(234,234,236)]"
      >
        {{ item.uiElement?.mainTitle?.title }}
      </h1>
      <p
        class="text-[3vw] text-[rgb(148,154,163)] leading-[10vw] text-ellipsis overflow-hidden whitespace-nowrap w-[30vw] dark:text-[rgb(144,144,152)]"
      >
        {{ item.uiElement?.mainTitle?.titleDesc }}
      </p>
    </div>
    <ul class="pt-[2vw]">
      <li
        v-for="(items, indexs) in 3"
        :key="indexs.id"
        class="mb-[2vw] ml-[2vw]"
      >
        <div class="flex relative w-[100%] h-[14.5vw]">
          <img
            :src="
              item.resources[indexs].resourceExtInfo?.songData.album.blurPicUrl
            "
            class="w-[14.5vw] h-[14.5vw] rounded-[10px]"
            alt=""
          />
          <p
            class="text-[5vw] w-[10vw] text-center leading-[14.5vw] font-semibold"
            :style="{ color: getColor(indexs + 1) }"
          >
            {{ indexs + 1 }}
          </p>
          <div class="mt-[2vw]">
            <p
              class="text-[3.5vw] font-normal text-[rgb(63,73,93)] w-[40vw] text-ellipsis overflow-hidden whitespace-nowrap dark:text-[rgb(234,234,236)]"
            >
              {{ item.resources[indexs].resourceExtInfo?.songData.name }}
            </p>
            <p
              class="text-[2.5vw] text-[rgb(126,133,146)] dark:text-[rgb(144,144,152)]"
            >
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
