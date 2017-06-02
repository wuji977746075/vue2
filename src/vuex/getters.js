/**
 * Created by yi on 2017-01-06.
 */

// 这个 getHeaderTitle 函数会返回 headerTitle 的值
// 在 ES6 里你可以写成：
// export const getHeaderTitle = state => state.headerTitle;

export function UID (state) {
  return 11
  // return isEmpty(state.uinfo) ? 0 : status.uinfo.uid
}

export function isLogin (state) {
  return !isEmpty(state.uinfo)
}

export function name (state) {
  return isEmpty(state.uinfo) ? '' : state.uinfo.name
}

function isEmpty(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}