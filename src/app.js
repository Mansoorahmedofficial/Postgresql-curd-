const dot = require("dotenv").config({ path: "./env" });
const cookieParser = require("cookie-parser");
const express = require("express");
const { CommandCompleteMessage } = require("pg-protocol/dist/messages");
const UserRoute = require("./routers/user.auth");
const CreatePost = require("./routers/post.route");
const app = express();
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
app.set(express.urlencoded({ extended: false }));
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/post", CreatePost);
module.exports = {
  app,
};
