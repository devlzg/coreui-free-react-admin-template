import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated() === true) {
    return element
  } else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute
