import {
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Usr_Nac_IdOptions } from '../../utils/constants'

export const UserTable = ({ users, handleUsr_Nac_IdChange, loading }) => {
  return (
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
          {users.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan={7} className="text-center">
                Nenhum usuário encontrado
              </CTableDataCell>
            </CTableRow>
          ) : (
            users.map((user) => (
              <CTableRow key={user.Usr_Id || user.id || user.cpf}>
                <CTableDataCell className="text-nowrap">
                  {user.Usr_Nome || user.nome || user.name}
                </CTableDataCell>
                <CTableDataCell className="text-nowrap">
                  {user.Usr_Email || user.email}
                </CTableDataCell>
                <CTableDataCell>
                  <CFormSelect
                    id={`select-${user.Usr_Id || user.id}`}
                    value={user.Usr_Nac_Id || user.nivelAcesso || '1'}
                    onChange={(e) => handleUsr_Nac_IdChange(user.Usr_Id || user.id, e.target.value)}
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
            ))
          )}
        </CTableBody>
      </CTable>
    </div>
  )
}
