import { CContainer, CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

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
                    route.path === '/login' ||
                    route.path === '/cadastro' ||
                    route.path === '/404' ? (
                      <route.element />
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
              <ProtectedRoute>
                <Navigate to="dashboard" replace />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
