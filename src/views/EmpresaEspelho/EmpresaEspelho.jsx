import { CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { EmpresaTable } from './components/EmpresaTable/EmpresaTable'
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage'
import { Filters } from './components/Filters/Filters'
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner'
import { PaginationControls } from './components/Pagination/PaginationControls'
import { PaginationNav } from './components/Pagination/PaginationNav'

const EmpresaEspelho = () => {
  const [empresas, setEmpresas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortController = useRef(null)
  const requestCache = useRef({})

  // referente a filtragem
  // estados para filtros
  const [filters, setFilters] = useState({
    search: '',
    cnpj: '',
    status: 'all',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10,
  })

  // referente a paginação
  // estados para paginação
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // referente a filtragem
  // buscar empresas com filtros
  const fetchEmpresas = async () => {
    if (abortController.current) {
      abortController.current.abort()
    }

    abortController.current = new AbortController()

    const cacheKey = JSON.stringify(filters)

    // verifica o cache antes de fazer a requisição
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
      const response = await axios.get('http://localhost:5000/api/empresas', {
        params: filters,
        signal: abortController.current.signal,
      })

      // ajustando para a estrutura esperada da API
      const { data: empresasData, pagination } = response.data
      const total = pagination?.total || 0
      const totalPages = pagination?.totalPages || 1

      // atualiza cache
      requestCache.current[cacheKey] = {
        data: empresasData,
        total,
        totalPages,
        pagination,
      }

      setEmpresas(empresasData)
      setTotalItems(total)
      setTotalPages(totalPages)

      // sincroniza a paginação com a resposta da API
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
  } // fetchEmpresas()

  // referente a filtragem
  // atualiza busca quando filtros mudarem
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmpresas()
    }, 500) // Debounce de 500ms

    return () => {
      clearTimeout(timer)
      if (abortController.current) {
        abortController.current.abort()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  // referente a filtragem
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // reseta para a primeira página dps de mudar filtros
    }))
  }

  // referente a paginacao
  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  // referente a paginacao
  const handleItemsPerPageChange = (e) => {
    const limit = Number(e.target.value)
    setFilters((prev) => ({ ...prev, limit, page: 1 }))
  }

  // renderiza mensagem de loading
  if (loading && empresas.length === 0) {
    return <LoadingSpinner />
  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <h3>Espelho Empresas</h3>
        </CCardHeader>

        <CCardBody>
          {/* filtros */}
          <Filters filters={filters} loading={loading} handleFilterChange={handleFilterChange} />

          {/* controles da paginação */}
          <PaginationControls
            filters={filters}
            handleItemsPerPageChange={handleItemsPerPageChange}
            loading={loading}
            totalItems={totalItems}
          />

          {/* msg de erro */}
          <ErrorMessage error={error} fetchEmpresas={fetchEmpresas} />

          {/* tabela */}
          <EmpresaTable empresas={empresas} loading={loading} />

          {/* paginacao */}
          <PaginationNav
            filters={filters}
            handlePageChange={handlePageChange}
            loading={loading}
            totalPages={totalPages}
          />
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default EmpresaEspelho
