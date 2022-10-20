import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

const GoogleButton = () => {
  const { data: session } = useSession()
  if (session)
    return (<button onClick={() => signOut()}>Sign out</button>)
  
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google", {callbackUrl: 'http://localhost:4000/'})}>Sign in</button>
    </>
  )
};

export default GoogleButton