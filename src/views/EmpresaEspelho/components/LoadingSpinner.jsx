import { CCard, CCardBody, CContainer, CSpinner } from '@coreui/react'
import React from 'react'

const LoadingSpinner = ({ fullPage = false, message = 'Carregando...' }) => {
  const spinner = (
    <div className="text-center">
      <CSpinner />
      {message && <div className="mt-2">{message}</div>}
    </div>
  )

  if (fullPage) {
    return (
      <CContainer>
        <CCard>
          <CCardBody>{spinner}</CCardBody>
        </CCard>
      </CContainer>
    )
  }

  return spinner
}

// PropTypes opcionais
LoadingSpinner.propTypes = {
  fullPage: PropTypes.bool,
  message: PropTypes.string,
}

export default LoadingSpinner
