import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'
//import Store                from '../GlobalStore/Store'
import { logoutUser }       from '../actions/auth'
import ConfigGame           from './ConfigGame'

class MainComponent extends Component {

  render() {
    return (
      <div>
        <ConfigGame />
      </div>

    )
  }
}

MainComponent.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(MainComponent)

