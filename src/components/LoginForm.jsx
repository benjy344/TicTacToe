import React, { Component } from 'react'
import { connect }          from 'react-redux'
import Store                from '../GlobalStore/Store'
import { loginUser, createUser }        from '../actions/auth'

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visibleForm: 'si',
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

  changeForm(form) {
    this.setState({
      visibleForm: form
    })
  }

  render() {
    return (
      <div className="login-wrap">
        <div className="login-html">
          <button className={"sign-in "+(this.state.visibleForm === 'si'?'active':'')} onClick={this.changeForm.bind(this, 'si')} >Sign In</button>
          <button className={"sign-up "+(this.state.visibleForm === 'su'?'active':'')} onClick={this.changeForm.bind(this, 'su')} >Sign Up</button>
          <div className="login-form">
            {this.state.visibleForm === 'si' &&
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user" className="label">Username</label>
                <input className="input" name="user" type="text" value={this.state.credentials.user} placeholder="Username" onChange={this.onChange.bind(this)} />
              </div>
              <div className="group">
                <label htmlFor="password" className="label">Password</label>
                <input className="input" name="password" type="password" value={this.state.credentials.password} placeholder="Password" onChange={this.onChange.bind(this)} />
              </div>
              <div className="group">
                <button type="Sign in" onClick={this.onSave.bind(this)}>Submit</button>
              </div>
            </div>}

            {this.state.visibleForm === 'su' &&
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="username" className="label">Username</label>
                <input className="input" name="username" type="text" value={this.state.newCredentials.username} placeholder="Username" onChange={this.onChangeNew.bind(this)} />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Password</label>
                <input className="input" name="password" type="password" value={this.state.newCredentials.password} placeholder="Password" onChange={this.onChangeNew.bind(this)} />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Email Address</label>
                <input className="input" name="email" type="email" value={this.state.newCredentials.email} placeholder="Email" onChange={this.onChangeNew.bind(this)} />
              </div>
              <div className="group">
                <button type="submit" onClick={this.onSaveNew.bind(this)}>Submit</button>
              </div>
              <div className="foot-lnk">
                <button onClick={this.changeForm.bind(this, 'si')}>Already Member?</button>
              </div>
            </div>}
          </div>
        </div>
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