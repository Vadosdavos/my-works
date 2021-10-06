const rippleTarget = document.querySelector('.ripple-target');

rippleTarget.addEventListener('click', (event) => {
  let x = event.offsetX;
  let y = event.offsetY;
  let ripple = document.createElement('span');
  ripple.classList.add('ripple');
  ripple.style.top = y + 'px';
  ripple.style.left = x + 'px';
  event.target.appendChild(ripple);
  setTimeout(() => {
    ripple.remove();
  }, 500);
});
