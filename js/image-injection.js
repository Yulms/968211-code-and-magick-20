'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imageInput;
  var imageElement;

  var onInputChange = function () {
    var file = imageInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (elem) {
      return fileName.endsWith(elem);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imageElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };


  var activate = function (imageFileInput, imageElem) {
    imageInput = imageFileInput;
    imageElement = imageElem;
    imageInput.addEventListener('change', onInputChange);
  };

  var deactivate = function () {
    imageInput.removeEventListener('change', onInputChange);
  };


  window.imageInjection = {
    activate: activate,
    deactivate: deactivate
  };

})();
