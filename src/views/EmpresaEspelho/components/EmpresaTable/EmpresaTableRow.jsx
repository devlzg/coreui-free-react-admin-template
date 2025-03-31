import { cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CBadge, CTableDataCell, CTableRow } from '@coreui/react'
import React from 'react'

const EmpresaTableRow = ({ empresa }) => {
  return (
    <CTableRow>
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
  )
}

export default EmpresaTableRow
