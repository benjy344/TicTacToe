import Mongoose from 'mongoose'
import Game     from '../../models/gameModel.js'

const GameController = {

  createGame: (req, cb) => {
    const p1 = req.payload.player1
    const p2 = req.payload.player2
    if(p2 !== 'ia'){
      Game.find({'$or': [{player1:p1, player2:p2}, {player1:p2, player2:p1}]})
      .sort({date: 1}).then((games, err) => {
        if(err) console.log('error get games', err)
        if((games.length && games[0].winner) || (!games.length) ) {
          const newGame = new Game({
            date: new Date(),
            player1: p1,
            player2: p2,
            history: [
              {
                squares: Array(9).fill(null)
              }
            ]
          })

          newGame.save((err, newGame) => {
            if(err) {
              console.log(err)
              cb(null, {errorMessage: "error"})
              return
            }
            cb(newGame)
            return
          })
        } else {
          console.log('return unfinished last game')
          cb(games[0])
          return
        }
      })
    } else {
      const newGame = new Game({
        date: new Date(),
        player1: p1,
        ia: {
          enabled: true,
          level: 1
        },
        history: [
          {
            squares: Array(9).fill(null)
          }
        ]
      })
      newGame.save((err, newGame) => {
        if(err) {
          console.log(err)
          cb(null, {errorMessage: "error"})
          return
        }
        cb(newGame)
        return
      })
    }

  },

  play: (req, cb) => {
    const payload = JSON.parse(req.payload)
    const gameId  = payload.gameId
    const player1 = payload.player1
    const player2 = payload.player2
    const history = payload.history
    const current = payload.current
    const squares = payload.squares
    const xIsNext = payload.xIsNext
    const click   = payload.click


    squares[click] = xIsNext ? "X" : "O"
    const newHistory = history.concat(
      [
        {
          squares
        }
      ])

    const calculateWinner = GameController.calculateWinner(squares)

    if (calculateWinner) {
      // set the winner
      //return

      Game.findOneAndUpdate(
        {
          '_id': gameId
        }, {
          '$set' : {
            winner: (calculateWinner==="X"?player1:player2),
            history: newHistory,
            stepNumber: history.length,
            xIsNext: !xIsNext
           }
        },{new: true} )
      .then( (game, err)=> {
        if(err) console.log('error get game =>', err)
        cb(game)
        return
      })

    } else {

      Game.findOneAndUpdate(
      {
        '_id': gameId
      }, {
        '$set' : {
          history: newHistory,
          stepNumber: history.length,
          xIsNext: !xIsNext
         }
      }, {new: true} )
      .then( (game, err)=> {
        if(err) console.log('error get game =>', err)
        cb(game)
        return
      })
    }
  },

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }
}

export default GameController

