import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

let gameSchema = new Schema({
  date: Date,
  player1: Mongoose.Schema.Types.ObjectId,
  player2: Mongoose.Schema.Types.ObjectId,
  ia: {
    enabled: { type: Boolean, default: false },
    level: { type: Number, default: 1 }
  },
  history: [
    {
      squares: {type: Array, default: [null, null, null, null, null, null, null, null, null, null]}
    }
  ],
  winner: {},
  stepNumber: { type: Number, default: 0 },
  xIsNext: {type: Boolean, default: true }
})

export default Mongoose.model('games', gameSchema)