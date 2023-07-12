import styled from 'styled-components-vue';
const Wrapper = styled.div`
  background-color: orange;
  width: 100px;
  height: 100px;
  /* color: red; */
`;
export default {
  render() {
    return (
      <Wrapper>
        <div onClick={() => this.index++}>
          {this.index % 2 === 0 ? <div>偶数</div> : <h1>🐓数</h1>}
        </div>
        <img src={this.img} art="傻狗" />
        <input
          type="text"
          value={this.value}
          onInput={(e) => (this.value = e.target.value)}
        />
        <div>{this.value}</div>
      </Wrapper>
    );
  },
  data() {
    return {
      msg: 'hello,jsx!',
      index: 0,
      img: '',
      value: '',
    };
  },
};
