'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var EVENT = function EVENT(pageID) {
    return 'register:' + pageID;
};

var Router = (function (_EventEmitter) {
    _inherits(Router, _EventEmitter);

    function Router() {
        _classCallCheck(this, Router);

        _get(Object.getPrototypeOf(Router.prototype), 'constructor', this).call(this);
        this.routes = {};
    }

    _createClass(Router, [{
        key: 'getController',
        value: function getController(pageID) {
            var _this = this;

            return new Promise(function (resolve) {
                _this.once(EVENT(pageID), function () {
                    resolve(_this.routes[pageID]);
                });
            });
        }
    }, {
        key: 'selectRoute',
        value: function selectRoute(pageID) {
            var promise = this.getController(pageID);

            if (this.routes[pageID]) {
                this.emit(EVENT(pageID));
            }

            return promise;
        }
    }, {
        key: 'register',
        value: function register(pageID, controller) {
            this.routes[pageID] = controller;
            this.emit(EVENT(pageID));
        }
    }]);

    return Router;
})(_events2['default']);

exports['default'] = new Router();
module.exports = exports['default'];
