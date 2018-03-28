import React, { Component } from 'react'
import Nes                  from 'nes'
import jwt                  from 'jsonwebtoken'
import _                    from 'lodash'
import { APP_IP, APP_PORT } from '../../path/Conf'
import SelectPlayer         from './SelectPlayer'
import Store                from '../../GlobalStore/Store'
import {addPlayer}          from '../../actions/gameConfig'

class Saloon extends Component {

  constructor(props) {
    super(props)
    const socket = `ws://${APP_IP}:${APP_PORT}`
    this.client = new Nes.Client(socket)
    this.state = {
      loading: false,
      player: jwt.verify(localStorage.getItem('id_token'), 'patate'),
      players: [],
      selectedPlayer: null
    }
  }

  loadSaloon() {
    this.setState({
      loading: true
    })


    this.client.connect({ auth: { headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') } } }, err => {
        if (err) {
          return console.log('err connecting', err)
        }
        this.client.onUpdate = update => {
          console.log(update)
          if(update.disconnect) {
            const newUsers = _.filter(this.state.players, (player) => {
              return player.iat !== update.creds.iat
            })
            this.setState({
              players: newUsers,
              loading: (newUsers.length === 0)
            })
          }
          if(update.iat) {
            if(this.state.player.iat !== update.iat) {
              let alreadyExist = false
              for (let i = 0, len = this.state.players.length; i < len; i++) {
                const player = this.state.players[i];
                if(player.iat === update.iat) alreadyExist = true
              }
              if(!alreadyExist) {
                this.client.request('wait', (err, data, statusCode) => {
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
        this.client.request('wait', (err, data, statusCode) => {
          if(err) console.log(err)
        })
    })
  }

  componentWillUnmount() {
    this.client.request('quit', (err, data, statusCode) => {
      if(err) console.log(err)
      this.client.disconnect()
    })


  }

  selectPlayer(player2) {
    this.setState({
      selectedPlayer:player2.id
    })
    Store.dispatch(addPlayer(player2))
  }

  renderLoading() {
    if(this.state.loading && this.state.players.length === 0) {
      return(<span className="loading">
          <svg id="load" x="0px" y="0px" viewBox="0 0 75 75">
          <circle id="loading-inner" cx="37" cy="37" r="30"/>
          </svg>
        </span>)
    } else if (this.state.players.length > 0) {
      return(
        <div className="players">
        {this.state.players.map((data, index) => (
          <SelectPlayer key={index} id={index} player={data} selectPlayer={this.selectPlayer.bind(this)} selected={this.state.selectedPlayer} />
        ))}
        </div>

      )
    } else {
      return(<button className="loadSaloon" onClick={this.loadSaloon.bind(this)} >Loading Players</button>)
    }
  }

  render() {
    return(
      <div className="formGroup" >
        { this.renderLoading() }

        {this.render.player}

      </div>
    )
  }
}

export default Saloon