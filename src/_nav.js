import { cilSpeedometer, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
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
    component: CNavItem,
    requiredaccesslevel: 3,
    name: 'Alterar Permissões',
    to: '/alterar-permissoes',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default _nav
