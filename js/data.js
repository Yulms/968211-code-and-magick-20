'use strict';

(function () {
  var WIZARDS_NUMBER = 4;
  var FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var createWizardsData = function () {
    var result = [];
    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      result.push(
          {
            name: window.util.getRandomArrayElement(FIRST_NAMES) + ' ' + window.util.getRandomArrayElement(LAST_NAMES),
            coatColor: window.util.getRandomArrayElement(COAT_COLORS),
            eyesColor: window.util.getRandomArrayElement(EYES_COLORS)
          }
      );
    }
    return result;
  };

  window.data = {
    createWizardsData: createWizardsData,
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS
  };

})();
