const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    profilePicture: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true },
    language: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    dobDate: { type: String, required: true },
    dobMonth: { type: String, required: true },
    dobYear: { type: String, required: true },
    tob: { type: String, required: true },
    isTobAm: { type: Boolean, required: true },
    acceptedTc: { type: Boolean, required: true },
    isActive: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false },
    createDate: {
      type: Date,
      required: true,
      default: () => {
        return new Date();
      },
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

exports.User = User;
