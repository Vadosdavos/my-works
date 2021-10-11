const ranges = document.querySelectorAll('.ranges');
const play = document.querySelector('.play');
const playBig = document.querySelector('.play-big');
const sound = document.querySelector('.sound');
const fullscreen = document.querySelector('.fullscreen');
const videoPlayer = document.querySelector('.video-player');
const video = videoPlayer.querySelector('.large-video');
const videoLengthBar = videoPlayer.querySelector('.video-length');
const videoVolumeBar = videoPlayer.querySelector('.video-volume');
let mousedown = false;
let curVolume = 0.43;
const togglePlay = function () {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  video.volume = videoVolumeBar.value;
};

const updateButtons = function () {
  playBig.classList.toggle('play-big-hidden');
  play.classList.toggle('stop');
};

const updateRanges = function () {
  const value = this.value;
  video[this.name] = value;
  curVolume = video.volume;
  this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value <= 1 ? value * 100 : value}%, #C4C4C4 ${value <= 1 ? value * 100 : value}%, #C4C4C4 100%)`;
  if (video.volume === 0) {
    sound.classList.add('sound-stop');
  } else sound.classList.remove('sound-stop');
};

const handleProgress = function () {
  const percent = (video.currentTime / video.duration) * 100;
  videoLengthBar.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${percent}%, #C4C4C4 ${percent}%, #C4C4C4 100%)`;
  videoLengthBar.value = percent;
};

const scrub = function (event) {
  const scrubTime = (event.offsetX / videoLengthBar.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const mute = function () {
  sound.classList.toggle('sound-stop');
  video.volume != 0 ? (video.volume = 0) : (video.volume = curVolume);
  videoVolumeBar.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${video.volume * 100}%, #C4C4C4 ${video.volume * 100}%, #C4C4C4 100%)`;
  videoVolumeBar.value = video.volume;
};

video.addEventListener('timeupdate', () => {
  handleProgress();
});
video.addEventListener('click', () => {
  togglePlay();
});
video.addEventListener('play', () => {
  updateButtons();
});
video.addEventListener('pause', () => {
  updateButtons();
});
play.addEventListener('click', () => {
  togglePlay();
});
playBig.addEventListener('click', () => {
  togglePlay();
});

ranges.forEach((el) => el.addEventListener('input', updateRanges));

videoLengthBar.addEventListener('click', scrub);
videoLengthBar.addEventListener('mousemove', (event) => mousedown && scrub(event));
videoLengthBar.addEventListener('mousedown', () => (mousedown = true));
videoLengthBar.addEventListener('mouseup', () => (mousedown = false));
sound.addEventListener('click', () => {
  mute();
});

function toggleFullScreen() {
  if (!document.fullscreenElement) videoPlayer.requestFullscreen();
  else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

fullscreen.addEventListener('click', toggleFullScreen);
