import State from './State'

export default class IAaction {

  constructor(position) {
    this.movePosition = position
    this.minimaxVal   = 0
  }

  applyTo(state) {
    const next = new State( state )
    next.squares[this.movePosition] = state.turn
    if(state.turn === "O")
      next.oMovesCount++
    next.advanceTurn()

    return next
  }
}