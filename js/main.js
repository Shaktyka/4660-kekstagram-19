'use strict';

var PHOTO_AMOUNT = 25;
var photos = [];

var names = [
  'Михаил',
  'Ашот',
  'Мариночка',
  'Влад',
  'Айгуль',
  'Децл'
];

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Генерирует комментарий
var getCommentData = function () {
  return {
    avatar: 'img/avatar-6.svg',
    message: 'В целом всё неплохо. Но не всё.',
    name: 'Артем'
  };
};

// Рендерим массив комментариев
var getComments = function (amount) {
  var comments = [];
  for (var i = 0; i < amount.length; i++) {
    var comment = getCommentData();
    comments.push(comment);
  }
};

// Генерирует один объект данных для массива
var getPhotoData = function (number) {
  return {
    'url': 'photos/' + number + '.jpg',
    'description': '',
    'likes': 2,
    'comments': getComments(10)
  };
};


// Генерирует массив фотографий
var generatePhotoData = function () {
  for (var i = 0; i < PHOTO_AMOUNT.length; i++) {
    var photoData = getPhotoData(i);
    photos.push(photoData);
  }
};

generatePhotoData();
