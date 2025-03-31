import { CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
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

  // renderiza mensagem de loading
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
          <Filters filters={filters} loading={loading} handleFilterChange={handleFilterChange} />

          {/* controles da paginação */}
          <PaginationControls
            filters={filters}
            handleItemsPerPageChange={handleItemsPerPageChange}
            loading={loading}
            totalItems={totalItems}
          />

          {/* msg de erro */}
          <ErrorMessage error={error} fetchEmpresas={fetchEmpresas} />

          {/* tabela */}
          <EmpresaTable empresas={empresas} loading={loading} />

          {/* paginacao */}
          <PaginationNav
            filters={filters}
            handlePageChange={handlePageChange}
            loading={loading}
            totalPages={totalPages}
          />
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default EmpresaEspelho
