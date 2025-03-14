import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <span className="me-1">Rodapé</span>
    </CFooter>
  )
}

export default React.memo(AppFooter)
