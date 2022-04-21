"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var convertTime = function convertTime(time) {
  var dateArray = new Date(time).toDateString().split(" ");
  return "".concat(dateArray[2], " ").concat(dateArray[1], " ").concat(dateArray[3]);
};

var _default = convertTime;
exports["default"] = _default;
//# sourceMappingURL=convertTime.js.map