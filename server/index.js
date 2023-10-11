import express from "express";
import mongoose from "mongoose";
import UserModelModel from "./Models/Users.js";
import cors from "cors";
import UserModel from "./Models/Users.js";
import jwt from 'jsonwebtoken'
import bcrypt  from 'bcrypt'



const app = express();
//middlewares
app.use(cors());
app.use(express.json());

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
    const password=eq.body.password;
    const hashedpassword = await bcrypt.hash(password,10);

    const user = new UserModel({
      name: name,
      email: email,
      password: password,
    });

    await user.save();
    res.send("Added.");
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    //console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;

    /*Mongoose version 6.0 and abover*/
    await UserModel.findOne({ email: email })
      .then(async function (user) {
        //console.log(result);
        if (!user) {
          return res.status(401).json({ user, error: "Authentication failed" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res.status(401).json({ error: "Authentication failed" });
        }

        const token = jwt.sign({ userId: user._id }, "your-secret-key", {
          expiresIn: "1h",
        });

        res.status(200).json({ token }); 
        res.send({ user: user, message: "Success." });
      })
      .catch(function (err) {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
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

app.listen(3001, () => {
  console.log("You are connected.");
});
