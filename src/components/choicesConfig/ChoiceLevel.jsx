import React, { Component } from 'react'

class ConfigGame extends Component {

  constructor(props) {
    super(props)

  }

  changeLevel(level) {
    this.props.changeLevel(level)
  }

  changePlayer(player) {
    this.props.changePlayer(player)
  }

  render() {
    return(
      <div>
        <div className="radio">
          <label>
            <input type="radio" value="1" checked={this.props.level === 1} onChange={this.changeLevel.bind(this, 1)} />
            Easy
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="2" checked={this.props.level === 2} onChange={this.changeLevel.bind(this, 2)} />
            Medium
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="3" checked={this.props.level === 3} onChange={this.changeLevel.bind(this, 3)} />
            Hard
          </label>
        </div>
        <div>
          <div className="radio">
            <label>
              <input type="radio" value="cross" checked={this.props.player === 'cross'} onChange={this.changePlayer.bind(this, 'cross')} />
              X
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="circle" checked={this.props.player === 'circle'} onChange={this.changePlayer.bind(this, 'circle')} />
              O
            </label>
          </div>
        </div>
      </div>
    )
  }
}

export default ConfigGame