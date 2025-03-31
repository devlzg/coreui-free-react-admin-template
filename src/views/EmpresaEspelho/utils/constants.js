export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos os status' },
  { value: 'Exportado', label: 'Exportado' },
  { value: 'Cadastro Incompleto', label: 'Cadastro Incompleto' },
]

export const ITEMS_PER_PAGE_OPTIONS = [
  { value: 5, label: '5 itens' },
  { value: 10, label: '10 itens' },
  { value: 20, label: '20 itens' },
  { value: 50, label: '50 itens' },
]
