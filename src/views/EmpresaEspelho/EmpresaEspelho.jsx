import { CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react'
import { EmpresaTable } from './components/EmpresaTable/EmpresaTable'
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage'
import { Filters } from './components/Filters/Filters'
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner'
import { PaginationControls } from './components/Pagination/PaginationControls'
import { PaginationNav } from './components/Pagination/PaginationNav'

const EmpresaEspelho = () => {
  return (
    <CContainer>
      <LoadingSpinner />
      <CCard>
        <CCardHeader>
          <h3>Espelho Empresas</h3>
        </CCardHeader>

        <CCardBody>
          {/* filtros */}
          <Filters />

          {/* controles da paginação */}
          <PaginationControls />

          {/* msg de erro */}
          <ErrorMessage />

          {/* tabela */}
          <EmpresaTable />

          {/* paginacao */}
          <PaginationNav />
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default EmpresaEspelho
