'use strict';

var PHOTO_AMOUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 15;
var AVATAR_NUMBER_MIN = 1;
var AVATAR_NUMBER_MAX = 6;
var photos = [];

var userNames = [
  'Михаил',
  'Ашот',
  'Мариночка',
  'Влад',
  'Айгуль',
  'Децл',
  'Женёк',
  'Мышка'
];

var photoDescriptions = [
  'На этой неделе прошло торжественное открытие.',
  'Zombie apocalypse has been successfully prevented.',
  'Наконец-то получили все данные с Джаваскриптона (ох уж эти космические расстояния)!',
  'Вот это интрига!',
  'Уже почти закончился первый месяц 2020-го. Эээй, как так?...',
  'Паша пришел домой, конец дня.',
  'Отличный мастер класс! Рекомендую всем!',
  'Здорово! Прям прониклась.',
  'Еще больше драйва и веселья по ссылке в шапке профиля.',
  'What Earth looked like before.'
];

var userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Генерация случайного числа от min до max включительно
var getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

var getMessage = function (number) {
  var messages = [];
  for (var i = 0; i < number; i++) {
    messages.push(userComments[getRandomNumber(0, userComments.length - 1)]);
  }
  return messages.join(' ');
};

// Генерирует комментарий
var getCommentData = function () {
  return {
    'avatar': 'img/avatar-' + getRandomNumber(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX) + '.svg',
    'message': getMessage(getRandomNumber(1, 2)),
    'name': userNames[getRandomNumber(0, userNames.length - 1)]
  };
};

// Рендерим массив комментариев
var getComments = function (amount) {
  var comments = [];
  for (var i = 0; i < amount; i++) {
    var comment = getCommentData();
    comments.push(comment);
  }
  return comments;
};

// Генерирует один объект данных для массива
var getPhotoData = function (number) {
  return {
    'id': number,
    'url': 'photos/' + number + '.jpg',
    'description': photoDescriptions[getRandomNumber(0, photoDescriptions.length - 1)],
    'likes': getRandomNumber(LIKES_MIN, LIKES_MAX),
    'comments': getComments(getRandomNumber(COMMENTS_MIN, COMMENTS_MAX))
  };
};


// Генерирует массив фотографий
var generatePhotoData = function () {
  for (var i = 0; i < PHOTO_AMOUNT; i++) {
    var photoData = getPhotoData(i + 1);
    photos.push(photoData);
  }
};

generatePhotoData();
