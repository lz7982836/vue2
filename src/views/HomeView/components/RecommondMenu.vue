<template>
  <ul>
    <li
      v-for="item in menulist"
      :key="item.id"
      class="w-[16vw] mr-[3.5vw] scroll-item"
      :menu="item"
    >
      <img :src="item.iconUrl" alt="" class="red-image w-[15vw]" />
      <p
        class="text-[3vw] text-center text-[rgb(102,112,124)] dark:text-[rgb(178,179,184)]"
      >
        {{ item.name }}
      </p>
    </li>
    <p class="absolute top-[6vw] text-[3vw] left-[5.8vw] text-white">
      {{ new Date().getDate() }}
    </p>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {},
  props: ['menulist'],
};
</script>

<style></style>
