const spotifyRouter = require("express").Router();
const session = require("express-session");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const consolidate = require("consolidate");
require("dotenv").config();

const authCallbackPath = "/auth/spotify/callback";
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const port = process.env.PORT;

let token = "";

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:" + port + authCallbackPath,
    },

    function (accessToken, refreshToken, expires_in, profile, done) {
      // this sets the token to our env.
      process.env.TOKEN = accessToken;

      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

spotifyRouter.use(
  session({ secret: "olivias pool", resave: true, saveUninitialized: true })
);

spotifyRouter.use(passport.initialize());
spotifyRouter.use(passport.session());

// gets the info about current logged in user
spotifyRouter.get("/user", (req, res) => {
  console.log("TOKENTOKENTOKEN", process.env.TOKEN);
  res.send({ user: req.user });
});

spotifyRouter.get("/token", (req, res) => {
  res.send(process.env.TOKEN);
});

// unsure about this bc we have our react app running
// spotifyRouter.get('/account', ensureAuth, (req, res) => {
//   res.render
// })

// grabbing info based on the available scopes;
spotifyRouter.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
    showDialog: true,
  })
);

spotifyRouter.get(
  authCallbackPath,
  passport.authenticate("spotify"),
  // { failureRedirect: "/" },
  (req, res) => {
    res.redirect("/test");
  }
);

module.exports = spotifyRouter;
