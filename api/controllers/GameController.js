import Mongoose from 'mongoose'
import Game     from '../../models/gameModel.js'

const GameController = {

  createGame: (req, cb) => {
    const p1 = req.payload.player1
    const p2 = req.payload.player2
    console.log(p1, p2)
    const game = new Game({
      date: new Date(),
      player1: p1,
      player2: p2
    })

    game.save((err, game) => {
      if(err) {
        console.log(err)
        return cb(null, {errorMessage: "error"})
      }

      return cb(game)
    })
  }

}

export default GameController