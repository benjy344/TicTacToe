import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'
import jwt                  from 'jsonwebtoken'
import Nes                  from 'nes'

import { APP_IP, APP_PORT } from '../path/Conf'

import { addPlayer }        from '../actions/gameConfig'
import { updateGame }       from '../actions/game'

import Board                from './game/Board'
import Store                from '../GlobalStore/Store'


class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: {
        X:this.props.game.player1,
        O:this.props.game.player2
      },
      loading: true
    }
  }

  componentWillMount() {
    if(this.props.player2 === null ) {
      Store.dispatch(addPlayer(this.props.game.player1))
      setTimeout(() =>{
        this.setState({
          loading: false
        })
      }, 1000)

    } else {
      this.setState({
        loading: false
      })
    }
  }

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
  }

  handleClick(i) {
    if(!this.isPlayerTurn() || this.props.game.winner ) return
    const history = this.props.game.history.slice(0, this.props.game.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if(squares[i]) return

    const config = {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') },
      body: JSON.stringify({
        gameId: this.props.game.id,
        player1: jwt.verify(localStorage.getItem('id_token'), 'patate'),
        player2: this.props.player2,
        history,
        current,
        squares,
        xIsNext:this.props.game.xIsNext,
        click: i
      })
    }

    fetch(`http://${APP_IP}:${APP_PORT}/game/play`, config)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {console.log('error play =>', err)})
  }

  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: (step % 2) === 0
  //   })
  // }

  isPlayerTurn() {
    return (this.props.game.xIsNext && this.state.players.X === jwt.verify(localStorage.getItem('id_token'), 'patate').id) || (!this.props.game.xIsNext && this.state.players.O === jwt.verify(localStorage.getItem('id_token'), 'patate').id)
  }

  render() {
    const history = this.props.game.history
    const current = history[this.props.game.stepNumber]
    const winner  = this.props.game.winner

    // const moves = history.map((step, move) => {
    //   // <ol>{moves}</ol>
    //   const desc = move ?
    //     'Go to move #' + move :
    //     'Go to game start'
    //   return (
    //     <li key={move}>
    //       <button onClick={() => this.jumpTo(move)}>{desc}</button>
    //     </li>
    //   )
    // })

    let status
    if(!this.state.loading){
      if (winner) {
        if(winner.equality) {
          status = "It's a equality"
        }else if(winner === this.props.player2.id) {
          status = "Winner: " + this.props.player2.pseudo
        } else {
          status = "You Win !"
        }
      } else {
        if( this.isPlayerTurn() ) {
          status = "Is your turn"
        } else {
          status = this.props.player2.pseudo + " is playing ..."
        }
      }
    }


    return (
      <div className="gameContainer">
        {this.state.loading &&
          <span className="loading">
            <svg id="load" x="0px" y="0px" viewBox="0 0 75 75">
            <circle id="loading-inner" cx="37" cy="37" r="30"/>
            </svg>
          </span>
        }
        {!this.state.loading &&
        <div>
          <div className={"game-board "+ (winner&&winner.line?'winnerLine'+winner.line:'')}>
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className={"game-info "+(status==='Is your turn'?'top':'')}>
            <div>{status}</div>
          </div>
        </div>
        }
      </div>
    )
  }
}

Game.propTypes = {
  isAuthenticated: PropTypes.bool,
  singlePlayer:    PropTypes.bool,
  level:           PropTypes.number,
  player:          PropTypes.string,
  player2:         PropTypes.object,
  game:            PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    singlePlayer:    state.gameConfig.singlePlayer,
    level:           state.gameConfig.level,
    player:          state.gameConfig.player,
    player2:         state.gameConfig.player2,
    game:            state.game
  }
}

export default connect(mapStateToProps)(Game)