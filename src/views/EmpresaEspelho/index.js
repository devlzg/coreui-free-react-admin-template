import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import React from 'react'
import EmpresaTable from './EmpresaTable'
import ErrorAlert from './components/ErrorAlert'
import Filters from './components/Filters'
import Pagination from './components/Pagination'

const EmpresaEspelho = ({
  empresas,
  loading,
  error,
  filters,
  totalItems,
  totalPages,
  handleFilterChange,
  handlePageChange,
  fetchEmpresas,
}) => {
  return (
    <CCard>
      <CCardHeader>
        <h3>Espelho Empresas</h3>
      </CCardHeader>

      <CCardBody>
        <Filters filters={filters} loading={loading} handleFilterChange={handleFilterChange} />

        <ErrorAlert error={error} onRetry={fetchEmpresas} />

        <EmpresaTable empresas={empresas} loading={loading} />

        <Pagination
          filters={filters}
          totalItems={totalItems}
          totalPages={totalPages}
          loading={loading}
          handlePageChange={handlePageChange}
        />
      </CCardBody>
    </CCard>
  )
}

export default EmpresaEspelho
