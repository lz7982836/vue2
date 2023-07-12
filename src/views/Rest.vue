<script>
export default {
  // h ===> createElement
  render: function (h) {
    //   return h('div', {}, [
    //     h('h1', { on: { click: this.fn } }, [this.count]),
    //     h('button', { on: { click: this.changeAbc } }, ['changeAbc']),
    //     h(
    //       'ul',
    //       {},
    //       this.arr.map((item) => h('li', {}, item))
    //     ),
    //   ]);
    //jsx 元素 是js的一种新的数据类型
    return (
      <div>
        <h1 onClick={this.fn}>{this.count}</h1>
        <button onClick={this.changeAbc}>changeAbc</button>
        <ul>
          {this.arr.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  },

  data() {
    return {
      count: 123,
      abc: 456,
      arr: [1, 2, 3],
    };
  },
  methods: {
    fn() {
      this.count++;
      this.$nextTick(() => console.log(this.$refs.hs?.innerText));
      // diff
    },
    changeAbc() {
      this.abc = 4321;
      console.log(this.abc);
    },
    addNewProp() {
      this.a = 1;
    },
  },

  created() {
    window.rest = this;
  },
  updated() {
    console.log('updated');
  },
};
</script>
