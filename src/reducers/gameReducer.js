
import {
  NEW_GAME, HANDLE_CLICK, ERROR_GAME
} from '../actions/game'

export const initialState = {
    id: null,
    player1: null,
    player2: null,
    history:  [
      {
        squares: [null, null, null, null, null, null, null, null, null, null]
      }
    ],
    xIsNext: true,
    stepNumber: 0,
    errorMessage: ''
}

export function game(state = initialState, action) {
  switch (action.type) {

  case NEW_GAME:
    return Object.assign({}, state, {
      id: action.id,
      player1: action.player1,
      player2: action.player2
    })
  case ERROR_GAME:
    return Object.assign({}, state, {
      id: null,
      player1: null,
      player2: null,
      errorMessage: action.errorMessage
    })

  default:
    return state
  }
}