
import createElement from "./createElement.js";
import fillSelect, { displayButtons } from "./gameSelection.js";
import initGame, { changeSoundMode } from "./gameMain.js";


let body_wrapper = createElement('div', 'body__wrapper');
document.body.append(body_wrapper);
body_wrapper.append(createElement('h1', 'game_title', 'Nonograms'));
let main_wrapper = createElement('div', 'main__wrapper');
body_wrapper.append(main_wrapper);
let select_wrapper = createElement('div', 'select__wrapper');
fillSelect(select_wrapper);
main_wrapper.append(select_wrapper);
let game_wrapper = initGame();
main_wrapper.append(game_wrapper);
let option_wrapper = createElement('div', 'option__wrapper');
game_wrapper.append(option_wrapper);
let soundBtn = createElement('button', 'option__sound_btn', 'sound ON');
soundBtn.addEventListener('click', changeSoundMode);
option_wrapper.append(soundBtn);
let buttons_wrapper = createElement('div', 'buttons__wrapper');
displayButtons(buttons_wrapper);
main_wrapper.append(buttons_wrapper);




