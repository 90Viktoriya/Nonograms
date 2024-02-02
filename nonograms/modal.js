import createElement from "./createElement.js";
import { setTime } from "./timer.js";

function loadModal(time) {
  let modal = createElement('div','modal__wrapper');
  document.body.append(modal);
  let modalData = createElement('div','modal__data');
  modalData.append(createElement('div','modal__result', `Great! You have solved the nonogram in ${time} seconds!`));
  let modalbtn = createElement('button','modal__button', 'Close');
  modalbtn.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal__button'))
      modal.remove();
    });
  /*modalbtn.addEventListener('click', (e) => playAgain (e, modal));*/
  modalData.append(modalbtn);
  modal.append(modalData);
}

function displayTable(winresults) {
  let result = createElement('div', 'modal__table_wrapper');
  winresults = winresults.sort((a, b) => { return a[2] - b[2]; });
  winresults.forEach(element => {
    let item = createElement('div','modal__table_item');
    let name = createElement('div', 'modal__table_item-name', element[0]);
    let level = createElement('div', 'modal__table_item-level', element[1]);
    let time = createElement('div', 'modal__table_item-time',
      ('0' + Math.floor(element[2] / 60)).slice(-2) +
      ':' +
      ('0' + Math.floor(element[2] % 60)).slice(-2)
    );
    item.append(name);
    item.append(level);
    item.append(time);
    result.append(item);
  });
  return result;
}
export function showResultModal(time) {
  let modal = createElement('div','modal__wrapper');
  document.body.append(modal);
  let modalData = createElement('div','modal__data');
  
  let winresults = JSON.parse(localStorage.getItem('winresults'));
  if (winresults) {
    modalData.append(displayTable(winresults));
  } else {
    modalData.append(createElement('div','modal__result', 'К сожалению выигрышей пока нет.'));
  }
  let modalbtn = createElement('button','modal__button', 'Close');
  modalbtn.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal__button')) {
        if (time)
          setTime(time);
        modal.remove();
      }
    });

  modalData.append(modalbtn);
  modal.append(modalData);
}

export default loadModal;