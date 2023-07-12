<template>
  <div class="p-[12px] border inline-block text-center">
    <self-slot />
    <self-slot name="abc" />
    <self-slot name="def" />
  </div>
</template>
<script>
import Slot from '../Slot/index.jsx';
export default {
  components: { 'self-slot': Slot },
  created() {
    console.log('button=>', this);
  },
};
</script>
