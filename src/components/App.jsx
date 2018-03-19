import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'
//import Nes                  from 'nes'
import { APP_IP, APP_PORT } from '../path/Conf'

import Login                from './Login'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConnect: false
    }
  }

  componentDidMount() {
    // const socket = `ws://${APP_IP}:${APP_PORT}`
    // const client = new Nes.Client(socket)

    // client.connect(err => {
    //   if (err) {
    //     return console.log('err connecting', err)
    //   }
    //   client.onUpdate = update => this.setState(update)
    // })

    fetch(`http://${APP_IP}:${APP_PORT}/users`)
    .then(data => {
      data.json()
      console.log(data)
    })
    //.then(json => this.setState(json))
    .catch(err => console.log(err))
  }

  getUser() {
    console.log('getusers')
    fetch(`http://${APP_IP}:${APP_PORT}/users`)
    .then(data => {
      //data.json()
      console.log(data)
    })
    //.then(json => this.setState(json))
    .catch(err => console.log(err))

  }

  render() {
    return (
      <div>
        <Login />
        <button onClick={this.getUser.bind(this)}>get user </button>
      </div>
    )
 }
}

App.propTypes = {
  dispatch:        PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage:    PropTypes.string
}

App.defaultProps = {
  isAuthenticated: false,
  errorMessage:    ""
}

const mapStateToProps = (state, ownProps) => {
  const { auth } = state
  const { isAuthenticated, errorMessage } = auth

  return {
    isAuthenticated,
    errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)