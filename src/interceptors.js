import axios from 'axios'

const intercept = () => {
  return axios.interceptors.request.use(request => {
    let user = localStorage.getItem('user')
    user = user ? JSON.parse(user) : user
    if (user) {
      request.headers.authorization = `Bearer ${user.token}`
    }

    return request
  },
  error => {
    return Promise.reject(error)
  })
}
export default intercept
