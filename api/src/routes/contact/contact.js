const router = require("express").Router();
const { authenticateReq } = require("../../middlewares/auth");
const User = require("../../models/User");
router.get("/all", authenticateReq, async (req, res) => {
  let user = await User.find({});

  res.send(user);
});

module.exports = router;
