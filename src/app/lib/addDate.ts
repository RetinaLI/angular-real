// 日期，在原有日期基础上，增加days天数，默认增加1天
let addDate = (dates, days) => {
  if (days === undefined || days === '') {
    days = 1;
  }
  let date = new Date(dates);
  date.setDate(date.getDate() + days);
  let month = (date.getMonth() + 1) + '';
  let day = date.getDate() + '';
  let mm = '\'' + month + '\'';
  let dd = '\'' + day + '\'';

  // 单位数前面加0
  if (mm.length === 3) {
    month = '0' + month;
  }
  if (dd.length === 3) {
    day = '0' + day;
  }

  let time = date.getFullYear() + '年' + month + '月' + day + '日';
  return time;
};

export {addDate};
