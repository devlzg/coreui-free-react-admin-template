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
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'

const TabelaEmpresas = () => {
  const [originalEmpresas, setOriginalEmpresas] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [filteredEmpresas, setFilteredEmpresas] = useState([])
  const [alert, setAlert] = useState({ visible: false, message: '', color: '' })
  const [loading, setLoading] = useState(true)

  // Estados para os filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [cnpjFilter, setCnpjFilter] = useState('')

  useEffect(() => {
    // Função para simular dados - substitua por chamada API real
    const fetchEmpresas = async () => {
      try {
        // Dados simulados baseados na imagem fornecida
        const empresasData = [
          {
            id: 0,
            nomeFantasia: 'GULMERONE DA COSTA INTERESE SAFEASTINAR',
            cnpj: '28.334.673/0001-60',
            contrato: '463562036',
            dataCadastro: '10/03/2025',
            cidade: 'Brasília',
            status: 'Exportado',
          },
          {
            id: 1,
            nomeFantasia: 'SEJASLA 3.1 BOGEERO CARMO CARVALHO',
            cnpj: '53.064.315/0012-17',
            contrato: '482545096',
            dataCadastro: '06/03/2025',
            cidade: 'Uberaba',
            status: 'Cadastro Incompleto',
          },
          {
            id: 2,
            nomeFantasia: 'SA 377.383 EFIAS Correia Calta',
            cnpj: '36.377.383/0003-94',
            contrato: '482545096',
            dataCadastro: '06/03/2025',
            cidade: 'Brasília',
            status: 'Cadastro Incompleto',
          },
          {
            id: 3,
            nomeFantasia: 'REAL SERVICOS DE MARKETING E PUBLICIDADE LTDA',
            cnpj: '24.687.869/0021-77',
            contrato: '482545096',
            dataCadastro: '27/03/2025',
            cidade: 'Brasília',
            status: 'Exportado',
          },
          {
            id: 4,
            nomeFantasia: 'NGL - SERVICOS CONDOMINIAIS E DE PROPACIO EM TILIMITADA',
            cnpj: '12.323.839/0001-00',
            contrato: '463562036',
            dataCadastro: '26/03/2025',
            cidade: 'Brasília',
            status: 'Exportado',
          },
        ]

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
      result = result.filter((empresa) => empresa.nomeFantasia?.toLowerCase().includes(term))
    }

    // Filtro por status
    if (statusFilter !== 'all') {
      result = result.filter((empresa) => empresa.status === statusFilter)
    }

    // Filtro por CNPJ
    if (cnpjFilter) {
      const term = cnpjFilter.replace(/\D/g, '') // Remove formatação para busca
      result = result.filter((empresa) => empresa.cnpj?.replace(/\D/g, '').includes(term))
    }

    // Filtro por período de datas
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate) : null

      result = result.filter((empresa) => {
        const empresaDate = parseDate(empresa.dataCadastro)
        if (!empresaDate) return false

        // Verifica se a data está dentro do período
        const afterStart = !start || empresaDate >= start
        const beforeEnd = !end || empresaDate <= end

        return afterStart && beforeEnd
      })
    }

    setFilteredEmpresas(result)
  }, [searchTerm, statusFilter, startDate, endDate, cnpjFilter, empresas])

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
          <h3>Monitor de Empresas</h3>
          <small className="text-muted">Visualize e filtre as empresas cadastradas</small>
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
                    {filteredEmpresas.map((empresa) => (
                      <CTableRow key={empresa.id}>
                        <CTableDataCell>{empresa.id}</CTableDataCell>
                        <CTableDataCell className="text-nowrap">
                          {empresa.nomeFantasia}
                        </CTableDataCell>
                        <CTableDataCell>{empresa.cnpj}</CTableDataCell>
                        <CTableDataCell>{empresa.contrato}</CTableDataCell>
                        <CTableDataCell>{empresa.dataCadastro}</CTableDataCell>
                        <CTableDataCell>{empresa.cidade}</CTableDataCell>
                        <CTableDataCell>
                          <span
                            className={`badge bg-${empresa.status === 'Exportado' ? 'success' : 'warning'}`}
                          >
                            {empresa.status}
                          </span>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>

              <div className="mt-3 text-muted">
                Mostrando de 1 até {filteredEmpresas.length} de {empresas.length} registros
              </div>
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

export default TabelaEmpresas
