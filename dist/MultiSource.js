var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var MultiSource$1 = function (_Meister$ParserPlugin) {
    inherits(MultiSource, _Meister$ParserPlugin);

    function MultiSource() {
        classCallCheck(this, MultiSource);
        return possibleConstructorReturn(this, (MultiSource.__proto__ || Object.getPrototypeOf(MultiSource)).apply(this, arguments));
    }

    createClass(MultiSource, [{
        key: 'isItemSupported',
        value: function isItemSupported(item) {
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

            var restructedItems = [];

            for (var i = 0; i < sources.length; i++) {
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

                        resolve(newItem);
                    }
                });
            });
        }
    }], [{
        key: 'pluginName',
        get: function get$$1() {
            return 'MultiSource';
        }
    }]);
    return MultiSource;
}(Meister.ParserPlugin);

Meister.registerPlugin(MultiSource$1.pluginName, MultiSource$1);

export default MultiSource$1;
//# sourceMappingURL=MultiSource.js.map
