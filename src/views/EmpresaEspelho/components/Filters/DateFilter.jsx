import { CCol, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import React from 'react'

const DateFilter = ({ startDate, endDate, loading, handleFilterChange }) => {
  return (
    <>
      <CCol xs={6} sm={6} md={2}>
        <CInputGroup>
          <CInputGroupText>De</CInputGroupText>
          <CFormInput
            type="date"
            value={startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            disabled={loading}
          />
        </CInputGroup>
      </CCol>
      <CCol xs={6} sm={6} md={2}>
        <CInputGroup>
          <CInputGroupText>Até</CInputGroupText>
          <CFormInput
            type="date"
            value={endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            disabled={loading}
            min={startDate}
          />
        </CInputGroup>
      </CCol>
    </>
  )
}

export default DateFilter
