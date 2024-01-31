import asyncHandler from "express-async-handler";
import { User, Record, GameType } from "../models/dbModel.js";

// @desc    Create new user record for according game
// @access  Private
// @params  {gameId, score}

const createUserRecord = asyncHandler(async (req, res, next) => {
  const { gameId } = req.body;
  const gameExists = await GameType.findOne({ gameId });

  if (gameExists) {
    const recordExists = await Record.findOne({ gameId, userId: req.user._id });
    if (!recordExists) {
      await Record.create({
        userId: req.user._id,
        userName: req.user.name,
        gameId,
        highestScore: 0,
        clearTime: 0,
        clearDate: new Date(),
        gameStatistics: [],
      });
    }
    next();
  } else {
    res.status(403).json({
      msg: `something went wrong`,
    });
  }
});

// @desc    update user record for according game
// @access  Private
// @params  {gameId, score}

const updateHighestRecord = asyncHandler(async (req, res, next) => {
  const { gameId, score } = req.body;
  const record = await Record.findOne({ gameId, userId: req.user._id });
  let modified = false;

  switch (gameId) {
    case "memoryGame":
      if (record.highestScore == 0) {
        modified = true;
      }
      if (record.highestScore > score) {
        modified = true;
      }
      break;

    case "towerGame":
    case "simonGame":
    case "clickGame":
    case "typeGame":
    case "jumpGame":
      if (record.highestScore == 0) {
        modified = true;
      }
      if (record.highestScore < score) {
        modified = true;
      }
      break;
  }
  if (modified) {
    record.highestScore = score;
    record.clearDate = new Date();
    await record.save();
  }

  next();
});

// @desc    Update user record upon profile modification.
// @access  Private
// @params

const updateUserRecord = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;
    const records = await Record.find({ userId: req.user._id });

    if (records) {
      records.forEach(async (record) => {
        record.userName = name;
        await record.save(); // Save the updated record
      });
    }

    next();
  } catch (error) {
    // Handle errors, e.g., send an error response or log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { createUserRecord, updateHighestRecord, updateUserRecord };
