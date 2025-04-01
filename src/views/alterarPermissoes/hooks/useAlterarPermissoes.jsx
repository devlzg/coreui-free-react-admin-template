import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { API_URL } from '../../EmpresaEspelho/utils/constants'

const useAlterarPermissoes = () => {
  // estados para dados e carregamento
  const [users, setUsers] = useState([])
  const [originalUsers, setOriginalUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [requestError, setRequestError] = useState(null)

  // estados para filtros e busca
  const [searchTerm, setSearchTerm] = useState('')
  const [accessLevelFilter, setAccessLevelFilter] = useState('all')
  const [sortOption, setSortOption] = useState('alphabetical')

  // estados paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // cache de requisições
  const requestCache = useRef({})
  const abortController = useRef(null)

  // debounce quando pesquisar
  const debounceTimeout = useRef(null)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // atualizarsearch term do debounce
  useEffect(() => {
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setCurrentPage(1)
    }, 500)

    return () => clearTimeout(debounceTimeout.current)
  }, [searchTerm])

  // buscar usuários com filtros
  const fetchUsers = React.useCallback(async () => {
    if (abortController.current) {
      abortController.current.abort()
    }

    abortController.current = new AbortController() // serve pra cancelar requisições

    const cacheKey = JSON.stringify({
      search: debouncedSearchTerm,
      accessLevel: accessLevelFilter,
      sort: sortOption,
      page: currentPage,
      limit: itemsPerPage,
    })

    // verificar cache
    if (requestCache.current[cacheKey]) {
      const { data, total } = requestCache.current[cacheKey]
      setUsers(data)
      setTotalItems(total)
      setTotalPages(Math.ceil(total / itemsPerPage))
      return
    }

    setLoading(true)
    setRequestError(null)

    try {
      const response = await axios.get(`${API_URL}/users`, {
        params: {
          search: debouncedSearchTerm,
          accessLevel: accessLevelFilter,
          sort: sortOption,
          page: currentPage,
          limit: itemsPerPage,
        },
        signal: abortController.current.signal,
      })

      // Corrigindo a desestruturação para a estrutura real da API
      const { data: usersData, pagination } = response.data
      const total = pagination?.total || usersData.length

      // atualiza o cache
      requestCache.current[cacheKey] = { data: usersData, total }

      setUsers(usersData)
      setOriginalUsers([...usersData]) // cria uma cópia para comparar depois
      setTotalItems(total)
      setTotalPages(pagination?.totalPages || Math.ceil(total / itemsPerPage))
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Erro ao buscar usuários:', error)
        setRequestError({
          message: 'Erro ao carregar usuários. Tente novamente.',
          details: error.response?.data?.message || error.message,
        })
      }
    } finally {
      setLoading(false)
    }
  }, [debouncedSearchTerm, accessLevelFilter, sortOption, currentPage, itemsPerPage])

  // useeffect para buscar usuários quando filtros ou paginação mudam
  useEffect(() => {
    fetchUsers()

    return () => {
      if (abortController.current) {
        abortController.current.abort()
      }
    }
  }, [fetchUsers, debouncedSearchTerm, accessLevelFilter, sortOption, currentPage, itemsPerPage])

  // hook pra limpar o cache quando componentes são desmontados
  useEffect(() => {
    return () => {
      requestCache.current = {}
    }
  }, [])

  const handleUsr_Nac_IdChange = (Usr_Id, newUsr_Nac_Id) => {
    const updatedUsers = users.map((user) =>
      user.Usr_Id === Usr_Id ? { ...user, Usr_Nac_Id: newUsr_Nac_Id } : user,
    )
    setUsers(updatedUsers)
  }

  const handleSaveChanges = async () => {
    try {
      // isso aqui serve pra me dizer quais usuários mudaram de nível de acesso
      const changedUsers = users.reduce((acc, user) => {
        const originalUser = originalUsers.find(
          (u) => u && user && (u.Usr_Id === user.Usr_Id || u.id === user.id),
        )

        if (originalUser && String(user.Usr_Nac_Id) !== String(originalUser.Usr_Nac_Id)) {
          acc.push({
            Usr_Id: user.Usr_Id || user.id,
            Usr_Nac_Id: String(user.Usr_Nac_Id),
          })
        }
        return acc
      }, [])

      // msg pra quando não tem mudança
      if (changedUsers.length === 0) {
        setRequestError({
          message: 'Nenhuma alteração foi feita.',
          color: 'info',
        })
        return
      }

      // msg pra quando a requisição demora
      setRequestError(null)
      const loadingTimeout = setTimeout(() => {
        setRequestError({
          message: 'A operação está demorando mais que o normal...',
          color: 'warning',
        })
      }, 5000)
      // atualizando as permissões no servidor
      await axios.put(`${API_URL}/tb_usuario/update-permissions`, {
        users: changedUsers,
      })

      clearTimeout(loadingTimeout)
      requestCache.current = {}

      // atualiza os dados localmente antes de buscar novamente
      const updatedUsers = users.map((user) => {
        const changedUser = changedUsers.find(
          (u) => u.Usr_Id === user.Usr_Id || u.Usr_Id === user.id,
        )
        return changedUser ? { ...user, Usr_Nac_Id: changedUser.Usr_Nac_Id } : user
      })
      setUsers(updatedUsers)
      setOriginalUsers([...updatedUsers])

      //pega os dados atualizados
      await fetchUsers()

      setRequestError({
        message: 'Permissões atualizadas com sucesso!',
        color: 'success',
      })

      // tira a mensagem de sucesso dps de 3 segundos
      setTimeout(() => {
        setRequestError(null)
      }, 3000)
    } catch (error) {
      console.error('Erro ao atualizar permissões:', error)
      setRequestError({
        message: 'Erro ao atualizar permissões',
        details: error.response?.data?.message || error.message,
        color: 'danger',
      })
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  return {
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
  }
}

export default useAlterarPermissoes
