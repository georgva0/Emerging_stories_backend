"use strict";

var _express = _interopRequireDefault(require("express"));

var _init = require("./init");

var _regions = _interopRequireDefault(require("./listings/regions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _init.init)();
var app = (0, _express["default"])();
var port = process.env.PORT || 8000;
app.get("/", function (req, res) {
  return res.send("App started!");
});
app.get("/api/all", function (req, res) {
  return res.send(_init.allData[0]);
});
app.get("/api/:region", function (req, res) {
  var regionsArray = _regions["default"].map(function (item) {
    return item.serviceUrl;
  });

  if (regionsArray.indexOf(req.params.region) !== -1) {
    res.send(_init.allData[regionsArray.indexOf(req.params.region) + 1]);
  } else {
    res.send("".concat(req.params.region, " is not a valid WS region."));
  }
});
app.listen(port, function () {
  return console.log("Listening on port ".concat(port));
});
//# sourceMappingURL=server.js.map