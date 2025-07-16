import UserSchema from "./UserSchema.js";

// C
export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};

// R

// U

// D
