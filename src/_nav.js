import { cilBuilding, cilSpeedometer, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem } from '@coreui/react'
import React from 'react'

const _nav = [
  {
    component: CNavItem,
    requiredaccesslevel: 1,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    requiredaccesslevel: 1,
    name: 'Empresa',
    to: '/empresa/espelho',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Espelho',
        to: '/empresa/espelho',
      },
    ],
  },
  {
    component: CNavItem,
    requiredaccesslevel: 3,
    name: 'Alterar Permissões',
    to: '/alterar-permissoes',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default _nav
