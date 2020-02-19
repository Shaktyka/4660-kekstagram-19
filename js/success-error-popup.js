'use strict';

(function () {
  var mainBlock = document.querySelector('main');

  var successTemplate = document.querySelector('#success');
  var successMarkup = successTemplate.content.querySelector('.success');

  var errorTemplate = document.querySelector('#error');
  var errorMarkup = errorTemplate.content.querySelector('.error');

  var openedPopup = null;

  // Закрытие окна успешной загрузки
  var closeSuccessPopup = function () {
    openedPopup.remove();
    openedPopup.querySelector('.success__button').removeEventListener('click', successButtonClickHandler);
    openedPopup = null;
  };

  // Закрытие окна ошибки
  var closeErrorPopup = function () {
    openedPopup.remove();
    openedPopup.querySelector('.error__button').removeEventListener('click', errorButtonClickHandler);
    openedPopup = null;
  };

  // Обработчик нажатия на кнопку "Круто" (попап успеха)
  var successButtonClickHandler = function (evt) {
    evt.preventDefault();
    closeSuccessPopup();
  };

  // Обработчик кликов по документу
  var documentClickHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.classList.contains('error') || target.classList.contains('success')) {
      openedPopup.remove();
      openedPopup = null;
      document.removeEventListener('click', documentClickHandler);
    }
  };

  // Обработчик клавиатурных событий на документ
var documentKeydownHandler = function (evt) {
  if (evt.code === 'Escape') {

    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
      openedPopup = null;
    } else if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
      openedPopup = null;
    }

    // var focusedElement = document.activeElement;
    // if (focusedElement !== hashInput && focusedElement !== commentInput) {
    //   closeUploadWindow();
    // }

    document.removeEventListener('keydown', documentKeydownHandler);
  }
};

  // Открытие окна успешной загрузки
  var openSuccessPopup = function () {
    var successPopup = successMarkup.cloneNode(true);
    var successButton = successPopup.querySelector('.success__button');
    successButton.addEventListener('click', successButtonClickHandler);

    document.addEventListener('keydown', documentKeydownHandler);
    document.addEventListener('click', documentClickHandler);

    mainBlock.appendChild(successPopup);
    openedPopup = successPopup;
  };

  // Обработчик нажатия на кнопки внутри окна ошибки
  var errorButtonClickHandler = function (evt) {
    evt.preventDefault();
    var clickedElement = evt.target;
    if (clickedElement.classList.contains('error__button')) {
      closeErrorPopup();
    }
  };

  // Открытие окна ошибки
  var openErrorPopup = function () {
    var errorPopup = errorMarkup.cloneNode(true);
    var errorButton = errorPopup.querySelector('.error__button');
    errorButton.addEventListener('click', errorButtonClickHandler);

    document.addEventListener('keydown', documentKeydownHandler);
    document.addEventListener('click', documentClickHandler);

    mainBlock.appendChild(errorPopup);
    openedPopup = errorPopup;
  };

  // openSuccessPopup();
  openErrorPopup();

})();
