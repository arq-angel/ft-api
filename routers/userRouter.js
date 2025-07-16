import express from "express";
const router = express.Router();
import { insertUser } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcryptjs.js";

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
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// User login

// User profile

export default router;
