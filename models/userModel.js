import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

let userSchema = new Schema({
  pseudo: String,
  password: String,
  games: [{ status: String, date: Date}]
})

export default Mongoose.model('users', userSchema)