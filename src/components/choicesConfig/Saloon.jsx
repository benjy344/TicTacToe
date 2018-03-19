import React, { Component } from 'react'

class Saloon extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      players: []
    }
  }

  loadSaloon() {
    this.setState({
      loading: true
    })
    console.log('LOADING SALOON')
  }

  renderLoading() {
    if(this.state.loading) {
      return(<span>Loading</span>)
    } else {
      return(<button onClick={this.loadSaloon.bind(this)} >Loading Players</button>)
    }
  }

  render() {
    return(
      <div>
        { this.renderLoading() }

        {this.render.player}

      </div>
    )
  }
}

export default Saloon