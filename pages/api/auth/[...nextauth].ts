import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../../libs/prismadb"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Username", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) throw new Error("Email və şifrə tələb olunur")

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user.hashedPassword) throw new Error("İstifadəçi tapılmadı")


                const compare = await bcrypt.compare(credentials.password, user.hashedPassword)
                if (!compare) throw new Error("Şifrə yanlışdır")

                // if (user.role !== "ADMIN") throw new Error("Siz admin deyilsiniz");

                return user
            }
        }),
    ],
    pages: {
        signIn: '/login',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,

/*     callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }) {
            session?.user?.role = token.role;
            return session;
        },
    } */

}



export default NextAuth(authOptions)
