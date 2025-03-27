import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CFormSelect,
  CInputGroup,
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

const AlterarPermissoes = () => {
  // Estados para dados e loading
  const [users, setUsers] = useState([])
  const [originalUsers, setOriginalUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [requestError, setRequestError] = useState(null)

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [accessLevelFilter, setAccessLevelFilter] = useState('all')
  const [sortOption, setSortOption] = useState('alphabetical')

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // Cache de requisições
  const requestCache = useRef({})
  const abortController = useRef(null)

  // Debounce para pesquisa
  const debounceTimeout = useRef(null)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Atualizar debounced search term
  useEffect(() => {
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setCurrentPage(1) // Resetar para a primeira página ao mudar pesquisa
    }, 500)

    return () => clearTimeout(debounceTimeout.current)
  }, [searchTerm])

  // Buscar usuários com filtros
  const fetchUsers = async () => {
    if (abortController.current) {
      abortController.current.abort()
    }

    abortController.current = new AbortController()

    const cacheKey = JSON.stringify({
      search: debouncedSearchTerm,
      accessLevel: accessLevelFilter,
      sort: sortOption,
      page: currentPage,
      limit: itemsPerPage,
    })

    // Verificar cache
    if (requestCache.current[cacheKey]) {
      const { data, total } = requestCache.current[cacheKey]
      setUsers(data)
      setTotalItems(total)
      setTotalPages(Math.ceil(total / itemsPerPage))
      return
    }

    setLoading(true)
    setRequestError(null)

    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        params: {
          search: debouncedSearchTerm,
          accessLevel: accessLevelFilter,
          sort: sortOption,
          page: currentPage,
          limit: itemsPerPage,
        },
        signal: abortController.current.signal,
      })

      const { data, total } = response.data

      // Atualizar cache
      requestCache.current[cacheKey] = { data, total }

      setUsers(data)
      setOriginalUsers(data)
      setTotalItems(total)
      setTotalPages(Math.ceil(total / itemsPerPage))
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Erro ao buscar usuários:', error)
        setRequestError({
          message: 'Erro ao carregar usuários. Tente novamente.',
          details: error.response?.data?.message || error.message,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  // Efeito para buscar usuários quando filtros ou paginação mudam
  useEffect(() => {
    fetchUsers()

    return () => {
      if (abortController.current) {
        abortController.current.abort()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, accessLevelFilter, sortOption, currentPage, itemsPerPage])

  // Limpar cache quando componentes são desmontados
  useEffect(() => {
    return () => {
      requestCache.current = {}
    }
  }, [])

  const Usr_Nac_IdOptions = [
    { value: '1', label: 'Usuário' },
    { value: '2', label: 'Administrador' },
    { value: '3', label: 'Super Usuário' },
  ]

  const handleUsr_Nac_IdChange = (Usr_Id, newUsr_Nac_Id) => {
    const updatedUsers = users.map((user) =>
      user.Usr_Id === Usr_Id ? { ...user, Usr_Nac_Id: newUsr_Nac_Id } : user,
    )
    setUsers(updatedUsers)
  }

  const handleSaveChanges = async () => {
    const changedUsers = users
      .filter((user, index) => {
        const originalUser = originalUsers[index]
        return originalUser && user.Usr_Nac_Id !== originalUser.Usr_Nac_Id
      })
      .map((user) => ({
        Usr_Id: user.Usr_Id || user.id,
        Usr_Nac_Id: user.Usr_Nac_Id,
      }))

    if (changedUsers.length === 0) {
      setRequestError({
        message: 'Nenhuma alteração foi feita.',
        color: 'info',
      })
      return
    }

    try {
      const response = await axios.put('http://localhost:5000/api/tb_usuario/update-permissions', {
        users: changedUsers,
      })

      // Limpar cache após atualização
      requestCache.current = {}

      // Recarregar dados
      await fetchUsers()

      if (response.data.partialSuccess) {
        setRequestError({
          message: `Atualizado com sucesso para ${response.data.successCount} usuários, ${response.data.failedCount} falhas.`,
          color: 'warning',
        })
      } else {
        setRequestError({
          message: response.data.message,
          color: 'success',
        })
      }
    } catch (error) {
      console.error('Erro ao atualizar permissões:', error)
      setRequestError({
        message: 'Erro ao atualizar permissões',
        details: error.response?.data?.message || error.message,
        color: 'danger',
      })
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <h3>Gerenciamento de Permissões de Usuários</h3>
        </CCardHeader>

        <CCardBody>
          {/* Filtros */}
          <CRow className="mb-3 g-3">
            <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
              <CInputGroup>
                <CFormInput
                  type="text"
                  placeholder="Pesquisar por nome ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {loading && (
                  <span className="input-group-text">
                    <CSpinner size="sm" />
                  </span>
                )}
              </CInputGroup>
            </CCol>

            <CCol xs={6} sm={6} md={3} lg={3} xl={3}>
              <CFormSelect
                value={accessLevelFilter}
                onChange={(e) => setAccessLevelFilter(e.target.value)}
                disabled={loading}
              >
                <option value="all">Todos os níveis</option>
                <option value="1">Usuário</option>
                <option value="2">Administrador</option>
                <option value="3">Super Usuário</option>
              </CFormSelect>
            </CCol>

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

          {/* Controles de paginação */}
          <CRow className="mb-3 align-items-center">
            <CCol xs={12} sm={6} md={4} lg={3} xl={2}>
              <CFormSelect
                value={itemsPerPage}
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
                  Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
                  {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} usuários
                </span>
              )}
            </CCol>
          </CRow>

          {/* Feedback de loading/erro */}
          {loading && (
            <div className="text-center my-5">
              <CSpinner />
              <p>Carregando usuários...</p>
            </div>
          )}

          {requestError && !loading && (
            <CAlert color={requestError.color || 'danger'} className="mt-3">
              <strong>{requestError.message}</strong>
              {requestError.details && <div className="mt-2">{requestError.details}</div>}
              <div className="mt-2">
                <CButton color="primary" size="sm" onClick={fetchUsers}>
                  Tentar novamente
                </CButton>
              </div>
            </CAlert>
          )}

          {/* Tabela de usuários */}
          {!loading && !requestError && (
            <>
              <div className="table-responsive">
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Nome</CTableHeaderCell>
                      <CTableHeaderCell>E-mail</CTableHeaderCell>
                      <CTableHeaderCell className="min-width-150">Nível de acesso</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {users.map((user) => (
                      <CTableRow key={user.Usr_Id || user.id || user.cpf}>
                        <CTableDataCell className="text-nowrap">
                          {user.Usr_Nome || user.nome || user.name}
                        </CTableDataCell>
                        <CTableDataCell className="text-nowrap">
                          {user.Usr_Email || user.email}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormSelect
                            value={user.Usr_Nac_Id || user.nivelAcesso || '1'}
                            onChange={(e) =>
                              handleUsr_Nac_IdChange(user.Usr_Id || user.id, e.target.value)
                            }
                            disabled={loading}
                          >
                            {Usr_Nac_IdOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </CFormSelect>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                  <CPagination>
                    <CPaginationItem
                      disabled={currentPage === 1 || loading}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      &laquo;
                    </CPaginationItem>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      return (
                        <CPaginationItem
                          key={pageNum}
                          active={pageNum === currentPage}
                          onClick={() => handlePageChange(pageNum)}
                          disabled={loading}
                        >
                          {pageNum}
                        </CPaginationItem>
                      )
                    })}

                    <CPaginationItem
                      disabled={currentPage === totalPages || loading}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      &raquo;
                    </CPaginationItem>
                  </CPagination>
                </div>
              )}

              <div className="text-right mt-3">
                <CButton color="primary" onClick={handleSaveChanges} disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </CButton>
              </div>
            </>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default AlterarPermissoes
