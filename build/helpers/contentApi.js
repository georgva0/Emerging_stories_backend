"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

//import contentApiKey from "../cert/contentApiKey";
var getContentApiData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
    var response, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
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