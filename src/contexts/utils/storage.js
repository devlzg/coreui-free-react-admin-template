export const getStoredCpf = () => localStorage.getItem('userCpf')
export const setStoredCpf = (cpf) => localStorage.setItem('userCpf', cpf)
export const getStoredNac = () => localStorage.getItem('userNac')
export const setStoredNac = (userNac) => localStorage.setItem('userNac', userNac)
export const removeStoredCpf = () => localStorage.removeItem('userCpf')
export const setIsAuthenticated = (isAuth) =>
  localStorage.setItem('isAuthenticated', isAuth.toString())
