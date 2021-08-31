const newPhoto = document.querySelector('.new-photo');
const oldPhoto = document.querySelector('.old-photo');
const separator = document.querySelector('.separator');
const photoContainer = document.querySelector('.comparison-field');
let flag = false;

separator.addEventListener(
  'mousedown',
  function (event) {
    event.preventDefault();
    flag = true;
  },
  false
);

separator.addEventListener(
  'mouseup',
  function (event) {
    flag = false;
  },
  false
);

window.addEventListener(
  'mouseup',
  function (event) {
    flag = false;
  },
  false
);

photoContainer.addEventListener(
  'mousemove',
  function (event) {
    let mouseX = event.pageX - this.offsetLeft;
    if (flag && mouseX > 0 && mouseX < oldPhoto.offsetWidth) {
      separator.style.left = `${mouseX}px`;
      newPhoto.style.width = `${mouseX}px`;
    }
  },
  false
);