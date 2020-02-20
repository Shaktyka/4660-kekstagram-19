'use strict';

var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
var DESCRIPTION_MAX_LENGTH = 140;
var HASHTAGS_MAX_AMOUNT = 5;
var HASHTAG_MAX_LENGTH = 20;

var ImgScale = {
  MIN: 0,
  MAX: 100,
  STEP: 25,
  CSS_MAX_VALUE: 1
};

var KeyCode = {
  ESC: 27,
  ENTER: 13
};

// Проверить
var EffectClassName = {
  'none': 'effects__preview--none',
  'chrome': 'effects__preview--chrome',
  'sepia': 'effects__preview--sepia',
  'marvin': 'effects__preview--marvin',
  'phobos': 'effects__preview--phobos',
  'heat': 'effects__preview--heat'
};

var uploadField = document.querySelector('#upload-file');
var editPhotoWindow = document.querySelector('.img-upload__overlay');
var imgPreview = document.querySelector('.img-upload__preview img');
var editCloseBtn = editPhotoWindow.querySelector('.img-upload__cancel');
var editSubmitBtn = editPhotoWindow.querySelector('.img-upload__submit');
var minusScaleBtn = editPhotoWindow.querySelector('.scale__control--smaller');
var plusScaleBtn = editPhotoWindow.querySelector('.scale__control--bigger');
var scaleValueField = editPhotoWindow.querySelector('.scale__control--value');

var effectInputs = editPhotoWindow.querySelectorAll('.effects__radio');
var currentEffect = null;
var currentImageEffectClass = 'effects__preview--none';

var uploadForm = document.querySelector('.img-upload__form');
var hashField = uploadForm.querySelector('.text__hashtags');
var descriptionField = uploadForm.querySelector('.text__description');

// Закрытие окна редактирования фото
var closeEditPhotoWindow = function () {
  editPhotoWindow.classList.add('hidden');
  imgPreview.src = '';
  editCloseBtn.removeEventListener('click', editCloseBtnClickHandler);
  // editSubmitBtn.removeEventListener('click', editSubmitBtnClickHandler);
  uploadForm.removeEventListener('submit', uploadFormSubmitHandler);
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', bodyKeydownHandler);
};

var editSubmitBtnClickHandler = function (evt) {
  evt.preventDefault();
  closeEditPhotoWindow();
};

var editCloseBtnClickHandler = function (evt) {
  evt.preventDefault();
  closeEditPhotoWindow();
};

var bodyKeydownHandler = function (evt) {
  if (evt.code === KeyCode.ESC) {
    closeEditPhotoWindow();
  }
};

// Начальные настройки окна ред-ния фото
var initEditPhotoWindowSettings = function () {

};

// Обработчик изменений состояния радиобаттонов
var effectInputChangeHandler = function () {

};

// Уменьшение размера изображения
var minusImageScale = function (scaleValue) {
  var value = parseInt(scaleValue.match(/\d+/), 10);
  if (value > 0) {
    var smallerValue = value - ImgScale.STEP;
    scaleValueField.value = smallerValue + '%';
    imgPreview.style.transform = 'scale(' + smallerValue / 100 + ')';
  }
};

// Увеличение размера изображения
var plusImageScale = function (scaleValue) {
  var value = parseInt(scaleValue.match(/\d+/), 10);
  if (value < 100) {
    var biggerValue = value + ImgScale.STEP;
    scaleValueField.value = biggerValue + '%';
    imgPreview.style.transform = 'scale(' + biggerValue / 100 + ')';
  }
};

// Обработчик нажатия на кнопку уменьшения размера окна
var minusScaleBtnClickHandler = function (evt) {
  evt.preventDefault();
  minusImageScale(scaleValueField.value);
};

// Обработчик нажатия на кнопку увеличения размера окна
var plusScaleBtnClickHandler = function (evt) {
  evt.preventDefault();
  plusImageScale(scaleValueField.value);
};

// Обработка сабмита формы
var uploadFormSubmitHandler = function (evt) {
  evt.preventDefault();

  if (hashField.checkValidity() && descriptionField.checkValidity()) {
    var formData = new FormData(uploadForm);
    // Отправляем форму
  }
};

// Проверка сета на единичный элемент решётки
var checkByOneHashSymbol = function (set) {
  var hasOneHashSymbol = false;
  for (var el of set) {
    if (el.length === 1 && el === '#') {
      hasOneHashSymbol = true;
      break;
    }
  }
  return hasOneHashSymbol;
};

// Проверка на длину элемента массива
var checkElementLength = function (set) {
  var isLongerThanTwenty = false;
  for (var el of set) {
    if (el.length > HASHTAG_MAX_LENGTH) {
      isLongerThanTwenty = true;
    }
  }
  return isLongerThanTwenty;
};

// Обработчик события input на поле хэштэгов
var hashFieldInputHandler = function (evt) {
  var hashString = evt.target === hashField ? evt.target.value : '';
  var hashesArray = hashString.split(' ').filter(function (it) {
    return it != '';
  }).map(function (it) {
    return it.toLowerCase();
  });

  var hashSet = new Set(hashesArray); // Формируем сет

  if (hashesArray.length > hashSet.size) {
    hashField.setCustomValidity('Хэштеги не должны повторяться');
    hashField.classList.add('invalid');
  } else if (hashSet.size > HASHTAGS_MAX_AMOUNT) {
    hashField.setCustomValidity('Хэштегов должно быть НЕ больше ' + HASHTAGS_MAX_AMOUNT);
    hashField.classList.add('invalid');
  } else if (checkByOneHashSymbol(hashSet)) {
    hashField.setCustomValidity('Хэштег не может состоять только из одного символа #');
    hashField.classList.add('invalid');
  } else if (checkElementLength(hashSet)) {
    hashField.setCustomValidity('Максимальная длина одного хэш-тега - ' + HASHTAG_MAX_LENGTH +' символов');
    hashField.classList.add('invalid');
  } else {
    hashField.setCustomValidity('');
    hashField.classList.remove('invalid');
  }

  // console.log(hashSet);
};

// Обработчик события input на поле description
var descriptionFieldInputHandler = function () {
  var descrLength = descriptionField.value.length;
  if (descrLength > DESCRIPTION_MAX_LENGTH) {
    descriptionField.setCustomValidity('Текст описания не должен превышать ' + DESCRIPTION_MAX_LENGTH + ' символов, сейчас ' + descrLength + ' символов.');
    descriptionField.classList.add('invalid');
  } else {
    descriptionField.setCustomValidity('');
    descriptionField.classList.remove('invalid');
  }
};

// Открытие окна редактирования фото
var openEditPhotoWindow = function () {
  // Начальные настройки элементов окна
  initEditPhotoWindowSettings();
  editCloseBtn.addEventListener('click', editCloseBtnClickHandler); // кнопка "Закрыть"
  // editSubmitBtn.addEventListener('click', editSubmitBtnClickHandler); // кнопка "Отправить"
  // Нажатие на "-"
  minusScaleBtn.addEventListener('click', minusScaleBtnClickHandler);
  // Нажатие на "+"
  plusScaleBtn.addEventListener('click', plusScaleBtnClickHandler);
  // Обработчики на радиобаттоны (подумать насчёт повесить обработчик на контейнер радиобаттонов)
  effectInputs.forEach(function (input) {
    input.addEventListener('change', effectInputChangeHandler);
  });
  // Отслеживание ввода в поле описания
  descriptionField.addEventListener('input', descriptionFieldInputHandler);
  // Отслеживание ввода в поле хэштегов
  hashField.addEventListener('input', hashFieldInputHandler);
  // Обработчик на сабмит формы
  uploadForm.addEventListener('submit', uploadFormSubmitHandler);

  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', bodyKeydownHandler); // тут надо проверять на фокус в полях окна
  editPhotoWindow.classList.remove('hidden');
};

// Обработчик загрузки фото
var uploadFieldChangeHandler = function () {
  var file = uploadField.files[0];
  var fileName = file.name.toLowerCase();

  var matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      imgPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }

  openEditPhotoWindow();
};

// Вешаем обработчик на поле загрузки файла
uploadField.addEventListener('change', uploadFieldChangeHandler);
