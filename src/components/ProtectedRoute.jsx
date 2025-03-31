import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated() === true) {
    return element
  } else {
    return <Navigate to="/login" />
  }
}

export default ProtectedRoute
