export const login = async (cpf, senha) => {
  const token = import.meta.env.VITE_API_TOKEN

  try {
    const response = await fetch(import.meta.env.VITE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, cpf, senha }),
    })

    return await response.json()
  } catch (error) {
    console.error('Erro na requisição:', error.message)
    throw error
  }
}
