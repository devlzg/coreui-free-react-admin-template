import { CCol } from '@coreui/react'
import React from 'react'

const PaginationInfo = ({ currentPage, itemsPerPage, totalItems, loading }) => {
  if (loading) return null

  return (
    <CCol xs={12} sm={6} md={8} lg={9} xl={10} className="text-sm-end mt-2 mt-sm-0">
      <span className="me-2">
        Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} empresas
      </span>
    </CCol>
  )
}

export default PaginationInfo
