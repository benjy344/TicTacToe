import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'
//import Nes                  from 'nes'
import Store                from '../GlobalStore/Store'
import { APP_IP, APP_PORT } from '../path/Conf'

import { logoutUser }       from '../actions/auth'

import Login                from './Login'
import MainComponent        from './MainComponent'

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

    // fetch(`http://${APP_IP}:${APP_PORT}/users`)
    // .then(data => {
    //   data.json()
    //   console.log(data)
    // })
    // //.then(json => this.setState(json))
    // .catch(err => console.log(err))
  }

  getUser() {
    console.log('getusers')
    fetch(`http://${APP_IP}:${APP_PORT}/users`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
    })
    .then(data => {
      //data.json()
      if(!data.ok) {
        Store.dispatch(logoutUser())
      }
      console.log('data', data)
    })
    //.then(json => this.setState(json))
    .catch(err => console.log('err',err))

  }

  returnMain() {
    if(this.props.isAuthenticated) return (<MainComponent />)
  }

  render() {
    return (
      <div>
        <Login />
        {this.returnMain()}
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