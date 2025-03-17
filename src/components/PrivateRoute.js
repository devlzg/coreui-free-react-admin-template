import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated() ? element : <Navigate to="/login" />
}

export default PrivateRoute
