const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "Please add your first name!"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9]{2,}$/.test(value);
        },
        message:
          "First name must contain at least 2 non-special and non-whitespace characters!",
      },
    },
    lname: {
      type: String,
      required: [true, "Please add your last name!"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9]{2,}$/.test(value);
        },
        message:
          "Last name must contain at least 2 non-special and non-whitespace characters!",
      },
    },
    email: {
      type: String,
      required: [true, "Please add a valid email!"],
      unique: [true, "Email is already registered!"],
      validate: {
        validator: function (value) {
          return /\S+@\S+\.\S+/.test(value);
        },
        message: "Please enter a valid email address!",
      },
    },
    password: {
      type: String,
      required: [true, "Please add a valid password!"],
      validate: {
        validator: function (value) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
            value
          );
        },
        message:
          "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number!",
      },
    },
    contact: {
      type: String,
      required: [true, "Please add a valid contact number!"],
      validate: {
        validator: function (value) {
          return /^[0-9]{11}$/.test(value);
        },
        message: "Please enter a valid 10-digit contact number!",
      },
    },
    address: {
      type: String,
      required: [true, "Please add your address line 1!"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9]{2,}$/.test(value);
        },
        message:
          "Address must contain at least 2 non-special and non-whitespace characters!",
      },
    },
    city: {
      type: String,
      required: [true, "Please add your city!"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9]{2,}$/.test(value);
        },
        message:
          "City must contain at least 2 non-special and non-whitespace characters!",
      },
    },
    province: {
      type: String,
      required: [true, "Please add your province!"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9]{2,}$/.test(value);
        },
        message:
          "Province must contain at least 2 non-special and non-whitespace characters!",
      },
    },
    postal: {
      type: String,
      required: [true, "Please add a valid postal code!"],
      validate: {
        validator: function (value) {
          return /^[0-9]{4}$/.test(value);
        },
        message: "Please enter a valid 4-digit postal code!",
      },
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema, "userDetails");
