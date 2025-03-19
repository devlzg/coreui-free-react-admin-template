import { cilLockLocked, cilScreenSmartphone, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'

const formatCPF = (value) => {
  return value
    .replace(/\D/g, '') // Remove não números
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto depois do terceiro dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto depois do sexto dígito
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca um traço antes dos últimos 2 dígitos
}

const formatNumTel = (value) => {
  return value
    .replace(/\D/g, '') // Remove tudo que não for dígito
    .replace(/^(\d{2})(\d)/, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos (DDD)
    .replace(/(\d{5})(\d)/, '$1-$2') // Coloca um hífen depois do quinto dígito
}

const removeMask = (value) => {
  return value.replace(/\D/g, '') // Remove todos os caracteres não numéricos
}

const Register = () => {
  const [cpf, setCpf] = useState('')
  const [nome, setNome] = useState('')
  const [userRole, setUserRole] = useState('')
  const [userNumTel, setUserNumTel] = useState('')
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')

  const handleChangeCpf = (e) => {
    const rawValue = e.target.value
    setCpf(formatCPF(rawValue)) // Atualiza o estado com a máscara aplicada
  }

  const handleChangeTel = (e) => {
    const rawValue = e.target.value
    setUserNumTel(formatNumTel(rawValue)) // Atualiza o estado com a máscara aplicada
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const cpfSemMascara = removeMask(cpf)
    const numTelSemMascara = removeMask(userNumTel)
    const dadosUsuario = {
      cpf: cpfSemMascara,
      nome: nome,
      telefone: numTelSemMascara,
      email: email,
      senha: senha,
      cargo: userRole,
    }
    console.log(dadosUsuario)
  }
  const handleDropdown = (role) => {
    setUserRole(role)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Cadastro</h1>
                  <p className="text-body-secondary"></p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      maxLength="14"
                      value={cpf}
                      onChange={handleChangeCpf}
                      placeholder="CPF"
                      name="registerCpfForm"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Nome"
                      name="nome"
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilScreenSmartphone} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Telefone"
                      name="telefone"
                      maxLength="15"
                      onChange={handleChangeTel}
                      value={userNumTel}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="registerEmailForm"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      name="registerSenhaform"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Digite a senha novamente"
                      name="registerSenhaNovamenteform"
                      required
                    />
                  </CInputGroup>
                  <CDropdown>
                    {userRole != '' ? (
                      <CDropdownToggle color="primary">{userRole}</CDropdownToggle>
                    ) : (
                      <CDropdownToggle color="primary">Função</CDropdownToggle>
                    )}
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => handleDropdown('Usuário')}>
                        Usuário
                      </CDropdownItem>
                      <CDropdownItem onClick={() => handleDropdown('Administrador')}>
                        Administrador
                      </CDropdownItem>
                      <CDropdownItem onClick={() => handleDropdown('Super Usuário')}>
                        Super Usuário
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                  <div className="d-grid">
                    <CButton
                      color="success"
                      type="submit"
                      style={{ color: 'white', marginTop: '12px' }}
                    >
                      Criar conta
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
