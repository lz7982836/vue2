import styled from 'styled-components-vue';
import { featTopMv } from '@/request/index.js';
const Wrapper = styled.div`
  .tab {
    .van-tabs__wrap {
      height: 10vw;
      margin-bottom: 3vw;
      border-radius: 15px;
    }

    .van-tab {
      font-size: 4vw;
      font-weight: 500;
      color: #9599a3;
      line-height: normal;
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
        <div class="flex items-center justify-center w-[100%] px-[4vw] h-[12vw] bg-[#fff] text-[#010101]  text-[4.2vw] font-[600]">
          MV排行榜
        </div>
        {/*	标题结束*/}

        {/* 加载效果开始 */}
        <div
          class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center"
          style={this.isLoading ? 'display: block;' : 'display: none;'}
        >
          <img
            src="/static/wave.gif"
            class="red-image w-[8vw] h-[8vw] mx-[auto] mb-[1vw]"
          />
          正在加载...
        </div>
        {/* 加载效果结束 */}

        {/* 选项卡开始 */}
        <van-tabs
          animated
          swipeable
          v-model={this.currentDisplayIndex}
          class="tab"
        >
          {this.tab.map((item, index) => {
            return (
              <van-tab title={item} name={index}>
                <div
                  class="overflow-auto px-[4vw]"
                  style={{
                    display: !this.isLoading ? 'block' : 'none',
                    height: `${this.pageHeight}px`,
                  }}
                >
                  {this.currentLeaderboardData?.map((item, index) => (
                    <div
                      class="w-[92vw] mb-[6vw]"
                      onClick={() => {
                        this.$router.push(`/MvVideoView/${item.id}`);
                      }}
                    >
                      <div class="w-[100%] h-[52vw] relative rounded-[3vw] overflow-hidden mb-[2.7vw]">
                        <img
                          src={item.cover}
                          class=" w-[100%] h-[52vw] bg-black "
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
                          <span
                            class="w-[5.3vw] text-[4.3vw] mr-[2.8vw] text-center font-extrabold"
                            style={{
                              color: index < 3 ? '#f00' : '#999999',
                            }}
                          >
                            {index + 1}
                          </span>
                          <span class=" flex-1 line-clamp-1 text-[#000] text-[4vw] font-semibold h-[5vw]">
                            {item.name}
                          </span>
                        </div>
                        <div class="flex h-[4vw] items-center">
                          {item.lastRank === index + 1 ? (
                            <div class="w-[5.3vw] text-[#999999] text-[2vw] mr-[2.8vw] flex items-center justify-center">
                              -
                            </div>
                          ) : null}
                          {item.lastRank === -1 ? (
                            <div class="w-[5.3vw] text-[#999999] text-[2vw] mr-[2.8vw] flex items-center justify-center">
                              <Icon
                                icon="ic:outline-fiber-new"
                                class="text-[#51986d] text-[5vw]"
                              />
                            </div>
                          ) : null}
                          {item.lastRank > index + 1 ? (
                            <div class="w-[5.3vw] text-[#999999] text-[2vw] mr-[2.8vw] flex items-center justify-center">
                              <Icon
                                icon="maki:triangle"
                                class="text-[#f05357]"
                              />
                              {item.lastRank - (index + 1)}
                            </div>
                          ) : null}
                          {item.lastRank < index + 1 && item.lastRank != -1 ? (
                            <div class="w-[5.3vw] text-[#999999] text-[2vw] mr-[2.8vw] flex items-center justify-center">
                              <Icon
                                icon="maki:triangle"
                                rotate={2}
                                class="text-[#57b5e4]"
                              />
                              {index + 1 - item.lastRank}
                            </div>
                          ) : null}
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
        {/* 选项卡结束 */}
      </Wrapper>
    );
  },
  data() {
    return {
      currentDisplayIndex: 0,
      tab: ['内地', '港台', '欧美', '韩国', '日本'],
      currentLeaderboardData: null, // 当前排行榜数据
      isLoading: true, // 加载状态
      pageHeight: null, /// 计算高度
      userId: null,
    };
  },
  async created() {
    // 当前排行榜数据
    this.fetchData(0);
    // 使用$watch函数来监听currentDisplayIndex属性的变化
    this.$watch('currentDisplayIndex', (current) => {
      // 当currentDisplayIndex发生变化时，执行以下回调函数

      // 调用fetchData函数，并将current作为参数传入
      this.fetchData(current);
    });
  },
  mounted() {
    // 计算高度
    this.calculatePageHeight();
    window.addEventListener('resize', this.calculatePageHeight);
  },
  beforeDestroy() {
    // 在组件销毁前移除事件监听
    window.removeEventListener('resize', this.calculatePageHeight);
  },
  methods: {
    async fetchData(index) {
      try {
        this.isLoading = true;
        const res = await featTopMv(this.tab[index]);
        this.currentLeaderboardData = res.data.data;
        // console.log(this.currentLeaderboardData);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false; // 请求完成后取消加载状态
      }
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
    // 计算高度
    calculatePageHeight() {
      this.pageHeight =
        window.innerHeight -
        window.innerWidth * (this.$player.list ? 0.5 : 0.38);
    },
  },
};
