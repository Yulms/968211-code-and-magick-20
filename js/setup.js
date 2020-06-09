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

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var userDialog = document.querySelector('.setup');


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

renderAllWizards(createWizards(WIZARDS_NUMBER));

document.querySelector('.setup-similar').classList.remove('hidden');
userDialog.classList.remove('hidden');
