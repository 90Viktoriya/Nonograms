import createElement from "./createElement.js";
import { startTimer, stopTimer, setTime } from "./timer.js";
import loadModal from "./modal.js";
import { enableSaveBtn } from "./gameSelection.js";
let cellSet = new Set;
let crossSet = new Set;
let timerID = undefined;
let resultSet = new Set;
let sounds = {'black': new Audio('./audio/black.mp3'),
'white': new Audio('./audio/white.mp3'),
'cross': new Audio('./audio/cross.mp3'),
'win': new Audio('./audio/win.mp3')};

function resetAudio() {
  for (let i = 0; i < Object.keys(sounds).length; i +=1) {
    Object.values(sounds)[i].pause();
    Object.values(sounds)[i].currentTime = 0;
  }
}
export function muteAudio(flag) {
  for (let i = 0; i < Object.keys(sounds).length; i +=1) {
    Object.values(sounds)[i].muted = flag;
  }
}
function rightClick(e) {
  e.preventDefault();
  if (e.target.classList.contains('cross__data_item')) {
    initTimer();
    e.target.classList.remove('cross__data_item-black');
    e.target.classList.toggle('cross__data_item-cross');
    if (cellSet.has(e.target.id)) cellSet.delete(e.target.id);
    if (crossSet.has(e.target.id)) {
      resetAudio();
      sounds['white'].play();
      crossSet.delete(e.target.id);
    } else {
      resetAudio();
      sounds['cross'].play();
      crossSet.add(e.target.id);
    }

  }
  checkResult(e.target.closest('.cross__data'));
}
function checkResult(cross_data) {
  if ([...cellSet].sort().join() === [...resultSet].sort().join()) {
    resetAudio();
    sounds['win'].play();
    loadModal(stopTimer(timerID));
    clearData(cross_data);
  }
}
function initTimer () {
  if (timerID === undefined) {
    enableSaveBtn();
    timerID = startTimer();
  }
}
function fillCell(e) {
  if (e.target.classList.contains('cross__data_item')) {
    initTimer();
    e.target.classList.toggle('cross__data_item-black');
    e.target.classList.remove('cross__data_item-cross');
    if (crossSet.has(e.target.id)) crossSet.delete(e.target.id);
    if (cellSet.has(e.target.id)) {
      resetAudio();
      sounds['white'].play();
      cellSet.delete(e.target.id); 
    } else {
      resetAudio();
      sounds['black'].play();
      cellSet.add(e.target.id);
    }
  }
  checkResult(e.target.closest('.cross__data'));
}

function clearData(cross_data) {
  stopTimer(timerID);
  timerID = undefined;
  cellSet.clear();
  crossSet.clear();
  cross_data.removeEventListener('click', fillCell);
  cross_data.removeEventListener('contextmenu', rightClick);
}
export function showSolution(newGame, cross_data) {
  clearData(cross_data);
  let count = 0;
  for (let i = 0; i < newGame.length; i += 1) {
    for (let j = 0; j < newGame.length; j += 1) {
      let element = document.getElementById(count);
      if (resultSet.has(count.toString())) {
        element.classList.add('cross__data_item-black');
        element.classList.remove('cross__data_item-cross');
      }
      else
        {
          element.classList.remove('cross__data_item-cross');
          element.classList.remove('cross__data_item-black');
        }
      count += 1;
    }
  }
}
function fillData (newGame, cross_data) {
  let count = 0;
  resultSet = newGame.getResultSet();
  clearData(cross_data);
  for (let i = 0; i < newGame.length; i += 1) {
    if ((i + 1) % 5 === 0 && i + 1 < newGame.length) {
      let border_item = createElement('div','cross__data_border_bottom');
      border_item.style.gridRowStart = i + 2;
      cross_data.append(border_item);
      let border_item2 = createElement('div','cross__data_border_right');
      border_item2.style.gridColumnStart = i + 2;
      cross_data.append(border_item2);
    }
    for (let j = 0; j < newGame.length; j += 1) {
      let data_item = createElement('div', 'cross__data_item');
      data_item.id = count;
      data_item.style.gridColumnStart = j + 1;
      data_item.style.gridRowStart = i + 1;
      count += 1;
      cross_data.append(data_item);
    }
  }
  cross_data.addEventListener('click', fillCell);
  cross_data.addEventListener('contextmenu', rightClick);
}
export function changeGame(cross_data, gameSaved) {

  let crossArr = [];
  let cellArr = [];
  if (gameSaved['crossSet'])
    crossArr = gameSaved['crossSet'].split(' ');
  if (gameSaved['cellSet'])
    cellArr = gameSaved['cellSet'].split(' ');
  crossArr.forEach(element => {
    crossSet.add(element);
    document.getElementById(element).classList.add('cross__data_item-cross');
  });
  cellArr.forEach(element => {
    cellSet.add(element);
    document.getElementById(element).classList.add('cross__data_item-black');
  });
  setTime(gameSaved['time']);
}
export function getSets() {
  let result = {};
  result['crossSet'] = [...crossSet].join(' ');
  result['cellSet'] = [...cellSet].join(' ');
  return result;
}
export default fillData;