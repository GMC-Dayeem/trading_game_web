
// gameModel.mjs
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  // players: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  // isActive: {
  //   type: Boolean,
  //   default: true,
  // },
  initialCash: {
    type: Number,
    required: true,
  },
  transactionFee: {
    type: Number,
    required: false,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true }); // Add timestamps to each document.

const Game = mongoose.model('Game', gameSchema);

export default Game;
