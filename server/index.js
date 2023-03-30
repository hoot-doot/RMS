import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcrypt";
import crypto from "crypto";
import multer from 'multer';
import path from "path";

const __dirname = path.resolve();

function generateSecret() {
  return crypto.randomBytes(32).toString('hex');
}

// Use an environment variable to store the secret, or generate a new one if it doesn't exist
const secret = process.env.SESSION_SECRET || generateSecret();
const saltRounds = 10;



const app = express();
app.use(cors({
  origin: ["http://localhost:5005"],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret : secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 600,
    },
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#screwed",
  database: "RMS",
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Update the /register route to handle file uploads
app.post('/register', upload.single('picture'), (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const picture = req.file.path;
  console.log('Received data:', req.body, req.file); // Add this line to log the received data
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log('Error hashing password:', err);
      return res.status(500).send({ error: 'Internal Server Error' });
    }

    db.query(
      "INSERT INTO user (firstName, lastName, email, password, picture) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, hash, picture],
      (err, result) => {
        if (err) {
          console.log('Error inserting user into database:', err);
          return res.status(500).send({ error: 'Internal Server Error' });
        }
        res.status(200).send({ message: 'User registered successfully' });
      }
    );
  });
});


app.get("/login", (req, res) => {
  if (req.session.email) {
    res.send({ loggedIn: true, user: req.session.email });
  } else {
    res.send({ loggedIn: false });
  }
});

// app.get("/logout", (req, res) => {
//     res.send({ loggedIn: false });
// });
app.get('/logout', function (req, res, next) {
  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)

    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    })
  })
})

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE email = ?;",
    email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            // console.log(result);
            req.session.email = result;
            console.log(req.session.email);
            res.send(result);
          } else {
            res.send({ message: "Wrong email/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.get("/", (req, res) => {
  res.json("hello");
});
app.post("/contacts", (req, res) => {
  const q = "INSERT INTO contacts(`id`,`name`,`email`,`desc`,`phone`,`address`,`city`,`zipCode`,`registrarId`) VALUES (?)";

  const values = [
    req.body.id,
    req.body.name,
    req.body.email,
    req.body.desc,
    req.body.phone,
    req.body.address,
    req.body.city,
    req.body.zipCode,
    req.body.registrarId  
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.get("/contacts", (req, res) => {
  const q = "SELECT * FROM contacts";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});



app.get('/image/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = __dirname + '/uploads/' + imageName;
  res.sendFile(imagePath);
});



app.listen(8800, () => {
  console.log("Connected to backend.");
});
