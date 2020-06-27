'use strict';

(function () {

  var setupWindow = document.querySelector('.setup');
  var openSetupButton = document.querySelector('.setup-open');
  var closeSetupButton = setupWindow.querySelector('.setup-close');
  var userNameInputElement = setupWindow.querySelector('.setup-user-name');
  var wizardCoatElement = setupWindow.querySelector('.wizard-coat');
  var wizardCoatHiddenElement = setupWindow.querySelector('[name=coat-color]');
  var wizardEyesElement = setupWindow.querySelector('.wizard-eyes');
  var wizardEyesHiddenElement = setupWindow.querySelector('[name=eyes-color]');
  var fireballWrapElement = setupWindow.querySelector('.setup-fireball-wrap');
  var uploadButton = setupWindow.querySelector('.upload');

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

  var onWizardCoatClick = function () {
    var coatColor = window.color.getCoatColor();
    wizardCoatElement.style.fill = coatColor;
    wizardCoatHiddenElement.value = coatColor;
  };

  var onWizardEyesClick = function () {
    var eyesColor = window.color.getEyesColor();
    wizardEyesElement.style.fill = eyesColor;
    wizardEyesHiddenElement.value = eyesColor;
  };

  var onFireballWrapClick = function () {
    var fireballColor = window.color.getFireballColor();
    fireballWrapElement.style.background = fireballColor;
    fireballWrapElement.querySelector('[name=fireball-color]').value = fireballColor;
  };

  var openSetup = function () {
    setupWindow.classList.remove('hidden');

    window.similarWizards.render(window.data.createWizardsData());
    document.querySelector('.setup-similar').classList.remove('hidden');

    closeSetupButton.addEventListener('click', onCloseSetupButtonClick);
    document.addEventListener('keydown', onSetupEscPress);
    userNameInputElement.addEventListener('invalid', onInputFormSend);
    closeSetupButton.addEventListener('keydown', onCloseSetupButtonEnterPress);
    openSetupButton.removeEventListener('click', onSetupButtonClick);
    openSetupButton.removeEventListener('keydown', onSetupButtonEnterPress);
    wizardCoatElement.addEventListener('click', onWizardCoatClick);
    wizardEyesElement.addEventListener('click', onWizardEyesClick);
    fireballWrapElement.addEventListener('click', onFireballWrapClick);

    window.drag.activate(uploadButton, setupWindow);
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
    wizardCoatElement.removeEventListener('click', onWizardCoatClick);
    wizardEyesElement.removeEventListener('click', onWizardEyesClick);
    fireballWrapElement.removeEventListener('click', onFireballWrapClick);

    window.drag.deActivate();
  };


  openSetupButton.addEventListener('click', onSetupButtonClick);
  openSetupButton.addEventListener('keydown', onSetupButtonEnterPress);


})();
