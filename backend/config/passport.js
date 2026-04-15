const passport =require("passport") ;
const GoogleStrategy= require("passport-google-oauth20")  ;
const User= require("../models/user.js")
const jwt= require("jsonwebtoken")  ;

console.log("Client ID Check:", process.env.GOOGLE_CLIENT_ID);

passport.use(
    
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "google_oauth", // dummy
          });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return done(null, { user, token });
      } catch (error) {
        done(error, null);
      }
    }
  )
);
passport.serializeUser((data, done) => {
  done(null, data);
});

passport.deserializeUser((data, done) => {
  done(null, data);
});

module.exports=passport;