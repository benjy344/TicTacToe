import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'
import jwt                  from 'jsonwebtoken'
import Nes                  from 'nes'
import Store                from '../GlobalStore/Store'
import {  changeNumberPlayer,
          changeLevel,
          changePlayer,
          addPlayer }       from '../actions/gameConfig'
import {  newGame,
          createGameSuccess}from '../actions/game'
import ConfigGame           from './ConfigGame'
import Game                 from './Game'
import { APP_IP, APP_PORT } from '../path/Conf'
import IaGame               from './IaGame.jsx'



class MainComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startGame: false,
      playIaGame: false
    }
  }

  componentDidMount() {
    if(!this.props.game.ia || !this.props.game.ia.enabled) {
      const socket = `ws://${APP_IP}:${APP_PORT}`
      const client = new Nes.Client(socket)

      const handler = (update, flags) => {
        if(update._id){
          Store.dispatch(createGameSuccess(update))
          this.setState({
            startGame: true
          })
        }
      }

      client.connect({ auth: { headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') } } }, err => {
          if (err) {
            return console.log('err connecting', err)
          }
          client.subscribe('/game/start/'+jwt.verify(localStorage.getItem('id_token'), 'patate').id, handler, (err)=> {
            if(err) console.log(err)
        })
      })
    }

  }

  changeSingle(single) {
    Store.dispatch(changeNumberPlayer(single))
  }

  changeLevel(level) {
    Store.dispatch(changeLevel(level))
  }

  changePlayer(player) {
    Store.dispatch(changePlayer(player))
  }

  addPlayer(player) {
    Store.dispatch(addPlayer(player))
  }

  play() {
    let player1 = jwt.verify(localStorage.getItem('id_token'), 'patate').id
    let player2 = (this.props.player2?this.props.player2.id: 'ia')

    Store.dispatch(newGame(player1, player2))
    if(player2 === 'ia') {
      this.setState({
        playIaGame: true
      })
    }
  }
  goBack() {
    this.setState({
      playIaGame: false,
      startGame: false
    })
  }

  render() {
    return (
      <div>
        {(!this.state.startGame && !this.state.playIaGame) &&
        <ConfigGame
          changeSingle={this.changeSingle.bind(this)}
          changeLevel={this.changeLevel.bind(this)}
          changePlayer={this.changePlayer.bind(this)}
          addPlayer={this.addPlayer.bind(this)}
          level={this.props.level}
          singlePlayer={this.props.singlePlayer}
          player={this.props.player}
          player2={this.props.player2}
          play={this.play.bind(this)}
        />}
        {this.state.startGame &&
          <Game />}
        {this.state.playIaGame &&
          <IaGame />}
        {(this.state.startGame || this.state.playIaGame) &&
          <button onClick={this.goBack.bind(this)}>Retour</button>}
      </div>

    )
  }
}

MainComponent.propTypes = {
  isAuthenticated: PropTypes.bool,
  singlePlayer:    PropTypes.bool,
  level:           PropTypes.number,
  player:          PropTypes.string,
  player2:         PropTypes.object
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

export default connect(mapStateToProps)(MainComponent)

