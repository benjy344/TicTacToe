import React, { Component } from 'react'
import Nes                  from 'nes'
import jwt                  from 'jsonwebtoken'
import { APP_IP, APP_PORT } from '../../path/Conf'
import SelectPlayer         from './SelectPlayer'
import Store                from '../../GlobalStore/Store'
import {addPlayer}          from '../../actions/gameConfig'

class Saloon extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      player: jwt.verify(localStorage.getItem('id_token'), 'patate'),
      players: []
    }
  }

  loadSaloon() {
    this.setState({
      loading: true
    })
    const socket = `ws://${APP_IP}:${APP_PORT}`
    const client = new Nes.Client(socket)

    client.connect({ auth: { headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') } } }, err => {
        if (err) {
          return console.log('err connecting', err)
        }
        client.onUpdate = update => {
          if(update.iat) {
            if(this.state.player.iat !== update.iat) {
              let alreadyExist = false
              for (let i = 0, len = this.state.players.length; i < len; i++) {
                const player = this.state.players[i];
                if(player.iat === update.iat) alreadyExist = true
              }
              if(!alreadyExist) {
                client.request('wait', (err, data, statusCode) => {
                  if(err) console.log(err)
                })
                let temp = this.state.players
                temp.push(update)
                this.setState({
                  players: temp,
                  loading: false
                })
              }
            }
          }
        }
        client.request('wait', (err, data, statusCode) => {
          if(err) console.log(err)
        })
        //client.subscribe('/wait', handler)
    })
  }

  selectPlayer(player2) {
    Store.dispatch(addPlayer(player2))
  }

  renderLoading() {
    if(this.state.loading && this.state.players.length === 0) {
      return(<span>Loading</span>)
    } else if (this.state.players.length > 0) {
      return(
        <ul>
        {this.state.players.map((data, index) => (
          <SelectPlayer  key={index} id={index} player={data} selectPlayer={this.selectPlayer.bind(this)}/>
        ))}
        </ul>

      )
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