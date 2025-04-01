import { CCard, CCardBody, CContainer, CSpinner } from '@coreui/react'

export const LoadingSpinner = () => {
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

export default LoadingSpinner
