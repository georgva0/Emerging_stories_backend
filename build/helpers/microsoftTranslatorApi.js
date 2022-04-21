"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//import microsoftTranslatorApiKey from "../cert/microsoftTranslatorApiKey";
var translateString = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(text, language) {
    var unRecognised, response, data, _response, _data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            unRecognised = {
              amharic: "am",
              azeri: "az",
              bengali: "bn",
              kyrgyz: "ky",
              marathi: "mr",
              nepali: "ne",
              punjabi: "pa",
              telugu: "te",
              tigrinya: "ti",
              tamil: "ta"
            };

            if (!(Object.keys(unRecognised).indexOf(language) === -1)) {
              _context.next = 17;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return (0, _crossFetch["default"])("https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en", {
              method: "POST",
              headers: {
                "Ocp-Apim-Subscription-Key": process.env.MICROSOFT_TRANSLATOR_API_KEY,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(text)
            });

          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.json();

          case 8:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            throw "An error has occurred when translating from automatically recognised language.";

          case 15:
            _context.next = 30;
            break;

          case 17:
            _context.prev = 17;
            _context.next = 20;
            return (0, _crossFetch["default"])("https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en", // saving this parameter in case if ever needed &from=${unRecognised.language}
            {
              method: "POST",
              headers: {
                "Ocp-Apim-Subscription-Key": process.env.MICROSOFT_TRANSLATOR_API_KEY,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(text)
            });

          case 20:
            _response = _context.sent;
            _context.next = 23;
            return _response.json();

          case 23:
            _data = _context.sent;
            return _context.abrupt("return", _data);

          case 27:
            _context.prev = 27;
            _context.t1 = _context["catch"](17);
            throw "An error has occurred when translating from language that was not automatically detected.";

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 12], [17, 27]]);
  }));

  return function translateString(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = translateString;
exports["default"] = _default;
//# sourceMappingURL=microsoftTranslatorApi.js.map