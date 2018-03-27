import React, { Component } from 'react'

class ConfigGame extends Component {

  changeLevel(level) {
    this.props.changeLevel(level)
  }

  changePlayer(player) {
    this.props.changePlayer(player)
  }

  render() {
    return(
      <div>
        <div className="formGroup" >
          <h3>Level</h3>
          <div className={"radio easy " +(this.props.level === 1?'checked':'')}>
            <input
              type="radio"
              value="1"
              checked={this.props.level === 1}
              onChange={this.changeLevel.bind(this, 1)}
            />
            <label onClick={this.changeLevel.bind(this, 1)} htmlFor="1" ></label>
            <span onClick={this.changeLevel.bind(this, 1)}>Easy</span>
          </div>

          <div className={"radio medium " +(this.props.level === 2?'checked':'')}>
            <input
              type="radio"
              value="2"
              checked={this.props.level === 2}
              onChange={this.changeLevel.bind(this, 2)}
            />
            <label onClick={this.changeLevel.bind(this, 2)} htmlFor="2" ></label>
            <span onClick={this.changeLevel.bind(this, 2)}>Medium</span>
          </div>

          <div className={"radio hard " +(this.props.level === 3?'checked':'')}>
            <input
              type="radio"
              value="1"
              checked={this.props.level === 3}
              onChange={this.changeLevel.bind(this, 3)}
            />
            <label onClick={this.changeLevel.bind(this, 3)} htmlFor="1" ></label>
            <span onClick={this.changeLevel.bind(this, 3)}>Hard</span>
          </div>
        </div>
        <div className="formGroup" >
          <h3>Shape</h3>
          <div className={"radio cross " +(this.props.player === 'cross'?'checked':'')}>
            <input
              type="radio"
              value="cross"
              checked={this.props.player === 'cross'}
              onChange={this.changePlayer.bind(this, 'cross')}
            />
            <label onClick={this.changePlayer.bind(this, 'cross')} htmlFor="cross" ></label>
            <span onClick={this.changePlayer.bind(this, 'cross')}>Cross</span>
          </div>

          <div className={"radio cicle " +(this.props.player === 'circle'?'checked':'')}>
            <input
              type="radio"
              value="circle"
              checked={this.props.player === 'circle'}
              onChange={this.changePlayer.bind(this, 'circle')}
            />
            <label onClick={this.changePlayer.bind(this, 'circle')} htmlFor="circle" ></label>
            <span onClick={this.changePlayer.bind(this, 'circle')}>Circle</span>
          </div>

        </div>
      </div>
    )
  }
}

export default ConfigGame