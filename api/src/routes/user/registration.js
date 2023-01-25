const router = require("express").Router();
const usertCtrl = require("../../controllers/UserController");
const { authenticateReq } = require("../../middlewares/auth");
//now can pass the middleware to authenticate the req by his access token

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    let signedUser = await usertCtrl.logUser(username, password);
    res.send(signedUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let user = await usertCtrl.postUser(username, password, email);
    res.send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put("/register/avatar", authenticateReq, async (req, res) => {
  const { avatarImg } = req.body;
  const { id } = req.user;

  console.log(id, "route");
  try {
    let user = await usertCtrl.putUserAvatar(avatarImg, id);
    return res.send(user);
  } catch (error) {
    res.status(409).send(error.message);
  }
});

router.get("/user/", authenticateReq, async (req, res) => {
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
