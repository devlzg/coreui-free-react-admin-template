import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userCpf, setUserCpf] = useState(null)
  const navigate = useNavigate()

  const login = async (cpf, senha) => {
    const token = import.meta.env.VITE_API_TOKEN

    try {
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, cpf, senha }),
      })

      const data = await response.json()
      console.log(data)

      if (data.codigo === 1) {
        console.log(data.dados.msgAcesso)
        setUserCpf(cpf)
        localStorage.setItem('cpf', cpf)
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
    setUserCpf(null)
    localStorage.removeItem('cpf')
  }

  const register = (cpf, senha) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || []

    if (cpf in users) {
      alert('Usuário já registrado!')
      return
    } else {
      users.push({ cpf, senha })
    }

    localStorage.setItem('registeredUsers', JSON.stringify(users))

    console.log('Usuário registrado com sucesso!')

    console.log(users)
  }

  return (
    <AuthContext.Provider value={{ userCpf, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
