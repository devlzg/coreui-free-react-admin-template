import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedByRole = ({ children, requiredAccessLevel }) => {
  const { userNac } = useAuth()

  // codigo 1 = usuario
  // codigo 2 = admin
  // codigo 3 = superusuario

  if (requiredAccessLevel <= userNac || requiredAccessLevel == undefined) {
    return children
  } else {
    alert('Você não tem acesso a este conteúdo')
    return <Navigate to="/dashboard"></Navigate>
  }
}

export default ProtectedByRole
