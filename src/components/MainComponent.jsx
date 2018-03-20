import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'
//import Store                from '../GlobalStore/Store'
import { logoutUser }       from '../actions/auth'
import ConfigGame           from './ConfigGame'
import Game                 from './Game'

class MainComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startGame: false,
      singlePlayer: true,
      level: 1,
      player: 'cross',
      player2: null
    }
  }

  changeSingle(single) {
    this.setState({
      singlePlayer: single
    })
  }

  changeLevel(level) {
    this.setState({
      level: level
    })
  }

  changePlayer(player) {
    this.setState({
      player: player
    })
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
          level={this.state.level}
          singlePlayer={this.state.singlePlayer}
          player={this.state.player}
          player2={this.state.player2}
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
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(MainComponent)

