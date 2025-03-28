import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as authLogin } from './services/authServiceLogin.js'
import {
  getStoredCpf,
  getStoredNac,
  removeStoredCpf,
  removeStoredNac,
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
    getUsrNacIdByCpf(userCpf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setStoredNac(userNac)
  }, [userNac])

  const getUsrNacIdByCpf = async (cpf) => {
    axios
      .get(`http://localhost:5000/api/tb_usuario/${cpf}`)
      .then((response) => {
        setUserNac(response.data.Usr_Nac_Id)
      })
      .catch((error) => {
        console.error('Erro ao requisitar usuário:', error)
      })
  }

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
      getUsrNacIdByCpf(cpf)
    } catch (error) {
      console.error('Erro na requisição:', error.message)
    }
  }

  const logout = () => {
    removeStoredCpf()
    removeStoredNac()
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
        getUsrNacIdByCpf,
        userNac,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
