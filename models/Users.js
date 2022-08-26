const { Schema, model } = require("mongoose");
const { emailValidation } = require("../utils/email-validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      get: (email) => emailValidation(email),
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.reduce((total, friends) => total + friends.length + 1, 0);
});

const User = model("User", userSchema);

module.exports = User;
