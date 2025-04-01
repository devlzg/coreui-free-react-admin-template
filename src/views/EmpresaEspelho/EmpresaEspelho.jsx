import { CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react'
import { EmpresaTable } from './components/EmpresaTable/EmpresaTable'
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage'
import { Filters } from './components/Filters/Filters'
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner'
import { PaginationControls } from './components/Pagination/PaginationControls'
import { PaginationNav } from './components/Pagination/PaginationNav'
import useEmpresas from './hooks/useEmpresas'

const EmpresaEspelho = () => {
  const {
    empresas,
    loading,
    error,
    filters,
    totalItems,
    totalPages,
    handleFilterChange,
    handlePageChange,
    fetchEmpresas,
    handleItemsPerPageChange,
  } = useEmpresas()

  if (loading && empresas.length === 0) {
    return <LoadingSpinner />
  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <h3>Espelho Empresas</h3>
        </CCardHeader>

        <CCardBody>
          {/* filtros */}
          <Filters loading={loading} filters={filters} handleFilterChange={handleFilterChange} />

          {/* controles da paginação */}
          <PaginationControls
            loading={loading}
            filters={filters}
            totalItems={totalItems}
            handleItemsPerPageChange={handleItemsPerPageChange}
          />

          {/* msg de erro */}
          <ErrorMessage error={error} fetchEmpresas={fetchEmpresas} />

          {/* tabela */}
          <EmpresaTable empresas={empresas} loading={loading} />

          {/* paginacao */}
          <PaginationNav
            loading={loading}
            filters={filters}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default EmpresaEspelho
