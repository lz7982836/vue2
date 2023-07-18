import styled from 'styled-components-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  getUserAccount,
  getUserDetail,
  fetchUserPlaylist,
  fetchUserHistory,
  fetchSongDetail,
} from '../../request';
const Wrapper = styled.div``;
export default {
  render() {
    return (
      <div>
        {/* 头部 */}
        <div class="fixed w-[100vw] z-[20]">
          {/* 图片 */}
          <div class="flex px-[5vw] justify-between mt-[12vw]">
            <Icon
              icon="teenyicons:left-outline"
              nativeOnClick={() => {
                this.$router.push('/HomeView');
              }}
              class="text-[rgb(255,255,255)] w-[5vw] h-[6vw]"
            />

            <Icon
              icon="mingcute:more-2-fill"
              class="text-[5vw] text-[rgb(255,255,255)]"
            />
          </div>
        </div>
        {/* 图片 */}
        <div class="relative z-[3]">
          <div class="flex ml-[5vw] items-center absolute left-[50%] translate-x-[-60%] top-[12vw]">
            <div class=" w-[12vw] text-center h-[5vw] leading-[5vw] bg-[rgb(255,255,255)] rounded-[15px] text-[#000] text-[2vw]">
              照片墙
            </div>
            <Icon
              icon="material-symbols:circle"
              class="ml-[2vw] text-[rgba(255,255,255,.5)] text-[3vw]"
            />
            <Icon
              icon="material-symbols:circle"
              class="ml-[2vw] text-[rgba(255,255,255,.5)] text-[2vw]"
            />
          </div>
          <img src={this.bgimg} alt="" class="h-[83vw] w-[100vw]" />
          <div class="w-[22vw] absolute bottom-[8vw] right-[4vw] text-[3vw] text-[#fff] text-center leading-[7vw] rounded-[15px] border-2 border-[rgb(190,171,176)] bg-[rgba(0,0,0,.2)]">
            TA的照片
          </div>
        </div>
        {/* 个人资料板块 */}
        <div class="bg-[rgb(245,247,250)]">
          {/* 个人资料 */}
          <div class="w-[92vw] ml-[4vw] mt-[-4vw] relative z-[11] bg-[#fff] rounded-[15px]">
            {/* 头像 */}
            <div class="mt-[0] ml-[50%] w-[18vw]  translate-x-[-50%] translate-y-[-50%]">
              <img
                src={this.img}
                alt=""
                class="w-[18vw] h-[18vw] rounded-[50%]"
              />
            </div>
            {/* 网名 */}
            <h1 class="text-[5vw] font-extrabold text-[rgb(42,50,70)] text-center mt-[-6vw]">
              {this.nickname}
            </h1>
            {/* 关注 粉丝 */}
            <div class="mt-[3vw] text-[3vw] text-[rgb(148,152,162)] flex justify-center">
              <p>
                {this.detailcookie?.newFollows}{' '}
                <span class="ml-[0.5vw]">关注</span>
              </p>
              <p class="ml-[4vw]">
                {this.detailcookie.followeds}{' '}
                <span class="ml-[0.5vw]">粉丝</span>
              </p>
              <p class="ml-[4vw]">
                <span>Lv.</span>
                {this.level}
              </p>
            </div>
            {/* 标签 */}
            <div class="flex justify-center mt-[3vw]">
              <div class="text-[rgb(64,71,89)] border-[1px] border-[rgb(205,205,205)] rounded-[5px] text-center text-[3vw] w-[13vw]">
                IP:法国
              </div>
              <div class="ml-[1vw] flex justify-center rounded-[5px] text-[rgb(64,71,89)] w-[26vw] border-[1px] border-[rgb(205,205,205)] text-[3vw] items-center">
                <Icon icon="icon-park-outline:male" color="#60b3f8" />
                00后&nbsp;处女座
              </div>
              <div class="text-[rgb(64,71,89)] border-[1px] border-[rgb(205,205,205)] rounded-[5px] text-center text-[3vw] w-[15vw] ml-[1vw]">
                村龄 {Math.floor(this.createDays / 365)} 年
              </div>
            </div>
            {/* 编辑资料 */}
            <div class="flex justify-center mt-[3vw] pb-[4vw]">
              <div
                onClick={() => {
                  this.$router.push('/InformationView');
                }}
                class="w-[20vw] leading-[7.7vw] rounded-[15px] text-[rgb(64,71,89)] text-[3vw] text-center border-[1px] border-[#ccc]"
              >
                编辑资料
              </div>
              <div class="w-[7.7vw] h-[7.7vw] text-[#41495E] text-[2.9vw] font-[800] flex items-center justify-center border-[1px] border-[#CCCCCD] rounded-[200px] ml-[1.5vw]">
                <Icon
                  nativeOnClick={() => (this.show = !this.show)}
                  icon="formkit:down"
                  class="text-[2vw] mt-[0.6vw]"
                />
              </div>
            </div>
            {/* 点击显示 */}
            {!this.show ? (
              ''
            ) : (
              <div class="px-[4vw] mt-[3vw]">
                <div class=" rounded-[10px] w-[24vw] h-[36vw] bg-[rgb(247,247,248)]">
                  <img
                    src={this.img}
                    alt=""
                    class="translate-y-[2.5vw] w-[12vw] h-[12vw] rounded-[50%] ml-[50%] translate-x-[-50%]"
                  />
                  <h1 class="text-[3vw] mt-[4vw] text-center text-[rgb(63,70,88)]">
                    晨留心
                  </h1>
                  <p class="mx-[4vw] mt-[1.5vw] text-[3vw] line-clamp-1 text-[rgb(165,168,176)]">
                    共同关注了
                  </p>
                  <div class="border-[1px] mt-[2vw] ml-[50%] translate-x-[-50%] border-[red] w-[15vw] leading-[5vw] rounded-[15px] text-center text-[3vw] text-[red]">
                    +&nbsp;关注
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* 主页 动态 博客 */}
          <div class="flex justify-evenly h-[15vw] items-center font-semibold relative ">
            {this.zy.map((item, index) => (
              <div
                class={[
                  'text-[3.3vw]',
                  index + 1 == this.num ? 'text-[#000]' : 'text-[#9095a1]',
                ]}
                onClick={this.fn}
              >
                {item}
              </div>
            ))}
            {/* <div class="text-[#2a3146] text-[3.3vw]">主页</div>
            <div class="text-[#9095a1] text-[3.3vw]">动态</div>
            <div class="text-[#9095a1] text-[3.3vw]">播客</div>
             */}
            <div
              class={[
                'absolute',
                'bg-[#eb474e]',
                'w-[3.3vw]',
                'h-[1vw]',
                'rounded-[20vw]',
                'bottom-[2vw]',
                this.num == 1
                  ? 'left-[21.4vw]'
                  : this.num == 2
                  ? 'left-[48.4vw]'
                  : 'left-[74.8vw]',
              ]}
            ></div>
          </div>

          {this.num == 1 ? (
            <div>
              <div class=" w-[92vw] bg-[#fefefe] rounded-[15px] ml-[4vw] px-[4vw] pb-[4vw] pt-[5vw] mb-[4vw]">
                <p class="text-[#2a3146] font-semibold text-[4vw] mb-[4.4vw]">
                  音乐品味
                </p>
                <div class="flex ">
                  <div class="border-[2px] flex flex-wrap border-[#f8e5e5] rounded-[3vw] h-[32vw] flex-1 p-[2vw] content-between">
                    <div class="w-[100%] text-[2.6vw] text-[#7e7f8b]">
                      我的喜欢
                      <p class="mt-[2.6vw] text-[#545969] text-[3.5vw] font-semibold">
                        {this.trackCount}首
                      </p>
                    </div>
                    <div class="w-[100%] text-[2.6vw] text-[#7e7f8b] flex items-center">
                      <Icon
                        icon="ph:heart-fill"
                        color="#a9aab2"
                        class=" mr-[0.8vw] text-[2.6vw]"
                      />
                      喜欢的音乐
                    </div>
                  </div>
                  <div class="border-[2px] flex flex-wrap border-[#f9eed5] rounded-[3vw] h-[32vw] flex-1 mx-[2vw] p-[2vw] content-between">
                    <div class="w-[100%] text-[2.6vw] text-[#7e7f8b]">
                      累计听歌
                      <p class="mt-[2.6vw] text-[#545969] text-[3.5vw] font-semibold">
                        {this.listenSongs}首
                      </p>
                    </div>
                    <div class="w-[100%] text-[2.6vw] text-[#7e7f8b] flex items-center ">
                      <Icon
                        icon="ri:rhythm-line"
                        color="#a9aab2"
                        class=" mr-[0.8vw] text-[2.6vw]"
                      />
                      听歌排行
                    </div>
                  </div>
                  <div class="border-[2px] flex flex-wrap border-[#e5ecf6] rounded-[3vw] h-[32vw] flex-1 p-[2vw] content-between">
                    <div class="w-[100%] text-[2.6vw] text-[#7e7f8b]">
                      本周关键词
                      <p class="mt-[2.6vw] text-[#545969] text-[3.5vw] font-semibold">
                        属于你的音乐档案
                      </p>
                    </div>
                    <div class="w-[100%] text-[2.6vw] text-[#7e7f8b] flex items-center ">
                      <Icon
                        icon="fa-solid:hourglass"
                        color="#a9aab2"
                        class=" mr-[0.8vw] text-[2.6vw]"
                      />
                      黑胶时光机
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-[92vw] ml-[4vw] bg-[#fff] rounded-[15px] px-[4vw] pb-[4vw] pt-[5vw]">
                <p class="text-[#2a3146] font-semibold text-[4vw] mb-[4.4vw]">
                  创建的歌单
                  <span class="text-[#9599a3] text-[2.7vw] ml-[1.6vw]">
                    ({this.create.length})
                  </span>
                </p>
                <ul class="">
                  {this.create.map((item) => (
                    <li class="flex mb-[1.5vw]">
                      <div class="relative pt-[1vw] mr-[2.6vw] ">
                        <img
                          src={item.coverImgUrl}
                          class="w-[12vw] h-[12vw] rounded-[10px] bg-black z-[2] relative"
                        />
                        <div class="w-[9vw] h-[4vw] bg-[#f3f3f3] bg-opacity-50 absolute top-[0vw] left-1/2 -translate-x-1/2 rounded-[8px] z-[1]"></div>
                      </div>
                      <div class="flex flex-wrap items-center flex-1">
                        <p class="w-[100%] text-[3.8vw] text-[#3f4659] line-clamp-1">
                          {item.name}
                        </p>
                        <p class="w-[100%] text-[2.8vw] text-[#aaadb5] line-clamp-1">
                          {item.trackCount}首，{item.creator.nickname}，播放
                          {this.dataTruncation(item.playCount)}次
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div class="mt-[4vw] w-[92vw] ml-[4vw] bg-[#fff] rounded-[15px] px-[4vw] pb-[4vw] pt-[5vw]">
                <p class="text-[#2a3146] font-semibold text-[4vw] mb-[4.4vw]">
                  收藏的歌单
                  <span class="text-[#9599a3] text-[2.7vw] ml-[1.6vw]">
                    ({this.songList.length})
                  </span>
                </p>
                <ul class="">
                  {this.songList.map((item) => (
                    <li class="flex mb-[1.5vw]">
                      <div class="relative pt-[1vw] mr-[2.6vw] ">
                        <img
                          src={item.coverImgUrl}
                          class="w-[12vw] h-[12vw] rounded-[10px] bg-black z-[2] relative"
                        />
                        <div class="w-[9vw] h-[4vw] bg-[#f3f3f3] bg-opacity-50 absolute top-[0vw] left-1/2 -translate-x-1/2 rounded-[8px] z-[1]"></div>
                      </div>
                      <div class="flex flex-wrap items-center flex-1">
                        <p class="w-[100%] text-[3.8vw] text-[#3f4659] line-clamp-1">
                          {item.name}
                        </p>
                        <p class="w-[100%] text-[2.8vw] text-[#aaadb5] line-clamp-1">
                          {item.trackCount}首，{item.creator.nickname}，播放
                          {this.dataTruncation(item.playCount)}次
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div class="mt-[4vw] w-[92vw] ml-[4vw] bg-[#fff] rounded-[15px] px-[4vw] pb-[4vw] pt-[5vw]">
                <div class="flex justify-between">
                  <p class="text-[#2a3146] font-semibold text-[4vw] mb-[4.4vw]">
                    我的评论
                    <span class="text-[#9599a3] text-[2.7vw] ml-[1.6vw]">
                      ({this.history.length})
                    </span>
                  </p>
                  <Icon icon="entypo:lock" color="#b3b3b3" />
                </div>

                <div class="flex justify-between">
                  <div class="flex items-center">
                    <img
                      src={this.picUrl}
                      alt=""
                      class="w-[8vw] rounded-[10px]"
                    />
                    <div class="text-[rgb(177,180,187)] text-[2.8vw] ml-[2vw]">
                      单曲&nbsp;[{this.music?.name}]&nbsp;-&nbsp;
                      {this.music.artist?.name}
                    </div>
                  </div>
                  <Icon icon="uiw:like-o" color="#b3b3b3" />
                </div>

                <div class="mt-[3.6vw] font-extrabold text-[3.6vw] text-[#2a3146]">
                  {this.history[0]?.content}
                </div>

                <p class="mt-[3vw] text-[rgb(169,173,181)] text-[2vw]">
                  {this.TimestampConversiontwo(this.history[0]?.time)}
                </p>
              </div>

              <div class="w-[92vw] ml-[4vw] mt-[4vw] h-[50vw] bg-[#fff]  rounded-[15px]">
                <nav class="h-[15vw] flex items-center justify-between mx-[3.8vw]">
                  <div class="text-[4vw] text-[#333]">基本信息</div>
                  <div class="text-[2.6vw] border-[1px] border-[#E7E7E7] rounded-[200px] px-[2.7vw] py-[1.5vw] text-[#333]">
                    领取村名证
                  </div>
                </nav>
                <div class="h-[25vw] text-[3vw] text-[#666] flex flex-wrap mx-[3.8vw]">
                  <div class="w-[100%]">
                    村龄：
                    <span>
                      {Math.floor(this.createDays / 365)}年 (
                      {this.TimestampConversion(this.createTime)}注册)
                    </span>
                  </div>
                  <div class="w-[100%]">
                    性别：
                    <span>{this.detailcookie?.gender == 1 ? '男' : '女'}</span>
                  </div>
                  <div class="w-[100%]">
                    年龄：
                    <span>
                      {this.birthday(this.detailcookie?.birthday)}后
                      {this.getZodiacSign(this.detailcookie?.birthday)}
                    </span>
                  </div>
                </div>
                <div class="border-t-[1px] border-[#EAEAEA] text-[3vw] text-[#999] flex items-center justify-center h-[9vw]">
                  查看全部
                  <Icon
                    icon="ps:right"
                    class="ml-[1vw] text-[2.5vw] font-[800]"
                  />
                </div>
              </div>
            </div>
          ) : this.num == 2 ? (
            <div>动态</div>
          ) : (
            <div>博客</div>
          )}
        </div>
      </div>
    );
  },
  data() {
    return {
      accountcookie: [],
      detailcookie: [],
      bgimg: '',
      img: '',
      nickname: '',
      level: '',
      createDays: '',
      show: false,
      songList: [],
      create: [],
      history: [],
      music: [],
      picUrl: '',
      createTime: '',
      listenSongs: '',
      trackCount: '',
      zy: ['主页', '动态', '播客'],
      num: 1,
    };
  },
  async created() {
    const account = await getUserAccount();
    this.accountcookie = account.data.profile;
    this.bgimg = this.accountcookie?.backgroundUrl;
    this.img = this.accountcookie?.avatarUrl;
    this.nickname = this.accountcookie?.nickname;
    // console.log('cookie', this.accountcookie);
    const detail = await getUserDetail(account?.data?.profile?.userId);
    this.detailcookie = detail.data.profile;
    this.level = detail.data.level;
    this.createTime = detail.data.createTime;
    this.listenSongs = detail.data.listenSongs;
    // console.log(this.createTime);
    this.createDays = detail.data.createDays;
    // console.log(this.detailcookie);

    // 收藏歌单

    const res4 = await fetchUserPlaylist(detail.data.profile.userId);
    this.songList = res4.data.playlist
      .filter((item) => item.subscribed)
      .slice(0, 10);
    this.create = res4.data.playlist
      .filter((item) => !item.subscribed)
      .slice(1, 2);
    this.trackCount = res4.data.playlist[0].trackCount;
    // console.log('收藏的歌单', this.songList);
    // console.log('创建的歌单', res4.data.playlist);
    //用户历史评论
    const res5 = await fetchUserHistory(detail.data.profile.userId);
    this.history = res5.data.data.comments;
    this.music = JSON.parse(this.history[0].resourceInfo);
    // 时间戳
    // console.log(this.history[0].time);
    // console.log('历史评论', this.history);
    // 歌曲信息
    const res6 = await fetchSongDetail(this.music.id);
    this.picUrl = res6.data.songs[0].al.picUrl;
    // console.log(res6.data.songs[0].al.picUrl);
  },
  methods: {
    fn(event) {
      if (event.target.innerText == '主页') {
        this.num = 1;
      } else if (event.target.innerText == '动态') {
        this.num = 2;
      } else if (event.target.innerText == '播客') {
        this.num = 3;
      }
      // console.log(event.target.innerText);
    },
    dataTruncation(num) {
      let count = '';
      if (num > 100000000) {
        count = Math.ceil(num / 100000000) + '亿';
      } else if (num > 10000) {
        count = Math.ceil(num / 10000) + '万';
      } else {
        count = num;
      }
      return count;
    },
    //时间
    TimestampConversion(timeStamp) {
      const date = new Date(timeStamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 注意月份从 0 开始，需要加 1
      return `${year}年${month}月`;
    },
    //开始时间
    TimestampConversiontwo(timeStamp) {
      const date = new Date(timeStamp);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const data2 = new Date();
      const minutes2 = data2.getMinutes();
      dayjs.extend(relativeTime);
      dayjs.locale('zh-cn');
      if (minutes2 - minutes >= 0 && minutes2 - minutes <= 24) {
        return `昨天  ${hours}:${minutes}`;
      } else if (minutes2 - minutes < 0) {
        return `${dayjs(timeStamp).fromNow()}`;
      }
      return `${month}月${day}日`;
    },
    //出生
    birthday(timeStamp) {
      const date = new Date(timeStamp);
      const year = date.getFullYear();
      return ('' + (year - (year % 5))).split('').splice(2, 4).join('');
    },
    //星座函数
    getZodiacSign(timeStamp) {
      const date = new Date(timeStamp);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const zodiacSigns = [
        '摩羯座',
        '水瓶座',
        '双鱼座',
        '白羊座',
        '金牛座',
        '双子座',
        '巨蟹座',
        '狮子座',
        '处女座',
        '天秤座',
        '天蝎座',
        '射手座',
      ];
      const startDates = [1, 20, 19, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      const endDates = [2, 18, 20, 19, 20, 21, 22, 22, 22, 22, 21, 21];
      let signIndex;
      (day >= startDates[month - 1] && month !== 12) ||
      (day <= endDates[month - 1] && month === 12)
        ? (signIndex = month - 1)
        : (signIndex = (month + 9) % 12);
      return zodiacSigns[signIndex];
    },
  },
};
