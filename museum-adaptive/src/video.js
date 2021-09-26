const range = document.querySelectorAll('input[type = range]');
const play = document.querySelector('.play');
const sound = document.querySelector('.sound');
play.addEventListener('click', function () {
  play.classList.toggle('stop');
});
sound.addEventListener('click', function () {
  sound.classList.toggle('sound-stop');
});
range.forEach((e) => {
  e.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  });
});
