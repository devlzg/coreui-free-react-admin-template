import { CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react'
import { SaveButton } from './components/SaveButton/SaveButton'
import { UserErrorMessage } from './components/UserErrorMessage/UserErrorMessage'
import { UserFilters } from './components/UserFilters/UserFilters'
import { UserPagination } from './components/UserPagination/UserPagination'
import { UserPaginationControls } from './components/UserPagination/UserPaginationControls'
import { UserTable } from './components/UserTable/UserTable'
import useAlterarPermissoes from './hooks/useAlterarPermissoes'

const AlterarPermissoes = () => {
  const {
    users,
    loading,
    requestError,
    searchTerm,
    setSearchTerm,
    accessLevelFilter,
    setAccessLevelFilter,
    sortOption,
    setSortOption,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    handleUsr_Nac_IdChange,
    handleSaveChanges,
    handlePageChange,
    handleItemsPerPageChange,
  } = useAlterarPermissoes()

  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <h3>Gerenciamento de Permissões de Usuários</h3>
        </CCardHeader>

        <CCardBody>
          {/* filtros */}
          <UserFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            accessLevelFilter={accessLevelFilter}
            setAccessLevelFilter={setAccessLevelFilter}
            loading={loading}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />

          {/* paginação */}
          <UserPagination
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
            loading={loading}
            currentPage={currentPage}
            totalItems={totalItems}
          />

          {/* msg de loading/erro*/}
          <UserErrorMessage requestError={requestError} loading={loading} />

          {/* tabela de usuarios */}
          {!loading && (
            <>
              <UserTable
                users={users}
                handleUsr_Nac_IdChange={handleUsr_Nac_IdChange}
                loading={loading}
              />

              {/* controle inferior da paginação */}
              <UserPaginationControls
                totalPages={totalPages}
                currentPage={currentPage}
                loading={loading}
                handlePageChange={handlePageChange}
              />

              {/* botao para aplicar alteracoes */}
              <SaveButton handleSaveChanges={handleSaveChanges} loading={loading} />
            </>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default AlterarPermissoes
