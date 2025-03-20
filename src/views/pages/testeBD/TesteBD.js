import axios from 'axios'
import React, { useEffect, useState } from 'react'

function TesteBD() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch users from the backend
    axios
      .get('http://localhost:5000/api/usuarios')
      .then((response) => {
        setUsers(response.data.users)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nome} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TesteBD
