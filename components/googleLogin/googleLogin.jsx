import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"
import styles from "./googleLogin.module.css";

const GoogleButton = () => {
  const { data: session } = useSession()
  if (session)
    return (<button className={styles.btnLogout} onClick={() => signOut()}>Sign out</button>)
  
  return (
    <>
      <button className={styles.btnLogin} onClick={() => signIn("google", {callbackUrl: '/'})}><img src='/googleBtn2.png'/></button>
    </>
  )
};

export default GoogleButton