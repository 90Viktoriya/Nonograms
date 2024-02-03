
import createElement from "./createElement.js";
import fillSelect, { displayButtons } from "./gameSelection.js";
import initGame from "./gameMain.js";


document.body.classList.add('body__wrapper');
document.body.append(createElement('h1', 'game_title', 'Nonograms'));
let main_wrapper = createElement('div', 'main__wrapper');
document.body.append(main_wrapper);
let select_wrapper = createElement('div', 'select__wrapper');
fillSelect(select_wrapper);
main_wrapper.append(select_wrapper);
let game_wrapper_add = createElement('div', 'game__wrapper_add');
main_wrapper.append(game_wrapper_add);
let game_wrapper = initGame();
game_wrapper_add.append(game_wrapper);
let buttons_wrapper = createElement('div', 'buttons__wrapper');
displayButtons(buttons_wrapper);
game_wrapper_add.append(buttons_wrapper);




