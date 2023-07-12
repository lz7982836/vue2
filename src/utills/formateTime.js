import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export default (V) => {
  V.prototype.$t = function (timeStamp) {
    return dayjs(timeStamp).fromNow().replace(' ', '');
  };
};
