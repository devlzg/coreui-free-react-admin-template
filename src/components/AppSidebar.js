import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CCloseButton, CSidebar, CSidebarHeader } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import { useAuth } from '../contexts/AuthContext'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { userNac } = useAuth()

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        Página de Administração
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} userAccessLevel={userNac} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
