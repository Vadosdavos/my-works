const picturesInnerContainer = document.querySelector('.pictures-inner-container');

function makeGallery() {
  let pictureIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  pictureIndex.sort(() => Math.random() - 0.5).forEach((el) => picturesInnerContainer.insertAdjacentHTML('afterbegin', `<img class="gallery-img" src="./assets/img/galery/galery${el}.jpg" alt="GaleryImg${el}">`));
}
makeGallery();
