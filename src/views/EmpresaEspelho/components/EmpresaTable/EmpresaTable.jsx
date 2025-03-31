import {
  CSpinner,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import EmpresaTableRow from './EmpresaTableRow'

const EmpresaTable = ({ empresas, loading }) => {
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
              <CTableDataCell colSpan={8} className="text-center">
                <CSpinner />
              </CTableDataCell>
            </CTableRow>
          ) : empresas.length > 0 ? (
            empresas.map((empresa) => <EmpresaTableRow key={empresa.Emp_Id} empresa={empresa} />)
          ) : (
            <CTableRow>
              <CTableDataCell colSpan={8} className="text-center">
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
