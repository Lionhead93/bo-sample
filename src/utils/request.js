import axios from 'axios'
import Swal from 'sweetalert2'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }

    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      Swal.fire({
        icon: 'error',
        text: response.message || 'Error'
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (response.status === 50008 || response.status === 50012 || response.status === 50014) {
        // to re-login
        Swal.fire({
          icon: 'warning',
          text: '다시 로그인 해주세요.',
          showCancelButton: true,
          confirmButtonText: '예',
          cancelButtonText: '아니오'
        }).then(result => {
          if (result.value) {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          }
        })
      }
      return Promise.reject(new Error(response.message || 'Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Swal.fire({
      icon: 'error',
      text: 'Server Error'
    })
    return Promise.reject(error)
  }
)

export default service
