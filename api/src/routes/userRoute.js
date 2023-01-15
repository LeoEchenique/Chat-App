const router = require("express").Router();
const usertCtrl = require("../controllers/UserController");

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let user = await usertCtrl.postUser(username, password, email);
    res.send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put("/register/avatar", async (req, res) => {
  const { avatarImg, id } = req.query;
  try {
    let user = await usertCtrl.putUserAvatar(avatarImg, id);
    return res.send(user);
  } catch (error) {
    res.status(409).send(error.message);
  }
});

router.get("/user/", async (req, res) => {
  // this route should belong to another route file
  let { id } = req.query;
  try {
    let user = await usertCtrl.getById(id);
    res.send(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
});
module.exports = router;
