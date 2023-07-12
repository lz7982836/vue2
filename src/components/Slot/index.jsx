export default {
  render(h) {
    return h('div', {}, this.$parent.$slots[this.name]);
  },
  props: {
    name: {
      type: String,
      default: 'default',
    },
  },
};
