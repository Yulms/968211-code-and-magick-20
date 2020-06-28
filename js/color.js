'use strict';

(function () {
  var getCoatColor = function () {
    return window.util.getRandomArrayElement(window.data.COAT_COLORS);
  };

  var getEyesColor = function () {
    return window.util.getRandomArrayElement(window.data.EYES_COLORS);
  };

  var getFireballColor = function () {
    return window.util.getRandomArrayElement(window.data.FIREBALL_COLORS);
  };

  window.color = {
    getCoatColor: getCoatColor,
    getEyesColor: getEyesColor,
    getFireballColor: getFireballColor
  };
})();
