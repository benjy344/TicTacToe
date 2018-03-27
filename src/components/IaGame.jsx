import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'
import jwt                  from 'jsonwebtoken'
import Nes                  from 'nes'

import { APP_IP, APP_PORT } from '../path/Conf'

import { updateGame }       from '../actions/game'

import Board                from './game/Board'
import Store                from '../GlobalStore/Store'

import IA                   from '../ia/Ia'
import iaState              from '../ia/State'


class IaGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ia: {}
    }
  }

  componentWillMount

  componentDidMount() {

    const socket = `ws://${APP_IP}:${APP_PORT}`
    const client = new Nes.Client(socket)

    const handler = (update, flags) => {
      if(update) {
        Store.dispatch(updateGame(update))
      }
    }

    client.connect({ auth: { headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') } } }, err => {
      if (err) {
        return console.log('err connecting', err)
      }
      client.subscribe('/game/play/'+jwt.verify(localStorage.getItem('id_token'), 'patate').id, handler, (err)=> {
        if(err) console.log(err)
      })
    })

    const ia                = new IA(this.props.level)
    ia.currentState         = new iaState()
    ia.currentState.squares = Array(9).fill(null)
    ia.currentState.turn    = "X"

    this.setState({
      ia
    })

  }

  handleClick(i) {
    if( this.props.game.winner ) return
    const history = this.props.game.history.slice(0, this.props.game.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if(squares[i]) return

    squares[i] = "X"
    let iaClick = null
    if(history.length < 5){
      const next = new iaState(this.state.ia.currentState)
      next.squares[i] = "X"
      next.advanceTurn()
      this.state.ia.advanceTo(next)
      iaClick = this.state.ia.notify('O', squares)
      if(iaClick != null) squares[iaClick] = "O"
    }

    const config = {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') },
      body: JSON.stringify({
        gameId: this.props.game.id,
        player1: this.props.game.player1,
        history,
        current,
        squares,
        click: i,
        iaClick: iaClick
      })
    }

    fetch(`http://${APP_IP}:${APP_PORT}/game/playIa`, config)
    .then((response, data, a, b, c) => {
      console.log(response, data, a, b, c)
    })
    .catch((err) => {console.log('error play =>', err)})
  }

  isPlayerTurn() {
    return (this.props.game.xIsNext && this.state.players.X === jwt.verify(localStorage.getItem('id_token'), 'patate').id) || (!this.props.game.xIsNext && this.state.players.O === jwt.verify(localStorage.getItem('id_token'), 'patate').id)
  }

  render() {
    const history = this.props.game.history
    const current = history[this.props.game.stepNumber]
    const winner  = this.props.game.winner

    let status
    if (winner) {
      if(winner.equality) {
        status = "Equality"
      } else {
        status = "Winner: " + winner
      }

    } else {
      if(history.length === 10) {
        status = "Egality"
      } else {
        status = "Next player: " + (this.props.game.xIsNext ? "X" : "O")
      }
    }


    return (
      <div className="game">
        <div>
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
          </div>
        </div>
      </div>
    )
  }
}

IaGame.propTypes = {
  isAuthenticated: PropTypes.bool,
  singlePlayer:    PropTypes.bool,
  level:           PropTypes.number,
  player:          PropTypes.string,
  game:            PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    singlePlayer:    state.gameConfig.singlePlayer,
    level:           state.gameConfig.level,
    player:          state.gameConfig.player,
    game:            state.game
  }
}

export default connect(mapStateToProps)(IaGame)