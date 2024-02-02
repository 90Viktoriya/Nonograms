import game from "./game.js";
import fillClues from "./clues.js";
import fillData, { showSolution, changeGame, muteAudio } from "./gameData.js"
import displayTimer from "./timer.js";
import createElement from "./createElement.js";

export let currentGameId;
let game_wrapper = createElement('div', 'game__wrapper');
let cross_data;
let newGame;

function clearWrapper() {
  while (game_wrapper.lastChild) {
    game_wrapper.lastChild.remove();
  }
}
export function changeSoundMode(e) {
  if (e.target.classList.contains('option__sound_btn')) {
    muteAudio(e.target.classList.toggle('option__sound_off'));
    if (e.target.classList.contains('option__sound_off')) {
      e.target.textContent = 'sound OFF';
    } else e.target.textContent = 'sound ON';
    
    
  }
}
export function showResult() {
  showSolution(newGame, cross_data);
}
export function loadSaved() {
  let str = localStorage.getItem('gameSaved');
  let gameSaved = JSON.parse(str);
  loadGame(gameSaved['gameID']);
  changeGame(cross_data, gameSaved);
}
export function loadGame(gameID = currentGameId) {
  currentGameId = gameID;
  newGame = new game(currentGameId);
  clearWrapper();
  let game_wrapper2 = createElement('div', 'game__wrapper-header');
  game_wrapper2.append(createElement('h2', 'cross__title', newGame.name));
  displayTimer(game_wrapper2);
  game_wrapper.append(game_wrapper2);
  let cross_wrapper = createElement('div', 'cross__wrapper');
  fillClues(newGame, cross_wrapper);
  cross_data = createElement('div','cross__data');
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