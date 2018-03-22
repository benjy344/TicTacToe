import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'
import Nes                  from 'nes'
import Store                from '../GlobalStore/Store'
import { logoutUser }       from '../actions/auth'
import {  changeNumberPlayer,
          changeLevel,
          changePlayer,
          addPlayer }       from '../actions/game'
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
    console.log(client)
    client.connect(err => {
        if (err) {
            return console.log('err connecting', err)
        }
        client.onUpdate = update => {
          console.log('-----', update)
        }
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
    this.setState({
      startGame: true
    })
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
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    isAuthenticated: state.auth.isAuthenticated,
    singlePlayer:    state.game.singlePlayer,
    level:           state.game.level,
    player:          state.game.player,
    player2:         state.game.player2
  }
}

export default connect(mapStateToProps)(MainComponent)

