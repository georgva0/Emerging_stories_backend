"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

//import chartbeatApiKey from "../cert/chartbeatApiKey";
var getChartbeatApiData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(service) {
    var response, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _crossFetch["default"])("https://api.chartbeat.com/live/toppages/v3/?apikey=".concat(process.env.CHARTBEAT_API_KEY, "&host=").concat(service, ".bbc.co.uk&limit=10&types=2"));

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
            throw "An error has occurred";

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function getChartbeatApiData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getChartbeatApiData;
exports["default"] = _default;
//# sourceMappingURL=chartbeatApi.js.map