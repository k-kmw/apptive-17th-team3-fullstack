import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"
import styles from "./googleLogin.module.css";

const GoogleButton = () => {
  const { data: session } = useSession()
  if (session)
    return (<button className={styles.btn} onClick={() => signOut()}>Sign out</button>)
  
  return (
    <>
      Not signed in <br />
      <button className={styles.btn} onClick={() => signIn("google", {callbackUrl: '/'})}>Sign in with Google</button>
    </>
  )
};

export default GoogleButton