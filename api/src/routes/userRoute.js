const router = require("express").Router();
const usertCtrl = require("../controllers/UserController");

router.get("/", (req, res) => {
  res.send("nice");
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    let user = await usertCtrl.post(username, password, email);
    console.log("user", user)
    res.send(user);
  } catch (error) {
    console.log("yaz")
    res.status(402).send(error.message);
  }
});

module.exports = router;
