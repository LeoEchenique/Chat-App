const router = require("express").Router();
const usertCtrl = require("../controllers/UserController");

router.get("/", (req, res) => {
  res.send("nice");
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    let user = await usertCtrl.post(username, password, email);
    res.send(user);
  } catch (error) {
    res.status(409).send(error.message);
  }
});

module.exports = router;
