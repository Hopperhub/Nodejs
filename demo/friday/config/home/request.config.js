export default [
  {
    api: '/submit', // 交互请求的 api
    rParams: ['uId-id'], // 上报的参数：数据字段-上报字段
    formatData(reqData = {}, resData = {}) {
      const data = { ...reqData, resData};
    }, // 处理请求的数据
  },
]