import { CContainer, CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    route.path === '/dashboard' ? (
                      <PrivateRoute>
                        <route.element />
                      </PrivateRoute>
                    ) : (
                      <route.element />
                    )
                  }
                />
              )
            )
          })}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Navigate to="dashboard" replace />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
