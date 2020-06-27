'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  var renderSimilarWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderAllSimilarWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.append(renderSimilarWizard(wizards[i]));
    }
    similarListElement.append(fragment);
  };

  var removeAllSimilarWizards = function () {
    similarListElement.innerHTML = '';
  };

  window.similarWizards = {
    render: renderAllSimilarWizards,
    remove: removeAllSimilarWizards
  };
})();
