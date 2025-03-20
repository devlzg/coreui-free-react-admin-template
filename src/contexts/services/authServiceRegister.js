import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const register = (newUser) => {
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
}

export default register
