'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timer = function (_Component) {
  _inherits(Timer, _Component);

  function Timer(props) {
    var _ref;

    _classCallCheck(this, Timer);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Timer.__proto__ || Object.getPrototypeOf(Timer)).call.apply(_ref, [this, props].concat(args)));

    _this.timerId = null;
    _this.prevTime = null;
    _this.state = { remaining: props.remaining };
    return _this;
  }

  _createClass(Timer, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { remaining: this.state.remaining };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.timerId = setInterval(this.handleTick.bind(this), this.props.interval);
      this.prevTime = Date.now();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearTimer();
    }
  }, {
    key: 'clearTimer',
    value: function clearTimer() {
      clearInterval(this.timerId);
      this.timerId = null;
      this.prevTime = null;
    }
  }, {
    key: 'handleTick',
    value: function handleTick() {
      var currentTime = Date.now();
      var elapsed = currentTime - this.prevTime;
      var nextRemaining = this.state.remaining - elapsed;
      if (nextRemaining <= 0) {
        if (this.props.afterComplete !== null) {
          this.props.afterComplete();
        }
        this.clearTimer();
        this.setState({ remaining: 0 });
      } else {
        if (this.props.afterTick !== null) {
          this.props.afterTick(nextRemaining);
        }
        this.prevTime = currentTime;
        this.setState({ remaining: nextRemaining });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          children = _props.children;

      return _react2.default.createElement(
        'div',
        { style: style },
        children
      );
    }
  }]);

  return Timer;
}(_react.Component);

Timer.propTypes = {
  interval: _propTypes2.default.number, // msec
  remaining: _propTypes2.default.number.isRequired, // msec
  afterTick: _propTypes2.default.func, // callback after each ticks
  afterComplete: _propTypes2.default.func, // callback after remaining <= 0
  style: _reactStyleProptype2.default, // container style object
  children: _propTypes2.default.node // children react element node
};
Timer.defaultProps = {
  interval: 1000,
  afterTick: null,
  afterComplete: null,
  style: {},
  children: null
};
Timer.childContextTypes = {
  remaining: _propTypes2.default.number
};
exports.default = Timer;
