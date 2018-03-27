import IAaction from './IAaction'
import State from './State'


export default class AI {

  constructor(level) {
    this.levelOfIntelligence = level
    this.currentState = new State()
  }

  notify(turn, squares) {
    switch(this.levelOfIntelligence) {
      case 1:
        return this.takeABlindMove(turn, squares)
      case 2:
        return this.takeANoviceMove(turn, squares)
      case 3:
        return this.takeAMasterMove(turn, squares)
      default:
        return this.takeABlindMove(turn, squares)
    }
  }

  emptyCells(squares) {
    let indxs = []
    for(let itr = 0; itr < 9 ; itr++) {
        if(squares[itr] === null) {
            indxs.push(itr)
        }
    }
    return indxs
  }

  advanceTo(_state) {
      this.currentState = _state
  }

  takeABlindMove(turn, squares) {
    const emptycells = this.emptyCells(squares)
    if(emptycells.length > 0) {
      let key = Math.floor(Math.random() * emptycells.length)
      const randomCell = emptycells[key]
      const action     = new IAaction(randomCell)
      const next       = action.applyTo(this.currentState)
      this.advanceTo(next)
      return randomCell
    }
    return null

  }

  takeANoviceMove(turn, squares) {
    const available = this.emptyCells(squares)

    //enumerate and calculate the score for each available actions to the ai player
    const availableActions = available.map((pos) =>{
      let action    = new IAaction(pos)
      let nextState = action.applyTo(this.currentState) //get next state

      action.minimaxVal = this.minimaxValue(nextState) //calculate and set the action's minimax value
      return action
    })

    //sort the enumerated actions list by score
    if(turn === "X")
      //X maximizes --> sort the actions to have the action with maximum minimax at first
      availableActions.sort(this.sortDesc)
    else
      //O minimizes --> sort the actions to have the action with minimum minimax at first
      availableActions.sort(this.sortAsc)

    /*
     * take the optimal action 40% of the time, and take the 1st suboptimal action 60% of the time
     */
    let chosenAction
    if(Math.random()*100 <= 40) {
      chosenAction = availableActions[0]
    } else {
      if(availableActions.length >= 2) {
        //if there is two or more available actions, choose the 1st suboptimal
        chosenAction = availableActions[1]
      } else {
        //choose the only available actions
        chosenAction = availableActions[0]
      }
    }
    const next = chosenAction.applyTo(this.currentState)
    this.advanceTo(next)
    return chosenAction.movePosition
  }

  takeAMasterMove(turn, squares) {
    const available = this.emptyCells(squares)

    const availableActions = available.map((pos)=> {
      const action      = new IAaction(pos)
      const next        = action.applyTo(this.currentState) //get next state
      action.minimaxVal = this.minimaxValue(next) //calculate and set the action's minmax value

      return action
    })

    //sort the enumerated actions list by score
    if(turn === "X"){
      //X maximizes --> sort the actions to have the action with maximum minimax at first
      availableActions.sort(this.sortDesc)
    } else{
      //O minimizes --> sort the actions to have the action with minimum minimax at first
      availableActions.sort(this.sortAsc)
    }
    //take the first action as it's the optimal
    const chosenAction = availableActions[0]
    const next = chosenAction.applyTo(this.currentState)

    this.advanceTo(next)
    return chosenAction.movePosition
  }


  score(_state) {
    if(_state.result === "X-won"){
        // the x player won
        return 10 - _state.oMovesCount;
    }
    else if(_state.result === "O-won") {
        //the x player lost
        return - 10 + _state.oMovesCount;
    }
    else {
        //it's an equality
        return 0;
    }
  }

  minimaxValue(state) {
    if(state.isTerminal()) {
        //a terminal game state is the base case
        return this.score(state)
    } else {
      let stateScore // this stores the minimax value we'll compute

      if(state.turn === "X")
        // X wants to maximize --> initialize to a value smaller than any possible score
        stateScore = -1000
      else
        // O wants to minimize --> initialize to a value larger than any possible score
        stateScore = 1000

      const availablePositions = state.emptyCells()

      //enumerate next available states using the info form available positions
      const availableNextStates = availablePositions.map((pos) => {
        const action    = new IAaction(pos)
        const nextState = action.applyTo(state)
        return nextState
      })

      /* calculate the minimax value for all available next states
       * and evaluate the current state's value */
      availableNextStates.forEach((nextState) => {
          const nextScore = this.minimaxValue(nextState)
          if(state.turn === "X") {
            // X wants to maximize --> update stateScore iff nextScore is larger
            if(nextScore > stateScore) stateScore = nextScore
          }
          else {
            // O wants to minimize --> update stateScore iff nextScore is smaller
            if(nextScore < stateScore) stateScore = nextScore
          }
      })

      return stateScore
    }
  }

  sortAsc(firstAction, secondAction) {
    if(firstAction.minimaxVal < secondAction.minimaxVal)
        return -1 //indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal > secondAction.minimaxVal)
        return 1 //indicates that secondAction goes before firstAction
    else
        return 0 //indicates a tie
  }

  sortDesc(firstAction, secondAction) {
    if(firstAction.minimaxVal > secondAction.minimaxVal)
        return -1 //indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal < secondAction.minimaxVal)
        return 1 //indicates that secondAction goes before firstAction
    else
        return 0 //indicates a tie
  }
}