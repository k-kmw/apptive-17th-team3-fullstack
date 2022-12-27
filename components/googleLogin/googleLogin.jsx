import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"
import styles from "./googleLogin.module.css";

const GoogleButton = () => {
  const { data: session } = useSession()
  if (session)
    return (<button className={styles.btnLogout} onClick={() => signOut()}>Sign out</button>)
  
  return (
    <>
<<<<<<< HEAD
      <button className={styles.btnLogin} onClick={() => signIn("google", {callbackUrl: 'http://localhost:4000/'})}><img src='/googleBtn2.png'/></button>
=======
      Not signed in <br />
      <button className={styles.btn} onClick={() => signIn("google", {callbackUrl: '/'})}>Sign in with Google</button>
>>>>>>> fd9d2b6f97191b13ffed1d99c25ed36edfafe6e7
    </>
  )
};

export default GoogleButton