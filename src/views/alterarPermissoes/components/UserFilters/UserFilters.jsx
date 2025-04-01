import {
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CRow,
  CSpinner,
} from '@coreui/react'

export const UserFilters = ({
  searchTerm,
  setSearchTerm,
  accessLevelFilter,
  setAccessLevelFilter,
  loading,
  sortOption,
  setSortOption,
}) => {
  return (
    <CRow className="mb-3 g-3">
      <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
        <CInputGroup>
          <CFormInput
            id="pesquisa nome ou email"
            type="text"
            placeholder="Pesquisar por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {loading && (
            // simbolo de carregamento
            <span className="input-group-text">
              <CSpinner size="sm" />
            </span>
          )}
        </CInputGroup>
      </CCol>

      <CCol xs={6} sm={6} md={3} lg={3} xl={3}>
        <CFormSelect
          id="filtro de cargo"
          value={accessLevelFilter}
          onChange={(e) => setAccessLevelFilter(e.target.value)}
          disabled={loading}
        >
          {/* opcoes do filtro de cargo */}
          <option value="all">Todos os níveis</option>
          <option value="1">Usuário</option>
          <option value="2">Administrador</option>
          <option value="3">Super Usuário</option>
        </CFormSelect>
      </CCol>

      {/* opcoes de ordenacao */}
      <CCol xs={6} sm={6} md={3} lg={3} xl={3}>
        <CDropdown className="w-100 d-flex">
          <CDropdownToggle
            color="secondary"
            className="w-100 text-truncate text-start"
            disabled={loading}
          >
            {sortOption === 'alphabetical' ? 'Ordem Alfabética' : 'Nível de Acesso'}
          </CDropdownToggle>
          <CDropdownMenu className="w-100">
            <CDropdownItem onClick={() => setSortOption('alphabetical')} disabled={loading}>
              Ordem Alfabética
            </CDropdownItem>
            <CDropdownItem onClick={() => setSortOption('accessLevel')} disabled={loading}>
              Nível de Acesso
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CCol>
    </CRow>
  )
}

export default UserFilters
