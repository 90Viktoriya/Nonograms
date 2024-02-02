import createElement from "./createElement.js";

let startTime;
let timeDiffer = 0;
let timer;

function getDiffer00(diff) {
  let result = {};
  result['hour'] = ('0' + Math.floor(diff / 3600)).slice(-2);
  result['minute'] = ('0' + Math.floor((diff % 3600) / 60)).slice(-2);
  result['second'] = ('0' + Math.floor(diff % 60)).slice(-2);
  return result;
}
function getDiffer(diff) {
  let result = {};
  result['hour'] = Math.floor(diff / 3600);
  result['minute'] = Math.floor((diff % 3600) / 60);
  result['second'] = Math.floor(diff % 60);
  return result;
}
function displayTime (diff) {
  let differ = getDiffer00(diff);

  if (differ['hour'] !== '00')
    timer.textContent = differ['hour'] + ':' + differ['minute'] + ':' + differ['second'];
  else
    timer.textContent = differ['minute'] + ':' + differ['second'];
}
export function startTimer() {
  let differ = getDiffer(timeDiffer);
  let nowTime = new Date;
  startTime = new Date(
    nowTime.getFullYear(),
    nowTime.getMonth(),
    nowTime.getDate() - 1,
    nowTime.getHours() + 23 - differ['hour'],
    nowTime.getMinutes() + 59 - differ['minute'],
    nowTime.getSeconds() + 60 - differ['second']
  );
  let timerID = setInterval(() => {
    let diff = Math.floor((new Date - startTime) / 1000);
    displayTime(diff);
  }, 1000);
  return timerID;
}
export function getTime() {
  return Math.floor((new Date - startTime) / 1000);
}
export function setTime(diff, display = true) {
  timeDiffer = diff;
  if (display) {
    displayTime(diff);
  }
}
export function stopTimer(timerID) {
  clearInterval(timerID);
  return Math.floor((new Date - startTime) / 1000);
}

function displayTimer(game_wrapper) {
  timer = createElement('time', 'game__timer','00:00');
  game_wrapper.append(timer);
}
export default displayTimer;