import { CAlert, CSpinner } from '@coreui/react'

export const UserErrorMessage = ({ requestError, loading }) => {
  {
    loading && (
      <div className="text-center my-5">
        <CSpinner />
        <p>Carregando usuários...</p>
      </div>
    )
  }

  {
    requestError && (
      <CAlert color={requestError.color || 'danger'} className="mt-3">
        <strong>{requestError.message}</strong>
        {requestError.details && <div className="mt-2">{requestError.details}</div>}
      </CAlert>
    )
  }
}
