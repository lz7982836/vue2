<script>
export default {
  data() {
    return {};
  },
  // 在组件封装属性时我们可选的属性类型：attr属性 prop属性
  // 其中两者都可以吧数据从父组件传递到子组件
  // 两者区别
  // attr属性开箱即用 不需要额外配置 但是使用略显繁琐 而且不具备属性值类型检测等功能
  // prop属性需要选择对应组件中使用props配置项先行配置才可使用 使用简单 具备属性值类型检测等工具
  // props: ['source'],
  props: {
    source: {
      // 属性值类型检测：目前类型用对应的构造函数表达，如果约束为多种数据类型就用数组括起来
      type: [Number, Object],
      // 是否必须传递
      // required:true,
      // 默认值
    },
    count: {
      type: Number,
      default: 12,
      validator(value) {
        return [1, 2, 3].includes(value);
      },
    },
  },
  mounted() {
    console.log(this.$attrs.source);
  },
};
</script>
