import {
  CHANGE_NUMBER_PLAYER, CHANGE_LEVEL, CHANGE_PLAYER, ADD_PLAYER
} from '../actions/gameConfig'

export const initialState = {
    startGame: false,
    singlePlayer: true,
    level: 1,
    player: 'cross',
    player2: null
}

export function gameConfig(state = initialState, action) {
  switch (action.type) {

  case CHANGE_NUMBER_PLAYER:
    return Object.assign({}, state, {
      singlePlayer: action.singlePlayer,
      player2: null
    })
  case CHANGE_LEVEL:
    return Object.assign({}, state, {
      level: action.level
    })
  case CHANGE_PLAYER:
    return Object.assign({}, state, {
      player: action.player
    })
  case ADD_PLAYER:
    return Object.assign({}, state, {
      player2: action.player2
    })

  default:
    return state
  }
}