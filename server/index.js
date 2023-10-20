import express from "express";
import mongoose from "mongoose";
import UserModelModel from "./Models/Users.js";
import cors from "cors";
import UserModel from "./Models/Users.js";
import BlogModel from "./Models/Blog.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createTokens, validateToken } from "./JWT.js";
import cookieParser from "cookie-parser";

const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//connection string
const connectstring =
  "mongodb+srv://admin:admin12345@cluster0.4i7dhn3.mongodb.net/userDb?retryWrites=true&w=majority";

mongoose.connect(connectstring, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name: name,
      email: email,
      password: hashedpassword,
    });

    await user.save();
    res.send({ user: user, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({ email: email });

    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    //Send as cookie in the browser
    res.cookie("access-token", token, {
      maxAge: 3600,
      httpOnly: true,
    });

    res.status(200).json({ user, token, message: "Success." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/dashboard", validateToken, (req, res) => {
  res.send("Dashboard");
});
app.get("/gallery", validateToken, (req, res) => {
  if (req.authenticated) res.send("Dashboard");
  else {
    res.send("Not authenticated");
  }
});
app.post("/logout", (req, res) => {
  res.clearCookie("access-token");

  res.status(200).json({ message: "Logged out successfully" });
});

app.get("/user", async (req, res) => {
  /*Mongoose version 6.0 and abover*/
  await UserModel.find()
    .then(async function (result) {
      //console.log(result);
      const countUser = await UserModel.countDocuments({});
      res.send({ result, count: countUser });
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Delete route

/*---------API ROUTES FOR BLOG----------- */

app.post("/blogpost", async (req, res) => {
  try {
    const msg = req.body.msg;
    const email = req.body.email;

    const post = new BlogModel({
      msg: msg,
      email: email,
    });

    await post.save();
    res.send({ posts: post, msg: "Post Created." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/getPosts/:email", async (req, res) => {
  /*Mongoose version 6.0 and above*/
  const useremail = req.params.email;
  console.log(useremail);
  try {
    const posts = await BlogModel.find({ email: useremail });
    const countPost = await BlogModel.countDocuments({});
    res.send({ posts, count: countPost });
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/displayPosts", async (req, res) => {
  /*Mongoose version 6.0 and above*/
  try {
    const posts = await BlogModel.find({});
    const countPost = await BlogModel.countDocuments({});
    res.send({ posts, count: countPost });
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.delete("/deletepost/:id/", async (req, res) => {
  const { id, email } = req.params;
  await BlogModel.findByIdAndRemove(id).exec();
  const countPosts = await BlogModel.countDocuments({});
  res.send({ msg: "Item Deleted", count: countPosts });
});

app.listen(3001, () => {
  console.log("You are connected.");
});
