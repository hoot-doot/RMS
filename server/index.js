import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcrypt";
import crypto from "crypto";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import otpGenerator from "otp-generator";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let otpValue = null;
let otpResetSession = false;
dotenv.config();

function generateSecret() {
  return crypto.randomBytes(32).toString("hex");
}

// function localVariables(req, res, next){
//   req.app.locals = {
//     OTP : null,
//     otpResetSession : false
//   }
//   next()
// }

// Use an environment variable to store the secret, or generate a new one if it doesn't exist
const secret = process.env.SESSION_SECRET || generateSecret();
const saltRounds = 10;

const app = express();
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(
  cors({
    origin: ["http://localhost:5002"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(localVariables);

app.use(
  session({
    key: "userId",
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 600,
    },
  })
);

const db = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,
});

db.on("error", (error) => {
  console.error(error);
});

db.connect((error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log("Connected to database");
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Update the /register route to handle file uploads
app.post("/register", upload.single("picture"), (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const picturePath = req.file.path;
  const picture = path.basename(picturePath);
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log("Error hashing password:", err);
      return res.status(500).send({ error: "Internal Server Error" });
    }
    const query = `SELECT * FROM user WHERE email='${email}'`;
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }
      console.log(results);

      if (results.length > 0) {
        // If the username is taken, return an error message
        console.log(results);
        res.send({ message: "Email already used!" });
      } else {
        // If the username is available, insert the new user into the database
        db.query(
          "INSERT INTO user (firstName, lastName, email, password, picture, privilege) VALUES (?, ?, ?, ?, ?, ?)",
          [firstName, lastName, email, hash, picture, "admin"],
          (err, result) => {
            if (err) {
              console.log("Error inserting user into database:", err);
              return res.status(500).send({ error: "Internal Server Error" });
            }
            // Return a success message
            res.status(201).json({ message: "User created successfully" });
          }
        );
      }
    });
  });
});

app.get("/login", (req, res) => {
  if (req.session.email) {
    res.send({ loggedIn: true, user: req.session.email });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/logout", function (req, res, next) {
  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);

    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect("/");
    });
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM user WHERE email = ?;", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          if (result[0].privilege === "admin") {
            req.session.email = result;
            console.log(req.session.email);
            const users = result.map(
              ({ firstName, lastName, email, picture }) => ({
                firstName,
                lastName,
                email,
                picture,
              })
            );
            res.send(users);
          } else {
            res.send({ message: "You don't have admin privilege!" });
          }
        } else {
          res.send({ message: "Wrong email/password combination!" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

app.get("/", (req, res) => {
  res.json("hello");
});
app.post("/contacts", (req, res) => {
  const q =
    "INSERT INTO contacts( `name`,`email`,`desc`,`phone`,`address`,`city`,`zipCode`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.desc,
    req.body.phone,
    req.body.address,
    req.body.city,
    req.body.zipCode,
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

app.post("/invoices", (req, res) => {
  const q =
    "INSERT INTO invoices( `name`,`email`,`cost`,`phone`,`date`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.cost,
    req.body.phone,
    req.body.date,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/invoices", (req, res) => {
  const q = "SELECT * FROM invoices";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/menu", async (req, res) => {
  const imageUrl = await getRandomImageUrl(req.body.name);
  const q = "INSERT INTO menu( `name`,`sold`,`cost`,`type`,`url`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.sold,
    req.body.cost,
    req.body.type,
    imageUrl,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/menu", (req, res) => {
  const q = "SELECT * FROM menu";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get('/menu/top5', (req, res) => {
  const query = 'SELECT id, name, sold FROM menu ORDER BY sold DESC LIMIT 5';
  db.query(query, (error, results, fields) => {
    if (error) throw error;

    // format the results
    const formattedResults = results.map((item, index) => {
      return {
        id: item.sold,
        label: item.name,
        value: item.sold,
        color: "hsl(152, 100%, 50%)"
      };
    });

    res.json(formattedResults);
  });
});

app.post("/team", async (req, res) => {
  const q = "INSERT INTO team( `name`,`email`,`age`,`phone` ) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.phone,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/team", (req, res) => {
  const q = "SELECT * FROM team";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
app.get("/transactions", (req, res) => {
  const q = "SELECT * FROM transactions";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "public", "assets", imageName);
  res.sendFile(imagePath);
});

app.post("/mail", async (req, res) => {
  const { email } = req.body;
  try {
    // Check if email exists in database
    db.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      function (error, results) {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: "Email not found" });
        }
        // Generate OTP
        otpValue = otpGenerator.generate(6, {
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });

        let config = {
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
          },
        };
        // Create transporter
        let transporter = nodemailer.createTransport(config);
        let MailGenerator = new Mailgen({
          theme: "default",
          product: {
            name: "Cosmo Cafe",
            link: "https://mailgen.js/",
          },
        });
        let response = {
          body: {
            name: email,
            intro: [
              "Please use the following OTP to reset your password.",
              otpValue,
            ],
            outro: "Looking forward to working with you, Cosmo Cafe",
            copyright: "Copyright © 2023 Cosmo. All rights reserved.",
          },
        };
        let mail = MailGenerator.generate(response);
        let message = {
          from: "Cosmo Cafe",
          to: email,
          subject: "Password Reset OTP",
          html: mail,
        };

        transporter
          .sendMail(message)
          .then(() => {
            return res.status(201).json({
              msg: "you should receive an email",
            });
          })
          .catch((error) => {
            `                               `;
            return res.status(500).json({ error });
          });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.get("/verify-otp", async (req, res) => {
  const { code } = req.query;
  console.log(otpValue);
  console.log(parseInt(code));
  if (parseInt(otpValue) === parseInt(code)) {
    otpValue = null; // reset the OTP value
    otpResetSession = true; // start session for reset password
    return res.status(201).send({ msg: "Verify Successsfully!" });
  }
  return res.send({ err: "Invalid OTP" });
});

app.get("/create-reset-session", async (req, res) => {
  if (otpResetSession) {
    return res.send({ flag: otpResetSession });
  }
  return res.status(440).send({ message: "Session expired!" });
});

app.put("/reset-password", async (req, res) => {
  try {
    if (!otpResetSession)
      return res.status(440).send({ message: "Session expired!" });
    const { email, password } = req.body;

    try {
      // Find user by email
      db.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        async function (error, results, fields) {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
          }
          if (results.length === 0) {
            return res.status(404).json({ message: "Email not found" });
          }
          // Hash password
          const hashedPassword = await bcrypt.hash(password, saltRounds);

          // Update user password
          db.query("UPDATE user SET password = ? WHERE email = ?", [
            hashedPassword,
            email,
          ]);

          // Reset session
          otpResetSession = false;

          // Send response
          res.send({ msg: "Record Updated...!" });
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send({ error });
  }
});

async function getRandomImageUrl(searchTerm) {
  const apiKey = "GonhbRYylIx2aS8Kz8GnXNQwGOhhDHgp2tb8VC4CatVgZveb0HK1PGqi";
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=1`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );
    return response.data.photos[0].src.original;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching random image");
  }
}

app.listen(8800, () => {
  console.log("Connected to backend.");
});
