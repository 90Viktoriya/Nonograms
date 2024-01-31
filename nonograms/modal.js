import createElement from "./createElement.js";

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

export default loadModal;