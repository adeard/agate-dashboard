export const TOKEN_KEY = 'grading-hq-token'

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (value) => {
  return localStorage.setItem(TOKEN_KEY, value)
}

export const removeToken = () => {
  return localStorage.removeItem(TOKEN_KEY)
}
