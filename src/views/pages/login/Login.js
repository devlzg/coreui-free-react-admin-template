import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
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

const Login = () => {
  const { login } = useAuth()
  const { userCpf, setUserCpf } = useAuth()
  const [senha, setSenha] = useState('')

  const handleChangeCpf = (e) => {
    const rawValue = e.target.value
    setUserCpf(formatCPF(rawValue)) // Atualiza o estado com a máscara aplicada
  }

  const handleChangeSenha = (e) => {
    setSenha(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('enviando credenciais: ', userCpf, senha)
    const cpfSemMascara = removeMask(userCpf)
    login(cpfSemMascara, senha)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary"></p>
                    {/*input de cpf */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        maxLength="14"
                        value={userCpf}
                        onChange={handleChangeCpf}
                        placeholder="Digite seu CPF"
                        name="loginCpfForm"
                        required
                      />
                    </CInputGroup>
                    {/*input de senha */}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Senha"
                        name="loginSenhaform"
                        value={senha}
                        onChange={handleChangeSenha}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Entrar
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Esqueceu a senha?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Ainda não tem uma conta?</h2>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Cadastrar
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
