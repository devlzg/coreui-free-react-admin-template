import { CContainer } from '@coreui/react'
import React from 'react'
import EmpresaEspelho from '../components/EmpresaEspelho'
import useEmpresas from '../hooks/useEmpresas'

const EmpresaEspelhoPage = () => {
  const initialFilters = {
    search: '',
    cnpj: '',
    status: 'all',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10,
  }

  const empresasData = useEmpresas(initialFilters)

  return (
    <CContainer>
      <EmpresaEspelho {...empresasData} />
    </CContainer>
  )
}

export default EmpresaEspelhoPage
