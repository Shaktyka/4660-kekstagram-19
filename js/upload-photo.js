'use strict';

var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

var uploadField = document.querySelector('#upload-file');
var editPhotoWindow = document.querySelector('.img-upload__overlay');
var imgPreview = document.querySelector('.img-upload__preview img');
var editCloseBtn = editPhotoWindow.querySelector('.img-upload__cancel');
var editSubmitBtn = editPhotoWindow.querySelector('.img-upload__submit');

// Закрытие окна редактирования фото
var closeEditPhotoWindow = function () {
  editPhotoWindow.classList.add('hidden');
  imgPreview.src = '';
  editCloseBtn.removeEventListener('click', editCloseBtnClickHandler);
  editSubmitBtn.removeEventListener('click', editSubmitBtnClickHandler);
};

var editSubmitBtnClickHandler = function (evt) {
  evt.preventDefault();
  closeEditPhotoWindow();
};

var editCloseBtnClickHandler = function (evt) {
  evt.preventDefault();
  closeEditPhotoWindow();
};

// Открытие окна редактирования фото
var openEditPhotoWindow = function () {
  editPhotoWindow.classList.remove('hidden');
  editCloseBtn.addEventListener('click', editCloseBtnClickHandler);
  editSubmitBtn.addEventListener('click', editSubmitBtnClickHandler);
};

// Обработчик загрузки фото
var uploadFieldChangeHandler = function (evt) {
  var file = uploadField.files[0];
  var fileName = file.name.toLowerCase();

  var matches = FILE_TYPES.some(function(it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    var reader = new FileReader();

    reader.addEventListener('load', function() {
      imgPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }

  openEditPhotoWindow();
};

uploadField.addEventListener('change', uploadFieldChangeHandler);
