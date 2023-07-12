<template>
  <div>
    <div>
      <h1 class="text-[4vw] text-[#bbbbbb] flex">
        {{ index == 0 ? '今天' : '昨天' }}
        &nbsp;
        {{ new Date().getMonth() + 1 + '/' + (new Date().getDate() - index) }}
        <span
          class="ml-[1vw] text-[2vw] rounded-[5px] leading-[6vw] text-red-500 bg-red-100"
        >
          {{ item.tag }}
        </span>
      </h1>
      <p
        class="text-[3.68vw] dark:text-[rgb(234,234,236)] mt-[2vw] text-[#3E4558]"
      >
        {{ item.title }}
      </p>
    </div>
    <img :src="item.imgUrl" alt="" class="w-[15vw] h-[15vw]" />
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
};
</script>
