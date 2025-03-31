import { CCol, CFormInput, CInputGroup } from '@coreui/react'
import React from 'react'

const CnpjFilter = ({ value, onChange }) => {
  return (
    <CCol xs={12} sm={6} md={3}>
      <CInputGroup>
        <CFormInput
          type="text"
          placeholder="CNPJ da empresa"
          value={value}
          onChange={(e) => onChange('cnpj', e.target.value)}
        />
      </CInputGroup>
    </CCol>
  )
}

export default CnpjFilter
