import { cilUser } from '@coreui/icons'
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
import { useAuth } from '../../../contexts/AuthContext'

const formatCPF = (value) => {
  return value
    .replace(/\D/g, '') // Remove não números
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto depois do terceiro dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto depois do sexto dígito
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca um traço antes dos últimos 2 dígitos
}

const removeMask = (value) => {
  return value.replace(/\D/g, '') // Remove todos os caracteres não numéricos
}

const Register = () => {
  const { register } = useAuth()
  const [cpf, setCpf] = useState('')
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [email, setEmail] = useState('')

  const handleChangeCpf = (e) => {
    const rawValue = e.target.value
    setCpf(formatCPF(rawValue)) // Atualiza o estado com a máscara aplicada
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (cargo === '') {
      alert('É necessário escolher um cargo')
      return
    }

    const cpfSemMascara = removeMask(cpf)
    let codCargoTemp = 0

    if (cargo === 'Usuário') {
      codCargoTemp = 1
    } else if (cargo === 'Administrador') {
      codCargoTemp = 2
    } else if (cargo === 'Super Usuário') {
      codCargoTemp = 3
    } else {
      console.log('Cargo inválido')
    }
    const dadosUsuario = {
      Usr_CPF: cpfSemMascara,
      Usr_Nome: nome,
      Usr_Email: email,
      Usr_Nac_Id: codCargoTemp,
    }
    register(dadosUsuario)
  }

  const handleDropdown = (cargo) => {
    setCargo(cargo)
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
                  <CInputGroup className="mb-4">
                    <CDropdown>
                      {cargo != '' ? (
                        <CDropdownToggle color="primary">{cargo}</CDropdownToggle>
                      ) : (
                        <CDropdownToggle color="primary">Cargo</CDropdownToggle>
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
                  </CInputGroup>

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
