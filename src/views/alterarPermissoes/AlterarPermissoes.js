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
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const AlterarPermissoes = () => {
  const { getAllUsers } = useAuth()
  const [originalUsers, setOriginalUsers] = useState([])
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [alert, setAlert] = useState({ visible: false, message: '', color: '' })
  const [loading, setLoading] = useState(true)

  // Estados para os filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [accessLevelFilter, setAccessLevelFilter] = useState('all')
  const [sortOption, setSortOption] = useState('alphabetical')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers()

        let usersData = Array.isArray(response) ? response : []
        if (response && response.users && Array.isArray(response.users)) {
          usersData = response.users
        }

        const formattedUsers = Array.isArray(usersData) ? usersData : []
        setOriginalUsers([...formattedUsers])
        setUsers(formattedUsers)
        setFilteredUsers(formattedUsers)
        setLoading(false)
      } catch (error) {
        console.error('Erro ao carregar usuários:', error)
        setAlert({
          visible: true,
          message: 'Erro ao carregar usuários. Tente novamente mais tarde.',
          color: 'danger',
        })
        setLoading(false)
        setOriginalUsers([])
        setUsers([])
        setFilteredUsers([])
      }
    }

    fetchUsers()
  }, [getAllUsers])

  // Efeito para aplicar filtros e ordenação
  useEffect(() => {
    let result = [...users]

    // Aplicar filtro de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (user) =>
          user.Usr_Nome?.toLowerCase().includes(term) ||
          user.nome?.toLowerCase().includes(term) ||
          user.name?.toLowerCase().includes(term) ||
          user.Usr_Email?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term),
      )
    }

    // Aplicar filtro de nível de acesso
    if (accessLevelFilter !== 'all') {
      result = result.filter(
        (user) => String(user.Usr_Nac_Id || user.nivelAcesso || '1') === accessLevelFilter,
      )
    }

    // Aplicar ordenação
    if (sortOption === 'alphabetical') {
      result.sort((a, b) => {
        const nameA = (a.Usr_Nome || a.nome || a.name || '').toLowerCase()
        const nameB = (b.Usr_Nome || b.nome || b.name || '').toLowerCase()
        return nameA.localeCompare(nameB)
      })
    } else if (sortOption === 'accessLevel') {
      result.sort((a, b) => {
        const levelA = parseInt(a.Usr_Nac_Id || a.nivelAcesso || '1')
        const levelB = parseInt(b.Usr_Nac_Id || b.nivelAcesso || '1')
        return levelB - levelA
      })
    }

    setFilteredUsers(result)
  }, [searchTerm, accessLevelFilter, sortOption, users])

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
      setAlert({
        visible: true,
        message: 'Nenhuma alteração foi feita.',
        color: 'info',
      })
      return
    }

    try {
      const response = await axios.put('http://localhost:5000/api/tb_usuario/update-permissions', {
        users: changedUsers,
      })

      console.log('Resposta do servidor:', response.data)

      if (response.data.partialSuccess) {
        setAlert({
          visible: true,
          message: `Atualizado com sucesso para ${response.data.successCount} usuários, ${response.data.failedCount} falhas.`,
          color: 'warning',
        })
      } else {
        setAlert({
          visible: true,
          message: response.data.message,
          color: 'success',
        })
        setOriginalUsers([...users])
      }
    } catch (error) {
      console.log(error)
      console.log(changedUsers)
      setAlert({
        visible: true,
        message: 'Erro ao atualizar permissões',
        color: 'danger',
      })
    }
  }

  if (loading) {
    return (
      <CContainer>
        <CCard>
          <CCardBody className="text-center">
            <div>Carregando usuários...</div>
          </CCardBody>
        </CCard>
      </CContainer>
    )
  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <h3>Gerenciamento de Permissões de Usuários</h3>
          <small className="text-muted">
            Altere o nível de acesso de cada usuário conforme necessário
          </small>
        </CCardHeader>

        <CCardBody>
          {/* Filtros - Versão responsiva */}
          <CRow className="mb-3 g-3">
            {/* Barra de pesquisa - Ocupa toda a largura em mobile */}
            <CCol xs={12} sm={12} md={6} lg={6} xl={6}>
              <CInputGroup>
                <CFormInput
                  type="text"
                  placeholder="Pesquisar por nome ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CInputGroup>
            </CCol>

            {/* Filtro de nível de acesso - Metade da largura em mobile, terço em desktop */}
            <CCol xs={6} sm={6} md={3} lg={3} xl={3}>
              <CFormSelect
                value={accessLevelFilter}
                onChange={(e) => setAccessLevelFilter(e.target.value)}
                aria-label="Filtrar por nível de acesso"
                className="text-truncate" // Adicionado para garantir que o texto não quebre
              >
                <option value="all">Todos os níveis</option>
                <option value="1">Usuário</option>
                <option value="2">Administrador</option>
                <option value="3">Super Usuário</option>
              </CFormSelect>
            </CCol>

            {/* Dropdown de ordenação - Metade da largura em mobile, terço em desktop */}
            <CCol xs={6} sm={6} md={3} lg={3} xl={3}>
              <CDropdown className="w-100 d-flex">
                <CDropdownToggle
                  color="secondary"
                  className="w-100 text-truncate text-start" // Adicionado text-truncate
                >
                  {sortOption === 'alphabetical' ? 'Ordem Alfabética' : 'Nível de Acesso'}
                </CDropdownToggle>
                <CDropdownMenu className="w-100">
                  <CDropdownItem onClick={() => setSortOption('alphabetical')}>
                    Ordem Alfabética
                  </CDropdownItem>
                  <CDropdownItem onClick={() => setSortOption('accessLevel')}>
                    Nível de Acesso
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>

          {filteredUsers.length === 0 ? (
            <CAlert color="info">Nenhum usuário encontrado com os filtros aplicados</CAlert>
          ) : (
            <>
              <div className="table-responsive">
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                      <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="min-width-150">
                        Nível de acesso
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredUsers.map((user) => (
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
                            aria-label="Selecionar permissão"
                            className="text-truncate min-width-150" // Classes adicionadas
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
              <div className="text-right mt-3">
                <CButton color="primary" onClick={handleSaveChanges} className="px-4">
                  Salvar Alterações
                </CButton>
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

      {/* Adicionando estilos CSS para garantir a exibição correta */}
      <style>
        {`
          .min-width-150 {
            min-width: 150px !important;
          }
          .text-truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .table-responsive {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          @media (max-width: 576px) {
            .min-width-150 {
              min-width: 120px !important;
            }
          }
        `}
      </style>
    </CContainer>
  )
}

export default AlterarPermissoes
