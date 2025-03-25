export const login = async (cpf, senha) => {
  const token = import.meta.env.VITE_API_TOKEN

  try {
    const response = await fetch(import.meta.env.VITE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', // Garante que queremos JSON de volta
      },
      body: JSON.stringify({ token, cpf, senha }),
    })

    // Primeiro obtemos o texto da resposta para inspeção
    const responseText = await response.text()

    // Verificamos se a resposta foi bem sucedida
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Tentamos fazer o parse do JSON
    try {
      return JSON.parse(responseText)
    } catch (parseError) {
      console.error('Erro ao parsear JSON:', parseError)
      console.error('Conteúdo recebido:', responseText)
      throw new Error('Resposta inválida do servidor')
    }
  } catch (error) {
    console.error('Erro na requisição:', error.message)
    throw error
  }
}
