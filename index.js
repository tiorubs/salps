"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SALPSProvider;
exports.useSALPS = useSALPS;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SALPSContext = (0, _react.createContext)({});

function SALPSProvider(_ref) {
  var children = _ref.children,
      reducers = _ref.reducers,
      initialState = _ref.initialState,
      config = _ref.config;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      hardStore = _useState2[0],
      setHardStore = _useState2[1];

  var _useState3 = (0, _react.useState)(initialState),
      _useState4 = _slicedToArray(_useState3, 2),
      state = _useState4[0],
      setState = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  function dispatch(action) {
    if (!action || action && !action.type) return;
    setState(function (state) {
      return reducers(state, action);
    });
  }

  function getData() {
    try {
      var data = localStorage.getItem((config === null || config === void 0 ? void 0 : config.key) || "salps");
      setLoading(false);
      return _objectSpread(_objectSpread({}, initialState), JSON.parse(data));
    } catch (e) {
      setLoading(false);
      return null;
    }
  }

  function setData(data) {
    try {
      localStorage.setItem((config === null || config === void 0 ? void 0 : config.key) || "salps", JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function initialActions() {
    setState(getData() || {});
  }

  function checkHardStore() {
    if (!config || config && !config.persistList) return;
    var newHardStore = {};

    for (var i = 0; i < config.persistList.length; i++) {
      var persistKey = config.persistList[i];
      if (state[persistKey] !== hardStore[persistKey]) newHardStore[persistKey] = state[persistKey];
    }

    if (Object.keys(newHardStore).length > 0) setHardStore(newHardStore);
  }

  function updateData() {
    setData(hardStore);
  }

  (0, _react.useEffect)(initialActions, []);
  (0, _react.useEffect)(checkHardStore, [state]);
  (0, _react.useEffect)(updateData, [hardStore]);
  return /*#__PURE__*/_react["default"].createElement(SALPSContext.Provider, {
    value: {
      state: state,
      dispatch: dispatch,
      loading: loading
    }
  }, children);
}

function useSALPS() {
  return (0, _react.useContext)(SALPSContext);
}
