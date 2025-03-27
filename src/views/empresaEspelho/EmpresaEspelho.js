import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const EmpresaEspelho = () => {
  const [empresas, setEmpresas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortController = useRef(null)
  const requestCache = useRef({})

  // Estados para os filtros
  const [filters, setFilters] = useState({
    search: '',
    cnpj: '',
    status: 'all',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10,
  })

  // Estados para paginação
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // Buscar empresas com filtros
  const fetchEmpresas = async () => {
    if (abortController.current) {
      abortController.current.abort()
    }

    abortController.current = new AbortController()

    const cacheKey = JSON.stringify(filters)

    // Verificar cache antes de fazer a requisição
    if (requestCache.current[cacheKey]) {
      const cachedData = requestCache.current[cacheKey]
      setEmpresas(cachedData.data)
      setTotalItems(cachedData.total)
      setTotalPages(cachedData.totalPages)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get('http://localhost:5000/api/empresas', {
        params: filters,
        signal: abortController.current.signal,
      })

      // Ajuste para a estrutura esperada da API
      const { data: empresasData, pagination } = response.data
      const total = pagination?.total || 0
      const totalPages = pagination?.totalPages || 1

      // Atualizar cache
      requestCache.current[cacheKey] = {
        data: empresasData,
        total,
        totalPages,
        pagination,
      }

      setEmpresas(empresasData)
      setTotalItems(total)
      setTotalPages(totalPages)

      // Sincronizar paginação com a resposta da API
      setFilters((prev) => ({
        ...prev,
        page: pagination?.currentPage || prev.page,
        limit: pagination?.itemsPerPage || prev.limit,
      }))
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error('Erro ao buscar empresas:', {
          error: err,
          response: err.response,
        })
        setError({
          message: 'Erro ao carregar empresas',
          details: err.response?.data?.message || err.message,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  // Atualizar busca quando filtros mudarem
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmpresas()
    }, 500) // Debounce de 500ms

    return () => {
      clearTimeout(timer)
      if (abortController.current) {
        abortController.current.abort()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Resetar para a primeira página ao mudar filtros
    }))
  }

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  const handleItemsPerPageChange = (e) => {
    const limit = Number(e.target.value)
    setFilters((prev) => ({ ...prev, limit, page: 1 }))
  }

  const statusOptions = [
    { value: 'all', label: 'Todos os status' },
    { value: 'Exportado', label: 'Exportado' },
    { value: 'Cadastro Incompleto', label: 'Cadastro Incompleto' },
  ]

  if (loading && empresas.length === 0) {
    return (
      <CContainer>
        <CCard>
          <CCardBody className="text-center">
            <CSpinner />
            <div>Carregando empresas...</div>
          </CCardBody>
        </CCard>
      </CContainer>
    )
  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <h3>Espelho Empresas</h3>
        </CCardHeader>

        <CCardBody>
          {/* Filtros */}
          <CRow className="mb-3 g-3">
            {/* Filtro por nome da empresa */}
            <CCol xs={12} sm={6} md={3}>
              <CInputGroup>
                <CFormInput
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

            {/* Filtro por CNPJ */}
            <CCol xs={12} sm={6} md={3}>
              <CInputGroup>
                <CFormInput
                  type="text"
                  placeholder="CNPJ da empresa"
                  value={filters.cnpj}
                  onChange={(e) => handleFilterChange('cnpj', e.target.value)}
                />
              </CInputGroup>
            </CCol>

            {/* Filtro por status */}
            <CCol xs={12} sm={6} md={2}>
              <CFormSelect
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

            {/* Filtro por data inicial */}
            <CCol xs={6} sm={6} md={2}>
              <CInputGroup>
                <CInputGroupText>De</CInputGroupText>
                <CFormInput
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  disabled={loading}
                />
              </CInputGroup>
            </CCol>

            {/* Filtro por data final */}
            <CCol xs={6} sm={6} md={2}>
              <CInputGroup>
                <CInputGroupText>Até</CInputGroupText>
                <CFormInput
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  disabled={loading}
                  min={filters.startDate}
                />
              </CInputGroup>
            </CCol>
          </CRow>

          {/* Controles de paginação */}
          <CRow className="mb-3 align-items-center">
            <CCol xs={12} sm={6} md={4} lg={3} xl={2}>
              <CFormSelect
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

          {/* Mensagens de erro */}
          {error && (
            <CAlert color="danger" className="mt-3">
              <strong>{error.message}</strong>
              {error.details && <div className="mt-2">{error.details}</div>}
              <div className="mt-2">
                <CButton color="primary" size="sm" onClick={fetchEmpresas}>
                  Tentar novamente
                </CButton>
              </div>
            </CAlert>
          )}

          {/* Tabela */}
          <div className="table-responsive">
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nome Fantasia</CTableHeaderCell>
                  <CTableHeaderCell>N° CNPJ</CTableHeaderCell>
                  <CTableHeaderCell>Contrato(S4E)</CTableHeaderCell>
                  <CTableHeaderCell>Data de Cadastro</CTableHeaderCell>
                  <CTableHeaderCell>Cidade</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {loading && empresas.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={7} className="text-center">
                      <CSpinner />
                    </CTableDataCell>
                  </CTableRow>
                ) : empresas.length > 0 ? (
                  empresas.map((empresa) => (
                    <CTableRow key={empresa.Emp_Id}>
                      <CTableDataCell>{empresa.Emp_Id}</CTableDataCell>
                      <CTableDataCell className="text-nowrap">
                        {empresa.Emp_NomeFant}
                      </CTableDataCell>
                      <CTableDataCell>{empresa.Emp_Cnpj}</CTableDataCell>
                      <CTableDataCell>{empresa.Emp_Contrato}</CTableDataCell>
                      <CTableDataCell>{empresa.Emp_Dt_Cadastro}</CTableDataCell>
                      <CTableDataCell>{empresa.Emp_Cidade}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge
                          color={empresa.Emp_Status === 'Exportado' ? 'success' : 'warning'}
                          className="text-nowrap"
                          style={{ width: '150px' }}
                        >
                          {empresa.Emp_Status}
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={7} className="text-center">
                      Nenhuma empresa encontrada
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <CPagination>
                <CPaginationItem
                  disabled={filters.page === 1 || loading}
                  onClick={() => handlePageChange(filters.page - 1)}
                >
                  &laquo;
                </CPaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (filters.page <= 3) {
                    pageNum = i + 1
                  } else if (filters.page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = filters.page - 2 + i
                  }

                  return (
                    <CPaginationItem
                      key={pageNum}
                      active={pageNum === filters.page}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={loading}
                    >
                      {pageNum}
                    </CPaginationItem>
                  )
                })}

                <CPaginationItem
                  disabled={filters.page === totalPages || loading}
                  onClick={() => handlePageChange(filters.page + 1)}
                >
                  &raquo;
                </CPaginationItem>
              </CPagination>
            </div>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default EmpresaEspelho
