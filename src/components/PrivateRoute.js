import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth()
  console.log('verificando se o usuario esta autenticado', isAuthenticated())
  if (isAuthenticated() === true) {
    console.log('deu true')
    return element
  } else {
    console.log('deu false')
    return <Navigate to="/login" />
  }
}

export default PrivateRoute
