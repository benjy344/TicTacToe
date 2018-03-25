import { APP_IP, APP_PORT } from '../path/Conf'

export const NEW_GAME     = 'NEW_GAME'
export const UPDATE_GAME  = 'UPDATE_GAME'
export const HANDLE_CLICK = 'HANDLE_CLICK'
export const ERROR_GAME   = 'ERROR_GAME'


function gameError(message) {
  return {
    type: ERROR_GAME,
    errorMessage: message
  }
}
export function createGameSuccess(game) {
  return {
    type: NEW_GAME,
    id: game._id,
    ia: game.ia,
    player1: game.player1,
    player2: game.player2,
    history: game.history,
    xIsNext: game.xIsNext,
    stepNumber: game.stepNumber,
    winner: game.winner
  }
}

export function updateGame(game) {
  return {
    type: UPDATE_GAME,
    id: game._id,
    player1: game.player1,
    player2: game.player2,
    history: game.history,
    xIsNext: game.xIsNext,
    stepNumber: game.stepNumber,
    winner: game.winner
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
      const game = response.json()
      if(!response.ok) {
        dispatch(gameError(game.errorMessage))
        throw game.errorMessage
      }
      return game
    })
    .then(game => {
      dispatch(createGameSuccess(game))

      if(!game.ia.enabled) {
        const configStart = {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') },
          body: JSON.stringify({
            player1: player1,
            player2: player2,
            game: game
          })
        }

        fetch(`http://${APP_IP}:${APP_PORT}/game/start`, configStart)
        .then((response) => {console.log(response)})
        .catch(err => console.log("Error: ", err))
      }

    })
    .catch(err => console.log("Error: ", err))
  }
}



