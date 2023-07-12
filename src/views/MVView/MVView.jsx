import { Mv } from '../../request';
import styled from 'styled-components-vue';
const Wrapper = styled.div`
  .tab {
    .van-tabs__wrap {
      margin-bottom: 3vw;
      border-radius: 15px;
    }

    .van-tab {
      font-size: 4vw;
      font-weight: 500;
      color: #9599a3;
    }

    .van-tab--active {
      color: #2a3146;
    }

    .van-tabs__nav {
      background: none;
    }

    .van-tabs__line {
      width: 4vw;
    }

    .van-sticky--fixed {
      top: 10vw;
      background: #f6f7fa;
    }
  }
`;
export default {
  render() {
    return (
      <Wrapper>
        {/*标题开始*/}
        <div class="flex items-center justify-center w-[100%] px-[4vw] py-[3vw] bg-[#fff] text-[#010101]  text-[4.2vw] font-[600]">
          MV排行榜
        </div>

        <van-tabs
          swipeable
          animated
          sticky
          onChange={this.beforeChange}
          class="tab"
        >
          {this.tab.map((item) => {
            return (
              <van-tab title={item}>
                <div
                  class={[
                    'overflow-auto',
                    'px-[4vw]',
                    $player.list === undefined ? 'h-[80vh]' : 'h-[74vh]',
                  ]}
                >
                  {this.MvdataList?.map((item, index) => (
                    <div class="w-[92vw] mb-[6vw]">
                      <div class="w-[100%] h-[52vw] relative">
                        <img
                          src={item.cover}
                          class=" w-[100%] h-[52vw] bg-black rounded-[3vw] mb-[2.7vw]"
                        />
                        <div class=" absolute top-[2vw] text-[#fff] right-[2vw] text-[2.6vw] flex items-center">
                          <Icon
                            icon="solar:play-bold"
                            color="#fdffff"
                            class="mr-[0.5vw] text-[2.6vw]"
                          />
                          {this.dataTruncation(item.playCount)}
                        </div>
                      </div>
                      <div>
                        <div class="flex h-[5vw] mb-[1.5vw]">
                          <span class="w-[5.3vw] text-[#999999] text-[4.3vw] mr-[2.8vw] text-center">
                            {index + 1}
                          </span>
                          <span class=" flex-1 line-clamp-1 text-[#000] text-[4vw] font-semibold h-[5vw]">
                            {item.name}
                          </span>
                        </div>
                        <div class="flex h-[4vw] items-center">
                          <span class="w-[5.3vw] text-[#999999] text-[2vw] mr-[2.8vw] text-center">
                            -
                          </span>
                          <div class=" flex-1 line-clamp-1 text-[#7c7c7c] text-[2vw]">
                            {item?.artists?.map((key, index) => (
                              <span>
                                {key.name}
                                {index < item.artists.length - 1 && (
                                  <span>/</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </van-tab>
            );
          })}
        </van-tabs>
      </Wrapper>
    );
  },
  data() {
    return {
      tab: ['内地', '港台', '欧美', '韩国', '日本'],
      MvdataList: [],
    };
  },
  methods: {
    async beforeChange(index) {
      const res = await Mv(this.tab[index]);
      this.MvdataList = res.data.data;
      return true;
    },
    // 数据截断
    dataTruncation(playVolume) {
      if (playVolume > 100000000) {
        return `${Math.floor(playVolume / 100000000)}亿`;
      } else if (playVolume > 100000) {
        return `${Math.floor(playVolume / 10000)}万`;
      } else {
        return playVolume.toString();
      }
    },
  },
  async created() {
    const res = await Mv(this.tab[0]);
    this.MvdataList = res.data.data;
  },
};
