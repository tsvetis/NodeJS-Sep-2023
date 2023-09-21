const express = require("express");
const handlebars = require("express-handlebars");
const SERVER_PORT = 5050;
const path = require("path");
const app = express();

const { getKittens, addKitten } = require("./kittens");

// View Engine
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");

/** MIDDLEWARE start*/
// third-party middleware
const bodyParser = express.urlencoded({ extended: false });
app.use(bodyParser);

const staticFile = express.static("public");
app.use(staticFile);

// global middleware
app.use((req, res, next) => {
  console.log(`HTTP Request: ${req.method}, Request Path: ${req.path}`);
  next();
});

// partial routing middleware
app.use("/kittens", (req, res, next) => {
  console.log("Kittens Middleware has been invoked!");
  next();
});

// concrete routing middleware
const specificMiddleware = (req, res, next) => {
  console.log("This is the specific routes MIDDLEWARE");
  next(); // next is important
};

/** MIDDLEWARE end*/

/** ROUTING start */

// app HTTP methods - get, post, put, patch, delete (the most used...)
app.get("/", (req, res) => {
  //   res.send("Welcome, this is the home page!");
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/specific", specificMiddleware, (req, res) => {
  res.send("This is specific route! :)");
});

// !DONT DO THIS
// app.get("/public/css/style.css", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public/css", "style.css"));
// });

// Ednpoint -> method, path, ACTION
// get - method
// "/kittens" - path, route
// action = (req, res)=> {}
app.get("/kittens", (req, res) => {
  const kittens = getKittens();
  res.render("kittens", { kittens });
});

app.get("/kittens/:kittenId", (req, res) => {
  const kittenId = Number(req.params.kittenId);
  if (!kittenId) {
    res.status(404).send("Bad kitten id: " + req.params.kittenId);
    return;
  }
  console.log(req.params);

  // Is not invokeking, because the RESPONSE stream has been closed in the upper line.
  res.send({ id: kittenId, name: "Kircho" + kittenId });
});

app.post("/kittens", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = Number(req.body.age);
  addKitten(name, age);
  res.send("Kitten has been created!");
});

app.get("/download-png", (req, res) => {
  // ? Ends the stream by itself
  //   res.download("./postman.png"); // downloads
  // ? You need to end the stream, because you can attach multiple files.
  //   res.attachment("./postman.png");
  //   res.end();
  //   res.sendFile(path.resolve(__dirname, "./postman.png"));
});

app.get("/route-that-will-be-redirected", (req, res) => {
  //
  res.redirect("/kittens");
});

// WILDCARD *
app.get("*", (req, res) => {
  res.status(404).send("Sorry, page is not found :(");
});
/** ROUTING end */

// Listening on port
app.listen(SERVER_PORT, () =>
  console.log(`Server is running on port: ${SERVER_PORT}`)
);
