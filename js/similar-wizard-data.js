'use strict';


(function () {

  var SimilarWizardAttributeRank = {
    COAT: 2,
    EYES: 1
  };


  var getSimilarRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.wizard.getWizardCurrentColor().COAT) {
      rank += SimilarWizardAttributeRank.COAT;
    }
    if (wizard.colorEyes === window.wizard.getWizardCurrentColor().EYES) {
      rank += SimilarWizardAttributeRank.EYES;
    }

    return rank;
  };

  var rankSimilarWizards = function (wizards) {
    return wizards.map(function (wizard) {
      wizard.rank = getSimilarRank(wizard);
      return wizard;
    });
  };

  var sortSimilarWizards = function (data) {
    var rankedWizards = rankSimilarWizards(data.slice());

    return rankedWizards
      .sort(function (left, right) {
        if (left.name > right.name) {
          return 1;
        }
        if (left.name < right.name) {
          return -1;
        }
        return 0;
      })
      .sort(function (left, right) {
        return right.rank - left.rank;
      });
  };


  window.similarWizardsData = {
    sortSimilarWizards: sortSimilarWizards
  };

})();
