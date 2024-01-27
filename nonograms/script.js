import game from "./game.js";
import fillClues from "./clues.js";
import createElement from "./createElement.js";


let currentGameId = 0;
let newGame = new game(currentGameId);

let main_wrapper = createElement('div','main__wrapper');
document.body.append(main_wrapper);
let cross_wrapper = createElement('div', 'cross__wrapper');
console.log(newGame.LClue);
fillClues(newGame, cross_wrapper);

let cross_data = createElement('div','cross__data');
cross_wrapper.append(cross_data);
main_wrapper.append(cross_wrapper);


