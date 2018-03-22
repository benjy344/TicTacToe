import React, { Component } from 'react'
import { connect }          from 'react-redux'
import Store                from '../GlobalStore/Store'
import { loginUser, createUser }        from '../actions/auth'

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      credentials: {user: '', password: ''},
      newCredentials: {username: '', password: '', email:''}
    }
  }

  onChange(event) {
    const field        = event.target.name
    const credentials  = this.state.credentials
    credentials[field] = event.target.value

    return this.setState({credentials: credentials})
  }
  onChangeNew(event) {
    const field        = event.target.name
    const credentials  = this.state.newCredentials
    credentials[field] = event.target.value

    return this.setState({newCredentials: credentials})
  }

  onSave(event) {
    event.preventDefault()
    Store.dispatch( loginUser(this.state.credentials) )
  }
  onSaveNew(event) {
    event.preventDefault()
    Store.dispatch( createUser(this.state.newCredentials) )
  }

  errorMessage() {
    if(this.props.errorMessage) {
      return (
        <div>
          <p>{this.props.errorMessage}</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
          <input name="user" type="text" value={this.state.credentials.user} placeholder="Username" onChange={this.onChange.bind(this)} />
          <input name="password" type="password" value={this.state.credentials.password} placeholder="Password" onChange={this.onChange.bind(this)} />
          </div>
          <button type="submit" onClick={this.onSave.bind(this)}>Submit</button>
          {this.errorMessage()}
        </form>
        <form>
          <div className="form-group">
          <input name="username" type="text" value={this.state.newCredentials.username} placeholder="Username" onChange={this.onChangeNew.bind(this)} />
          <input name="email" type="email" value={this.state.newCredentials.email} placeholder="Email" onChange={this.onChangeNew.bind(this)} />
          <input name="password" type="password" value={this.state.newCredentials.password} placeholder="Password" onChange={this.onChangeNew.bind(this)} />
          </div>
          <button type="submit" onClick={this.onSaveNew.bind(this)}>Submit</button>
        </form>
      </div>
    )

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps)(LoginForm)