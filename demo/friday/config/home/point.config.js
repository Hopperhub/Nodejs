// title: '',
// pageUrl: '',
// customTitle: ''

// 数据来源：接口
  // 多接口 + 多字段层级

// 考虑以页面为单位

{
  url: 'xxx',
  {
    'xxx_reportId': {
      source: {
        api: {},
        custom: () => {} // TODO 自定义如何设计
      },
    }
  }
}

{
  'a/b': {}, // key 为接口；value: key 为上报的字段，值为字段层级的属性
}

export default [
  {
    reportId: 'card_jump', // 与 dom 的 id 映射
    dataApi: '/apis/banner', // 数据来源接口(string/正则字面量，如：/a/)
    data: {
      xxx: data.yyy, // 接口字段
      zzz: function() {}, // 通过函数的方式对数据进行存储
    },
    dataProp: '.data.head.bannber', // 数据结构的层级：x.x.x
    rParam: ['src-src', 'title-name'], // 上报参数：接口字段-上报字段
    children: [
      {
        reportId: 'card_btn_click',
        dataProp: '.data.head.bannber',
        rParam: ['status-type'],
      }
    ]
  },
  {
    reportId: 'couse_list${index}',
    dataApi: '/apis/list',
    dataProp: '.data.body.list',
    rParam: ['uid-id', 'title-name'],
    children: [
      {
        reportId: 'couse_list${index}_btn',
      }
    ]
  },
  {
    reportId: 'couse_list${index}',
    dataApi: '/apis/list',
    dataProp: '.data.body.list',
    rParam: ['uid-id', 'title-name'],
    children: [
      {
        reportId: 'couse_list${index}_btn',
      }
    ],
    paginationType: 'scroll', // scroll / btn
  },
  // 滚动分页需读取接口的 pagination ; 按钮点击的分页无需读取
  // pageOption {
  //   size: 10,
  //   current: 2,
  // },
  // 10 * 2 - 1
]

dataProp.split('.data.body.list') = ['data', 'body', 'list'];
data[1][2][3]

// parse data
const config = {
  url: '/',
  point: [
    {
      reportId: 'couse_list${index}',
      dataApi: '/v2/course/daily/recommend/courses',
      dataProp: 'data.courseList',
      rParam: ['uid-id', 'title-name'],
    }
  ],
}

const configs = [config];

const parseJsonViaKey = (prop, data) => {
  const key = prop.split('.');
  return key.reduce((cur, k) => (cur[k]), data);
}

const getDataViaRParam = (rParam, obj) => {
  const newObj = {};
  rParam.forEach((item) => {
    const [k1, k2] = item.split('-');
    newObj[k2] = obj[k1];
  });
}

const listParse = (c, d) => {
  const obj = {};
  d.forEach((item, i) => {
    // TODO children
    const k = c.reportId.replace(/\$\{index\}/, i);
    obj[k] = getDataViaRParam(c.rParam, item);
  });
}

// 是否是正则
const isReg = (str) => eval(str) instanceof RegExp;

// 字符串和正则的过滤
const strAndRegFilter = (val, condition) => {
  if (isReg(condition)) {
    return condition.test(val);
  } else {
    val.indexOf(condition) !== -1;
  }
}

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

  const reportObj = {};
  apiConfigs.forEach((item) => {
    const dataFromApi = parseJsonViaKey(item.dataProp, data);

    if (Array.isArray(dataFromApi)) {
      reportObj = { ...reportObj, ...listParse(item, dataFromApi) }
    } else {
      // TODO 非 obj
    }
  });
}