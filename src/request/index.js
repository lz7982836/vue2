// 所有的请求都定义在这个位置
import axios from 'axios';
import store from 'storejs';
const http = axios.create({
  baseURL: 'https://netease-cloud-music-api-five-roan-88.vercel.app',
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  const cookie = store.get('__m__cookie') ?? '';
  config.params = config.params || {};
  config.params.cookie = cookie;
  // console.log(config);
  return config;
});

export const fetchplaylistHot = () => http.get('/playlist/hot');
// 获取当前时间戳
/**
 * @description 获取当前时间戳
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
function getPreviousDayTimestamp() {
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();
  const oneDayMillis = 24 * 60 * 60 * 1000;

  const startTimestamp = currentTimestamp - oneDayMillis;
  const endTimestamp = currentTimestamp - 1;

  return [startTimestamp, endTimestamp];
}

// 获取轮播
/**
 * @description 获取轮播
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchmenu = () => http.get('/homepage/block/page');

// 获取菜单
/**
 * @description 获取菜单
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchmenulist = () => http.get('/homepage/dragon/ball');

// 获取推荐歌单
/**
 * @description 获取推荐歌单
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchpersonalized = () => http.get('/homepage/block/page');

// 获取新歌速递
/**
 * @description 获取新歌速递
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchsong = () => http.get('/top/song');

// 获取排行榜
/**
 * @description 获取排行榜
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchblocks = () => http.get('/homepage/block/page');

// 获取热门话题
/**
 * @description 获取热门话题
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchhot = () =>
  http.get('/topic/detail/event/hot?actid=111551188');

// 获取音乐日历
/**
 * @description 获取音乐日历
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchcalendar = () =>
  http.get(
    `/calendar?startTime=${getPreviousDayTimestamp()[0]}&endTime=${
      getPreviousDayTimestamp()[1]
    }`
  );

// 获取默认搜索关键词
/**
 * @description 获取默认搜索关键字
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchSearchDefault = () => http.get('/search/default');

export const fetchSearchResult = (params) =>
  http.get('/cloudsearch', { params });

export const fetchSearchSuggest = () => http.get();

// 热搜
/**
 * @description 获取热搜数据
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchSearchDetail = () => http.get('/search/hot/detail');

// 排行榜
/**
 * @description 获取排行榜数据
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export async function fetchPlaylist() {
  const res = await http.get('/toplist/detail');
  const playlist = await Promise.all(
    res.data.list.map(({ id }) =>
      http.get('/playlist/detail', { params: { id } })
    )
  );
  return playlist.map((item) => item.data.playlist);
}

// 歌单详情
/**
 * @description 获取歌单详情
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchPlaylistDetail = (id) =>
  http.get('/playlist/detail', { params: { id } });

// 歌单详情2
/**
 * @description 获取歌单详情2
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchPlaylistDetailAll = (id) =>
  http.get('/playlist/track/all', { params: { id } });

// 喜欢其他
/**
 * @description 喜欢其他
 * @parm {Array} xxx
 * @returns  {Promise} xxx
 */
export const fetchRelatedPlaylist = (id) =>
  http.get('/related/playlist', { params: { id } });

// 二维码key生成接口
export const fetchQRKey = () => http.get('/login/qr/key');

export const getQrInfo = (key, qrimg = 1) =>
  http.get('/login/qr/create', { params: { key, qrimg } });

export const checkQrStatus = (key) =>
  http.get('/login/qr/check', { params: { key, timestamp: Date.now() } });

export const getUserAccount = () => http.get('/user/account');

export const getUserDetail = (uid) =>
  http.get('/user/detail', { params: { uid } });
