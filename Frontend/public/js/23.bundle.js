(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "PgAC":
/*!**************************************************************!*\
  !*** ./src/ui/desktop/clienAlertDetail/ClientAlertDetail.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _ClientAlertDetail = __webpack_require__(/*! ./ClientAlertDetail.jsx */ \"ReK8\");\n\nvar _ClientAlertDetail2 = _interopRequireDefault(_ClientAlertDetail);\n\nvar _BaseComponent2 = __webpack_require__(/*! ../../BaseComponent */ \"Kh+H\");\n\nvar _BaseComponent3 = _interopRequireDefault(_BaseComponent2);\n\n__webpack_require__(/*! ./ClientAlertDetail.scss */ \"azvX\");\n\nvar _Libs = __webpack_require__(/*! ../../../utils/Libs */ \"aKSJ\");\n\nvar _Libs2 = _interopRequireDefault(_Libs);\n\nvar _SiteService = __webpack_require__(/*! ../../../services/SiteService */ \"DudT\");\n\nvar _SiteService2 = _interopRequireDefault(_SiteService);\n\nvar _AlertService = __webpack_require__(/*! ../../../services/AlertService */ \"27i2\");\n\nvar _AlertService2 = _interopRequireDefault(_AlertService);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ClientAlertDetail = function (_BaseComponent) {\n  _inherits(ClientAlertDetail, _BaseComponent);\n\n  function ClientAlertDetail(props, context) {\n    _classCallCheck(this, ClientAlertDetail);\n\n    var _this = _possibleConstructorReturn(this, (ClientAlertDetail.__proto__ || Object.getPrototypeOf(ClientAlertDetail)).call(this, props, context));\n\n    _this.jsxTemplate = _ClientAlertDetail2.default;\n    var queryParams = !_Libs2.default.isBlank(_this.props.baseParam) && !_Libs2.default.isObjectEmpty(_this.props.baseParam.match.params) ? _this.props.baseParam.match.params : {};\n    _this.state = {\n      curItem: {},\n      curDetail: {},\n      queryParams: {\n        id_site: !_Libs2.default.isObjectEmpty(queryParams) ? queryParams.id : null,\n        id_customer: !_Libs2.default.isBlank(_this.user) ? _this.user.id_user : null,\n        id_alert: !_Libs2.default.isObjectEmpty(queryParams) ? queryParams.id_alert : null\n      }\n    };\n    return _this;\n  }\n\n  _createClass(ClientAlertDetail, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      _get(ClientAlertDetail.prototype.__proto__ || Object.getPrototypeOf(ClientAlertDetail.prototype), 'componentDidMount', this).call(this);\n      this.getDetailSite();\n    }\n\n    /**\n    * Get detail alert\n    * @author long.pham 2020-11-24\n    * @param id_site, id_customer, id_alert, current_time\n    * @return Object\n    */\n\n  }, {\n    key: 'getDetailAlert',\n    value: function getDetailAlert() {\n      var self = this;\n      var _state = this.state,\n          curItem = _state.curItem,\n          queryParams = _state.queryParams;\n\n\n      var params = {\n        id_site: parseInt(queryParams.id_site),\n        id_customer: parseInt(curItem.id_customer),\n        id: parseInt(queryParams.id_alert),\n        current_time: _Libs2.default.convertAllFormatDate(_Libs2.default.getCurrentMMDDYYYYHI()),\n        offset_timezone: _Libs2.default.getOffsetTimeZone(curItem.max_date),\n        format_sql_long: curItem.format_sql_long,\n        format_sql_short: curItem.format_sql_short,\n        format_sql_string_long: curItem.format_sql_string_long,\n        format_sql_string_short: curItem.format_sql_string_short,\n        format_sql_string_mdy: curItem.format_sql_string_mdy\n      };\n\n      _AlertService2.default.instance.getDetailAlert(params, function (data) {\n        if (data) {\n          self.setState({\n            curDetail: data\n          });\n        } else {\n          self.props.baseParam.history.push('/');\n        }\n      });\n    }\n\n    /**\n    * Get detail site\n    * @author long.pham 2020-11-24\n    * @param id_site, id_customer\n    * @return Object\n    */\n\n  }, {\n    key: 'getDetailSite',\n    value: function getDetailSite() {\n      var self = this;\n      var _state2 = this.state,\n          curItem = _state2.curItem,\n          queryParams = _state2.queryParams;\n\n\n      var params = {\n        id: queryParams.id_site,\n        id_customer: queryParams.id_customer\n      };\n\n      _SiteService2.default.instance.getDashboardDetailSite(params, function (data) {\n        if (data) {\n          curItem = Object.assign({}, data, curItem);\n          self.setState({\n            curItem: curItem\n          }, function () {\n            self.getDetailAlert();\n          });\n        } else {\n          self.props.baseParam.history.push('/');\n        }\n      });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      return this.jsxTemplate.call(this);\n    }\n  }]);\n\n  return ClientAlertDetail;\n}(_BaseComponent3.default);\n\nexports.default = ClientAlertDetail;\n\n//# sourceURL=webpack:///./src/ui/desktop/clienAlertDetail/ClientAlertDetail.js?");

/***/ }),

/***/ "ReK8":
/*!***************************************************************!*\
  !*** ./src/ui/desktop/clienAlertDetail/ClientAlertDetail.jsx ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  var _state = this.state,\n      curItem = _state.curItem,\n      curDetail = _state.curDetail;\n\n\n  return _react2.default.createElement(\n    'section',\n    { className: 'client-alert' },\n    _react2.default.createElement(\n      'div',\n      { className: 'container-fluid' },\n      _react2.default.createElement(\n        'div',\n        { className: 'row' },\n        _react2.default.createElement(\n          'div',\n          { className: 'col-xl-12 col-lg-12 col-md-12' },\n          _react2.default.createElement(\n            'ol',\n            { className: 'breadcrumb' },\n            _react2.default.createElement(\n              'li',\n              { className: 'breadcrumb-item' },\n              _react2.default.createElement(\n                _reactRouterDom.NavLink,\n                { to: '/' },\n                'Home'\n              )\n            ),\n            _react2.default.createElement(\n              'li',\n              { className: 'breadcrumb-item' },\n              _react2.default.createElement(\n                _reactRouterDom.NavLink,\n                { to: \"/client/\" + curItem.id },\n                curItem.name\n              )\n            )\n          )\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'col-xl-12 col-lg-12 col-md-12' },\n          _react2.default.createElement(\n            'div',\n            { className: 'title' },\n            'Alert details'\n          )\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'col-xl-12 col-lg-12 col-md-12' },\n          _react2.default.createElement(\n            'div',\n            { className: 'alert-detail' },\n            _react2.default.createElement(\n              'div',\n              { className: 'row' },\n              _react2.default.createElement(\n                'div',\n                { className: 'col-xl-6 col-lg-6 col-md-6' },\n                _react2.default.createElement(\n                  'table',\n                  { className: 'table table-bordered table-striped table-hover' },\n                  _react2.default.createElement(\n                    'tbody',\n                    null,\n                    _react2.default.createElement(\n                      'tr',\n                      null,\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        'Plant'\n                      ),\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        curDetail.site_name\n                      )\n                    ),\n                    _react2.default.createElement(\n                      'tr',\n                      null,\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        'Device'\n                      ),\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        curDetail.devicename\n                      )\n                    ),\n                    _react2.default.createElement(\n                      'tr',\n                      null,\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        'Erroe code'\n                      ),\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        curDetail.error_code\n                      )\n                    ),\n                    _react2.default.createElement(\n                      'tr',\n                      null,\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        'Error message'\n                      ),\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        curDetail.message\n                      )\n                    ),\n                    _react2.default.createElement(\n                      'tr',\n                      null,\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        'Severity'\n                      ),\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        curDetail.level\n                      )\n                    ),\n                    _react2.default.createElement(\n                      'tr',\n                      null,\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        'Activation Time'\n                      ),\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        curDetail.start_date\n                      )\n                    ),\n                    _react2.default.createElement(\n                      'tr',\n                      null,\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        'Deactivation Date'\n                      ),\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        curDetail.end_date\n                      )\n                    ),\n                    _react2.default.createElement(\n                      'tr',\n                      null,\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        'Total Incident Time'\n                      ),\n                      _react2.default.createElement(\n                        'td',\n                        null,\n                        curDetail.duration\n                      )\n                    )\n                  )\n                )\n              )\n            )\n          )\n        )\n      )\n    )\n  );\n};\n\nvar _react = __webpack_require__(/*! react */ \"q1tI\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"eO8H\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./src/ui/desktop/clienAlertDetail/ClientAlertDetail.jsx?");

/***/ }),

/***/ "azvX":
/*!****************************************************************!*\
  !*** ./src/ui/desktop/clienAlertDetail/ClientAlertDetail.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/ui/desktop/clienAlertDetail/ClientAlertDetail.scss?");

/***/ })

}]);