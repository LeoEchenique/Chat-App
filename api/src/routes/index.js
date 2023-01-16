const router = require("express").Router();

const userRouter = require("./user/registration");
const chatRouter = require("./chat/chat");
const contactRouter = require("./contact/contact");

router.use("/log", userRouter);
router.use("/chat", chatRouter);
router.use("/contact", contactRouter);

module.exports = router;
