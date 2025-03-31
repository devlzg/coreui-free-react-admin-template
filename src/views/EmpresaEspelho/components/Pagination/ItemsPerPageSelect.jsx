import { CCol, CFormSelect } from '@coreui/react'
import React from 'react'
import { ITEMS_PER_PAGE_OPTIONS } from '../../../utils/constants'

const ItemsPerPageSelect = ({ value, onChange, loading }) => {
  return (
    <CCol xs={12} sm={6} md={4} lg={3} xl={2}>
      <CFormSelect value={value} onChange={onChange} disabled={loading}>
        {ITEMS_PER_PAGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </CFormSelect>
    </CCol>
  )
}

export default ItemsPerPageSelect
