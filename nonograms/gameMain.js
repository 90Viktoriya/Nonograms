import game from "./game.js";
import fillClues from "./clues.js";
import fillData from "./gameData.js"
import displayTimer from "./timer.js";
import createElement from "./createElement.js";

let currentGameId;
let game_wrapper = createElement('div', 'game__wrapper');

function clearWrapper() {
  while (game_wrapper.lastChild) {
    game_wrapper.lastChild.remove();
  }
}
export function loadGame(gameID) {
  currentGameId = gameID;
  let newGame = new game(currentGameId);
  clearWrapper();
  console.log(newGame);
  /*game_wrapper.append(createElement('h2', 'cross__title', newGame.name));*/
  displayTimer(game_wrapper);
  let cross_wrapper = createElement('div', 'cross__wrapper');
  fillClues(newGame, cross_wrapper);
  let cross_data = createElement('div','cross__data');
  fillData(newGame, cross_data);
  cross_wrapper.append(cross_data);
  game_wrapper.append(cross_wrapper);
}

function initGame() {
  currentGameId = 0;
  loadGame(currentGameId);
  return game_wrapper;
}

export default initGame;