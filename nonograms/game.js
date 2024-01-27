import data from "./data.json" assert { type: "json" };

class Game {
  constructor(gameId) {
    this.gameId = gameId;
    this.length = data[this.gameId].result.length;
    this.LClue = this.getLClue();
    this.TClue = this.getTClue();
    this.LClue_length = this.getClueLenght(this.LClue);
    this.TClue_length = this.getClueLenght(this.TClue);
    this.result = this.getResultSet();
  }

  getResultSet() {
    const result = data[this.gameId].result;
    let resultSet = new Set;
    let count = 0;
    for (let i = 0; i < result.length; i += 1) {
      for (let j = 0; j < result.length; j += 1) {
        if (result[i][j]) resultSet.add(count.toString());
        count += 1;
      }
    }
    return resultSet;
  }
  getLClue() {
    const length = data[this.gameId].result.length;
    let lClue = Array(length);
    for (let i = 0; i < length; i += 1) {
      lClue[i] = this.getClueRow(data[this.gameId].result[i]);
    }
    return lClue;
  }

  getClueLenght(Clue) {
    let result = 0; 
    for (let i = 0; i < Clue.length; i += 1) {
      if (Clue[i].length > result) result = Clue[i].length;
    }
    return result;
  }

  getTClue() {
    const length = data[this.gameId].result.length;
    let tClue = Array(length);
    for (let i = 0; i < length; i += 1) {
      let row = [];
      for (let j = 0; j < length; j += 1) {
        row.push(data[this.gameId].result[j][i]);
      }
      tClue[i] = this.getClueRow(row);
    }
    return tClue;
  }
  getClueRow(arr) {
    let result = [];
    let count = arr[0];
    for (let i = 1; i < arr.length; i +=1) {
      if (arr[i] === 1) count += 1;
      else if (count > 0) {
        result.push(count);
        count = 0;
      }
    }
    if (count > 0) {
      result.push(count);
    }
    return result;
  }
}

export default Game;