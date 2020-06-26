'use strict';

(function () {
  var getRandomArrayElement = function (arr) {
    var maxIndex = arr.length - 1;
    var randomIndex = Math.floor(Math.random() * (maxIndex + 1));
    return arr[randomIndex];
  };

  window.util = {
    getRandomArrayElement: getRandomArrayElement,
  };
})();
