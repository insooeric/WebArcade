import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

const gameTypeSchema = mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true,
  },
});
const GameType = mongoose.model("GameType", gameTypeSchema);

const recordSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  gameId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: false,
  },
  highestScore: {
    type: Number,
    required: false,
  },
  clearTime: {
    type: Number,
    required: false,
  },
  clearDate: {
    type: Date,
    required: false,
  },
  gameStatistics: [
    {
      score: {
        type: Number,
        required: false,
      },
      displayScore: {
        type: String,
        required: false,
      },
      clearTime: {
        type: Number,
        required: false,
      },
      clearDate: {
        type: Date,
        required: false,
      },
    },
  ],
});

const Record = mongoose.model("Record", recordSchema);

export { User, GameType, Record };
