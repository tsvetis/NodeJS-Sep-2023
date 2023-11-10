const router = require("express").Router();
const userService = require("../services/userService");

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res, next) => {
  const { username, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    const error = new Error("Passwords do not match!");
    error.statusCode = 400;
    return next(error);
}

  try {
    await userService.register({username, password, repeatPassword});
    res.redirect("/users/login");
  } catch(error){
    next(error);
  }
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const token = await userService.login(username, password);

  res.cookie("auth", token, { httpOnly: true });
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
