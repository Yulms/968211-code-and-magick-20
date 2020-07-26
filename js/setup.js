'use strict';

(function () {

  var setupWindow = document.querySelector('.setup');
  var openSetupButton = document.querySelector('.setup-open');
  var closeSetupButton = setupWindow.querySelector('.setup-close');
  var userNameInputElement = setupWindow.querySelector('.setup-user-name');
  var uploadButton = setupWindow.querySelector('.upload');
  var setupForm = setupWindow.querySelector('.setup-wizard-form');
  var imageInput = uploadButton.querySelector('input[name = avatar]');
  var imagePreview = uploadButton.querySelector('.setup-user-pic');
  var lastSimilarWizardsServerData;

  var onSetupButtonEnterPress = function (evt) {
    window.util.isEnterPressEvent(evt, openSetup);
  };

  var onSetupButtonClick = function () {
    openSetup();
  };

  var onSetupEscPress = function (evt) {
    if (evt.target !== userNameInputElement) {
      window.util.isEscPressEvent(evt, closeSetup);
    }
  };

  var onCloseSetupButtonClick = function () {
    closeSetup();
  };

  var onCloseSetupButtonEnterPress = function (evt) {
    window.util.isEnterPressEvent(evt, closeSetup);
  };

  var onInputFormSend = function () {
    if (userNameInputElement.validity.tooShort) {
      userNameInputElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInputElement.validity.tooLong) {
      userNameInputElement.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInputElement.validity.valueMissing) {
      userNameInputElement.setCustomValidity('Обязательное поле');
    } else {
      userNameInputElement.setCustomValidity('');
    }
  };

  var showSimilarWizards = function () {
    var sortedData = window.similarWizardsData.sortSimilarWizards(lastSimilarWizardsServerData);
    window.similarWizards.render(sortedData);
  };

  var onWizardsLoad = function (response) {
    lastSimilarWizardsServerData = response;
    showSimilarWizards();
  };

  var onWizardsLoadError = function (message) {
    window.util.showError(message);
  };

  var onWizardsSaveError = function (message) {
    window.util.showError(message);
  };

  var onSetupSubmit = function (evt) {
    window.backend.save(new FormData(setupForm), closeSetup, onWizardsSaveError);
    evt.preventDefault();
  };

  var openSetup = function () {
    setupWindow.classList.remove('hidden');

    window.backend.load(onWizardsLoad, onWizardsLoadError);

    document.querySelector('.setup-similar').classList.remove('hidden');

    closeSetupButton.addEventListener('click', onCloseSetupButtonClick);
    document.addEventListener('keydown', onSetupEscPress);
    userNameInputElement.addEventListener('invalid', onInputFormSend);
    closeSetupButton.addEventListener('keydown', onCloseSetupButtonEnterPress);
    openSetupButton.removeEventListener('click', onSetupButtonClick);
    openSetupButton.removeEventListener('keydown', onSetupButtonEnterPress);
    window.wizard.addListeners();
    setupForm.addEventListener('submit', onSetupSubmit);
    window.drag.activate(uploadButton, setupWindow);

    window.imageInjection.activate(imageInput, imagePreview);
  };

  var closeSetup = function () {
    setupWindow.classList.add('hidden');

    window.similarWizards.remove();

    closeSetupButton.removeEventListener('click', onCloseSetupButtonClick);
    document.removeEventListener('keydown', onSetupEscPress);
    userNameInputElement.removeEventListener('invalid', onInputFormSend);
    closeSetupButton.removeEventListener('keydown', onCloseSetupButtonEnterPress);
    openSetupButton.addEventListener('click', onSetupButtonClick);
    openSetupButton.addEventListener('keydown', onSetupButtonEnterPress);
    window.wizard.removeListeners();
    setupForm.removeEventListener('submit', onSetupSubmit);
    window.drag.deactivate();

    window.imageInjection.deactivate();
  };

  window.setup = {
    showSimilarWizards: showSimilarWizards
  };

  openSetupButton.addEventListener('click', onSetupButtonClick);
  openSetupButton.addEventListener('keydown', onSetupButtonEnterPress);

})();
