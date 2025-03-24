import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { CBadge, CNavLink, CSidebarNav } from '@coreui/react'

export const AppSidebarNav = ({ items, userAccessLevel }) => {
  const userAccessLevelInt = parseInt(userAccessLevel)
  // Função para verificar acesso
  const hasAccess = (item) => {
    console.log(userAccessLevelInt)
    return !item.requiredaccesslevel || userAccessLevelInt >= item.requiredaccesslevel
  }

  // Filtra itens recursivamente
  const filterItems = (items) => {
    return items.filter((item) => {
      if (!hasAccess(item)) return false
      if (item.items) {
        item.items = filterItems(item.items)
        return item.items.length > 0
      }
      return true
    })
  }

  const navLink = (name, icon, badge, indent = false) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
            )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto" size="sm">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component as="div" key={index}>
        {rest.to || rest.href ? (
          <CNavLink
            {...(rest.to && { as: NavLink })}
            {...(rest.href && { target: '_blank', rel: 'noopener noreferrer' })}
            {...rest}
          >
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
    )
  }

  const navGroup = (item, index) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = component
    return (
      <Component compact as="div" key={index} toggler={navLink(name, icon)} {...rest}>
        {items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index, true),
        )}
      </Component>
    )
  }

  const filteredItems = filterItems(items || [])

  return (
    <CSidebarNav as={SimpleBar}>
      {filteredItems.map((item, index) =>
        item.items ? navGroup(item, index) : navItem(item, index),
      )}
    </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  userAccessLevel: PropTypes.number.isRequired,
}
