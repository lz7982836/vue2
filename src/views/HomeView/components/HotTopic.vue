<template>
  <div>
    <div class="flex">
      <Icon icon="uiw:message" color="white" width="5vw" height="5vw" />
      <h1 class="text-white text-[4vw] ml-[2vw] dark:text-[rgb(234,234,236)]">
        {{ item.user.nickname }}
      </h1>
    </div>
    <p class="text-[#ccc] text-[3vw] dark:text-[rgb(144,144,152)]">
      {{ item.tailMark?.circle?.member }}热度
    </p>
    <div class="flex justify-between">
      <p
        class="text-white leading-[25vw] text-[3vw] dark:text-[rgb(234,234,236)]"
      >
        {{ item.tailMark?.markTitle }}
      </p>
      <img
        :src="item.tailMark?.circle?.imageUrl"
        alt=""
        class="w-[15vw] h-[15vw]"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ['item'],
};
</script>
