import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import expenseRoutes from './routes/expenseroutes.js';
import db from './db.js';
import flash from 'connect-flash';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const app = express();
const saltRounds = 10;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


db.connect();


app.use(bodyParser.json());
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.use('/api/expenses', expenseRoutes);

// Middleware to serve static files from the 'Frontend' directory
app.use(express.static(join(__dirname, "Frontend")));

// Middleware to serve static files from the 'Public' directory
app.use(express.static(join(__dirname, "Public")));

// Middleware to serve static files from the 'Register' directory
app.use(express.static(join(__dirname, "Register")));

// Middleware to serve static files from the 'Login  ' directory
app.use(express.static(join(__dirname, "Login")));

// Route to serve the home page
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "Public", "homepage.html"));
});

// Route to serve the registration page
app.get("/register", (req, res) => {
  res.sendFile(join(__dirname, "Register", "register.html"));
});

app.get("/login", (req, res) => {
  // Send the login.html file as the response
  res.sendFile(join(__dirname, "Login", "login.html"));
});

app.get("/expense", (req, res) => {
  // Send the login.html file as the response
  res.sendFile(join(__dirname, "Frontend", "expense.html"));
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


// Route to handle form submission
app.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE users = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send(`
      <script>
          alert("Email-Id already exists!Try logging In..");
          window.location.href = "/login.html";
      </script>
      `);
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          await db.query(
            "INSERT INTO users (users, password) VALUES ($1, $2)",
            [email, hash]
          );
        //   Send response to redirect to GitHub with an alert
        res.send(`
    <script>
        alert("Registration successful!");
        window.location.href = "/expense.html";
    </script>
    `);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }

});


passport.use(
  'local',
  new Strategy({ usernameField: 'email', passReqToCallback: true }, async function(req, email, password, done) {
    try {
      const result = await db.query('SELECT * FROM users WHERE users = $1', [email]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        const valid = await bcrypt.compare(password, storedHashedPassword);
        if (valid) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      } else {
        return done(null, false, { message: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      return done(err);
    }
  })
);

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      if (info.message === 'Incorrect password') {
        return res.send(`
          <script>
            alert("Incorrect password!");
            window.location.href = "/login";
          </script>
        `);
      }
      if (info.message === 'User not found') {
        return res.send(`
          <script>
            alert("User not found! Signup first.");
            window.location.href = "/register";
          </script>
        `);
      }
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/expense');
    });
  })(req, res, next);
});


passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query("SELECT * FROM users WHERE users = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (users, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/expense');
  }
);

app.get('/expense', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public', 'expense.html'));
  } else {
    res.redirect('/login');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
