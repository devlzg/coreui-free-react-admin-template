import { CCard, CCardBody, CContainer, CSpinner } from '@coreui/react'
import useEmpresas from '../../hooks/useEmpresas'

export const LoadingSpinner = () => {
  const { empresas, loading } = useEmpresas()

  if (loading && empresas.length === 0) {
    return (
      <CContainer>
        <CCard>
          <CCardBody className="text-center">
            <CSpinner />
            <div>Carregando empresas...</div>
          </CCardBody>
        </CCard>
      </CContainer>
    )
  }
  return null
}

export default LoadingSpinner
