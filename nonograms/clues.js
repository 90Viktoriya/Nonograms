/*import game from "./game.js";*/
import createElement from "./createElement.js";

function fillClues(newGame, cross_wrapper) {
  let top_clue = createElement('div','cross__top_clue');
  let left_clue = createElement('div','cross__left_clue');
  cross_wrapper.style = '--lclue_length: ' + newGame.LClue_length.toString() + '; --tclue_length: ' + newGame.TClue_length.toString() + '; --game_length: ' + newGame.length.toString() + ';';
  cross_wrapper.append(top_clue);
  cross_wrapper.append(left_clue);
  console.log(newGame.LClue);
  for (let i = 0; i < newGame.length; i += 1) {
    let count = 0;
    for (let j = newGame.LClue[i].length; j > 0; j -= 1) {
      let clue_item = createElement('div', 'cross__clue_item', newGame.LClue[i][j - 1]);
      clue_item.style.gridColumnStart = newGame.LClue_length - count;
      clue_item.style.gridRowStart = i + 1;
      count += 1;
      left_clue.append(clue_item);
    }
    count = 0;
    for (let j = newGame.TClue[i].length; j > 0; j -= 1) {
      let clue_item = createElement('div', 'cross__clue_item', newGame.TClue[i][j - 1]);
      clue_item.style.gridRowStart = newGame.TClue_length - count;
      clue_item.style.gridColumnStart = i + 1;
      count += 1;
      top_clue.append(clue_item);
    }
  }
}
export default fillClues;