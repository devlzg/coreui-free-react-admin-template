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
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

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
  const { register } = useAuth()
  const [cpf, setCpf] = useState('')
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [userNumTel, setUserNumTel] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('') // Estado para a segunda senha
  const [email, setEmail] = useState('')
  const [senhasIguais, setSenhasIguais] = useState(true)
  const navigate = useNavigate()

  const handleChangeCpf = (e) => {
    const rawValue = e.target.value
    setCpf(formatCPF(rawValue)) // Atualiza o estado com a máscara aplicada
  }

  const handleChangeTel = (e) => {
    const rawValue = e.target.value
    setUserNumTel(formatNumTel(rawValue)) // Atualiza o estado com a máscara aplicada
  }

  const removerAcentosEEspacos = (str) => {
    return str
      .normalize('NFD') // Normaliza a string para a forma de decomposição (NFD)
      .replace(/[\u0300-\u036f]/g, '') // Remove os caracteres diacríticos (acentos)
      .replace(/\s+/g, '') // Remove todos os espaços em branco
      .toLowerCase() // Converte para minúsculas
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {
      setSenhasIguais(false) // Atualiza o estado para exibir mensagem de erro
      return // Impede o envio do formulário
    }

    setSenhasIguais(true)

    if (cargo === '') {
      alert('É necessário escolher um cargo')
      return
    }

    const cpfSemMascara = removeMask(cpf)
    const numTelSemMascara = removeMask(userNumTel)
    const cargoFormatado = removerAcentosEEspacos(cargo)
    const dadosUsuario = {
      cpf: cpfSemMascara,
      nome: nome,
      numTelefone: numTelSemMascara,
      email: email,
      senha: senha,
      cargo: cargoFormatado,
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
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      name="registerSenhaNovamenteform"
                      required
                    />
                  </CInputGroup>
                  {!senhasIguais && (
                    <p style={{ color: 'red', marginBottom: '12px' }}>As senhas não são iguais!</p>
                  )}
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
