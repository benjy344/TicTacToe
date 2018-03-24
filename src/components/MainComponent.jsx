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


class MainComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startGame: false
    }
  }

  componentDidMount() {
    const socket = `ws://${APP_IP}:${APP_PORT}`
    const client = new Nes.Client(socket)

    const handler = (update, flags) => {
      console.log(update)
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
        client.subscribe('/game/start/'+jwt.verify(localStorage.getItem('id_token'), 'patate').id, handler)
    })
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
    let player2 = this.props.player2.id

    Store.dispatch(newGame(player1, player2))
  }

  render() {
    return (
      <div>
        {!this.state.startGame &&
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
    player2:         state.gameConfig.player2
  }
}

export default connect(mapStateToProps)(MainComponent)

