import createElement from "./createElement.js";

let sellSet = new Set;


function rightClick(e) {
  e.preventDefault();
  e.target.classList.remove('cross__data_item-black');
  e.target.classList.toggle('cross__data_item-cross');
  if (sellSet.has(e.target.id)) sellSet.delete(e.target.id);
}
function fillData (newGame, cross_data) {
  let count = 0;
  let resultSet = newGame.getResultSet();
  for (let i = 0; i < newGame.length; i += 1) {
    for (let j = 0; j < newGame.length; j += 1) {
      let data_item = createElement('div', 'cross__data_item');
      data_item.id = count;
      data_item.style.gridColumnStart = j + 1;
      data_item.style.gridRowStart = i + 1;
      count += 1;
      cross_data.append(data_item);
    }
  }
  cross_data.addEventListener('click', fillCell);
  cross_data.addEventListener('contextmenu', rightClick);
  
  function fillCell(e) {
  if (e) {
    e.target.classList.toggle('cross__data_item-black');
    sellSet.has(e.target.id)? sellSet.delete(e.target.id) : sellSet.add(e.target.id);
  }

  console.log([...sellSet].sort());
  console.log([...resultSet].sort());
  if ([...sellSet].sort().join() === [...resultSet].sort().join())
    console.log('win');
}
}
export default fillData;