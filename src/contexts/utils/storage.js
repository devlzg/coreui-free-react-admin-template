export const getStoredCpf = () => localStorage.getItem('userCpf')
export const setStoredCpf = (cpf) => localStorage.setItem('userCpf', cpf)
export const removeStoredCpf = () => localStorage.removeItem('userCpf')
export const setIsAuthenticated = (isAuth) =>
  localStorage.setItem('isAuthenticated', isAuth.toString())
