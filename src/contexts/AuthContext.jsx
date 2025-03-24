import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as authLogin } from './services/authServiceLogin.js'
import {
  getStoredCpf,
  getStoredNac,
  removeStoredCpf,
  setIsAuthenticated,
  setStoredCpf,
  setStoredNac,
} from './utils/storage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userCpf, setUserCpf] = useState(getStoredCpf() || '')
  const [userNac, setUserNac] = useState(getStoredNac() || null)
  const navigate = useNavigate()

  useEffect(() => {
    setStoredCpf(userCpf)
  }, [userCpf])
  useEffect(() => {
    setStoredNac(userNac)
  }, [userNac])

  const getUsrNacIDByCpf = async (cpf) => {
    axios
      .get(`http://localhost:5000/api/tb_usuario/${cpf}`)
      .then((response) => {
        setUserNac(response.data.Usr_Nac_ID) // Salva no estado o nivel de acesso do usuario
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
      .post('http://localhost:5000/api/tb_usuario', { users: [dadosUsuario] })
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
      value={{
        userCpf,
        setUserCpf,
        login,
        logout,
        register,
        isAuthenticated,
        getUsrNacIDByCpf,
        userNac,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
