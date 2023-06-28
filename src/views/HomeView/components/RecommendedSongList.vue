<template>
  <ul>
    <li
      v-for="item in personalized"
      :key="item.id"
      class="w-[40vw] mr-[4.5vw] scroll-item relative"
    >
      <img :src="item.picUrl" alt="" class="w-[40vw] rounded-[20px]" />
      <p class="text-[3.5vw]">{{ item.name }}</p>
      <div
        class="absolute right-[2vw] top-[2vw] text-[2.5vw] font-bold text-white flex"
      >
        <Icon icon="basil:play-solid" color="white" class="mt-[0.5vw]" />
        {{
          item.playCount > 10000
            ? Math.floor(item.playCount / 10000) + '万'
            : item.playCount
        }}
      </div>
    </li>
  </ul>
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
