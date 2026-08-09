import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { readSheet } from "./googleSheets";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        identifier: {
          label: "Phone or Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const identifier = String(
          credentials?.identifier || credentials?.phone || ""
        ).trim();

        const password = String(
          credentials?.password || ""
        ).trim();

        if (!identifier || !password) {
          return null;
        }

        // -----------------------------
        // Teacher / Admin
        // -----------------------------

        if (
          identifier === process.env.TEACHER_PHONE &&
          password === process.env.TEACHER_PASSWORD
        ) {
          return {
            id: "teacher",
            role: "teacher",
            name:
              process.env.TEACHER_DISPLAY_NAME ||
              "مانی فرزانه",
          };
        }

        // -----------------------------
        // Student
        // -----------------------------

        try {
          const students = await readSheet("Students");

          const normalizedIdentifier =
            identifier.toLowerCase();

          const student = students.find((s) => {
            const phone = String(
              s.phone || ""
            ).trim();

            const email = String(
              s.email || ""
            ).trim().toLowerCase();

            return (
              phone === identifier ||
              email === normalizedIdentifier
            );
          });

          if (!student) {
            return null;
          }

          // -----------------------------
          // Password login
          // -----------------------------

          if (student.passwordHash) {
            const passwordIsValid =
              await bcrypt.compare(
                password,
                String(student.passwordHash)
              );

            if (!passwordIsValid) {
              return null;
            }

            return {
              id: String(student.id),
              role: "student",
              name: student.fullName,
              phone: student.phone,
              email: student.email,
            };
          }

          // -----------------------------
          // Temporary PIN login
          // -----------------------------

          if (
            student.pin &&
            String(student.pin) === password
          ) {
            return {
              id: String(student.id),
              role: "student",
              name: student.fullName,
              phone: student.phone,
              email: student.email,
            };
          }

          return null;
        } catch (err) {
          console.error(
            "Student login failed:",
            err
          );

          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.uid = user.id;
        token.name = user.name;
        token.phone = user.phone;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.uid;
        session.user.name = token.name;
        session.user.phone = token.phone;
        session.user.email = token.email;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};