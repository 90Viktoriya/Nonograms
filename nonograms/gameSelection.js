import createElement from "./createElement.js";
import data from "./data.json" assert { type: "json" };
import {loadGame, loadSaved, showResult, currentGameId} from "./gameMain.js";
import { getSets } from "./gameData.js";
import { getTime } from "./timer.js";

let btnLoad;
let btnSave;

function addSelection(name, key, checked = false, id) {
  let div = createElement('div', 'select__item_wrapper');
  let input = createElement('input', 'select__item', key);
  input.type = 'radio';
  input.name = name;
  input.id = key;
  input.checked = checked;
  input.gameID = id;
  let label = createElement('label', 'select__label', key);
  label.htmlFor = key;
  div.append(input);
  div.append(label);
  return div;
}
function changeList(e) {
  let value = '';
  if (e.target.classList.contains('select__item'))
    value = e.target.id;
  else if (e.target.classList.contains('select__label'))
    value = e.target.htmlFor;
  if (value) {
    const picture = e.currentTarget.picture;
    while (picture.lastChild && picture.lastChild.nodeName === 'DIV') {
      picture.lastChild.remove();
    }
    loadList(value, picture);
  }
}
function loadList(value, picture) {
  let first = true;
  data.forEach(element => {
    if (element.level === value) {
      picture.append(addSelection('Picture', element.name, first, element.id));
      first = false;
    }
  })
}
function loadSelect(e) {
  let inputs = e.target.picture.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i +=1) {
    if (inputs[i].checked)
      loadGame(inputs[i].gameID);
  }
  btnSave.disabled = true;
}
function loadRandom() {
  let gameID = Math.floor(Math.random() * data.length);
  btnSave.disabled = true;
  loadGame(gameID);
}
function gameReset() {
  btnSave.disabled = true;
  loadGame();
}
function loadResult() {
  btnSave.disabled = true;
  showResult();
}
function saveGame() {
  let gameSaved = getSets();
  gameSaved['time'] = getTime();
  gameSaved['gameID'] = currentGameId;
  localStorage.setItem('gameSaved', JSON.stringify(gameSaved));
  btnLoad.disabled = false;
}

function fillSelect(select_wrapper) {
  let difficult = createElement('fieldset', 'select__fieldset');
  difficult.append(createElement('legend', 'select__legend','Game difficulty'));
  difficult.append(addSelection('difficult', 'easy', true));
  difficult.append(addSelection('difficult', 'medium'));
  difficult.append(addSelection('difficult', 'hard'));
  select_wrapper.append(difficult);
  let picture = createElement('fieldset', 'select__fieldset');
  picture.append(createElement('legend', 'select__legend','Game picture'));
  loadList('easy', picture);
  select_wrapper.append(picture);
  difficult.addEventListener('click', changeList);
  difficult.picture = picture;
  let btns = createElement('div', 'select__buttons');
  let btnSelect = createElement('button', 'select__button', 'Select');
  let btnRandom = createElement('button', 'select__button', 'Random');
  btnLoad = createElement('button', 'select__button', 'Continue last');
  btnSelect.picture = picture;
  btnSelect.addEventListener('click', loadSelect);
  btnRandom.addEventListener('click', loadRandom);
  btnLoad.addEventListener('click', loadSaved);
  btnLoad.disabled = true;
  btns.append(btnSelect);
  btns.append(btnRandom);
  btns.append(btnLoad);
  select_wrapper.append(btns);
}
export function displayButtons(buttons_wrapper) {
  btnSave = createElement('button', 'select__button', 'Save');
  btnSave.disabled = true;
  let btnReset = createElement('button', 'select__button', 'Reset');
  let btnSolution = createElement('button', 'select__button', 'Solution');
  buttons_wrapper.append(btnSave);
  buttons_wrapper.append(btnReset);
  buttons_wrapper.append(btnSolution);
  btnReset.addEventListener('click', gameReset);
  btnSolution.addEventListener('click', loadResult);
  btnSave.addEventListener('click', saveGame);
}

export function enableSaveBtn() {
  btnSave.disabled = false;
}
export default fillSelect;