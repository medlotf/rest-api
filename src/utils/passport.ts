import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import db from "./../db";
import { generateToken } from "./generateToken";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/authentication/google/callback",
    },
    async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
      try {
        let user = await db.user.findFirst({
          where: { googleId: profile.id },
        });
        if (!user) {
          user = await db.user.create({
            data: {
              email: profile.emails?.[0].value!,
              username: profile.displayName,
              googleId: profile.id,
            },
          });
        }
        const token = generateToken(user.id);
        return done(null, { user, token });
      } catch (error) {
        done(error);
      }
    }
  )
);
