import styled from 'styled-components-vue';
import { areaList } from '@vant/area-data';
import _ from 'lodash';

import {
  getUserAccount,
  getUserDetail,
  featNicknameCheck,
  fetchUserUpdata,
  fetchUserUpdata2,
  fetchUserUpdata3,
  fetchUserUpdata4,
} from '../../request';
const Wrapper = styled.div``;
export default {
  render() {
    return (
      <div class="bg-[#E9EBEE]">
        <div class="bg-[rgb(247,248,251)] ">
          {/* 我的资料 */}
          <div class="flex pt-[7vw] mb-[3.8vw] px-[5vw]">
            <Icon
              nativeOnClick={() => {
                this.$router.push('/PersonalHomepageView');
              }}
              icon="teenyicons:left-outline"
              class="text-[rgb(42,50,70)] w-[5vw] h-[6vw]"
            />
            <h1 class="text-[rgb(42,50,70)] font-extrabold text-[4.4vw] ml-[45%] translate-x-[-50%]">
              我的资料
            </h1>
          </div>
          {/* 我的资料结束 */}
          {/* 上传头像 */}
          <div class="leading-[9.1vw] w-[100vw] text-[rgb(60,68,88)] text-[3.5vw] text-center bg-[rgb(222,230,248)]">
            上传头像并完善个人信息，即可获得云贝~
          </div>
          {/* 上传头像结束 */}
          {/* 资料开始 */}
          <div class="">
            {/* 头像 */}
            <div class="flex px-[4.4vw] justify-between mt-[2vw]  border-b-2 bg-[#F0F2F4] items-center leading-[15vw]">
              <h1 class="text-[#3E4558] text-[3.6vw]">头像</h1>
              <div class="text-[rgb(192,193,195)] flex items-center">
                <img
                  src={this.picimg}
                  alt=""
                  class="w-[12vw] h-[12vw] rounded-[50%] mr-[2.6vw]"
                />
                <Icon
                  icon="teenyicons:right-outline"
                  class="text-[#969799] w-[4vw] h-[4vw]"
                />
              </div>
            </div>
            {/* 昵称 */}
            <van-popup
              v-model={this.showview}
              position="bottom"
              class="bg-[#F8F8F8]"
              style={{ height: '100%' }}
            >
              <div class="text-[rgb(0,0,1)] px-[3.2vw] pb-[3.2vw] pt-[4.6vw] bg-[#fff] flex justify-between">
                <p class="text-[3.8vw] font-semibold" onClick={this.remote}>
                  取消
                </p>
                <h1 class="text-[4vw] font-extrabold">修改昵称</h1>

                <p
                  class={[
                    'text-[3.8vw]',
                    'font-semibold',
                    this.duplicated ? 'text-[#ccc]' : 'text-[#000]',
                  ]}
                  onClick={this.NicknameID}
                >
                  完成
                </p>
              </div>
              <div class="mt-[2.7vw] h-[11.2vw] ">
                <input
                  class="px-[3.2vw] w-[100vw] h-[11.2vw]"
                  type="text"
                  placeholder="请输入昵称"
                  // onInput={this.Repeat}
                  // value={this.nicknameview}
                  v-model={this.nicknameview}
                />
                {this.errors == '' ? (
                  ''
                ) : (
                  <div class="text-[red] px-[3.2vw] bg-[#fff] ">
                    {this.errors}
                  </div>
                )}
                {this.duplicated ? (
                  <div class="text-[#000] px-[3.2vw] bg-[#fff] ">
                    {this.repeatNicname}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </van-popup>
            <van-cell
              title="昵称"
              is-link
              class="border-b-2 bg-[#F0F2F4] h-[15vw] items-center flex"
              value={this.nicknameview}
              onClick={() => {
                this.showview = !this.showview;
              }}
            />
            {/* 性别 */}
            <van-cell
              title="性别"
              is-link
              class="border-b-2 bg-[#F0F2F4] h-[15vw] items-center flex"
              onClick={this.genderPopup}
              value={
                this.accountCookie?.data?.profile.gender == 1
                  ? '男'
                  : this.accountCookie?.data?.profile.gender == 2
                  ? '女'
                  : ''
              }
            />
            {/* 性别2 */}
            <van-popup
              v-model={this.genderBoolean}
              position="bottom"
              style={{ height: '50%' }}
            >
              <van-picker
                show-toolbar
                columns={this.genderList}
                default-index={this.gender}
                onConfirm={this.genderConfirm}
                onCancel={this.gendercancel}
                confirm-button-text="完成"
                cancel-button-text="取消"
              />
            </van-popup>
            {/* 二维码 */}
            <div class="flex px-[4.4vw] justify-between  border-b-2 bg-[#F0F2F4] items-center leading-[15vw]">
              <h1 class="text-[#3E4558] text-[3.6vw]">二维码</h1>
              <div class="text-[rgb(192,193,195)] flex items-center">
                <Icon
                  icon="ph:qr-code"
                  class="text-[#969799] w-[6vw] h-[6vw]"
                />
                <Icon
                  icon="teenyicons:right-outline"
                  class="text-[#969799] w-[4vw] h-[4vw]"
                />
              </div>
            </div>
          </div>
          {/* 资料结束 */}
          {/* 资料开始2 */}
          <div class="mt-[2vw]">
            {/* 生日 */}
            <van-cell
              title="生日"
              is-link
              onClick={this.datePopup}
              class="border-b-2 bg-[#F0F2F4] h-[15vw] items-center flex"
              value={this.birthday}
            />
            {/* 生日2 */}
            {/* 日期 */}
            <van-popup
              v-model={this.dateValue}
              position="bottom"
              style={{ height: '50%' }}
            >
              <van-datetime-picker
                type="date"
                min-date={this.minDate}
                max-date={this.maxDate}
                onConfirm={this.dataConfirm}
                onCancel={this.datacancel}
                confirm-button-text="完成"
                cancel-button-text="取消"
              />
            </van-popup>
            {/* 地区 */}
            <van-cell
              title="地区"
              is-link
              onClick={() => {
                this.popupVisible = !this.popupVisible;
              }}
              class="border-b-2 bg-[#F0F2F4] h-[15vw] items-center flex"
              value={this.areaView}
            />
            {/* 地区选择 */}
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
            {/* 大学 */}
            <van-cell
              title="大学"
              is-link
              class="border-b-2 bg-[#F0F2F4] h-[15vw] items-center flex"
              value=""
            />
            {/* 音乐标签 */}
            <van-cell
              title="音乐标签"
              is-link
              class="border-b-2 bg-[#F0F2F4] h-[15vw] items-center flex"
              value="选择标签"
            />
          </div>
          {/* 简介 */}
          <div class="flex px-[4.4vw] justify-between  border-b-2 bg-[#F0F2F4] items-center leading-[15vw]">
            <h1 class="text-[#3E4558] text-[3.6vw]">简介</h1>
            <div class="text-[rgb(192,193,195)] flex items-center"></div>
          </div>
          <div class=" px-[4.4vw] relative  pt-[4.4vw]  border-b-2 bg-[#F0F2F4]  h-[33.5vw]">
            <h1 class="text-[#3E4558] text-[3.6vw]">
              {this.detailCookie?.data?.profile.signature}
            </h1>
            <div class="text-[rgb(192,193,195)] absolute bottom-[5vw] right-[5vw]">
              <p class="">298</p>
            </div>
          </div>
          {/* 资料结束2 */}
          {/* 资料底部 */}
          <div class="mt-[3vw]">
            <van-cell
              title="个人主页隐私设置"
              is-link
              class="border-b-2  bg-[#F0F2F4] h-[15vw] items-center flex"
              value=""
            />
            <van-cell
              title="主页模块顺序设置"
              is-link
              class="border-b-2  bg-[#F0F2F4] h-[15vw] items-center flex"
              value=""
            />
          </div>
          {/* 资料底部结束 */}
        </div>
      </div>
    );
  },
  data() {
    return {
      accountCookie: [],
      picimg: '',
      detailCookie: [],
      areaList: Object.freeze(areaList),
      popupVisible: false,
      areaView: '',
      showview: false,
      nicknameview: null,
      repeatNicname: null,
      duplicated: null,
      errors: '',
      birthday: '', // 出生日期 \ 默认时间
      briefIntroduction: '', //简介
      maxNumberOfWords: 300, // 最大字数
      dateValue: false, // 控制日期的弹出
      minDate: new Date(1970, 0, 1), // 最小时间
      maxDate: new Date(2050, 10, 1), // 最大时间
      gender: '', // 性别
      genderList: ['保密', '男', '女'], // 性别列表
      genderBoolean: false, // 控制性别选项的弹出
    };
  },
  methods: {
    remote() {
      this.showview = !this.showview;
      this.nicknameview = this.accountCookie?.data?.profile.nickname;
    },
    async confirm(e) {
      this.popupVisible = false;
      this.areaView = e[0].name + ' ' + e[1].name;
      await fetchUserUpdata4(e[0].code, e[1].code);
      console.log('地区', e);
    },
    formatDate(d) {
      var date = new Date(d);
      var YY = date.getFullYear() + '-';
      var MM =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-';
      var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return YY + MM + DD;
    },
    datePopup() {
      this.dateValue = !this.dateValue;
    },
    async dataConfirm(e) {
      this.datePopup();
      this.birthday = this.formatDate(e);
      const timeStamp = Date.parse(this.birthday);
      await fetchUserUpdata2(timeStamp);
      // console.log(timeStamp);
    },
    datacancel() {
      this.datePopup();
    },
    async NicknameID() {
      if (!this.duplicated) {
        await fetchUserUpdata(this.nicknameview);
        this.showview = !this.showview;
      }
    },

    timestampToTime(timestamp) {
      // 时间戳为10位需*1000，时间戳为13位不需乘1000
      const date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + '-';
      const M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-';
      const D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';

      return Y + M + D;
    },
    // 地区转换
    postalCodeSearch(key, zipCode) {
      if (this.areaList.hasOwnProperty(key) && this.areaList[key][zipCode]) {
        let src = this.areaList[key][zipCode];
        return src;
      }
    },

    // 性别操作
    // 弹出层的显示隐藏
    genderPopup() {
      this.genderBoolean = !this.genderBoolean;
    },
    async genderConfirm(e) {
      this.genderPopup();
      this.gender = this.genderList.indexOf(e); // 查找对应性别 获取对应的下标
      await fetchUserUpdata3(this.gender);
      // console.log(this.gender);
    },
    gendercancel() {
      this.genderPopup();
    },
  },
  watch: {
    nicknameview: _.debounce(async function (newValue) {
      const res = await featNicknameCheck(newValue);
      console.log(res);
      if (res.data.code === 400) {
        this.errors = res.data.message;
        this.duplicated = !this.duplicated;
      }
      if (res.data.duplicated) {
        this.errors = '';
        this.repeatNicname = res.data.candidateNicknames[0];
        this.duplicated = res.data.duplicated;
      } else {
        this.errors = '';
        this.duplicated = res.data.duplicated;
      }
    }, 300),
  },

  async created() {
    const account = await getUserAccount();
    this.accountCookie = account;
    console.log(account);
    this.nicknameview = this.accountCookie?.data?.profile.nickname;
    // console.log(this.nickname);
    this.picimg = this.accountCookie?.data.profile.avatarUrl;
    // console.log(this.data);
    const detail = await getUserDetail(account?.data?.profile?.userId);
    this.detailCookie = detail;
    this.birthday = this.timestampToTime(
      this.detailCookie.data.profile?.birthday
    );
    const province = this.detailCookie.data.profile.province;
    const city = this.detailCookie.data.profile.city;
    this.areaView =
      this.postalCodeSearch('province_list', province) +
      ' ' +
      this.postalCodeSearch('city_list', city);
  },
};
