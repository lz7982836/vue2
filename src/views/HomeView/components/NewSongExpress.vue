<template>
  <div>
    <div class="flex">
      <img :src="item.album.picUrl" alt="" class="w-[25vw]" />
      <div class="pl-[3vw] pt-[3vw] pb-[3vw] w-[40vw]">
        <h1
          class="text-ellipsis overflow-hidden whitespace-nowrap leading-[15vw] text-[3vw] text-[black] dark:text-[rgb(234,234,236)]"
        >
          {{ item.album.name }}
        </h1>
        <p
          class="text-ellipsis overflow-hidden whitespace-nowrap text-[3vw] dark:text-[rgb(144,144,152)]"
        >
          {{ item.album.alias[0] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {},
  props: ['item'],
};
</script>

<style></style>
