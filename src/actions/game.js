import { APP_IP, APP_PORT } from '../path/Conf'

export const NEW_GAME     = 'NEW_GAME'
export const HANDLE_CLICK = 'HANDLE_CLICK'
export const ERROR_GAME   = 'ERROR_GAME'


function gameError(message) {
  return {
    type: ERROR_GAME,
    errorMessage: message
  }
}
 function createGameSuccess(game) {
  return {
    type: NEW_GAME,
    id: game._id,
    player1: game.player1,
    player2: game.player2
  }
 }


export function newGame(player1, player2) {
  const config = {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') },
    body: JSON.stringify({
      player1: player1,
      player2: player2
    })
  }
  return dispatch => {
    return fetch(`http://${APP_IP}:${APP_PORT}/game/create`, config)
    .then( (response) => {
      response.json()
      .then(game => ({ game, response })).then(({ game, response }) =>  {
        if(!response.ok) {
          dispatch(gameError(game.errorMessage))
          return Promise.reject(game)
        } else {
          dispatch(createGameSuccess(game))

          fetch(`http://${APP_IP}:${APP_PORT}/game/start`, config)
          .then((response) => {console.log(response)})
          .catch(err => console.log("Error: ", err))
        }
      })
    })
    .catch(err => console.log("Error: ", err))
  }




  // return {
  //   type: NEW_GAME,
  //   id: id
  //   player1: player1
  //   player2: player2
  // }
}

export function handleClick(history) {
  return {
    type: HANDLE_CLICK,
    history: history
  }
}



