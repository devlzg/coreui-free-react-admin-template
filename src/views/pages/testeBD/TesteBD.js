import axios from 'axios'
import React, { useEffect, useState } from 'react'

function TesteBD() {
  const [users, setUsers] = useState([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [cargo, setCargo] = useState('')
  const [numTelefone, setNumTelefone] = useState('')
  const [senha, setSenha] = useState('')

  // Fetch users from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/usuarios')
      .then((response) => {
        setUsers(response.data.users)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      nome,
      email,
      cpf,
      cargo,
      numTelefone,
      senha,
    }

    axios
      .post('http://localhost:5000/api/usuarios', { users: [newUser] }) // Envia no formato esperado
      .then((response) => {
        console.log('User added successfully:', response.data)
        // Atualiza a lista de usuários após a adição
        setUsers([...users, { id: response.data.id, nome, email, cpf, cargo, numTelefone }])
        // Limpa o formulário
        setNome('')
        setEmail('')
        setCpf('')
        setCargo('')
        setNumTelefone('')
        setSenha('')
      })
      .catch((error) => {
        console.error('Error adding user:', error)
      })
  }

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nome} - {user.email} - {user.cpf} - {user.cargo} - {user.numTelefone}
          </li>
        ))}
      </ul>

      <h2>Adicionar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>CPF:</label>
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        </div>
        <div>
          <label>Cargo:</label>
          <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} required />
        </div>
        <div>
          <label>Número de Telefone:</label>
          <input
            type="text"
            value={numTelefone}
            onChange={(e) => setNumTelefone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Usuário</button>
      </form>
    </div>
  )
}

export default TesteBD
