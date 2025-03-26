import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AlterarPermissoes = React.lazy(() => import('./views/alterarPermissoes/AlterarPermissoes.js'))
const EmpresaEspelho = React.lazy(() => import('./views/empresaEspelho/EmpresaEspelho.js'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/alterar-permissoes', name: 'Alterar Permissões', element: AlterarPermissoes },
  { path: '/empresa-espelho', name: 'Empresa Espelho', element: EmpresaEspelho },
]

export default routes
