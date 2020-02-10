'use strict';

var pictureContainer = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Рендерим отдельную фотографию
var renderPhoto = function (data) {
  var photoElement = photoTemplate.cloneNode(true) || '';
  if (photoElement) {
    photoElement.id = data.id;
    photoElement.querySelector('.picture__img').src = data.url || '';
    photoElement.querySelector('.picture__img').alt = data.description || 'Случайная фотография';
    photoElement.querySelector('.picture__likes').textContent = data.likes || 0;
    photoElement.querySelector('.picture__comments').textContent = data.comments.length || 0;
  }
  return photoElement;
};

// Обработчик клика по превью фото
var pictureClickHandler = function (evt) {
  evt.preventDefault();
  var clickedEl = evt.currentTarget;
  if (clickedEl.classList.contains('picture')) {
    var pictureId = clickedEl.id;
    // Открываем большое фото
  }
};

// Собираем массив фотографий
var renderPhotos = function (photoData) {
  if (photoData.length === 0 || !pictureContainer) {
    return;
  }
  var fragment = new DocumentFragment();
  for (var i = 0; i < photoData.length; i++) {
    var picture = renderPhoto(photoData[i]);
    picture.addEventListener('click', pictureClickHandler);
    fragment.appendChild(picture);
  }
  pictureContainer.appendChild(fragment);
};

// Рендерим фотографии на страницу
renderPhotos(photos);
