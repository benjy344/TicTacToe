
import {
  CHANGE_NUMBER_PLAYER, CHANGE_LEVEL, CHANGE_PLAYER
} from '../actions/game'

export const initialState = {
    startGame: false,
    singlePlayer: true,
    level: 1,
    player: 'cross',
    player2: null
}

export function game(state = initialState, action) {
  switch (action.type) {

  case CHANGE_NUMBER_PLAYER:
    return Object.assign({}, state, {
      singlePlayer: action.singlePlayer
    })
  case CHANGE_LEVEL:
    return Object.assign({}, state, {
      level: action.level
    })
  case CHANGE_PLAYER:
    return Object.assign({}, state, {
      player: action.player
    })

  default:
    return state
  }
}