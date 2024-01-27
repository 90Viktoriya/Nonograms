function createElement(tag, classname, textContent = '') {
  const element = document.createElement(tag);
  element.textContent = textContent;
  element.classList.add(classname);
  return element;
}
export default createElement;