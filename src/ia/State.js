export default class State {
  constructor(old) {

    this.turn = ""
    this.oMovesCount = 0
    this.result = "still running"
    this.squares = []

    /* Begin Object Construction */
    if(typeof old !== "undefined") {
        // if the state is constructed using a copy of another state
        const len = old.squares.length
        this.squares = new Array(len)
        for(let itr = 0 ; itr < len ; itr++) {
            this.squares[itr] = old.squares[itr]
        }

        this.oMovesCount = old.oMovesCount
        this.result      = old.result
        this.turn        = old.turn
    }
  }

  advanceTurn() {
    this.turn = this.turn === "X" ? "O" : "X";
  }

  emptyCells() {
    let indxs = []
    for(let itr = 0; itr < 9 ; itr++) {
        if(this.squares[itr] === null) {
            indxs.push(itr)
        }
    }
    return indxs
  }


  isTerminal() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        this.result = this.squares[a]+"-won"
        return true
      }
    }
    let available = this.emptyCells()
    if(available.length === 0) {
        this.result = "equality"
        return true
    }
    else {
        return false
    }
  }
}