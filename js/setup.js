'use strict';

(function () {
  var KeyCodes = {
    ENTER: 13,
    ESCAPE: 27
  };

  var setupWindow = document.querySelector('.setup');
  var openSetupWindow = document.querySelector('.setup-open');
  var closeSetupWindow = setupWindow.querySelector('.setup-close');
  var userNameInputElement = setupWindow.querySelector('.setup-user-name');
  var wizardCoatElement = setupWindow.querySelector('.wizard-coat');
  var wizardCoatHiddenElement = setupWindow.querySelector('[name=coat-color]');
  var wizardEyesElement = setupWindow.querySelector('.wizard-eyes');
  var wizardEyesHiddenElement = setupWindow.querySelector('[name=eyes-color]');
  var fireballWrapElement = setupWindow.querySelector('.setup-fireball-wrap');


  var onSetupClose = function () {
    setupWindow.classList.add('hidden');

    closeSetupWindow.removeEventListener('click', onSetupClose);
    document.removeEventListener('keydown', onSetupEscPress);
    userNameInputElement.removeEventListener('invalid', onInputFormSend);
    closeSetupWindow.removeEventListener('keydown', onSetupCloseEnterPress);
    openSetupWindow.addEventListener('click', onSetupOpen);
    openSetupWindow.addEventListener('keydown', onSetupButtonEnterPress);

    wizardCoatElement.removeEventListener('click', onWizardCoatClick);
    wizardEyesElement.removeEventListener('click', onWizardEyesClick);
    fireballWrapElement.removeEventListener('click', onFireballWrapClick);
  };

  var onSetupOpen = function () {
    setupWindow.classList.remove('hidden');

    closeSetupWindow.addEventListener('click', onSetupClose);
    document.addEventListener('keydown', onSetupEscPress);
    userNameInputElement.addEventListener('invalid', onInputFormSend);
    closeSetupWindow.addEventListener('keydown', onSetupCloseEnterPress);
    openSetupWindow.removeEventListener('click', onSetupOpen);
    openSetupWindow.removeEventListener('keydown', onSetupButtonEnterPress);

    wizardCoatElement.addEventListener('click', onWizardCoatClick);
    wizardEyesElement.addEventListener('click', onWizardEyesClick);
    fireballWrapElement.addEventListener('click', onFireballWrapClick);

  };

  var onSetupButtonEnterPress = function (evt) {
    if (evt.keyCode === KeyCodes.ENTER) {
      onSetupOpen();
    }
  };

  var onSetupEscPress = function (evt) {
    if (evt.keyCode === KeyCodes.ESCAPE && evt.target !== userNameInputElement) {
      onSetupClose();
    }
  };

  var onSetupCloseEnterPress = function (evt) {
    if (evt.keyCode === KeyCodes.ENTER) {
      onSetupClose();
    }
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


  window.similarWizards.render(window.data.createWizardsData());

  document.querySelector('.setup-similar').classList.remove('hidden');

  openSetupWindow.addEventListener('click', onSetupOpen);
  openSetupWindow.addEventListener('keydown', onSetupButtonEnterPress);

})();
