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
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
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
