import ApiConfig from './api.config';
import PointConfig from './point.config';
import { ConfigFormat } from '../../util';
console.log(1);
export default ConfigFormat(ApiConfig, PointConfig);

// Q: 如何将配置转化成上报数据？
// 反向思考：将数据转化为配置定义

// Q: 定义数据配置时， api 为主？还是 reportId 为主？

// ======

// 标准的模型
const mode = {
  reportId: '',
  apiData: {
    'src': 'data.url'
  }
}


const apiDataType = ['array'];
const config1 = {
  type: 'api',
  source: {
    'xxx-api': {
      fields: [
        {
          dataType: 'array',
          reportId: 'xxx',
          data: {

          }
        }
      ]
    }
  },
  interface: [
    {
      url: '', // 接口 url
      fields: [
        {}
      ],
    },
  ],
}

// 解耦：接口和数据

// 数据源模型
const apiDataSoucr = {
  url: '',
  beforeRequest: () => {},
  afterResponse: () => {}
}

// ======

// 上报的数据结构：key-value

// 埋点来源数据的类型
// 1. 对象
// 2. 列表(数组)
// 3. 状态

// ======

// 数据结构

// 1. 列表中包含 children

// ======

// 数据来源的场景

// 1. api
// 2. cookie 等从缓存读取(考虑：)
// 3. 页面访问的标准数据
// 4. 前端静态数据状态
// 5. 交互后，上报数据进行更新

// ======

// 数据上报的场景

// 1. 点击/交互
// 2. 页面跳转的场景
// 3. 完成某种请求后上报
// 4. 数据更新后立即上报(对应：数据没更新后手动上报) -> 用于满足复杂数据的拓展场景
// 5. 条件上报(根据某种状态)

// 文档：针对每个字段的解析
const option = {
  pageUrl: '',
  pv: {
    title: '',
    customTitle: '',
  },
  interface: [ // 模式1：以 api 为主体，一个接口关联了所有的埋点配置
    {
      api: 'a',
      fields: [
        {
          rid: 'normal',
          data: 'data.detail',
          param: {
            desc: 'desc', // 读取：data.detail.desc
          }
        },
        {
          rid: 'parent',
          data: 'data.list',
          dataType: 'array', // array/object(默认：object)
          paginationType: '', // 分页类型：''/'scroll'/'btn' (默认：''; 非空时，dataType 固定为 array)
          param: {
            src: 'item', // 读取：data.list + .item ; 相对结构(如果是字符串) 
            title: {
              exact: true,
              prop: 'data.title', // 读取：data.title ; 绝对结构
            }
          },
          children: [
            {
              rid: 'children',
              data: '', // TODO 思考来源于父级
              param: {}
            }
          ]
        }
      ]
    }
  ],
  interface: [ // 模式2：以 reportId 为主体
    {
      rid: 'normal',
      name: '', // 上报事件名
      api: 'a', // 接口 api
      data: 'data.detail',
      param: {
        desc: 'desc', // 读取：data.detail.desc
      }
    },
    {
      rid: 'parent',
      name: '', // 上报事件名
      api: 'a',
      data: 'data.list',
      dataType: 'array', // array/object(默认：object)
      paginationType: '', // 分页类型：''/'scroll'/'btn' (默认：''; 非空时，dataType 固定为 array)
      param: {
        src: 'item', // 读取：data.list + .item ; 相对结构(如果是字符串) 
        title: {
          exact: true,
          prop: 'data.title', // 读取：data.title ; 绝对结构
        }
      },
      children: [
        {
          rid: 'children',
          data: '', // TODO 思考来源于父级
          param: {}
        }
      ]
    }
  ],
  update: (rid, data, reportNow = false) => {}, // TODO 手动更新数据
  updateAndReport: () => {}, // TODO 手动更新数据并上报
}

// useFriday 提供更新数据的方法
// update 手动更新数据
// updateAndReport 手动更新数据并上报