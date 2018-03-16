import React, { Component } from 'react'
// import PropTypes            from 'prop-types'
// import { connect }          from 'react-redux'
// import Nes                  from 'nes'
// import { APP_IP, APP_PORT } from '../path/Conf'
import Store                from '../GlobalStore/Store'
import { loginUser }        from '../actions/auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {user: '', password: ''}
    }
  }
  onChange(event) {
    const field        = event.target.name
    const credentials  = this.state.credentials
    credentials[field] = event.target.value

    return this.setState({credentials: credentials})
  }
  onSave(event) {
    event.preventDefault()
    console.log(this.state.credentials)
    //this.props.onLoginClick(this.state.credentials)
    Store.dispatch( loginUser(this.state.credentials) )
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <input name="user" type="text" value={this.state.credentials.user} placeholder="Username" onChange={this.onChange.bind(this)} />
          <input name="password" type="password" value={this.state.credentials.password} placeholder="Password" onChange={this.onChange.bind(this)} />
        </div>
        <button type="submit" onClick={this.onSave.bind(this)}>Submit</button>
      </form>
    )
  }
}


export default Login