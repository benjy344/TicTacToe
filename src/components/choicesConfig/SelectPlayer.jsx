import React, { Component } from 'react'

class SelectPlayer extends Component {

  select(player) {
    this.props.selectPlayer(player)
  }

  render () {
    return(
      <button onClick={this.select.bind(this, this.props.player)} className={(this.props.selected === this.props.player.id?'selected':'')}>
        {this.props.player.pseudo}
      </button>
    )
  }
}

export default SelectPlayer