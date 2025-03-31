import { CPagination, CPaginationItem } from '@coreui/react'

export const PaginationNav = ({ filters, totalPages, loading, handlePageChange }) => {
  return (
    totalPages > 1 && (
      <div className="d-flex justify-content-center mt-3">
        <CPagination>
          <CPaginationItem
            disabled={filters.page === 1 || loading}
            onClick={() => handlePageChange(filters.page - 1)}
          >
            {/* simbolo pra pagina anterior */}
            &laquo;
          </CPaginationItem>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (filters.page <= 3) {
              pageNum = i + 1
            } else if (filters.page >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = filters.page - 2 + i
            }

            return (
              <CPaginationItem
                key={pageNum}
                active={pageNum === filters.page}
                onClick={() => handlePageChange(pageNum)}
                disabled={loading}
              >
                {pageNum}
              </CPaginationItem>
            )
          })}

          <CPaginationItem
            disabled={filters.page === totalPages || loading}
            onClick={() => handlePageChange(filters.page + 1)}
          >
            {/* simbolo pra proxima pagina */}
            &raquo;
          </CPaginationItem>
        </CPagination>
      </div>
    )
  )
}

export default PaginationNav
