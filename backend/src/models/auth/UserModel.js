import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      index: true, // Indexing for faster search
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please add a valid email",
      ],
      index: true, // Index for fast lookup
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
    },

    photo: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/19819005?v=4",
    },

    bio: {
      type: String,
      default: "I am a new user.",
    },

    role: {
      type: String,
      enum: ["user", "admin", "creator"],
      default: "user",
      index: true, // Indexing role for efficient filtering
    },

    isVerified: {
      type: Boolean,
      default: false,
      index: true, // Useful if filtering by verification status
    },
  },
  { timestamps: true, minimize: true }
);

// Creating a compound index for email and role
UserSchema.index({ email: 1, role: 1 });

// Hash the password before saving
UserSchema.pre("save", async function (next) {
  // Check if the password is not modified
  if (!this.isModified("password")) {
    return next();
  }

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
