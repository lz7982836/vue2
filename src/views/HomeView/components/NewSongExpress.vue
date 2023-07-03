<template>
  <div>
    <div class="flex">
      <img
        :src="item.album.picUrl"
        alt=""
        class="w-[14.5vw] h-[14.5vw] rounded-[10px]"
      />
      <div class="w-[40vw] h-[14.5vw] ml-[2vw]">
        <h1
          class="text-ellipsis overflow-hidden whitespace-nowrap mt-[3.2vw] text-[3.5vw] font-semibold text-[#3E465B] dark:text-[rgb(234,234,236)]"
        >
          {{ item.album.name }}
        </h1>
        <p
          class="text-ellipsis overflow-hidden whitespace-nowrap text-[2.36vw] text-[rgb(124,131,142)] dark:text-[rgb(144,144,152)]"
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
