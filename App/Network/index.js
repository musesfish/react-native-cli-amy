import config from '@Config'
import axios from 'axios'
import storage from '@Utils/storage'
import { Alert } from 'react-native'

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
}

const instance = axios.create({
  baseURL: config.devBaseUrl,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// 请求拦截处理
instance.interceptors.request.use(
  async config => {
    // 在发送请求之前做些什么
    const token = await storage.get('userToken')
    const userId = await storage.get('userId')
    if (token !== null && token !== 'undefined') {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.url = `${config.url}${
        config.url.indexOf('?') > 0 ? '&' : '?'
      }token=${token}&userId=${userId}`
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 返回拦截处理
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    if (response.status >= 200 && response.status < 300) {
      if (response.data.ret === 404) {
        Alert.alert(
          '提示',
          response.data.msg,
          [
            {
              text: '取消',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: '确定', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        )
      }
    } else if (response.data.ret === 401) {
      Alert.alert(
        '提示',
        response.data.msg,
        [
          {
            text: '取消',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: '确定', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      )
    } else {
      Alert.alert(
        '提示',
        response.data.msg,
        [
          {
            text: '取消',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: '确定', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      )
    }
    return response
  },
  err => {
    // 对响应错误做点什么
    Alert.alert(
      '提示',
      err,
      [
        {
          text: '取消',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: '确定', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    )
    return Promise.reject(err)
  },
)

export default instance
