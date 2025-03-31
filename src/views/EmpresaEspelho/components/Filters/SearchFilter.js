import { CCol, CFormInput, CInputGroup, CInputGroupText, CSpinner } from '@coreui/react'
import React from 'react'

const SearchFilter = ({ value, loading, onChange }) => {
  return (
    <CCol xs={12} sm={6} md={3}>
      <CInputGroup>
        <CFormInput
          type="text"
          placeholder="Nome da empresa"
          value={value}
          onChange={(e) => onChange('search', e.target.value)}
        />
        {loading && (
          <CInputGroupText>
            <CSpinner size="sm" />
          </CInputGroupText>
        )}
      </CInputGroup>
    </CCol>
  )
}

export default SearchFilter
