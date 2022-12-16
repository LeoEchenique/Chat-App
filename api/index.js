const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("HI THERE!")
})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongoDB connected"))


app.listen(process.env.PORT || 3001, () => console.log(`server listening on port ${process.env.PORT}`))

