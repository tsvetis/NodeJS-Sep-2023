const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const PORT = 5050;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const users = {};
const SECRET = "OurBiggestSecret";

app.get("/", (req, res) => {
  const payload = { id: 123, username: "Pesho", age: 23 };
  const secret = "OurBiggestSecret";
  const options = { expiresIn: "3d" };

  //            syncronous code
  const token = jwt.sign(payload, secret, options);
  res.send(token);
});

app.get("/verification/:token", (req, res) => {
  const { token } = req.params;

  //            syncronous code
  const result = jwt.verify(token, "OurBiggestSecret");
  console.log({ result });
  res.send("Ok");
});

app.get("/login", (req, res) => {
  res.send(`
          <h3>Login </h3>
          <form method="post">
              <label for="username">Username</label>
              <input type="text" name="username" />
              <label for="password">Password</label>
              <input type="password" name="password" />
              <input type="submit" value="Submit" />
            </form>`);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const preservedHash = users[username]?.password;

  //                        removes the salt and compares pure hashes
  const isValid = await bcrypt.compare(password, preservedHash);

  if (isValid) {
    // res.send("Successfully Authenticated!");
    const payload = { username };
    jwt.sign(payload, SECRET, { expiresIn: "3d" }, (err, token) => {
      if (err) {
        return res.redirect("/404");
      }

      // Set jwt as cookie
      res.cookie("token", token);
      res.redirect("/profile");
    });
  } else {
    res.status(401).send("Unauthorized! :( ");
  }
});

app.get("/register", (req, res) => {
  res.send(`
          <h3>Register </h3>
          <form method="post">
              <label for="username">Username</label>
              <input type="text" name="username" />
              <label for="password">Password</label>
              <input type="password" name="password" />
              <input type="submit" value="Submit" />
            </form>`);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  users[username] = { password: hash };

  res.redirect("/login");
});

app.get("/profile", async (req, res) => {
  const token = req.cookies["token"];
  console.log({ token });

  if (token) {
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        return res.status(401).send("Unauthorized!");
      }

      return res.send(`Profile: ${payload.username}`);
    });
  } else {
    return res.redirect("/login");
  }
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT} ...`));
