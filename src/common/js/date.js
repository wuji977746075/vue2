/** 格式化时间
 *  @param {string} date 10/13位时间戳
 *  @param {string} fmt  想要格式化的格式YMdhms
 */
export function formatDate(date, fmt) {
    date = (date+'').length ==10 ? date*1000 : date;
    date = new Date(parseInt(date));
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
/** 格式化时间，返回年，月，日
 *  @param {string } date 需要格式化的时间
 */
export function objectDate(date) {
    if (date && typeof date === 'string') {
        date = new Date(date);
        let o = {
            'Y': date.getFullYear(),
            'M': date.getMonth() + 1,
            'D': date.getDate()
        };
        return o;
    }
    return date;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
} ;
