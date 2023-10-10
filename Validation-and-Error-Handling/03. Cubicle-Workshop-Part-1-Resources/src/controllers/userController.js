const router = require("express").Router();
const userService = require("../services/userService");
const { extractErrorMsgs } = require("../utils/errorHandle");

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  try {
    await userService.register({ username, password, repeatPassword });
    res.redirect("/users/login");
  } catch (err) {
    const errorMessages = extractErrorMsgs(err);
    res.status(404).render("user/register", { errorMessages });
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
