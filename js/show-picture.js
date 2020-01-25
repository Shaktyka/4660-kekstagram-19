'use strict';

var bigPicture = document.querySelector('.big-picture');

// Рендерим один комментарий
var renderComment = function (data) {

};

// Рендерим список комментариев
var renderComments = function (container, comments) {
  if (comments.length === 0) {
    return;
  }
  var fragment = new DocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    var comment = renderComment(comments[i]);
    fragment.appendChild(comment);
  }
  container.appendChild(fragment);
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

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

showPicture(photos[0]);
