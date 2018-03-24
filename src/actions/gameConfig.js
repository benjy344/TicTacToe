import { APP_IP, APP_PORT } from '../path/Conf'

export const CHANGE_NUMBER_PLAYER = 'CHANGE_NUMBER_PLAYER'
export const CHANGE_LEVEL         = 'CHANGE_LEVEL'
export const CHANGE_PLAYER        = 'CHANGE_PLAYER'
export const ADD_PLAYER           = 'ADD_PLAYER'

export function changeNumberPlayer(number) {
  return {
    type: CHANGE_NUMBER_PLAYER,
    singlePlayer: number
  }
}

export function changeLevel(level) {
  return {
    type: CHANGE_LEVEL,
    level: level
  }
}

export function changePlayer(player) {
  return {
    type: CHANGE_PLAYER,
    player: player
  }
}

export function addPlayer(player2) {
  if(player2.id || player2._id) {
    if(player2._id) {
      player2.id = player2._id
    }
    return {
      type: ADD_PLAYER,
      player2: player2
    }
  } else {
    const config = {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') }
    }
    return dispatch => {
      return fetch(`http://${APP_IP}:${APP_PORT}/users/${player2}`, config)
        .then((response) => {
          response.json()
          .then(player2 => ({ player2, response })).then(({ player2, response }) =>  {
            if(!response.ok) {
              console.log(player2.errorMessage)
              return Promise.reject(player2)
            } else {
              dispatch(addPlayer(player2))
            }
          })
        }).catch(err => console.log("Error: ", err))
    }
  }

}

