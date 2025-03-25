import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const AlterarPermissoes = () => {
  const { getAllUsers } = useAuth()
  const [users, setUsers] = useState([])
  const [alert, setAlert] = useState({ visible: false, message: '', color: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers()

        // Verifica se a resposta é um array, se não for, converte ou extrai o array necessário
        let usersData = Array.isArray(response) ? response : []

        // Se a resposta for um objeto com propriedade 'users' (como no register)
        if (response && response.users && Array.isArray(response.users)) {
          usersData = response.users
        }

        // Garante que usersData seja um array antes de setar o estado
        setUsers(Array.isArray(usersData) ? usersData : [])
        setLoading(false)
      } catch (error) {
        console.error('Erro ao carregar usuários:', error)
        setAlert({
          visible: true,
          message: 'Erro ao carregar usuários. Tente novamente mais tarde.',
          color: 'danger',
        })
        setLoading(false)
        setUsers([]) // Garante que users seja um array vazio em caso de erro
      }
    }

    fetchUsers()
  }, [getAllUsers])

  const Usr_Nac_IdOptions = [
    { value: '1', label: 'Usuário' },
    { value: '2', label: 'Administrador' },
    { value: '3', label: 'Super Usuário' },
  ]

  const handleUsr_Nac_IdChange = (Usr_Id, newUsr_Nac_Id) => {
    setUsers(
      users.map((user) => (user.Usr_Id === Usr_Id ? { ...user, Usr_Nac_Id: newUsr_Nac_Id } : user)),
    )
  }

  const handleSaveChanges = () => {
    console.log(users)
    setTimeout(() => {
      setAlert({
        visible: true,
        message: 'Permissões atualizadas com sucesso!',
        color: 'success',
      })
      setTimeout(() => setAlert({ ...alert, visible: false }), 3000)
    }, 500)
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
          {users.length === 0 ? (
            <CAlert color="info">Nenhum usuário encontrado</CAlert>
          ) : (
            <>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                    <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nível de acesso</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.map((user) => (
                    <CTableRow key={user.Usr_Id || user.id || user.cpf}>
                      <CTableDataCell>{user.Usr_Nome || user.nome || user.name}</CTableDataCell>
                      <CTableDataCell>{user.Usr_Email || user.email}</CTableDataCell>
                      <CTableDataCell>
                        <CFormSelect
                          value={user.Usr_Nac_Id || user.nivelAcesso || '1'}
                          onChange={(e) =>
                            handleUsr_Nac_IdChange(user.Usr_Id || user.id, e.target.value)
                          }
                          aria-label="Selecionar permissão"
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
    </CContainer>
  )
}

export default AlterarPermissoes
