'use strict';

var KeyCodes = {
  ESCAPE: 'Escape',
  ENTER: 'Enter'
};

var bigPicture = document.querySelector('.big-picture');

// Рендеринг элемента из разметки
var createElement = function (string) {
  var div = document.createElement('div');
  div.innerHTML = string;
  return div.firstChild;
};

// Собираем один комментарий
var renderCommentString = function (data) {
  return '<li class="social__comment"><img class="social__picture" src="'
    + data.avatar
    + '" alt="'
    + data.name
    + '" width="35" height="35"><p class="social__text">'
    + data.message
    + '</p></li>';
};

// Рендерим список комментариев
var renderComments = function (container, comments) {
  if (comments.length === 0) {
    return;
  }
  var fragment = new DocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    var comment = createElement(renderCommentString(comments[i]));
    fragment.appendChild(comment);
  }
  container.innerHTML = '';
  container.appendChild(fragment);
};

// Закрытие окна
var closePhoto = function () {
  bigPicture.classList.add('hidden');
  bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', cancelBtnClickHandler);
  document.body.classList.remove('modal-open');
};

// Обработчик нажатия на кнопку закрытия окна
var cancelBtnClickHandler = function (evt) {
  evt.preventDefault();
  closePhoto();
};

// Обработчик нажатий на клавиатуру
var bodyKeyDownHandler = function (evt) {
  if (evt.code === KeyCodes.ESCAPE) {
    closePhoto();
  }
};

var showPicture = function (data) {
  if (!data || !bigPicture) {
    return;
  }

  var commentsContainer = bigPicture.querySelector('.social__comments');

  bigPicture.querySelector('.social__caption').textContent = data.description || '';
  bigPicture.querySelector('.big-picture__img img').src = data.url || '';
  bigPicture.querySelector('.likes-count').textContent = data.likes || 0;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length || 0;

  renderComments(commentsContainer, data.comments);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  var cancelBtn = bigPicture.querySelector('.big-picture__cancel');
  cancelBtn.addEventListener('click', cancelBtnClickHandler);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.body.addEventListener('keydown', bodyKeyDownHandler);
};

showPicture(photos[0]);
