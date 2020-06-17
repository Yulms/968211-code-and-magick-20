'use strict';

var WIZARDS_NUMBER = 4;
var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];


var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupWindow = document.querySelector('.setup');
var openSetupWindow = document.querySelector('.setup-open');
var closeSetupWindow = setupWindow.querySelector('.setup-close');
var userNameInputElement = setupWindow.querySelector('.setup-user-name');
var wizardCoatElement = setupWindow.querySelector('.wizard-coat');
var wizardCoatHiddenElement = setupWindow.querySelector('[name=coat-color]');
var wizardEyesElement = setupWindow.querySelector('.wizard-eyes');
var wizardEyesHiddenElement = setupWindow.querySelector('[name=eyes-color]');
var fireballWrapElement = setupWindow.querySelector('.setup-fireball-wrap');


var getRandomArrayElement = function (arr) {
  var maxIndex = arr.length - 1;
  var randomIndex = Math.floor(Math.random() * (maxIndex + 1));
  return arr[randomIndex];
};

var createWizards = function (wizardsNumber) {
  var result = [];
  for (var i = 0; i < wizardsNumber; i++) {
    result.push(
        {
          name: getRandomArrayElement(FIRST_NAMES) + ' ' + getRandomArrayElement(LAST_NAMES),
          coatColor: getRandomArrayElement(COAT_COLORS),
          eyesColor: getRandomArrayElement(EYES_COLORS)
        }
    );
  }

  return result;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').setAttribute('style', 'fill: ' + wizard.coatColor);
  wizardElement.querySelector('.wizard-eyes').setAttribute('style', 'fill: ' + wizard.eyesColor);

  return wizardElement;
};

var renderAllWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.append(renderWizard(wizards[i]));
  }
  similarListElement.append(fragment);
};

var onPopupClose = function () {
  setupWindow.classList.add('hidden');

  closeSetupWindow.removeEventListener('click', onPopupClose);
  document.removeEventListener('keydown', onSetupEscPress);
  userNameInputElement.removeEventListener('invalid', onInputFormSend);
  closeSetupWindow.removeEventListener('keydown', onSetupCloseEnterPress);
  openSetupWindow.addEventListener('click', onPopupOpen);
  openSetupWindow.addEventListener('keydown', onSetupButtonEnterPress);

  wizardCoatElement.removeEventListener('click', onWizardCoatClick);
  wizardEyesElement.removeEventListener('click', onWizardEyesClick);
  fireballWrapElement.removeEventListener('click', onFireballWrapClick);
};

var onPopupOpen = function () {
  setupWindow.classList.remove('hidden');

  closeSetupWindow.addEventListener('click', onPopupClose);
  document.addEventListener('keydown', onSetupEscPress);
  userNameInputElement.addEventListener('invalid', onInputFormSend);
  closeSetupWindow.addEventListener('keydown', onSetupCloseEnterPress);
  openSetupWindow.removeEventListener('click', onPopupOpen);
  openSetupWindow.removeEventListener('keydown', onSetupButtonEnterPress);

  wizardCoatElement.addEventListener('click', onWizardCoatClick);
  wizardEyesElement.addEventListener('click', onWizardEyesClick);
  fireballWrapElement.addEventListener('click', onFireballWrapClick);

};

var onSetupButtonEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    onPopupOpen();
  }
};

var onSetupEscPress = function (evt) {
  if (evt.key === 'Escape' && evt.target !== userNameInputElement) {
    onPopupClose();
  }
};

var onSetupCloseEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    onPopupClose();
  }
};

var onInputFormSend = function () {
  switch (true) {
    case (userNameInputElement.validity.tooShort):
      userNameInputElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      break;
    case (userNameInputElement.validity.tooLong):
      userNameInputElement.setCustomValidity('Имя не должно превышать 25-ти символов');
      break;
    case (userNameInputElement.validity.valueMissing):
      userNameInputElement.setCustomValidity('Обязательное поле');
      break;
    default:
      userNameInputElement.setCustomValidity('');
  }
};

var onWizardCoatClick = function () {
  var coatColor = getRandomArrayElement(COAT_COLORS);
  wizardCoatElement.style.fill = coatColor;
  wizardCoatHiddenElement.value = coatColor;
};

var onWizardEyesClick = function () {
  var eyesColor = getRandomArrayElement(EYES_COLORS);
  wizardEyesElement.style.fill = eyesColor;
  wizardEyesHiddenElement.value = eyesColor;
};

var onFireballWrapClick = function () {
  var fireballColor = getRandomArrayElement(FIREBALL_COLORS);
  fireballWrapElement.style.background = fireballColor;
  fireballWrapElement.querySelector('[name=fireball-color]').value = fireballColor;
};


renderAllWizards(createWizards(WIZARDS_NUMBER));

document.querySelector('.setup-similar').classList.remove('hidden');

openSetupWindow.addEventListener('click', onPopupOpen);
openSetupWindow.addEventListener('keydown', onSetupButtonEnterPress);
