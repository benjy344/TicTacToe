import React, { Component } from 'react'
import PropTypes            from 'prop-types'

export default class Logout extends Component {

  render() {
    const { onLogoutClick } = this.props

    return (
      <button className="logoutButton" onClick={() => onLogoutClick()} >
        <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" >

          <path id="XMLID_3_" className="whitesvg" d="M75,16v1.3c9,7.4,15.7,19,15.7,32c0,22.4-18.2,40.6-40.6,40.6S9.4,71.7,9.4,49.4
            c0-13,6.6-24.6,15.6-32V16C15,23.6,8.3,35.7,8.3,49.4C8.3,72.3,27,90.9,50,90.9s41.7-18.7,41.7-41.6C91.6,35.7,85,23.6,75,16z"/>
          <rect id="XMLID_1_" x="49.5" y="4.2" className="whitesvg" width="1" height="52.4"/>
          </svg>
      </button>
    )
  }

}
Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
}