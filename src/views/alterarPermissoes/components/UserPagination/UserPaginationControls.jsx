import { CPagination, CPaginationItem } from '@coreui/react'

export const UserPaginationControls = ({ totalPages, currentPage, loading, handlePageChange }) => {
  {
    totalPages > 1 && (
      <div className="d-flex justify-content-center mt-3">
        <CPagination>
          <CPaginationItem
            disabled={currentPage === 1 || loading}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {/* simbolo pra proxima pagina */}
            &laquo;
          </CPaginationItem>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }

            return (
              <CPaginationItem
                key={pageNum}
                active={pageNum === currentPage}
                onClick={() => handlePageChange(pageNum)}
                disabled={loading}
              >
                {pageNum}
              </CPaginationItem>
            )
          })}

          <CPaginationItem
            disabled={currentPage === totalPages || loading}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {/* simbolo pra prox pagina */}
            &raquo;
          </CPaginationItem>
        </CPagination>
      </div>
    )
  }
}

export default UserPaginationControls
