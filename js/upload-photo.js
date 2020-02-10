'use strict';

var uploadField = document.querySelector('#upload-file');
var editPhotoWindow = document.querySelector('.img-upload__overlay');

// Закрытие окна редактирования фото
var closeEditPhotoWindow = function () {
  editPhotoWindow.classList.add('hidden');
};

// Открытие окна редактирования фото
var openEditPhotoWindow = function () {
  editPhotoWindow.classList.remove('hidden');
};

// Обработчик загрузки фото
var uploadFieldChangeHandler = function (evt) {
  openEditPhotoWindow();
};

uploadField.addEventListener('change', uploadFieldChangeHandler);
