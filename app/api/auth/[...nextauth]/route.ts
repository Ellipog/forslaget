import NextAuth from "next-auth";
import CredentaislProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import userSchema from "../../schema/userSchema";
import mongoose from "mongoose";

if (mongoose.modelNames().includes("User")) {
  var dbUser = mongoose.model("User");
} else {
  dbUser = mongoose.model("User", userSchema);
}

mongoose.connect(process.env.MONGODB);

const handler = NextAuth({
  providers: [
    CredentaislProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error("Please enter your email and password");
        const user = await dbUser.findOne({ email: credentials.email });
        if (!user) throw new Error("Invalid email or password");
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrectPassword) throw new Error("Invalid email or password");
        return user as any;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    newUser: "/",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  callbacks: {
    async session({ session }) {
      const user = await dbUser.findOne({ email: session.user.email });
      const userObj = {
        email: user.email,
        isAdmin: user.isAdmin,
      };
      session.user = userObj;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
