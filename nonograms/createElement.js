function createElement(tag, classname, textContent = '') {
  const element = document.createElement(tag);
  element.textContent = textContent;
  if (classname)
    element.classList.add(classname);
  return element;
}
export default createElement;