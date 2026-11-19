import moment from 'moment'

// 来自 My-Buddy/src/utils/index.ts：根据不同的时区转换
export function getdata(launchStartTimeStamp: any) {
  var offset = new Date() + '' //将时间格式转为字符串
  // console.log(offset);  //  Mon Nov 02 2020 20:57:20 GMT-0600 (北美中部标准时间)
  let GMTAfter = offset.indexOf('GMT') //拿到这个-0600也就是当前所在时区，然后转时间戳的
  let current_time = offset.substring(GMTAfter + 3, GMTAfter + 8) //-0600    给了你定义的一个字段，在拿到数据后使用
  let time = moment(launchStartTimeStamp)
    .utcOffset(current_time)
    .format('YYYY-MM-DD')
  /** MM/DD/YYYY，例如 04/08/2026 */
  let timeSlashMDY = moment(launchStartTimeStamp)
    .utcOffset(current_time)
    .format('MM/DD/YYYY')
  let timeXie = moment(launchStartTimeStamp)
    .utcOffset(current_time)
    .format('YYYY/MM/DD')
  let timeDetail = moment(launchStartTimeStamp)
    .utcOffset(current_time)
    .format('YYYY-MM-DD HH:mm:ss')
  let timeYMDHM = moment(launchStartTimeStamp)
    .utcOffset(current_time)
    .format('YYYY-MM-DD HH:mm')
  let day: any = moment(time).day().toString().padStart(2, '0');
  let HMS: string = moment(launchStartTimeStamp)
    .utcOffset(current_time)
    .format('HH:mm:ss');
  let HM = moment(launchStartTimeStamp)
    .utcOffset(current_time)
    .format('HH:mm');
  day = day + ' '
  let nys = time.split('-')
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let month = months.find((_item, index) => Number(nys[1]) == index + 1) ?? ''
  let years = nys[0]
  let daily = nys[2]
  let cnmonth = nys[1]
  let sfm = timeDetail.includes(' ') ? timeDetail.split(' ')[1]! : HMS
  let langEnStr = month + ' ' + daily + ' ' + years + ' ' + HMS;
  let langEnYMS = month + ' ' + daily + ' ' + years;
  return { day, time, timeSlashMDY, timeDetail, month, years, daily, sfm, cnmonth, langEnStr, langEnYMS, timeXie, HM, timeYMDHM }
}
