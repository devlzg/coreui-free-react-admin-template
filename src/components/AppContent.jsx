import { CContainer, CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedByRole from './ProtectedByRole'
import ProtectedRoute from './ProtectedRoute'

// rotas de componentes gerados dentro da parte principal da página
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
                      <ProtectedByRole requiredAccessLevel={parseInt(route.requiredAccessLevel)}>
                        <route.element />
                      </ProtectedByRole>
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
