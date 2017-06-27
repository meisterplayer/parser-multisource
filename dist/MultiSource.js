module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MultiSource = __webpack_require__(1);

var _MultiSource2 = _interopRequireDefault(_MultiSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _MultiSource2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _package = __webpack_require__(2);

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSource = function (_Meister$ParserPlugin) {
    _inherits(MultiSource, _Meister$ParserPlugin);

    function MultiSource() {
        _classCallCheck(this, MultiSource);

        return _possibleConstructorReturn(this, (MultiSource.__proto__ || Object.getPrototypeOf(MultiSource)).apply(this, arguments));
    }

    _createClass(MultiSource, [{
        key: 'isItemSupported',
        value: function isItemSupported(item) {
            // eslint-disable-line
            return new Promise(function (resolve) {
                if (item.type !== 'multi-source') {
                    return resolve({
                        supported: false,
                        errorCode: Meister.ErrorCodes.WRONG_TYPE
                    });
                }

                return resolve({
                    supported: true
                });
            });
        }
    }, {
        key: 'restructureItems',
        value: function restructureItems(sources) {
            var hasDRM = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            // eslint-disable-line
            var restructedItems = [];

            for (var i = 0; i < sources.length; i += 1) {
                var source = sources[i];

                var sourceHasDRM = Object.prototype.hasOwnProperty.call(source, 'drm');

                if (!sourceHasDRM) {
                    source.drm = hasDRM;
                }

                restructedItems.push(source);
            }

            return restructedItems;
        }
    }, {
        key: 'getItemToPlay',
        value: function getItemToPlay(items) {
            var _this2 = this;

            var item = items[0];

            return this.meister.pluginLoader.getPluginByItem(item).then(function (plugin) {
                if (plugin.errorCode && items.length > 1) {
                    items.shift();
                    return _this2.getItemToPlay(items);
                } else if (!plugin.errorCode) {
                    return item;
                }

                _this2.meister.error('Could not find plugin to play type: \'' + item.type + '\'.', 'MLTSRC-0001', { title: 'Unable to play content.' });
                return null;
            });
        }
    }, {
        key: 'process',
        value: function process(item) {
            var _this3 = this;

            if (item.src && !item.sources) {
                item.sources = item.src;
            }

            this.currentItem = item;

            // Set default config
            if (typeof this.currentItem.switchItemOnError === 'undefined') {
                this.currentItem.switchItemOnError = true;
            }

            return new Promise(function (resolve, reject) {
                var hasDRM = _typeof(item.drmConfig) === 'object';
                item.sources = _this3.restructureItems(item.sources, hasDRM); // eslint-disable-line

                _this3.getItemToPlay(item.sources).then(function (newItem) {
                    if (newItem == null) {
                        reject(item);
                    } else {
                        if (item.metadata) {
                            newItem.metadata = item.metadata; // eslint-disable-line
                        }

                        if (_this3.currentItem.switchItemOnError) {
                            _this3.on('playerError', _this3.onPlayerError.bind(_this3));
                        }

                        resolve(newItem);
                    }
                });
            });
        }
    }, {
        key: 'onPlayerError',
        value: function onPlayerError() {
            // Unload our previous item.
            _get(MultiSource.prototype.__proto__ || Object.getPrototypeOf(MultiSource.prototype), 'unload', this).call(this);

            // We can remove the first item in our sources since it's not able to play.
            var removedItem = this.currentItem.sources.shift();

            // Make sure we do have sources to play.
            if (!this.currentItem.sources.length) return;

            console.warn(MultiSource.pluginName + ': Item \'' + removedItem.type + '\' ran into an error while playing. Switching items for optimal experience.');

            // Now retry the whole flow.
            this.meister.setItem(this.currentItem);
            this.meister.load();
        }
    }], [{
        key: 'pluginName',
        get: function get() {
            return 'MultiSource';
        }
    }, {
        key: 'pluginVersion',
        get: function get() {
            return _package2.default.version;
        }
    }]);

    return MultiSource;
}(Meister.ParserPlugin);

Meister.registerPlugin(MultiSource.pluginName, MultiSource);
Meister.registerPlugin('multisource', MultiSource);
exports.default = MultiSource;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
	"name": "@meisterplayer/plugin-multisource",
	"version": "5.2.0",
	"description": "Meister plugin for having multiple sources in one item",
	"main": "dist/MultiSource.js",
	"keywords": [
		"meister",
		"video",
		"plugin"
	],
	"repository": {
		"type": "git",
		"url": "https://github.com/meisterplayer/parser-multisource.git"
	},
	"author": "Triple",
	"license": "Apache-2.0",
	"devDependencies": {
		"meister-gulp-webpack-tasks": "^1.0.6",
		"meister-js-dev": "^3.1.0",
		"babel-preset-es2015": "^6.24.0",
		"babel-preset-es2017": "^6.22.0",
		"gulp": "^3.9.1"
	}
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=MultiSource.js.map