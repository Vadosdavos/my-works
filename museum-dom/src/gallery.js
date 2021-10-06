const picturesInnerContainer = document.querySelector('.pictures-inner-container');
const galleryImages = picturesInnerContainer.getElementsByTagName('img');

function makeGallery() {
  let pictureIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  pictureIndex.sort(() => Math.random() - 0.5).forEach((el) => picturesInnerContainer.insertAdjacentHTML('afterbegin', `<img class="gallery-img" src="./assets/img/galery/galery${el}.jpg" alt="GaleryImg${el}">`));
}
makeGallery();

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function appearImages() {
  const galleryImagesArray = Array.from(galleryImages);

  galleryImagesArray.forEach((galleryImage) => {
    const slideInAt = window.scrollY + window.innerHeight - galleryImage.height / 2;
    const imageBottom = galleryImage.offsetTop + galleryImage.height;
    const isHalfShown = slideInAt > galleryImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      galleryImage.classList.add('active');
    } else {
      galleryImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(appearImages));
