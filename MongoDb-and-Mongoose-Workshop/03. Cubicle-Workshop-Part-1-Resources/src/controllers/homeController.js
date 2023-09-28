const router = require("express").Router();
const cubeService = require("../services/cubeService");

router.get("/", (req, res) => {
  const { search, from, to } = req.query;
  const cubes = cubeService.getAll(search, from, to);
  res.render("index", { cubes, search, from, to });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
