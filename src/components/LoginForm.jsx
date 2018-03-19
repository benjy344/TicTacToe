import React, { Component } from 'react'
import { connect }          from 'react-redux'
import Store                from '../GlobalStore/Store'
import { loginUser }        from '../actions/auth'

class LoginForm extends Component {

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
    Store.dispatch( loginUser(this.state.credentials) )
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
      <form>
        <div className="form-group">
        <input name="user" type="text" value={this.state.credentials.user} placeholder="Username" onChange={this.onChange.bind(this)} />
        <input name="password" type="password" value={this.state.credentials.password} placeholder="Password" onChange={this.onChange.bind(this)} />
        </div>
        <button type="submit" onClick={this.onSave.bind(this)}>Submit</button>
        {this.errorMessage()}
      </form>
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