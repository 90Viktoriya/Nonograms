import game from "./game.js";

function createElement(tag, classname, textContent = '') {
  const element = document.createElement(tag);
  element.textContent = textContent;
  element.classList.add(classname);
  return element;
}
let currentGameId = 0;
let newGame = new game(currentGameId);

let main_wrapper = createElement('div','main__wrapper');
document.body.append(main_wrapper);
let cross_wrapper = createElement('div', 'cross__wrapper');
let empty_item = createElement('div','cross__empty_item');
let top_clue = createElement('div','cross__top_clue', 'TOP CLUES');
let left_clue = createElement('div','cross__left_clue','LEFT CLUES');
console.log(newGame);
cross_wrapper.style.gridTemplateColumns = 'repeat(' + newGame.length.toString + newGame.LClue.length.toString + ', 1fr)';
cross_wrapper.style.gridTemplateRows = 'repeat(' + newGame.length.toString + newGame.TClue.length.toString + ', 1fr)';
empty_item.style.gridColumnEnd = newGame.LClue.length + 1;
empty_item.style.gridRowEnd = newGame.TClue.length + 1;
top_clue.style.gridRowEnd = newGame.TClue.length + 1;
top_clue.style.gridColumnStart = newGame.LClue.length + 1;
top_clue.style.gridColumnEnd = newGame.LClue.length + 1 + newGame.length;
left_clue.style.gridColumnEnd = newGame.LClue.length + 1;
left_clue.style.gridRowStart = newGame.TClue.length + 1;
left_clue.style.gridRowEnd = newGame.TClue.length + 1 + newGame.length;

cross_wrapper.append(empty_item);
cross_wrapper.append(top_clue);
cross_wrapper.append(left_clue);
let cross_data = createElement('div','cross__data');
cross_wrapper.append(cross_data);
main_wrapper.append(cross_wrapper);


