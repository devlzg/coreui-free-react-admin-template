import axios from 'axios'
import { API_URL } from './constants'

// Cria uma instância customizada do axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || error.message || 'Erro desconhecido na requisição'

    const errorDetails = {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    }

    console.error('Erro na requisição:', errorMessage, errorDetails)

    return Promise.reject({
      message: errorMessage,
      details: errorDetails,
    })
  },
)

// Funções específicas para o módulo de empresas
const EmpresaService = {
  /**
   * Busca empresas com filtros aplicados
   * @param {Object} filters - Objeto com os filtros de busca
   * @returns {Promise} Promise com os dados das empresas e paginação
   */
  getEmpresas: async (filters) => {
    try {
      const params = {
        search: filters.search,
        cnpj: filters.cnpj,
        status: filters.status,
        startDate: filters.startDate,
        endDate: filters.endDate,
        page: filters.page,
        limit: filters.limit,
      }

      // Remove parâmetros vazios
      Object.keys(params).forEach((key) => {
        if (params[key] === null || params[key] === undefined || params[key] === '') {
          delete params[key]
        }
      })

      const response = await api.get('/empresas', { params })
      return {
        data: response.data.data,
        pagination: response.data.pagination,
      }
    } catch (error) {
      console.error('Erro ao buscar empresas:', error)
      throw error
    }
  },

  /**
   * Exporta empresas para um arquivo
   * @param {Object} filters - Filtros para a exportação
   * @returns {Promise} Promise com o blob do arquivo
   */
  exportEmpresas: async (filters) => {
    try {
      const response = await api.get('/empresas/export', {
        params: filters,
        responseType: 'blob', // Para receber arquivos
      })
      return response.data
    } catch (error) {
      console.error('Erro ao exportar empresas:', error)
      throw error
    }
  },
}

// Funções genéricas para outras entidades podem ser adicionadas aqui
// const OutroService = { ... }

// Exporta todos os serviços
export default {
  EmpresaService,
  // OutroService
}

// Exporta a instância do axios para casos específicos
export { api as axiosInstance }
