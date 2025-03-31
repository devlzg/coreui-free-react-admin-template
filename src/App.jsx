import React, { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'

import { CSpinner, useColorModes } from '@coreui/react'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout.jsx'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login.jsx'))
const Register = React.lazy(() => import('./views/pages/register/Register.jsx'))
const Profile = React.lazy(() => import('./views/pages/profile/Profile.jsx'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404.jsx'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <AuthProvider>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/cadastro" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />

            <Route
              exact
              path="/profile"
              name="Profile Page"
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route path="*" name="Home" element={<ProtectedRoute element={<DefaultLayout />} />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </HashRouter>
  )
}

export default App
