import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AlterarPermissoes = React.lazy(() => import('./views/alterarPermissoes/AlterarPermissoes.js'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/alterar-permissoes', name: 'Alterar Permissões', element: AlterarPermissoes },
]

export default routes
