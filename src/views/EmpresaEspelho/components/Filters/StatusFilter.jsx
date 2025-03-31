import { CCol, CFormSelect } from '@coreui/react'
import React from 'react'
import { STATUS_OPTIONS } from '../../../utils/constants'

const StatusFilter = ({ value, loading, onChange }) => {
  return (
    <CCol xs={12} sm={6} md={2}>
      <CFormSelect
        value={value}
        onChange={(e) => onChange('status', e.target.value)}
        disabled={loading}
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </CFormSelect>
    </CCol>
  )
}

export default StatusFilter
