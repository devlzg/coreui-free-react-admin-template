export const ErrorMessage = ({ error, fetchEmpresas }) => {
  {
    error && (
      <CAlert color="danger" className="mt-3">
        <strong>{error.message}</strong>
        {error.details && <div className="mt-2">{error.details}</div>}
        <div className="mt-2">
          <CButton color="primary" size="sm" onClick={fetchEmpresas}>
            Tentar novamente
          </CButton>
        </div>
      </CAlert>
    )
  }
}

export default ErrorMessage
