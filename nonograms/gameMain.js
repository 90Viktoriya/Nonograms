import game from "./game.js";
import fillClues from "./clues.js";
import fillData, { showSolution, changeGame, muteAudio, clearTimerID } from "./gameData.js"
import displayTimer, { stopTimer } from "./timer.js";
import createElement from "./createElement.js";
import {showResultModal} from "./modal.js";

export let currentGameId;
let game_wrapper = createElement('div', 'game__wrapper');
let cross_data;
let newGame;

function clearWrapper() {
  while (game_wrapper.lastChild) {
    game_wrapper.lastChild.remove();
  }
}
function changeSoundMode(e) {
  if (e.target.classList.contains('option__sound_btn')) {
    muteAudio(e.target.classList.toggle('option__sound_off'));
    if (e.target.classList.contains('option__sound_off')) {
      e.target.backgroundImage = 'url(./img/sound-on.png)';
    } else e.target.backgroundImage = 'url(./img/sound-ff.png)';
  }
}
function changeThemeMode(e) {
  if (e.target.classList.contains('option__theme_btn')) {
    document.body.classList.toggle('theme_dark');
    document.body.classList.toggle('theme_light');
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
  game_wrapper2.append(createElement('h1', 'cross__title', newGame.name));
  displayTimer(game_wrapper2);
  game_wrapper.append(game_wrapper2);
  let cross_wrapper = createElement('div', 'cross__wrapper');
  fillClues(newGame, cross_wrapper);
  cross_data = createElement('div','cross__data');
  fillData(newGame, cross_data);
  cross_wrapper.append(cross_data);
  game_wrapper.append(cross_wrapper);
}
export function addOptions() {
  let option_wrapper = createElement('div', 'option__wrapper');
  game_wrapper.append(option_wrapper);
  let soundBtn = createElement('div', 'option__sound_btn');
  soundBtn.addEventListener('click', changeSoundMode);
  let themeBtn = createElement('div', 'option__theme_btn');
  themeBtn.addEventListener('click', changeThemeMode);
  option_wrapper.append(themeBtn);
  option_wrapper.append(soundBtn);
  return option_wrapper;
}

function initGame() {
  currentGameId = 0;
  loadGame(currentGameId);
  return game_wrapper;
}

export function showResultTable() {
  let timerID = clearTimerID();
  let time;
  if (timerID === undefined)
    time = 0;
  else time = stopTimer(timerID);
  showResultModal(time);
}

export default initGame;