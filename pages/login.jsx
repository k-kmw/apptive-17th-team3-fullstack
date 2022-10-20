import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

const login = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google", {callbackUrl: 'http://localhost:4000/api/cal_list'})}>Sign in</button>
    </>
  )
};
export default login