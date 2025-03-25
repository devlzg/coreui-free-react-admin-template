import CIcon from '@coreui/icons-react'
import {
  CAlert,
  CBadge,
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

const AlterarPermissoes = () => {
  // Estado para os usuários
  const [users, setUsers] = useState([])
  // Estado para feedback
  const [alert, setAlert] = useState({ visible: false, message: '', color: '' })

  // Simulando carregamento de dados da API
  useEffect(() => {
    // Em uma aplicação real, isso viria de uma API
    const mockUsers = [
      {
        Usr_Id: 1,
        Usr_Nome: 'João Silva',
        Usr_Email: 'joao@exemplo.com',
        Usr_Nac_Id: '3',
      },
      {
        Usr_Id: 2,
        Usr_Nome: 'Maria Souza',
        Usr_Email: 'maria@exemplo.com',
        Usr_Nac_Id: '2',
      },
      {
        Usr_Id: 3,
        Usr_Nome: 'Carlos Oliveira',
        Usr_Email: 'carlos@exemplo.com',
        Usr_Nac_Id: '1',
      },
      {
        Usr_Id: 4,
        Usr_Nome: 'Ana Costa',
        Usr_Email: 'ana@exemplo.com',
        Usr_Nac_Id: '1',
      },
      {
        Usr_Id: 5,
        Usr_Nome: 'Pedro Santos',
        Usr_Email: 'pedro@exemplo.com',
        Usr_Nac_Id: '1',
      },
    ]

    setUsers(mockUsers)
  }, [])

  // Opções de permissão
  const Usr_Nac_IdOptions = [
    { value: '1', label: 'Usuário' },
    { value: '2', label: 'Administrador' },
    { value: '3', label: 'Super Usuário' },
  ]

  // Handler para mudança de permissão
  const handleUsr_Nac_IdChange = (Usr_Id, newUsr_Nac_Id) => {
    setUsers(
      users.map((user) => (user.Usr_Id === Usr_Id ? { ...user, Usr_Nac_Id: newUsr_Nac_Id } : user)),
    )
  }

  // Handler para salvar alterações
  const handleSaveChanges = () => {
    // Aqui você faria a chamada à API para salvar as alterações
    // Simulando uma chamada assíncrona
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
                <CTableRow key={user.Usr_Id}>
                  <CTableDataCell>{user.Usr_Nome}</CTableDataCell>
                  <CTableDataCell>{user.Usr_Email}</CTableDataCell>
                  <CTableDataCell>
                    <CFormSelect
                      value={user.Usr_Nac_Id}
                      onChange={(e) => handleUsr_Nac_IdChange(user.Usr_Id, e.target.value)}
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
