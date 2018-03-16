import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

let gameSchema = new Schema({
  date: Date,
  history: [
        {
          squares: {type:Array, default: [null, null, null, null, null, null, null, null, null, null]}
        }
      ]
})

export default Mongoose.model('games', gameSchema)