import React, { useEffect,useContext } from 'react'
import { AuthContext } from '../../lib/auth';
import GoogleLogin from 'react-google-login';

const GoogleButton = ({onSuccess, onFailure, clientId}) => {
    const {isLogin, setIsLogin} = useContext(AuthContext);
    const move_to_login = () => {
        location.href = "../../";
        // setIsLogin(true);
    };
  return (
    //   <GoogleLogin
    //     clientId={clientId}
    //     buttonText="login in with google"
    //     onSuccess={onSuccess}
    //     onFailure={onFailure}
    //   />
    <button onClick={isLogin ? null : move_to_login}>
        {isLogin ? "success" : "구글 로그인"}
    </button>
  )
}

export default GoogleButton