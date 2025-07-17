import express from "express";
const router = express.Router();
import { insertUser } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptjs.js";
import { getUserByEmail } from "../models/user/UserModel.js";
import { signJWT } from "../utils/jwt.js";
import { auth } from "../middlewares/authMiddleware.js";

// User signup
router.post("/", async (req, res, next) => {
  try {
    // encrypt the password
    req.body.password = hashPassword(req.body.password);

    console.log(req.body);

    // data verification and validation
    // insert the user
    const user = await insertUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "Your account has been created, you may login now",
        })
      : res.json({
          status: "error",
          message: "Error creating user. Please try again later.",
        });
  } catch (error) {
    let msg = error.message;
    if (msg.includes("E11000 duplicate key error collection")) {
      msg =
        "Email has already been used, try to login or use a different email to signup!";
    }
    res.json({
      status: "error",
      message: msg,
    });
  }
});

// User login
router.post("/login", async (req, res, next) => {
  try {
    // 1. receive email and password
    const { email, password } = req.body;

    if (email && password) {
      // 2. find the user by email
      const user = await getUserByEmail(email);
      if (user?._id) {
        // 3. match the password
        const isMatched = comparePassword(password, user.password);

        if (isMatched) {
          // the user is actually authenticated

          // 4. JWT and store the jwt in db then return the user {} with jwt token
          const accessJWT = signJWT({
            email: email,
          });

          user.password = undefined;
          res.json({
            status: "success",
            message: "Logged in successfully",
            user,
            accessJWT,
          });
          return;
        }
      }
    }

    res.status(401).json({
      error: "Invalid email or password",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// User profile from the accessJWT
router.get("/", auth, (req, res, next) => {
  try {
    const user = req.userInfo;

    res.json({
      status: "success",
      message: "Here is the user profile",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
