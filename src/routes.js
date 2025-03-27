import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AlterarPermissoes = React.lazy(() => import('./views/alterarPermissoes/AlterarPermissoes.js'))
const EmpresaEspelho = React.lazy(() => import('./views/empresaEspelho/EmpresaEspelho.js'))

// é importante que todas as rotas tenham o requiredAccessLevel
const routes = [
  { path: '/', exact: true, name: 'Home', requiredAcessLevel: 1 },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard, requiredAccessLevel: 1 },
  {
    path: '/alterar-permissoes',
    name: 'Alterar Permissões',
    element: AlterarPermissoes,
    requiredAccessLevel: 3,
  },
  {
    path: '/empresa/espelho',
    name: 'Empresa Espelho',
    element: EmpresaEspelho,
    requiredAccessLevel: 1,
  },
]

export default routes
