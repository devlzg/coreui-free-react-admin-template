export function ProtectedComponent({ allowedRoles, children }) {
  const { userNac } = useAuth()

  // codigo 1 = usuario
  // codigo 2 = admin
  // codigo 3 = superusuario

  if (allowedRoles.includes(userNac)) {
    return children
  }
  return null
}
