import game from "./game.js";
import fillClues from "./clues.js";
import fillData from "./crossData.js"
import createElement from "./createElement.js";
import displayTimer from "./timer.js";


let currentGameId = 0;
let newGame = new game(currentGameId);

let main_wrapper = createElement('div', 'main__wrapper');
document.body.append(main_wrapper);
let game_wrapper = createElement('div', 'game__wrapper');
displayTimer(game_wrapper);
main_wrapper.append(game_wrapper);
let cross_wrapper = createElement('div', 'cross__wrapper');
fillClues(newGame, cross_wrapper);
let cross_data = createElement('div','cross__data');
fillData(newGame, cross_data);
cross_wrapper.append(cross_data);
game_wrapper.append(cross_wrapper);


