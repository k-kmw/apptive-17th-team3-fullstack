import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login';

const GoogleButton = ({onSuccess, onFailure, clientId}) => {
  return (
      <GoogleLogin
        clientId={clientId}
        buttonText="login in with google"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
  )
}

export default GoogleButton