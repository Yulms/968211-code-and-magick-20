'use strict';

(function () {

  var KeyCodes = {
    ENTER: 13,
    ESCAPE: 27
  };

  var isEscPressEvent = function (evt, callback) {
    if (evt.keyCode === KeyCodes.ESCAPE) {
      callback();
    }
  };

  var isEnterPressEvent = function (evt, callback) {
    if (evt.keyCode === KeyCodes.ENTER) {
      callback();
    }
  };

  var getRandomArrayElement = function (arr) {
    var maxIndex = arr.length - 1;
    var randomIndex = Math.floor(Math.random() * (maxIndex + 1));
    return arr[randomIndex];
  };

  var showError = function (message) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.util = {
    isEscPressEvent: isEscPressEvent,
    isEnterPressEvent: isEnterPressEvent,
    getRandomArrayElement: getRandomArrayElement,
    showError: showError
  };
})();
