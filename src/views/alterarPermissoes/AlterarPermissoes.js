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
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

const AlterarPermissoes = () => {
  const { getAllUsers } = useAuth()
  const [originalUsers, setOriginalUsers] = useState([]) // Armazena os dados originais
  const [users, setUsers] = useState([]) // Armazena os dados modificados
  const [alert, setAlert] = useState({ visible: false, message: '', color: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers()

        let usersData = Array.isArray(response) ? response : []
        if (response && response.users && Array.isArray(response.users)) {
          usersData = response.users
        }

        const formattedUsers = Array.isArray(usersData) ? usersData : []
        setOriginalUsers([...formattedUsers]) // Guarda cópia dos dados originais
        setUsers(formattedUsers)
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

  // const updateUsersPermissions = async (changedUsers) => {
  //   try {
  //     const response = await axios.put('/api/tb_usuario/update-permissions', {
  //       users: changedUsers,
  //     })
  //     console.log('Resposta do servidor:', response.data)
  //   } catch (error) {
  //     console.error('Erro ao atualizar permissões:', error)
  //     setAlert({
  //       visible: true,
  //       message: 'Erro ao atualizar permissões. Tente novamente.',
  //       color: 'danger',
  //     })
  //   }
  // }

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
        // Algumas atualizações falharam
        setAlert({
          visible: true,
          message: `Atualizado com sucesso para ${response.data.successCount} usuários, ${response.data.failedCount} falhas.`,
          color: 'warning',
        })
      } else {
        // Tudo ok
        setAlert({
          visible: true,
          message: response.data.message,
          color: 'success',
        })
        // Atualiza os dados originais
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
