'use strict';

window.backend = (function () {
  var URL = {
    GET: 'https://javascript.pages.academy/code-and-magick/data',
    POST: 'https://javascript.pages.academy/code-and-magick/'
  };
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;


  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);

    xhr.open('GET', URL.GET, true);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);

    xhr.open('POST', URL.POST);
    xhr.send(data);
  };

  return {
    load: load,
    save: save
  };
})();
