import axios from 'axios';

// request 拦截
axios.interceptors.request.use((config) => {
  // config.headers['X-Requested-With'] = 'XMLHttpRequest'
  return config
})

// response 拦截
axios.interceptors.response.use(function (response) {
  return response;
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }

  return Promise.reject(err)
});

// 表示跨域请求时是否需要使用凭证，允许携带cookie
axios.defaults.withCredentials = true;

function request (url, params) {
  return axios({
    method: 'GET',
    url,
    ...params,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      "Access-Control-Allow-Credentials": "true",
      ...params.headers,
    },
    data: {
      ...params.data,
    }
  })
}

export default request;
