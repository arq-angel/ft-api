import TransactionSchema from "./TransactionSchema.js";

// C
export const insertTransaction = (userObj) => {
  return TransactionSchema(userObj).save();
};

// R
export const getTransactions = (userId) => {
  if (!userId) {
    throw new Error("userId is required!");
  }

  return TransactionSchema.find({ userId });
};

// U

// D
export const deleteTransactions = (userId, idsToDelete) => {
  if (!userId) {
    throw new Error("userId is required!");
  }

  return TransactionSchema.deleteMany({
    userId,
    _id: { $in: idsToDelete },
  });
};
