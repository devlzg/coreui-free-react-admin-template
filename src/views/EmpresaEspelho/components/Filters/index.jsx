import { CRow } from '@coreui/react'
import React from 'react'
import { CnpjFilter, DateFilter, SearchFilter, StatusFilter } from './'

const Filters = ({ filters, loading, handleFilterChange }) => {
  return (
    <CRow className="mb-3 g-3">
      <SearchFilter value={filters.search} loading={loading} onChange={handleFilterChange} />
      <CnpjFilter value={filters.cnpj} onChange={handleFilterChange} />
      <StatusFilter value={filters.status} loading={loading} onChange={handleFilterChange} />
      <DateFilter
        startDate={filters.startDate}
        endDate={filters.endDate}
        loading={loading}
        handleFilterChange={handleFilterChange}
      />
    </CRow>
  )
}

export default Filters
