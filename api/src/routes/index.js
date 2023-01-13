const router = require("express").Router();

const userRouter = require("./userRoute");

router.use("/log", userRouter);

module.exports = router;
