import React, { Component } from 'react'

import ChoiceLevel          from './choicesConfig/ChoiceLevel'
import Saloon               from './choicesConfig/Saloon'

class ConfigGame extends Component {

  changeSingle(single) {
    this.props.changeSingle(single)
  }

  changeLevel(level) {
    this.props.changeLevel(level)
  }

  changePlayer(player) {
    this.props.changePlayer(player)
  }

  renderChooseStep2() {
    if(this.props.singlePlayer) {
      return(
        <div >
          <ChoiceLevel
            level={this.props.level}
            player={this.props.player}
            changeLevel={ this.changeLevel.bind(this) }
            changePlayer={ this.changePlayer.bind(this) }
          />
        </div>
      )

    } else {
      return <Saloon />
    }
  }


  play() {
    this.props.play()
  }


  render() {
    return(
      <div>
        <h2>Configuration</h2>
        <div className="formGroup">
          <h3>Number of player</h3>
          <div className={"radio single " +(this.props.singlePlayer?'checked':'')}>
            <input
              type="radio"
              value="single"
              checked={this.props.singlePlayer}
              onChange={this.changeSingle.bind(this, true)}
            />
            <label onClick={this.changeSingle.bind(this, true)} htmlFor="single" ></label>
            <span onClick={this.changeSingle.bind(this, true)}>Single Player</span>
          </div>
          <div className={"radio multi " +(!this.props.singlePlayer?'checked':'')}>
            <input
              type="radio"
              value="multi"
              checked={!this.props.singlePlayer}
              onChange={this.changeSingle.bind(this, false)}
            />
            <label onClick={this.changeSingle.bind(this, false)} htmlFor="multi"></label>
            <span onClick={this.changeSingle.bind(this, false)} >Multiplayer</span>
          </div>
        </div>
        {this.renderChooseStep2()}
        <button className="playButton" onClick={this.play.bind(this)} disabled={!this.props.singlePlayer && this.props.player2 === null} >Play</button>
      </div>

    )
  }
}

export default ConfigGame