import React, { Component } from 'react'

import ChoiceLevel          from './choicesConfig/ChoiceLevel'
import Saloon               from './choicesConfig/Saloon'

class ConfigGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

  renderChooseStep2() {
    if(this.state.singlePlayer) {
      return(
        <div>
          <ChoiceLevel level={this.state.level} player={this.state.player} changeLevel={ this.changeLevel.bind(this) } changePlayer={ this.changePlayer.bind(this) }/>
        </div>
      )

    } else {
      return <Saloon />
    }
  }
  play() {
    console.log('play')
  }


  render() {
    return(
      <div>
        <h2>config</h2>
        <div>
          <div className="radio">
            <label>
              <input type="radio" value="single" checked={this.state.singlePlayer} onChange={this.changeSingle.bind(this, true)} />
              Single Player
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="multi" checked={!this.state.singlePlayer} onChange={this.changeSingle.bind(this, false)} />
              Multiplayer
            </label>
          </div>
        </div>
        {this.renderChooseStep2()}
        <button onClick={this.play.bind(this)} disabled={!this.state.singlePlayer && this.state.player2 === null} >Play</button>
      </div>

    )
  }
}

export default ConfigGame