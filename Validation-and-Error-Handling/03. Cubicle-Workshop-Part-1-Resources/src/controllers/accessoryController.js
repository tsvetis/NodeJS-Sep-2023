const router = require("express").Router();
const accessoryService = require("./../services/accessoryService");

router.get("/create", (req, res) => {
  res.render("accessory/create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl } = req.body;

  await accessoryService.create({ name, description, imageUrl });

  res.redirect("/");
});

module.exports = router;
