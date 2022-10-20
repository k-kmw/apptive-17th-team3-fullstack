import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth'

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {encryption: true, secret: process.env.SECRET},
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events openid email profile',
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if(token && account){
                token.access_token = account.access_token;
                token.refresh_token = account.refresh_token;
                token.id_token = account.id_token;
            }
            // Return previous token if the access token has not expired yet
            // if (Date.now() < token.accessTokenExpires) {
            //   }
            return token
        },
    }
};
export default NextAuth(authOptions);