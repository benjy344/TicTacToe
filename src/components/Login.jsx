import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'
//import Store                from '../GlobalStore/Store'
import { logoutUser }       from '../actions/auth'

import LoginForm from './LoginForm'
import Logout    from './Logout'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {user: '', password: ''}
    }
  }

  render() {
    return (this.props.isAuthenticated ? <Logout onLogoutClick={() => this.props.dispatch(logoutUser()) }/> : <LoginForm />
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Login)

