import {
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import useEmpresas from '../../hooks/useEmpresas'
import { statusOptions } from '../../utils/constants'

export const Filters = () => {
  const { loading, filters, handleFilterChange } = useEmpresas()
  return (
    <CRow className="mb-3 g-3">
      {/* filtro pelo nome da empresa */}
      <CCol xs={12} sm={6} md={3}>
        <CInputGroup>
          <CFormInput
            id="pesquisa por nome"
            type="text"
            placeholder="Nome da empresa"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          {loading && (
            <CInputGroupText>
              <CSpinner size="sm" />
            </CInputGroupText>
          )}
        </CInputGroup>
      </CCol>

      {/* filtro por cnpj */}
      <CCol xs={12} sm={6} md={3}>
        <CInputGroup>
          <CFormInput
            id="pesquisa por cnpj"
            type="text"
            placeholder="CNPJ da empresa"
            value={filters.cnpj}
            onChange={(e) => handleFilterChange('cnpj', e.target.value)}
          />
        </CInputGroup>
      </CCol>

      {/* filtro por status (extendido ou incompleto) */}
      <CCol xs={12} sm={6} md={2}>
        <CFormSelect
          id="filtro por status"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          disabled={loading}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </CFormSelect>
      </CCol>

      {/* filtro por data (inicial) */}
      <CCol xs={6} sm={6} md={2}>
        <CInputGroup>
          <CInputGroupText>De</CInputGroupText>
          <CFormInput
            id="filtro por data inicial"
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            disabled={loading}
          />
        </CInputGroup>
      </CCol>

      {/* filtro por data (final) */}
      <CCol xs={6} sm={6} md={2}>
        <CInputGroup>
          <CInputGroupText>Até</CInputGroupText>
          <CFormInput
            id="filtro por data final"
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            disabled={loading}
            min={filters.startDate}
          />
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

export default Filters
