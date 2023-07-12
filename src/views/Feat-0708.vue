<template>
  <div>
    <Debounce :duration="1000" :type="click">
      <div
        class="bg-[orange] w-[100vw] text-center"
        @click="debounceTestHandler"
      >
        防抖测试
      </div>
    </Debounce>
  </div>
</template>
<script>
import Debounce from '../components/Debounce/index.jsx';
export default {
  components: { Debounce },
  methods: {
    debounceTestHandler() {
      console.log('防抖测试');
    },
  },
};
</script>
