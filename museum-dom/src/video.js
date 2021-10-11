const ranges = document.querySelectorAll('.ranges');
export  const play = document.querySelector('.play');
export  const playBig = document.querySelector('.play-big');
const sound = document.querySelector('.sound');
const fullscreen = document.querySelector('.fullscreen');
const videoPlayer = document.querySelector('.video-player');
export const video = videoPlayer.querySelector('.large-video');
const videoLengthBar = videoPlayer.querySelector('.video-length');
const videoVolumeBar = videoPlayer.querySelector('.video-volume');
const playbackRateText = videoPlayer.querySelector('.playbackRate');
let mousedown = false;
let curVolume = 0.43;
let isShiftDown = false;

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
  const percent = (video.currentTime / video.duration) * 100 || 0;
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

const toggleFullScreen = function () {
  if (!document.fullscreenElement) videoPlayer.requestFullscreen();
  else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
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

fullscreen.addEventListener('click', toggleFullScreen);

window.addEventListener('keydown', (event) => {
  if (event.repeat) {
    return;
  }
  if (event.key === 'Shift') {
    isShiftDown = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.repeat) {
    return;
  }
  if (event.key === 'Shift') {
    isShiftDown = false;
  }
});

window.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (event.repeat) {
    return;
  }
  if (video.getBoundingClientRect().y < video.clientHeight && -video.getBoundingClientRect().y < video.clientHeight) {
    if (event.code === 'Space') {
      togglePlay();
    }
    if (event.code === 'KeyM') {
      mute();
    }
    if (event.code === 'KeyF') {
      toggleFullScreen();
    }
    window.addEventListener('keydown', (event) => {
      if (isShiftDown) {
        switch (event.code) {
          case 'Period':
            video.playbackRate >= 3 ? (video.playbackRate = 3) : (video.playbackRate += 0.25);
            playbackRateText.textContent = 'x' + video.playbackRate;
            playbackRateText.style = 'visibility: visible; opacity: 1;';
            setTimeout(() => {
              playbackRateText.style = 'visibility: hidden; opacity: 0;';
            }, 1000);
            break;
          case 'Comma':
            video.playbackRate <= 0.25 ? (video.playbackRate = 0.25) : (video.playbackRate -= 0.25);
            playbackRateText.textContent = 'x' + video.playbackRate;
            playbackRateText.style = 'visibility: visible; opacity: 1;';
            setTimeout(() => {
              playbackRateText.style = 'visibility: hidden; opacity: 0;';
            }, 1000);
            break;
        }
      }
    });
  }
});
