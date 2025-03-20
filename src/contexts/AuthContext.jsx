import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as authLogin } from './services/authServiceLogin.js'
import { register as authRegister } from './services/authServiceRegister.js'
import { getStoredCpf, removeStoredCpf, setIsAuthenticated, setStoredCpf } from './utils/storage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userCpf, setUserCpf] = useState(getStoredCpf() || '')
  const navigate = useNavigate()

  useEffect(() => {
    setStoredCpf(userCpf)
  }, [userCpf])

  const login = async (cpf, senha) => {
    try {
      const data = await authLogin(cpf, senha)

      if (data.codigo === 1) {
        setUserCpf(cpf)
        navigate('/dashboard')
      }

      if (data.codigo === 3) {
        alert(data.mensagem)
      }
    } catch (error) {
      console.error('Erro na requisição:', error.message)
    }
  }

  const logout = () => {
    removeStoredCpf()
    setUserCpf('')
  }

  const register = (dadosUsuario) => {
    axios
      .post('http://localhost:5000/api/usuarios', { users: [dadosUsuario] }) // Envia no formato esperado
      .then((response) => {
        console.log('User added successfully:', response.data)
        navigate('/login')
      })
      .catch((error) => {
        console.error('Error adding user:', error)
      })
  }

  const isAuthenticated = () => {
    const storedCpf = getStoredCpf()
    const isAuth = storedCpf === userCpf && userCpf !== ''
    setIsAuthenticated(isAuth)
    return isAuth
  }

  return (
    <AuthContext.Provider value={{ userCpf, setUserCpf, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
