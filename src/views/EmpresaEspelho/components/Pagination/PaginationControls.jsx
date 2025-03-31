import { CPagination, CPaginationItem } from '@coreui/react'
import React from 'react'

const PaginationControls = ({ currentPage, totalPages, loading, onPageChange }) => {
  if (totalPages <= 1) return null

  return (
    <div className="d-flex justify-content-center mt-3">
      <CPagination>
        <CPaginationItem
          disabled={currentPage === 1 || loading}
          onClick={() => onPageChange(currentPage - 1)}
        >
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
              onClick={() => onPageChange(pageNum)}
              disabled={loading}
            >
              {pageNum}
            </CPaginationItem>
          )
        })}

        <CPaginationItem
          disabled={currentPage === totalPages || loading}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &raquo;
        </CPaginationItem>
      </CPagination>
    </div>
  )
}

export default PaginationControls
