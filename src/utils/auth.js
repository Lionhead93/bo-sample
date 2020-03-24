import Cookies from 'js-cookie'

const TokenKey = 'Authorization'

export function getToken() {
  const getToken = Cookies.get(TokenKey)
  return getToken
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  localStorage.removeItem('auth-token')
  return Cookies.remove(TokenKey)
}
