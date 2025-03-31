import { ItemsPerPageSelect, PaginationControls, PaginationInfo } from './Pagination'

const PaginationSection = ({
  filters,
  totalItems,
  totalPages,
  loading,
  handlePageChange,
  handleItemsPerPageChange,
}) => (
  <>
    <CRow className="mb-3 align-items-center">
      <ItemsPerPageSelect
        value={filters.limit}
        onChange={handleItemsPerPageChange}
        loading={loading}
      />
      <PaginationInfo
        currentPage={filters.page}
        itemsPerPage={filters.limit}
        totalItems={totalItems}
        loading={loading}
      />
    </CRow>

    <PaginationControls
      currentPage={filters.page}
      totalPages={totalPages}
      loading={loading}
      onPageChange={handlePageChange}
    />
  </>
)
