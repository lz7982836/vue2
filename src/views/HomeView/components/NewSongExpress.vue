<template>
  <ul>
    <li v-for="item in song" :key="item.song" class="w-[85vw] scroll-item">
      <div class="flex">
        <img :src="item.album.picUrl" alt="" class="w-[25vw]" />
        <div class="pl-[3vw] pt-[3vw] pb-[3vw] w-[40vw]">
          <h1
            class="text-ellipsis overflow-hidden whitespace-nowrap leading-[15vw] text-[3vw]"
          >
            {{ item.album.name }}
          </h1>
          <p class="text-ellipsis overflow-hidden whitespace-nowrap text-[3vw]">
            {{ item.album.alias[0] }}
          </p>
        </div>
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
  props: ['song'],
};
</script>

<style></style>
