//import Joi from 'joi'

import { APP_IP, APP_PORT } from '../path/Conf'

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'



function requestLogin(creds) {
  console.log("requestLogin")
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

  let config = {
    method: 'POST',
    body: JSON.stringify({
      username: creds.user,
      password: creds.password
    })
  }
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return fetch(`http://${APP_IP}:${APP_PORT}/session/create`, config)
    .then( (response) => {
      response.json()
      .then(user => ({ user, response })).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      })

    })
    .catch(err => console.log("Error: ", err))

  }
}


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'


