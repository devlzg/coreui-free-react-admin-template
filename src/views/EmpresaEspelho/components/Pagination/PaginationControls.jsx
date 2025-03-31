import { CCol, CFormSelect, CRow } from '@coreui/react'

export const PaginationControls = ({ filters, handleItemsPerPageChange, loading, totalItems }) => {
  return (
    <CRow className="mb-3 align-items-center">
      <CCol xs={12} sm={6} md={4} lg={3} xl={2}>
        <CFormSelect
          id="itens por página"
          value={filters.limit}
          onChange={handleItemsPerPageChange}
          disabled={loading}
        >
          <option value={5}>5 itens</option>
          <option value={10}>10 itens</option>
          <option value={20}>20 itens</option>
          <option value={50}>50 itens</option>
        </CFormSelect>
      </CCol>
      <CCol xs={12} sm={6} md={8} lg={9} xl={10} className="text-sm-end mt-2 mt-sm-0">
        {!loading && (
          <span className="me-2">
            Mostrando {(filters.page - 1) * filters.limit + 1} a{' '}
            {Math.min(filters.page * filters.limit, totalItems)} de {totalItems} empresas
          </span>
        )}
      </CCol>
    </CRow>
  )
}

export default PaginationControls
