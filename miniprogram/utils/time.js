export const formatTime=function(tiem) {//时间转换
  const timestamp = Date.now();
  return function (tiem) {
    const diff = timestamp - tiem * 1000;
    if (diff < 60 * 1000) {
      return '刚刚';
    } else if (diff < 60 * 60 * 1000) {
      return Math.floor(diff / (60 * 1000)) + '分钟前';
    } else if (diff < 24 * 60 * 60 * 1000) {
      return Math.floor(diff / (60 * 60 * 1000)) + '小时前';
    } else {
      const createTime = new Date(tiem * 1000);
      const Day = createTime.getDate();
      const Month = createTime.getMonth() + 1;
      const Hour = createTime.getHours();
      const Minute = createTime.getMinutes();
      function padding(str) {
        str = '' + str;
        if (str[1]) {
          return str;
        } else {
          return '0' + str;
        }
      }
      return `${padding(Month)}-${padding(Day)} ${padding(Hour)}:${padding(Minute)}`;
    }
  };
}