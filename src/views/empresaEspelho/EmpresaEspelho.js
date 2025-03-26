import {
  CAlert,
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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const EmpresaEspelho = () => {
  const [originalEmpresas, setOriginalEmpresas] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [filteredEmpresas, setFilteredEmpresas] = useState([])
  const [alert, setAlert] = useState({ visible: false, message: '', color: '' })
  const [loading, setLoading] = useState(true)
  const { getAllEmpresas } = useAuth()

  // Estados para os filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [cnpjFilter, setCnpjFilter] = useState('')

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const empresasData = await getAllEmpresas()

        setOriginalEmpresas([...empresasData])
        setEmpresas(empresasData)
        setFilteredEmpresas(empresasData)
        setLoading(false)
      } catch (error) {
        console.error('Erro ao carregar empresas:', error)
        setAlert({
          visible: true,
          message: 'Erro ao carregar empresas. Tente novamente mais tarde.',
          color: 'danger',
        })
        setLoading(false)
      }
    }

    fetchEmpresas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Função para converter data no formato DD/MM/YYYY para Date object
  const parseDate = (dateString) => {
    if (!dateString) return null
    const [day, month, year] = dateString.split('/')
    return new Date(`${year}-${month}-${day}`)
  }

  // Efeito para aplicar filtros
  useEffect(() => {
    let result = [...empresas]

    // Filtro por nome da empresa
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter((empresa) => empresa.Emp_NomeFant?.toLowerCase().includes(term))
    }

    // Filtro por status
    if (statusFilter !== 'all') {
      result = result.filter((empresa) => empresa.Emp_Status === statusFilter)
    }

    // Filtro por CNPJ
    if (cnpjFilter) {
      const term = cnpjFilter.replace(/\D/g, '') // Remove formatação para busca
      result = result.filter((empresa) => empresa.Emp_Cnpj?.replace(/\D/g, '').includes(term))
    }

    // Filtro por período de datas
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate) : null

      result = result.filter((empresa) => {
        const empresaDate = parseDate(empresa.Emp_Dt_Cadastro)
        if (!empresaDate) return false

        // Verifica se a data está dentro do período
        const afterStart = !start || empresaDate >= start
        const beforeEnd = !end || empresaDate <= end

        return afterStart && beforeEnd
      })
    }

    setFilteredEmpresas(result)
    setCurrentPage(1) // Resetar para a primeira página quando os filtros mudam
  }, [searchTerm, statusFilter, startDate, endDate, cnpjFilter, empresas])

  // Efeito para calcular o total de páginas quando filteredEmpresas muda
  useEffect(() => {
    const total = Math.ceil(filteredEmpresas.length / itemsPerPage)
    setTotalPages(total > 0 ? total : 1)

    // Ajustar currentPage se necessário
    if (currentPage > total && total > 0) {
      setCurrentPage(total)
    }
  }, [filteredEmpresas, itemsPerPage, currentPage])

  // Obter empresas da página atual
  const getCurrentPageEmpresas = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredEmpresas.slice(startIndex, endIndex)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1) // Resetar para a primeira página quando muda o número de itens por página
  }

  const statusOptions = [
    { value: 'all', label: 'Todos os status' },
    { value: 'Exportado', label: 'Exportado' },
    { value: 'Cadastro Incompleto', label: 'Cadastro Incompleto' },
  ]

  if (loading) {
    return (
      <CContainer>
        <CCard>
          <CCardBody className="text-center">
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CInputGroup>
            </CCol>

            {/* Filtro por CNPJ */}
            <CCol xs={12} sm={6} md={3}>
              <CInputGroup>
                <CFormInput
                  type="text"
                  placeholder="CNPJ da empresa"
                  value={cnpjFilter}
                  onChange={(e) => setCnpjFilter(e.target.value)}
                />
              </CInputGroup>
            </CCol>

            {/* Filtro por status */}
            <CCol xs={12} sm={6} md={2}>
              <CFormSelect
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filtrar por status"
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
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  aria-label="Data inicial"
                />
              </CInputGroup>
            </CCol>

            {/* Filtro por data final */}
            <CCol xs={6} sm={6} md={2}>
              <CInputGroup>
                <CInputGroupText>Até</CInputGroupText>
                <CFormInput
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  aria-label="Data final"
                  min={startDate}
                />
              </CInputGroup>
            </CCol>
          </CRow>

          {/* Controles de paginação - Topo */}
          <CRow className="mb-3 align-items-center">
            <CCol xs={12} sm={6} md={4} lg={3} xl={2}>
              <CFormSelect
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                aria-label="Itens por página"
              >
                <option value={5}>5 itens por página</option>
                <option value={10}>10 itens por página</option>
                <option value={20}>20 itens por página</option>
                <option value={50}>50 itens por página</option>
                <option value={100}>100 itens por página</option>
              </CFormSelect>
            </CCol>
            <CCol xs={12} sm={6} md={8} lg={9} xl={10} className="text-sm-end mt-2 mt-sm-0">
              <span className="me-2">
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
                {Math.min(currentPage * itemsPerPage, filteredEmpresas.length)} de{' '}
                {filteredEmpresas.length} empresas
              </span>
            </CCol>
          </CRow>

          {filteredEmpresas.length === 0 ? (
            <CAlert color="info">Nenhuma empresa encontrada com os filtros aplicados</CAlert>
          ) : (
            <>
              <div className="table-responsive">
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nome Fantasia</CTableHeaderCell>
                      <CTableHeaderCell scope="col">N° CNPJ</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Contrato(S4E)</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Data de Cadastro</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Cidade</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {getCurrentPageEmpresas().map((empresa) => (
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
                          <span
                            className={`badge bg-${empresa.Emp_Status === 'Exportado' ? 'success' : 'warning'}`}
                          >
                            {empresa.Emp_Status}
                          </span>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                  <CPagination aria-label="Page navigation">
                    <CPaginationItem
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <CPaginationItem
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </CPaginationItem>
                    ))}

                    <CPaginationItem
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                  </CPagination>
                </div>
              )}
            </>
          )}
          {alert.visible && (
            <CAlert color={alert.color} className="mt-3">
              {alert.message}
            </CAlert>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default EmpresaEspelho
