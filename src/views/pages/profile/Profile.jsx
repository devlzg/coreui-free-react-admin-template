import { CAvatar, CCard, CCardBody, CCardTitle, CCol, CContainer, CRow } from '@coreui/react'
import React from 'react'

import userIcon from '../../../assets/images/avatars/userIcon.png'

const Profile = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CCardTitle>
                  <CAvatar src={userIcon} size="xl" style={{ marginRight: '12px' }} />
                  <p>Nome</p>
                </CCardTitle>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Profile
