// core

// reportDataObj = {};
// clickListen

class FridayDispatch {
  useFriday() {
    // 初始化 friday 的 js 库
    // appId + jsUrl
    this._cacheData = {};
    this._config = {};
    this.init();
  }

  init() {
    this.listent();
  }

  listent() {
    clickListen();
  }
}

// 拦截响应
const cacheData = () => {}
const interactiveRequestSubscribe = () => {}
export const responseAdator = () => { 
  cacheData();
  interactiveRequestSubscribe();
}


// pageView 订阅
export const pageViewSubscribe = () => {}


// commonJs
// umd
module.exports = {}


// ======
/* eslint-disable no-param-reassign */

import promise from 'es6-promise';
import * as axios from 'axios';
import Cookies from 'js-cookie';
import shortId from 'js-shortid';
import nativeProxy from '@nativeApp/nativeProxy';
import { isInEnPC } from '@util/index';

// =======
const config1 = {
  url: '/',
  point: [
    {
      reportId: 'course_list{index}',
      dataApi: '/v2/course/daily/recommend/courses',
      dataProp: 'data.courseList',
      rParam: ['courseUid-id', 'courseName-name'],
    },
  ],
};

const configs = [config1];

const parseJsonViaKey = (prop, data) => {
  const key = prop.split('.');
  return key.reduce((cur, k) => cur[k], data);
};

const getDataViaRParam = (rParam, obj) => {
  const newObj = {};
  rParam.forEach((item) => {
    const [k1, k2] = item.split('-');
    newObj[k2] = obj[k1];
  });
  return newObj;
};

const listParse = (c, d) => {
  const obj = {};
  d.forEach((item, i) => {
    // TODO children
    const k = c.reportId.replace(/\{index\}/, i);
    obj[k] = getDataViaRParam(c.rParam, item);
  });
  return obj;
};

// 是否是正则
const isReg = (str) => {
  try {
    // eslint-disable-next-line no-eval
    return eval(str) instanceof RegExp;
  } catch (e) {
    return false;
  }
};

// 字符串和正则的过滤
const strAndRegFilter = (val, condition) => {
  if (isReg(condition)) {
    return condition.test(val);
  }
  return val.indexOf(condition) !== -1;
};

const parse = (api, data) => {
  // 过滤页面的配置
  // TODO 使用路由的模板(https://www.npmjs.com/package/path-to-regexp)
  const pageConfig = configs.filter(({ url }) => {
    const { pathname } = location;
    return strAndRegFilter(pathname, url);
  })[0];

  if (!pageConfig) {
    return;
  }

  // 过滤当前请求的 api
  const { point } = pageConfig;
  const apiConfigs = point.filter(({ dataApi }) => {
    return strAndRegFilter(api, dataApi);
  });
  if (!apiConfigs.length) {
    return;
  }

  let reportObj = {};
  apiConfigs.forEach((item) => {
    const dataFromApi = parseJsonViaKey(item.dataProp, data);
    if (Array.isArray(dataFromApi)) {
      reportObj = { ...reportObj, ...listParse(item, dataFromApi) };
    } else {
      // TODO 非 obj
    }
  });
  console.log('reportData:', reportObj);
};
// =======

promise.polyfill();
axios.defaults.baseURL = '/apis';
axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.xsrfHeaderName = 'x-csrf-token';

axios.interceptors.request.use((config) => {
  // String.prototype.includes 的兼容性操作
  if (!String.prototype.includes) {
    // eslint-disable-next-line no-extend-native
    String.prototype.includes = function (search, start) {
      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      }
      return this.indexOf(search, start) !== -1;
    };
  }
  config.headers['x-auth-token'] = sessionStorage.getItem('token') || Cookies.get('token') || '';

  // 给后端统计接口来源
  if (nativeProxy && nativeProxy.isInApp()) {
    config.headers['x-source'] = 'enapp';
  }
  if (isInEnPC()) {
    config.headers['x-source'] = 'enpc';
  }

  config.url = config.url.includes('?')
    ? `${config.url}&time=${Date.now()}-${shortId.gen()}`
    : `${config.url}?time=${Date.now()}-${shortId.gen()}`;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    const code = response.status;
    if (code < 400) {
      parse(response.config.url, response.data);
      return response.data;
    }
    window.alert(response.data.message ? `${response.data.message}，请到公众号反馈` : '服务异常');
    return Promise.reject(response.data);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
