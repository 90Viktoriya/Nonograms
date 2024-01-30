import createElement from "./createElement.js";

export let startTime;
let timer;
export function startTimer() {
  startTime = new Date();
  setInterval(() => {
    let diff = Math.floor((new Date - startTime) / 1000);
    let hour = ('0' + Math.floor(diff / 3600)).slice(-2);
    let minute = ('0' + Math.floor((diff % 3600) / 60)).slice(-2);
    let second = ('0' + Math.floor(diff % 60)).slice(-2);

    if (hour !== '00')
      timer.textContent = hour + ':' + minute + ':' + second;
    else
      timer.textContent = minute + ':' + second;
  }, 1000);
}
function displayTimer(game_wrapper) {
  timer = createElement('time', 'game__timer','00:00');
  game_wrapper.append(timer);
}
export default displayTimer;