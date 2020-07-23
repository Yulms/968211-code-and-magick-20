'use strict';

(function () {

  // Как тебе такое? ))

  var WizardAttributes = {
    COAT: {
      element: document.querySelector('.wizard-coat'),
      elementHidden: document.querySelector('[name=coat-color]'),
      CSSColorProperty: 'fill',
      currentColor: 'rgb(101, 137, 164)',
      generateNewColor: window.color.getCoatColor,
      listeners: [
        {
          eventName: 'click',
          handler: onWizardCoatClick
        }
      ]
    },
    EYES: {
      element: document.querySelector('.wizard-eyes'),
      elementHidden: document.querySelector('[name=eyes-color]'),
      CSSColorProperty: 'fill',
      currentColor: 'black',
      generateNewColor: window.color.getEyesColor,
      listeners: [
        {
          eventName: 'click',
          handler: onWizardEyesClick
        }
      ]
    },
    FIREBALL: {
      element: document.querySelector('.setup-fireball-wrap'),
      elementHidden: document.querySelector('[name=fireball-color]'),
      CSSColorProperty: 'backgroundColor',
      currentColor: '#ee4830',
      generateNewColor: window.color.getFireballColor,
      listeners: [
        {
          eventName: 'click',
          handler: onFireballWrapClick
        }
      ]
    }
  };

  function onWizardCoatClick() {
    setWizardAttributeCurrentColor(WizardAttributes.COAT);
    window.debounce(window.setup.showSimilarWizards)();
  }

  function onWizardEyesClick() {
    setWizardAttributeCurrentColor(WizardAttributes.EYES);
    window.debounce(window.setup.showSimilarWizards)();
  }

  function onFireballWrapClick() {
    setWizardAttributeCurrentColor(WizardAttributes.FIREBALL);
  }

  var getWizardCurrentColor = function () {
    var result = {};

    for (var attribute in WizardAttributes) {
      if (WizardAttributes.hasOwnProperty(attribute)) {
        result[attribute] = WizardAttributes[attribute].currentColor;
      }
    }

    return result;
  };

  var setWizardAttributeCurrentColor = function (wizardAttribute) {
    wizardAttribute.currentColor = wizardAttribute.generateNewColor();
    wizardAttribute.element.style[wizardAttribute.CSSColorProperty] = wizardAttribute.currentColor;
    wizardAttribute.elementHidden.value = wizardAttribute.currentColor;
  };

  var addOrRemoveAttributeListeners = function (add, element, listeners) {
    listeners.forEach(function (listener) {
      if (add) {
        element.addEventListener(listener.eventName, listener.handler);
      } else {
        element.removeEventListener(listener.eventName, listener.handler);
      }
    });
  };

  var addOrRemoveListeners = function (add) {
    return function () {
      for (var attribute in WizardAttributes) {
        if (WizardAttributes.hasOwnProperty(attribute)) {
          addOrRemoveAttributeListeners(add, WizardAttributes[attribute].element, WizardAttributes[attribute].listeners);
        }
      }
    };
  };


  window.wizard = {
    getWizardCurrentColor: getWizardCurrentColor,
    addListeners: addOrRemoveListeners(true),
    removeListeners: addOrRemoveListeners(false)
  };


  // var wizardCoatElement = document.querySelector('.wizard-coat');
  // var wizardCoatHiddenElement = document.querySelector('[name=coat-color]');
  // var wizardEyesElement = document.querySelector('.wizard-eyes');
  // var wizardEyesHiddenElement = document.querySelector('[name=eyes-color]');
  // var fireballWrapElement = document.querySelector('.setup-fireball-wrap');
  // var fireballWrapHiddenElement = fireballWrapElement.querySelector('[name=fireball-color]');


  // var сurrentWizardColor = {};


  // var getWizardCurrentColor = function () {
  //   return сurrentWizardColor;
  // };

  // var changeCoatColor = function () {
  //   сurrentWizardColor.coat = window.color.getCoatColor();
  //   wizardCoatElement.style.fill = сurrentWizardColor.coat;
  //   wizardCoatHiddenElement.value = сurrentWizardColor.coat;
  // };

  // var changeEyesColor = function () {
  //   сurrentWizardColor.eyes = window.color.getEyesColor();
  //   wizardEyesElement.style.fill = сurrentWizardColor.eyes;
  //   wizardEyesHiddenElement.value = сurrentWizardColor.eyes;
  // };

  // var changeFireballColor = function () {
  //   сurrentWizardColor.fireball = window.color.getFireballColor();
  //   fireballWrapElement.style.background = сurrentWizardColor.fireball;
  //   fireballWrapHiddenElement.value = сurrentWizardColor.fireball;
  // };

  // var onWizardCoatClick = function () {
  //   changeCoatColor();
  // };

  // var onWizardEyesClick = function () {
  //   changeEyesColor();
  // };

  // var onFireballWrapClick = function () {
  //   changeFireballColor();
  // };

  // var addListeners = function () {
  //   wizardCoatElement.addEventListener('click', onWizardCoatClick);
  //   wizardEyesElement.addEventListener('click', onWizardEyesClick);
  //   fireballWrapElement.addEventListener('click', onFireballWrapClick);
  // };

  // var removeListeners = function () {
  //   wizardCoatElement.removeEventListener('click', onWizardCoatClick);
  //   wizardEyesElement.removeEventListener('click', onWizardEyesClick);
  //   fireballWrapElement.removeEventListener('click', onFireballWrapClick);
  // };


  // window.wizard = {
  //   сurrentWizardColor: getWizardCurrentColor,
  //   addListeners: addListeners,
  //   removeListeners: removeListeners
  // };
})();
