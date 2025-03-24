import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as authLogin } from './services/authServiceLogin.js'
import { getStoredCpf, removeStoredCpf, setIsAuthenticated, setStoredCpf } from './utils/storage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userCpf, setUserCpf] = useState(getStoredCpf() || '')
  const navigate = useNavigate()

  useEffect(() => {
    setStoredCpf(userCpf)
  }, [userCpf])

  const getUsrNacIDByCpf = async (cpf) => {
    axios
      .get(`http://localhost:5000/api/tb_usuario/${cpf}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Erro ao requisitar usuário:', error)
      })
  }

  // Função que loga com a api do s4e
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

      getUsrNacIDByCpf(cpf)
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
      .post('http://localhost:5000/api/tb_usuario', { users: [dadosUsuario] }) // Envia no formato esperado
      .then((response) => {
        console.log('Usuário adicionado com sucesso:', response.data)
        navigate('/login')
      })
      .catch((error) => {
        console.error('Erro ao adicionar o usuário:', error)
      })
  }

  const isAuthenticated = () => {
    const storedCpf = getStoredCpf()
    const isAuth = storedCpf === userCpf && userCpf !== ''
    setIsAuthenticated(isAuth)
    return isAuth
  }

  return (
    <AuthContext.Provider
      value={{ userCpf, setUserCpf, login, logout, register, isAuthenticated, getUsrNacIDByCpf }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
