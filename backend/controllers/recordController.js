import asyncHandler from "express-async-handler";
import { User, Record, GameType } from "../models/dbModel.js";

// @desc    Post new user record for game.
// route    POST /api/record/createRecord
// @access  Private

const addUserRecord = asyncHandler(async (req, res) => {
  const { gameId, score } = req.body;
  const record = await Record.findOne({ gameId, userId: req.user._id });
  if (record.gameStatistics.length > 50) {
    record.gameStatistics.shift();
  }
  try {
    record.gameStatistics.push({
      score,
      clearDate: new Date(),
    });

    await record.save();

    res.status(200).json({
      record,
    });
  } catch (err) {
    res.status(400).json({
      msg: `failed adding gamestatistics`,
    });
  }
});

// @desc    Get user records for according game
// route    Get /api/record/
// @access  Private

const getUserRecord = asyncHandler(async (req, res) => {
  const { gameId } = req.body;
  try {
    const record = await Record.findOne({
      gameId,
      userId: req.user._id,
    }).select("highestScore clearDate gameStatistics");

    if (!record) {
      return res.status(204).json({
        msg: `No records found in ${gameId} for the user`,
      });
    }

    let totalScore = 0;
    let totalTime = 0;
    let totalEntries = 0;

    if (record.gameStatistics && record.gameStatistics.length > 0) {
      record.gameStatistics.forEach((entry) => {
        totalScore += entry.score || 0;
        totalTime += entry.clearTime || 0;
        totalEntries += 1; // Increment for each entry
      });
    }

    const averageScore = totalEntries > 0 ? totalScore / totalEntries : 0;
    const averagePlaytime = totalEntries > 0 ? totalTime / totalEntries : 0;

    res.status(200).json({
      highestScore: record.highestScore,
      clearDate: record.clearDate,
      gameStatistics: record.gameStatistics,
      averageScore,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// @desc    Get top 10 all records for according game
// route    Get /:gameId/top10
// @access  public

const getTop10 = asyncHandler(async (req, res) => {
  const gameId = req.params.gameId;
  try {
    let records;
    switch (gameId) {
      case "memoryGame":
        records = await Record.find({ gameId })
          .limit(10)
          .sort({ highestScore: 1 })
          .select("userName highestScore clearTime clearDate");
        break;
      default:
        records = await Record.find({ gameId })
          .limit(10)
          .sort({ highestScore: -1 })
          .select("userName highestScore clearTime clearDate");
        break;
    }
    res.status(200).json({
      records,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Failed retrieving records",
    });
  }
});

// @desc    Get all records for according game
// route    Get /:gameId
// @access  public

const getAllGameRecord = asyncHandler(async (req, res) => {
  const gameId = req.params.gameId;
  try {
    let records;
    switch (gameId) {
      case "memoryGame":
        records = await Record.find({ gameId })
          .sort({ highestScore: 1 })
          .select("highestScore");
        break;
      case "towerGame":
      case "simonGame":
      case "clickGame":
      case "typeGame":
      case "jumpGame":
        records = await Record.find({ gameId })
          .sort({ highestScore: -1 })
          .select("highestScore");
        break;
      default:
        break;
    }
    res.status(200).json({
      records,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Failed retrieving records",
    });
  }
});

export { addUserRecord, getUserRecord, getTop10, getAllGameRecord };
