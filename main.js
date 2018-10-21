'use strict';

(function () {
  var Msg = {
    NO_ODDS: 'NO ODDS',
    BAD_FORMAT: 'BAD FORMAT'
  };
  var DELIMITER_CHAR = ';';
  var parseButton = document.querySelector('.parse_button');

  var successHandler = function (jsonData) {
    var placeHolder = document.querySelector('.placeholder');
    var outputText = '';

    try {
      var bookmakers = jsonData.delta.bm;

      for (var key in bookmakers) {
        var bookmaker = bookmakers[key];
        var keyDesc = bookmaker.desc;
        var id = keyDesc.id;

        for (var key in bookmaker) {
          if (key !== keyDesc) {
            var odds = bookmaker[key].odds;

            for (var oddType in odds) {
              outputText += id + DELIMITER_CHAR
                       + oddType + DELIMITER_CHAR
                       + odds[oddType] + '<br>';
            }
          }
        }
      }
    } catch (err) {
      window.consile.log(err);
      outputText = Msg.BAD_FORMAT;
    }

    if (outputText.length === 0) {
      outputText = Msg.NO_ODDS;
    }

    placeHolder.innerHTML = outputText;
  };

  var errorHandler = function (errorMessage) {
    window.console.log(errorMessage);
  };

  parseButton.addEventListener('click', function () {
    window.backend.load(successHandler, errorHandler);
  });

})();
