import { cilCog, cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CBadge,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

export const EmpresaTable = ({ empresas, loading }) => {
  return (
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
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilCog} />
            </CTableHeaderCell>
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
                <CTableDataCell className="text-nowrap">{empresa.Emp_NomeFant}</CTableDataCell>
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
                <CTableDataCell className="text-left">
                  <CIcon icon={cilSave} />
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
  )
}

export default EmpresaTable
