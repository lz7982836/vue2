import _ from 'lodash';
export default {
  render() {
    this.$slots.default[0].data.on[this.type] = _.debounce(
      this.$slots.default[0].data.on[this.type],
      this.duration
    );
    return this.$slots.default;
  },
  props: {
    duration: {
      type: Number,
      default: 500,
    },
    type: {
      type: String,
      default: 'click',
    },
  },
};
