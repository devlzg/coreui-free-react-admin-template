import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { API_URL } from '../utils/constants'

const useEmpresas = () => {
  const [empresas, setEmpresas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    cnpj: '',
    status: 'all',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10,
  })
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const abortController = useRef(null)
  const requestCache = useRef({})

  const fetchEmpresas = async () => {
    if (abortController.current) {
      abortController.current.abort()
    }

    abortController.current = new AbortController()

    const cacheKey = JSON.stringify(filters)

    if (requestCache.current[cacheKey]) {
      const cachedData = requestCache.current[cacheKey]
      setEmpresas(cachedData.data)
      setTotalItems(cachedData.total)
      setTotalPages(cachedData.totalPages)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${API_URL}/empresas`, {
        params: filters,
        signal: abortController.current.signal,
      })

      const { data: empresasData, pagination } = response.data
      const total = pagination?.total || 0
      const totalPages = pagination?.totalPages || 1

      requestCache.current[cacheKey] = {
        data: empresasData,
        total,
        totalPages,
        pagination,
      }

      setEmpresas(empresasData)
      setTotalItems(total)
      setTotalPages(totalPages)

      setFilters((prev) => ({
        ...prev,
        page: pagination?.currentPage || prev.page,
        limit: pagination?.itemsPerPage || prev.limit,
      }))
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error('Erro ao buscar empresas:', {
          error: err,
          response: err.response,
        })
        setError({
          message: 'Erro ao carregar empresas',
          details: err.response?.data?.message || err.message,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmpresas()
    }, 500)

    return () => {
      clearTimeout(timer)
      if (abortController.current) {
        abortController.current.abort()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const handleFilterChange = (name, value) => {
    console.log('estou na funcao handlefilterchange')
    console.log(filters)
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }))
    console.log(filters)
  }

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  // referente a paginacao
  const handleItemsPerPageChange = (e) => {
    const limit = Number(e.target.value)
    setFilters((prev) => ({ ...prev, limit, page: 1 }))
  }

  return {
    empresas,
    loading,
    error,
    filters,
    totalItems,
    totalPages,
    handleFilterChange,
    handlePageChange,
    fetchEmpresas,
    handleItemsPerPageChange,
  }
}

export default useEmpresas
