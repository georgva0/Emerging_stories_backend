"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//import contentApiKey from "../cert/contentApiKey";
var getContentApiData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _crossFetch["default"])("http://content-api-a127.api.bbci.co.uk/asset/".concat(url, "?api_key=").concat(process.env.CONTENT_API_KEY), {
              method: "GET",
              headers: {
                "x-candy-platform": "EnhancedMobile",
                "x-candy-audience": "Domestic",
                Accept: "application/json"
              }
            });

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            // try{
            // } catch(error){
            //   throw "An error has occurred when trying to access json";
            // }
            console.log("An error has occurred when accessing ContentAPI for ".concat(url));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function getContentApiData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getContentApiData;
exports["default"] = _default;
//# sourceMappingURL=contentApi.js.map