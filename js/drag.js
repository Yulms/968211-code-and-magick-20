'use strict';

(function () {

  var handleElement;
  var draggedElement;

  var onPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftCoords = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      draggedElement.style.left = (draggedElement.offsetLeft - shiftCoords.x) + 'px';
      draggedElement.style.top = (draggedElement.offsetTop - shiftCoords.y) + 'px';

      dragged = true;
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onHandleElementClick = function (clickEvt) {
          clickEvt.preventDefault();
          handleElement.removeEventListener('click', onHandleElementClick);
        };
        handleElement.addEventListener('click', onHandleElementClick);
      }
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  var activate = function (handle, dragged) {
    handleElement = handle;
    handleElement.addEventListener('mousedown', onPinMouseDown);
    draggedElement = dragged;
  };

  var deActivate = function () {
    handleElement.removeEventListener('mousedown', onPinMouseDown);
  };

  window.drag = {
    activate: activate,
    deActivate: deActivate
  };

})();
