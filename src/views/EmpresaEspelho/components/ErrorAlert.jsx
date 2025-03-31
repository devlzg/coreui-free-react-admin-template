import { CAlert, CButton } from '@coreui/react'
import React from 'react'

const ErrorAlert = ({ error, onRetry }) => {
  if (!error) return null

  return (
    <CAlert color="danger" className="mt-3">
      <div className="d-flex flex-column">
        <strong>{error.message}</strong>

        {error.details && (
          <div className="mt-2">
            <small>{error.details}</small>
          </div>
        )}

        {onRetry && (
          <div className="mt-2 align-self-end">
            <CButton color="primary" size="sm" onClick={onRetry}>
              Tentar novamente
            </CButton>
          </div>
        )}
      </div>
    </CAlert>
  )
}

export default ErrorAlert
