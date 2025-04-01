import { CButton } from '@coreui/react'

export const SaveButton = ({ handleSaveChanges, loading }) => {
  return (
    <div className="text-right mt-3">
      <CButton color="primary" onClick={handleSaveChanges} disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar Alterações'}
      </CButton>
    </div>
  )
}

export default SaveButton
