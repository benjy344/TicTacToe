import { APP_IP, APP_PORT } from '../path/Conf'

export const CHANGE_NUMBER_PLAYER = 'CHANGE_NUMBER_PLAYER'
export const CHANGE_LEVEL         = 'LOGIN_SUCCESS'
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

export function addPlayer(player) {
  return {
    type: ADD_PLAYER,
    player: player
  }
}

