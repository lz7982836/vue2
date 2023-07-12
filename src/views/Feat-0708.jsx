import { areaList } from '@vant/area-data';
import styled from 'styled-components-vue';
const Wrapper = styled.div`
  .van-picker__confirm {
    color: red;
  }
`;
export default {
  render() {
    return (
      <div>
        <van-popup
          v-model={this.popupVisible}
          position="bottom"
          style={{ height: '40%' }}
        >
          <van-area
            columns-num="2"
            confirm-button-text="完成"
            area-list={areaList}
            onConfirm={this.confirm}
          />
        </van-popup>
      </div>
    );
  },
  data() {
    return {
      areaList: Object.freeze(areaList),
      popupVisible: true,
    };
  },
  methods: {
    confirm(e) {
      this.popupVisible = false;
      console.log(e);
    },
  },
};
