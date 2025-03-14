import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
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

const removeMask = (value) => {
  return value.replace(/\D/g, '') // Remove todos os caracteres não numéricos
}

const Register = () => {
  const [cpf, setCpf] = useState('')

  const handleChange = (e) => {
    const rawValue = e.target.value
    setCpf(formatCPF(rawValue)) // Atualiza o estado com a máscara aplicada
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const cpfSemMascara = removeMask(cpf)
    console.log('CPF enviado:', cpfSemMascara) // Enviar este valor para o backend
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
                      onChange={handleChange}
                      placeholder="Digite seu CPF"
                      name="registerCpfForm"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
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
                  <div className="d-grid">
                    <CButton color="success" type="submit">
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
