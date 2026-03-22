import require$$0, { AsyncLocalStorage as AsyncLocalStorage$1 } from "node:async_hooks";
import assetsManifest from "./__vite_rsc_assets_manifest.js";
import { transformProps, transformSourceProps } from "@unpic/core";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function tinyassert(value, message) {
  if (value) return;
  if (message instanceof Error) throw message;
  throw new TinyAssertionError(message, tinyassert);
}
var TinyAssertionError = class extends Error {
  constructor(message, stackStartFunction) {
    super(message ?? "TinyAssertionError");
    if (stackStartFunction && "captureStackTrace" in Error) Error.captureStackTrace(this, stackStartFunction);
  }
};
function safeFunctionCast(f) {
  return f;
}
function memoize(f, options) {
  const keyFn = ((...args) => args[0]);
  const cache = /* @__PURE__ */ new Map();
  return safeFunctionCast(function(...args) {
    const key = keyFn(...args);
    const value = cache.get(key);
    if (typeof value !== "undefined") return value;
    const newValue = f.apply(this, args);
    cache.set(key, newValue);
    return newValue;
  });
}
const SERVER_REFERENCE_PREFIX = "$$server:";
const SERVER_DECODE_CLIENT_PREFIX = "$$decode-client:";
function removeReferenceCacheTag(id) {
  return id.split("$$cache=")[0];
}
function setInternalRequire() {
  globalThis.__vite_rsc_require__ = (id) => {
    if (id.startsWith(SERVER_REFERENCE_PREFIX)) {
      id = id.slice(9);
      return globalThis.__vite_rsc_server_require__(id);
    }
    return globalThis.__vite_rsc_client_require__(id);
  };
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var server_edge = {};
var reactServerDomWebpackServer_edge_production = {};
var reactDom_reactServer = { exports: {} };
var reactDom_reactServer_production = {};
var react_reactServer = { exports: {} };
var react_reactServer_production = {};
var hasRequiredReact_reactServer_production;
function requireReact_reactServer_production() {
  if (hasRequiredReact_reactServer_production) return react_reactServer_production;
  hasRequiredReact_reactServer_production = 1;
  var ReactSharedInternals = { H: null, A: null };
  function formatProdErrorMessage(code) {
    var url = "https://react.dev/errors/" + code;
    if (1 < arguments.length) {
      url += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        url += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var isArrayImpl = Array.isArray;
  function noop() {
  }
  var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty, assign = Object.assign;
  function ReactElement(type, key, props) {
    var refProp = props.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== refProp ? refProp : null,
      props
    };
  }
  function cloneAndReplaceKey(oldElement, newKey) {
    return ReactElement(oldElement.type, newKey, oldElement.props);
  }
  function isValidElement(object) {
    return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function escape(key) {
    var escaperLookup = { "=": "=0", ":": "=2" };
    return "$" + key.replace(/[=:]/g, function(match) {
      return escaperLookup[match];
    });
  }
  var userProvidedKeyEscapeRegex = /\/+/g;
  function getElementKey(element, index) {
    return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
  }
  function resolveThenable(thenable) {
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        throw thenable.reason;
      default:
        switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
          function(fulfilledValue) {
            "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
          },
          function(error) {
            "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
          }
        )), thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
        }
    }
    throw thenable;
  }
  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    var type = typeof children;
    if ("undefined" === type || "boolean" === type) children = null;
    var invokeCallback = false;
    if (null === children) invokeCallback = true;
    else
      switch (type) {
        case "bigint":
        case "string":
        case "number":
          invokeCallback = true;
          break;
        case "object":
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
              break;
            case REACT_LAZY_TYPE:
              return invokeCallback = children._init, mapIntoArray(
                invokeCallback(children._payload),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
          }
      }
    if (invokeCallback)
      return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
        return c;
      })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
        callback,
        escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
          userProvidedKeyEscapeRegex,
          "$&/"
        ) + "/") + invokeCallback
      )), array.push(callback)), 1;
    invokeCallback = 0;
    var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
    if (isArrayImpl(children))
      for (var i = 0; i < children.length; i++)
        nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        );
    else if (i = getIteratorFn(children), "function" === typeof i)
      for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
        nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        );
    else if ("object" === type) {
      if ("function" === typeof children.then)
        return mapIntoArray(
          resolveThenable(children),
          array,
          escapedPrefix,
          nameSoFar,
          callback
        );
      array = String(children);
      throw Error(
        formatProdErrorMessage(
          31,
          "[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array
        )
      );
    }
    return invokeCallback;
  }
  function mapChildren(children, func, context) {
    if (null == children) return children;
    var result = [], count = 0;
    mapIntoArray(children, result, "", "", function(child) {
      return func.call(context, child, count++);
    });
    return result;
  }
  function lazyInitializer(payload) {
    if (-1 === payload._status) {
      var ctor = payload._result;
      ctor = ctor();
      ctor.then(
        function(moduleObject) {
          if (0 === payload._status || -1 === payload._status)
            payload._status = 1, payload._result = moduleObject;
        },
        function(error) {
          if (0 === payload._status || -1 === payload._status)
            payload._status = 2, payload._result = error;
        }
      );
      -1 === payload._status && (payload._status = 0, payload._result = ctor);
    }
    if (1 === payload._status) return payload._result.default;
    throw payload._result;
  }
  function createCacheRoot() {
    return /* @__PURE__ */ new WeakMap();
  }
  function createCacheNode() {
    return { s: 0, v: void 0, o: null, p: null };
  }
  react_reactServer_production.Children = {
    map: mapChildren,
    forEach: function(children, forEachFunc, forEachContext) {
      mapChildren(
        children,
        function() {
          forEachFunc.apply(this, arguments);
        },
        forEachContext
      );
    },
    count: function(children) {
      var n = 0;
      mapChildren(children, function() {
        n++;
      });
      return n;
    },
    toArray: function(children) {
      return mapChildren(children, function(child) {
        return child;
      }) || [];
    },
    only: function(children) {
      if (!isValidElement(children)) throw Error(formatProdErrorMessage(143));
      return children;
    }
  };
  react_reactServer_production.Fragment = REACT_FRAGMENT_TYPE;
  react_reactServer_production.Profiler = REACT_PROFILER_TYPE;
  react_reactServer_production.StrictMode = REACT_STRICT_MODE_TYPE;
  react_reactServer_production.Suspense = REACT_SUSPENSE_TYPE;
  react_reactServer_production.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
  react_reactServer_production.cache = function(fn) {
    return function() {
      var dispatcher = ReactSharedInternals.A;
      if (!dispatcher) return fn.apply(null, arguments);
      var fnMap = dispatcher.getCacheForType(createCacheRoot);
      dispatcher = fnMap.get(fn);
      void 0 === dispatcher && (dispatcher = createCacheNode(), fnMap.set(fn, dispatcher));
      fnMap = 0;
      for (var l = arguments.length; fnMap < l; fnMap++) {
        var arg = arguments[fnMap];
        if ("function" === typeof arg || "object" === typeof arg && null !== arg) {
          var objectCache = dispatcher.o;
          null === objectCache && (dispatcher.o = objectCache = /* @__PURE__ */ new WeakMap());
          dispatcher = objectCache.get(arg);
          void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
        } else
          objectCache = dispatcher.p, null === objectCache && (dispatcher.p = objectCache = /* @__PURE__ */ new Map()), dispatcher = objectCache.get(arg), void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
      }
      if (1 === dispatcher.s) return dispatcher.v;
      if (2 === dispatcher.s) throw dispatcher.v;
      try {
        var result = fn.apply(null, arguments);
        fnMap = dispatcher;
        fnMap.s = 1;
        return fnMap.v = result;
      } catch (error) {
        throw result = dispatcher, result.s = 2, result.v = error, error;
      }
    };
  };
  react_reactServer_production.cacheSignal = function() {
    var dispatcher = ReactSharedInternals.A;
    return dispatcher ? dispatcher.cacheSignal() : null;
  };
  react_reactServer_production.captureOwnerStack = function() {
    return null;
  };
  react_reactServer_production.cloneElement = function(element, config, children) {
    if (null === element || void 0 === element)
      throw Error(formatProdErrorMessage(267, element));
    var props = assign({}, element.props), key = element.key;
    if (null != config)
      for (propName in void 0 !== config.key && (key = "" + config.key), config)
        !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
    var propName = arguments.length - 2;
    if (1 === propName) props.children = children;
    else if (1 < propName) {
      for (var childArray = Array(propName), i = 0; i < propName; i++)
        childArray[i] = arguments[i + 2];
      props.children = childArray;
    }
    return ReactElement(element.type, key, props);
  };
  react_reactServer_production.createElement = function(type, config, children) {
    var propName, props = {}, key = null;
    if (null != config)
      for (propName in void 0 !== config.key && (key = "" + config.key), config)
        hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
    var childrenLength = arguments.length - 2;
    if (1 === childrenLength) props.children = children;
    else if (1 < childrenLength) {
      for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
        childArray[i] = arguments[i + 2];
      props.children = childArray;
    }
    if (type && type.defaultProps)
      for (propName in childrenLength = type.defaultProps, childrenLength)
        void 0 === props[propName] && (props[propName] = childrenLength[propName]);
    return ReactElement(type, key, props);
  };
  react_reactServer_production.createRef = function() {
    return { current: null };
  };
  react_reactServer_production.forwardRef = function(render) {
    return { $$typeof: REACT_FORWARD_REF_TYPE, render };
  };
  react_reactServer_production.isValidElement = isValidElement;
  react_reactServer_production.lazy = function(ctor) {
    return {
      $$typeof: REACT_LAZY_TYPE,
      _payload: { _status: -1, _result: ctor },
      _init: lazyInitializer
    };
  };
  react_reactServer_production.memo = function(type, compare) {
    return {
      $$typeof: REACT_MEMO_TYPE,
      type,
      compare: void 0 === compare ? null : compare
    };
  };
  react_reactServer_production.use = function(usable) {
    return ReactSharedInternals.H.use(usable);
  };
  react_reactServer_production.useCallback = function(callback, deps) {
    return ReactSharedInternals.H.useCallback(callback, deps);
  };
  react_reactServer_production.useDebugValue = function() {
  };
  react_reactServer_production.useId = function() {
    return ReactSharedInternals.H.useId();
  };
  react_reactServer_production.useMemo = function(create, deps) {
    return ReactSharedInternals.H.useMemo(create, deps);
  };
  react_reactServer_production.version = "19.2.4";
  return react_reactServer_production;
}
var react_reactServer_development = {};
var hasRequiredReact_reactServer_development;
function requireReact_reactServer_development() {
  if (hasRequiredReact_reactServer_development) return react_reactServer_development;
  hasRequiredReact_reactServer_development = 1;
  "production" !== process.env.NODE_ENV && (function() {
    function noop() {
    }
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable)
        return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          JSCompiler_inline_result$jscomp$0
        );
        return testStringCoercion(value);
      }
    }
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeof type)
        switch ("number" === typeof type.tag && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return "<>";
      if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning) return false;
      }
      return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          displayName
        ));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      ));
      componentName = this.props.ref;
      return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      newKey = ReactElement(
        oldElement.type,
        newKey,
        oldElement.props,
        oldElement._owner,
        oldElement._debugStack,
        oldElement._debugTask
      );
      oldElement._store && (newKey._store.validated = oldElement._store.validated);
      return newKey;
    }
    function validateChildKeys(node) {
      isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    function getElementKey(element, index) {
      return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
            function(fulfilledValue) {
              "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            },
            function(error) {
              "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          )), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if ("undefined" === type || "boolean" === type) children = null;
      var invokeCallback = false;
      if (null === children) invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(
                  invokeCallback(children._payload),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback
                );
            }
        }
      if (invokeCallback) {
        invokeCallback = children;
        callback = callback(invokeCallback);
        var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
        isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
          callback,
          escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
            userProvidedKeyEscapeRegex,
            "$&/"
          ) + "/") + childKey
        ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
        return 1;
      }
      invokeCallback = 0;
      childKey = "" === nameSoFar ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if (i = getIteratorFn(children), "function" === typeof i)
        for (i === children.entries && (didWarnAboutMaps || console.warn(
          "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
        ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if ("object" === type) {
        if ("function" === typeof children.then)
          return mapIntoArray(
            resolveThenable(children),
            array,
            escapedPrefix,
            nameSoFar,
            callback
          );
        array = String(children);
        throw Error(
          "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (null == children) return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function resolveDispatcher() {
      var dispatcher = ReactSharedInternals.H;
      null === dispatcher && console.error(
        "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
      );
      return dispatcher;
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ioInfo = payload._ioInfo;
        null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
        ioInfo = payload._result;
        var thenable = ioInfo();
        thenable.then(
          function(moduleObject) {
            if (0 === payload._status || -1 === payload._status) {
              payload._status = 1;
              payload._result = moduleObject;
              var _ioInfo = payload._ioInfo;
              null != _ioInfo && (_ioInfo.end = performance.now());
              void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
            }
          },
          function(error) {
            if (0 === payload._status || -1 === payload._status) {
              payload._status = 2;
              payload._result = error;
              var _ioInfo2 = payload._ioInfo;
              null != _ioInfo2 && (_ioInfo2.end = performance.now());
              void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          }
        );
        ioInfo = payload._ioInfo;
        if (null != ioInfo) {
          ioInfo.value = thenable;
          var displayName = thenable.displayName;
          "string" === typeof displayName && (ioInfo.name = displayName);
        }
        -1 === payload._status && (payload._status = 0, payload._result = thenable);
      }
      if (1 === payload._status)
        return ioInfo = payload._result, void 0 === ioInfo && console.error(
          "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
          ioInfo
        ), "default" in ioInfo || console.error(
          "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
          ioInfo
        ), ioInfo.default;
      throw payload._result;
    }
    function createCacheRoot() {
      return /* @__PURE__ */ new WeakMap();
    }
    function createCacheNode() {
      return { s: 0, v: void 0, o: null, p: null };
    }
    var ReactSharedInternals = {
      H: null,
      A: null,
      getCurrentStack: null,
      recentlyCreatedOwnerStacks: 0
    }, isArrayImpl = Array.isArray, REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), hasOwnProperty = Object.prototype.hasOwnProperty, assign = Object.assign, createTask = console.createTask ? console.createTask : function() {
      return null;
    }, createFakeCallStack = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    }, specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = createFakeCallStack.react_stack_bottom_frame.bind(
      createFakeCallStack,
      UnknownOwner
    )();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g;
    react_reactServer_development.Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function() {
            forEachFunc.apply(this, arguments);
          },
          forEachContext
        );
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return children;
      }
    };
    react_reactServer_development.Fragment = REACT_FRAGMENT_TYPE;
    react_reactServer_development.Profiler = REACT_PROFILER_TYPE;
    react_reactServer_development.StrictMode = REACT_STRICT_MODE_TYPE;
    react_reactServer_development.Suspense = REACT_SUSPENSE_TYPE;
    react_reactServer_development.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    react_reactServer_development.cache = function(fn) {
      return function() {
        var dispatcher = ReactSharedInternals.A;
        if (!dispatcher) return fn.apply(null, arguments);
        var fnMap = dispatcher.getCacheForType(createCacheRoot);
        dispatcher = fnMap.get(fn);
        void 0 === dispatcher && (dispatcher = createCacheNode(), fnMap.set(fn, dispatcher));
        fnMap = 0;
        for (var l = arguments.length; fnMap < l; fnMap++) {
          var arg = arguments[fnMap];
          if ("function" === typeof arg || "object" === typeof arg && null !== arg) {
            var objectCache = dispatcher.o;
            null === objectCache && (dispatcher.o = objectCache = /* @__PURE__ */ new WeakMap());
            dispatcher = objectCache.get(arg);
            void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
          } else
            objectCache = dispatcher.p, null === objectCache && (dispatcher.p = objectCache = /* @__PURE__ */ new Map()), dispatcher = objectCache.get(arg), void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
        }
        if (1 === dispatcher.s) return dispatcher.v;
        if (2 === dispatcher.s) throw dispatcher.v;
        try {
          var result = fn.apply(null, arguments);
          fnMap = dispatcher;
          fnMap.s = 1;
          return fnMap.v = result;
        } catch (error) {
          throw result = dispatcher, result.s = 2, result.v = error, error;
        }
      };
    };
    react_reactServer_development.cacheSignal = function() {
      var dispatcher = ReactSharedInternals.A;
      return dispatcher ? dispatcher.cacheSignal() : null;
    };
    react_reactServer_development.captureOwnerStack = function() {
      var getCurrentStack = ReactSharedInternals.getCurrentStack;
      return null === getCurrentStack ? null : getCurrentStack();
    };
    react_reactServer_development.cloneElement = function(element, config, children) {
      if (null === element || void 0 === element)
        throw Error(
          "The argument must be a React element, but you passed " + element + "."
        );
      var props = assign({}, element.props), key = element.key, owner = element._owner;
      if (null != config) {
        var JSCompiler_inline_result;
        a: {
          if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
            config,
            "ref"
          ).get) && JSCompiler_inline_result.isReactWarning) {
            JSCompiler_inline_result = false;
            break a;
          }
          JSCompiler_inline_result = void 0 !== config.ref;
        }
        JSCompiler_inline_result && (owner = getOwner());
        hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
        for (propName in config)
          !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
      }
      var propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        JSCompiler_inline_result = Array(propName);
        for (var i = 0; i < propName; i++)
          JSCompiler_inline_result[i] = arguments[i + 2];
        props.children = JSCompiler_inline_result;
      }
      props = ReactElement(
        element.type,
        key,
        props,
        owner,
        element._debugStack,
        element._debugTask
      );
      for (key = 2; key < arguments.length; key++)
        validateChildKeys(arguments[key]);
      return props;
    };
    react_reactServer_development.createElement = function(type, config, children) {
      for (var i = 2; i < arguments.length; i++)
        validateChildKeys(arguments[i]);
      i = {};
      var key = null;
      if (null != config)
        for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
          "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
        )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (1 === childrenLength) i.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
          childArray[_i] = arguments[_i + 2];
        Object.freeze && Object.freeze(childArray);
        i.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          void 0 === i[propName] && (i[propName] = childrenLength[propName]);
      key && defineKeyPropWarningGetter(
        i,
        "function" === typeof type ? type.displayName || type.name || "Unknown" : type
      );
      var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return ReactElement(
        type,
        key,
        i,
        getOwner(),
        propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
    react_reactServer_development.createRef = function() {
      var refObject = { current: null };
      Object.seal(refObject);
      return refObject;
    };
    react_reactServer_development.forwardRef = function(render) {
      null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
        "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
      ) : "function" !== typeof render ? console.error(
        "forwardRef requires a render function but was given %s.",
        null === render ? "null" : typeof render
      ) : 0 !== render.length && 2 !== render.length && console.error(
        "forwardRef render functions accept exactly two parameters: props and ref. %s",
        1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
      );
      null != render && null != render.defaultProps && console.error(
        "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
      );
      var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
      Object.defineProperty(elementType, "displayName", {
        enumerable: false,
        configurable: true,
        get: function() {
          return ownName;
        },
        set: function(name) {
          ownName = name;
          render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
        }
      });
      return elementType;
    };
    react_reactServer_development.isValidElement = isValidElement;
    react_reactServer_development.lazy = function(ctor) {
      ctor = { _status: -1, _result: ctor };
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _payload: ctor,
        _init: lazyInitializer
      }, ioInfo = {
        name: "lazy",
        start: -1,
        end: -1,
        value: null,
        owner: null,
        debugStack: Error("react-stack-top-frame"),
        debugTask: console.createTask ? console.createTask("lazy()") : null
      };
      ctor._ioInfo = ioInfo;
      lazyType._debugInfo = [{ awaited: ioInfo }];
      return lazyType;
    };
    react_reactServer_development.memo = function(type, compare) {
      null == type && console.error(
        "memo: The first argument must be a component. Instead received: %s",
        null === type ? "null" : typeof type
      );
      compare = {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: void 0 === compare ? null : compare
      };
      var ownName;
      Object.defineProperty(compare, "displayName", {
        enumerable: false,
        configurable: true,
        get: function() {
          return ownName;
        },
        set: function(name) {
          ownName = name;
          type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
        }
      });
      return compare;
    };
    react_reactServer_development.use = function(usable) {
      return resolveDispatcher().use(usable);
    };
    react_reactServer_development.useCallback = function(callback, deps) {
      return resolveDispatcher().useCallback(callback, deps);
    };
    react_reactServer_development.useDebugValue = function(value, formatterFn) {
      return resolveDispatcher().useDebugValue(value, formatterFn);
    };
    react_reactServer_development.useId = function() {
      return resolveDispatcher().useId();
    };
    react_reactServer_development.useMemo = function(create, deps) {
      return resolveDispatcher().useMemo(create, deps);
    };
    react_reactServer_development.version = "19.2.4";
  })();
  return react_reactServer_development;
}
var hasRequiredReact_reactServer;
function requireReact_reactServer() {
  if (hasRequiredReact_reactServer) return react_reactServer.exports;
  hasRequiredReact_reactServer = 1;
  if (process.env.NODE_ENV === "production") {
    react_reactServer.exports = requireReact_reactServer_production();
  } else {
    react_reactServer.exports = requireReact_reactServer_development();
  }
  return react_reactServer.exports;
}
var hasRequiredReactDom_reactServer_production;
function requireReactDom_reactServer_production() {
  if (hasRequiredReactDom_reactServer_production) return reactDom_reactServer_production;
  hasRequiredReactDom_reactServer_production = 1;
  var React2 = requireReact_reactServer();
  function noop() {
  }
  var Internals = {
    d: {
      f: noop,
      r: function() {
        throw Error(
          "Invalid form element. requestFormReset must be passed a form that was rendered by React."
        );
      },
      D: noop,
      C: noop,
      L: noop,
      m: noop,
      X: noop,
      S: noop,
      M: noop
    },
    p: 0,
    findDOMNode: null
  };
  if (!React2.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE)
    throw Error(
      'The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.'
    );
  function getCrossOriginStringAs(as, input) {
    if ("font" === as) return "";
    if ("string" === typeof input)
      return "use-credentials" === input ? input : "";
  }
  reactDom_reactServer_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
  reactDom_reactServer_production.preconnect = function(href, options) {
    "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
  };
  reactDom_reactServer_production.prefetchDNS = function(href) {
    "string" === typeof href && Internals.d.D(href);
  };
  reactDom_reactServer_production.preinit = function(href, options) {
    if ("string" === typeof href && options && "string" === typeof options.as) {
      var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
      "style" === as ? Internals.d.S(
        href,
        "string" === typeof options.precedence ? options.precedence : void 0,
        {
          crossOrigin,
          integrity,
          fetchPriority
        }
      ) : "script" === as && Internals.d.X(href, {
        crossOrigin,
        integrity,
        fetchPriority,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0
      });
    }
  };
  reactDom_reactServer_production.preinitModule = function(href, options) {
    if ("string" === typeof href)
      if ("object" === typeof options && null !== options) {
        if (null == options.as || "script" === options.as) {
          var crossOrigin = getCrossOriginStringAs(
            options.as,
            options.crossOrigin
          );
          Internals.d.M(href, {
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0
          });
        }
      } else null == options && Internals.d.M(href);
  };
  reactDom_reactServer_production.preload = function(href, options) {
    if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
      var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
      Internals.d.L(href, as, {
        crossOrigin,
        integrity: "string" === typeof options.integrity ? options.integrity : void 0,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0,
        type: "string" === typeof options.type ? options.type : void 0,
        fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
        referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
        imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
        imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
        media: "string" === typeof options.media ? options.media : void 0
      });
    }
  };
  reactDom_reactServer_production.preloadModule = function(href, options) {
    if ("string" === typeof href)
      if (options) {
        var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
        Internals.d.m(href, {
          as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
          crossOrigin,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0
        });
      } else Internals.d.m(href);
  };
  reactDom_reactServer_production.version = "19.2.4";
  return reactDom_reactServer_production;
}
var reactDom_reactServer_development = {};
var hasRequiredReactDom_reactServer_development;
function requireReactDom_reactServer_development() {
  if (hasRequiredReactDom_reactServer_development) return reactDom_reactServer_development;
  hasRequiredReactDom_reactServer_development = 1;
  "production" !== process.env.NODE_ENV && (function() {
    function noop() {
    }
    function getCrossOriginStringAs(as, input) {
      if ("font" === as) return "";
      if ("string" === typeof input)
        return "use-credentials" === input ? input : "";
    }
    function getValueDescriptorExpectingObjectForWarning(thing) {
      return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : 'something with type "' + typeof thing + '"';
    }
    function getValueDescriptorExpectingEnumForWarning(thing) {
      return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : "string" === typeof thing ? JSON.stringify(thing) : "number" === typeof thing ? "`" + thing + "`" : 'something with type "' + typeof thing + '"';
    }
    var React2 = requireReact_reactServer(), Internals = {
      d: {
        f: noop,
        r: function() {
          throw Error(
            "Invalid form element. requestFormReset must be passed a form that was rendered by React."
          );
        },
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      },
      p: 0,
      findDOMNode: null
    };
    if (!React2.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE)
      throw Error(
        'The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.'
      );
    "function" === typeof Map && null != Map.prototype && "function" === typeof Map.prototype.forEach && "function" === typeof Set && null != Set.prototype && "function" === typeof Set.prototype.clear && "function" === typeof Set.prototype.forEach || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
    );
    reactDom_reactServer_development.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
    reactDom_reactServer_development.preconnect = function(href, options) {
      "string" === typeof href && href ? null != options && "object" !== typeof options ? console.error(
        "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
        getValueDescriptorExpectingEnumForWarning(options)
      ) : null != options && "string" !== typeof options.crossOrigin && console.error(
        "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
        getValueDescriptorExpectingObjectForWarning(options.crossOrigin)
      ) : console.error(
        "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        getValueDescriptorExpectingObjectForWarning(href)
      );
      "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
    };
    reactDom_reactServer_development.prefetchDNS = function(href) {
      if ("string" !== typeof href || !href)
        console.error(
          "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
          getValueDescriptorExpectingObjectForWarning(href)
        );
      else if (1 < arguments.length) {
        var options = arguments[1];
        "object" === typeof options && options.hasOwnProperty("crossOrigin") ? console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          getValueDescriptorExpectingEnumForWarning(options)
        ) : console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          getValueDescriptorExpectingEnumForWarning(options)
        );
      }
      "string" === typeof href && Internals.d.D(href);
    };
    reactDom_reactServer_development.preinit = function(href, options) {
      "string" === typeof href && href ? null == options || "object" !== typeof options ? console.error(
        "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
        getValueDescriptorExpectingEnumForWarning(options)
      ) : "style" !== options.as && "script" !== options.as && console.error(
        'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
        getValueDescriptorExpectingEnumForWarning(options.as)
      ) : console.error(
        "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        getValueDescriptorExpectingObjectForWarning(href)
      );
      if ("string" === typeof href && options && "string" === typeof options.as) {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
        "style" === as ? Internals.d.S(
          href,
          "string" === typeof options.precedence ? options.precedence : void 0,
          {
            crossOrigin,
            integrity,
            fetchPriority
          }
        ) : "script" === as && Internals.d.X(href, {
          crossOrigin,
          integrity,
          fetchPriority,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0
        });
      }
    };
    reactDom_reactServer_development.preinitModule = function(href, options) {
      var encountered = "";
      "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
      void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "script" !== options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingEnumForWarning(options.as) + ".");
      if (encountered)
        console.error(
          "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
          encountered
        );
      else
        switch (encountered = options && "string" === typeof options.as ? options.as : "script", encountered) {
          case "script":
            break;
          default:
            encountered = getValueDescriptorExpectingEnumForWarning(encountered), console.error(
              'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
              encountered,
              href
            );
        }
      if ("string" === typeof href)
        if ("object" === typeof options && null !== options) {
          if (null == options.as || "script" === options.as)
            encountered = getCrossOriginStringAs(
              options.as,
              options.crossOrigin
            ), Internals.d.M(href, {
              crossOrigin: encountered,
              integrity: "string" === typeof options.integrity ? options.integrity : void 0,
              nonce: "string" === typeof options.nonce ? options.nonce : void 0
            });
        } else null == options && Internals.d.M(href);
    };
    reactDom_reactServer_development.preload = function(href, options) {
      var encountered = "";
      "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
      null == options || "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : "string" === typeof options.as && options.as || (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
      encountered && console.error(
        'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
        encountered
      );
      if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
        encountered = options.as;
        var crossOrigin = getCrossOriginStringAs(
          encountered,
          options.crossOrigin
        );
        Internals.d.L(href, encountered, {
          crossOrigin,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0,
          type: "string" === typeof options.type ? options.type : void 0,
          fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
          referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
          imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
          imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
          media: "string" === typeof options.media ? options.media : void 0
        });
      }
    };
    reactDom_reactServer_development.preloadModule = function(href, options) {
      var encountered = "";
      "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
      void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "string" !== typeof options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
      encountered && console.error(
        'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
        encountered
      );
      "string" === typeof href && (options ? (encountered = getCrossOriginStringAs(
        options.as,
        options.crossOrigin
      ), Internals.d.m(href, {
        as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
        crossOrigin: encountered,
        integrity: "string" === typeof options.integrity ? options.integrity : void 0
      })) : Internals.d.m(href));
    };
    reactDom_reactServer_development.version = "19.2.4";
  })();
  return reactDom_reactServer_development;
}
var hasRequiredReactDom_reactServer;
function requireReactDom_reactServer() {
  if (hasRequiredReactDom_reactServer) return reactDom_reactServer.exports;
  hasRequiredReactDom_reactServer = 1;
  if (process.env.NODE_ENV === "production") {
    reactDom_reactServer.exports = requireReactDom_reactServer_production();
  } else {
    reactDom_reactServer.exports = requireReactDom_reactServer_development();
  }
  return reactDom_reactServer.exports;
}
var hasRequiredReactServerDomWebpackServer_edge_production;
function requireReactServerDomWebpackServer_edge_production() {
  if (hasRequiredReactServerDomWebpackServer_edge_production) return reactServerDomWebpackServer_edge_production;
  hasRequiredReactServerDomWebpackServer_edge_production = 1;
  const __viteRscAsyncHooks = require$$0;
  globalThis.AsyncLocalStorage = __viteRscAsyncHooks.AsyncLocalStorage;
  var ReactDOM = requireReactDom_reactServer(), React2 = requireReact_reactServer(), REACT_LEGACY_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element"), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_MEMO_CACHE_SENTINEL = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel");
  var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  var ASYNC_ITERATOR = Symbol.asyncIterator;
  function handleErrorInNextTick(error) {
    setTimeout(function() {
      throw error;
    });
  }
  var LocalPromise = Promise, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : function(callback) {
    LocalPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
  }, currentView = null, writtenBytes = 0;
  function writeChunkAndReturn(destination, chunk) {
    if (0 !== chunk.byteLength)
      if (2048 < chunk.byteLength)
        0 < writtenBytes && (destination.enqueue(
          new Uint8Array(currentView.buffer, 0, writtenBytes)
        ), currentView = new Uint8Array(2048), writtenBytes = 0), destination.enqueue(chunk);
      else {
        var allowableBytes = currentView.length - writtenBytes;
        allowableBytes < chunk.byteLength && (0 === allowableBytes ? destination.enqueue(currentView) : (currentView.set(chunk.subarray(0, allowableBytes), writtenBytes), destination.enqueue(currentView), chunk = chunk.subarray(allowableBytes)), currentView = new Uint8Array(2048), writtenBytes = 0);
        currentView.set(chunk, writtenBytes);
        writtenBytes += chunk.byteLength;
      }
    return true;
  }
  var textEncoder = new TextEncoder();
  function stringToChunk(content) {
    return textEncoder.encode(content);
  }
  function byteLengthOfChunk(chunk) {
    return chunk.byteLength;
  }
  function closeWithError(destination, error) {
    "function" === typeof destination.error ? destination.error(error) : destination.close();
  }
  var CLIENT_REFERENCE_TAG$1 = /* @__PURE__ */ Symbol.for("react.client.reference"), SERVER_REFERENCE_TAG = /* @__PURE__ */ Symbol.for("react.server.reference");
  function registerClientReferenceImpl(proxyImplementation, id, async) {
    return Object.defineProperties(proxyImplementation, {
      $$typeof: { value: CLIENT_REFERENCE_TAG$1 },
      $$id: { value: id },
      $$async: { value: async }
    });
  }
  var FunctionBind = Function.prototype.bind, ArraySlice = Array.prototype.slice;
  function bind() {
    var newFn = FunctionBind.apply(this, arguments);
    if (this.$$typeof === SERVER_REFERENCE_TAG) {
      var args = ArraySlice.call(arguments, 1), $$typeof = { value: SERVER_REFERENCE_TAG }, $$id = { value: this.$$id };
      args = { value: this.$$bound ? this.$$bound.concat(args) : args };
      return Object.defineProperties(newFn, {
        $$typeof,
        $$id,
        $$bound: args,
        bind: { value: bind, configurable: true }
      });
    }
    return newFn;
  }
  var serverReferenceToString = {
    value: function() {
      return "function () { [omitted code] }";
    },
    configurable: true,
    writable: true
  }, PROMISE_PROTOTYPE = Promise.prototype, deepProxyHandlers = {
    get: function(target, name) {
      switch (name) {
        case "$$typeof":
          return target.$$typeof;
        case "$$id":
          return target.$$id;
        case "$$async":
          return target.$$async;
        case "name":
          return target.name;
        case "displayName":
          return;
        case "defaultProps":
          return;
        case "_debugInfo":
          return;
        case "toJSON":
          return;
        case Symbol.toPrimitive:
          return Object.prototype[Symbol.toPrimitive];
        case Symbol.toStringTag:
          return Object.prototype[Symbol.toStringTag];
        case "Provider":
          throw Error(
            "Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider."
          );
        case "then":
          throw Error(
            "Cannot await or return from a thenable. You cannot await a client module from a server component."
          );
      }
      throw Error(
        "Cannot access " + (String(target.name) + "." + String(name)) + " on the server. You cannot dot into a client module from a server component. You can only pass the imported name through."
      );
    },
    set: function() {
      throw Error("Cannot assign to a client module from a server module.");
    }
  };
  function getReference(target, name) {
    switch (name) {
      case "$$typeof":
        return target.$$typeof;
      case "$$id":
        return target.$$id;
      case "$$async":
        return target.$$async;
      case "name":
        return target.name;
      case "defaultProps":
        return;
      case "_debugInfo":
        return;
      case "toJSON":
        return;
      case Symbol.toPrimitive:
        return Object.prototype[Symbol.toPrimitive];
      case Symbol.toStringTag:
        return Object.prototype[Symbol.toStringTag];
      case "__esModule":
        var moduleId = target.$$id;
        target.default = registerClientReferenceImpl(
          function() {
            throw Error(
              "Attempted to call the default export of " + moduleId + " from the server but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
            );
          },
          target.$$id + "#",
          target.$$async
        );
        return true;
      case "then":
        if (target.then) return target.then;
        if (target.$$async) return;
        var clientReference = registerClientReferenceImpl({}, target.$$id, true), proxy = new Proxy(clientReference, proxyHandlers$1);
        target.status = "fulfilled";
        target.value = proxy;
        return target.then = registerClientReferenceImpl(
          function(resolve) {
            return Promise.resolve(resolve(proxy));
          },
          target.$$id + "#then",
          false
        );
    }
    if ("symbol" === typeof name)
      throw Error(
        "Cannot read Symbol exports. Only named exports are supported on a client module imported on the server."
      );
    clientReference = target[name];
    clientReference || (clientReference = registerClientReferenceImpl(
      function() {
        throw Error(
          "Attempted to call " + String(name) + "() from the server but " + String(name) + " is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
        );
      },
      target.$$id + "#" + name,
      target.$$async
    ), Object.defineProperty(clientReference, "name", { value: name }), clientReference = target[name] = new Proxy(clientReference, deepProxyHandlers));
    return clientReference;
  }
  var proxyHandlers$1 = {
    get: function(target, name) {
      return getReference(target, name);
    },
    getOwnPropertyDescriptor: function(target, name) {
      var descriptor = Object.getOwnPropertyDescriptor(target, name);
      descriptor || (descriptor = {
        value: getReference(target, name),
        writable: false,
        configurable: false,
        enumerable: false
      }, Object.defineProperty(target, name, descriptor));
      return descriptor;
    },
    getPrototypeOf: function() {
      return PROMISE_PROTOTYPE;
    },
    set: function() {
      throw Error("Cannot assign to a client module from a server module.");
    }
  }, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, previousDispatcher = ReactDOMSharedInternals.d;
  ReactDOMSharedInternals.d = {
    f: previousDispatcher.f,
    r: previousDispatcher.r,
    D: prefetchDNS,
    C: preconnect,
    L: preload,
    m: preloadModule$1,
    X: preinitScript,
    S: preinitStyle,
    M: preinitModuleScript
  };
  function prefetchDNS(href) {
    if ("string" === typeof href && href) {
      var request = resolveRequest();
      if (request) {
        var hints = request.hints, key = "D|" + href;
        hints.has(key) || (hints.add(key), emitHint(request, "D", href));
      } else previousDispatcher.D(href);
    }
  }
  function preconnect(href, crossOrigin) {
    if ("string" === typeof href) {
      var request = resolveRequest();
      if (request) {
        var hints = request.hints, key = "C|" + (null == crossOrigin ? "null" : crossOrigin) + "|" + href;
        hints.has(key) || (hints.add(key), "string" === typeof crossOrigin ? emitHint(request, "C", [href, crossOrigin]) : emitHint(request, "C", href));
      } else previousDispatcher.C(href, crossOrigin);
    }
  }
  function preload(href, as, options) {
    if ("string" === typeof href) {
      var request = resolveRequest();
      if (request) {
        var hints = request.hints, key = "L";
        if ("image" === as && options) {
          var imageSrcSet = options.imageSrcSet, imageSizes = options.imageSizes, uniquePart = "";
          "string" === typeof imageSrcSet && "" !== imageSrcSet ? (uniquePart += "[" + imageSrcSet + "]", "string" === typeof imageSizes && (uniquePart += "[" + imageSizes + "]")) : uniquePart += "[][]" + href;
          key += "[image]" + uniquePart;
        } else key += "[" + as + "]" + href;
        hints.has(key) || (hints.add(key), (options = trimOptions(options)) ? emitHint(request, "L", [href, as, options]) : emitHint(request, "L", [href, as]));
      } else previousDispatcher.L(href, as, options);
    }
  }
  function preloadModule$1(href, options) {
    if ("string" === typeof href) {
      var request = resolveRequest();
      if (request) {
        var hints = request.hints, key = "m|" + href;
        if (hints.has(key)) return;
        hints.add(key);
        return (options = trimOptions(options)) ? emitHint(request, "m", [href, options]) : emitHint(request, "m", href);
      }
      previousDispatcher.m(href, options);
    }
  }
  function preinitStyle(href, precedence, options) {
    if ("string" === typeof href) {
      var request = resolveRequest();
      if (request) {
        var hints = request.hints, key = "S|" + href;
        if (hints.has(key)) return;
        hints.add(key);
        return (options = trimOptions(options)) ? emitHint(request, "S", [
          href,
          "string" === typeof precedence ? precedence : 0,
          options
        ]) : "string" === typeof precedence ? emitHint(request, "S", [href, precedence]) : emitHint(request, "S", href);
      }
      previousDispatcher.S(href, precedence, options);
    }
  }
  function preinitScript(src, options) {
    if ("string" === typeof src) {
      var request = resolveRequest();
      if (request) {
        var hints = request.hints, key = "X|" + src;
        if (hints.has(key)) return;
        hints.add(key);
        return (options = trimOptions(options)) ? emitHint(request, "X", [src, options]) : emitHint(request, "X", src);
      }
      previousDispatcher.X(src, options);
    }
  }
  function preinitModuleScript(src, options) {
    if ("string" === typeof src) {
      var request = resolveRequest();
      if (request) {
        var hints = request.hints, key = "M|" + src;
        if (hints.has(key)) return;
        hints.add(key);
        return (options = trimOptions(options)) ? emitHint(request, "M", [src, options]) : emitHint(request, "M", src);
      }
      previousDispatcher.M(src, options);
    }
  }
  function trimOptions(options) {
    if (null == options) return null;
    var hasProperties = false, trimmed = {}, key;
    for (key in options)
      null != options[key] && (hasProperties = true, trimmed[key] = options[key]);
    return hasProperties ? trimmed : null;
  }
  function getChildFormatContext(parentContext, type, props) {
    switch (type) {
      case "img":
        type = props.src;
        var srcSet = props.srcSet;
        if (!("lazy" === props.loading || !type && !srcSet || "string" !== typeof type && null != type || "string" !== typeof srcSet && null != srcSet || "low" === props.fetchPriority || parentContext & 3) && ("string" !== typeof type || ":" !== type[4] || "d" !== type[0] && "D" !== type[0] || "a" !== type[1] && "A" !== type[1] || "t" !== type[2] && "T" !== type[2] || "a" !== type[3] && "A" !== type[3]) && ("string" !== typeof srcSet || ":" !== srcSet[4] || "d" !== srcSet[0] && "D" !== srcSet[0] || "a" !== srcSet[1] && "A" !== srcSet[1] || "t" !== srcSet[2] && "T" !== srcSet[2] || "a" !== srcSet[3] && "A" !== srcSet[3])) {
          var sizes = "string" === typeof props.sizes ? props.sizes : void 0;
          var input = props.crossOrigin;
          preload(type || "", "image", {
            imageSrcSet: srcSet,
            imageSizes: sizes,
            crossOrigin: "string" === typeof input ? "use-credentials" === input ? input : "" : void 0,
            integrity: props.integrity,
            type: props.type,
            fetchPriority: props.fetchPriority,
            referrerPolicy: props.referrerPolicy
          });
        }
        return parentContext;
      case "link":
        type = props.rel;
        srcSet = props.href;
        if (!(parentContext & 1 || null != props.itemProp || "string" !== typeof type || "string" !== typeof srcSet || "" === srcSet))
          switch (type) {
            case "preload":
              preload(srcSet, props.as, {
                crossOrigin: props.crossOrigin,
                integrity: props.integrity,
                nonce: props.nonce,
                type: props.type,
                fetchPriority: props.fetchPriority,
                referrerPolicy: props.referrerPolicy,
                imageSrcSet: props.imageSrcSet,
                imageSizes: props.imageSizes,
                media: props.media
              });
              break;
            case "modulepreload":
              preloadModule$1(srcSet, {
                as: props.as,
                crossOrigin: props.crossOrigin,
                integrity: props.integrity,
                nonce: props.nonce
              });
              break;
            case "stylesheet":
              preload(srcSet, "stylesheet", {
                crossOrigin: props.crossOrigin,
                integrity: props.integrity,
                nonce: props.nonce,
                type: props.type,
                fetchPriority: props.fetchPriority,
                referrerPolicy: props.referrerPolicy,
                media: props.media
              });
          }
        return parentContext;
      case "picture":
        return parentContext | 2;
      case "noscript":
        return parentContext | 1;
      default:
        return parentContext;
    }
  }
  var supportsRequestStorage = "function" === typeof AsyncLocalStorage, requestStorage = supportsRequestStorage ? new AsyncLocalStorage() : null, TEMPORARY_REFERENCE_TAG = /* @__PURE__ */ Symbol.for("react.temporary.reference"), proxyHandlers = {
    get: function(target, name) {
      switch (name) {
        case "$$typeof":
          return target.$$typeof;
        case "name":
          return;
        case "displayName":
          return;
        case "defaultProps":
          return;
        case "_debugInfo":
          return;
        case "toJSON":
          return;
        case Symbol.toPrimitive:
          return Object.prototype[Symbol.toPrimitive];
        case Symbol.toStringTag:
          return Object.prototype[Symbol.toStringTag];
        case "Provider":
          throw Error(
            "Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider."
          );
        case "then":
          return;
      }
      throw Error(
        "Cannot access " + String(name) + " on the server. You cannot dot into a temporary client reference from a server component. You can only pass the value through to the client."
      );
    },
    set: function() {
      throw Error(
        "Cannot assign to a temporary client reference from a server module."
      );
    }
  };
  function createTemporaryReference(temporaryReferences, id) {
    var reference = Object.defineProperties(
      function() {
        throw Error(
          "Attempted to call a temporary Client Reference from the server but it is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
        );
      },
      { $$typeof: { value: TEMPORARY_REFERENCE_TAG } }
    );
    reference = new Proxy(reference, proxyHandlers);
    temporaryReferences.set(reference, id);
    return reference;
  }
  function noop() {
  }
  var SuspenseException = Error(
    "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
  );
  function trackUsedThenable(thenableState2, thenable, index) {
    index = thenableState2[index];
    void 0 === index ? thenableState2.push(thenable) : index !== thenable && (thenable.then(noop, noop), thenable = index);
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        throw thenable.reason;
      default:
        "string" === typeof thenable.status ? thenable.then(noop, noop) : (thenableState2 = thenable, thenableState2.status = "pending", thenableState2.then(
          function(fulfilledValue) {
            if ("pending" === thenable.status) {
              var fulfilledThenable = thenable;
              fulfilledThenable.status = "fulfilled";
              fulfilledThenable.value = fulfilledValue;
            }
          },
          function(error) {
            if ("pending" === thenable.status) {
              var rejectedThenable = thenable;
              rejectedThenable.status = "rejected";
              rejectedThenable.reason = error;
            }
          }
        ));
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
        }
        suspendedThenable = thenable;
        throw SuspenseException;
    }
  }
  var suspendedThenable = null;
  function getSuspendedThenable() {
    if (null === suspendedThenable)
      throw Error(
        "Expected a suspended thenable. This is a bug in React. Please file an issue."
      );
    var thenable = suspendedThenable;
    suspendedThenable = null;
    return thenable;
  }
  var currentRequest$1 = null, thenableIndexCounter = 0, thenableState = null;
  function getThenableStateAfterSuspending() {
    var state = thenableState || [];
    thenableState = null;
    return state;
  }
  var HooksDispatcher = {
    readContext: unsupportedContext,
    use,
    useCallback: function(callback) {
      return callback;
    },
    useContext: unsupportedContext,
    useEffect: unsupportedHook,
    useImperativeHandle: unsupportedHook,
    useLayoutEffect: unsupportedHook,
    useInsertionEffect: unsupportedHook,
    useMemo: function(nextCreate) {
      return nextCreate();
    },
    useReducer: unsupportedHook,
    useRef: unsupportedHook,
    useState: unsupportedHook,
    useDebugValue: function() {
    },
    useDeferredValue: unsupportedHook,
    useTransition: unsupportedHook,
    useSyncExternalStore: unsupportedHook,
    useId,
    useHostTransitionStatus: unsupportedHook,
    useFormState: unsupportedHook,
    useActionState: unsupportedHook,
    useOptimistic: unsupportedHook,
    useMemoCache: function(size) {
      for (var data = Array(size), i = 0; i < size; i++)
        data[i] = REACT_MEMO_CACHE_SENTINEL;
      return data;
    },
    useCacheRefresh: function() {
      return unsupportedRefresh;
    }
  };
  HooksDispatcher.useEffectEvent = unsupportedHook;
  function unsupportedHook() {
    throw Error("This Hook is not supported in Server Components.");
  }
  function unsupportedRefresh() {
    throw Error("Refreshing the cache is not supported in Server Components.");
  }
  function unsupportedContext() {
    throw Error("Cannot read a Client Context from a Server Component.");
  }
  function useId() {
    if (null === currentRequest$1)
      throw Error("useId can only be used while React is rendering");
    var id = currentRequest$1.identifierCount++;
    return "_" + currentRequest$1.identifierPrefix + "S_" + id.toString(32) + "_";
  }
  function use(usable) {
    if (null !== usable && "object" === typeof usable || "function" === typeof usable) {
      if ("function" === typeof usable.then) {
        var index = thenableIndexCounter;
        thenableIndexCounter += 1;
        null === thenableState && (thenableState = []);
        return trackUsedThenable(thenableState, usable, index);
      }
      usable.$$typeof === REACT_CONTEXT_TYPE && unsupportedContext();
    }
    if (usable.$$typeof === CLIENT_REFERENCE_TAG$1) {
      if (null != usable.value && usable.value.$$typeof === REACT_CONTEXT_TYPE)
        throw Error("Cannot read a Client Context from a Server Component.");
      throw Error("Cannot use() an already resolved Client Reference.");
    }
    throw Error("An unsupported type was passed to use(): " + String(usable));
  }
  var DefaultAsyncDispatcher = {
    getCacheForType: function(resourceType) {
      var JSCompiler_inline_result = (JSCompiler_inline_result = resolveRequest()) ? JSCompiler_inline_result.cache : /* @__PURE__ */ new Map();
      var entry = JSCompiler_inline_result.get(resourceType);
      void 0 === entry && (entry = resourceType(), JSCompiler_inline_result.set(resourceType, entry));
      return entry;
    },
    cacheSignal: function() {
      var request = resolveRequest();
      return request ? request.cacheController.signal : null;
    }
  }, ReactSharedInternalsServer = React2.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  if (!ReactSharedInternalsServer)
    throw Error(
      'The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.'
    );
  var isArrayImpl = Array.isArray, getPrototypeOf = Object.getPrototypeOf;
  function objectName(object) {
    object = Object.prototype.toString.call(object);
    return object.slice(8, object.length - 1);
  }
  function describeValueForErrorMessage(value) {
    switch (typeof value) {
      case "string":
        return JSON.stringify(
          10 >= value.length ? value : value.slice(0, 10) + "..."
        );
      case "object":
        if (isArrayImpl(value)) return "[...]";
        if (null !== value && value.$$typeof === CLIENT_REFERENCE_TAG)
          return "client";
        value = objectName(value);
        return "Object" === value ? "{...}" : value;
      case "function":
        return value.$$typeof === CLIENT_REFERENCE_TAG ? "client" : (value = value.displayName || value.name) ? "function " + value : "function";
      default:
        return String(value);
    }
  }
  function describeElementType(type) {
    if ("string" === typeof type) return type;
    switch (type) {
      case REACT_SUSPENSE_TYPE:
        return "Suspense";
      case REACT_SUSPENSE_LIST_TYPE:
        return "SuspenseList";
    }
    if ("object" === typeof type)
      switch (type.$$typeof) {
        case REACT_FORWARD_REF_TYPE:
          return describeElementType(type.render);
        case REACT_MEMO_TYPE:
          return describeElementType(type.type);
        case REACT_LAZY_TYPE:
          var payload = type._payload;
          type = type._init;
          try {
            return describeElementType(type(payload));
          } catch (x) {
          }
      }
    return "";
  }
  var CLIENT_REFERENCE_TAG = /* @__PURE__ */ Symbol.for("react.client.reference");
  function describeObjectForErrorMessage(objectOrArray, expandedName) {
    var objKind = objectName(objectOrArray);
    if ("Object" !== objKind && "Array" !== objKind) return objKind;
    objKind = -1;
    var length = 0;
    if (isArrayImpl(objectOrArray)) {
      var str = "[";
      for (var i = 0; i < objectOrArray.length; i++) {
        0 < i && (str += ", ");
        var value = objectOrArray[i];
        value = "object" === typeof value && null !== value ? describeObjectForErrorMessage(value) : describeValueForErrorMessage(value);
        "" + i === expandedName ? (objKind = str.length, length = value.length, str += value) : str = 10 > value.length && 40 > str.length + value.length ? str + value : str + "...";
      }
      str += "]";
    } else if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE)
      str = "<" + describeElementType(objectOrArray.type) + "/>";
    else {
      if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) return "client";
      str = "{";
      i = Object.keys(objectOrArray);
      for (value = 0; value < i.length; value++) {
        0 < value && (str += ", ");
        var name = i[value], encodedKey = JSON.stringify(name);
        str += ('"' + name + '"' === encodedKey ? name : encodedKey) + ": ";
        encodedKey = objectOrArray[name];
        encodedKey = "object" === typeof encodedKey && null !== encodedKey ? describeObjectForErrorMessage(encodedKey) : describeValueForErrorMessage(encodedKey);
        name === expandedName ? (objKind = str.length, length = encodedKey.length, str += encodedKey) : str = 10 > encodedKey.length && 40 > str.length + encodedKey.length ? str + encodedKey : str + "...";
      }
      str += "}";
    }
    return void 0 === expandedName ? str : -1 < objKind && 0 < length ? (objectOrArray = " ".repeat(objKind) + "^".repeat(length), "\n  " + str + "\n  " + objectOrArray) : "\n  " + str;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty, ObjectPrototype$1 = Object.prototype, stringify = JSON.stringify;
  function defaultErrorHandler(error) {
    console.error(error);
  }
  function RequestInstance(type, model, bundlerConfig, onError, onPostpone, onAllReady, onFatalError, identifierPrefix, temporaryReferences) {
    if (null !== ReactSharedInternalsServer.A && ReactSharedInternalsServer.A !== DefaultAsyncDispatcher)
      throw Error("Currently React only supports one RSC renderer at a time.");
    ReactSharedInternalsServer.A = DefaultAsyncDispatcher;
    var abortSet = /* @__PURE__ */ new Set(), pingedTasks = [], hints = /* @__PURE__ */ new Set();
    this.type = type;
    this.status = 10;
    this.flushScheduled = false;
    this.destination = this.fatalError = null;
    this.bundlerConfig = bundlerConfig;
    this.cache = /* @__PURE__ */ new Map();
    this.cacheController = new AbortController();
    this.pendingChunks = this.nextChunkId = 0;
    this.hints = hints;
    this.abortableTasks = abortSet;
    this.pingedTasks = pingedTasks;
    this.completedImportChunks = [];
    this.completedHintChunks = [];
    this.completedRegularChunks = [];
    this.completedErrorChunks = [];
    this.writtenSymbols = /* @__PURE__ */ new Map();
    this.writtenClientReferences = /* @__PURE__ */ new Map();
    this.writtenServerReferences = /* @__PURE__ */ new Map();
    this.writtenObjects = /* @__PURE__ */ new WeakMap();
    this.temporaryReferences = temporaryReferences;
    this.identifierPrefix = identifierPrefix || "";
    this.identifierCount = 1;
    this.taintCleanupQueue = [];
    this.onError = void 0 === onError ? defaultErrorHandler : onError;
    this.onPostpone = void 0 === onPostpone ? noop : onPostpone;
    this.onAllReady = onAllReady;
    this.onFatalError = onFatalError;
    type = createTask(this, model, null, false, 0, abortSet);
    pingedTasks.push(type);
  }
  var currentRequest = null;
  function resolveRequest() {
    if (currentRequest) return currentRequest;
    if (supportsRequestStorage) {
      var store = requestStorage.getStore();
      if (store) return store;
    }
    return null;
  }
  function serializeThenable(request, task, thenable) {
    var newTask = createTask(
      request,
      thenable,
      task.keyPath,
      task.implicitSlot,
      task.formatContext,
      request.abortableTasks
    );
    switch (thenable.status) {
      case "fulfilled":
        return newTask.model = thenable.value, pingTask(request, newTask), newTask.id;
      case "rejected":
        return erroredTask(request, newTask, thenable.reason), newTask.id;
      default:
        if (12 === request.status)
          return request.abortableTasks.delete(newTask), 21 === request.type ? (haltTask(newTask), finishHaltedTask(newTask, request)) : (task = request.fatalError, abortTask(newTask), finishAbortedTask(newTask, request, task)), newTask.id;
        "string" !== typeof thenable.status && (thenable.status = "pending", thenable.then(
          function(fulfilledValue) {
            "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
          },
          function(error) {
            "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
          }
        ));
    }
    thenable.then(
      function(value) {
        newTask.model = value;
        pingTask(request, newTask);
      },
      function(reason) {
        0 === newTask.status && (erroredTask(request, newTask, reason), enqueueFlush(request));
      }
    );
    return newTask.id;
  }
  function serializeReadableStream(request, task, stream) {
    function progress(entry) {
      if (0 === streamTask.status)
        if (entry.done)
          streamTask.status = 1, entry = streamTask.id.toString(16) + ":C\n", request.completedRegularChunks.push(stringToChunk(entry)), request.abortableTasks.delete(streamTask), request.cacheController.signal.removeEventListener(
            "abort",
            abortStream
          ), enqueueFlush(request), callOnAllReadyIfReady(request);
        else
          try {
            streamTask.model = entry.value, request.pendingChunks++, tryStreamTask(request, streamTask), enqueueFlush(request), reader.read().then(progress, error);
          } catch (x$11) {
            error(x$11);
          }
    }
    function error(reason) {
      0 === streamTask.status && (request.cacheController.signal.removeEventListener("abort", abortStream), erroredTask(request, streamTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
    }
    function abortStream() {
      if (0 === streamTask.status) {
        var signal = request.cacheController.signal;
        signal.removeEventListener("abort", abortStream);
        signal = signal.reason;
        21 === request.type ? (request.abortableTasks.delete(streamTask), haltTask(streamTask), finishHaltedTask(streamTask, request)) : (erroredTask(request, streamTask, signal), enqueueFlush(request));
        reader.cancel(signal).then(error, error);
      }
    }
    var supportsBYOB = stream.supportsBYOB;
    if (void 0 === supportsBYOB)
      try {
        stream.getReader({ mode: "byob" }).releaseLock(), supportsBYOB = true;
      } catch (x) {
        supportsBYOB = false;
      }
    var reader = stream.getReader(), streamTask = createTask(
      request,
      task.model,
      task.keyPath,
      task.implicitSlot,
      task.formatContext,
      request.abortableTasks
    );
    request.pendingChunks++;
    task = streamTask.id.toString(16) + ":" + (supportsBYOB ? "r" : "R") + "\n";
    request.completedRegularChunks.push(stringToChunk(task));
    request.cacheController.signal.addEventListener("abort", abortStream);
    reader.read().then(progress, error);
    return serializeByValueID(streamTask.id);
  }
  function serializeAsyncIterable(request, task, iterable, iterator) {
    function progress(entry) {
      if (0 === streamTask.status)
        if (entry.done) {
          streamTask.status = 1;
          if (void 0 === entry.value)
            var endStreamRow = streamTask.id.toString(16) + ":C\n";
          else
            try {
              var chunkId = outlineModelWithFormatContext(
                request,
                entry.value,
                0
              );
              endStreamRow = streamTask.id.toString(16) + ":C" + stringify(serializeByValueID(chunkId)) + "\n";
            } catch (x) {
              error(x);
              return;
            }
          request.completedRegularChunks.push(stringToChunk(endStreamRow));
          request.abortableTasks.delete(streamTask);
          request.cacheController.signal.removeEventListener(
            "abort",
            abortIterable
          );
          enqueueFlush(request);
          callOnAllReadyIfReady(request);
        } else
          try {
            streamTask.model = entry.value, request.pendingChunks++, tryStreamTask(request, streamTask), enqueueFlush(request), iterator.next().then(progress, error);
          } catch (x$12) {
            error(x$12);
          }
    }
    function error(reason) {
      0 === streamTask.status && (request.cacheController.signal.removeEventListener(
        "abort",
        abortIterable
      ), erroredTask(request, streamTask, reason), enqueueFlush(request), "function" === typeof iterator.throw && iterator.throw(reason).then(error, error));
    }
    function abortIterable() {
      if (0 === streamTask.status) {
        var signal = request.cacheController.signal;
        signal.removeEventListener("abort", abortIterable);
        var reason = signal.reason;
        21 === request.type ? (request.abortableTasks.delete(streamTask), haltTask(streamTask), finishHaltedTask(streamTask, request)) : (erroredTask(request, streamTask, signal.reason), enqueueFlush(request));
        "function" === typeof iterator.throw && iterator.throw(reason).then(error, error);
      }
    }
    iterable = iterable === iterator;
    var streamTask = createTask(
      request,
      task.model,
      task.keyPath,
      task.implicitSlot,
      task.formatContext,
      request.abortableTasks
    );
    request.pendingChunks++;
    task = streamTask.id.toString(16) + ":" + (iterable ? "x" : "X") + "\n";
    request.completedRegularChunks.push(stringToChunk(task));
    request.cacheController.signal.addEventListener("abort", abortIterable);
    iterator.next().then(progress, error);
    return serializeByValueID(streamTask.id);
  }
  function emitHint(request, code, model) {
    model = stringify(model);
    code = stringToChunk(":H" + code + model + "\n");
    request.completedHintChunks.push(code);
    enqueueFlush(request);
  }
  function readThenable(thenable) {
    if ("fulfilled" === thenable.status) return thenable.value;
    if ("rejected" === thenable.status) throw thenable.reason;
    throw thenable;
  }
  function createLazyWrapperAroundWakeable(request, task, wakeable) {
    switch (wakeable.status) {
      case "fulfilled":
        return wakeable.value;
      case "rejected":
        break;
      default:
        "string" !== typeof wakeable.status && (wakeable.status = "pending", wakeable.then(
          function(fulfilledValue) {
            "pending" === wakeable.status && (wakeable.status = "fulfilled", wakeable.value = fulfilledValue);
          },
          function(error) {
            "pending" === wakeable.status && (wakeable.status = "rejected", wakeable.reason = error);
          }
        ));
    }
    return { $$typeof: REACT_LAZY_TYPE, _payload: wakeable, _init: readThenable };
  }
  function voidHandler() {
  }
  function processServerComponentReturnValue(request, task, Component, result) {
    if ("object" !== typeof result || null === result || result.$$typeof === CLIENT_REFERENCE_TAG$1)
      return result;
    if ("function" === typeof result.then)
      return createLazyWrapperAroundWakeable(request, task, result);
    var iteratorFn = getIteratorFn(result);
    return iteratorFn ? (request = {}, request[Symbol.iterator] = function() {
      return iteratorFn.call(result);
    }, request) : "function" !== typeof result[ASYNC_ITERATOR] || "function" === typeof ReadableStream && result instanceof ReadableStream ? result : (request = {}, request[ASYNC_ITERATOR] = function() {
      return result[ASYNC_ITERATOR]();
    }, request);
  }
  function renderFunctionComponent(request, task, key, Component, props) {
    var prevThenableState = task.thenableState;
    task.thenableState = null;
    thenableIndexCounter = 0;
    thenableState = prevThenableState;
    props = Component(props, void 0);
    if (12 === request.status)
      throw "object" === typeof props && null !== props && "function" === typeof props.then && props.$$typeof !== CLIENT_REFERENCE_TAG$1 && props.then(voidHandler, voidHandler), null;
    props = processServerComponentReturnValue(request, task, Component, props);
    Component = task.keyPath;
    prevThenableState = task.implicitSlot;
    null !== key ? task.keyPath = null === Component ? key : Component + "," + key : null === Component && (task.implicitSlot = true);
    request = renderModelDestructive(request, task, emptyRoot, "", props);
    task.keyPath = Component;
    task.implicitSlot = prevThenableState;
    return request;
  }
  function renderFragment(request, task, children) {
    return null !== task.keyPath ? (request = [
      REACT_ELEMENT_TYPE,
      REACT_FRAGMENT_TYPE,
      task.keyPath,
      { children }
    ], task.implicitSlot ? [request] : request) : children;
  }
  var serializedSize = 0;
  function deferTask(request, task) {
    task = createTask(
      request,
      task.model,
      task.keyPath,
      task.implicitSlot,
      task.formatContext,
      request.abortableTasks
    );
    pingTask(request, task);
    return serializeLazyID(task.id);
  }
  function renderElement(request, task, type, key, ref, props) {
    if (null !== ref && void 0 !== ref)
      throw Error(
        "Refs cannot be used in Server Components, nor passed to Client Components."
      );
    if ("function" === typeof type && type.$$typeof !== CLIENT_REFERENCE_TAG$1 && type.$$typeof !== TEMPORARY_REFERENCE_TAG)
      return renderFunctionComponent(request, task, key, type, props);
    if (type === REACT_FRAGMENT_TYPE && null === key)
      return type = task.implicitSlot, null === task.keyPath && (task.implicitSlot = true), props = renderModelDestructive(
        request,
        task,
        emptyRoot,
        "",
        props.children
      ), task.implicitSlot = type, props;
    if (null != type && "object" === typeof type && type.$$typeof !== CLIENT_REFERENCE_TAG$1)
      switch (type.$$typeof) {
        case REACT_LAZY_TYPE:
          var init2 = type._init;
          type = init2(type._payload);
          if (12 === request.status) throw null;
          return renderElement(request, task, type, key, ref, props);
        case REACT_FORWARD_REF_TYPE:
          return renderFunctionComponent(request, task, key, type.render, props);
        case REACT_MEMO_TYPE:
          return renderElement(request, task, type.type, key, ref, props);
      }
    else
      "string" === typeof type && (ref = task.formatContext, init2 = getChildFormatContext(ref, type, props), ref !== init2 && null != props.children && outlineModelWithFormatContext(request, props.children, init2));
    request = key;
    key = task.keyPath;
    null === request ? request = key : null !== key && (request = key + "," + request);
    props = [REACT_ELEMENT_TYPE, type, request, props];
    task = task.implicitSlot && null !== request ? [props] : props;
    return task;
  }
  function pingTask(request, task) {
    var pingedTasks = request.pingedTasks;
    pingedTasks.push(task);
    1 === pingedTasks.length && (request.flushScheduled = null !== request.destination, 21 === request.type || 10 === request.status ? scheduleMicrotask(function() {
      return performWork(request);
    }) : setTimeout(function() {
      return performWork(request);
    }, 0));
  }
  function createTask(request, model, keyPath, implicitSlot, formatContext, abortSet) {
    request.pendingChunks++;
    var id = request.nextChunkId++;
    "object" !== typeof model || null === model || null !== keyPath || implicitSlot || request.writtenObjects.set(model, serializeByValueID(id));
    var task = {
      id,
      status: 0,
      model,
      keyPath,
      implicitSlot,
      formatContext,
      ping: function() {
        return pingTask(request, task);
      },
      toJSON: function(parentPropertyName, value) {
        serializedSize += parentPropertyName.length;
        var prevKeyPath = task.keyPath, prevImplicitSlot = task.implicitSlot;
        try {
          var JSCompiler_inline_result = renderModelDestructive(
            request,
            task,
            this,
            parentPropertyName,
            value
          );
        } catch (thrownValue) {
          if (parentPropertyName = task.model, parentPropertyName = "object" === typeof parentPropertyName && null !== parentPropertyName && (parentPropertyName.$$typeof === REACT_ELEMENT_TYPE || parentPropertyName.$$typeof === REACT_LAZY_TYPE), 12 === request.status)
            task.status = 3, 21 === request.type ? (prevKeyPath = request.nextChunkId++, prevKeyPath = parentPropertyName ? serializeLazyID(prevKeyPath) : serializeByValueID(prevKeyPath), JSCompiler_inline_result = prevKeyPath) : (prevKeyPath = request.fatalError, JSCompiler_inline_result = parentPropertyName ? serializeLazyID(prevKeyPath) : serializeByValueID(prevKeyPath));
          else if (value = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue, "object" === typeof value && null !== value && "function" === typeof value.then) {
            JSCompiler_inline_result = createTask(
              request,
              task.model,
              task.keyPath,
              task.implicitSlot,
              task.formatContext,
              request.abortableTasks
            );
            var ping = JSCompiler_inline_result.ping;
            value.then(ping, ping);
            JSCompiler_inline_result.thenableState = getThenableStateAfterSuspending();
            task.keyPath = prevKeyPath;
            task.implicitSlot = prevImplicitSlot;
            JSCompiler_inline_result = parentPropertyName ? serializeLazyID(JSCompiler_inline_result.id) : serializeByValueID(JSCompiler_inline_result.id);
          } else
            task.keyPath = prevKeyPath, task.implicitSlot = prevImplicitSlot, request.pendingChunks++, prevKeyPath = request.nextChunkId++, prevImplicitSlot = logRecoverableError(request, value), emitErrorChunk(request, prevKeyPath, prevImplicitSlot), JSCompiler_inline_result = parentPropertyName ? serializeLazyID(prevKeyPath) : serializeByValueID(prevKeyPath);
        }
        return JSCompiler_inline_result;
      },
      thenableState: null
    };
    abortSet.add(task);
    return task;
  }
  function serializeByValueID(id) {
    return "$" + id.toString(16);
  }
  function serializeLazyID(id) {
    return "$L" + id.toString(16);
  }
  function encodeReferenceChunk(request, id, reference) {
    request = stringify(reference);
    id = id.toString(16) + ":" + request + "\n";
    return stringToChunk(id);
  }
  function serializeClientReference(request, parent, parentPropertyName, clientReference) {
    var clientReferenceKey = clientReference.$$async ? clientReference.$$id + "#async" : clientReference.$$id, writtenClientReferences = request.writtenClientReferences, existingId = writtenClientReferences.get(clientReferenceKey);
    if (void 0 !== existingId)
      return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(existingId) : serializeByValueID(existingId);
    try {
      var config = request.bundlerConfig, modulePath = clientReference.$$id;
      existingId = "";
      var resolvedModuleData = config[modulePath];
      if (resolvedModuleData) existingId = resolvedModuleData.name;
      else {
        var idx = modulePath.lastIndexOf("#");
        -1 !== idx && (existingId = modulePath.slice(idx + 1), resolvedModuleData = config[modulePath.slice(0, idx)]);
        if (!resolvedModuleData)
          throw Error(
            'Could not find the module "' + modulePath + '" in the React Client Manifest. This is probably a bug in the React Server Components bundler.'
          );
      }
      if (true === resolvedModuleData.async && true === clientReference.$$async)
        throw Error(
          'The module "' + modulePath + '" is marked as an async ESM module but was loaded as a CJS proxy. This is probably a bug in the React Server Components bundler.'
        );
      var JSCompiler_inline_result = true === resolvedModuleData.async || true === clientReference.$$async ? [resolvedModuleData.id, resolvedModuleData.chunks, existingId, 1] : [resolvedModuleData.id, resolvedModuleData.chunks, existingId];
      request.pendingChunks++;
      var importId = request.nextChunkId++, json = stringify(JSCompiler_inline_result), row = importId.toString(16) + ":I" + json + "\n", processedChunk = stringToChunk(row);
      request.completedImportChunks.push(processedChunk);
      writtenClientReferences.set(clientReferenceKey, importId);
      return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(importId) : serializeByValueID(importId);
    } catch (x) {
      return request.pendingChunks++, parent = request.nextChunkId++, parentPropertyName = logRecoverableError(request, x), emitErrorChunk(request, parent, parentPropertyName), serializeByValueID(parent);
    }
  }
  function outlineModelWithFormatContext(request, value, formatContext) {
    value = createTask(
      request,
      value,
      null,
      false,
      formatContext,
      request.abortableTasks
    );
    retryTask(request, value);
    return value.id;
  }
  function serializeTypedArray(request, tag, typedArray) {
    request.pendingChunks++;
    var bufferId = request.nextChunkId++;
    emitTypedArrayChunk(request, bufferId, tag, typedArray, false);
    return serializeByValueID(bufferId);
  }
  function serializeBlob(request, blob) {
    function progress(entry) {
      if (0 === newTask.status)
        if (entry.done)
          request.cacheController.signal.removeEventListener("abort", abortBlob), pingTask(request, newTask);
        else
          return model.push(entry.value), reader.read().then(progress).catch(error);
    }
    function error(reason) {
      0 === newTask.status && (request.cacheController.signal.removeEventListener("abort", abortBlob), erroredTask(request, newTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
    }
    function abortBlob() {
      if (0 === newTask.status) {
        var signal = request.cacheController.signal;
        signal.removeEventListener("abort", abortBlob);
        signal = signal.reason;
        21 === request.type ? (request.abortableTasks.delete(newTask), haltTask(newTask), finishHaltedTask(newTask, request)) : (erroredTask(request, newTask, signal), enqueueFlush(request));
        reader.cancel(signal).then(error, error);
      }
    }
    var model = [blob.type], newTask = createTask(request, model, null, false, 0, request.abortableTasks), reader = blob.stream().getReader();
    request.cacheController.signal.addEventListener("abort", abortBlob);
    reader.read().then(progress).catch(error);
    return "$B" + newTask.id.toString(16);
  }
  var modelRoot = false;
  function renderModelDestructive(request, task, parent, parentPropertyName, value) {
    task.model = value;
    if (value === REACT_ELEMENT_TYPE) return "$";
    if (null === value) return null;
    if ("object" === typeof value) {
      switch (value.$$typeof) {
        case REACT_ELEMENT_TYPE:
          var elementReference = null, writtenObjects = request.writtenObjects;
          if (null === task.keyPath && !task.implicitSlot) {
            var existingReference = writtenObjects.get(value);
            if (void 0 !== existingReference)
              if (modelRoot === value) modelRoot = null;
              else return existingReference;
            else
              -1 === parentPropertyName.indexOf(":") && (parent = writtenObjects.get(parent), void 0 !== parent && (elementReference = parent + ":" + parentPropertyName, writtenObjects.set(value, elementReference)));
          }
          if (3200 < serializedSize) return deferTask(request, task);
          parentPropertyName = value.props;
          parent = parentPropertyName.ref;
          request = renderElement(
            request,
            task,
            value.type,
            value.key,
            void 0 !== parent ? parent : null,
            parentPropertyName
          );
          "object" === typeof request && null !== request && null !== elementReference && (writtenObjects.has(request) || writtenObjects.set(request, elementReference));
          return request;
        case REACT_LAZY_TYPE:
          if (3200 < serializedSize) return deferTask(request, task);
          task.thenableState = null;
          parentPropertyName = value._init;
          value = parentPropertyName(value._payload);
          if (12 === request.status) throw null;
          return renderModelDestructive(request, task, emptyRoot, "", value);
        case REACT_LEGACY_ELEMENT_TYPE:
          throw Error(
            'A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.'
          );
      }
      if (value.$$typeof === CLIENT_REFERENCE_TAG$1)
        return serializeClientReference(
          request,
          parent,
          parentPropertyName,
          value
        );
      if (void 0 !== request.temporaryReferences && (elementReference = request.temporaryReferences.get(value), void 0 !== elementReference))
        return "$T" + elementReference;
      elementReference = request.writtenObjects;
      writtenObjects = elementReference.get(value);
      if ("function" === typeof value.then) {
        if (void 0 !== writtenObjects) {
          if (null !== task.keyPath || task.implicitSlot)
            return "$@" + serializeThenable(request, task, value).toString(16);
          if (modelRoot === value) modelRoot = null;
          else return writtenObjects;
        }
        request = "$@" + serializeThenable(request, task, value).toString(16);
        elementReference.set(value, request);
        return request;
      }
      if (void 0 !== writtenObjects)
        if (modelRoot === value) {
          if (writtenObjects !== serializeByValueID(task.id))
            return writtenObjects;
          modelRoot = null;
        } else return writtenObjects;
      else if (-1 === parentPropertyName.indexOf(":") && (writtenObjects = elementReference.get(parent), void 0 !== writtenObjects)) {
        existingReference = parentPropertyName;
        if (isArrayImpl(parent) && parent[0] === REACT_ELEMENT_TYPE)
          switch (parentPropertyName) {
            case "1":
              existingReference = "type";
              break;
            case "2":
              existingReference = "key";
              break;
            case "3":
              existingReference = "props";
              break;
            case "4":
              existingReference = "_owner";
          }
        elementReference.set(value, writtenObjects + ":" + existingReference);
      }
      if (isArrayImpl(value)) return renderFragment(request, task, value);
      if (value instanceof Map)
        return value = Array.from(value), "$Q" + outlineModelWithFormatContext(request, value, 0).toString(16);
      if (value instanceof Set)
        return value = Array.from(value), "$W" + outlineModelWithFormatContext(request, value, 0).toString(16);
      if ("function" === typeof FormData && value instanceof FormData)
        return value = Array.from(value.entries()), "$K" + outlineModelWithFormatContext(request, value, 0).toString(16);
      if (value instanceof Error) return "$Z";
      if (value instanceof ArrayBuffer)
        return serializeTypedArray(request, "A", new Uint8Array(value));
      if (value instanceof Int8Array)
        return serializeTypedArray(request, "O", value);
      if (value instanceof Uint8Array)
        return serializeTypedArray(request, "o", value);
      if (value instanceof Uint8ClampedArray)
        return serializeTypedArray(request, "U", value);
      if (value instanceof Int16Array)
        return serializeTypedArray(request, "S", value);
      if (value instanceof Uint16Array)
        return serializeTypedArray(request, "s", value);
      if (value instanceof Int32Array)
        return serializeTypedArray(request, "L", value);
      if (value instanceof Uint32Array)
        return serializeTypedArray(request, "l", value);
      if (value instanceof Float32Array)
        return serializeTypedArray(request, "G", value);
      if (value instanceof Float64Array)
        return serializeTypedArray(request, "g", value);
      if (value instanceof BigInt64Array)
        return serializeTypedArray(request, "M", value);
      if (value instanceof BigUint64Array)
        return serializeTypedArray(request, "m", value);
      if (value instanceof DataView)
        return serializeTypedArray(request, "V", value);
      if ("function" === typeof Blob && value instanceof Blob)
        return serializeBlob(request, value);
      if (elementReference = getIteratorFn(value))
        return parentPropertyName = elementReference.call(value), parentPropertyName === value ? (value = Array.from(parentPropertyName), "$i" + outlineModelWithFormatContext(request, value, 0).toString(16)) : renderFragment(request, task, Array.from(parentPropertyName));
      if ("function" === typeof ReadableStream && value instanceof ReadableStream)
        return serializeReadableStream(request, task, value);
      elementReference = value[ASYNC_ITERATOR];
      if ("function" === typeof elementReference)
        return null !== task.keyPath ? (request = [
          REACT_ELEMENT_TYPE,
          REACT_FRAGMENT_TYPE,
          task.keyPath,
          { children: value }
        ], request = task.implicitSlot ? [request] : request) : (parentPropertyName = elementReference.call(value), request = serializeAsyncIterable(
          request,
          task,
          value,
          parentPropertyName
        )), request;
      if (value instanceof Date) return "$D" + value.toJSON();
      request = getPrototypeOf(value);
      if (request !== ObjectPrototype$1 && (null === request || null !== getPrototypeOf(request)))
        throw Error(
          "Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." + describeObjectForErrorMessage(parent, parentPropertyName)
        );
      return value;
    }
    if ("string" === typeof value) {
      serializedSize += value.length;
      if ("Z" === value[value.length - 1] && parent[parentPropertyName] instanceof Date)
        return "$D" + value;
      if (1024 <= value.length && null !== byteLengthOfChunk)
        return request.pendingChunks++, task = request.nextChunkId++, emitTextChunk(request, task, value, false), serializeByValueID(task);
      request = "$" === value[0] ? "$" + value : value;
      return request;
    }
    if ("boolean" === typeof value) return value;
    if ("number" === typeof value)
      return Number.isFinite(value) ? 0 === value && -Infinity === 1 / value ? "$-0" : value : Infinity === value ? "$Infinity" : -Infinity === value ? "$-Infinity" : "$NaN";
    if ("undefined" === typeof value) return "$undefined";
    if ("function" === typeof value) {
      if (value.$$typeof === CLIENT_REFERENCE_TAG$1)
        return serializeClientReference(
          request,
          parent,
          parentPropertyName,
          value
        );
      if (value.$$typeof === SERVER_REFERENCE_TAG)
        return task = request.writtenServerReferences, parentPropertyName = task.get(value), void 0 !== parentPropertyName ? request = "$h" + parentPropertyName.toString(16) : (parentPropertyName = value.$$bound, parentPropertyName = null === parentPropertyName ? null : Promise.resolve(parentPropertyName), request = outlineModelWithFormatContext(
          request,
          { id: value.$$id, bound: parentPropertyName },
          0
        ), task.set(value, request), request = "$h" + request.toString(16)), request;
      if (void 0 !== request.temporaryReferences && (request = request.temporaryReferences.get(value), void 0 !== request))
        return "$T" + request;
      if (value.$$typeof === TEMPORARY_REFERENCE_TAG)
        throw Error(
          "Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server."
        );
      if (/^on[A-Z]/.test(parentPropertyName))
        throw Error(
          "Event handlers cannot be passed to Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName) + "\nIf you need interactivity, consider converting part of this to a Client Component."
        );
      throw Error(
        'Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.' + describeObjectForErrorMessage(parent, parentPropertyName)
      );
    }
    if ("symbol" === typeof value) {
      task = request.writtenSymbols;
      elementReference = task.get(value);
      if (void 0 !== elementReference)
        return serializeByValueID(elementReference);
      elementReference = value.description;
      if (Symbol.for(elementReference) !== value)
        throw Error(
          "Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + (value.description + ") cannot be found among global symbols.") + describeObjectForErrorMessage(parent, parentPropertyName)
        );
      request.pendingChunks++;
      parentPropertyName = request.nextChunkId++;
      parent = encodeReferenceChunk(
        request,
        parentPropertyName,
        "$S" + elementReference
      );
      request.completedImportChunks.push(parent);
      task.set(value, parentPropertyName);
      return serializeByValueID(parentPropertyName);
    }
    if ("bigint" === typeof value) return "$n" + value.toString(10);
    throw Error(
      "Type " + typeof value + " is not supported in Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName)
    );
  }
  function logRecoverableError(request, error) {
    var prevRequest = currentRequest;
    currentRequest = null;
    try {
      var onError = request.onError;
      var errorDigest = supportsRequestStorage ? requestStorage.run(void 0, onError, error) : onError(error);
    } finally {
      currentRequest = prevRequest;
    }
    if (null != errorDigest && "string" !== typeof errorDigest)
      throw Error(
        'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead'
      );
    return errorDigest || "";
  }
  function fatalError(request, error) {
    var onFatalError = request.onFatalError;
    onFatalError(error);
    null !== request.destination ? (request.status = 14, closeWithError(request.destination, error)) : (request.status = 13, request.fatalError = error);
    request.cacheController.abort(
      Error("The render was aborted due to a fatal error.", { cause: error })
    );
  }
  function emitErrorChunk(request, id, digest) {
    digest = { digest };
    id = id.toString(16) + ":E" + stringify(digest) + "\n";
    id = stringToChunk(id);
    request.completedErrorChunks.push(id);
  }
  function emitModelChunk(request, id, json) {
    id = id.toString(16) + ":" + json + "\n";
    id = stringToChunk(id);
    request.completedRegularChunks.push(id);
  }
  function emitTypedArrayChunk(request, id, tag, typedArray, debug) {
    debug ? request.pendingDebugChunks++ : request.pendingChunks++;
    debug = new Uint8Array(
      typedArray.buffer,
      typedArray.byteOffset,
      typedArray.byteLength
    );
    typedArray = 2048 < typedArray.byteLength ? debug.slice() : debug;
    debug = typedArray.byteLength;
    id = id.toString(16) + ":" + tag + debug.toString(16) + ",";
    id = stringToChunk(id);
    request.completedRegularChunks.push(id, typedArray);
  }
  function emitTextChunk(request, id, text, debug) {
    if (null === byteLengthOfChunk)
      throw Error(
        "Existence of byteLengthOfChunk should have already been checked. This is a bug in React."
      );
    debug ? request.pendingDebugChunks++ : request.pendingChunks++;
    text = stringToChunk(text);
    debug = text.byteLength;
    id = id.toString(16) + ":T" + debug.toString(16) + ",";
    id = stringToChunk(id);
    request.completedRegularChunks.push(id, text);
  }
  function emitChunk(request, task, value) {
    var id = task.id;
    "string" === typeof value && null !== byteLengthOfChunk ? emitTextChunk(request, id, value, false) : value instanceof ArrayBuffer ? emitTypedArrayChunk(request, id, "A", new Uint8Array(value), false) : value instanceof Int8Array ? emitTypedArrayChunk(request, id, "O", value, false) : value instanceof Uint8Array ? emitTypedArrayChunk(request, id, "o", value, false) : value instanceof Uint8ClampedArray ? emitTypedArrayChunk(request, id, "U", value, false) : value instanceof Int16Array ? emitTypedArrayChunk(request, id, "S", value, false) : value instanceof Uint16Array ? emitTypedArrayChunk(request, id, "s", value, false) : value instanceof Int32Array ? emitTypedArrayChunk(request, id, "L", value, false) : value instanceof Uint32Array ? emitTypedArrayChunk(request, id, "l", value, false) : value instanceof Float32Array ? emitTypedArrayChunk(request, id, "G", value, false) : value instanceof Float64Array ? emitTypedArrayChunk(request, id, "g", value, false) : value instanceof BigInt64Array ? emitTypedArrayChunk(request, id, "M", value, false) : value instanceof BigUint64Array ? emitTypedArrayChunk(request, id, "m", value, false) : value instanceof DataView ? emitTypedArrayChunk(request, id, "V", value, false) : (value = stringify(value, task.toJSON), emitModelChunk(request, task.id, value));
  }
  function erroredTask(request, task, error) {
    task.status = 4;
    error = logRecoverableError(request, error);
    emitErrorChunk(request, task.id, error);
    request.abortableTasks.delete(task);
    callOnAllReadyIfReady(request);
  }
  var emptyRoot = {};
  function retryTask(request, task) {
    if (0 === task.status) {
      task.status = 5;
      var parentSerializedSize = serializedSize;
      try {
        modelRoot = task.model;
        var resolvedModel = renderModelDestructive(
          request,
          task,
          emptyRoot,
          "",
          task.model
        );
        modelRoot = resolvedModel;
        task.keyPath = null;
        task.implicitSlot = false;
        if ("object" === typeof resolvedModel && null !== resolvedModel)
          request.writtenObjects.set(resolvedModel, serializeByValueID(task.id)), emitChunk(request, task, resolvedModel);
        else {
          var json = stringify(resolvedModel);
          emitModelChunk(request, task.id, json);
        }
        task.status = 1;
        request.abortableTasks.delete(task);
        callOnAllReadyIfReady(request);
      } catch (thrownValue) {
        if (12 === request.status)
          if (request.abortableTasks.delete(task), task.status = 0, 21 === request.type)
            haltTask(task), finishHaltedTask(task, request);
          else {
            var errorId = request.fatalError;
            abortTask(task);
            finishAbortedTask(task, request, errorId);
          }
        else {
          var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
          if ("object" === typeof x && null !== x && "function" === typeof x.then) {
            task.status = 0;
            task.thenableState = getThenableStateAfterSuspending();
            var ping = task.ping;
            x.then(ping, ping);
          } else erroredTask(request, task, x);
        }
      } finally {
        serializedSize = parentSerializedSize;
      }
    }
  }
  function tryStreamTask(request, task) {
    var parentSerializedSize = serializedSize;
    try {
      emitChunk(request, task, task.model);
    } finally {
      serializedSize = parentSerializedSize;
    }
  }
  function performWork(request) {
    var prevDispatcher = ReactSharedInternalsServer.H;
    ReactSharedInternalsServer.H = HooksDispatcher;
    var prevRequest = currentRequest;
    currentRequest$1 = currentRequest = request;
    try {
      var pingedTasks = request.pingedTasks;
      request.pingedTasks = [];
      for (var i = 0; i < pingedTasks.length; i++)
        retryTask(request, pingedTasks[i]);
      flushCompletedChunks(request);
    } catch (error) {
      logRecoverableError(request, error), fatalError(request, error);
    } finally {
      ReactSharedInternalsServer.H = prevDispatcher, currentRequest$1 = null, currentRequest = prevRequest;
    }
  }
  function abortTask(task) {
    0 === task.status && (task.status = 3);
  }
  function finishAbortedTask(task, request, errorId) {
    3 === task.status && (errorId = serializeByValueID(errorId), task = encodeReferenceChunk(request, task.id, errorId), request.completedErrorChunks.push(task));
  }
  function haltTask(task) {
    0 === task.status && (task.status = 3);
  }
  function finishHaltedTask(task, request) {
    3 === task.status && request.pendingChunks--;
  }
  function flushCompletedChunks(request) {
    var destination = request.destination;
    if (null !== destination) {
      currentView = new Uint8Array(2048);
      writtenBytes = 0;
      try {
        for (var importsChunks = request.completedImportChunks, i = 0; i < importsChunks.length; i++)
          request.pendingChunks--, writeChunkAndReturn(destination, importsChunks[i]);
        importsChunks.splice(0, i);
        var hintChunks = request.completedHintChunks;
        for (i = 0; i < hintChunks.length; i++)
          writeChunkAndReturn(destination, hintChunks[i]);
        hintChunks.splice(0, i);
        var regularChunks = request.completedRegularChunks;
        for (i = 0; i < regularChunks.length; i++)
          request.pendingChunks--, writeChunkAndReturn(destination, regularChunks[i]);
        regularChunks.splice(0, i);
        var errorChunks = request.completedErrorChunks;
        for (i = 0; i < errorChunks.length; i++)
          request.pendingChunks--, writeChunkAndReturn(destination, errorChunks[i]);
        errorChunks.splice(0, i);
      } finally {
        request.flushScheduled = false, currentView && 0 < writtenBytes && (destination.enqueue(
          new Uint8Array(currentView.buffer, 0, writtenBytes)
        ), currentView = null, writtenBytes = 0);
      }
    }
    0 === request.pendingChunks && (12 > request.status && request.cacheController.abort(
      Error(
        "This render completed successfully. All cacheSignals are now aborted to allow clean up of any unused resources."
      )
    ), null !== request.destination && (request.status = 14, request.destination.close(), request.destination = null));
  }
  function startWork(request) {
    request.flushScheduled = null !== request.destination;
    supportsRequestStorage ? scheduleMicrotask(function() {
      requestStorage.run(request, performWork, request);
    }) : scheduleMicrotask(function() {
      return performWork(request);
    });
    setTimeout(function() {
      10 === request.status && (request.status = 11);
    }, 0);
  }
  function enqueueFlush(request) {
    false === request.flushScheduled && 0 === request.pingedTasks.length && null !== request.destination && (request.flushScheduled = true, setTimeout(function() {
      request.flushScheduled = false;
      flushCompletedChunks(request);
    }, 0));
  }
  function callOnAllReadyIfReady(request) {
    0 === request.abortableTasks.size && (request = request.onAllReady, request());
  }
  function startFlowing(request, destination) {
    if (13 === request.status)
      request.status = 14, closeWithError(destination, request.fatalError);
    else if (14 !== request.status && null === request.destination) {
      request.destination = destination;
      try {
        flushCompletedChunks(request);
      } catch (error) {
        logRecoverableError(request, error), fatalError(request, error);
      }
    }
  }
  function finishHalt(request, abortedTasks) {
    try {
      abortedTasks.forEach(function(task) {
        return finishHaltedTask(task, request);
      });
      var onAllReady = request.onAllReady;
      onAllReady();
      flushCompletedChunks(request);
    } catch (error) {
      logRecoverableError(request, error), fatalError(request, error);
    }
  }
  function finishAbort(request, abortedTasks, errorId) {
    try {
      abortedTasks.forEach(function(task) {
        return finishAbortedTask(task, request, errorId);
      });
      var onAllReady = request.onAllReady;
      onAllReady();
      flushCompletedChunks(request);
    } catch (error) {
      logRecoverableError(request, error), fatalError(request, error);
    }
  }
  function abort(request, reason) {
    if (!(11 < request.status))
      try {
        request.status = 12;
        request.cacheController.abort(reason);
        var abortableTasks = request.abortableTasks;
        if (0 < abortableTasks.size)
          if (21 === request.type)
            abortableTasks.forEach(function(task) {
              return haltTask(task, request);
            }), setTimeout(function() {
              return finishHalt(request, abortableTasks);
            }, 0);
          else {
            var error = void 0 === reason ? Error(
              "The render was aborted by the server without a reason."
            ) : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error(
              "The render was aborted by the server with a promise."
            ) : reason, digest = logRecoverableError(request, error, null), errorId = request.nextChunkId++;
            request.fatalError = errorId;
            request.pendingChunks++;
            emitErrorChunk(request, errorId, digest, error, false, null);
            abortableTasks.forEach(function(task) {
              return abortTask(task, request, errorId);
            });
            setTimeout(function() {
              return finishAbort(request, abortableTasks, errorId);
            }, 0);
          }
        else {
          var onAllReady = request.onAllReady;
          onAllReady();
          flushCompletedChunks(request);
        }
      } catch (error$26) {
        logRecoverableError(request, error$26), fatalError(request, error$26);
      }
  }
  function resolveServerReference(bundlerConfig, id) {
    var name = "", resolvedModuleData = bundlerConfig[id];
    if (resolvedModuleData) name = resolvedModuleData.name;
    else {
      var idx = id.lastIndexOf("#");
      -1 !== idx && (name = id.slice(idx + 1), resolvedModuleData = bundlerConfig[id.slice(0, idx)]);
      if (!resolvedModuleData)
        throw Error(
          'Could not find the module "' + id + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.'
        );
    }
    return resolvedModuleData.async ? [resolvedModuleData.id, resolvedModuleData.chunks, name, 1] : [resolvedModuleData.id, resolvedModuleData.chunks, name];
  }
  var chunkCache = /* @__PURE__ */ new Map();
  function requireAsyncModule(id) {
    var promise = __vite_rsc_require__(id);
    if ("function" !== typeof promise.then || "fulfilled" === promise.status)
      return null;
    promise.then(
      function(value) {
        promise.status = "fulfilled";
        promise.value = value;
      },
      function(reason) {
        promise.status = "rejected";
        promise.reason = reason;
      }
    );
    return promise;
  }
  function ignoreReject() {
  }
  function preloadModule(metadata2) {
    for (var chunks = metadata2[1], promises = [], i = 0; i < chunks.length; ) {
      var chunkId = chunks[i++];
      chunks[i++];
      var entry = chunkCache.get(chunkId);
      if (void 0 === entry) {
        entry = __webpack_chunk_load__(chunkId);
        promises.push(entry);
        var resolve = chunkCache.set.bind(chunkCache, chunkId, null);
        entry.then(resolve, ignoreReject);
        chunkCache.set(chunkId, entry);
      } else null !== entry && promises.push(entry);
    }
    return 4 === metadata2.length ? 0 === promises.length ? requireAsyncModule(metadata2[0]) : Promise.all(promises).then(function() {
      return requireAsyncModule(metadata2[0]);
    }) : 0 < promises.length ? Promise.all(promises) : null;
  }
  function requireModule2(metadata2) {
    var moduleExports = __vite_rsc_require__(metadata2[0]);
    if (4 === metadata2.length && "function" === typeof moduleExports.then)
      if ("fulfilled" === moduleExports.status)
        moduleExports = moduleExports.value;
      else throw moduleExports.reason;
    if ("*" === metadata2[2]) return moduleExports;
    if ("" === metadata2[2])
      return moduleExports.__esModule ? moduleExports.default : moduleExports;
    if (hasOwnProperty.call(moduleExports, metadata2[2]))
      return moduleExports[metadata2[2]];
  }
  var RESPONSE_SYMBOL = /* @__PURE__ */ Symbol();
  function ReactPromise(status, value, reason) {
    this.status = status;
    this.value = value;
    this.reason = reason;
  }
  ReactPromise.prototype = Object.create(Promise.prototype);
  ReactPromise.prototype.then = function(resolve, reject) {
    switch (this.status) {
      case "resolved_model":
        initializeModelChunk(this);
    }
    switch (this.status) {
      case "fulfilled":
        if ("function" === typeof resolve) {
          for (var inspectedValue = this.value, cycleProtection = 0, visited = /* @__PURE__ */ new Set(); inspectedValue instanceof ReactPromise; ) {
            cycleProtection++;
            if (inspectedValue === this || visited.has(inspectedValue) || 1e3 < cycleProtection) {
              "function" === typeof reject && reject(Error("Cannot have cyclic thenables."));
              return;
            }
            visited.add(inspectedValue);
            if ("fulfilled" === inspectedValue.status)
              inspectedValue = inspectedValue.value;
            else break;
          }
          resolve(this.value);
        }
        break;
      case "pending":
      case "blocked":
        "function" === typeof resolve && (null === this.value && (this.value = []), this.value.push(resolve));
        "function" === typeof reject && (null === this.reason && (this.reason = []), this.reason.push(reject));
        break;
      default:
        "function" === typeof reject && reject(this.reason);
    }
  };
  var ObjectPrototype = Object.prototype, ArrayPrototype = Array.prototype;
  function wakeChunk(response, listeners, value, chunk) {
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      "function" === typeof listener ? listener(value) : fulfillReference(response, listener, value, chunk.reason);
    }
  }
  function rejectChunk(response, listeners, error) {
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      "function" === typeof listener ? listener(error) : rejectReference(response, listener.handler, error);
    }
  }
  function triggerErrorOnChunk(response, chunk, error) {
    if ("pending" !== chunk.status && "blocked" !== chunk.status)
      chunk.reason.error(error);
    else {
      var listeners = chunk.reason;
      chunk.status = "rejected";
      chunk.reason = error;
      null !== listeners && rejectChunk(response, listeners, error);
    }
  }
  function createResolvedModelChunk(response, value, id) {
    var $jscomp$compprop2 = {};
    return new ReactPromise(
      "resolved_model",
      value,
      ($jscomp$compprop2.id = id, $jscomp$compprop2[RESPONSE_SYMBOL] = response, $jscomp$compprop2)
    );
  }
  function resolveModelChunk(response, chunk, value, id) {
    if ("pending" !== chunk.status)
      chunk = chunk.reason, "C" === value[0] ? chunk.close("C" === value ? '"$undefined"' : value.slice(1)) : chunk.enqueueModel(value);
    else {
      var resolveListeners = chunk.value, rejectListeners = chunk.reason;
      chunk.status = "resolved_model";
      chunk.value = value;
      value = {};
      chunk.reason = (value.id = id, value[RESPONSE_SYMBOL] = response, value);
      if (null !== resolveListeners)
        switch (initializeModelChunk(chunk), chunk.status) {
          case "fulfilled":
            wakeChunk(response, resolveListeners, chunk.value, chunk);
            break;
          case "blocked":
          case "pending":
            if (chunk.value)
              for (response = 0; response < resolveListeners.length; response++)
                chunk.value.push(resolveListeners[response]);
            else chunk.value = resolveListeners;
            if (chunk.reason) {
              if (rejectListeners)
                for (resolveListeners = 0; resolveListeners < rejectListeners.length; resolveListeners++)
                  chunk.reason.push(rejectListeners[resolveListeners]);
            } else chunk.reason = rejectListeners;
            break;
          case "rejected":
            rejectListeners && rejectChunk(response, rejectListeners, chunk.reason);
        }
    }
  }
  function createResolvedIteratorResultChunk(response, value, done) {
    var $jscomp$compprop4 = {};
    return new ReactPromise(
      "resolved_model",
      (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}",
      ($jscomp$compprop4.id = -1, $jscomp$compprop4[RESPONSE_SYMBOL] = response, $jscomp$compprop4)
    );
  }
  function resolveIteratorResultChunk(response, chunk, value, done) {
    resolveModelChunk(
      response,
      chunk,
      (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}",
      -1
    );
  }
  function loadServerReference$1(response, metaData, parentObject, key) {
    function reject(error) {
      var rejectListeners = blockedPromise.reason, erroredPromise = blockedPromise;
      erroredPromise.status = "rejected";
      erroredPromise.value = null;
      erroredPromise.reason = error;
      null !== rejectListeners && rejectChunk(response, rejectListeners, error);
      rejectReference(response, handler2, error);
    }
    var id = metaData.id;
    if ("string" !== typeof id || "then" === key) return null;
    var cachedPromise = metaData.$$promise;
    if (void 0 !== cachedPromise) {
      if ("fulfilled" === cachedPromise.status)
        return cachedPromise = cachedPromise.value, "__proto__" === key ? null : parentObject[key] = cachedPromise;
      initializingHandler ? (id = initializingHandler, id.deps++) : id = initializingHandler = { chunk: null, value: null, reason: null, deps: 1, errored: false };
      cachedPromise.then(
        resolveReference.bind(null, response, id, parentObject, key),
        rejectReference.bind(null, response, id)
      );
      return null;
    }
    var blockedPromise = new ReactPromise("blocked", null, null);
    metaData.$$promise = blockedPromise;
    var serverReference = resolveServerReference(response._bundlerConfig, id);
    cachedPromise = metaData.bound;
    if (id = preloadModule(serverReference))
      cachedPromise instanceof ReactPromise && (id = Promise.all([id, cachedPromise]));
    else if (cachedPromise instanceof ReactPromise)
      id = Promise.resolve(cachedPromise);
    else
      return cachedPromise = requireModule2(serverReference), id = blockedPromise, id.status = "fulfilled", id.value = cachedPromise;
    if (initializingHandler) {
      var handler2 = initializingHandler;
      handler2.deps++;
    } else
      handler2 = initializingHandler = {
        chunk: null,
        value: null,
        reason: null,
        deps: 1,
        errored: false
      };
    id.then(function() {
      var resolvedValue = requireModule2(serverReference);
      if (metaData.bound) {
        var promiseValue = metaData.bound.value;
        promiseValue = isArrayImpl(promiseValue) ? promiseValue.slice(0) : [];
        if (1e3 < promiseValue.length) {
          reject(
            Error(
              "Server Function has too many bound arguments. Received " + promiseValue.length + " but the limit is 1000."
            )
          );
          return;
        }
        promiseValue.unshift(null);
        resolvedValue = resolvedValue.bind.apply(resolvedValue, promiseValue);
      }
      promiseValue = blockedPromise.value;
      var initializedPromise = blockedPromise;
      initializedPromise.status = "fulfilled";
      initializedPromise.value = resolvedValue;
      initializedPromise.reason = null;
      null !== promiseValue && wakeChunk(response, promiseValue, resolvedValue, initializedPromise);
      resolveReference(response, handler2, parentObject, key, resolvedValue);
    }, reject);
    return null;
  }
  function reviveModel(response, parentObj, parentKey, value, reference, arrayRoot) {
    if ("string" === typeof value)
      return parseModelString(
        response,
        parentObj,
        parentKey,
        value,
        reference,
        arrayRoot
      );
    if ("object" === typeof value && null !== value)
      if (void 0 !== reference && void 0 !== response._temporaryReferences && response._temporaryReferences.set(value, reference), isArrayImpl(value)) {
        if (null === arrayRoot) {
          var childContext = { count: 0, fork: false };
          response._rootArrayContexts.set(value, childContext);
        } else childContext = arrayRoot;
        1 < value.length && (childContext.fork = true);
        bumpArrayCount(childContext, value.length + 1, response);
        for (parentObj = 0; parentObj < value.length; parentObj++)
          value[parentObj] = reviveModel(
            response,
            value,
            "" + parentObj,
            value[parentObj],
            void 0 !== reference ? reference + ":" + parentObj : void 0,
            childContext
          );
      } else
        for (childContext in value)
          hasOwnProperty.call(value, childContext) && ("__proto__" === childContext ? delete value[childContext] : (parentObj = void 0 !== reference && -1 === childContext.indexOf(":") ? reference + ":" + childContext : void 0, parentObj = reviveModel(
            response,
            value,
            childContext,
            value[childContext],
            parentObj,
            null
          ), void 0 !== parentObj ? value[childContext] = parentObj : delete value[childContext]));
    return value;
  }
  function bumpArrayCount(arrayContext, slots, response) {
    if ((arrayContext.count += slots) > response._arraySizeLimit && arrayContext.fork)
      throw Error(
        "Maximum array nesting exceeded. Large nested arrays can be dangerous. Try adding intermediate objects."
      );
  }
  var initializingHandler = null;
  function initializeModelChunk(chunk) {
    var prevHandler = initializingHandler;
    initializingHandler = null;
    var _chunk$reason = chunk.reason, response = _chunk$reason[RESPONSE_SYMBOL];
    _chunk$reason = _chunk$reason.id;
    _chunk$reason = -1 === _chunk$reason ? void 0 : _chunk$reason.toString(16);
    var resolvedModel = chunk.value;
    chunk.status = "blocked";
    chunk.value = null;
    chunk.reason = null;
    try {
      var rawModel = JSON.parse(resolvedModel);
      resolvedModel = { count: 0, fork: false };
      var value = reviveModel(
        response,
        { "": rawModel },
        "",
        rawModel,
        _chunk$reason,
        resolvedModel
      ), resolveListeners = chunk.value;
      if (null !== resolveListeners)
        for (chunk.value = null, chunk.reason = null, rawModel = 0; rawModel < resolveListeners.length; rawModel++) {
          var listener = resolveListeners[rawModel];
          "function" === typeof listener ? listener(value) : fulfillReference(response, listener, value, resolvedModel);
        }
      if (null !== initializingHandler) {
        if (initializingHandler.errored) throw initializingHandler.reason;
        if (0 < initializingHandler.deps) {
          initializingHandler.value = value;
          initializingHandler.reason = resolvedModel;
          initializingHandler.chunk = chunk;
          return;
        }
      }
      chunk.status = "fulfilled";
      chunk.value = value;
      chunk.reason = resolvedModel;
    } catch (error) {
      chunk.status = "rejected", chunk.reason = error;
    } finally {
      initializingHandler = prevHandler;
    }
  }
  function reportGlobalError(response, error) {
    response._closed = true;
    response._closedReason = error;
    response._chunks.forEach(function(chunk) {
      "pending" === chunk.status ? triggerErrorOnChunk(response, chunk, error) : "fulfilled" === chunk.status && null !== chunk.reason && (chunk = chunk.reason, "function" === typeof chunk.error && chunk.error(error));
    });
  }
  function getChunk(response, id) {
    var chunks = response._chunks, chunk = chunks.get(id);
    chunk || (chunk = response._formData.get(response._prefix + id), chunk = "string" === typeof chunk ? createResolvedModelChunk(response, chunk, id) : response._closed ? new ReactPromise("rejected", null, response._closedReason) : new ReactPromise("pending", null, null), chunks.set(id, chunk));
    return chunk;
  }
  function fulfillReference(response, reference, value, arrayRoot) {
    var handler2 = reference.handler, parentObject = reference.parentObject, key = reference.key, map = reference.map, path = reference.path;
    try {
      for (var localLength = 0, rootArrayContexts = response._rootArrayContexts, i = 1; i < path.length; i++) {
        var name = path[i];
        if ("object" !== typeof value || null === value || getPrototypeOf(value) !== ObjectPrototype && getPrototypeOf(value) !== ArrayPrototype || !hasOwnProperty.call(value, name))
          throw Error("Invalid reference.");
        value = value[name];
        if (isArrayImpl(value))
          localLength = 0, arrayRoot = rootArrayContexts.get(value) || arrayRoot;
        else if (arrayRoot = null, "string" === typeof value)
          localLength = value.length;
        else if ("bigint" === typeof value) {
          var n = Math.abs(Number(value));
          localLength = 0 === n ? 1 : Math.floor(Math.log10(n)) + 1;
        } else localLength = ArrayBuffer.isView(value) ? value.byteLength : 0;
      }
      var resolvedValue = map(response, value, parentObject, key);
      var referenceArrayRoot = reference.arrayRoot;
      null !== referenceArrayRoot && (null !== arrayRoot ? (arrayRoot.fork && (referenceArrayRoot.fork = true), bumpArrayCount(referenceArrayRoot, arrayRoot.count, response)) : 0 < localLength && bumpArrayCount(referenceArrayRoot, localLength, response));
    } catch (error) {
      rejectReference(response, handler2, error);
      return;
    }
    resolveReference(response, handler2, parentObject, key, resolvedValue);
  }
  function resolveReference(response, handler2, parentObject, key, resolvedValue) {
    "__proto__" !== key && (parentObject[key] = resolvedValue);
    "" === key && null === handler2.value && (handler2.value = resolvedValue);
    handler2.deps--;
    0 === handler2.deps && (parentObject = handler2.chunk, null !== parentObject && "blocked" === parentObject.status && (key = parentObject.value, parentObject.status = "fulfilled", parentObject.value = handler2.value, parentObject.reason = handler2.reason, null !== key && wakeChunk(response, key, handler2.value, parentObject)));
  }
  function rejectReference(response, handler2, error) {
    handler2.errored || (handler2.errored = true, handler2.value = null, handler2.reason = error, handler2 = handler2.chunk, null !== handler2 && "blocked" === handler2.status && triggerErrorOnChunk(response, handler2, error));
  }
  function getOutlinedModel(response, reference, parentObject, key, referenceArrayRoot, map) {
    reference = reference.split(":");
    var id = parseInt(reference[0], 16), chunk = getChunk(response, id);
    switch (chunk.status) {
      case "resolved_model":
        initializeModelChunk(chunk);
    }
    switch (chunk.status) {
      case "fulfilled":
        id = chunk.value;
        chunk = chunk.reason;
        for (var localLength = 0, rootArrayContexts = response._rootArrayContexts, i = 1; i < reference.length; i++) {
          localLength = reference[i];
          if ("object" !== typeof id || null === id || getPrototypeOf(id) !== ObjectPrototype && getPrototypeOf(id) !== ArrayPrototype || !hasOwnProperty.call(id, localLength))
            throw Error("Invalid reference.");
          id = id[localLength];
          isArrayImpl(id) ? (localLength = 0, chunk = rootArrayContexts.get(id) || chunk) : (chunk = null, "string" === typeof id ? localLength = id.length : "bigint" === typeof id ? (localLength = Math.abs(Number(id)), localLength = 0 === localLength ? 1 : Math.floor(Math.log10(localLength)) + 1) : localLength = ArrayBuffer.isView(id) ? id.byteLength : 0);
        }
        parentObject = map(response, id, parentObject, key);
        null !== referenceArrayRoot && (null !== chunk ? (chunk.fork && (referenceArrayRoot.fork = true), bumpArrayCount(referenceArrayRoot, chunk.count, response)) : 0 < localLength && bumpArrayCount(referenceArrayRoot, localLength, response));
        return parentObject;
      case "blocked":
        return initializingHandler ? (response = initializingHandler, response.deps++) : response = initializingHandler = { chunk: null, value: null, reason: null, deps: 1, errored: false }, referenceArrayRoot = {
          handler: response,
          parentObject,
          key,
          map,
          path: reference,
          arrayRoot: referenceArrayRoot
        }, null === chunk.value ? chunk.value = [referenceArrayRoot] : chunk.value.push(referenceArrayRoot), null === chunk.reason ? chunk.reason = [referenceArrayRoot] : chunk.reason.push(referenceArrayRoot), null;
      case "pending":
        throw Error("Invalid forward reference.");
      default:
        return initializingHandler ? (initializingHandler.errored = true, initializingHandler.value = null, initializingHandler.reason = chunk.reason) : initializingHandler = {
          chunk: null,
          value: null,
          reason: chunk.reason,
          deps: 0,
          errored: true
        }, null;
    }
  }
  function createMap(response, model) {
    if (!isArrayImpl(model)) throw Error("Invalid Map initializer.");
    if (true === model.$$consumed) throw Error("Already initialized Map.");
    response = new Map(model);
    model.$$consumed = true;
    return response;
  }
  function createSet(response, model) {
    if (!isArrayImpl(model)) throw Error("Invalid Set initializer.");
    if (true === model.$$consumed) throw Error("Already initialized Set.");
    response = new Set(model);
    model.$$consumed = true;
    return response;
  }
  function extractIterator(response, model) {
    if (!isArrayImpl(model)) throw Error("Invalid Iterator initializer.");
    if (true === model.$$consumed) throw Error("Already initialized Iterator.");
    response = model[Symbol.iterator]();
    model.$$consumed = true;
    return response;
  }
  function createModel(response, model, parentObject, key) {
    return "then" === key && "function" === typeof model ? null : model;
  }
  function parseTypedArray(response, reference, constructor, bytesPerElement, parentObject, parentKey, referenceArrayRoot) {
    function reject(error) {
      if (!handler2.errored) {
        handler2.errored = true;
        handler2.value = null;
        handler2.reason = error;
        var chunk = handler2.chunk;
        null !== chunk && "blocked" === chunk.status && triggerErrorOnChunk(response, chunk, error);
      }
    }
    reference = parseInt(reference.slice(2), 16);
    var key = response._prefix + reference;
    bytesPerElement = response._chunks;
    if (bytesPerElement.has(reference))
      throw Error("Already initialized typed array.");
    bytesPerElement.set(
      reference,
      new ReactPromise(
        "rejected",
        null,
        Error("Already initialized typed array.")
      )
    );
    reference = response._formData.get(key).arrayBuffer();
    if (initializingHandler) {
      var handler2 = initializingHandler;
      handler2.deps++;
    } else
      handler2 = initializingHandler = {
        chunk: null,
        value: null,
        reason: null,
        deps: 1,
        errored: false
      };
    reference.then(function(buffer) {
      try {
        null !== referenceArrayRoot && bumpArrayCount(referenceArrayRoot, buffer.byteLength, response);
        var resolvedValue = constructor === ArrayBuffer ? buffer : new constructor(buffer);
        "__proto__" !== key && (parentObject[parentKey] = resolvedValue);
        "" === parentKey && null === handler2.value && (handler2.value = resolvedValue);
      } catch (x) {
        reject(x);
        return;
      }
      handler2.deps--;
      0 === handler2.deps && (buffer = handler2.chunk, null !== buffer && "blocked" === buffer.status && (resolvedValue = buffer.value, buffer.status = "fulfilled", buffer.value = handler2.value, buffer.reason = null, null !== resolvedValue && wakeChunk(response, resolvedValue, handler2.value, buffer)));
    }, reject);
    return null;
  }
  function resolveStream(response, id, stream, controller) {
    var chunks = response._chunks;
    stream = new ReactPromise("fulfilled", stream, controller);
    chunks.set(id, stream);
    response = response._formData.getAll(response._prefix + id);
    for (id = 0; id < response.length; id++)
      chunks = response[id], "string" === typeof chunks && ("C" === chunks[0] ? controller.close("C" === chunks ? '"$undefined"' : chunks.slice(1)) : controller.enqueueModel(chunks));
  }
  function parseReadableStream(response, reference, type) {
    function enqueue(value) {
      "bytes" !== type || ArrayBuffer.isView(value) ? controller.enqueue(value) : flightController.error(Error("Invalid data for bytes stream."));
    }
    reference = parseInt(reference.slice(2), 16);
    if (response._chunks.has(reference))
      throw Error("Already initialized stream.");
    var controller = null, closed = false, stream = new ReadableStream({
      type,
      start: function(c) {
        controller = c;
      }
    }), previousBlockedChunk = null, flightController = {
      enqueueModel: function(json) {
        if (null === previousBlockedChunk) {
          var chunk = createResolvedModelChunk(response, json, -1);
          initializeModelChunk(chunk);
          "fulfilled" === chunk.status ? enqueue(chunk.value) : (chunk.then(enqueue, flightController.error), previousBlockedChunk = chunk);
        } else {
          chunk = previousBlockedChunk;
          var chunk$31 = new ReactPromise("pending", null, null);
          chunk$31.then(enqueue, flightController.error);
          previousBlockedChunk = chunk$31;
          chunk.then(function() {
            previousBlockedChunk === chunk$31 && (previousBlockedChunk = null);
            resolveModelChunk(response, chunk$31, json, -1);
          });
        }
      },
      close: function() {
        if (!closed)
          if (closed = true, null === previousBlockedChunk)
            controller.close();
          else {
            var blockedChunk = previousBlockedChunk;
            previousBlockedChunk = null;
            blockedChunk.then(function() {
              return controller.close();
            });
          }
      },
      error: function(error) {
        if (!closed)
          if (closed = true, null === previousBlockedChunk)
            controller.error(error);
          else {
            var blockedChunk = previousBlockedChunk;
            previousBlockedChunk = null;
            blockedChunk.then(function() {
              return controller.error(error);
            });
          }
      }
    };
    resolveStream(response, reference, stream, flightController);
    return stream;
  }
  function FlightIterator(next) {
    this.next = next;
  }
  FlightIterator.prototype = {};
  FlightIterator.prototype[ASYNC_ITERATOR] = function() {
    return this;
  };
  function parseAsyncIterable(response, reference, iterator) {
    reference = parseInt(reference.slice(2), 16);
    if (response._chunks.has(reference))
      throw Error("Already initialized stream.");
    var buffer = [], closed = false, nextWriteIndex = 0, $jscomp$compprop5 = {};
    $jscomp$compprop5 = ($jscomp$compprop5[ASYNC_ITERATOR] = function() {
      var nextReadIndex = 0;
      return new FlightIterator(function(arg) {
        if (void 0 !== arg)
          throw Error(
            "Values cannot be passed to next() of AsyncIterables passed to Client Components."
          );
        if (nextReadIndex === buffer.length) {
          if (closed)
            return new ReactPromise(
              "fulfilled",
              { done: true, value: void 0 },
              null
            );
          buffer[nextReadIndex] = new ReactPromise("pending", null, null);
        }
        return buffer[nextReadIndex++];
      });
    }, $jscomp$compprop5);
    iterator = iterator ? $jscomp$compprop5[ASYNC_ITERATOR]() : $jscomp$compprop5;
    resolveStream(response, reference, iterator, {
      enqueueModel: function(value) {
        nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
          response,
          value,
          false
        ) : resolveIteratorResultChunk(
          response,
          buffer[nextWriteIndex],
          value,
          false
        );
        nextWriteIndex++;
      },
      close: function(value) {
        if (!closed)
          for (closed = true, nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
            response,
            value,
            true
          ) : resolveIteratorResultChunk(
            response,
            buffer[nextWriteIndex],
            value,
            true
          ), nextWriteIndex++; nextWriteIndex < buffer.length; )
            resolveIteratorResultChunk(
              response,
              buffer[nextWriteIndex++],
              '"$undefined"',
              true
            );
      },
      error: function(error) {
        if (!closed)
          for (closed = true, nextWriteIndex === buffer.length && (buffer[nextWriteIndex] = new ReactPromise(
            "pending",
            null,
            null
          )); nextWriteIndex < buffer.length; )
            triggerErrorOnChunk(response, buffer[nextWriteIndex++], error);
      }
    });
    return iterator;
  }
  function parseModelString(response, obj, key, value, reference, arrayRoot) {
    if ("$" === value[0]) {
      switch (value[1]) {
        case "$":
          return null !== arrayRoot && bumpArrayCount(arrayRoot, value.length - 1, response), value.slice(1);
        case "@":
          return obj = parseInt(value.slice(2), 16), getChunk(response, obj);
        case "h":
          return arrayRoot = value.slice(2), getOutlinedModel(
            response,
            arrayRoot,
            obj,
            key,
            null,
            loadServerReference$1
          );
        case "T":
          if (void 0 === reference || void 0 === response._temporaryReferences)
            throw Error(
              "Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server."
            );
          return createTemporaryReference(
            response._temporaryReferences,
            reference
          );
        case "Q":
          return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, createMap);
        case "W":
          return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, createSet);
        case "K":
          obj = value.slice(2);
          obj = response._prefix + obj + "_";
          key = new FormData();
          response = response._formData;
          arrayRoot = Array.from(response.keys());
          for (value = 0; value < arrayRoot.length; value++)
            if (reference = arrayRoot[value], reference.startsWith(obj)) {
              for (var entries = response.getAll(reference), newKey = reference.slice(obj.length), j = 0; j < entries.length; j++)
                key.append(newKey, entries[j]);
              response.delete(reference);
            }
          return key;
        case "i":
          return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, extractIterator);
        case "I":
          return Infinity;
        case "-":
          return "$-0" === value ? -0 : -Infinity;
        case "N":
          return NaN;
        case "u":
          return;
        case "D":
          return new Date(Date.parse(value.slice(2)));
        case "n":
          obj = value.slice(2);
          if (300 < obj.length)
            throw Error(
              "BigInt is too large. Received " + obj.length + " digits but the limit is 300."
            );
          null !== arrayRoot && bumpArrayCount(arrayRoot, obj.length, response);
          return BigInt(obj);
        case "A":
          return parseTypedArray(
            response,
            value,
            ArrayBuffer,
            1,
            obj,
            key,
            arrayRoot
          );
        case "O":
          return parseTypedArray(
            response,
            value,
            Int8Array,
            1,
            obj,
            key,
            arrayRoot
          );
        case "o":
          return parseTypedArray(
            response,
            value,
            Uint8Array,
            1,
            obj,
            key,
            arrayRoot
          );
        case "U":
          return parseTypedArray(
            response,
            value,
            Uint8ClampedArray,
            1,
            obj,
            key,
            arrayRoot
          );
        case "S":
          return parseTypedArray(
            response,
            value,
            Int16Array,
            2,
            obj,
            key,
            arrayRoot
          );
        case "s":
          return parseTypedArray(
            response,
            value,
            Uint16Array,
            2,
            obj,
            key,
            arrayRoot
          );
        case "L":
          return parseTypedArray(
            response,
            value,
            Int32Array,
            4,
            obj,
            key,
            arrayRoot
          );
        case "l":
          return parseTypedArray(
            response,
            value,
            Uint32Array,
            4,
            obj,
            key,
            arrayRoot
          );
        case "G":
          return parseTypedArray(
            response,
            value,
            Float32Array,
            4,
            obj,
            key,
            arrayRoot
          );
        case "g":
          return parseTypedArray(
            response,
            value,
            Float64Array,
            8,
            obj,
            key,
            arrayRoot
          );
        case "M":
          return parseTypedArray(
            response,
            value,
            BigInt64Array,
            8,
            obj,
            key,
            arrayRoot
          );
        case "m":
          return parseTypedArray(
            response,
            value,
            BigUint64Array,
            8,
            obj,
            key,
            arrayRoot
          );
        case "V":
          return parseTypedArray(
            response,
            value,
            DataView,
            1,
            obj,
            key,
            arrayRoot
          );
        case "B":
          return obj = parseInt(value.slice(2), 16), response._formData.get(response._prefix + obj);
        case "R":
          return parseReadableStream(response, value, void 0);
        case "r":
          return parseReadableStream(response, value, "bytes");
        case "X":
          return parseAsyncIterable(response, value, false);
        case "x":
          return parseAsyncIterable(response, value, true);
      }
      value = value.slice(1);
      return getOutlinedModel(response, value, obj, key, arrayRoot, createModel);
    }
    null !== arrayRoot && bumpArrayCount(arrayRoot, value.length, response);
    return value;
  }
  function createResponse(bundlerConfig, formFieldPrefix, temporaryReferences) {
    var backingFormData = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : new FormData(), arraySizeLimit = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1e6, chunks = /* @__PURE__ */ new Map();
    return {
      _bundlerConfig: bundlerConfig,
      _prefix: formFieldPrefix,
      _formData: backingFormData,
      _chunks: chunks,
      _closed: false,
      _closedReason: null,
      _temporaryReferences: temporaryReferences,
      _rootArrayContexts: /* @__PURE__ */ new WeakMap(),
      _arraySizeLimit: arraySizeLimit
    };
  }
  function close(response) {
    reportGlobalError(response, Error("Connection closed."));
  }
  function loadServerReference(bundlerConfig, metaData) {
    var id = metaData.id;
    if ("string" !== typeof id) return null;
    var serverReference = resolveServerReference(bundlerConfig, id);
    bundlerConfig = preloadModule(serverReference);
    metaData = metaData.bound;
    return metaData instanceof Promise ? Promise.all([metaData, bundlerConfig]).then(function(_ref) {
      _ref = _ref[0];
      var fn = requireModule2(serverReference);
      if (1e3 < _ref.length)
        throw Error(
          "Server Function has too many bound arguments. Received " + _ref.length + " but the limit is 1000."
        );
      return fn.bind.apply(fn, [null].concat(_ref));
    }) : bundlerConfig ? Promise.resolve(bundlerConfig).then(function() {
      return requireModule2(serverReference);
    }) : Promise.resolve(requireModule2(serverReference));
  }
  function decodeBoundActionMetaData(body, serverManifest, formFieldPrefix, arraySizeLimit) {
    body = createResponse(
      serverManifest,
      formFieldPrefix,
      void 0,
      body,
      arraySizeLimit
    );
    close(body);
    body = getChunk(body, 0);
    body.then(function() {
    });
    if ("fulfilled" !== body.status) throw body.reason;
    return body.value;
  }
  reactServerDomWebpackServer_edge_production.createClientModuleProxy = function(moduleId) {
    moduleId = registerClientReferenceImpl({}, moduleId, false);
    return new Proxy(moduleId, proxyHandlers$1);
  };
  reactServerDomWebpackServer_edge_production.createTemporaryReferenceSet = function() {
    return /* @__PURE__ */ new WeakMap();
  };
  reactServerDomWebpackServer_edge_production.decodeAction = function(body, serverManifest) {
    var formData = new FormData(), action = null, seenActions = /* @__PURE__ */ new Set();
    body.forEach(function(value, key) {
      key.startsWith("$ACTION_") ? key.startsWith("$ACTION_REF_") ? seenActions.has(key) || (seenActions.add(key), value = "$ACTION_" + key.slice(12) + ":", value = decodeBoundActionMetaData(body, serverManifest, value), action = loadServerReference(serverManifest, value)) : key.startsWith("$ACTION_ID_") && !seenActions.has(key) && (seenActions.add(key), value = key.slice(11), action = loadServerReference(serverManifest, {
        id: value,
        bound: null
      })) : formData.append(key, value);
    });
    return null === action ? null : action.then(function(fn) {
      return fn.bind(null, formData);
    });
  };
  reactServerDomWebpackServer_edge_production.decodeFormState = function(actionResult, body, serverManifest) {
    var keyPath = body.get("$ACTION_KEY");
    if ("string" !== typeof keyPath) return Promise.resolve(null);
    var metaData = null;
    body.forEach(function(value, key) {
      key.startsWith("$ACTION_REF_") && (value = "$ACTION_" + key.slice(12) + ":", metaData = decodeBoundActionMetaData(body, serverManifest, value));
    });
    if (null === metaData) return Promise.resolve(null);
    var referenceId = metaData.id;
    return Promise.resolve(metaData.bound).then(function(bound) {
      return null === bound ? null : [actionResult, keyPath, referenceId, bound.length - 1];
    });
  };
  reactServerDomWebpackServer_edge_production.decodeReply = function(body, webpackMap, options) {
    if ("string" === typeof body) {
      var form = new FormData();
      form.append("0", body);
      body = form;
    }
    body = createResponse(
      webpackMap,
      "",
      options ? options.temporaryReferences : void 0,
      body,
      options ? options.arraySizeLimit : void 0
    );
    webpackMap = getChunk(body, 0);
    close(body);
    return webpackMap;
  };
  reactServerDomWebpackServer_edge_production.decodeReplyFromAsyncIterable = function(iterable, webpackMap, options) {
    function progress(entry) {
      if (entry.done) close(response);
      else {
        entry = entry.value;
        var name = entry[0];
        entry = entry[1];
        if ("string" === typeof entry) {
          response._formData.append(name, entry);
          var prefix = response._prefix;
          if (name.startsWith(prefix)) {
            var chunks = response._chunks;
            name = +name.slice(prefix.length);
            (chunks = chunks.get(name)) && resolveModelChunk(response, chunks, entry, name);
          }
        } else response._formData.append(name, entry);
        iterator.next().then(progress, error);
      }
    }
    function error(reason) {
      reportGlobalError(response, reason);
      "function" === typeof iterator.throw && iterator.throw(reason).then(error, error);
    }
    var iterator = iterable[ASYNC_ITERATOR](), response = createResponse(
      webpackMap,
      "",
      options ? options.temporaryReferences : void 0,
      void 0,
      options ? options.arraySizeLimit : void 0
    );
    iterator.next().then(progress, error);
    return getChunk(response, 0);
  };
  reactServerDomWebpackServer_edge_production.prerender = function(model, webpackMap, options) {
    return new Promise(function(resolve, reject) {
      var request = new RequestInstance(
        21,
        model,
        webpackMap,
        options ? options.onError : void 0,
        options ? options.onPostpone : void 0,
        function() {
          var stream = new ReadableStream(
            {
              type: "bytes",
              pull: function(controller) {
                startFlowing(request, controller);
              },
              cancel: function(reason) {
                request.destination = null;
                abort(request, reason);
              }
            },
            { highWaterMark: 0 }
          );
          resolve({ prelude: stream });
        },
        reject,
        options ? options.identifierPrefix : void 0,
        options ? options.temporaryReferences : void 0
      );
      if (options && options.signal) {
        var signal = options.signal;
        if (signal.aborted) abort(request, signal.reason);
        else {
          var listener = function() {
            abort(request, signal.reason);
            signal.removeEventListener("abort", listener);
          };
          signal.addEventListener("abort", listener);
        }
      }
      startWork(request);
    });
  };
  reactServerDomWebpackServer_edge_production.registerClientReference = function(proxyImplementation, id, exportName) {
    return registerClientReferenceImpl(
      proxyImplementation,
      id + "#" + exportName,
      false
    );
  };
  reactServerDomWebpackServer_edge_production.registerServerReference = function(reference, id, exportName) {
    return Object.defineProperties(reference, {
      $$typeof: { value: SERVER_REFERENCE_TAG },
      $$id: {
        value: null === exportName ? id : id + "#" + exportName,
        configurable: true
      },
      $$bound: { value: null, configurable: true },
      bind: { value: bind, configurable: true },
      toString: serverReferenceToString
    });
  };
  reactServerDomWebpackServer_edge_production.renderToReadableStream = function(model, webpackMap, options) {
    var request = new RequestInstance(
      20,
      model,
      webpackMap,
      options ? options.onError : void 0,
      options ? options.onPostpone : void 0,
      noop,
      noop,
      options ? options.identifierPrefix : void 0,
      options ? options.temporaryReferences : void 0
    );
    if (options && options.signal) {
      var signal = options.signal;
      if (signal.aborted) abort(request, signal.reason);
      else {
        var listener = function() {
          abort(request, signal.reason);
          signal.removeEventListener("abort", listener);
        };
        signal.addEventListener("abort", listener);
      }
    }
    return new ReadableStream(
      {
        type: "bytes",
        start: function() {
          startWork(request);
        },
        pull: function(controller) {
          startFlowing(request, controller);
        },
        cancel: function(reason) {
          request.destination = null;
          abort(request, reason);
        }
      },
      { highWaterMark: 0 }
    );
  };
  return reactServerDomWebpackServer_edge_production;
}
var reactServerDomWebpackServer_edge_development = {};
var hasRequiredReactServerDomWebpackServer_edge_development;
function requireReactServerDomWebpackServer_edge_development() {
  if (hasRequiredReactServerDomWebpackServer_edge_development) return reactServerDomWebpackServer_edge_development;
  hasRequiredReactServerDomWebpackServer_edge_development = 1;
  const __viteRscAsyncHooks = require$$0;
  globalThis.AsyncLocalStorage = __viteRscAsyncHooks.AsyncLocalStorage;
  "production" !== process.env.NODE_ENV && (function() {
    function voidHandler() {
    }
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable)
        return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function _defineProperty(obj, key, value) {
      a: if ("object" == typeof key && key) {
        var e = key[Symbol.toPrimitive];
        if (void 0 !== e) {
          key = e.call(key, "string");
          if ("object" != typeof key) break a;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        key = String(key);
      }
      key = "symbol" == typeof key ? key : key + "";
      key in obj ? Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }) : obj[key] = value;
      return obj;
    }
    function handleErrorInNextTick(error) {
      setTimeout(function() {
        throw error;
      });
    }
    function writeChunkAndReturn(destination, chunk) {
      if (0 !== chunk.byteLength)
        if (2048 < chunk.byteLength)
          0 < writtenBytes && (destination.enqueue(
            new Uint8Array(currentView.buffer, 0, writtenBytes)
          ), currentView = new Uint8Array(2048), writtenBytes = 0), destination.enqueue(chunk);
        else {
          var allowableBytes = currentView.length - writtenBytes;
          allowableBytes < chunk.byteLength && (0 === allowableBytes ? destination.enqueue(currentView) : (currentView.set(
            chunk.subarray(0, allowableBytes),
            writtenBytes
          ), destination.enqueue(currentView), chunk = chunk.subarray(allowableBytes)), currentView = new Uint8Array(2048), writtenBytes = 0);
          currentView.set(chunk, writtenBytes);
          writtenBytes += chunk.byteLength;
        }
      return true;
    }
    function completeWriting(destination) {
      currentView && 0 < writtenBytes && (destination.enqueue(
        new Uint8Array(currentView.buffer, 0, writtenBytes)
      ), currentView = null, writtenBytes = 0);
    }
    function stringToChunk(content) {
      return textEncoder.encode(content);
    }
    function byteLengthOfChunk(chunk) {
      return chunk.byteLength;
    }
    function closeWithError(destination, error) {
      "function" === typeof destination.error ? destination.error(error) : destination.close();
    }
    function isClientReference(reference) {
      return reference.$$typeof === CLIENT_REFERENCE_TAG$1;
    }
    function registerClientReferenceImpl(proxyImplementation, id, async) {
      return Object.defineProperties(proxyImplementation, {
        $$typeof: { value: CLIENT_REFERENCE_TAG$1 },
        $$id: { value: id },
        $$async: { value: async }
      });
    }
    function bind() {
      var newFn = FunctionBind.apply(this, arguments);
      if (this.$$typeof === SERVER_REFERENCE_TAG) {
        null != arguments[0] && console.error(
          'Cannot bind "this" of a Server Action. Pass null or undefined as the first argument to .bind().'
        );
        var args = ArraySlice.call(arguments, 1), $$typeof = { value: SERVER_REFERENCE_TAG }, $$id = { value: this.$$id };
        args = { value: this.$$bound ? this.$$bound.concat(args) : args };
        return Object.defineProperties(newFn, {
          $$typeof,
          $$id,
          $$bound: args,
          $$location: { value: this.$$location, configurable: true },
          bind: { value: bind, configurable: true }
        });
      }
      return newFn;
    }
    function getReference(target, name) {
      switch (name) {
        case "$$typeof":
          return target.$$typeof;
        case "$$id":
          return target.$$id;
        case "$$async":
          return target.$$async;
        case "name":
          return target.name;
        case "defaultProps":
          return;
        case "_debugInfo":
          return;
        case "toJSON":
          return;
        case Symbol.toPrimitive:
          return Object.prototype[Symbol.toPrimitive];
        case Symbol.toStringTag:
          return Object.prototype[Symbol.toStringTag];
        case "__esModule":
          var moduleId = target.$$id;
          target.default = registerClientReferenceImpl(
            function() {
              throw Error(
                "Attempted to call the default export of " + moduleId + " from the server but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
              );
            },
            target.$$id + "#",
            target.$$async
          );
          return true;
        case "then":
          if (target.then) return target.then;
          if (target.$$async) return;
          var clientReference = registerClientReferenceImpl(
            {},
            target.$$id,
            true
          ), proxy = new Proxy(clientReference, proxyHandlers$1);
          target.status = "fulfilled";
          target.value = proxy;
          return target.then = registerClientReferenceImpl(
            function(resolve) {
              return Promise.resolve(resolve(proxy));
            },
            target.$$id + "#then",
            false
          );
      }
      if ("symbol" === typeof name)
        throw Error(
          "Cannot read Symbol exports. Only named exports are supported on a client module imported on the server."
        );
      clientReference = target[name];
      clientReference || (clientReference = registerClientReferenceImpl(
        function() {
          throw Error(
            "Attempted to call " + String(name) + "() from the server but " + String(name) + " is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
          );
        },
        target.$$id + "#" + name,
        target.$$async
      ), Object.defineProperty(clientReference, "name", { value: name }), clientReference = target[name] = new Proxy(clientReference, deepProxyHandlers));
      return clientReference;
    }
    function resolveClientReferenceMetadata(config, clientReference) {
      var modulePath = clientReference.$$id, name = "", resolvedModuleData = config[modulePath];
      if (resolvedModuleData) name = resolvedModuleData.name;
      else {
        var idx = modulePath.lastIndexOf("#");
        -1 !== idx && (name = modulePath.slice(idx + 1), resolvedModuleData = config[modulePath.slice(0, idx)]);
        if (!resolvedModuleData)
          throw Error(
            'Could not find the module "' + modulePath + '" in the React Client Manifest. This is probably a bug in the React Server Components bundler.'
          );
      }
      if (true === resolvedModuleData.async && true === clientReference.$$async)
        throw Error(
          'The module "' + modulePath + '" is marked as an async ESM module but was loaded as a CJS proxy. This is probably a bug in the React Server Components bundler.'
        );
      return true === resolvedModuleData.async || true === clientReference.$$async ? [resolvedModuleData.id, resolvedModuleData.chunks, name, 1] : [resolvedModuleData.id, resolvedModuleData.chunks, name];
    }
    function preload(href, as, options) {
      if ("string" === typeof href) {
        var request = resolveRequest();
        if (request) {
          var hints = request.hints, key = "L";
          if ("image" === as && options) {
            var imageSrcSet = options.imageSrcSet, imageSizes = options.imageSizes, uniquePart = "";
            "string" === typeof imageSrcSet && "" !== imageSrcSet ? (uniquePart += "[" + imageSrcSet + "]", "string" === typeof imageSizes && (uniquePart += "[" + imageSizes + "]")) : uniquePart += "[][]" + href;
            key += "[image]" + uniquePart;
          } else key += "[" + as + "]" + href;
          hints.has(key) || (hints.add(key), (options = trimOptions(options)) ? emitHint(request, "L", [href, as, options]) : emitHint(request, "L", [href, as]));
        } else previousDispatcher.L(href, as, options);
      }
    }
    function preloadModule$1(href, options) {
      if ("string" === typeof href) {
        var request = resolveRequest();
        if (request) {
          var hints = request.hints, key = "m|" + href;
          if (hints.has(key)) return;
          hints.add(key);
          return (options = trimOptions(options)) ? emitHint(request, "m", [href, options]) : emitHint(request, "m", href);
        }
        previousDispatcher.m(href, options);
      }
    }
    function trimOptions(options) {
      if (null == options) return null;
      var hasProperties = false, trimmed = {}, key;
      for (key in options)
        null != options[key] && (hasProperties = true, trimmed[key] = options[key]);
      return hasProperties ? trimmed : null;
    }
    function getChildFormatContext(parentContext, type, props) {
      switch (type) {
        case "img":
          type = props.src;
          var srcSet = props.srcSet;
          if (!("lazy" === props.loading || !type && !srcSet || "string" !== typeof type && null != type || "string" !== typeof srcSet && null != srcSet || "low" === props.fetchPriority || parentContext & 3) && ("string" !== typeof type || ":" !== type[4] || "d" !== type[0] && "D" !== type[0] || "a" !== type[1] && "A" !== type[1] || "t" !== type[2] && "T" !== type[2] || "a" !== type[3] && "A" !== type[3]) && ("string" !== typeof srcSet || ":" !== srcSet[4] || "d" !== srcSet[0] && "D" !== srcSet[0] || "a" !== srcSet[1] && "A" !== srcSet[1] || "t" !== srcSet[2] && "T" !== srcSet[2] || "a" !== srcSet[3] && "A" !== srcSet[3])) {
            var sizes = "string" === typeof props.sizes ? props.sizes : void 0;
            var input = props.crossOrigin;
            preload(type || "", "image", {
              imageSrcSet: srcSet,
              imageSizes: sizes,
              crossOrigin: "string" === typeof input ? "use-credentials" === input ? input : "" : void 0,
              integrity: props.integrity,
              type: props.type,
              fetchPriority: props.fetchPriority,
              referrerPolicy: props.referrerPolicy
            });
          }
          return parentContext;
        case "link":
          type = props.rel;
          srcSet = props.href;
          if (!(parentContext & 1 || null != props.itemProp || "string" !== typeof type || "string" !== typeof srcSet || "" === srcSet))
            switch (type) {
              case "preload":
                preload(srcSet, props.as, {
                  crossOrigin: props.crossOrigin,
                  integrity: props.integrity,
                  nonce: props.nonce,
                  type: props.type,
                  fetchPriority: props.fetchPriority,
                  referrerPolicy: props.referrerPolicy,
                  imageSrcSet: props.imageSrcSet,
                  imageSizes: props.imageSizes,
                  media: props.media
                });
                break;
              case "modulepreload":
                preloadModule$1(srcSet, {
                  as: props.as,
                  crossOrigin: props.crossOrigin,
                  integrity: props.integrity,
                  nonce: props.nonce
                });
                break;
              case "stylesheet":
                preload(srcSet, "stylesheet", {
                  crossOrigin: props.crossOrigin,
                  integrity: props.integrity,
                  nonce: props.nonce,
                  type: props.type,
                  fetchPriority: props.fetchPriority,
                  referrerPolicy: props.referrerPolicy,
                  media: props.media
                });
            }
          return parentContext;
        case "picture":
          return parentContext | 2;
        case "noscript":
          return parentContext | 1;
        default:
          return parentContext;
      }
    }
    function collectStackTracePrivate(error, structuredStackTrace) {
      error = [];
      for (var i = framesToSkip; i < structuredStackTrace.length; i++) {
        var callSite = structuredStackTrace[i], name = callSite.getFunctionName() || "<anonymous>";
        if (name.includes("react_stack_bottom_frame")) break;
        else if (callSite.isNative())
          callSite = callSite.isAsync(), error.push([name, "", 0, 0, 0, 0, callSite]);
        else {
          if (callSite.isConstructor()) name = "new " + name;
          else if (!callSite.isToplevel()) {
            var callSite$jscomp$0 = callSite;
            name = callSite$jscomp$0.getTypeName();
            var methodName = callSite$jscomp$0.getMethodName();
            callSite$jscomp$0 = callSite$jscomp$0.getFunctionName();
            var result = "";
            callSite$jscomp$0 ? (name && identifierRegExp.test(callSite$jscomp$0) && callSite$jscomp$0 !== name && (result += name + "."), result += callSite$jscomp$0, !methodName || callSite$jscomp$0 === methodName || callSite$jscomp$0.endsWith("." + methodName) || callSite$jscomp$0.endsWith(" " + methodName) || (result += " [as " + methodName + "]")) : (name && (result += name + "."), result = methodName ? result + methodName : result + "<anonymous>");
            name = result;
          }
          "<anonymous>" === name && (name = "");
          methodName = callSite.getScriptNameOrSourceURL() || "<anonymous>";
          "<anonymous>" === methodName && (methodName = "", callSite.isEval() && (callSite$jscomp$0 = callSite.getEvalOrigin()) && (methodName = callSite$jscomp$0.toString() + ", <anonymous>"));
          callSite$jscomp$0 = callSite.getLineNumber() || 0;
          result = callSite.getColumnNumber() || 0;
          var enclosingLine = "function" === typeof callSite.getEnclosingLineNumber ? callSite.getEnclosingLineNumber() || 0 : 0, enclosingCol = "function" === typeof callSite.getEnclosingColumnNumber ? callSite.getEnclosingColumnNumber() || 0 : 0;
          callSite = callSite.isAsync();
          error.push([
            name,
            methodName,
            callSite$jscomp$0,
            result,
            enclosingLine,
            enclosingCol,
            callSite
          ]);
        }
      }
      collectedStackTrace = error;
      return "";
    }
    function collectStackTrace(error, structuredStackTrace) {
      collectStackTracePrivate(error, structuredStackTrace);
      error = (error.name || "Error") + ": " + (error.message || "");
      for (var i = 0; i < structuredStackTrace.length; i++)
        error += "\n    at " + structuredStackTrace[i].toString();
      return error;
    }
    function parseStackTrace(error, skipFrames) {
      var existing = stackTraceCache.get(error);
      if (void 0 !== existing) return existing;
      collectedStackTrace = null;
      framesToSkip = skipFrames;
      existing = Error.prepareStackTrace;
      Error.prepareStackTrace = collectStackTrace;
      try {
        var stack = String(error.stack);
      } finally {
        Error.prepareStackTrace = existing;
      }
      if (null !== collectedStackTrace)
        return stack = collectedStackTrace, collectedStackTrace = null, stackTraceCache.set(error, stack), stack;
      stack.startsWith("Error: react-stack-top-frame\n") && (stack = stack.slice(29));
      existing = stack.indexOf("react_stack_bottom_frame");
      -1 !== existing && (existing = stack.lastIndexOf("\n", existing));
      -1 !== existing && (stack = stack.slice(0, existing));
      stack = stack.split("\n");
      for (existing = []; skipFrames < stack.length; skipFrames++) {
        var parsed = frameRegExp.exec(stack[skipFrames]);
        if (parsed) {
          var name = parsed[1] || "", isAsync = "async " === parsed[8];
          "<anonymous>" === name ? name = "" : name.startsWith("async ") && (name = name.slice(5), isAsync = true);
          var filename = parsed[2] || parsed[5] || "";
          "<anonymous>" === filename && (filename = "");
          existing.push([
            name,
            filename,
            +(parsed[3] || parsed[6]),
            +(parsed[4] || parsed[7]),
            0,
            0,
            isAsync
          ]);
        }
      }
      stackTraceCache.set(error, existing);
      return existing;
    }
    function createTemporaryReference(temporaryReferences, id) {
      var reference = Object.defineProperties(
        function() {
          throw Error(
            "Attempted to call a temporary Client Reference from the server but it is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
          );
        },
        { $$typeof: { value: TEMPORARY_REFERENCE_TAG } }
      );
      reference = new Proxy(reference, proxyHandlers);
      temporaryReferences.set(reference, id);
      return reference;
    }
    function noop() {
    }
    function trackUsedThenable(thenableState2, thenable, index) {
      index = thenableState2[index];
      void 0 === index ? (thenableState2.push(thenable), (thenableState2._stacks || (thenableState2._stacks = [])).push(Error())) : index !== thenable && (thenable.then(noop, noop), thenable = index);
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          "string" === typeof thenable.status ? thenable.then(noop, noop) : (thenableState2 = thenable, thenableState2.status = "pending", thenableState2.then(
            function(fulfilledValue) {
              if ("pending" === thenable.status) {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            },
            function(error) {
              if ("pending" === thenable.status) {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error;
              }
            }
          ));
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
          suspendedThenable = thenable;
          throw SuspenseException;
      }
    }
    function getSuspendedThenable() {
      if (null === suspendedThenable)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var thenable = suspendedThenable;
      suspendedThenable = null;
      return thenable;
    }
    function getThenableStateAfterSuspending() {
      var state = thenableState || [];
      state._componentDebugInfo = currentComponentDebugInfo;
      thenableState = currentComponentDebugInfo = null;
      return state;
    }
    function unsupportedHook() {
      throw Error("This Hook is not supported in Server Components.");
    }
    function unsupportedRefresh() {
      throw Error(
        "Refreshing the cache is not supported in Server Components."
      );
    }
    function unsupportedContext() {
      throw Error("Cannot read a Client Context from a Server Component.");
    }
    function resolveOwner() {
      if (currentOwner) return currentOwner;
      if (supportsComponentStorage) {
        var owner = componentStorage.getStore();
        if (owner) return owner;
      }
      return null;
    }
    function prepareStackTrace(error, structuredStackTrace) {
      error = (error.name || "Error") + ": " + (error.message || "");
      for (var i = 0; i < structuredStackTrace.length; i++)
        error += "\n    at " + structuredStackTrace[i].toString();
      return error;
    }
    function resetOwnerStackLimit() {
      var now = getCurrentTime();
      1e3 < now - lastResetTime && (ReactSharedInternalsServer.recentlyCreatedOwnerStacks = 0, lastResetTime = now);
    }
    function isObjectPrototype(object) {
      if (!object) return false;
      var ObjectPrototype2 = Object.prototype;
      if (object === ObjectPrototype2) return true;
      if (getPrototypeOf(object)) return false;
      object = Object.getOwnPropertyNames(object);
      for (var i = 0; i < object.length; i++)
        if (!(object[i] in ObjectPrototype2)) return false;
      return true;
    }
    function isGetter(object, name) {
      if (object === Object.prototype || null === object) return false;
      var descriptor = Object.getOwnPropertyDescriptor(object, name);
      return void 0 === descriptor ? isGetter(getPrototypeOf(object), name) : "function" === typeof descriptor.get;
    }
    function isSimpleObject(object) {
      if (!isObjectPrototype(getPrototypeOf(object))) return false;
      for (var names = Object.getOwnPropertyNames(object), i = 0; i < names.length; i++) {
        var descriptor = Object.getOwnPropertyDescriptor(object, names[i]);
        if (!descriptor || !descriptor.enumerable && ("key" !== names[i] && "ref" !== names[i] || "function" !== typeof descriptor.get))
          return false;
      }
      return true;
    }
    function objectName(object) {
      object = Object.prototype.toString.call(object);
      return object.slice(8, object.length - 1);
    }
    function describeKeyForErrorMessage(key) {
      var encodedKey = JSON.stringify(key);
      return '"' + key + '"' === encodedKey ? key : encodedKey;
    }
    function describeValueForErrorMessage(value) {
      switch (typeof value) {
        case "string":
          return JSON.stringify(
            10 >= value.length ? value : value.slice(0, 10) + "..."
          );
        case "object":
          if (isArrayImpl(value)) return "[...]";
          if (null !== value && value.$$typeof === CLIENT_REFERENCE_TAG)
            return "client";
          value = objectName(value);
          return "Object" === value ? "{...}" : value;
        case "function":
          return value.$$typeof === CLIENT_REFERENCE_TAG ? "client" : (value = value.displayName || value.name) ? "function " + value : "function";
        default:
          return String(value);
      }
    }
    function describeElementType(type) {
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if ("object" === typeof type)
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeElementType(type.render);
          case REACT_MEMO_TYPE:
            return describeElementType(type.type);
          case REACT_LAZY_TYPE:
            var payload = type._payload;
            type = type._init;
            try {
              return describeElementType(type(payload));
            } catch (x) {
            }
        }
      return "";
    }
    function describeObjectForErrorMessage(objectOrArray, expandedName) {
      var objKind = objectName(objectOrArray);
      if ("Object" !== objKind && "Array" !== objKind) return objKind;
      var start = -1, length = 0;
      if (isArrayImpl(objectOrArray))
        if (jsxChildrenParents.has(objectOrArray)) {
          var type = jsxChildrenParents.get(objectOrArray);
          objKind = "<" + describeElementType(type) + ">";
          for (var i = 0; i < objectOrArray.length; i++) {
            var value = objectOrArray[i];
            value = "string" === typeof value ? value : "object" === typeof value && null !== value ? "{" + describeObjectForErrorMessage(value) + "}" : "{" + describeValueForErrorMessage(value) + "}";
            "" + i === expandedName ? (start = objKind.length, length = value.length, objKind += value) : objKind = 15 > value.length && 40 > objKind.length + value.length ? objKind + value : objKind + "{...}";
          }
          objKind += "</" + describeElementType(type) + ">";
        } else {
          objKind = "[";
          for (type = 0; type < objectOrArray.length; type++)
            0 < type && (objKind += ", "), i = objectOrArray[type], i = "object" === typeof i && null !== i ? describeObjectForErrorMessage(i) : describeValueForErrorMessage(i), "" + type === expandedName ? (start = objKind.length, length = i.length, objKind += i) : objKind = 10 > i.length && 40 > objKind.length + i.length ? objKind + i : objKind + "...";
          objKind += "]";
        }
      else if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE)
        objKind = "<" + describeElementType(objectOrArray.type) + "/>";
      else {
        if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) return "client";
        if (jsxPropsParents.has(objectOrArray)) {
          objKind = jsxPropsParents.get(objectOrArray);
          objKind = "<" + (describeElementType(objKind) || "...");
          type = Object.keys(objectOrArray);
          for (i = 0; i < type.length; i++) {
            objKind += " ";
            value = type[i];
            objKind += describeKeyForErrorMessage(value) + "=";
            var _value2 = objectOrArray[value];
            var _substr2 = value === expandedName && "object" === typeof _value2 && null !== _value2 ? describeObjectForErrorMessage(_value2) : describeValueForErrorMessage(_value2);
            "string" !== typeof _value2 && (_substr2 = "{" + _substr2 + "}");
            value === expandedName ? (start = objKind.length, length = _substr2.length, objKind += _substr2) : objKind = 10 > _substr2.length && 40 > objKind.length + _substr2.length ? objKind + _substr2 : objKind + "...";
          }
          objKind += ">";
        } else {
          objKind = "{";
          type = Object.keys(objectOrArray);
          for (i = 0; i < type.length; i++)
            0 < i && (objKind += ", "), value = type[i], objKind += describeKeyForErrorMessage(value) + ": ", _value2 = objectOrArray[value], _value2 = "object" === typeof _value2 && null !== _value2 ? describeObjectForErrorMessage(_value2) : describeValueForErrorMessage(_value2), value === expandedName ? (start = objKind.length, length = _value2.length, objKind += _value2) : objKind = 10 > _value2.length && 40 > objKind.length + _value2.length ? objKind + _value2 : objKind + "...";
          objKind += "}";
        }
      }
      return void 0 === expandedName ? objKind : -1 < start && 0 < length ? (objectOrArray = " ".repeat(start) + "^".repeat(length), "\n  " + objKind + "\n  " + objectOrArray) : "\n  " + objKind;
    }
    function defaultFilterStackFrame(filename) {
      return "" !== filename && !filename.startsWith("node:") && !filename.includes("node_modules");
    }
    function filterStackTrace(request, stack) {
      request = request.filterStackFrame;
      for (var filteredStack = [], i = 0; i < stack.length; i++) {
        var callsite = stack[i], functionName = callsite[0];
        var url = callsite[1];
        if (url.startsWith("about://React/")) {
          var envIdx = url.indexOf("/", 14), suffixIdx = url.lastIndexOf("?");
          -1 < envIdx && -1 < suffixIdx && (url = decodeURI(url.slice(envIdx + 1, suffixIdx)));
        }
        request(url, functionName, callsite[2], callsite[3]) && (callsite = callsite.slice(0), callsite[1] = url, filteredStack.push(callsite));
      }
      return filteredStack;
    }
    function patchConsole(consoleInst, methodName) {
      var descriptor = Object.getOwnPropertyDescriptor(consoleInst, methodName);
      if (descriptor && (descriptor.configurable || descriptor.writable) && "function" === typeof descriptor.value) {
        var originalMethod = descriptor.value;
        descriptor = Object.getOwnPropertyDescriptor(originalMethod, "name");
        var wrapperMethod = function() {
          var request = resolveRequest();
          if (("assert" !== methodName || !arguments[0]) && null !== request) {
            a: {
              var error = Error("react-stack-top-frame");
              collectedStackTrace = null;
              framesToSkip = 1;
              var previousPrepare = Error.prepareStackTrace;
              Error.prepareStackTrace = collectStackTracePrivate;
              try {
                if ("" !== error.stack) {
                  var JSCompiler_inline_result = null;
                  break a;
                }
              } finally {
                Error.prepareStackTrace = previousPrepare;
              }
              JSCompiler_inline_result = collectedStackTrace;
            }
            JSCompiler_inline_result = filterStackTrace(
              request,
              JSCompiler_inline_result || []
            );
            request.pendingDebugChunks++;
            error = resolveOwner();
            previousPrepare = Array.from(arguments);
            a: {
              var env = 0;
              switch (methodName) {
                case "dir":
                case "dirxml":
                case "groupEnd":
                case "table":
                  env = null;
                  break a;
                case "assert":
                  env = 1;
              }
              var format = previousPrepare[env], style = previousPrepare[env + 1], badge = previousPrepare[env + 2];
              "string" === typeof format && format.startsWith("\x1B[0m\x1B[7m%c%s\x1B[0m%c") && "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px" === style && "string" === typeof badge ? (format = format.slice(18), " " === format[0] && (format = format.slice(1)), previousPrepare.splice(env, 4, format), env = badge.slice(1, badge.length - 1)) : env = null;
            }
            null === env && (env = (0, request.environmentName)());
            null != error && outlineComponentInfo(request, error);
            badge = [methodName, JSCompiler_inline_result, error, env];
            badge.push.apply(badge, previousPrepare);
            previousPrepare = serializeDebugModel(
              request,
              (null === request.deferredDebugObjects ? 500 : 10) + JSCompiler_inline_result.length,
              badge
            );
            "[" !== previousPrepare[0] && (previousPrepare = serializeDebugModel(
              request,
              10 + JSCompiler_inline_result.length,
              [
                methodName,
                JSCompiler_inline_result,
                error,
                env,
                "Unknown Value: React could not send it from the server."
              ]
            ));
            JSCompiler_inline_result = stringToChunk(
              ":W" + previousPrepare + "\n"
            );
            request.completedDebugChunks.push(JSCompiler_inline_result);
          }
          return originalMethod.apply(this, arguments);
        };
        descriptor && Object.defineProperty(wrapperMethod, "name", descriptor);
        Object.defineProperty(consoleInst, methodName, {
          value: wrapperMethod
        });
      }
    }
    function getCurrentStackInDEV() {
      var owner = resolveOwner();
      if (null === owner) return "";
      try {
        var info = "";
        if (owner.owner || "string" !== typeof owner.name) {
          for (; owner; ) {
            var ownerStack = owner.debugStack;
            if (null != ownerStack) {
              if (owner = owner.owner) {
                var JSCompiler_temp_const = info;
                var error = ownerStack, prevPrepareStackTrace = Error.prepareStackTrace;
                Error.prepareStackTrace = prepareStackTrace;
                var stack = error.stack;
                Error.prepareStackTrace = prevPrepareStackTrace;
                stack.startsWith("Error: react-stack-top-frame\n") && (stack = stack.slice(29));
                var idx = stack.indexOf("\n");
                -1 !== idx && (stack = stack.slice(idx + 1));
                idx = stack.indexOf("react_stack_bottom_frame");
                -1 !== idx && (idx = stack.lastIndexOf("\n", idx));
                var JSCompiler_inline_result = -1 !== idx ? stack = stack.slice(0, idx) : "";
                info = JSCompiler_temp_const + ("\n" + JSCompiler_inline_result);
              }
            } else break;
          }
          var JSCompiler_inline_result$jscomp$0 = info;
        } else {
          JSCompiler_temp_const = owner.name;
          if (void 0 === prefix)
            try {
              throw Error();
            } catch (x) {
              prefix = (error = x.stack.trim().match(/\n( *(at )?)/)) && error[1] || "", suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
            }
          JSCompiler_inline_result$jscomp$0 = "\n" + prefix + JSCompiler_temp_const + suffix;
        }
      } catch (x) {
        JSCompiler_inline_result$jscomp$0 = "\nError generating stack: " + x.message + "\n" + x.stack;
      }
      return JSCompiler_inline_result$jscomp$0;
    }
    function defaultErrorHandler(error) {
      console.error(error);
    }
    function RequestInstance(type, model, bundlerConfig, onError, onPostpone, onAllReady, onFatalError, identifierPrefix, temporaryReferences, environmentName, filterStackFrame, keepDebugAlive) {
      if (null !== ReactSharedInternalsServer.A && ReactSharedInternalsServer.A !== DefaultAsyncDispatcher)
        throw Error(
          "Currently React only supports one RSC renderer at a time."
        );
      ReactSharedInternalsServer.A = DefaultAsyncDispatcher;
      ReactSharedInternalsServer.getCurrentStack = getCurrentStackInDEV;
      var abortSet = /* @__PURE__ */ new Set(), pingedTasks = [], hints = /* @__PURE__ */ new Set();
      this.type = type;
      this.status = 10;
      this.flushScheduled = false;
      this.destination = this.fatalError = null;
      this.bundlerConfig = bundlerConfig;
      this.cache = /* @__PURE__ */ new Map();
      this.cacheController = new AbortController();
      this.pendingChunks = this.nextChunkId = 0;
      this.hints = hints;
      this.abortableTasks = abortSet;
      this.pingedTasks = pingedTasks;
      this.completedImportChunks = [];
      this.completedHintChunks = [];
      this.completedRegularChunks = [];
      this.completedErrorChunks = [];
      this.writtenSymbols = /* @__PURE__ */ new Map();
      this.writtenClientReferences = /* @__PURE__ */ new Map();
      this.writtenServerReferences = /* @__PURE__ */ new Map();
      this.writtenObjects = /* @__PURE__ */ new WeakMap();
      this.temporaryReferences = temporaryReferences;
      this.identifierPrefix = identifierPrefix || "";
      this.identifierCount = 1;
      this.taintCleanupQueue = [];
      this.onError = void 0 === onError ? defaultErrorHandler : onError;
      this.onPostpone = void 0 === onPostpone ? defaultPostponeHandler : onPostpone;
      this.onAllReady = onAllReady;
      this.onFatalError = onFatalError;
      this.pendingDebugChunks = 0;
      this.completedDebugChunks = [];
      this.debugDestination = null;
      this.environmentName = void 0 === environmentName ? function() {
        return "Server";
      } : "function" !== typeof environmentName ? function() {
        return environmentName;
      } : environmentName;
      this.filterStackFrame = void 0 === filterStackFrame ? defaultFilterStackFrame : filterStackFrame;
      this.didWarnForKey = null;
      this.writtenDebugObjects = /* @__PURE__ */ new WeakMap();
      this.deferredDebugObjects = keepDebugAlive ? { retained: /* @__PURE__ */ new Map(), existing: /* @__PURE__ */ new Map() } : null;
      type = this.timeOrigin = performance.now();
      emitTimeOriginChunk(this, type + performance.timeOrigin);
      this.abortTime = -0;
      model = createTask(
        this,
        model,
        null,
        false,
        0,
        abortSet,
        type,
        null,
        null,
        null
      );
      pingedTasks.push(model);
    }
    function createRequest(model, bundlerConfig, onError, identifierPrefix, onPostpone, temporaryReferences, environmentName, filterStackFrame, keepDebugAlive) {
      resetOwnerStackLimit();
      return new RequestInstance(
        20,
        model,
        bundlerConfig,
        onError,
        onPostpone,
        noop,
        noop,
        identifierPrefix,
        temporaryReferences,
        environmentName,
        filterStackFrame,
        keepDebugAlive
      );
    }
    function createPrerenderRequest(model, bundlerConfig, onAllReady, onFatalError, onError, identifierPrefix, onPostpone, temporaryReferences, environmentName, filterStackFrame, keepDebugAlive) {
      resetOwnerStackLimit();
      return new RequestInstance(
        21,
        model,
        bundlerConfig,
        onError,
        onPostpone,
        onAllReady,
        onFatalError,
        identifierPrefix,
        temporaryReferences,
        environmentName,
        filterStackFrame,
        keepDebugAlive
      );
    }
    function resolveRequest() {
      if (currentRequest) return currentRequest;
      if (supportsRequestStorage) {
        var store = requestStorage.getStore();
        if (store) return store;
      }
      return null;
    }
    function serializeDebugThenable(request, counter, thenable) {
      request.pendingDebugChunks++;
      var id = request.nextChunkId++, ref = "$@" + id.toString(16);
      request.writtenDebugObjects.set(thenable, ref);
      switch (thenable.status) {
        case "fulfilled":
          return emitOutlinedDebugModelChunk(request, id, counter, thenable.value), ref;
        case "rejected":
          return emitErrorChunk(request, id, "", thenable.reason, true, null), ref;
      }
      if (request.status === ABORTING)
        return emitDebugHaltChunk(request, id), ref;
      var deferredDebugObjects = request.deferredDebugObjects;
      if (null !== deferredDebugObjects)
        return deferredDebugObjects.retained.set(id, thenable), ref = "$Y@" + id.toString(16), request.writtenDebugObjects.set(thenable, ref), ref;
      var cancelled = false;
      thenable.then(
        function(value) {
          cancelled || (cancelled = true, request.status === ABORTING ? emitDebugHaltChunk(request, id) : emitOutlinedDebugModelChunk(request, id, counter, value), enqueueFlush(request));
        },
        function(reason) {
          cancelled || (cancelled = true, request.status === ABORTING ? emitDebugHaltChunk(request, id) : emitErrorChunk(request, id, "", reason, true, null), enqueueFlush(request));
        }
      );
      Promise.resolve().then(function() {
        cancelled || (cancelled = true, emitDebugHaltChunk(request, id), enqueueFlush(request), counter = request = null);
      });
      return ref;
    }
    function emitRequestedDebugThenable(request, id, counter, thenable) {
      thenable.then(
        function(value) {
          request.status === ABORTING ? emitDebugHaltChunk(request, id) : emitOutlinedDebugModelChunk(request, id, counter, value);
          enqueueFlush(request);
        },
        function(reason) {
          request.status === ABORTING ? emitDebugHaltChunk(request, id) : emitErrorChunk(request, id, "", reason, true, null);
          enqueueFlush(request);
        }
      );
    }
    function serializeThenable(request, task, thenable) {
      var newTask = createTask(
        request,
        thenable,
        task.keyPath,
        task.implicitSlot,
        task.formatContext,
        request.abortableTasks,
        task.time,
        task.debugOwner,
        task.debugStack,
        task.debugTask
      );
      switch (thenable.status) {
        case "fulfilled":
          return forwardDebugInfoFromThenable(
            request,
            newTask,
            thenable
          ), newTask.model = thenable.value, pingTask(request, newTask), newTask.id;
        case "rejected":
          return forwardDebugInfoFromThenable(
            request,
            newTask,
            thenable
          ), erroredTask(request, newTask, thenable.reason), newTask.id;
        default:
          if (request.status === ABORTING)
            return request.abortableTasks.delete(newTask), 21 === request.type ? (haltTask(newTask), finishHaltedTask(newTask, request)) : (task = request.fatalError, abortTask(newTask), finishAbortedTask(newTask, request, task)), newTask.id;
          "string" !== typeof thenable.status && (thenable.status = "pending", thenable.then(
            function(fulfilledValue) {
              "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            },
            function(error) {
              "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          ));
      }
      thenable.then(
        function(value) {
          forwardDebugInfoFromCurrentContext(request, newTask, thenable);
          newTask.model = value;
          pingTask(request, newTask);
        },
        function(reason) {
          0 === newTask.status && (newTask.timed = true, erroredTask(request, newTask, reason), enqueueFlush(request));
        }
      );
      return newTask.id;
    }
    function serializeReadableStream(request, task, stream) {
      function progress(entry) {
        if (0 === streamTask.status)
          if (entry.done)
            streamTask.status = 1, entry = streamTask.id.toString(16) + ":C\n", request.completedRegularChunks.push(stringToChunk(entry)), request.abortableTasks.delete(streamTask), request.cacheController.signal.removeEventListener(
              "abort",
              abortStream
            ), enqueueFlush(request), callOnAllReadyIfReady(request);
          else
            try {
              streamTask.model = entry.value, request.pendingChunks++, tryStreamTask(request, streamTask), enqueueFlush(request), reader.read().then(progress, error);
            } catch (x$0) {
              error(x$0);
            }
      }
      function error(reason) {
        0 === streamTask.status && (request.cacheController.signal.removeEventListener(
          "abort",
          abortStream
        ), erroredTask(request, streamTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
      }
      function abortStream() {
        if (0 === streamTask.status) {
          var signal = request.cacheController.signal;
          signal.removeEventListener("abort", abortStream);
          signal = signal.reason;
          21 === request.type ? (request.abortableTasks.delete(streamTask), haltTask(streamTask), finishHaltedTask(streamTask, request)) : (erroredTask(request, streamTask, signal), enqueueFlush(request));
          reader.cancel(signal).then(error, error);
        }
      }
      var supportsBYOB = stream.supportsBYOB;
      if (void 0 === supportsBYOB)
        try {
          stream.getReader({ mode: "byob" }).releaseLock(), supportsBYOB = true;
        } catch (x) {
          supportsBYOB = false;
        }
      var reader = stream.getReader(), streamTask = createTask(
        request,
        task.model,
        task.keyPath,
        task.implicitSlot,
        task.formatContext,
        request.abortableTasks,
        task.time,
        task.debugOwner,
        task.debugStack,
        task.debugTask
      );
      request.pendingChunks++;
      task = streamTask.id.toString(16) + ":" + (supportsBYOB ? "r" : "R") + "\n";
      request.completedRegularChunks.push(stringToChunk(task));
      request.cacheController.signal.addEventListener("abort", abortStream);
      reader.read().then(progress, error);
      return serializeByValueID(streamTask.id);
    }
    function serializeAsyncIterable(request, task, iterable, iterator) {
      function progress(entry) {
        if (0 === streamTask.status)
          if (entry.done) {
            streamTask.status = 1;
            if (void 0 === entry.value)
              var endStreamRow = streamTask.id.toString(16) + ":C\n";
            else
              try {
                var chunkId = outlineModel(request, entry.value);
                endStreamRow = streamTask.id.toString(16) + ":C" + stringify(serializeByValueID(chunkId)) + "\n";
              } catch (x) {
                error(x);
                return;
              }
            request.completedRegularChunks.push(stringToChunk(endStreamRow));
            request.abortableTasks.delete(streamTask);
            request.cacheController.signal.removeEventListener(
              "abort",
              abortIterable
            );
            enqueueFlush(request);
            callOnAllReadyIfReady(request);
          } else
            try {
              streamTask.model = entry.value, request.pendingChunks++, tryStreamTask(request, streamTask), enqueueFlush(request), callIteratorInDEV(iterator, progress, error);
            } catch (x$1) {
              error(x$1);
            }
      }
      function error(reason) {
        0 === streamTask.status && (request.cacheController.signal.removeEventListener(
          "abort",
          abortIterable
        ), erroredTask(request, streamTask, reason), enqueueFlush(request), "function" === typeof iterator.throw && iterator.throw(reason).then(error, error));
      }
      function abortIterable() {
        if (0 === streamTask.status) {
          var signal = request.cacheController.signal;
          signal.removeEventListener("abort", abortIterable);
          var reason = signal.reason;
          21 === request.type ? (request.abortableTasks.delete(streamTask), haltTask(streamTask), finishHaltedTask(streamTask, request)) : (erroredTask(request, streamTask, signal.reason), enqueueFlush(request));
          "function" === typeof iterator.throw && iterator.throw(reason).then(error, error);
        }
      }
      var isIterator = iterable === iterator, streamTask = createTask(
        request,
        task.model,
        task.keyPath,
        task.implicitSlot,
        task.formatContext,
        request.abortableTasks,
        task.time,
        task.debugOwner,
        task.debugStack,
        task.debugTask
      );
      (task = iterable._debugInfo) && forwardDebugInfo(request, streamTask, task);
      request.pendingChunks++;
      isIterator = streamTask.id.toString(16) + ":" + (isIterator ? "x" : "X") + "\n";
      request.completedRegularChunks.push(stringToChunk(isIterator));
      request.cacheController.signal.addEventListener("abort", abortIterable);
      callIteratorInDEV(iterator, progress, error);
      return serializeByValueID(streamTask.id);
    }
    function emitHint(request, code, model) {
      model = stringify(model);
      code = stringToChunk(":H" + code + model + "\n");
      request.completedHintChunks.push(code);
      enqueueFlush(request);
    }
    function readThenable(thenable) {
      if ("fulfilled" === thenable.status) return thenable.value;
      if ("rejected" === thenable.status) throw thenable.reason;
      throw thenable;
    }
    function createLazyWrapperAroundWakeable(request, task, wakeable) {
      switch (wakeable.status) {
        case "fulfilled":
          return forwardDebugInfoFromThenable(request, task, wakeable), wakeable.value;
        case "rejected":
          forwardDebugInfoFromThenable(request, task, wakeable);
          break;
        default:
          "string" !== typeof wakeable.status && (wakeable.status = "pending", wakeable.then(
            function(fulfilledValue) {
              forwardDebugInfoFromCurrentContext(request, task, wakeable);
              "pending" === wakeable.status && (wakeable.status = "fulfilled", wakeable.value = fulfilledValue);
            },
            function(error) {
              forwardDebugInfoFromCurrentContext(request, task, wakeable);
              "pending" === wakeable.status && (wakeable.status = "rejected", wakeable.reason = error);
            }
          ));
      }
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: wakeable,
        _init: readThenable
      };
    }
    function callWithDebugContextInDEV(request, task, callback, arg) {
      var componentDebugInfo = {
        name: "",
        env: task.environmentName,
        key: null,
        owner: task.debugOwner
      };
      componentDebugInfo.stack = null === task.debugStack ? null : filterStackTrace(request, parseStackTrace(task.debugStack, 1));
      componentDebugInfo.debugStack = task.debugStack;
      request = componentDebugInfo.debugTask = task.debugTask;
      currentOwner = componentDebugInfo;
      try {
        return request ? request.run(callback.bind(null, arg)) : callback(arg);
      } finally {
        currentOwner = null;
      }
    }
    function processServerComponentReturnValue(request, task, Component, result) {
      if ("object" !== typeof result || null === result || isClientReference(result))
        return result;
      if ("function" === typeof result.then)
        return result.then(function(resolvedValue) {
          "object" === typeof resolvedValue && null !== resolvedValue && resolvedValue.$$typeof === REACT_ELEMENT_TYPE && (resolvedValue._store.validated = 1);
        }, voidHandler), createLazyWrapperAroundWakeable(request, task, result);
      result.$$typeof === REACT_ELEMENT_TYPE && (result._store.validated = 1);
      var iteratorFn = getIteratorFn(result);
      if (iteratorFn) {
        var multiShot = _defineProperty({}, Symbol.iterator, function() {
          var iterator = iteratorFn.call(result);
          iterator !== result || "[object GeneratorFunction]" === Object.prototype.toString.call(Component) && "[object Generator]" === Object.prototype.toString.call(result) || callWithDebugContextInDEV(request, task, function() {
            console.error(
              "Returning an Iterator from a Server Component is not supported since it cannot be looped over more than once. "
            );
          });
          return iterator;
        });
        multiShot._debugInfo = result._debugInfo;
        return multiShot;
      }
      return "function" !== typeof result[ASYNC_ITERATOR] || "function" === typeof ReadableStream && result instanceof ReadableStream ? result : (multiShot = _defineProperty({}, ASYNC_ITERATOR, function() {
        var iterator = result[ASYNC_ITERATOR]();
        iterator !== result || "[object AsyncGeneratorFunction]" === Object.prototype.toString.call(Component) && "[object AsyncGenerator]" === Object.prototype.toString.call(result) || callWithDebugContextInDEV(request, task, function() {
          console.error(
            "Returning an AsyncIterator from a Server Component is not supported since it cannot be looped over more than once. "
          );
        });
        return iterator;
      }), multiShot._debugInfo = result._debugInfo, multiShot);
    }
    function renderFunctionComponent(request, task, key, Component, props, validated) {
      var prevThenableState = task.thenableState;
      task.thenableState = null;
      if (canEmitDebugInfo)
        if (null !== prevThenableState)
          var componentDebugInfo = prevThenableState._componentDebugInfo;
        else {
          var componentDebugID = task.id;
          componentDebugInfo = Component.displayName || Component.name || "";
          var componentEnv = (0, request.environmentName)();
          request.pendingChunks++;
          componentDebugInfo = {
            name: componentDebugInfo,
            env: componentEnv,
            key,
            owner: task.debugOwner
          };
          componentDebugInfo.stack = null === task.debugStack ? null : filterStackTrace(request, parseStackTrace(task.debugStack, 1));
          componentDebugInfo.props = props;
          componentDebugInfo.debugStack = task.debugStack;
          componentDebugInfo.debugTask = task.debugTask;
          outlineComponentInfo(request, componentDebugInfo);
          var timestamp = performance.now();
          timestamp > task.time ? (emitTimingChunk(request, task.id, timestamp), task.time = timestamp) : task.timed || emitTimingChunk(request, task.id, task.time);
          task.timed = true;
          emitDebugChunk(request, componentDebugID, componentDebugInfo);
          task.environmentName = componentEnv;
          2 === validated && warnForMissingKey(request, key, componentDebugInfo, task.debugTask);
        }
      else return outlineTask(request, task);
      thenableIndexCounter = 0;
      thenableState = prevThenableState;
      currentComponentDebugInfo = componentDebugInfo;
      props = supportsComponentStorage ? task.debugTask ? task.debugTask.run(
        componentStorage.run.bind(
          componentStorage,
          componentDebugInfo,
          callComponentInDEV,
          Component,
          props,
          componentDebugInfo
        )
      ) : componentStorage.run(
        componentDebugInfo,
        callComponentInDEV,
        Component,
        props,
        componentDebugInfo
      ) : task.debugTask ? task.debugTask.run(
        callComponentInDEV.bind(
          null,
          Component,
          props,
          componentDebugInfo
        )
      ) : callComponentInDEV(Component, props, componentDebugInfo);
      if (request.status === ABORTING)
        throw "object" !== typeof props || null === props || "function" !== typeof props.then || isClientReference(props) || props.then(voidHandler, voidHandler), null;
      validated = thenableState;
      if (null !== validated)
        for (prevThenableState = validated._stacks || (validated._stacks = []), componentDebugID = 0; componentDebugID < validated.length; componentDebugID++)
          forwardDebugInfoFromThenable(
            request,
            task,
            validated[componentDebugID],
            componentDebugInfo,
            prevThenableState[componentDebugID]
          );
      props = processServerComponentReturnValue(
        request,
        task,
        Component,
        props
      );
      task.debugOwner = componentDebugInfo;
      task.debugStack = null;
      task.debugTask = null;
      Component = task.keyPath;
      componentDebugInfo = task.implicitSlot;
      null !== key ? task.keyPath = null === Component ? key : Component + "," + key : null === Component && (task.implicitSlot = true);
      request = renderModelDestructive(request, task, emptyRoot, "", props);
      task.keyPath = Component;
      task.implicitSlot = componentDebugInfo;
      return request;
    }
    function warnForMissingKey(request, key, componentDebugInfo, debugTask) {
      function logKeyError() {
        console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          "",
          ""
        );
      }
      key = request.didWarnForKey;
      null == key && (key = request.didWarnForKey = /* @__PURE__ */ new WeakSet());
      request = componentDebugInfo.owner;
      if (null != request) {
        if (key.has(request)) return;
        key.add(request);
      }
      supportsComponentStorage ? debugTask ? debugTask.run(
        componentStorage.run.bind(
          componentStorage,
          componentDebugInfo,
          callComponentInDEV,
          logKeyError,
          null,
          componentDebugInfo
        )
      ) : componentStorage.run(
        componentDebugInfo,
        callComponentInDEV,
        logKeyError,
        null,
        componentDebugInfo
      ) : debugTask ? debugTask.run(
        callComponentInDEV.bind(
          null,
          logKeyError,
          null,
          componentDebugInfo
        )
      ) : callComponentInDEV(logKeyError, null, componentDebugInfo);
    }
    function renderFragment(request, task, children) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        null === child || "object" !== typeof child || child.$$typeof !== REACT_ELEMENT_TYPE || null !== child.key || child._store.validated || (child._store.validated = 2);
      }
      if (null !== task.keyPath)
        return request = [
          REACT_ELEMENT_TYPE,
          REACT_FRAGMENT_TYPE,
          task.keyPath,
          { children },
          null,
          null,
          0
        ], task.implicitSlot ? [request] : request;
      if (i = children._debugInfo) {
        if (canEmitDebugInfo) forwardDebugInfo(request, task, i);
        else return outlineTask(request, task);
        children = Array.from(children);
      }
      return children;
    }
    function renderAsyncFragment(request, task, children, getAsyncIterator) {
      if (null !== task.keyPath)
        return request = [
          REACT_ELEMENT_TYPE,
          REACT_FRAGMENT_TYPE,
          task.keyPath,
          { children },
          null,
          null,
          0
        ], task.implicitSlot ? [request] : request;
      getAsyncIterator = getAsyncIterator.call(children);
      return serializeAsyncIterable(request, task, children, getAsyncIterator);
    }
    function deferTask(request, task) {
      task = createTask(
        request,
        task.model,
        task.keyPath,
        task.implicitSlot,
        task.formatContext,
        request.abortableTasks,
        task.time,
        task.debugOwner,
        task.debugStack,
        task.debugTask
      );
      pingTask(request, task);
      return serializeLazyID(task.id);
    }
    function outlineTask(request, task) {
      task = createTask(
        request,
        task.model,
        task.keyPath,
        task.implicitSlot,
        task.formatContext,
        request.abortableTasks,
        task.time,
        task.debugOwner,
        task.debugStack,
        task.debugTask
      );
      retryTask(request, task);
      return 1 === task.status ? serializeByValueID(task.id) : serializeLazyID(task.id);
    }
    function renderElement(request, task, type, key, ref, props, validated) {
      if (null !== ref && void 0 !== ref)
        throw Error(
          "Refs cannot be used in Server Components, nor passed to Client Components."
        );
      jsxPropsParents.set(props, type);
      "object" === typeof props.children && null !== props.children && jsxChildrenParents.set(props.children, type);
      if ("function" !== typeof type || isClientReference(type) || type.$$typeof === TEMPORARY_REFERENCE_TAG) {
        if (type === REACT_FRAGMENT_TYPE && null === key)
          return 2 === validated && (validated = {
            name: "Fragment",
            env: (0, request.environmentName)(),
            key,
            owner: task.debugOwner,
            stack: null === task.debugStack ? null : filterStackTrace(
              request,
              parseStackTrace(task.debugStack, 1)
            ),
            props,
            debugStack: task.debugStack,
            debugTask: task.debugTask
          }, warnForMissingKey(request, key, validated, task.debugTask)), validated = task.implicitSlot, null === task.keyPath && (task.implicitSlot = true), request = renderModelDestructive(
            request,
            task,
            emptyRoot,
            "",
            props.children
          ), task.implicitSlot = validated, request;
        if (null != type && "object" === typeof type && !isClientReference(type))
          switch (type.$$typeof) {
            case REACT_LAZY_TYPE:
              type = callLazyInitInDEV(type);
              if (request.status === ABORTING) throw null;
              return renderElement(
                request,
                task,
                type,
                key,
                ref,
                props,
                validated
              );
            case REACT_FORWARD_REF_TYPE:
              return renderFunctionComponent(
                request,
                task,
                key,
                type.render,
                props,
                validated
              );
            case REACT_MEMO_TYPE:
              return renderElement(
                request,
                task,
                type.type,
                key,
                ref,
                props,
                validated
              );
            case REACT_ELEMENT_TYPE:
              type._store.validated = 1;
          }
        else if ("string" === typeof type) {
          ref = task.formatContext;
          var newFormatContext = getChildFormatContext(ref, type, props);
          ref !== newFormatContext && null != props.children && outlineModelWithFormatContext(
            request,
            props.children,
            newFormatContext
          );
        }
      } else
        return renderFunctionComponent(
          request,
          task,
          key,
          type,
          props,
          validated
        );
      ref = task.keyPath;
      null === key ? key = ref : null !== ref && (key = ref + "," + key);
      newFormatContext = null;
      ref = task.debugOwner;
      null !== ref && outlineComponentInfo(request, ref);
      if (null !== task.debugStack) {
        newFormatContext = filterStackTrace(
          request,
          parseStackTrace(task.debugStack, 1)
        );
        var id = outlineDebugModel(
          request,
          { objectLimit: 2 * newFormatContext.length + 1 },
          newFormatContext
        );
        request.writtenObjects.set(newFormatContext, serializeByValueID(id));
      }
      request = [
        REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        ref,
        newFormatContext,
        validated
      ];
      task = task.implicitSlot && null !== key ? [request] : request;
      return task;
    }
    function pingTask(request, task) {
      task.timed = true;
      var pingedTasks = request.pingedTasks;
      pingedTasks.push(task);
      1 === pingedTasks.length && (request.flushScheduled = null !== request.destination, 21 === request.type || 10 === request.status ? scheduleMicrotask(function() {
        return performWork(request);
      }) : setTimeout(function() {
        return performWork(request);
      }, 0));
    }
    function createTask(request, model, keyPath, implicitSlot, formatContext, abortSet, lastTimestamp, debugOwner, debugStack, debugTask) {
      request.pendingChunks++;
      var id = request.nextChunkId++;
      "object" !== typeof model || null === model || null !== keyPath || implicitSlot || request.writtenObjects.set(model, serializeByValueID(id));
      var task = {
        id,
        status: 0,
        model,
        keyPath,
        implicitSlot,
        formatContext,
        ping: function() {
          return pingTask(request, task);
        },
        toJSON: function(parentPropertyName, value) {
          var parent = this, originalValue = parent[parentPropertyName];
          "object" !== typeof originalValue || originalValue === value || originalValue instanceof Date || callWithDebugContextInDEV(request, task, function() {
            "Object" !== objectName(originalValue) ? "string" === typeof jsxChildrenParents.get(parent) ? console.error(
              "%s objects cannot be rendered as text children. Try formatting it using toString().%s",
              objectName(originalValue),
              describeObjectForErrorMessage(parent, parentPropertyName)
            ) : console.error(
              "Only plain objects can be passed to Client Components from Server Components. %s objects are not supported.%s",
              objectName(originalValue),
              describeObjectForErrorMessage(parent, parentPropertyName)
            ) : console.error(
              "Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.%s",
              describeObjectForErrorMessage(parent, parentPropertyName)
            );
          });
          return renderModel(request, task, parent, parentPropertyName, value);
        },
        thenableState: null,
        timed: false
      };
      task.time = lastTimestamp;
      task.environmentName = request.environmentName();
      task.debugOwner = debugOwner;
      task.debugStack = debugStack;
      task.debugTask = debugTask;
      abortSet.add(task);
      return task;
    }
    function serializeByValueID(id) {
      return "$" + id.toString(16);
    }
    function serializeLazyID(id) {
      return "$L" + id.toString(16);
    }
    function serializeDeferredObject(request, value) {
      var deferredDebugObjects = request.deferredDebugObjects;
      return null !== deferredDebugObjects ? (request.pendingDebugChunks++, request = request.nextChunkId++, deferredDebugObjects.existing.set(value, request), deferredDebugObjects.retained.set(request, value), "$Y" + request.toString(16)) : "$Y";
    }
    function serializeNumber(number) {
      return Number.isFinite(number) ? 0 === number && -Infinity === 1 / number ? "$-0" : number : Infinity === number ? "$Infinity" : -Infinity === number ? "$-Infinity" : "$NaN";
    }
    function encodeReferenceChunk(request, id, reference) {
      request = stringify(reference);
      id = id.toString(16) + ":" + request + "\n";
      return stringToChunk(id);
    }
    function serializeClientReference(request, parent, parentPropertyName, clientReference) {
      var clientReferenceKey = clientReference.$$async ? clientReference.$$id + "#async" : clientReference.$$id, writtenClientReferences = request.writtenClientReferences, existingId = writtenClientReferences.get(clientReferenceKey);
      if (void 0 !== existingId)
        return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(existingId) : serializeByValueID(existingId);
      try {
        var clientReferenceMetadata = resolveClientReferenceMetadata(
          request.bundlerConfig,
          clientReference
        );
        request.pendingChunks++;
        var importId = request.nextChunkId++;
        emitImportChunk(request, importId, clientReferenceMetadata, false);
        writtenClientReferences.set(clientReferenceKey, importId);
        return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(importId) : serializeByValueID(importId);
      } catch (x) {
        return request.pendingChunks++, parent = request.nextChunkId++, parentPropertyName = logRecoverableError(request, x, null), emitErrorChunk(request, parent, parentPropertyName, x, false, null), serializeByValueID(parent);
      }
    }
    function serializeDebugClientReference(request, parent, parentPropertyName, clientReference) {
      var existingId = request.writtenClientReferences.get(
        clientReference.$$async ? clientReference.$$id + "#async" : clientReference.$$id
      );
      if (void 0 !== existingId)
        return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(existingId) : serializeByValueID(existingId);
      try {
        var clientReferenceMetadata = resolveClientReferenceMetadata(
          request.bundlerConfig,
          clientReference
        );
        request.pendingDebugChunks++;
        var importId = request.nextChunkId++;
        emitImportChunk(request, importId, clientReferenceMetadata, true);
        return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(importId) : serializeByValueID(importId);
      } catch (x) {
        return request.pendingDebugChunks++, parent = request.nextChunkId++, parentPropertyName = logRecoverableError(request, x, null), emitErrorChunk(request, parent, parentPropertyName, x, true, null), serializeByValueID(parent);
      }
    }
    function outlineModel(request, value) {
      return outlineModelWithFormatContext(request, value, 0);
    }
    function outlineModelWithFormatContext(request, value, formatContext) {
      value = createTask(
        request,
        value,
        null,
        false,
        formatContext,
        request.abortableTasks,
        performance.now(),
        null,
        null,
        null
      );
      retryTask(request, value);
      return value.id;
    }
    function serializeServerReference(request, serverReference) {
      var writtenServerReferences = request.writtenServerReferences, existingId = writtenServerReferences.get(serverReference);
      if (void 0 !== existingId) return "$h" + existingId.toString(16);
      existingId = serverReference.$$bound;
      existingId = null === existingId ? null : Promise.resolve(existingId);
      var id = serverReference.$$id, location = null, error = serverReference.$$location;
      error && (error = parseStackTrace(error, 1), 0 < error.length && (location = error[0], location = [location[0], location[1], location[2], location[3]]));
      existingId = null !== location ? {
        id,
        bound: existingId,
        name: "function" === typeof serverReference ? serverReference.name : "",
        env: (0, request.environmentName)(),
        location
      } : { id, bound: existingId };
      request = outlineModel(request, existingId);
      writtenServerReferences.set(serverReference, request);
      return "$h" + request.toString(16);
    }
    function serializeLargeTextString(request, text) {
      request.pendingChunks++;
      var textId = request.nextChunkId++;
      emitTextChunk(request, textId, text, false);
      return serializeByValueID(textId);
    }
    function serializeMap(request, map) {
      map = Array.from(map);
      return "$Q" + outlineModel(request, map).toString(16);
    }
    function serializeFormData(request, formData) {
      formData = Array.from(formData.entries());
      return "$K" + outlineModel(request, formData).toString(16);
    }
    function serializeSet(request, set) {
      set = Array.from(set);
      return "$W" + outlineModel(request, set).toString(16);
    }
    function serializeTypedArray(request, tag, typedArray) {
      request.pendingChunks++;
      var bufferId = request.nextChunkId++;
      emitTypedArrayChunk(request, bufferId, tag, typedArray, false);
      return serializeByValueID(bufferId);
    }
    function serializeDebugTypedArray(request, tag, typedArray) {
      request.pendingDebugChunks++;
      var bufferId = request.nextChunkId++;
      emitTypedArrayChunk(request, bufferId, tag, typedArray, true);
      return serializeByValueID(bufferId);
    }
    function serializeDebugBlob(request, blob) {
      function progress(entry) {
        if (entry.done)
          emitOutlinedDebugModelChunk(
            request,
            id,
            { objectLimit: model.length + 2 },
            model
          ), enqueueFlush(request);
        else
          return model.push(entry.value), reader.read().then(progress).catch(error);
      }
      function error(reason) {
        emitErrorChunk(request, id, "", reason, true, null);
        enqueueFlush(request);
        reader.cancel(reason).then(noop, noop);
      }
      var model = [blob.type], reader = blob.stream().getReader();
      request.pendingDebugChunks++;
      var id = request.nextChunkId++;
      reader.read().then(progress).catch(error);
      return "$B" + id.toString(16);
    }
    function serializeBlob(request, blob) {
      function progress(entry) {
        if (0 === newTask.status)
          if (entry.done)
            request.cacheController.signal.removeEventListener(
              "abort",
              abortBlob
            ), pingTask(request, newTask);
          else
            return model.push(entry.value), reader.read().then(progress).catch(error);
      }
      function error(reason) {
        0 === newTask.status && (request.cacheController.signal.removeEventListener(
          "abort",
          abortBlob
        ), erroredTask(request, newTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
      }
      function abortBlob() {
        if (0 === newTask.status) {
          var signal = request.cacheController.signal;
          signal.removeEventListener("abort", abortBlob);
          signal = signal.reason;
          21 === request.type ? (request.abortableTasks.delete(newTask), haltTask(newTask), finishHaltedTask(newTask, request)) : (erroredTask(request, newTask, signal), enqueueFlush(request));
          reader.cancel(signal).then(error, error);
        }
      }
      var model = [blob.type], newTask = createTask(
        request,
        model,
        null,
        false,
        0,
        request.abortableTasks,
        performance.now(),
        null,
        null,
        null
      ), reader = blob.stream().getReader();
      request.cacheController.signal.addEventListener("abort", abortBlob);
      reader.read().then(progress).catch(error);
      return "$B" + newTask.id.toString(16);
    }
    function renderModel(request, task, parent, key, value) {
      serializedSize += key.length;
      var prevKeyPath = task.keyPath, prevImplicitSlot = task.implicitSlot;
      try {
        return renderModelDestructive(request, task, parent, key, value);
      } catch (thrownValue) {
        parent = task.model;
        parent = "object" === typeof parent && null !== parent && (parent.$$typeof === REACT_ELEMENT_TYPE || parent.$$typeof === REACT_LAZY_TYPE);
        if (request.status === ABORTING) {
          task.status = 3;
          if (21 === request.type)
            return task = request.nextChunkId++, task = parent ? serializeLazyID(task) : serializeByValueID(task), task;
          task = request.fatalError;
          return parent ? serializeLazyID(task) : serializeByValueID(task);
        }
        key = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
        if ("object" === typeof key && null !== key && "function" === typeof key.then)
          return request = createTask(
            request,
            task.model,
            task.keyPath,
            task.implicitSlot,
            task.formatContext,
            request.abortableTasks,
            task.time,
            task.debugOwner,
            task.debugStack,
            task.debugTask
          ), value = request.ping, key.then(value, value), request.thenableState = getThenableStateAfterSuspending(), task.keyPath = prevKeyPath, task.implicitSlot = prevImplicitSlot, parent ? serializeLazyID(request.id) : serializeByValueID(request.id);
        task.keyPath = prevKeyPath;
        task.implicitSlot = prevImplicitSlot;
        request.pendingChunks++;
        prevKeyPath = request.nextChunkId++;
        prevImplicitSlot = logRecoverableError(request, key, task);
        emitErrorChunk(
          request,
          prevKeyPath,
          prevImplicitSlot,
          key,
          false,
          task.debugOwner
        );
        return parent ? serializeLazyID(prevKeyPath) : serializeByValueID(prevKeyPath);
      }
    }
    function renderModelDestructive(request, task, parent, parentPropertyName, value) {
      task.model = value;
      "__proto__" === parentPropertyName && callWithDebugContextInDEV(request, task, function() {
        console.error(
          "Expected not to serialize an object with own property `__proto__`. When parsed this property will be omitted.%s",
          describeObjectForErrorMessage(parent, parentPropertyName)
        );
      });
      if (value === REACT_ELEMENT_TYPE) return "$";
      if (null === value) return null;
      if ("object" === typeof value) {
        switch (value.$$typeof) {
          case REACT_ELEMENT_TYPE:
            var elementReference = null, _writtenObjects = request.writtenObjects;
            if (null === task.keyPath && !task.implicitSlot) {
              var _existingReference = _writtenObjects.get(value);
              if (void 0 !== _existingReference)
                if (modelRoot === value) modelRoot = null;
                else return _existingReference;
              else
                -1 === parentPropertyName.indexOf(":") && (_existingReference = _writtenObjects.get(parent), void 0 !== _existingReference && (elementReference = _existingReference + ":" + parentPropertyName, _writtenObjects.set(value, elementReference)));
            }
            if (serializedSize > MAX_ROW_SIZE) return deferTask(request, task);
            if (_existingReference = value._debugInfo)
              if (canEmitDebugInfo)
                forwardDebugInfo(request, task, _existingReference);
              else return outlineTask(request, task);
            _existingReference = value.props;
            var refProp = _existingReference.ref;
            refProp = void 0 !== refProp ? refProp : null;
            task.debugOwner = value._owner;
            task.debugStack = value._debugStack;
            task.debugTask = value._debugTask;
            if (void 0 === value._owner || void 0 === value._debugStack || void 0 === value._debugTask) {
              var key = "";
              null !== value.key && (key = ' key="' + value.key + '"');
              console.error(
                "Attempted to render <%s%s> without development properties. This is not supported. It can happen if:\n- The element is created with a production version of React but rendered in development.\n- The element was cloned with a custom function instead of `React.cloneElement`.\nThe props of this element may help locate this element: %o",
                value.type,
                key,
                value.props
              );
            }
            request = renderElement(
              request,
              task,
              value.type,
              value.key,
              refProp,
              _existingReference,
              value._store.validated
            );
            "object" === typeof request && null !== request && null !== elementReference && (_writtenObjects.has(request) || _writtenObjects.set(request, elementReference));
            return request;
          case REACT_LAZY_TYPE:
            if (serializedSize > MAX_ROW_SIZE) return deferTask(request, task);
            task.thenableState = null;
            elementReference = callLazyInitInDEV(value);
            if (request.status === ABORTING) throw null;
            if (_writtenObjects = value._debugInfo)
              if (canEmitDebugInfo)
                forwardDebugInfo(request, task, _writtenObjects);
              else return outlineTask(request, task);
            return renderModelDestructive(
              request,
              task,
              emptyRoot,
              "",
              elementReference
            );
          case REACT_LEGACY_ELEMENT_TYPE:
            throw Error(
              'A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.'
            );
        }
        if (isClientReference(value))
          return serializeClientReference(
            request,
            parent,
            parentPropertyName,
            value
          );
        if (void 0 !== request.temporaryReferences && (elementReference = request.temporaryReferences.get(value), void 0 !== elementReference))
          return "$T" + elementReference;
        elementReference = request.writtenObjects;
        _writtenObjects = elementReference.get(value);
        if ("function" === typeof value.then) {
          if (void 0 !== _writtenObjects) {
            if (null !== task.keyPath || task.implicitSlot)
              return "$@" + serializeThenable(request, task, value).toString(16);
            if (modelRoot === value) modelRoot = null;
            else return _writtenObjects;
          }
          request = "$@" + serializeThenable(request, task, value).toString(16);
          elementReference.set(value, request);
          return request;
        }
        if (void 0 !== _writtenObjects)
          if (modelRoot === value) {
            if (_writtenObjects !== serializeByValueID(task.id))
              return _writtenObjects;
            modelRoot = null;
          } else return _writtenObjects;
        else if (-1 === parentPropertyName.indexOf(":") && (_writtenObjects = elementReference.get(parent), void 0 !== _writtenObjects)) {
          _existingReference = parentPropertyName;
          if (isArrayImpl(parent) && parent[0] === REACT_ELEMENT_TYPE)
            switch (parentPropertyName) {
              case "1":
                _existingReference = "type";
                break;
              case "2":
                _existingReference = "key";
                break;
              case "3":
                _existingReference = "props";
                break;
              case "4":
                _existingReference = "_owner";
            }
          elementReference.set(
            value,
            _writtenObjects + ":" + _existingReference
          );
        }
        if (isArrayImpl(value)) return renderFragment(request, task, value);
        if (value instanceof Map) return serializeMap(request, value);
        if (value instanceof Set) return serializeSet(request, value);
        if ("function" === typeof FormData && value instanceof FormData)
          return serializeFormData(request, value);
        if (value instanceof Error) return serializeErrorValue(request, value);
        if (value instanceof ArrayBuffer)
          return serializeTypedArray(request, "A", new Uint8Array(value));
        if (value instanceof Int8Array)
          return serializeTypedArray(request, "O", value);
        if (value instanceof Uint8Array)
          return serializeTypedArray(request, "o", value);
        if (value instanceof Uint8ClampedArray)
          return serializeTypedArray(request, "U", value);
        if (value instanceof Int16Array)
          return serializeTypedArray(request, "S", value);
        if (value instanceof Uint16Array)
          return serializeTypedArray(request, "s", value);
        if (value instanceof Int32Array)
          return serializeTypedArray(request, "L", value);
        if (value instanceof Uint32Array)
          return serializeTypedArray(request, "l", value);
        if (value instanceof Float32Array)
          return serializeTypedArray(request, "G", value);
        if (value instanceof Float64Array)
          return serializeTypedArray(request, "g", value);
        if (value instanceof BigInt64Array)
          return serializeTypedArray(request, "M", value);
        if (value instanceof BigUint64Array)
          return serializeTypedArray(request, "m", value);
        if (value instanceof DataView)
          return serializeTypedArray(request, "V", value);
        if ("function" === typeof Blob && value instanceof Blob)
          return serializeBlob(request, value);
        if (elementReference = getIteratorFn(value))
          return elementReference = elementReference.call(value), elementReference === value ? "$i" + outlineModel(request, Array.from(elementReference)).toString(16) : renderFragment(request, task, Array.from(elementReference));
        if ("function" === typeof ReadableStream && value instanceof ReadableStream)
          return serializeReadableStream(request, task, value);
        elementReference = value[ASYNC_ITERATOR];
        if ("function" === typeof elementReference)
          return renderAsyncFragment(request, task, value, elementReference);
        if (value instanceof Date) return "$D" + value.toJSON();
        elementReference = getPrototypeOf(value);
        if (elementReference !== ObjectPrototype$1 && (null === elementReference || null !== getPrototypeOf(elementReference)))
          throw Error(
            "Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." + describeObjectForErrorMessage(parent, parentPropertyName)
          );
        if ("Object" !== objectName(value))
          callWithDebugContextInDEV(request, task, function() {
            console.error(
              "Only plain objects can be passed to Client Components from Server Components. %s objects are not supported.%s",
              objectName(value),
              describeObjectForErrorMessage(parent, parentPropertyName)
            );
          });
        else if (!isSimpleObject(value))
          callWithDebugContextInDEV(request, task, function() {
            console.error(
              "Only plain objects can be passed to Client Components from Server Components. Classes or other objects with methods are not supported.%s",
              describeObjectForErrorMessage(parent, parentPropertyName)
            );
          });
        else if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(value);
          0 < symbols.length && callWithDebugContextInDEV(request, task, function() {
            console.error(
              "Only plain objects can be passed to Client Components from Server Components. Objects with symbol properties like %s are not supported.%s",
              symbols[0].description,
              describeObjectForErrorMessage(parent, parentPropertyName)
            );
          });
        }
        return value;
      }
      if ("string" === typeof value)
        return serializedSize += value.length, "Z" === value[value.length - 1] && parent[parentPropertyName] instanceof Date ? "$D" + value : 1024 <= value.length && null !== byteLengthOfChunk ? serializeLargeTextString(request, value) : "$" === value[0] ? "$" + value : value;
      if ("boolean" === typeof value) return value;
      if ("number" === typeof value) return serializeNumber(value);
      if ("undefined" === typeof value) return "$undefined";
      if ("function" === typeof value) {
        if (isClientReference(value))
          return serializeClientReference(
            request,
            parent,
            parentPropertyName,
            value
          );
        if (value.$$typeof === SERVER_REFERENCE_TAG)
          return serializeServerReference(request, value);
        if (void 0 !== request.temporaryReferences && (request = request.temporaryReferences.get(value), void 0 !== request))
          return "$T" + request;
        if (value.$$typeof === TEMPORARY_REFERENCE_TAG)
          throw Error(
            "Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server."
          );
        if (/^on[A-Z]/.test(parentPropertyName))
          throw Error(
            "Event handlers cannot be passed to Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName) + "\nIf you need interactivity, consider converting part of this to a Client Component."
          );
        if (jsxChildrenParents.has(parent) || jsxPropsParents.has(parent) && "children" === parentPropertyName)
          throw request = value.displayName || value.name || "Component", Error(
            "Functions are not valid as a child of Client Components. This may happen if you return " + request + " instead of <" + request + " /> from render. Or maybe you meant to call this function rather than return it." + describeObjectForErrorMessage(parent, parentPropertyName)
          );
        throw Error(
          'Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.' + describeObjectForErrorMessage(parent, parentPropertyName)
        );
      }
      if ("symbol" === typeof value) {
        task = request.writtenSymbols;
        elementReference = task.get(value);
        if (void 0 !== elementReference)
          return serializeByValueID(elementReference);
        elementReference = value.description;
        if (Symbol.for(elementReference) !== value)
          throw Error(
            "Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + (value.description + ") cannot be found among global symbols.") + describeObjectForErrorMessage(parent, parentPropertyName)
          );
        request.pendingChunks++;
        _writtenObjects = request.nextChunkId++;
        emitSymbolChunk(request, _writtenObjects, elementReference);
        task.set(value, _writtenObjects);
        return serializeByValueID(_writtenObjects);
      }
      if ("bigint" === typeof value) return "$n" + value.toString(10);
      throw Error(
        "Type " + typeof value + " is not supported in Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName)
      );
    }
    function logRecoverableError(request, error, task) {
      var prevRequest = currentRequest;
      currentRequest = null;
      try {
        var onError = request.onError;
        var errorDigest = null !== task ? supportsRequestStorage ? requestStorage.run(
          void 0,
          callWithDebugContextInDEV,
          request,
          task,
          onError,
          error
        ) : callWithDebugContextInDEV(request, task, onError, error) : supportsRequestStorage ? requestStorage.run(void 0, onError, error) : onError(error);
      } finally {
        currentRequest = prevRequest;
      }
      if (null != errorDigest && "string" !== typeof errorDigest)
        throw Error(
          'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead'
        );
      return errorDigest || "";
    }
    function fatalError(request, error) {
      var onFatalError = request.onFatalError;
      onFatalError(error);
      null !== request.destination ? (request.status = CLOSED, closeWithError(request.destination, error)) : (request.status = 13, request.fatalError = error);
      request.cacheController.abort(
        Error("The render was aborted due to a fatal error.", { cause: error })
      );
    }
    function serializeErrorValue(request, error) {
      var name = "Error", env = (0, request.environmentName)();
      try {
        name = error.name;
        var message = String(error.message);
        var stack = filterStackTrace(request, parseStackTrace(error, 0));
        var errorEnv = error.environmentName;
        "string" === typeof errorEnv && (env = errorEnv);
      } catch (x) {
        message = "An error occurred but serializing the error message failed.", stack = [];
      }
      return "$Z" + outlineModel(request, {
        name,
        message,
        stack,
        env
      }).toString(16);
    }
    function emitErrorChunk(request, id, digest, error, debug, owner) {
      var name = "Error", env = (0, request.environmentName)();
      try {
        if (error instanceof Error) {
          name = error.name;
          var message = String(error.message);
          var stack = filterStackTrace(request, parseStackTrace(error, 0));
          var errorEnv = error.environmentName;
          "string" === typeof errorEnv && (env = errorEnv);
        } else
          message = "object" === typeof error && null !== error ? describeObjectForErrorMessage(error) : String(error), stack = [];
      } catch (x) {
        message = "An error occurred but serializing the error message failed.", stack = [];
      }
      error = null == owner ? null : outlineComponentInfo(request, owner);
      digest = {
        digest,
        name,
        message,
        stack,
        env,
        owner: error
      };
      id = id.toString(16) + ":E" + stringify(digest) + "\n";
      id = stringToChunk(id);
      debug ? request.completedDebugChunks.push(id) : request.completedErrorChunks.push(id);
    }
    function emitImportChunk(request, id, clientReferenceMetadata, debug) {
      clientReferenceMetadata = stringify(clientReferenceMetadata);
      id = id.toString(16) + ":I" + clientReferenceMetadata + "\n";
      id = stringToChunk(id);
      debug ? request.completedDebugChunks.push(id) : request.completedImportChunks.push(id);
    }
    function emitSymbolChunk(request, id, name) {
      id = encodeReferenceChunk(request, id, "$S" + name);
      request.completedImportChunks.push(id);
    }
    function emitModelChunk(request, id, json) {
      id = id.toString(16) + ":" + json + "\n";
      id = stringToChunk(id);
      request.completedRegularChunks.push(id);
    }
    function emitDebugHaltChunk(request, id) {
      id = id.toString(16) + ":\n";
      id = stringToChunk(id);
      request.completedDebugChunks.push(id);
    }
    function emitDebugChunk(request, id, debugInfo) {
      var json = serializeDebugModel(request, 500, debugInfo);
      null !== request.debugDestination ? (debugInfo = request.nextChunkId++, json = debugInfo.toString(16) + ":" + json + "\n", request.pendingDebugChunks++, request.completedDebugChunks.push(stringToChunk(json)), id = id.toString(16) + ':D"$' + debugInfo.toString(16) + '"\n', request.completedRegularChunks.push(stringToChunk(id))) : (id = id.toString(16) + ":D" + json + "\n", request.completedRegularChunks.push(stringToChunk(id)));
    }
    function outlineComponentInfo(request, componentInfo) {
      var existingRef = request.writtenDebugObjects.get(componentInfo);
      if (void 0 !== existingRef) return existingRef;
      null != componentInfo.owner && outlineComponentInfo(request, componentInfo.owner);
      existingRef = 10;
      null != componentInfo.stack && (existingRef += componentInfo.stack.length);
      existingRef = { objectLimit: existingRef };
      var componentDebugInfo = {
        name: componentInfo.name,
        key: componentInfo.key
      };
      null != componentInfo.env && (componentDebugInfo.env = componentInfo.env);
      null != componentInfo.owner && (componentDebugInfo.owner = componentInfo.owner);
      null == componentInfo.stack && null != componentInfo.debugStack ? componentDebugInfo.stack = filterStackTrace(
        request,
        parseStackTrace(componentInfo.debugStack, 1)
      ) : null != componentInfo.stack && (componentDebugInfo.stack = componentInfo.stack);
      componentDebugInfo.props = componentInfo.props;
      existingRef = outlineDebugModel(request, existingRef, componentDebugInfo);
      existingRef = serializeByValueID(existingRef);
      request.writtenDebugObjects.set(componentInfo, existingRef);
      request.writtenObjects.set(componentInfo, existingRef);
      return existingRef;
    }
    function emitTypedArrayChunk(request, id, tag, typedArray, debug) {
      debug ? request.pendingDebugChunks++ : request.pendingChunks++;
      var buffer = new Uint8Array(
        typedArray.buffer,
        typedArray.byteOffset,
        typedArray.byteLength
      );
      typedArray = 2048 < typedArray.byteLength ? buffer.slice() : buffer;
      buffer = typedArray.byteLength;
      id = id.toString(16) + ":" + tag + buffer.toString(16) + ",";
      id = stringToChunk(id);
      debug ? request.completedDebugChunks.push(id, typedArray) : request.completedRegularChunks.push(id, typedArray);
    }
    function emitTextChunk(request, id, text, debug) {
      if (null === byteLengthOfChunk)
        throw Error(
          "Existence of byteLengthOfChunk should have already been checked. This is a bug in React."
        );
      debug ? request.pendingDebugChunks++ : request.pendingChunks++;
      text = stringToChunk(text);
      var binaryLength = text.byteLength;
      id = id.toString(16) + ":T" + binaryLength.toString(16) + ",";
      id = stringToChunk(id);
      debug ? request.completedDebugChunks.push(id, text) : request.completedRegularChunks.push(id, text);
    }
    function renderDebugModel(request, counter, parent, parentPropertyName, value) {
      if (null === value) return null;
      if (value === REACT_ELEMENT_TYPE) return "$";
      if ("object" === typeof value) {
        if (isClientReference(value))
          return serializeDebugClientReference(
            request,
            parent,
            parentPropertyName,
            value
          );
        if (value.$$typeof === CONSTRUCTOR_MARKER) {
          value = value.constructor;
          var ref = request.writtenDebugObjects.get(value);
          void 0 === ref && (request = outlineDebugModel(request, counter, value), ref = serializeByValueID(request));
          return "$P" + ref.slice(1);
        }
        if (void 0 !== request.temporaryReferences) {
          var tempRef = request.temporaryReferences.get(value);
          if (void 0 !== tempRef) return "$T" + tempRef;
        }
        tempRef = request.writtenDebugObjects;
        var existingDebugReference = tempRef.get(value);
        if (void 0 !== existingDebugReference)
          if (debugModelRoot === value) debugModelRoot = null;
          else return existingDebugReference;
        else if (-1 === parentPropertyName.indexOf(":")) {
          if (existingDebugReference = tempRef.get(parent), void 0 !== existingDebugReference) {
            if (0 >= counter.objectLimit && !doNotLimit.has(value))
              return serializeDeferredObject(request, value);
            var propertyName = parentPropertyName;
            if (isArrayImpl(parent) && parent[0] === REACT_ELEMENT_TYPE)
              switch (parentPropertyName) {
                case "1":
                  propertyName = "type";
                  break;
                case "2":
                  propertyName = "key";
                  break;
                case "3":
                  propertyName = "props";
                  break;
                case "4":
                  propertyName = "_owner";
              }
            tempRef.set(value, existingDebugReference + ":" + propertyName);
          } else if (debugNoOutline !== value) {
            if ("function" === typeof value.then)
              return serializeDebugThenable(request, counter, value);
            request = outlineDebugModel(request, counter, value);
            return serializeByValueID(request);
          }
        }
        parent = request.writtenObjects.get(value);
        if (void 0 !== parent) return parent;
        if (0 >= counter.objectLimit && !doNotLimit.has(value))
          return serializeDeferredObject(request, value);
        counter.objectLimit--;
        parent = request.deferredDebugObjects;
        if (null !== parent && (parentPropertyName = parent.existing.get(value), void 0 !== parentPropertyName))
          return parent.existing.delete(value), parent.retained.delete(parentPropertyName), emitOutlinedDebugModelChunk(
            request,
            parentPropertyName,
            counter,
            value
          ), serializeByValueID(parentPropertyName);
        switch (value.$$typeof) {
          case REACT_ELEMENT_TYPE:
            null != value._owner && outlineComponentInfo(request, value._owner);
            "object" === typeof value.type && null !== value.type && doNotLimit.add(value.type);
            "object" === typeof value.key && null !== value.key && doNotLimit.add(value.key);
            doNotLimit.add(value.props);
            null !== value._owner && doNotLimit.add(value._owner);
            counter = null;
            if (null != value._debugStack)
              for (counter = filterStackTrace(
                request,
                parseStackTrace(value._debugStack, 1)
              ), doNotLimit.add(counter), request = 0; request < counter.length; request++)
                doNotLimit.add(counter[request]);
            return [
              REACT_ELEMENT_TYPE,
              value.type,
              value.key,
              value.props,
              value._owner,
              counter,
              value._store.validated
            ];
          case REACT_LAZY_TYPE:
            value = value._payload;
            if (null !== value && "object" === typeof value) {
              switch (value._status) {
                case 1:
                  return request = outlineDebugModel(
                    request,
                    counter,
                    value._result
                  ), serializeLazyID(request);
                case 2:
                  return counter = request.nextChunkId++, emitErrorChunk(
                    request,
                    counter,
                    "",
                    value._result,
                    true,
                    null
                  ), serializeLazyID(counter);
              }
              switch (value.status) {
                case "fulfilled":
                  return request = outlineDebugModel(
                    request,
                    counter,
                    value.value
                  ), serializeLazyID(request);
                case "rejected":
                  return counter = request.nextChunkId++, emitErrorChunk(
                    request,
                    counter,
                    "",
                    value.reason,
                    true,
                    null
                  ), serializeLazyID(counter);
              }
            }
            request.pendingDebugChunks++;
            value = request.nextChunkId++;
            emitDebugHaltChunk(request, value);
            return serializeLazyID(value);
        }
        if ("function" === typeof value.then)
          return serializeDebugThenable(request, counter, value);
        if (isArrayImpl(value)) return value;
        if (value instanceof Map) {
          value = Array.from(value);
          counter.objectLimit++;
          for (ref = 0; ref < value.length; ref++) {
            var entry = value[ref];
            doNotLimit.add(entry);
            var key = entry[0];
            entry = entry[1];
            "object" === typeof key && null !== key && doNotLimit.add(key);
            "object" === typeof entry && null !== entry && doNotLimit.add(entry);
          }
          return "$Q" + outlineDebugModel(request, counter, value).toString(16);
        }
        if (value instanceof Set) {
          value = Array.from(value);
          counter.objectLimit++;
          for (ref = 0; ref < value.length; ref++)
            key = value[ref], "object" === typeof key && null !== key && doNotLimit.add(key);
          return "$W" + outlineDebugModel(request, counter, value).toString(16);
        }
        if ("function" === typeof FormData && value instanceof FormData)
          return value = Array.from(value.entries()), "$K" + outlineDebugModel(
            request,
            { objectLimit: 2 * value.length + 1 },
            value
          ).toString(16);
        if (value instanceof Error) {
          counter = "Error";
          var env = (0, request.environmentName)();
          try {
            counter = value.name, ref = String(value.message), key = filterStackTrace(request, parseStackTrace(value, 0)), entry = value.environmentName, "string" === typeof entry && (env = entry);
          } catch (x) {
            ref = "An error occurred but serializing the error message failed.", key = [];
          }
          request = "$Z" + outlineDebugModel(
            request,
            { objectLimit: 2 * key.length + 1 },
            { name: counter, message: ref, stack: key, env }
          ).toString(16);
          return request;
        }
        if (value instanceof ArrayBuffer)
          return serializeDebugTypedArray(request, "A", new Uint8Array(value));
        if (value instanceof Int8Array)
          return serializeDebugTypedArray(request, "O", value);
        if (value instanceof Uint8Array)
          return serializeDebugTypedArray(request, "o", value);
        if (value instanceof Uint8ClampedArray)
          return serializeDebugTypedArray(request, "U", value);
        if (value instanceof Int16Array)
          return serializeDebugTypedArray(request, "S", value);
        if (value instanceof Uint16Array)
          return serializeDebugTypedArray(request, "s", value);
        if (value instanceof Int32Array)
          return serializeDebugTypedArray(request, "L", value);
        if (value instanceof Uint32Array)
          return serializeDebugTypedArray(request, "l", value);
        if (value instanceof Float32Array)
          return serializeDebugTypedArray(request, "G", value);
        if (value instanceof Float64Array)
          return serializeDebugTypedArray(request, "g", value);
        if (value instanceof BigInt64Array)
          return serializeDebugTypedArray(request, "M", value);
        if (value instanceof BigUint64Array)
          return serializeDebugTypedArray(request, "m", value);
        if (value instanceof DataView)
          return serializeDebugTypedArray(request, "V", value);
        if ("function" === typeof Blob && value instanceof Blob)
          return serializeDebugBlob(request, value);
        if (getIteratorFn(value)) return Array.from(value);
        request = getPrototypeOf(value);
        if (request !== ObjectPrototype$1 && null !== request) {
          counter = /* @__PURE__ */ Object.create(null);
          for (env in value)
            if (hasOwnProperty.call(value, env) || isGetter(request, env))
              counter[env] = value[env];
          ref = request.constructor;
          "function" !== typeof ref || ref.prototype !== request || hasOwnProperty.call(value, "") || isGetter(request, "") || (counter[""] = { $$typeof: CONSTRUCTOR_MARKER, constructor: ref });
          return counter;
        }
        return value;
      }
      if ("string" === typeof value) {
        if ("Z" === value[value.length - 1] && parent[parentPropertyName] instanceof Date)
          return "$D" + value;
        if (1024 <= value.length) {
          if (0 >= counter.objectLimit)
            return serializeDeferredObject(request, value);
          counter.objectLimit--;
          request.pendingDebugChunks++;
          counter = request.nextChunkId++;
          emitTextChunk(request, counter, value, true);
          return serializeByValueID(counter);
        }
        return "$" === value[0] ? "$" + value : value;
      }
      if ("boolean" === typeof value) return value;
      if ("number" === typeof value) return serializeNumber(value);
      if ("undefined" === typeof value) return "$undefined";
      if ("function" === typeof value) {
        if (isClientReference(value))
          return serializeDebugClientReference(
            request,
            parent,
            parentPropertyName,
            value
          );
        if (void 0 !== request.temporaryReferences && (counter = request.temporaryReferences.get(value), void 0 !== counter))
          return "$T" + counter;
        counter = request.writtenDebugObjects;
        ref = counter.get(value);
        if (void 0 !== ref) return ref;
        ref = Function.prototype.toString.call(value);
        key = value.name;
        key = "$E" + ("string" === typeof key ? "Object.defineProperty(" + ref + ',"name",{value:' + JSON.stringify(key) + "})" : "(" + ref + ")");
        request.pendingDebugChunks++;
        ref = request.nextChunkId++;
        key = encodeReferenceChunk(request, ref, key);
        request.completedDebugChunks.push(key);
        request = serializeByValueID(ref);
        counter.set(value, request);
        return request;
      }
      if ("symbol" === typeof value) {
        counter = request.writtenSymbols.get(value);
        if (void 0 !== counter) return serializeByValueID(counter);
        value = value.description;
        request.pendingChunks++;
        counter = request.nextChunkId++;
        emitSymbolChunk(request, counter, value);
        return serializeByValueID(counter);
      }
      return "bigint" === typeof value ? "$n" + value.toString(10) : value instanceof Date ? "$D" + value.toJSON() : "unknown type " + typeof value;
    }
    function serializeDebugModel(request, objectLimit, model) {
      function replacer(parentPropertyName, value) {
        try {
          return renderDebugModel(
            request,
            counter,
            this,
            parentPropertyName,
            value
          );
        } catch (x) {
          return "Unknown Value: React could not send it from the server.\n" + x.message;
        }
      }
      var counter = { objectLimit };
      objectLimit = debugNoOutline;
      debugNoOutline = model;
      try {
        return stringify(model, replacer);
      } catch (x) {
        return stringify(
          "Unknown Value: React could not send it from the server.\n" + x.message
        );
      } finally {
        debugNoOutline = objectLimit;
      }
    }
    function emitOutlinedDebugModelChunk(request, id, counter, model) {
      function replacer(parentPropertyName, value) {
        try {
          return renderDebugModel(
            request,
            counter,
            this,
            parentPropertyName,
            value
          );
        } catch (x) {
          return "Unknown Value: React could not send it from the server.\n" + x.message;
        }
      }
      "object" === typeof model && null !== model && doNotLimit.add(model);
      var prevModelRoot = debugModelRoot;
      debugModelRoot = model;
      "object" === typeof model && null !== model && request.writtenDebugObjects.set(model, serializeByValueID(id));
      try {
        var json = stringify(model, replacer);
      } catch (x) {
        json = stringify(
          "Unknown Value: React could not send it from the server.\n" + x.message
        );
      } finally {
        debugModelRoot = prevModelRoot;
      }
      id = id.toString(16) + ":" + json + "\n";
      id = stringToChunk(id);
      request.completedDebugChunks.push(id);
    }
    function outlineDebugModel(request, counter, model) {
      var id = request.nextChunkId++;
      request.pendingDebugChunks++;
      emitOutlinedDebugModelChunk(request, id, counter, model);
      return id;
    }
    function emitTimeOriginChunk(request, timeOrigin) {
      request.pendingDebugChunks++;
      timeOrigin = stringToChunk(":N" + timeOrigin + "\n");
      request.completedDebugChunks.push(timeOrigin);
    }
    function forwardDebugInfo(request$jscomp$1, task, debugInfo) {
      for (var id = task.id, i = 0; i < debugInfo.length; i++) {
        var info = debugInfo[i];
        if ("number" === typeof info.time)
          markOperationEndTime(request$jscomp$1, task, info.time);
        else if ("string" === typeof info.name)
          outlineComponentInfo(request$jscomp$1, info), request$jscomp$1.pendingChunks++, emitDebugChunk(request$jscomp$1, id, info);
        else if (info.awaited) {
          var ioInfo = info.awaited;
          if (!(ioInfo.end <= request$jscomp$1.timeOrigin)) {
            var request = request$jscomp$1, ioInfo$jscomp$0 = ioInfo;
            if (!request.writtenObjects.has(ioInfo$jscomp$0)) {
              request.pendingDebugChunks++;
              var id$jscomp$0 = request.nextChunkId++, owner = ioInfo$jscomp$0.owner;
              null != owner && outlineComponentInfo(request, owner);
              var debugStack = null == ioInfo$jscomp$0.stack && null != ioInfo$jscomp$0.debugStack ? filterStackTrace(
                request,
                parseStackTrace(ioInfo$jscomp$0.debugStack, 1)
              ) : ioInfo$jscomp$0.stack;
              var request$jscomp$0 = request, id$jscomp$1 = id$jscomp$0, value = ioInfo$jscomp$0.value, env = ioInfo$jscomp$0.env, objectLimit = 10;
              debugStack && (objectLimit += debugStack.length);
              var debugIOInfo = {
                name: ioInfo$jscomp$0.name,
                start: ioInfo$jscomp$0.start - request$jscomp$0.timeOrigin,
                end: ioInfo$jscomp$0.end - request$jscomp$0.timeOrigin
              };
              null != env && (debugIOInfo.env = env);
              null != debugStack && (debugIOInfo.stack = debugStack);
              null != owner && (debugIOInfo.owner = owner);
              void 0 !== value && (debugIOInfo.value = value);
              value = serializeDebugModel(
                request$jscomp$0,
                objectLimit,
                debugIOInfo
              );
              id$jscomp$1 = id$jscomp$1.toString(16) + ":J" + value + "\n";
              id$jscomp$1 = stringToChunk(id$jscomp$1);
              request$jscomp$0.completedDebugChunks.push(id$jscomp$1);
              request.writtenDebugObjects.set(
                ioInfo$jscomp$0,
                serializeByValueID(id$jscomp$0)
              );
            }
            null != info.owner && outlineComponentInfo(request$jscomp$1, info.owner);
            request = null == info.stack && null != info.debugStack ? filterStackTrace(
              request$jscomp$1,
              parseStackTrace(info.debugStack, 1)
            ) : info.stack;
            ioInfo = { awaited: ioInfo };
            null != info.env && (ioInfo.env = info.env);
            null != info.owner && (ioInfo.owner = info.owner);
            null != request && (ioInfo.stack = request);
            request$jscomp$1.pendingChunks++;
            emitDebugChunk(request$jscomp$1, id, ioInfo);
          }
        } else
          request$jscomp$1.pendingChunks++, emitDebugChunk(request$jscomp$1, id, info);
      }
    }
    function forwardDebugInfoFromThenable(request, task, thenable) {
      (thenable = thenable._debugInfo) && forwardDebugInfo(request, task, thenable);
    }
    function forwardDebugInfoFromCurrentContext(request, task, thenable) {
      (thenable = thenable._debugInfo) && forwardDebugInfo(request, task, thenable);
    }
    function forwardDebugInfoFromAbortedTask(request, task) {
      var model = task.model;
      "object" === typeof model && null !== model && (model = model._debugInfo) && forwardDebugInfo(request, task, model);
    }
    function emitTimingChunk(request, id, timestamp) {
      request.pendingChunks++;
      var json = '{"time":' + (timestamp - request.timeOrigin) + "}";
      null !== request.debugDestination ? (timestamp = request.nextChunkId++, json = timestamp.toString(16) + ":" + json + "\n", request.pendingDebugChunks++, request.completedDebugChunks.push(stringToChunk(json)), id = id.toString(16) + ':D"$' + timestamp.toString(16) + '"\n', request.completedRegularChunks.push(stringToChunk(id))) : (id = id.toString(16) + ":D" + json + "\n", request.completedRegularChunks.push(stringToChunk(id)));
    }
    function markOperationEndTime(request, task, timestamp) {
      request.status === ABORTING && timestamp > request.abortTime || (timestamp > task.time ? (emitTimingChunk(request, task.id, timestamp), task.time = timestamp) : emitTimingChunk(request, task.id, task.time));
    }
    function emitChunk(request, task, value) {
      var id = task.id;
      "string" === typeof value && null !== byteLengthOfChunk ? emitTextChunk(request, id, value, false) : value instanceof ArrayBuffer ? emitTypedArrayChunk(request, id, "A", new Uint8Array(value), false) : value instanceof Int8Array ? emitTypedArrayChunk(request, id, "O", value, false) : value instanceof Uint8Array ? emitTypedArrayChunk(request, id, "o", value, false) : value instanceof Uint8ClampedArray ? emitTypedArrayChunk(request, id, "U", value, false) : value instanceof Int16Array ? emitTypedArrayChunk(request, id, "S", value, false) : value instanceof Uint16Array ? emitTypedArrayChunk(request, id, "s", value, false) : value instanceof Int32Array ? emitTypedArrayChunk(request, id, "L", value, false) : value instanceof Uint32Array ? emitTypedArrayChunk(request, id, "l", value, false) : value instanceof Float32Array ? emitTypedArrayChunk(request, id, "G", value, false) : value instanceof Float64Array ? emitTypedArrayChunk(request, id, "g", value, false) : value instanceof BigInt64Array ? emitTypedArrayChunk(request, id, "M", value, false) : value instanceof BigUint64Array ? emitTypedArrayChunk(
        request,
        id,
        "m",
        value,
        false
      ) : value instanceof DataView ? emitTypedArrayChunk(
        request,
        id,
        "V",
        value,
        false
      ) : (value = stringify(value, task.toJSON), emitModelChunk(request, task.id, value));
    }
    function erroredTask(request, task, error) {
      task.timed && markOperationEndTime(request, task, performance.now());
      task.status = 4;
      var digest = logRecoverableError(request, error, task);
      emitErrorChunk(request, task.id, digest, error, false, task.debugOwner);
      request.abortableTasks.delete(task);
      callOnAllReadyIfReady(request);
    }
    function retryTask(request, task) {
      if (0 === task.status) {
        var prevCanEmitDebugInfo = canEmitDebugInfo;
        task.status = 5;
        var parentSerializedSize = serializedSize;
        try {
          modelRoot = task.model;
          canEmitDebugInfo = true;
          var resolvedModel = renderModelDestructive(
            request,
            task,
            emptyRoot,
            "",
            task.model
          );
          canEmitDebugInfo = false;
          modelRoot = resolvedModel;
          task.keyPath = null;
          task.implicitSlot = false;
          var currentEnv = (0, request.environmentName)();
          currentEnv !== task.environmentName && (request.pendingChunks++, emitDebugChunk(request, task.id, { env: currentEnv }));
          task.timed && markOperationEndTime(request, task, performance.now());
          if ("object" === typeof resolvedModel && null !== resolvedModel)
            request.writtenObjects.set(
              resolvedModel,
              serializeByValueID(task.id)
            ), emitChunk(request, task, resolvedModel);
          else {
            var json = stringify(resolvedModel);
            emitModelChunk(request, task.id, json);
          }
          task.status = 1;
          request.abortableTasks.delete(task);
          callOnAllReadyIfReady(request);
        } catch (thrownValue) {
          if (request.status === ABORTING)
            if (request.abortableTasks.delete(task), task.status = 0, 21 === request.type)
              haltTask(task), finishHaltedTask(task, request);
            else {
              var errorId = request.fatalError;
              abortTask(task);
              finishAbortedTask(task, request, errorId);
            }
          else {
            var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
            if ("object" === typeof x && null !== x && "function" === typeof x.then) {
              task.status = 0;
              task.thenableState = getThenableStateAfterSuspending();
              var ping = task.ping;
              x.then(ping, ping);
            } else erroredTask(request, task, x);
          }
        } finally {
          canEmitDebugInfo = prevCanEmitDebugInfo, serializedSize = parentSerializedSize;
        }
      }
    }
    function tryStreamTask(request, task) {
      var prevCanEmitDebugInfo = canEmitDebugInfo;
      canEmitDebugInfo = false;
      var parentSerializedSize = serializedSize;
      try {
        emitChunk(request, task, task.model);
      } finally {
        serializedSize = parentSerializedSize, canEmitDebugInfo = prevCanEmitDebugInfo;
      }
    }
    function performWork(request) {
      var prevDispatcher = ReactSharedInternalsServer.H;
      ReactSharedInternalsServer.H = HooksDispatcher;
      var prevRequest = currentRequest;
      currentRequest$1 = currentRequest = request;
      try {
        var pingedTasks = request.pingedTasks;
        request.pingedTasks = [];
        for (var i = 0; i < pingedTasks.length; i++)
          retryTask(request, pingedTasks[i]);
        flushCompletedChunks(request);
      } catch (error) {
        logRecoverableError(request, error, null), fatalError(request, error);
      } finally {
        ReactSharedInternalsServer.H = prevDispatcher, currentRequest$1 = null, currentRequest = prevRequest;
      }
    }
    function abortTask(task) {
      0 === task.status && (task.status = 3);
    }
    function finishAbortedTask(task, request, errorId) {
      3 === task.status && (forwardDebugInfoFromAbortedTask(request, task), task.timed && markOperationEndTime(request, task, request.abortTime), errorId = serializeByValueID(errorId), task = encodeReferenceChunk(request, task.id, errorId), request.completedErrorChunks.push(task));
    }
    function haltTask(task) {
      0 === task.status && (task.status = 3);
    }
    function finishHaltedTask(task, request) {
      3 === task.status && (forwardDebugInfoFromAbortedTask(request, task), request.pendingChunks--);
    }
    function flushCompletedChunks(request) {
      if (null !== request.debugDestination) {
        var debugDestination = request.debugDestination;
        currentView = new Uint8Array(2048);
        writtenBytes = 0;
        try {
          for (var debugChunks = request.completedDebugChunks, i = 0; i < debugChunks.length; i++)
            request.pendingDebugChunks--, writeChunkAndReturn(debugDestination, debugChunks[i]);
          debugChunks.splice(0, i);
        } finally {
          completeWriting(debugDestination);
        }
      }
      debugDestination = request.destination;
      if (null !== debugDestination) {
        currentView = new Uint8Array(2048);
        writtenBytes = 0;
        try {
          var importsChunks = request.completedImportChunks;
          for (debugChunks = 0; debugChunks < importsChunks.length; debugChunks++)
            if (request.pendingChunks--, !writeChunkAndReturn(
              debugDestination,
              importsChunks[debugChunks]
            )) ;
          importsChunks.splice(0, debugChunks);
          var hintChunks = request.completedHintChunks;
          for (debugChunks = 0; debugChunks < hintChunks.length; debugChunks++)
            if (!writeChunkAndReturn(debugDestination, hintChunks[debugChunks])) ;
          hintChunks.splice(0, debugChunks);
          if (null === request.debugDestination) {
            var _debugChunks = request.completedDebugChunks;
            for (debugChunks = 0; debugChunks < _debugChunks.length; debugChunks++)
              if (request.pendingDebugChunks--, !writeChunkAndReturn(
                debugDestination,
                _debugChunks[debugChunks]
              )) ;
            _debugChunks.splice(0, debugChunks);
          }
          var regularChunks = request.completedRegularChunks;
          for (debugChunks = 0; debugChunks < regularChunks.length; debugChunks++)
            if (request.pendingChunks--, !writeChunkAndReturn(
              debugDestination,
              regularChunks[debugChunks]
            )) ;
          regularChunks.splice(0, debugChunks);
          var errorChunks = request.completedErrorChunks;
          for (debugChunks = 0; debugChunks < errorChunks.length; debugChunks++)
            if (request.pendingChunks--, !writeChunkAndReturn(debugDestination, errorChunks[debugChunks])) ;
          errorChunks.splice(0, debugChunks);
        } finally {
          request.flushScheduled = false, completeWriting(debugDestination);
        }
      }
      0 === request.pendingChunks && (importsChunks = request.debugDestination, 0 === request.pendingDebugChunks ? (null !== importsChunks && (importsChunks.close(), request.debugDestination = null), request.status < ABORTING && request.cacheController.abort(
        Error(
          "This render completed successfully. All cacheSignals are now aborted to allow clean up of any unused resources."
        )
      ), null !== request.destination && (request.status = CLOSED, request.destination.close(), request.destination = null), null !== request.debugDestination && (request.debugDestination.close(), request.debugDestination = null)) : null !== importsChunks && null !== request.destination && (request.status = CLOSED, request.destination.close(), request.destination = null));
    }
    function startWork(request) {
      request.flushScheduled = null !== request.destination;
      supportsRequestStorage ? scheduleMicrotask(function() {
        requestStorage.run(request, performWork, request);
      }) : scheduleMicrotask(function() {
        return performWork(request);
      });
      setTimeout(function() {
        10 === request.status && (request.status = 11);
      }, 0);
    }
    function enqueueFlush(request) {
      false !== request.flushScheduled || 0 !== request.pingedTasks.length || null === request.destination && null === request.debugDestination || (request.flushScheduled = true, setTimeout(function() {
        request.flushScheduled = false;
        flushCompletedChunks(request);
      }, 0));
    }
    function callOnAllReadyIfReady(request) {
      0 === request.abortableTasks.size && (request = request.onAllReady, request());
    }
    function startFlowing(request, destination) {
      if (13 === request.status)
        request.status = CLOSED, closeWithError(destination, request.fatalError);
      else if (request.status !== CLOSED && null === request.destination) {
        request.destination = destination;
        try {
          flushCompletedChunks(request);
        } catch (error) {
          logRecoverableError(request, error, null), fatalError(request, error);
        }
      }
    }
    function finishHalt(request, abortedTasks) {
      try {
        abortedTasks.forEach(function(task) {
          return finishHaltedTask(task, request);
        });
        var onAllReady = request.onAllReady;
        onAllReady();
        flushCompletedChunks(request);
      } catch (error) {
        logRecoverableError(request, error, null), fatalError(request, error);
      }
    }
    function finishAbort(request, abortedTasks, errorId) {
      try {
        abortedTasks.forEach(function(task) {
          return finishAbortedTask(task, request, errorId);
        });
        var onAllReady = request.onAllReady;
        onAllReady();
        flushCompletedChunks(request);
      } catch (error) {
        logRecoverableError(request, error, null), fatalError(request, error);
      }
    }
    function abort(request, reason) {
      if (!(11 < request.status))
        try {
          request.status = ABORTING;
          request.abortTime = performance.now();
          request.cacheController.abort(reason);
          var abortableTasks = request.abortableTasks;
          if (0 < abortableTasks.size)
            if (21 === request.type)
              abortableTasks.forEach(function(task) {
                return haltTask(task, request);
              }), setTimeout(function() {
                return finishHalt(request, abortableTasks);
              }, 0);
            else {
              var error = void 0 === reason ? Error(
                "The render was aborted by the server without a reason."
              ) : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error(
                "The render was aborted by the server with a promise."
              ) : reason, digest = logRecoverableError(request, error, null), _errorId2 = request.nextChunkId++;
              request.fatalError = _errorId2;
              request.pendingChunks++;
              emitErrorChunk(request, _errorId2, digest, error, false, null);
              abortableTasks.forEach(function(task) {
                return abortTask(task, request, _errorId2);
              });
              setTimeout(function() {
                return finishAbort(request, abortableTasks, _errorId2);
              }, 0);
            }
          else {
            var onAllReady = request.onAllReady;
            onAllReady();
            flushCompletedChunks(request);
          }
        } catch (error$2) {
          logRecoverableError(request, error$2, null), fatalError(request, error$2);
        }
    }
    function fromHex(str) {
      return parseInt(str, 16);
    }
    function closeDebugChannel(request) {
      var deferredDebugObjects = request.deferredDebugObjects;
      if (null === deferredDebugObjects)
        throw Error(
          "resolveDebugMessage/closeDebugChannel should not be called for a Request that wasn't kept alive. This is a bug in React."
        );
      deferredDebugObjects.retained.forEach(function(value, id) {
        request.pendingDebugChunks--;
        deferredDebugObjects.retained.delete(id);
        deferredDebugObjects.existing.delete(value);
      });
      enqueueFlush(request);
    }
    function resolveServerReference(bundlerConfig, id) {
      var name = "", resolvedModuleData = bundlerConfig[id];
      if (resolvedModuleData) name = resolvedModuleData.name;
      else {
        var idx = id.lastIndexOf("#");
        -1 !== idx && (name = id.slice(idx + 1), resolvedModuleData = bundlerConfig[id.slice(0, idx)]);
        if (!resolvedModuleData)
          throw Error(
            'Could not find the module "' + id + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.'
          );
      }
      return resolvedModuleData.async ? [resolvedModuleData.id, resolvedModuleData.chunks, name, 1] : [resolvedModuleData.id, resolvedModuleData.chunks, name];
    }
    function requireAsyncModule(id) {
      var promise = __vite_rsc_require__(id);
      if ("function" !== typeof promise.then || "fulfilled" === promise.status)
        return null;
      promise.then(
        function(value) {
          promise.status = "fulfilled";
          promise.value = value;
        },
        function(reason) {
          promise.status = "rejected";
          promise.reason = reason;
        }
      );
      return promise;
    }
    function ignoreReject() {
    }
    function preloadModule(metadata2) {
      for (var chunks = metadata2[1], promises = [], i = 0; i < chunks.length; ) {
        var chunkId = chunks[i++];
        chunks[i++];
        var entry = chunkCache.get(chunkId);
        if (void 0 === entry) {
          entry = __webpack_chunk_load__(chunkId);
          promises.push(entry);
          var resolve = chunkCache.set.bind(chunkCache, chunkId, null);
          entry.then(resolve, ignoreReject);
          chunkCache.set(chunkId, entry);
        } else null !== entry && promises.push(entry);
      }
      return 4 === metadata2.length ? 0 === promises.length ? requireAsyncModule(metadata2[0]) : Promise.all(promises).then(function() {
        return requireAsyncModule(metadata2[0]);
      }) : 0 < promises.length ? Promise.all(promises) : null;
    }
    function requireModule2(metadata2) {
      var moduleExports = __vite_rsc_require__(metadata2[0]);
      if (4 === metadata2.length && "function" === typeof moduleExports.then)
        if ("fulfilled" === moduleExports.status)
          moduleExports = moduleExports.value;
        else throw moduleExports.reason;
      if ("*" === metadata2[2]) return moduleExports;
      if ("" === metadata2[2])
        return moduleExports.__esModule ? moduleExports.default : moduleExports;
      if (hasOwnProperty.call(moduleExports, metadata2[2]))
        return moduleExports[metadata2[2]];
    }
    function ReactPromise(status, value, reason) {
      this.status = status;
      this.value = value;
      this.reason = reason;
    }
    function wakeChunk(response, listeners, value, chunk) {
      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        "function" === typeof listener ? listener(value) : fulfillReference(response, listener, value, chunk.reason);
      }
    }
    function rejectChunk(response, listeners, error) {
      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        "function" === typeof listener ? listener(error) : rejectReference(response, listener.handler, error);
      }
    }
    function triggerErrorOnChunk(response, chunk, error) {
      if ("pending" !== chunk.status && "blocked" !== chunk.status)
        chunk.reason.error(error);
      else {
        var listeners = chunk.reason;
        chunk.status = "rejected";
        chunk.reason = error;
        null !== listeners && rejectChunk(response, listeners, error);
      }
    }
    function resolveModelChunk(response, chunk, value, id) {
      if ("pending" !== chunk.status)
        chunk = chunk.reason, "C" === value[0] ? chunk.close("C" === value ? '"$undefined"' : value.slice(1)) : chunk.enqueueModel(value);
      else {
        var resolveListeners = chunk.value, rejectListeners = chunk.reason;
        chunk.status = "resolved_model";
        chunk.value = value;
        chunk.reason = _defineProperty({ id }, RESPONSE_SYMBOL, response);
        if (null !== resolveListeners)
          switch (initializeModelChunk(chunk), chunk.status) {
            case "fulfilled":
              wakeChunk(response, resolveListeners, chunk.value, chunk);
              break;
            case "blocked":
            case "pending":
              if (chunk.value)
                for (value = 0; value < resolveListeners.length; value++)
                  chunk.value.push(resolveListeners[value]);
              else chunk.value = resolveListeners;
              if (chunk.reason) {
                if (rejectListeners)
                  for (value = 0; value < rejectListeners.length; value++)
                    chunk.reason.push(rejectListeners[value]);
              } else chunk.reason = rejectListeners;
              break;
            case "rejected":
              rejectListeners && rejectChunk(response, rejectListeners, chunk.reason);
          }
      }
    }
    function createResolvedIteratorResultChunk(response, value, done) {
      return new ReactPromise(
        "resolved_model",
        (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}",
        _defineProperty({ id: -1 }, RESPONSE_SYMBOL, response)
      );
    }
    function resolveIteratorResultChunk(response, chunk, value, done) {
      resolveModelChunk(
        response,
        chunk,
        (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}",
        -1
      );
    }
    function loadServerReference$1(response, metaData, parentObject, key) {
      function reject(error) {
        var rejectListeners = blockedPromise.reason, erroredPromise = blockedPromise;
        erroredPromise.status = "rejected";
        erroredPromise.value = null;
        erroredPromise.reason = error;
        null !== rejectListeners && rejectChunk(response, rejectListeners, error);
        rejectReference(response, handler2, error);
      }
      var id = metaData.id;
      if ("string" !== typeof id || "then" === key) return null;
      var cachedPromise = metaData.$$promise;
      if (void 0 !== cachedPromise) {
        if ("fulfilled" === cachedPromise.status)
          return cachedPromise = cachedPromise.value, "__proto__" === key ? null : parentObject[key] = cachedPromise;
        initializingHandler ? (id = initializingHandler, id.deps++) : id = initializingHandler = { chunk: null, value: null, reason: null, deps: 1, errored: false };
        cachedPromise.then(
          resolveReference.bind(null, response, id, parentObject, key),
          rejectReference.bind(null, response, id)
        );
        return null;
      }
      var blockedPromise = new ReactPromise("blocked", null, null);
      metaData.$$promise = blockedPromise;
      var serverReference = resolveServerReference(response._bundlerConfig, id);
      cachedPromise = metaData.bound;
      if (id = preloadModule(serverReference))
        cachedPromise instanceof ReactPromise && (id = Promise.all([id, cachedPromise]));
      else if (cachedPromise instanceof ReactPromise)
        id = Promise.resolve(cachedPromise);
      else
        return cachedPromise = requireModule2(serverReference), id = blockedPromise, id.status = "fulfilled", id.value = cachedPromise;
      if (initializingHandler) {
        var handler2 = initializingHandler;
        handler2.deps++;
      } else
        handler2 = initializingHandler = {
          chunk: null,
          value: null,
          reason: null,
          deps: 1,
          errored: false
        };
      id.then(function() {
        var resolvedValue = requireModule2(serverReference);
        if (metaData.bound) {
          var promiseValue = metaData.bound.value;
          promiseValue = isArrayImpl(promiseValue) ? promiseValue.slice(0) : [];
          if (promiseValue.length > MAX_BOUND_ARGS) {
            reject(
              Error(
                "Server Function has too many bound arguments. Received " + promiseValue.length + " but the limit is " + MAX_BOUND_ARGS + "."
              )
            );
            return;
          }
          promiseValue.unshift(null);
          resolvedValue = resolvedValue.bind.apply(resolvedValue, promiseValue);
        }
        promiseValue = blockedPromise.value;
        var initializedPromise = blockedPromise;
        initializedPromise.status = "fulfilled";
        initializedPromise.value = resolvedValue;
        initializedPromise.reason = null;
        null !== promiseValue && wakeChunk(response, promiseValue, resolvedValue, initializedPromise);
        resolveReference(response, handler2, parentObject, key, resolvedValue);
      }, reject);
      return null;
    }
    function reviveModel(response, parentObj, parentKey, value, reference, arrayRoot) {
      if ("string" === typeof value)
        return parseModelString(
          response,
          parentObj,
          parentKey,
          value,
          reference,
          arrayRoot
        );
      if ("object" === typeof value && null !== value)
        if (void 0 !== reference && void 0 !== response._temporaryReferences && response._temporaryReferences.set(value, reference), isArrayImpl(value)) {
          if (null === arrayRoot) {
            var childContext = { count: 0, fork: false };
            response._rootArrayContexts.set(value, childContext);
          } else childContext = arrayRoot;
          1 < value.length && (childContext.fork = true);
          bumpArrayCount(childContext, value.length + 1, response);
          for (parentObj = 0; parentObj < value.length; parentObj++)
            value[parentObj] = reviveModel(
              response,
              value,
              "" + parentObj,
              value[parentObj],
              void 0 !== reference ? reference + ":" + parentObj : void 0,
              childContext
            );
        } else
          for (childContext in value)
            hasOwnProperty.call(value, childContext) && ("__proto__" === childContext ? delete value[childContext] : (parentObj = void 0 !== reference && -1 === childContext.indexOf(":") ? reference + ":" + childContext : void 0, parentObj = reviveModel(
              response,
              value,
              childContext,
              value[childContext],
              parentObj,
              null
            ), void 0 !== parentObj ? value[childContext] = parentObj : delete value[childContext]));
      return value;
    }
    function bumpArrayCount(arrayContext, slots, response) {
      if ((arrayContext.count += slots) > response._arraySizeLimit && arrayContext.fork)
        throw Error(
          "Maximum array nesting exceeded. Large nested arrays can be dangerous. Try adding intermediate objects."
        );
    }
    function initializeModelChunk(chunk) {
      var prevHandler = initializingHandler;
      initializingHandler = null;
      var _chunk$reason = chunk.reason, response = _chunk$reason[RESPONSE_SYMBOL];
      _chunk$reason = _chunk$reason.id;
      _chunk$reason = -1 === _chunk$reason ? void 0 : _chunk$reason.toString(16);
      var resolvedModel = chunk.value;
      chunk.status = "blocked";
      chunk.value = null;
      chunk.reason = null;
      try {
        var rawModel = JSON.parse(resolvedModel);
        resolvedModel = { count: 0, fork: false };
        var value = reviveModel(
          response,
          { "": rawModel },
          "",
          rawModel,
          _chunk$reason,
          resolvedModel
        ), resolveListeners = chunk.value;
        if (null !== resolveListeners)
          for (chunk.value = null, chunk.reason = null, rawModel = 0; rawModel < resolveListeners.length; rawModel++) {
            var listener = resolveListeners[rawModel];
            "function" === typeof listener ? listener(value) : fulfillReference(response, listener, value, resolvedModel);
          }
        if (null !== initializingHandler) {
          if (initializingHandler.errored) throw initializingHandler.reason;
          if (0 < initializingHandler.deps) {
            initializingHandler.value = value;
            initializingHandler.reason = resolvedModel;
            initializingHandler.chunk = chunk;
            return;
          }
        }
        chunk.status = "fulfilled";
        chunk.value = value;
        chunk.reason = resolvedModel;
      } catch (error) {
        chunk.status = "rejected", chunk.reason = error;
      } finally {
        initializingHandler = prevHandler;
      }
    }
    function reportGlobalError(response, error) {
      response._closed = true;
      response._closedReason = error;
      response._chunks.forEach(function(chunk) {
        "pending" === chunk.status ? triggerErrorOnChunk(response, chunk, error) : "fulfilled" === chunk.status && null !== chunk.reason && (chunk = chunk.reason, "function" === typeof chunk.error && chunk.error(error));
      });
    }
    function getChunk(response, id) {
      var chunks = response._chunks, chunk = chunks.get(id);
      chunk || (chunk = response._formData.get(response._prefix + id), chunk = "string" === typeof chunk ? new ReactPromise(
        "resolved_model",
        chunk,
        _defineProperty({ id }, RESPONSE_SYMBOL, response)
      ) : response._closed ? new ReactPromise("rejected", null, response._closedReason) : new ReactPromise("pending", null, null), chunks.set(id, chunk));
      return chunk;
    }
    function fulfillReference(response, reference, value, arrayRoot) {
      var handler2 = reference.handler, parentObject = reference.parentObject, key = reference.key, map = reference.map, path = reference.path;
      try {
        for (var localLength = 0, rootArrayContexts = response._rootArrayContexts, i = 1; i < path.length; i++) {
          var name = path[i];
          if ("object" !== typeof value || null === value || getPrototypeOf(value) !== ObjectPrototype && getPrototypeOf(value) !== ArrayPrototype || !hasOwnProperty.call(value, name))
            throw Error("Invalid reference.");
          value = value[name];
          if (isArrayImpl(value))
            localLength = 0, arrayRoot = rootArrayContexts.get(value) || arrayRoot;
          else if (arrayRoot = null, "string" === typeof value)
            localLength = value.length;
          else if ("bigint" === typeof value) {
            var n = Math.abs(Number(value));
            localLength = 0 === n ? 1 : Math.floor(Math.log10(n)) + 1;
          } else localLength = ArrayBuffer.isView(value) ? value.byteLength : 0;
        }
        var resolvedValue = map(response, value, parentObject, key);
        var referenceArrayRoot = reference.arrayRoot;
        null !== referenceArrayRoot && (null !== arrayRoot ? (arrayRoot.fork && (referenceArrayRoot.fork = true), bumpArrayCount(referenceArrayRoot, arrayRoot.count, response)) : 0 < localLength && bumpArrayCount(referenceArrayRoot, localLength, response));
      } catch (error) {
        rejectReference(response, handler2, error);
        return;
      }
      resolveReference(response, handler2, parentObject, key, resolvedValue);
    }
    function resolveReference(response, handler2, parentObject, key, resolvedValue) {
      "__proto__" !== key && (parentObject[key] = resolvedValue);
      "" === key && null === handler2.value && (handler2.value = resolvedValue);
      handler2.deps--;
      0 === handler2.deps && (parentObject = handler2.chunk, null !== parentObject && "blocked" === parentObject.status && (key = parentObject.value, parentObject.status = "fulfilled", parentObject.value = handler2.value, parentObject.reason = handler2.reason, null !== key && wakeChunk(response, key, handler2.value, parentObject)));
    }
    function rejectReference(response, handler2, error) {
      handler2.errored || (handler2.errored = true, handler2.value = null, handler2.reason = error, handler2 = handler2.chunk, null !== handler2 && "blocked" === handler2.status && triggerErrorOnChunk(response, handler2, error));
    }
    function getOutlinedModel(response, reference, parentObject, key, referenceArrayRoot, map) {
      reference = reference.split(":");
      var id = parseInt(reference[0], 16), chunk = getChunk(response, id);
      switch (chunk.status) {
        case "resolved_model":
          initializeModelChunk(chunk);
      }
      switch (chunk.status) {
        case "fulfilled":
          id = chunk.value;
          chunk = chunk.reason;
          for (var localLength = 0, rootArrayContexts = response._rootArrayContexts, i = 1; i < reference.length; i++) {
            localLength = reference[i];
            if ("object" !== typeof id || null === id || getPrototypeOf(id) !== ObjectPrototype && getPrototypeOf(id) !== ArrayPrototype || !hasOwnProperty.call(id, localLength))
              throw Error("Invalid reference.");
            id = id[localLength];
            isArrayImpl(id) ? (localLength = 0, chunk = rootArrayContexts.get(id) || chunk) : (chunk = null, "string" === typeof id ? localLength = id.length : "bigint" === typeof id ? (localLength = Math.abs(Number(id)), localLength = 0 === localLength ? 1 : Math.floor(Math.log10(localLength)) + 1) : localLength = ArrayBuffer.isView(id) ? id.byteLength : 0);
          }
          parentObject = map(response, id, parentObject, key);
          null !== referenceArrayRoot && (null !== chunk ? (chunk.fork && (referenceArrayRoot.fork = true), bumpArrayCount(referenceArrayRoot, chunk.count, response)) : 0 < localLength && bumpArrayCount(referenceArrayRoot, localLength, response));
          return parentObject;
        case "blocked":
          return initializingHandler ? (response = initializingHandler, response.deps++) : response = initializingHandler = {
            chunk: null,
            value: null,
            reason: null,
            deps: 1,
            errored: false
          }, referenceArrayRoot = {
            handler: response,
            parentObject,
            key,
            map,
            path: reference,
            arrayRoot: referenceArrayRoot
          }, null === chunk.value ? chunk.value = [referenceArrayRoot] : chunk.value.push(referenceArrayRoot), null === chunk.reason ? chunk.reason = [referenceArrayRoot] : chunk.reason.push(referenceArrayRoot), null;
        case "pending":
          throw Error("Invalid forward reference.");
        default:
          return initializingHandler ? (initializingHandler.errored = true, initializingHandler.value = null, initializingHandler.reason = chunk.reason) : initializingHandler = {
            chunk: null,
            value: null,
            reason: chunk.reason,
            deps: 0,
            errored: true
          }, null;
      }
    }
    function createMap(response, model) {
      if (!isArrayImpl(model)) throw Error("Invalid Map initializer.");
      if (true === model.$$consumed) throw Error("Already initialized Map.");
      response = new Map(model);
      model.$$consumed = true;
      return response;
    }
    function createSet(response, model) {
      if (!isArrayImpl(model)) throw Error("Invalid Set initializer.");
      if (true === model.$$consumed) throw Error("Already initialized Set.");
      response = new Set(model);
      model.$$consumed = true;
      return response;
    }
    function extractIterator(response, model) {
      if (!isArrayImpl(model)) throw Error("Invalid Iterator initializer.");
      if (true === model.$$consumed) throw Error("Already initialized Iterator.");
      response = model[Symbol.iterator]();
      model.$$consumed = true;
      return response;
    }
    function createModel(response, model, parentObject, key) {
      return "then" === key && "function" === typeof model ? null : model;
    }
    function parseTypedArray(response, reference, constructor, bytesPerElement, parentObject, parentKey, referenceArrayRoot) {
      function reject(error) {
        if (!handler2.errored) {
          handler2.errored = true;
          handler2.value = null;
          handler2.reason = error;
          var chunk = handler2.chunk;
          null !== chunk && "blocked" === chunk.status && triggerErrorOnChunk(response, chunk, error);
        }
      }
      reference = parseInt(reference.slice(2), 16);
      var key = response._prefix + reference;
      bytesPerElement = response._chunks;
      if (bytesPerElement.has(reference))
        throw Error("Already initialized typed array.");
      bytesPerElement.set(
        reference,
        new ReactPromise(
          "rejected",
          null,
          Error("Already initialized typed array.")
        )
      );
      reference = response._formData.get(key).arrayBuffer();
      if (initializingHandler) {
        var handler2 = initializingHandler;
        handler2.deps++;
      } else
        handler2 = initializingHandler = {
          chunk: null,
          value: null,
          reason: null,
          deps: 1,
          errored: false
        };
      reference.then(function(buffer) {
        try {
          null !== referenceArrayRoot && bumpArrayCount(referenceArrayRoot, buffer.byteLength, response);
          var resolvedValue = constructor === ArrayBuffer ? buffer : new constructor(buffer);
          "__proto__" !== key && (parentObject[parentKey] = resolvedValue);
          "" === parentKey && null === handler2.value && (handler2.value = resolvedValue);
        } catch (x) {
          reject(x);
          return;
        }
        handler2.deps--;
        0 === handler2.deps && (buffer = handler2.chunk, null !== buffer && "blocked" === buffer.status && (resolvedValue = buffer.value, buffer.status = "fulfilled", buffer.value = handler2.value, buffer.reason = null, null !== resolvedValue && wakeChunk(response, resolvedValue, handler2.value, buffer)));
      }, reject);
      return null;
    }
    function resolveStream(response, id, stream, controller) {
      var chunks = response._chunks;
      stream = new ReactPromise("fulfilled", stream, controller);
      chunks.set(id, stream);
      response = response._formData.getAll(response._prefix + id);
      for (id = 0; id < response.length; id++)
        chunks = response[id], "string" === typeof chunks && ("C" === chunks[0] ? controller.close(
          "C" === chunks ? '"$undefined"' : chunks.slice(1)
        ) : controller.enqueueModel(chunks));
    }
    function parseReadableStream(response, reference, type) {
      function enqueue(value) {
        "bytes" !== type || ArrayBuffer.isView(value) ? controller.enqueue(value) : flightController.error(Error("Invalid data for bytes stream."));
      }
      reference = parseInt(reference.slice(2), 16);
      if (response._chunks.has(reference))
        throw Error("Already initialized stream.");
      var controller = null, closed = false, stream = new ReadableStream({
        type,
        start: function(c) {
          controller = c;
        }
      }), previousBlockedChunk = null, flightController = {
        enqueueModel: function(json) {
          if (null === previousBlockedChunk) {
            var chunk = new ReactPromise(
              "resolved_model",
              json,
              _defineProperty({ id: -1 }, RESPONSE_SYMBOL, response)
            );
            initializeModelChunk(chunk);
            "fulfilled" === chunk.status ? enqueue(chunk.value) : (chunk.then(enqueue, flightController.error), previousBlockedChunk = chunk);
          } else {
            chunk = previousBlockedChunk;
            var _chunk = new ReactPromise("pending", null, null);
            _chunk.then(enqueue, flightController.error);
            previousBlockedChunk = _chunk;
            chunk.then(function() {
              previousBlockedChunk === _chunk && (previousBlockedChunk = null);
              resolveModelChunk(response, _chunk, json, -1);
            });
          }
        },
        close: function() {
          if (!closed)
            if (closed = true, null === previousBlockedChunk)
              controller.close();
            else {
              var blockedChunk = previousBlockedChunk;
              previousBlockedChunk = null;
              blockedChunk.then(function() {
                return controller.close();
              });
            }
        },
        error: function(error) {
          if (!closed)
            if (closed = true, null === previousBlockedChunk)
              controller.error(error);
            else {
              var blockedChunk = previousBlockedChunk;
              previousBlockedChunk = null;
              blockedChunk.then(function() {
                return controller.error(error);
              });
            }
        }
      };
      resolveStream(response, reference, stream, flightController);
      return stream;
    }
    function FlightIterator(next) {
      this.next = next;
    }
    function parseAsyncIterable(response, reference, iterator) {
      reference = parseInt(reference.slice(2), 16);
      if (response._chunks.has(reference))
        throw Error("Already initialized stream.");
      var buffer = [], closed = false, nextWriteIndex = 0, iterable = _defineProperty({}, ASYNC_ITERATOR, function() {
        var nextReadIndex = 0;
        return new FlightIterator(function(arg) {
          if (void 0 !== arg)
            throw Error(
              "Values cannot be passed to next() of AsyncIterables passed to Client Components."
            );
          if (nextReadIndex === buffer.length) {
            if (closed)
              return new ReactPromise(
                "fulfilled",
                { done: true, value: void 0 },
                null
              );
            buffer[nextReadIndex] = new ReactPromise("pending", null, null);
          }
          return buffer[nextReadIndex++];
        });
      });
      iterator = iterator ? iterable[ASYNC_ITERATOR]() : iterable;
      resolveStream(response, reference, iterator, {
        enqueueModel: function(value) {
          nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
            response,
            value,
            false
          ) : resolveIteratorResultChunk(
            response,
            buffer[nextWriteIndex],
            value,
            false
          );
          nextWriteIndex++;
        },
        close: function(value) {
          if (!closed)
            for (closed = true, nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
              response,
              value,
              true
            ) : resolveIteratorResultChunk(
              response,
              buffer[nextWriteIndex],
              value,
              true
            ), nextWriteIndex++; nextWriteIndex < buffer.length; )
              resolveIteratorResultChunk(
                response,
                buffer[nextWriteIndex++],
                '"$undefined"',
                true
              );
        },
        error: function(error) {
          if (!closed)
            for (closed = true, nextWriteIndex === buffer.length && (buffer[nextWriteIndex] = new ReactPromise(
              "pending",
              null,
              null
            )); nextWriteIndex < buffer.length; )
              triggerErrorOnChunk(response, buffer[nextWriteIndex++], error);
        }
      });
      return iterator;
    }
    function parseModelString(response, obj, key, value, reference, arrayRoot) {
      if ("$" === value[0]) {
        switch (value[1]) {
          case "$":
            return null !== arrayRoot && bumpArrayCount(arrayRoot, value.length - 1, response), value.slice(1);
          case "@":
            return obj = parseInt(value.slice(2), 16), getChunk(response, obj);
          case "h":
            return arrayRoot = value.slice(2), getOutlinedModel(
              response,
              arrayRoot,
              obj,
              key,
              null,
              loadServerReference$1
            );
          case "T":
            if (void 0 === reference || void 0 === response._temporaryReferences)
              throw Error(
                "Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server."
              );
            return createTemporaryReference(
              response._temporaryReferences,
              reference
            );
          case "Q":
            return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, createMap);
          case "W":
            return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, createSet);
          case "K":
            obj = value.slice(2);
            obj = response._prefix + obj + "_";
            key = new FormData();
            response = response._formData;
            arrayRoot = Array.from(response.keys());
            for (value = 0; value < arrayRoot.length; value++)
              if (reference = arrayRoot[value], reference.startsWith(obj)) {
                for (var entries = response.getAll(reference), newKey = reference.slice(obj.length), j = 0; j < entries.length; j++)
                  key.append(newKey, entries[j]);
                response.delete(reference);
              }
            return key;
          case "i":
            return arrayRoot = value.slice(2), getOutlinedModel(
              response,
              arrayRoot,
              obj,
              key,
              null,
              extractIterator
            );
          case "I":
            return Infinity;
          case "-":
            return "$-0" === value ? -0 : -Infinity;
          case "N":
            return NaN;
          case "u":
            return;
          case "D":
            return new Date(Date.parse(value.slice(2)));
          case "n":
            obj = value.slice(2);
            if (obj.length > MAX_BIGINT_DIGITS)
              throw Error(
                "BigInt is too large. Received " + obj.length + " digits but the limit is " + MAX_BIGINT_DIGITS + "."
              );
            null !== arrayRoot && bumpArrayCount(arrayRoot, obj.length, response);
            return BigInt(obj);
          case "A":
            return parseTypedArray(
              response,
              value,
              ArrayBuffer,
              1,
              obj,
              key,
              arrayRoot
            );
          case "O":
            return parseTypedArray(
              response,
              value,
              Int8Array,
              1,
              obj,
              key,
              arrayRoot
            );
          case "o":
            return parseTypedArray(
              response,
              value,
              Uint8Array,
              1,
              obj,
              key,
              arrayRoot
            );
          case "U":
            return parseTypedArray(
              response,
              value,
              Uint8ClampedArray,
              1,
              obj,
              key,
              arrayRoot
            );
          case "S":
            return parseTypedArray(
              response,
              value,
              Int16Array,
              2,
              obj,
              key,
              arrayRoot
            );
          case "s":
            return parseTypedArray(
              response,
              value,
              Uint16Array,
              2,
              obj,
              key,
              arrayRoot
            );
          case "L":
            return parseTypedArray(
              response,
              value,
              Int32Array,
              4,
              obj,
              key,
              arrayRoot
            );
          case "l":
            return parseTypedArray(
              response,
              value,
              Uint32Array,
              4,
              obj,
              key,
              arrayRoot
            );
          case "G":
            return parseTypedArray(
              response,
              value,
              Float32Array,
              4,
              obj,
              key,
              arrayRoot
            );
          case "g":
            return parseTypedArray(
              response,
              value,
              Float64Array,
              8,
              obj,
              key,
              arrayRoot
            );
          case "M":
            return parseTypedArray(
              response,
              value,
              BigInt64Array,
              8,
              obj,
              key,
              arrayRoot
            );
          case "m":
            return parseTypedArray(
              response,
              value,
              BigUint64Array,
              8,
              obj,
              key,
              arrayRoot
            );
          case "V":
            return parseTypedArray(
              response,
              value,
              DataView,
              1,
              obj,
              key,
              arrayRoot
            );
          case "B":
            return obj = parseInt(value.slice(2), 16), response._formData.get(response._prefix + obj);
          case "R":
            return parseReadableStream(response, value, void 0);
          case "r":
            return parseReadableStream(response, value, "bytes");
          case "X":
            return parseAsyncIterable(response, value, false);
          case "x":
            return parseAsyncIterable(response, value, true);
        }
        value = value.slice(1);
        return getOutlinedModel(
          response,
          value,
          obj,
          key,
          arrayRoot,
          createModel
        );
      }
      null !== arrayRoot && bumpArrayCount(arrayRoot, value.length, response);
      return value;
    }
    function createResponse(bundlerConfig, formFieldPrefix, temporaryReferences) {
      var backingFormData = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : new FormData(), arraySizeLimit = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1e6, chunks = /* @__PURE__ */ new Map();
      return {
        _bundlerConfig: bundlerConfig,
        _prefix: formFieldPrefix,
        _formData: backingFormData,
        _chunks: chunks,
        _closed: false,
        _closedReason: null,
        _temporaryReferences: temporaryReferences,
        _rootArrayContexts: /* @__PURE__ */ new WeakMap(),
        _arraySizeLimit: arraySizeLimit
      };
    }
    function close(response) {
      reportGlobalError(response, Error("Connection closed."));
    }
    function loadServerReference(bundlerConfig, metaData) {
      var id = metaData.id;
      if ("string" !== typeof id) return null;
      var serverReference = resolveServerReference(bundlerConfig, id);
      bundlerConfig = preloadModule(serverReference);
      metaData = metaData.bound;
      return metaData instanceof Promise ? Promise.all([metaData, bundlerConfig]).then(function(_ref) {
        _ref = _ref[0];
        var fn = requireModule2(serverReference);
        if (_ref.length > MAX_BOUND_ARGS)
          throw Error(
            "Server Function has too many bound arguments. Received " + _ref.length + " but the limit is " + MAX_BOUND_ARGS + "."
          );
        return fn.bind.apply(fn, [null].concat(_ref));
      }) : bundlerConfig ? Promise.resolve(bundlerConfig).then(function() {
        return requireModule2(serverReference);
      }) : Promise.resolve(requireModule2(serverReference));
    }
    function decodeBoundActionMetaData(body, serverManifest, formFieldPrefix, arraySizeLimit) {
      body = createResponse(
        serverManifest,
        formFieldPrefix,
        void 0,
        body,
        arraySizeLimit
      );
      close(body);
      body = getChunk(body, 0);
      body.then(function() {
      });
      if ("fulfilled" !== body.status) throw body.reason;
      return body.value;
    }
    function startReadingFromDebugChannelReadableStream(request$jscomp$0, stream) {
      function progress(_ref) {
        var done = _ref.done, buffer = _ref.value;
        _ref = stringBuffer;
        done ? (buffer = new Uint8Array(0), buffer = stringDecoder.decode(buffer)) : buffer = stringDecoder.decode(buffer, decoderOptions);
        stringBuffer = _ref + buffer;
        _ref = stringBuffer.split("\n");
        for (buffer = 0; buffer < _ref.length - 1; buffer++) {
          var request = request$jscomp$0, message = _ref[buffer], deferredDebugObjects = request.deferredDebugObjects;
          if (null === deferredDebugObjects)
            throw Error(
              "resolveDebugMessage/closeDebugChannel should not be called for a Request that wasn't kept alive. This is a bug in React."
            );
          if ("" === message) closeDebugChannel(request);
          else {
            var command = message.charCodeAt(0);
            message = message.slice(2).split(",").map(fromHex);
            switch (command) {
              case 82:
                for (command = 0; command < message.length; command++) {
                  var id = message[command], retainedValue = deferredDebugObjects.retained.get(id);
                  void 0 !== retainedValue && (request.pendingDebugChunks--, deferredDebugObjects.retained.delete(id), deferredDebugObjects.existing.delete(retainedValue), enqueueFlush(request));
                }
                break;
              case 81:
                for (command = 0; command < message.length; command++)
                  id = message[command], retainedValue = deferredDebugObjects.retained.get(id), void 0 !== retainedValue && (deferredDebugObjects.retained.delete(id), deferredDebugObjects.existing.delete(retainedValue), emitOutlinedDebugModelChunk(
                    request,
                    id,
                    { objectLimit: 10 },
                    retainedValue
                  ), enqueueFlush(request));
                break;
              case 80:
                for (command = 0; command < message.length; command++)
                  id = message[command], retainedValue = deferredDebugObjects.retained.get(id), void 0 !== retainedValue && (deferredDebugObjects.retained.delete(id), emitRequestedDebugThenable(
                    request,
                    id,
                    { objectLimit: 10 },
                    retainedValue
                  ));
                break;
              default:
                throw Error(
                  "Unknown command. The debugChannel was not wired up properly."
                );
            }
          }
        }
        stringBuffer = _ref[_ref.length - 1];
        if (done) closeDebugChannel(request$jscomp$0);
        else return reader.read().then(progress).catch(error);
      }
      function error(e) {
        abort(
          request$jscomp$0,
          Error("Lost connection to the Debug Channel.", { cause: e })
        );
      }
      var reader = stream.getReader(), stringDecoder = new TextDecoder(), stringBuffer = "";
      reader.read().then(progress).catch(error);
    }
    var ReactDOM = requireReactDom_reactServer(), React2 = requireReact_reactServer(), REACT_LEGACY_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element"), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_MEMO_CACHE_SENTINEL = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator, ASYNC_ITERATOR = Symbol.asyncIterator, LocalPromise = Promise, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : function(callback) {
      LocalPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
    }, currentView = null, writtenBytes = 0, textEncoder = new TextEncoder(), CLIENT_REFERENCE_TAG$1 = /* @__PURE__ */ Symbol.for("react.client.reference"), SERVER_REFERENCE_TAG = /* @__PURE__ */ Symbol.for("react.server.reference"), FunctionBind = Function.prototype.bind, ArraySlice = Array.prototype.slice, serverReferenceToString = {
      value: function() {
        return "function () { [omitted code] }";
      },
      configurable: true,
      writable: true
    }, PROMISE_PROTOTYPE = Promise.prototype, deepProxyHandlers = {
      get: function(target, name) {
        switch (name) {
          case "$$typeof":
            return target.$$typeof;
          case "$$id":
            return target.$$id;
          case "$$async":
            return target.$$async;
          case "name":
            return target.name;
          case "displayName":
            return;
          case "defaultProps":
            return;
          case "_debugInfo":
            return;
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "Provider":
            throw Error(
              "Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider."
            );
          case "then":
            throw Error(
              "Cannot await or return from a thenable. You cannot await a client module from a server component."
            );
        }
        throw Error(
          "Cannot access " + (String(target.name) + "." + String(name)) + " on the server. You cannot dot into a client module from a server component. You can only pass the imported name through."
        );
      },
      set: function() {
        throw Error("Cannot assign to a client module from a server module.");
      }
    }, proxyHandlers$1 = {
      get: function(target, name) {
        return getReference(target, name);
      },
      getOwnPropertyDescriptor: function(target, name) {
        var descriptor = Object.getOwnPropertyDescriptor(target, name);
        descriptor || (descriptor = {
          value: getReference(target, name),
          writable: false,
          configurable: false,
          enumerable: false
        }, Object.defineProperty(target, name, descriptor));
        return descriptor;
      },
      getPrototypeOf: function() {
        return PROMISE_PROTOTYPE;
      },
      set: function() {
        throw Error("Cannot assign to a client module from a server module.");
      }
    }, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, previousDispatcher = ReactDOMSharedInternals.d;
    ReactDOMSharedInternals.d = {
      f: previousDispatcher.f,
      r: previousDispatcher.r,
      D: function(href) {
        if ("string" === typeof href && href) {
          var request = resolveRequest();
          if (request) {
            var hints = request.hints, key = "D|" + href;
            hints.has(key) || (hints.add(key), emitHint(request, "D", href));
          } else previousDispatcher.D(href);
        }
      },
      C: function(href, crossOrigin) {
        if ("string" === typeof href) {
          var request = resolveRequest();
          if (request) {
            var hints = request.hints, key = "C|" + (null == crossOrigin ? "null" : crossOrigin) + "|" + href;
            hints.has(key) || (hints.add(key), "string" === typeof crossOrigin ? emitHint(request, "C", [href, crossOrigin]) : emitHint(request, "C", href));
          } else previousDispatcher.C(href, crossOrigin);
        }
      },
      L: preload,
      m: preloadModule$1,
      X: function(src, options) {
        if ("string" === typeof src) {
          var request = resolveRequest();
          if (request) {
            var hints = request.hints, key = "X|" + src;
            if (hints.has(key)) return;
            hints.add(key);
            return (options = trimOptions(options)) ? emitHint(request, "X", [src, options]) : emitHint(request, "X", src);
          }
          previousDispatcher.X(src, options);
        }
      },
      S: function(href, precedence, options) {
        if ("string" === typeof href) {
          var request = resolveRequest();
          if (request) {
            var hints = request.hints, key = "S|" + href;
            if (hints.has(key)) return;
            hints.add(key);
            return (options = trimOptions(options)) ? emitHint(request, "S", [
              href,
              "string" === typeof precedence ? precedence : 0,
              options
            ]) : "string" === typeof precedence ? emitHint(request, "S", [href, precedence]) : emitHint(request, "S", href);
          }
          previousDispatcher.S(href, precedence, options);
        }
      },
      M: function(src, options) {
        if ("string" === typeof src) {
          var request = resolveRequest();
          if (request) {
            var hints = request.hints, key = "M|" + src;
            if (hints.has(key)) return;
            hints.add(key);
            return (options = trimOptions(options)) ? emitHint(request, "M", [src, options]) : emitHint(request, "M", src);
          }
          previousDispatcher.M(src, options);
        }
      }
    };
    var framesToSkip = 0, collectedStackTrace = null, identifierRegExp = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/, frameRegExp = /^ {3} at (?:(.+) \((?:(.+):(\d+):(\d+)|<anonymous>)\)|(?:async )?(.+):(\d+):(\d+)|<anonymous>)$/, stackTraceCache = /* @__PURE__ */ new WeakMap(), supportsRequestStorage = "function" === typeof AsyncLocalStorage, requestStorage = supportsRequestStorage ? new AsyncLocalStorage() : null, supportsComponentStorage = supportsRequestStorage, componentStorage = supportsComponentStorage ? new AsyncLocalStorage() : null, TEMPORARY_REFERENCE_TAG = /* @__PURE__ */ Symbol.for("react.temporary.reference"), proxyHandlers = {
      get: function(target, name) {
        switch (name) {
          case "$$typeof":
            return target.$$typeof;
          case "name":
            return;
          case "displayName":
            return;
          case "defaultProps":
            return;
          case "_debugInfo":
            return;
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "Provider":
            throw Error(
              "Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider."
            );
          case "then":
            return;
        }
        throw Error(
          "Cannot access " + String(name) + " on the server. You cannot dot into a temporary client reference from a server component. You can only pass the value through to the client."
        );
      },
      set: function() {
        throw Error(
          "Cannot assign to a temporary client reference from a server module."
        );
      }
    }, SuspenseException = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
    ), suspendedThenable = null, currentRequest$1 = null, thenableIndexCounter = 0, thenableState = null, currentComponentDebugInfo = null, HooksDispatcher = {
      readContext: unsupportedContext,
      use: function(usable) {
        if (null !== usable && "object" === typeof usable || "function" === typeof usable) {
          if ("function" === typeof usable.then) {
            var index = thenableIndexCounter;
            thenableIndexCounter += 1;
            null === thenableState && (thenableState = []);
            return trackUsedThenable(thenableState, usable, index);
          }
          usable.$$typeof === REACT_CONTEXT_TYPE && unsupportedContext();
        }
        if (isClientReference(usable)) {
          if (null != usable.value && usable.value.$$typeof === REACT_CONTEXT_TYPE)
            throw Error(
              "Cannot read a Client Context from a Server Component."
            );
          throw Error("Cannot use() an already resolved Client Reference.");
        }
        throw Error(
          "An unsupported type was passed to use(): " + String(usable)
        );
      },
      useCallback: function(callback) {
        return callback;
      },
      useContext: unsupportedContext,
      useEffect: unsupportedHook,
      useImperativeHandle: unsupportedHook,
      useLayoutEffect: unsupportedHook,
      useInsertionEffect: unsupportedHook,
      useMemo: function(nextCreate) {
        return nextCreate();
      },
      useReducer: unsupportedHook,
      useRef: unsupportedHook,
      useState: unsupportedHook,
      useDebugValue: function() {
      },
      useDeferredValue: unsupportedHook,
      useTransition: unsupportedHook,
      useSyncExternalStore: unsupportedHook,
      useId: function() {
        if (null === currentRequest$1)
          throw Error("useId can only be used while React is rendering");
        var id = currentRequest$1.identifierCount++;
        return "_" + currentRequest$1.identifierPrefix + "S_" + id.toString(32) + "_";
      },
      useHostTransitionStatus: unsupportedHook,
      useFormState: unsupportedHook,
      useActionState: unsupportedHook,
      useOptimistic: unsupportedHook,
      useMemoCache: function(size) {
        for (var data = Array(size), i = 0; i < size; i++)
          data[i] = REACT_MEMO_CACHE_SENTINEL;
        return data;
      },
      useCacheRefresh: function() {
        return unsupportedRefresh;
      }
    };
    HooksDispatcher.useEffectEvent = unsupportedHook;
    var currentOwner = null, DefaultAsyncDispatcher = {
      getCacheForType: function(resourceType) {
        var cache = (cache = resolveRequest()) ? cache.cache : /* @__PURE__ */ new Map();
        var entry = cache.get(resourceType);
        void 0 === entry && (entry = resourceType(), cache.set(resourceType, entry));
        return entry;
      },
      cacheSignal: function() {
        var request = resolveRequest();
        return request ? request.cacheController.signal : null;
      }
    };
    DefaultAsyncDispatcher.getOwner = resolveOwner;
    var ReactSharedInternalsServer = React2.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    if (!ReactSharedInternalsServer)
      throw Error(
        'The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.'
      );
    var prefix, suffix;
    var lastResetTime = 0;
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var localPerformance = performance;
      var getCurrentTime = function() {
        return localPerformance.now();
      };
    } else {
      var localDate = Date;
      getCurrentTime = function() {
        return localDate.now();
      };
    }
    var callComponent = {
      react_stack_bottom_frame: function(Component, props, componentDebugInfo) {
        currentOwner = componentDebugInfo;
        try {
          return Component(props, void 0);
        } finally {
          currentOwner = null;
        }
      }
    }, callComponentInDEV = callComponent.react_stack_bottom_frame.bind(callComponent), callLazyInit = {
      react_stack_bottom_frame: function(lazy) {
        var init2 = lazy._init;
        return init2(lazy._payload);
      }
    }, callLazyInitInDEV = callLazyInit.react_stack_bottom_frame.bind(callLazyInit), callIterator = {
      react_stack_bottom_frame: function(iterator, progress, error) {
        iterator.next().then(progress, error);
      }
    }, callIteratorInDEV = callIterator.react_stack_bottom_frame.bind(callIterator), isArrayImpl = Array.isArray, getPrototypeOf = Object.getPrototypeOf, jsxPropsParents = /* @__PURE__ */ new WeakMap(), jsxChildrenParents = /* @__PURE__ */ new WeakMap(), CLIENT_REFERENCE_TAG = /* @__PURE__ */ Symbol.for("react.client.reference"), hasOwnProperty = Object.prototype.hasOwnProperty, doNotLimit = /* @__PURE__ */ new WeakSet();
    "object" === typeof console && null !== console && (patchConsole(console, "assert"), patchConsole(console, "debug"), patchConsole(console, "dir"), patchConsole(console, "dirxml"), patchConsole(console, "error"), patchConsole(console, "group"), patchConsole(console, "groupCollapsed"), patchConsole(console, "groupEnd"), patchConsole(console, "info"), patchConsole(console, "log"), patchConsole(console, "table"), patchConsole(console, "trace"), patchConsole(console, "warn"));
    var ObjectPrototype$1 = Object.prototype, stringify = JSON.stringify, ABORTING = 12, CLOSED = 14, defaultPostponeHandler = noop, currentRequest = null, canEmitDebugInfo = false, serializedSize = 0, MAX_ROW_SIZE = 3200, modelRoot = false, CONSTRUCTOR_MARKER = /* @__PURE__ */ Symbol(), debugModelRoot = null, debugNoOutline = null, emptyRoot = {}, decoderOptions = { stream: true }, chunkCache = /* @__PURE__ */ new Map(), RESPONSE_SYMBOL = /* @__PURE__ */ Symbol();
    ReactPromise.prototype = Object.create(Promise.prototype);
    ReactPromise.prototype.then = function(resolve, reject) {
      switch (this.status) {
        case "resolved_model":
          initializeModelChunk(this);
      }
      switch (this.status) {
        case "fulfilled":
          if ("function" === typeof resolve) {
            for (var inspectedValue = this.value, cycleProtection = 0, visited = /* @__PURE__ */ new Set(); inspectedValue instanceof ReactPromise; ) {
              cycleProtection++;
              if (inspectedValue === this || visited.has(inspectedValue) || 1e3 < cycleProtection) {
                "function" === typeof reject && reject(Error("Cannot have cyclic thenables."));
                return;
              }
              visited.add(inspectedValue);
              if ("fulfilled" === inspectedValue.status)
                inspectedValue = inspectedValue.value;
              else break;
            }
            resolve(this.value);
          }
          break;
        case "pending":
        case "blocked":
          "function" === typeof resolve && (null === this.value && (this.value = []), this.value.push(resolve));
          "function" === typeof reject && (null === this.reason && (this.reason = []), this.reason.push(reject));
          break;
        default:
          "function" === typeof reject && reject(this.reason);
      }
    };
    var ObjectPrototype = Object.prototype, ArrayPrototype = Array.prototype, initializingHandler = null;
    FlightIterator.prototype = {};
    FlightIterator.prototype[ASYNC_ITERATOR] = function() {
      return this;
    };
    var MAX_BIGINT_DIGITS = 300, MAX_BOUND_ARGS = 1e3;
    reactServerDomWebpackServer_edge_development.createClientModuleProxy = function(moduleId) {
      moduleId = registerClientReferenceImpl({}, moduleId, false);
      return new Proxy(moduleId, proxyHandlers$1);
    };
    reactServerDomWebpackServer_edge_development.createTemporaryReferenceSet = function() {
      return /* @__PURE__ */ new WeakMap();
    };
    reactServerDomWebpackServer_edge_development.decodeAction = function(body, serverManifest) {
      var formData = new FormData(), action = null, seenActions = /* @__PURE__ */ new Set();
      body.forEach(function(value, key) {
        key.startsWith("$ACTION_") ? key.startsWith("$ACTION_REF_") ? seenActions.has(key) || (seenActions.add(key), value = "$ACTION_" + key.slice(12) + ":", value = decodeBoundActionMetaData(body, serverManifest, value), action = loadServerReference(serverManifest, value)) : key.startsWith("$ACTION_ID_") && !seenActions.has(key) && (seenActions.add(key), value = key.slice(11), action = loadServerReference(serverManifest, {
          id: value,
          bound: null
        })) : formData.append(key, value);
      });
      return null === action ? null : action.then(function(fn) {
        return fn.bind(null, formData);
      });
    };
    reactServerDomWebpackServer_edge_development.decodeFormState = function(actionResult, body, serverManifest) {
      var keyPath = body.get("$ACTION_KEY");
      if ("string" !== typeof keyPath) return Promise.resolve(null);
      var metaData = null;
      body.forEach(function(value, key) {
        key.startsWith("$ACTION_REF_") && (value = "$ACTION_" + key.slice(12) + ":", metaData = decodeBoundActionMetaData(body, serverManifest, value));
      });
      if (null === metaData) return Promise.resolve(null);
      var referenceId = metaData.id;
      return Promise.resolve(metaData.bound).then(function(bound) {
        return null === bound ? null : [actionResult, keyPath, referenceId, bound.length - 1];
      });
    };
    reactServerDomWebpackServer_edge_development.decodeReply = function(body, webpackMap, options) {
      if ("string" === typeof body) {
        var form = new FormData();
        form.append("0", body);
        body = form;
      }
      body = createResponse(
        webpackMap,
        "",
        options ? options.temporaryReferences : void 0,
        body,
        options ? options.arraySizeLimit : void 0
      );
      webpackMap = getChunk(body, 0);
      close(body);
      return webpackMap;
    };
    reactServerDomWebpackServer_edge_development.decodeReplyFromAsyncIterable = function(iterable, webpackMap, options) {
      function progress(entry) {
        if (entry.done) close(response$jscomp$0);
        else {
          entry = entry.value;
          var name = entry[0];
          entry = entry[1];
          if ("string" === typeof entry) {
            var response = response$jscomp$0;
            response._formData.append(name, entry);
            var prefix2 = response._prefix;
            if (name.startsWith(prefix2)) {
              var chunks = response._chunks;
              name = +name.slice(prefix2.length);
              (chunks = chunks.get(name)) && resolveModelChunk(response, chunks, entry, name);
            }
          } else response$jscomp$0._formData.append(name, entry);
          iterator.next().then(progress, error);
        }
      }
      function error(reason) {
        reportGlobalError(response$jscomp$0, reason);
        "function" === typeof iterator.throw && iterator.throw(reason).then(error, error);
      }
      var iterator = iterable[ASYNC_ITERATOR](), response$jscomp$0 = createResponse(
        webpackMap,
        "",
        options ? options.temporaryReferences : void 0,
        void 0,
        options ? options.arraySizeLimit : void 0
      );
      iterator.next().then(progress, error);
      return getChunk(response$jscomp$0, 0);
    };
    reactServerDomWebpackServer_edge_development.prerender = function(model, webpackMap, options) {
      return new Promise(function(resolve, reject) {
        var request = createPrerenderRequest(
          model,
          webpackMap,
          function() {
            var stream = new ReadableStream(
              {
                type: "bytes",
                pull: function(controller) {
                  startFlowing(request, controller);
                },
                cancel: function(reason) {
                  request.destination = null;
                  abort(request, reason);
                }
              },
              { highWaterMark: 0 }
            );
            resolve({ prelude: stream });
          },
          reject,
          options ? options.onError : void 0,
          options ? options.identifierPrefix : void 0,
          options ? options.onPostpone : void 0,
          options ? options.temporaryReferences : void 0,
          options ? options.environmentName : void 0,
          options ? options.filterStackFrame : void 0,
          false
        );
        if (options && options.signal) {
          var signal = options.signal;
          if (signal.aborted) abort(request, signal.reason);
          else {
            var listener = function() {
              abort(request, signal.reason);
              signal.removeEventListener("abort", listener);
            };
            signal.addEventListener("abort", listener);
          }
        }
        startWork(request);
      });
    };
    reactServerDomWebpackServer_edge_development.registerClientReference = function(proxyImplementation, id, exportName) {
      return registerClientReferenceImpl(
        proxyImplementation,
        id + "#" + exportName,
        false
      );
    };
    reactServerDomWebpackServer_edge_development.registerServerReference = function(reference, id, exportName) {
      return Object.defineProperties(reference, {
        $$typeof: { value: SERVER_REFERENCE_TAG },
        $$id: {
          value: null === exportName ? id : id + "#" + exportName,
          configurable: true
        },
        $$bound: { value: null, configurable: true },
        $$location: { value: Error("react-stack-top-frame"), configurable: true },
        bind: { value: bind, configurable: true },
        toString: serverReferenceToString
      });
    };
    reactServerDomWebpackServer_edge_development.renderToReadableStream = function(model, webpackMap, options) {
      var debugChannelReadable = options && options.debugChannel ? options.debugChannel.readable : void 0, debugChannelWritable = options && options.debugChannel ? options.debugChannel.writable : void 0, request = createRequest(
        model,
        webpackMap,
        options ? options.onError : void 0,
        options ? options.identifierPrefix : void 0,
        options ? options.onPostpone : void 0,
        options ? options.temporaryReferences : void 0,
        options ? options.environmentName : void 0,
        options ? options.filterStackFrame : void 0,
        void 0 !== debugChannelReadable
      );
      if (options && options.signal) {
        var signal = options.signal;
        if (signal.aborted) abort(request, signal.reason);
        else {
          var listener = function() {
            abort(request, signal.reason);
            signal.removeEventListener("abort", listener);
          };
          signal.addEventListener("abort", listener);
        }
      }
      void 0 !== debugChannelWritable && new ReadableStream(
        {
          type: "bytes",
          pull: function(controller) {
            if (13 === request.status)
              request.status = CLOSED, closeWithError(controller, request.fatalError);
            else if (request.status !== CLOSED && null === request.debugDestination) {
              request.debugDestination = controller;
              try {
                flushCompletedChunks(request);
              } catch (error) {
                logRecoverableError(request, error, null), fatalError(request, error);
              }
            }
          }
        },
        { highWaterMark: 0 }
      ).pipeTo(debugChannelWritable);
      void 0 !== debugChannelReadable && startReadingFromDebugChannelReadableStream(
        request,
        debugChannelReadable
      );
      return new ReadableStream(
        {
          type: "bytes",
          start: function() {
            startWork(request);
          },
          pull: function(controller) {
            startFlowing(request, controller);
          },
          cancel: function(reason) {
            request.destination = null;
            abort(request, reason);
          }
        },
        { highWaterMark: 0 }
      );
    };
  })();
  return reactServerDomWebpackServer_edge_development;
}
var hasRequiredServer_edge;
function requireServer_edge() {
  if (hasRequiredServer_edge) return server_edge;
  hasRequiredServer_edge = 1;
  var s;
  if (process.env.NODE_ENV === "production") {
    s = requireReactServerDomWebpackServer_edge_production();
  } else {
    s = requireReactServerDomWebpackServer_edge_development();
  }
  server_edge.renderToReadableStream = s.renderToReadableStream;
  server_edge.decodeReply = s.decodeReply;
  server_edge.decodeReplyFromAsyncIterable = s.decodeReplyFromAsyncIterable;
  server_edge.decodeAction = s.decodeAction;
  server_edge.decodeFormState = s.decodeFormState;
  server_edge.registerServerReference = s.registerServerReference;
  server_edge.registerClientReference = s.registerClientReference;
  server_edge.createClientModuleProxy = s.createClientModuleProxy;
  server_edge.createTemporaryReferenceSet = s.createTemporaryReferenceSet;
  return server_edge;
}
var server_edgeExports = requireServer_edge();
let init = false;
let requireModule;
function setRequireModule(options) {
  if (init) return;
  init = true;
  requireModule = (id) => {
    return options.load(removeReferenceCacheTag(id));
  };
  globalThis.__vite_rsc_server_require__ = memoize(async (id) => {
    if (id.startsWith(SERVER_DECODE_CLIENT_PREFIX)) {
      id = id.slice(SERVER_DECODE_CLIENT_PREFIX.length);
      id = removeReferenceCacheTag(id);
      const target = {};
      const getOrCreateClientReference = (name) => {
        return target[name] ??= server_edgeExports.registerClientReference(() => {
          throw new Error(`Unexpectedly client reference export '${name}' is called on server`);
        }, id, name);
      };
      return new Proxy(target, { getOwnPropertyDescriptor(_target, name) {
        if (typeof name !== "string" || name === "then") return Reflect.getOwnPropertyDescriptor(target, name);
        getOrCreateClientReference(name);
        return Reflect.getOwnPropertyDescriptor(target, name);
      } });
    }
    return requireModule(id);
  });
  setInternalRequire();
}
async function loadServerAction(id) {
  const [file, name] = id.split("#");
  return (await requireModule(file))[name];
}
function createServerManifest() {
  const cacheTag = "";
  return new Proxy({}, { get(_target, $$id, _receiver) {
    tinyassert(typeof $$id === "string");
    let [id, name] = $$id.split("#");
    tinyassert(id);
    tinyassert(name);
    return {
      id: SERVER_REFERENCE_PREFIX + id + cacheTag,
      name,
      chunks: [],
      async: true
    };
  } });
}
function createClientManifest(options) {
  const cacheTag = "";
  return new Proxy({}, { get(_target, $$id, _receiver) {
    tinyassert(typeof $$id === "string");
    let [id, name] = $$id.split("#");
    tinyassert(id);
    tinyassert(name);
    options?.onClientReference?.({
      id,
      name
    });
    return {
      id: id + cacheTag,
      name,
      chunks: [],
      async: true
    };
  } });
}
var client_edge = { exports: {} };
var reactServerDomWebpackClient_edge_production = {};
var hasRequiredReactServerDomWebpackClient_edge_production;
function requireReactServerDomWebpackClient_edge_production() {
  if (hasRequiredReactServerDomWebpackClient_edge_production) return reactServerDomWebpackClient_edge_production;
  hasRequiredReactServerDomWebpackClient_edge_production = 1;
  var ReactDOM = requireReactDom_reactServer(), decoderOptions = { stream: true }, hasOwnProperty = Object.prototype.hasOwnProperty;
  function resolveClientReference(bundlerConfig, metadata2) {
    if (bundlerConfig) {
      var moduleExports = bundlerConfig[metadata2[0]];
      if (bundlerConfig = moduleExports && moduleExports[metadata2[2]])
        moduleExports = bundlerConfig.name;
      else {
        bundlerConfig = moduleExports && moduleExports["*"];
        if (!bundlerConfig)
          throw Error(
            'Could not find the module "' + metadata2[0] + '" in the React Server Consumer Manifest. This is probably a bug in the React Server Components bundler.'
          );
        moduleExports = metadata2[2];
      }
      return 4 === metadata2.length ? [bundlerConfig.id, bundlerConfig.chunks, moduleExports, 1] : [bundlerConfig.id, bundlerConfig.chunks, moduleExports];
    }
    return metadata2;
  }
  function resolveServerReference(bundlerConfig, id) {
    var name = "", resolvedModuleData = bundlerConfig[id];
    if (resolvedModuleData) name = resolvedModuleData.name;
    else {
      var idx = id.lastIndexOf("#");
      -1 !== idx && (name = id.slice(idx + 1), resolvedModuleData = bundlerConfig[id.slice(0, idx)]);
      if (!resolvedModuleData)
        throw Error(
          'Could not find the module "' + id + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.'
        );
    }
    return resolvedModuleData.async ? [resolvedModuleData.id, resolvedModuleData.chunks, name, 1] : [resolvedModuleData.id, resolvedModuleData.chunks, name];
  }
  var chunkCache = /* @__PURE__ */ new Map();
  function requireAsyncModule(id) {
    var promise = __vite_rsc_require__(id);
    if ("function" !== typeof promise.then || "fulfilled" === promise.status)
      return null;
    promise.then(
      function(value) {
        promise.status = "fulfilled";
        promise.value = value;
      },
      function(reason) {
        promise.status = "rejected";
        promise.reason = reason;
      }
    );
    return promise;
  }
  function ignoreReject() {
  }
  function preloadModule(metadata2) {
    for (var chunks = metadata2[1], promises = [], i = 0; i < chunks.length; ) {
      var chunkId = chunks[i++];
      chunks[i++];
      var entry = chunkCache.get(chunkId);
      if (void 0 === entry) {
        entry = __webpack_chunk_load__(chunkId);
        promises.push(entry);
        var resolve = chunkCache.set.bind(chunkCache, chunkId, null);
        entry.then(resolve, ignoreReject);
        chunkCache.set(chunkId, entry);
      } else null !== entry && promises.push(entry);
    }
    return 4 === metadata2.length ? 0 === promises.length ? requireAsyncModule(metadata2[0]) : Promise.all(promises).then(function() {
      return requireAsyncModule(metadata2[0]);
    }) : 0 < promises.length ? Promise.all(promises) : null;
  }
  function requireModule2(metadata2) {
    var moduleExports = __vite_rsc_require__(metadata2[0]);
    if (4 === metadata2.length && "function" === typeof moduleExports.then)
      if ("fulfilled" === moduleExports.status)
        moduleExports = moduleExports.value;
      else throw moduleExports.reason;
    if ("*" === metadata2[2]) return moduleExports;
    if ("" === metadata2[2])
      return moduleExports.__esModule ? moduleExports.default : moduleExports;
    if (hasOwnProperty.call(moduleExports, metadata2[2]))
      return moduleExports[metadata2[2]];
  }
  function prepareDestinationWithChunks(moduleLoading, chunks, nonce$jscomp$0) {
    if (null !== moduleLoading)
      for (var i = 1; i < chunks.length; i += 2) {
        var nonce = nonce$jscomp$0, JSCompiler_temp_const = ReactDOMSharedInternals.d, JSCompiler_temp_const$jscomp$0 = JSCompiler_temp_const.X, JSCompiler_temp_const$jscomp$1 = moduleLoading.prefix + chunks[i];
        var JSCompiler_inline_result = moduleLoading.crossOrigin;
        JSCompiler_inline_result = "string" === typeof JSCompiler_inline_result ? "use-credentials" === JSCompiler_inline_result ? JSCompiler_inline_result : "" : void 0;
        JSCompiler_temp_const$jscomp$0.call(
          JSCompiler_temp_const,
          JSCompiler_temp_const$jscomp$1,
          { crossOrigin: JSCompiler_inline_result, nonce }
        );
      }
  }
  var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  var ASYNC_ITERATOR = Symbol.asyncIterator, isArrayImpl = Array.isArray, getPrototypeOf = Object.getPrototypeOf, ObjectPrototype = Object.prototype, knownServerReferences = /* @__PURE__ */ new WeakMap();
  function serializeNumber(number) {
    return Number.isFinite(number) ? 0 === number && -Infinity === 1 / number ? "$-0" : number : Infinity === number ? "$Infinity" : -Infinity === number ? "$-Infinity" : "$NaN";
  }
  function processReply(root, formFieldPrefix, temporaryReferences, resolve, reject) {
    function serializeTypedArray(tag, typedArray) {
      typedArray = new Blob([
        new Uint8Array(
          typedArray.buffer,
          typedArray.byteOffset,
          typedArray.byteLength
        )
      ]);
      var blobId = nextPartId++;
      null === formData && (formData = new FormData());
      formData.append(formFieldPrefix + blobId, typedArray);
      return "$" + tag + blobId.toString(16);
    }
    function serializeBinaryReader(reader) {
      function progress(entry) {
        entry.done ? (entry = nextPartId++, data.append(formFieldPrefix + entry, new Blob(buffer)), data.append(
          formFieldPrefix + streamId,
          '"$o' + entry.toString(16) + '"'
        ), data.append(formFieldPrefix + streamId, "C"), pendingParts--, 0 === pendingParts && resolve(data)) : (buffer.push(entry.value), reader.read(new Uint8Array(1024)).then(progress, reject));
      }
      null === formData && (formData = new FormData());
      var data = formData;
      pendingParts++;
      var streamId = nextPartId++, buffer = [];
      reader.read(new Uint8Array(1024)).then(progress, reject);
      return "$r" + streamId.toString(16);
    }
    function serializeReader(reader) {
      function progress(entry) {
        if (entry.done)
          data.append(formFieldPrefix + streamId, "C"), pendingParts--, 0 === pendingParts && resolve(data);
        else
          try {
            var partJSON = JSON.stringify(entry.value, resolveToJSON);
            data.append(formFieldPrefix + streamId, partJSON);
            reader.read().then(progress, reject);
          } catch (x) {
            reject(x);
          }
      }
      null === formData && (formData = new FormData());
      var data = formData;
      pendingParts++;
      var streamId = nextPartId++;
      reader.read().then(progress, reject);
      return "$R" + streamId.toString(16);
    }
    function serializeReadableStream(stream) {
      try {
        var binaryReader = stream.getReader({ mode: "byob" });
      } catch (x) {
        return serializeReader(stream.getReader());
      }
      return serializeBinaryReader(binaryReader);
    }
    function serializeAsyncIterable(iterable, iterator) {
      function progress(entry) {
        if (entry.done) {
          if (void 0 === entry.value)
            data.append(formFieldPrefix + streamId, "C");
          else
            try {
              var partJSON = JSON.stringify(entry.value, resolveToJSON);
              data.append(formFieldPrefix + streamId, "C" + partJSON);
            } catch (x) {
              reject(x);
              return;
            }
          pendingParts--;
          0 === pendingParts && resolve(data);
        } else
          try {
            var partJSON$21 = JSON.stringify(entry.value, resolveToJSON);
            data.append(formFieldPrefix + streamId, partJSON$21);
            iterator.next().then(progress, reject);
          } catch (x$22) {
            reject(x$22);
          }
      }
      null === formData && (formData = new FormData());
      var data = formData;
      pendingParts++;
      var streamId = nextPartId++;
      iterable = iterable === iterator;
      iterator.next().then(progress, reject);
      return "$" + (iterable ? "x" : "X") + streamId.toString(16);
    }
    function resolveToJSON(key, value) {
      if (null === value) return null;
      if ("object" === typeof value) {
        switch (value.$$typeof) {
          case REACT_ELEMENT_TYPE:
            if (void 0 !== temporaryReferences && -1 === key.indexOf(":")) {
              var parentReference = writtenObjects.get(this);
              if (void 0 !== parentReference)
                return temporaryReferences.set(parentReference + ":" + key, value), "$T";
            }
            throw Error(
              "React Element cannot be passed to Server Functions from the Client without a temporary reference set. Pass a TemporaryReferenceSet to the options."
            );
          case REACT_LAZY_TYPE:
            parentReference = value._payload;
            var init2 = value._init;
            null === formData && (formData = new FormData());
            pendingParts++;
            try {
              var resolvedModel = init2(parentReference), lazyId = nextPartId++, partJSON = serializeModel(resolvedModel, lazyId);
              formData.append(formFieldPrefix + lazyId, partJSON);
              return "$" + lazyId.toString(16);
            } catch (x) {
              if ("object" === typeof x && null !== x && "function" === typeof x.then) {
                pendingParts++;
                var lazyId$23 = nextPartId++;
                parentReference = function() {
                  try {
                    var partJSON$24 = serializeModel(value, lazyId$23), data$25 = formData;
                    data$25.append(formFieldPrefix + lazyId$23, partJSON$24);
                    pendingParts--;
                    0 === pendingParts && resolve(data$25);
                  } catch (reason) {
                    reject(reason);
                  }
                };
                x.then(parentReference, parentReference);
                return "$" + lazyId$23.toString(16);
              }
              reject(x);
              return null;
            } finally {
              pendingParts--;
            }
        }
        parentReference = writtenObjects.get(value);
        if ("function" === typeof value.then) {
          if (void 0 !== parentReference)
            if (modelRoot === value) modelRoot = null;
            else return parentReference;
          null === formData && (formData = new FormData());
          pendingParts++;
          var promiseId = nextPartId++;
          key = "$@" + promiseId.toString(16);
          writtenObjects.set(value, key);
          value.then(function(partValue) {
            try {
              var previousReference = writtenObjects.get(partValue);
              var partJSON$27 = void 0 !== previousReference ? JSON.stringify(previousReference) : serializeModel(partValue, promiseId);
              partValue = formData;
              partValue.append(formFieldPrefix + promiseId, partJSON$27);
              pendingParts--;
              0 === pendingParts && resolve(partValue);
            } catch (reason) {
              reject(reason);
            }
          }, reject);
          return key;
        }
        if (void 0 !== parentReference)
          if (modelRoot === value) modelRoot = null;
          else return parentReference;
        else
          -1 === key.indexOf(":") && (parentReference = writtenObjects.get(this), void 0 !== parentReference && (key = parentReference + ":" + key, writtenObjects.set(value, key), void 0 !== temporaryReferences && temporaryReferences.set(key, value)));
        if (isArrayImpl(value)) return value;
        if (value instanceof FormData) {
          null === formData && (formData = new FormData());
          var data$31 = formData;
          key = nextPartId++;
          var prefix = formFieldPrefix + key + "_";
          value.forEach(function(originalValue, originalKey) {
            data$31.append(prefix + originalKey, originalValue);
          });
          return "$K" + key.toString(16);
        }
        if (value instanceof Map)
          return key = nextPartId++, parentReference = serializeModel(Array.from(value), key), null === formData && (formData = new FormData()), formData.append(formFieldPrefix + key, parentReference), "$Q" + key.toString(16);
        if (value instanceof Set)
          return key = nextPartId++, parentReference = serializeModel(Array.from(value), key), null === formData && (formData = new FormData()), formData.append(formFieldPrefix + key, parentReference), "$W" + key.toString(16);
        if (value instanceof ArrayBuffer)
          return key = new Blob([value]), parentReference = nextPartId++, null === formData && (formData = new FormData()), formData.append(formFieldPrefix + parentReference, key), "$A" + parentReference.toString(16);
        if (value instanceof Int8Array) return serializeTypedArray("O", value);
        if (value instanceof Uint8Array) return serializeTypedArray("o", value);
        if (value instanceof Uint8ClampedArray)
          return serializeTypedArray("U", value);
        if (value instanceof Int16Array) return serializeTypedArray("S", value);
        if (value instanceof Uint16Array) return serializeTypedArray("s", value);
        if (value instanceof Int32Array) return serializeTypedArray("L", value);
        if (value instanceof Uint32Array) return serializeTypedArray("l", value);
        if (value instanceof Float32Array) return serializeTypedArray("G", value);
        if (value instanceof Float64Array) return serializeTypedArray("g", value);
        if (value instanceof BigInt64Array)
          return serializeTypedArray("M", value);
        if (value instanceof BigUint64Array)
          return serializeTypedArray("m", value);
        if (value instanceof DataView) return serializeTypedArray("V", value);
        if ("function" === typeof Blob && value instanceof Blob)
          return null === formData && (formData = new FormData()), key = nextPartId++, formData.append(formFieldPrefix + key, value), "$B" + key.toString(16);
        if (key = getIteratorFn(value))
          return parentReference = key.call(value), parentReference === value ? (key = nextPartId++, parentReference = serializeModel(
            Array.from(parentReference),
            key
          ), null === formData && (formData = new FormData()), formData.append(formFieldPrefix + key, parentReference), "$i" + key.toString(16)) : Array.from(parentReference);
        if ("function" === typeof ReadableStream && value instanceof ReadableStream)
          return serializeReadableStream(value);
        key = value[ASYNC_ITERATOR];
        if ("function" === typeof key)
          return serializeAsyncIterable(value, key.call(value));
        key = getPrototypeOf(value);
        if (key !== ObjectPrototype && (null === key || null !== getPrototypeOf(key))) {
          if (void 0 === temporaryReferences)
            throw Error(
              "Only plain objects, and a few built-ins, can be passed to Server Functions. Classes or null prototypes are not supported."
            );
          return "$T";
        }
        return value;
      }
      if ("string" === typeof value) {
        if ("Z" === value[value.length - 1] && this[key] instanceof Date)
          return "$D" + value;
        key = "$" === value[0] ? "$" + value : value;
        return key;
      }
      if ("boolean" === typeof value) return value;
      if ("number" === typeof value) return serializeNumber(value);
      if ("undefined" === typeof value) return "$undefined";
      if ("function" === typeof value) {
        parentReference = knownServerReferences.get(value);
        if (void 0 !== parentReference) {
          key = writtenObjects.get(value);
          if (void 0 !== key) return key;
          key = JSON.stringify(
            { id: parentReference.id, bound: parentReference.bound },
            resolveToJSON
          );
          null === formData && (formData = new FormData());
          parentReference = nextPartId++;
          formData.set(formFieldPrefix + parentReference, key);
          key = "$h" + parentReference.toString(16);
          writtenObjects.set(value, key);
          return key;
        }
        if (void 0 !== temporaryReferences && -1 === key.indexOf(":") && (parentReference = writtenObjects.get(this), void 0 !== parentReference))
          return temporaryReferences.set(parentReference + ":" + key, value), "$T";
        throw Error(
          "Client Functions cannot be passed directly to Server Functions. Only Functions passed from the Server can be passed back again."
        );
      }
      if ("symbol" === typeof value) {
        if (void 0 !== temporaryReferences && -1 === key.indexOf(":") && (parentReference = writtenObjects.get(this), void 0 !== parentReference))
          return temporaryReferences.set(parentReference + ":" + key, value), "$T";
        throw Error(
          "Symbols cannot be passed to a Server Function without a temporary reference set. Pass a TemporaryReferenceSet to the options."
        );
      }
      if ("bigint" === typeof value) return "$n" + value.toString(10);
      throw Error(
        "Type " + typeof value + " is not supported as an argument to a Server Function."
      );
    }
    function serializeModel(model, id) {
      "object" === typeof model && null !== model && (id = "$" + id.toString(16), writtenObjects.set(model, id), void 0 !== temporaryReferences && temporaryReferences.set(id, model));
      modelRoot = model;
      return JSON.stringify(model, resolveToJSON);
    }
    var nextPartId = 1, pendingParts = 0, formData = null, writtenObjects = /* @__PURE__ */ new WeakMap(), modelRoot = root, json = serializeModel(root, 0);
    null === formData ? resolve(json) : (formData.set(formFieldPrefix + "0", json), 0 === pendingParts && resolve(formData));
    return function() {
      0 < pendingParts && (pendingParts = 0, null === formData ? resolve(json) : resolve(formData));
    };
  }
  var boundCache = /* @__PURE__ */ new WeakMap();
  function encodeFormData(reference) {
    var resolve, reject, thenable = new Promise(function(res, rej) {
      resolve = res;
      reject = rej;
    });
    processReply(
      reference,
      "",
      void 0,
      function(body) {
        if ("string" === typeof body) {
          var data = new FormData();
          data.append("0", body);
          body = data;
        }
        thenable.status = "fulfilled";
        thenable.value = body;
        resolve(body);
      },
      function(e) {
        thenable.status = "rejected";
        thenable.reason = e;
        reject(e);
      }
    );
    return thenable;
  }
  function defaultEncodeFormAction(identifierPrefix) {
    var referenceClosure = knownServerReferences.get(this);
    if (!referenceClosure)
      throw Error(
        "Tried to encode a Server Action from a different instance than the encoder is from. This is a bug in React."
      );
    var data = null;
    if (null !== referenceClosure.bound) {
      data = boundCache.get(referenceClosure);
      data || (data = encodeFormData({
        id: referenceClosure.id,
        bound: referenceClosure.bound
      }), boundCache.set(referenceClosure, data));
      if ("rejected" === data.status) throw data.reason;
      if ("fulfilled" !== data.status) throw data;
      referenceClosure = data.value;
      var prefixedData = new FormData();
      referenceClosure.forEach(function(value, key) {
        prefixedData.append("$ACTION_" + identifierPrefix + ":" + key, value);
      });
      data = prefixedData;
      referenceClosure = "$ACTION_REF_" + identifierPrefix;
    } else referenceClosure = "$ACTION_ID_" + referenceClosure.id;
    return {
      name: referenceClosure,
      method: "POST",
      encType: "multipart/form-data",
      data
    };
  }
  function isSignatureEqual(referenceId, numberOfBoundArgs) {
    var referenceClosure = knownServerReferences.get(this);
    if (!referenceClosure)
      throw Error(
        "Tried to encode a Server Action from a different instance than the encoder is from. This is a bug in React."
      );
    if (referenceClosure.id !== referenceId) return false;
    var boundPromise = referenceClosure.bound;
    if (null === boundPromise) return 0 === numberOfBoundArgs;
    switch (boundPromise.status) {
      case "fulfilled":
        return boundPromise.value.length === numberOfBoundArgs;
      case "pending":
        throw boundPromise;
      case "rejected":
        throw boundPromise.reason;
      default:
        throw "string" !== typeof boundPromise.status && (boundPromise.status = "pending", boundPromise.then(
          function(boundArgs) {
            boundPromise.status = "fulfilled";
            boundPromise.value = boundArgs;
          },
          function(error) {
            boundPromise.status = "rejected";
            boundPromise.reason = error;
          }
        )), boundPromise;
    }
  }
  function registerBoundServerReference(reference, id, bound, encodeFormAction) {
    knownServerReferences.has(reference) || (knownServerReferences.set(reference, {
      id,
      originalBind: reference.bind,
      bound
    }), Object.defineProperties(reference, {
      $$FORM_ACTION: {
        value: void 0 === encodeFormAction ? defaultEncodeFormAction : function() {
          var referenceClosure = knownServerReferences.get(this);
          if (!referenceClosure)
            throw Error(
              "Tried to encode a Server Action from a different instance than the encoder is from. This is a bug in React."
            );
          var boundPromise = referenceClosure.bound;
          null === boundPromise && (boundPromise = Promise.resolve([]));
          return encodeFormAction(referenceClosure.id, boundPromise);
        }
      },
      $$IS_SIGNATURE_EQUAL: { value: isSignatureEqual },
      bind: { value: bind }
    }));
  }
  var FunctionBind = Function.prototype.bind, ArraySlice = Array.prototype.slice;
  function bind() {
    var referenceClosure = knownServerReferences.get(this);
    if (!referenceClosure) return FunctionBind.apply(this, arguments);
    var newFn = referenceClosure.originalBind.apply(this, arguments), args = ArraySlice.call(arguments, 1), boundPromise = null;
    boundPromise = null !== referenceClosure.bound ? Promise.resolve(referenceClosure.bound).then(function(boundArgs) {
      return boundArgs.concat(args);
    }) : Promise.resolve(args);
    knownServerReferences.set(newFn, {
      id: referenceClosure.id,
      originalBind: newFn.bind,
      bound: boundPromise
    });
    Object.defineProperties(newFn, {
      $$FORM_ACTION: { value: this.$$FORM_ACTION },
      $$IS_SIGNATURE_EQUAL: { value: isSignatureEqual },
      bind: { value: bind }
    });
    return newFn;
  }
  function createBoundServerReference(metaData, callServer, encodeFormAction) {
    function action() {
      var args = Array.prototype.slice.call(arguments);
      return bound ? "fulfilled" === bound.status ? callServer(id, bound.value.concat(args)) : Promise.resolve(bound).then(function(boundArgs) {
        return callServer(id, boundArgs.concat(args));
      }) : callServer(id, args);
    }
    var id = metaData.id, bound = metaData.bound;
    registerBoundServerReference(action, id, bound, encodeFormAction);
    return action;
  }
  function createServerReference$1(id, callServer, encodeFormAction) {
    function action() {
      var args = Array.prototype.slice.call(arguments);
      return callServer(id, args);
    }
    registerBoundServerReference(action, id, null, encodeFormAction);
    return action;
  }
  function ReactPromise(status, value, reason) {
    this.status = status;
    this.value = value;
    this.reason = reason;
  }
  ReactPromise.prototype = Object.create(Promise.prototype);
  ReactPromise.prototype.then = function(resolve, reject) {
    switch (this.status) {
      case "resolved_model":
        initializeModelChunk(this);
        break;
      case "resolved_module":
        initializeModuleChunk(this);
    }
    switch (this.status) {
      case "fulfilled":
        "function" === typeof resolve && resolve(this.value);
        break;
      case "pending":
      case "blocked":
        "function" === typeof resolve && (null === this.value && (this.value = []), this.value.push(resolve));
        "function" === typeof reject && (null === this.reason && (this.reason = []), this.reason.push(reject));
        break;
      case "halted":
        break;
      default:
        "function" === typeof reject && reject(this.reason);
    }
  };
  function readChunk(chunk) {
    switch (chunk.status) {
      case "resolved_model":
        initializeModelChunk(chunk);
        break;
      case "resolved_module":
        initializeModuleChunk(chunk);
    }
    switch (chunk.status) {
      case "fulfilled":
        return chunk.value;
      case "pending":
      case "blocked":
      case "halted":
        throw chunk;
      default:
        throw chunk.reason;
    }
  }
  function wakeChunk(listeners, value, chunk) {
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      "function" === typeof listener ? listener(value) : fulfillReference(listener, value);
    }
  }
  function rejectChunk(listeners, error) {
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      "function" === typeof listener ? listener(error) : rejectReference(listener, error);
    }
  }
  function resolveBlockedCycle(resolvedChunk, reference) {
    var referencedChunk = reference.handler.chunk;
    if (null === referencedChunk) return null;
    if (referencedChunk === resolvedChunk) return reference.handler;
    reference = referencedChunk.value;
    if (null !== reference)
      for (referencedChunk = 0; referencedChunk < reference.length; referencedChunk++) {
        var listener = reference[referencedChunk];
        if ("function" !== typeof listener && (listener = resolveBlockedCycle(resolvedChunk, listener), null !== listener))
          return listener;
      }
    return null;
  }
  function wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners) {
    switch (chunk.status) {
      case "fulfilled":
        wakeChunk(resolveListeners, chunk.value);
        break;
      case "blocked":
        for (var i = 0; i < resolveListeners.length; i++) {
          var listener = resolveListeners[i];
          if ("function" !== typeof listener) {
            var cyclicHandler = resolveBlockedCycle(chunk, listener);
            if (null !== cyclicHandler)
              switch (fulfillReference(listener, cyclicHandler.value), resolveListeners.splice(i, 1), i--, null !== rejectListeners && (listener = rejectListeners.indexOf(listener), -1 !== listener && rejectListeners.splice(listener, 1)), chunk.status) {
                case "fulfilled":
                  wakeChunk(resolveListeners, chunk.value);
                  return;
                case "rejected":
                  null !== rejectListeners && rejectChunk(rejectListeners, chunk.reason);
                  return;
              }
          }
        }
      case "pending":
        if (chunk.value)
          for (i = 0; i < resolveListeners.length; i++)
            chunk.value.push(resolveListeners[i]);
        else chunk.value = resolveListeners;
        if (chunk.reason) {
          if (rejectListeners)
            for (resolveListeners = 0; resolveListeners < rejectListeners.length; resolveListeners++)
              chunk.reason.push(rejectListeners[resolveListeners]);
        } else chunk.reason = rejectListeners;
        break;
      case "rejected":
        rejectListeners && rejectChunk(rejectListeners, chunk.reason);
    }
  }
  function triggerErrorOnChunk(response, chunk, error) {
    "pending" !== chunk.status && "blocked" !== chunk.status ? chunk.reason.error(error) : (response = chunk.reason, chunk.status = "rejected", chunk.reason = error, null !== response && rejectChunk(response, error));
  }
  function createResolvedIteratorResultChunk(response, value, done) {
    return new ReactPromise(
      "resolved_model",
      (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}",
      response
    );
  }
  function resolveIteratorResultChunk(response, chunk, value, done) {
    resolveModelChunk(
      response,
      chunk,
      (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}"
    );
  }
  function resolveModelChunk(response, chunk, value) {
    if ("pending" !== chunk.status) chunk.reason.enqueueModel(value);
    else {
      var resolveListeners = chunk.value, rejectListeners = chunk.reason;
      chunk.status = "resolved_model";
      chunk.value = value;
      chunk.reason = response;
      null !== resolveListeners && (initializeModelChunk(chunk), wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners));
    }
  }
  function resolveModuleChunk(response, chunk, value) {
    if ("pending" === chunk.status || "blocked" === chunk.status) {
      response = chunk.value;
      var rejectListeners = chunk.reason;
      chunk.status = "resolved_module";
      chunk.value = value;
      chunk.reason = null;
      null !== response && (initializeModuleChunk(chunk), wakeChunkIfInitialized(chunk, response, rejectListeners));
    }
  }
  var initializingHandler = null;
  function initializeModelChunk(chunk) {
    var prevHandler = initializingHandler;
    initializingHandler = null;
    var resolvedModel = chunk.value, response = chunk.reason;
    chunk.status = "blocked";
    chunk.value = null;
    chunk.reason = null;
    try {
      var value = JSON.parse(resolvedModel, response._fromJSON), resolveListeners = chunk.value;
      if (null !== resolveListeners)
        for (chunk.value = null, chunk.reason = null, resolvedModel = 0; resolvedModel < resolveListeners.length; resolvedModel++) {
          var listener = resolveListeners[resolvedModel];
          "function" === typeof listener ? listener(value) : fulfillReference(listener, value, chunk);
        }
      if (null !== initializingHandler) {
        if (initializingHandler.errored) throw initializingHandler.reason;
        if (0 < initializingHandler.deps) {
          initializingHandler.value = value;
          initializingHandler.chunk = chunk;
          return;
        }
      }
      chunk.status = "fulfilled";
      chunk.value = value;
    } catch (error) {
      chunk.status = "rejected", chunk.reason = error;
    } finally {
      initializingHandler = prevHandler;
    }
  }
  function initializeModuleChunk(chunk) {
    try {
      var value = requireModule2(chunk.value);
      chunk.status = "fulfilled";
      chunk.value = value;
    } catch (error) {
      chunk.status = "rejected", chunk.reason = error;
    }
  }
  function reportGlobalError(weakResponse, error) {
    weakResponse._closed = true;
    weakResponse._closedReason = error;
    weakResponse._chunks.forEach(function(chunk) {
      "pending" === chunk.status ? triggerErrorOnChunk(weakResponse, chunk, error) : "fulfilled" === chunk.status && null !== chunk.reason && chunk.reason.error(error);
    });
  }
  function createLazyChunkWrapper(chunk) {
    return { $$typeof: REACT_LAZY_TYPE, _payload: chunk, _init: readChunk };
  }
  function getChunk(response, id) {
    var chunks = response._chunks, chunk = chunks.get(id);
    chunk || (chunk = response._closed ? new ReactPromise("rejected", null, response._closedReason) : new ReactPromise("pending", null, null), chunks.set(id, chunk));
    return chunk;
  }
  function fulfillReference(reference, value) {
    var response = reference.response, handler2 = reference.handler, parentObject = reference.parentObject, key = reference.key, map = reference.map, path = reference.path;
    try {
      for (var i = 1; i < path.length; i++) {
        for (; "object" === typeof value && null !== value && value.$$typeof === REACT_LAZY_TYPE; ) {
          var referencedChunk = value._payload;
          if (referencedChunk === handler2.chunk) value = handler2.value;
          else {
            switch (referencedChunk.status) {
              case "resolved_model":
                initializeModelChunk(referencedChunk);
                break;
              case "resolved_module":
                initializeModuleChunk(referencedChunk);
            }
            switch (referencedChunk.status) {
              case "fulfilled":
                value = referencedChunk.value;
                continue;
              case "blocked":
                var cyclicHandler = resolveBlockedCycle(
                  referencedChunk,
                  reference
                );
                if (null !== cyclicHandler) {
                  value = cyclicHandler.value;
                  continue;
                }
              case "pending":
                path.splice(0, i - 1);
                null === referencedChunk.value ? referencedChunk.value = [reference] : referencedChunk.value.push(reference);
                null === referencedChunk.reason ? referencedChunk.reason = [reference] : referencedChunk.reason.push(reference);
                return;
              case "halted":
                return;
              default:
                rejectReference(reference, referencedChunk.reason);
                return;
            }
          }
        }
        var name = path[i];
        if ("object" === typeof value && null !== value && hasOwnProperty.call(value, name))
          value = value[name];
        else throw Error("Invalid reference.");
      }
      for (; "object" === typeof value && null !== value && value.$$typeof === REACT_LAZY_TYPE; ) {
        var referencedChunk$44 = value._payload;
        if (referencedChunk$44 === handler2.chunk) value = handler2.value;
        else {
          switch (referencedChunk$44.status) {
            case "resolved_model":
              initializeModelChunk(referencedChunk$44);
              break;
            case "resolved_module":
              initializeModuleChunk(referencedChunk$44);
          }
          switch (referencedChunk$44.status) {
            case "fulfilled":
              value = referencedChunk$44.value;
              continue;
          }
          break;
        }
      }
      var mappedValue = map(response, value, parentObject, key);
      "__proto__" !== key && (parentObject[key] = mappedValue);
      "" === key && null === handler2.value && (handler2.value = mappedValue);
      if (parentObject[0] === REACT_ELEMENT_TYPE && "object" === typeof handler2.value && null !== handler2.value && handler2.value.$$typeof === REACT_ELEMENT_TYPE) {
        var element = handler2.value;
        switch (key) {
          case "3":
            element.props = mappedValue;
        }
      }
    } catch (error) {
      rejectReference(reference, error);
      return;
    }
    handler2.deps--;
    0 === handler2.deps && (reference = handler2.chunk, null !== reference && "blocked" === reference.status && (value = reference.value, reference.status = "fulfilled", reference.value = handler2.value, reference.reason = handler2.reason, null !== value && wakeChunk(value, handler2.value)));
  }
  function rejectReference(reference, error) {
    var handler2 = reference.handler;
    reference = reference.response;
    handler2.errored || (handler2.errored = true, handler2.value = null, handler2.reason = error, handler2 = handler2.chunk, null !== handler2 && "blocked" === handler2.status && triggerErrorOnChunk(reference, handler2, error));
  }
  function waitForReference(referencedChunk, parentObject, key, response, map, path) {
    if (initializingHandler) {
      var handler2 = initializingHandler;
      handler2.deps++;
    } else
      handler2 = initializingHandler = {
        parent: null,
        chunk: null,
        value: null,
        reason: null,
        deps: 1,
        errored: false
      };
    parentObject = {
      response,
      handler: handler2,
      parentObject,
      key,
      map,
      path
    };
    null === referencedChunk.value ? referencedChunk.value = [parentObject] : referencedChunk.value.push(parentObject);
    null === referencedChunk.reason ? referencedChunk.reason = [parentObject] : referencedChunk.reason.push(parentObject);
    return null;
  }
  function loadServerReference(response, metaData, parentObject, key) {
    if (!response._serverReferenceConfig)
      return createBoundServerReference(
        metaData,
        response._callServer,
        response._encodeFormAction
      );
    var serverReference = resolveServerReference(
      response._serverReferenceConfig,
      metaData.id
    ), promise = preloadModule(serverReference);
    if (promise)
      metaData.bound && (promise = Promise.all([promise, metaData.bound]));
    else if (metaData.bound) promise = Promise.resolve(metaData.bound);
    else
      return promise = requireModule2(serverReference), registerBoundServerReference(
        promise,
        metaData.id,
        metaData.bound,
        response._encodeFormAction
      ), promise;
    if (initializingHandler) {
      var handler2 = initializingHandler;
      handler2.deps++;
    } else
      handler2 = initializingHandler = {
        parent: null,
        chunk: null,
        value: null,
        reason: null,
        deps: 1,
        errored: false
      };
    promise.then(
      function() {
        var resolvedValue = requireModule2(serverReference);
        if (metaData.bound) {
          var boundArgs = metaData.bound.value.slice(0);
          boundArgs.unshift(null);
          resolvedValue = resolvedValue.bind.apply(resolvedValue, boundArgs);
        }
        registerBoundServerReference(
          resolvedValue,
          metaData.id,
          metaData.bound,
          response._encodeFormAction
        );
        "__proto__" !== key && (parentObject[key] = resolvedValue);
        "" === key && null === handler2.value && (handler2.value = resolvedValue);
        if (parentObject[0] === REACT_ELEMENT_TYPE && "object" === typeof handler2.value && null !== handler2.value && handler2.value.$$typeof === REACT_ELEMENT_TYPE)
          switch (boundArgs = handler2.value, key) {
            case "3":
              boundArgs.props = resolvedValue;
          }
        handler2.deps--;
        0 === handler2.deps && (resolvedValue = handler2.chunk, null !== resolvedValue && "blocked" === resolvedValue.status && (boundArgs = resolvedValue.value, resolvedValue.status = "fulfilled", resolvedValue.value = handler2.value, resolvedValue.reason = null, null !== boundArgs && wakeChunk(boundArgs, handler2.value)));
      },
      function(error) {
        if (!handler2.errored) {
          handler2.errored = true;
          handler2.value = null;
          handler2.reason = error;
          var chunk = handler2.chunk;
          null !== chunk && "blocked" === chunk.status && triggerErrorOnChunk(response, chunk, error);
        }
      }
    );
    return null;
  }
  function getOutlinedModel(response, reference, parentObject, key, map) {
    reference = reference.split(":");
    var id = parseInt(reference[0], 16);
    id = getChunk(response, id);
    switch (id.status) {
      case "resolved_model":
        initializeModelChunk(id);
        break;
      case "resolved_module":
        initializeModuleChunk(id);
    }
    switch (id.status) {
      case "fulfilled":
        id = id.value;
        for (var i = 1; i < reference.length; i++) {
          for (; "object" === typeof id && null !== id && id.$$typeof === REACT_LAZY_TYPE; ) {
            id = id._payload;
            switch (id.status) {
              case "resolved_model":
                initializeModelChunk(id);
                break;
              case "resolved_module":
                initializeModuleChunk(id);
            }
            switch (id.status) {
              case "fulfilled":
                id = id.value;
                break;
              case "blocked":
              case "pending":
                return waitForReference(
                  id,
                  parentObject,
                  key,
                  response,
                  map,
                  reference.slice(i - 1)
                );
              case "halted":
                return initializingHandler ? (response = initializingHandler, response.deps++) : initializingHandler = {
                  parent: null,
                  chunk: null,
                  value: null,
                  reason: null,
                  deps: 1,
                  errored: false
                }, null;
              default:
                return initializingHandler ? (initializingHandler.errored = true, initializingHandler.value = null, initializingHandler.reason = id.reason) : initializingHandler = {
                  parent: null,
                  chunk: null,
                  value: null,
                  reason: id.reason,
                  deps: 0,
                  errored: true
                }, null;
            }
          }
          id = id[reference[i]];
        }
        for (; "object" === typeof id && null !== id && id.$$typeof === REACT_LAZY_TYPE; ) {
          reference = id._payload;
          switch (reference.status) {
            case "resolved_model":
              initializeModelChunk(reference);
              break;
            case "resolved_module":
              initializeModuleChunk(reference);
          }
          switch (reference.status) {
            case "fulfilled":
              id = reference.value;
              continue;
          }
          break;
        }
        return map(response, id, parentObject, key);
      case "pending":
      case "blocked":
        return waitForReference(id, parentObject, key, response, map, reference);
      case "halted":
        return initializingHandler ? (response = initializingHandler, response.deps++) : initializingHandler = {
          parent: null,
          chunk: null,
          value: null,
          reason: null,
          deps: 1,
          errored: false
        }, null;
      default:
        return initializingHandler ? (initializingHandler.errored = true, initializingHandler.value = null, initializingHandler.reason = id.reason) : initializingHandler = {
          parent: null,
          chunk: null,
          value: null,
          reason: id.reason,
          deps: 0,
          errored: true
        }, null;
    }
  }
  function createMap(response, model) {
    return new Map(model);
  }
  function createSet(response, model) {
    return new Set(model);
  }
  function createBlob(response, model) {
    return new Blob(model.slice(1), { type: model[0] });
  }
  function createFormData(response, model) {
    response = new FormData();
    for (var i = 0; i < model.length; i++)
      response.append(model[i][0], model[i][1]);
    return response;
  }
  function extractIterator(response, model) {
    return model[Symbol.iterator]();
  }
  function createModel(response, model) {
    return model;
  }
  function parseModelString(response, parentObject, key, value) {
    if ("$" === value[0]) {
      if ("$" === value)
        return null !== initializingHandler && "0" === key && (initializingHandler = {
          parent: initializingHandler,
          chunk: null,
          value: null,
          reason: null,
          deps: 0,
          errored: false
        }), REACT_ELEMENT_TYPE;
      switch (value[1]) {
        case "$":
          return value.slice(1);
        case "L":
          return parentObject = parseInt(value.slice(2), 16), response = getChunk(response, parentObject), createLazyChunkWrapper(response);
        case "@":
          return parentObject = parseInt(value.slice(2), 16), getChunk(response, parentObject);
        case "S":
          return Symbol.for(value.slice(2));
        case "h":
          return value = value.slice(2), getOutlinedModel(
            response,
            value,
            parentObject,
            key,
            loadServerReference
          );
        case "T":
          parentObject = "$" + value.slice(2);
          response = response._tempRefs;
          if (null == response)
            throw Error(
              "Missing a temporary reference set but the RSC response returned a temporary reference. Pass a temporaryReference option with the set that was used with the reply."
            );
          return response.get(parentObject);
        case "Q":
          return value = value.slice(2), getOutlinedModel(response, value, parentObject, key, createMap);
        case "W":
          return value = value.slice(2), getOutlinedModel(response, value, parentObject, key, createSet);
        case "B":
          return value = value.slice(2), getOutlinedModel(response, value, parentObject, key, createBlob);
        case "K":
          return value = value.slice(2), getOutlinedModel(response, value, parentObject, key, createFormData);
        case "Z":
          return resolveErrorProd();
        case "i":
          return value = value.slice(2), getOutlinedModel(response, value, parentObject, key, extractIterator);
        case "I":
          return Infinity;
        case "-":
          return "$-0" === value ? -0 : -Infinity;
        case "N":
          return NaN;
        case "u":
          return;
        case "D":
          return new Date(Date.parse(value.slice(2)));
        case "n":
          return BigInt(value.slice(2));
        default:
          return value = value.slice(1), getOutlinedModel(response, value, parentObject, key, createModel);
      }
    }
    return value;
  }
  function missingCall() {
    throw Error(
      'Trying to call a function from "use server" but the callServer option was not implemented in your router runtime.'
    );
  }
  function ResponseInstance(bundlerConfig, serverReferenceConfig, moduleLoading, callServer, encodeFormAction, nonce, temporaryReferences) {
    var chunks = /* @__PURE__ */ new Map();
    this._bundlerConfig = bundlerConfig;
    this._serverReferenceConfig = serverReferenceConfig;
    this._moduleLoading = moduleLoading;
    this._callServer = void 0 !== callServer ? callServer : missingCall;
    this._encodeFormAction = encodeFormAction;
    this._nonce = nonce;
    this._chunks = chunks;
    this._stringDecoder = new TextDecoder();
    this._fromJSON = null;
    this._closed = false;
    this._closedReason = null;
    this._tempRefs = temporaryReferences;
    this._fromJSON = createFromJSONCallback(this);
  }
  function resolveBuffer(response, id, buffer) {
    response = response._chunks;
    var chunk = response.get(id);
    chunk && "pending" !== chunk.status ? chunk.reason.enqueueValue(buffer) : (buffer = new ReactPromise("fulfilled", buffer, null), response.set(id, buffer));
  }
  function resolveModule(response, id, model) {
    var chunks = response._chunks, chunk = chunks.get(id);
    model = JSON.parse(model, response._fromJSON);
    var clientReference = resolveClientReference(response._bundlerConfig, model);
    prepareDestinationWithChunks(
      response._moduleLoading,
      model[1],
      response._nonce
    );
    if (model = preloadModule(clientReference)) {
      if (chunk) {
        var blockedChunk = chunk;
        blockedChunk.status = "blocked";
      } else
        blockedChunk = new ReactPromise("blocked", null, null), chunks.set(id, blockedChunk);
      model.then(
        function() {
          return resolveModuleChunk(response, blockedChunk, clientReference);
        },
        function(error) {
          return triggerErrorOnChunk(response, blockedChunk, error);
        }
      );
    } else
      chunk ? resolveModuleChunk(response, chunk, clientReference) : (chunk = new ReactPromise("resolved_module", clientReference, null), chunks.set(id, chunk));
  }
  function resolveStream(response, id, stream, controller) {
    response = response._chunks;
    var chunk = response.get(id);
    chunk ? "pending" === chunk.status && (id = chunk.value, chunk.status = "fulfilled", chunk.value = stream, chunk.reason = controller, null !== id && wakeChunk(id, chunk.value)) : (stream = new ReactPromise("fulfilled", stream, controller), response.set(id, stream));
  }
  function startReadableStream(response, id, type) {
    var controller = null, closed = false;
    type = new ReadableStream({
      type,
      start: function(c) {
        controller = c;
      }
    });
    var previousBlockedChunk = null;
    resolveStream(response, id, type, {
      enqueueValue: function(value) {
        null === previousBlockedChunk ? controller.enqueue(value) : previousBlockedChunk.then(function() {
          controller.enqueue(value);
        });
      },
      enqueueModel: function(json) {
        if (null === previousBlockedChunk) {
          var chunk = new ReactPromise("resolved_model", json, response);
          initializeModelChunk(chunk);
          "fulfilled" === chunk.status ? controller.enqueue(chunk.value) : (chunk.then(
            function(v) {
              return controller.enqueue(v);
            },
            function(e) {
              return controller.error(e);
            }
          ), previousBlockedChunk = chunk);
        } else {
          chunk = previousBlockedChunk;
          var chunk$55 = new ReactPromise("pending", null, null);
          chunk$55.then(
            function(v) {
              return controller.enqueue(v);
            },
            function(e) {
              return controller.error(e);
            }
          );
          previousBlockedChunk = chunk$55;
          chunk.then(function() {
            previousBlockedChunk === chunk$55 && (previousBlockedChunk = null);
            resolveModelChunk(response, chunk$55, json);
          });
        }
      },
      close: function() {
        if (!closed)
          if (closed = true, null === previousBlockedChunk) controller.close();
          else {
            var blockedChunk = previousBlockedChunk;
            previousBlockedChunk = null;
            blockedChunk.then(function() {
              return controller.close();
            });
          }
      },
      error: function(error) {
        if (!closed)
          if (closed = true, null === previousBlockedChunk)
            controller.error(error);
          else {
            var blockedChunk = previousBlockedChunk;
            previousBlockedChunk = null;
            blockedChunk.then(function() {
              return controller.error(error);
            });
          }
      }
    });
  }
  function asyncIterator() {
    return this;
  }
  function createIterator(next) {
    next = { next };
    next[ASYNC_ITERATOR] = asyncIterator;
    return next;
  }
  function startAsyncIterable(response, id, iterator) {
    var buffer = [], closed = false, nextWriteIndex = 0, iterable = {};
    iterable[ASYNC_ITERATOR] = function() {
      var nextReadIndex = 0;
      return createIterator(function(arg) {
        if (void 0 !== arg)
          throw Error(
            "Values cannot be passed to next() of AsyncIterables passed to Client Components."
          );
        if (nextReadIndex === buffer.length) {
          if (closed)
            return new ReactPromise(
              "fulfilled",
              { done: true, value: void 0 },
              null
            );
          buffer[nextReadIndex] = new ReactPromise("pending", null, null);
        }
        return buffer[nextReadIndex++];
      });
    };
    resolveStream(
      response,
      id,
      iterator ? iterable[ASYNC_ITERATOR]() : iterable,
      {
        enqueueValue: function(value) {
          if (nextWriteIndex === buffer.length)
            buffer[nextWriteIndex] = new ReactPromise(
              "fulfilled",
              { done: false, value },
              null
            );
          else {
            var chunk = buffer[nextWriteIndex], resolveListeners = chunk.value, rejectListeners = chunk.reason;
            chunk.status = "fulfilled";
            chunk.value = { done: false, value };
            chunk.reason = null;
            null !== resolveListeners && wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners);
          }
          nextWriteIndex++;
        },
        enqueueModel: function(value) {
          nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
            response,
            value,
            false
          ) : resolveIteratorResultChunk(
            response,
            buffer[nextWriteIndex],
            value,
            false
          );
          nextWriteIndex++;
        },
        close: function(value) {
          if (!closed)
            for (closed = true, nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
              response,
              value,
              true
            ) : resolveIteratorResultChunk(
              response,
              buffer[nextWriteIndex],
              value,
              true
            ), nextWriteIndex++; nextWriteIndex < buffer.length; )
              resolveIteratorResultChunk(
                response,
                buffer[nextWriteIndex++],
                '"$undefined"',
                true
              );
        },
        error: function(error) {
          if (!closed)
            for (closed = true, nextWriteIndex === buffer.length && (buffer[nextWriteIndex] = new ReactPromise(
              "pending",
              null,
              null
            )); nextWriteIndex < buffer.length; )
              triggerErrorOnChunk(response, buffer[nextWriteIndex++], error);
        }
      }
    );
  }
  function resolveErrorProd() {
    var error = Error(
      "An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error."
    );
    error.stack = "Error: " + error.message;
    return error;
  }
  function mergeBuffer(buffer, lastChunk) {
    for (var l = buffer.length, byteLength = lastChunk.length, i = 0; i < l; i++)
      byteLength += buffer[i].byteLength;
    byteLength = new Uint8Array(byteLength);
    for (var i$56 = i = 0; i$56 < l; i$56++) {
      var chunk = buffer[i$56];
      byteLength.set(chunk, i);
      i += chunk.byteLength;
    }
    byteLength.set(lastChunk, i);
    return byteLength;
  }
  function resolveTypedArray(response, id, buffer, lastChunk, constructor, bytesPerElement) {
    buffer = 0 === buffer.length && 0 === lastChunk.byteOffset % bytesPerElement ? lastChunk : mergeBuffer(buffer, lastChunk);
    constructor = new constructor(
      buffer.buffer,
      buffer.byteOffset,
      buffer.byteLength / bytesPerElement
    );
    resolveBuffer(response, id, constructor);
  }
  function processFullBinaryRow(response, streamState, id, tag, buffer, chunk) {
    switch (tag) {
      case 65:
        resolveBuffer(response, id, mergeBuffer(buffer, chunk).buffer);
        return;
      case 79:
        resolveTypedArray(response, id, buffer, chunk, Int8Array, 1);
        return;
      case 111:
        resolveBuffer(
          response,
          id,
          0 === buffer.length ? chunk : mergeBuffer(buffer, chunk)
        );
        return;
      case 85:
        resolveTypedArray(response, id, buffer, chunk, Uint8ClampedArray, 1);
        return;
      case 83:
        resolveTypedArray(response, id, buffer, chunk, Int16Array, 2);
        return;
      case 115:
        resolveTypedArray(response, id, buffer, chunk, Uint16Array, 2);
        return;
      case 76:
        resolveTypedArray(response, id, buffer, chunk, Int32Array, 4);
        return;
      case 108:
        resolveTypedArray(response, id, buffer, chunk, Uint32Array, 4);
        return;
      case 71:
        resolveTypedArray(response, id, buffer, chunk, Float32Array, 4);
        return;
      case 103:
        resolveTypedArray(response, id, buffer, chunk, Float64Array, 8);
        return;
      case 77:
        resolveTypedArray(response, id, buffer, chunk, BigInt64Array, 8);
        return;
      case 109:
        resolveTypedArray(response, id, buffer, chunk, BigUint64Array, 8);
        return;
      case 86:
        resolveTypedArray(response, id, buffer, chunk, DataView, 1);
        return;
    }
    streamState = response._stringDecoder;
    for (var row = "", i = 0; i < buffer.length; i++)
      row += streamState.decode(buffer[i], decoderOptions);
    buffer = row += streamState.decode(chunk);
    switch (tag) {
      case 73:
        resolveModule(response, id, buffer);
        break;
      case 72:
        id = buffer[0];
        buffer = buffer.slice(1);
        response = JSON.parse(buffer, response._fromJSON);
        buffer = ReactDOMSharedInternals.d;
        switch (id) {
          case "D":
            buffer.D(response);
            break;
          case "C":
            "string" === typeof response ? buffer.C(response) : buffer.C(response[0], response[1]);
            break;
          case "L":
            id = response[0];
            tag = response[1];
            3 === response.length ? buffer.L(id, tag, response[2]) : buffer.L(id, tag);
            break;
          case "m":
            "string" === typeof response ? buffer.m(response) : buffer.m(response[0], response[1]);
            break;
          case "X":
            "string" === typeof response ? buffer.X(response) : buffer.X(response[0], response[1]);
            break;
          case "S":
            "string" === typeof response ? buffer.S(response) : buffer.S(
              response[0],
              0 === response[1] ? void 0 : response[1],
              3 === response.length ? response[2] : void 0
            );
            break;
          case "M":
            "string" === typeof response ? buffer.M(response) : buffer.M(response[0], response[1]);
        }
        break;
      case 69:
        tag = response._chunks;
        chunk = tag.get(id);
        buffer = JSON.parse(buffer);
        streamState = resolveErrorProd();
        streamState.digest = buffer.digest;
        chunk ? triggerErrorOnChunk(response, chunk, streamState) : (response = new ReactPromise("rejected", null, streamState), tag.set(id, response));
        break;
      case 84:
        response = response._chunks;
        (tag = response.get(id)) && "pending" !== tag.status ? tag.reason.enqueueValue(buffer) : (buffer = new ReactPromise("fulfilled", buffer, null), response.set(id, buffer));
        break;
      case 78:
      case 68:
      case 74:
      case 87:
        throw Error(
          "Failed to read a RSC payload created by a development version of React on the server while using a production version on the client. Always use matching versions on the server and the client."
        );
      case 82:
        startReadableStream(response, id, void 0);
        break;
      case 114:
        startReadableStream(response, id, "bytes");
        break;
      case 88:
        startAsyncIterable(response, id, false);
        break;
      case 120:
        startAsyncIterable(response, id, true);
        break;
      case 67:
        (id = response._chunks.get(id)) && "fulfilled" === id.status && id.reason.close("" === buffer ? '"$undefined"' : buffer);
        break;
      default:
        tag = response._chunks, (chunk = tag.get(id)) ? resolveModelChunk(response, chunk, buffer) : (response = new ReactPromise("resolved_model", buffer, response), tag.set(id, response));
    }
  }
  function createFromJSONCallback(response) {
    return function(key, value) {
      if ("__proto__" !== key) {
        if ("string" === typeof value)
          return parseModelString(response, this, key, value);
        if ("object" === typeof value && null !== value) {
          if (value[0] === REACT_ELEMENT_TYPE) {
            if (key = {
              $$typeof: REACT_ELEMENT_TYPE,
              type: value[1],
              key: value[2],
              ref: null,
              props: value[3]
            }, null !== initializingHandler) {
              if (value = initializingHandler, initializingHandler = value.parent, value.errored)
                key = new ReactPromise("rejected", null, value.reason), key = createLazyChunkWrapper(key);
              else if (0 < value.deps) {
                var blockedChunk = new ReactPromise("blocked", null, null);
                value.value = key;
                value.chunk = blockedChunk;
                key = createLazyChunkWrapper(blockedChunk);
              }
            }
          } else key = value;
          return key;
        }
        return value;
      }
    };
  }
  function close(weakResponse) {
    reportGlobalError(weakResponse, Error("Connection closed."));
  }
  function noServerCall() {
    throw Error(
      "Server Functions cannot be called during initial render. This would create a fetch waterfall. Try to use a Server Component to pass data to Client Components instead."
    );
  }
  function createResponseFromOptions(options) {
    return new ResponseInstance(
      options.serverConsumerManifest.moduleMap,
      options.serverConsumerManifest.serverModuleMap,
      options.serverConsumerManifest.moduleLoading,
      noServerCall,
      options.encodeFormAction,
      "string" === typeof options.nonce ? options.nonce : void 0,
      options && options.temporaryReferences ? options.temporaryReferences : void 0
    );
  }
  function startReadingFromStream(response, stream, onDone) {
    function progress(_ref) {
      var value = _ref.value;
      if (_ref.done) return onDone();
      var i = 0, rowState = streamState._rowState;
      _ref = streamState._rowID;
      for (var rowTag = streamState._rowTag, rowLength = streamState._rowLength, buffer = streamState._buffer, chunkLength = value.length; i < chunkLength; ) {
        var lastIdx = -1;
        switch (rowState) {
          case 0:
            lastIdx = value[i++];
            58 === lastIdx ? rowState = 1 : _ref = _ref << 4 | (96 < lastIdx ? lastIdx - 87 : lastIdx - 48);
            continue;
          case 1:
            rowState = value[i];
            84 === rowState || 65 === rowState || 79 === rowState || 111 === rowState || 85 === rowState || 83 === rowState || 115 === rowState || 76 === rowState || 108 === rowState || 71 === rowState || 103 === rowState || 77 === rowState || 109 === rowState || 86 === rowState ? (rowTag = rowState, rowState = 2, i++) : 64 < rowState && 91 > rowState || 35 === rowState || 114 === rowState || 120 === rowState ? (rowTag = rowState, rowState = 3, i++) : (rowTag = 0, rowState = 3);
            continue;
          case 2:
            lastIdx = value[i++];
            44 === lastIdx ? rowState = 4 : rowLength = rowLength << 4 | (96 < lastIdx ? lastIdx - 87 : lastIdx - 48);
            continue;
          case 3:
            lastIdx = value.indexOf(10, i);
            break;
          case 4:
            lastIdx = i + rowLength, lastIdx > value.length && (lastIdx = -1);
        }
        var offset = value.byteOffset + i;
        if (-1 < lastIdx)
          rowLength = new Uint8Array(value.buffer, offset, lastIdx - i), processFullBinaryRow(
            response,
            streamState,
            _ref,
            rowTag,
            buffer,
            rowLength
          ), i = lastIdx, 3 === rowState && i++, rowLength = _ref = rowTag = rowState = 0, buffer.length = 0;
        else {
          value = new Uint8Array(value.buffer, offset, value.byteLength - i);
          buffer.push(value);
          rowLength -= value.byteLength;
          break;
        }
      }
      streamState._rowState = rowState;
      streamState._rowID = _ref;
      streamState._rowTag = rowTag;
      streamState._rowLength = rowLength;
      return reader.read().then(progress).catch(error);
    }
    function error(e) {
      reportGlobalError(response, e);
    }
    var streamState = {
      _rowState: 0,
      _rowID: 0,
      _rowTag: 0,
      _rowLength: 0,
      _buffer: []
    }, reader = stream.getReader();
    reader.read().then(progress).catch(error);
  }
  reactServerDomWebpackClient_edge_production.createFromFetch = function(promiseForResponse, options) {
    var response = createResponseFromOptions(options);
    promiseForResponse.then(
      function(r) {
        startReadingFromStream(response, r.body, close.bind(null, response));
      },
      function(e) {
        reportGlobalError(response, e);
      }
    );
    return getChunk(response, 0);
  };
  reactServerDomWebpackClient_edge_production.createFromReadableStream = function(stream, options) {
    options = createResponseFromOptions(options);
    startReadingFromStream(options, stream, close.bind(null, options));
    return getChunk(options, 0);
  };
  reactServerDomWebpackClient_edge_production.createServerReference = function(id) {
    return createServerReference$1(id, noServerCall);
  };
  reactServerDomWebpackClient_edge_production.createTemporaryReferenceSet = function() {
    return /* @__PURE__ */ new Map();
  };
  reactServerDomWebpackClient_edge_production.encodeReply = function(value, options) {
    return new Promise(function(resolve, reject) {
      var abort = processReply(
        value,
        "",
        options && options.temporaryReferences ? options.temporaryReferences : void 0,
        resolve,
        reject
      );
      if (options && options.signal) {
        var signal = options.signal;
        if (signal.aborted) abort(signal.reason);
        else {
          var listener = function() {
            abort(signal.reason);
            signal.removeEventListener("abort", listener);
          };
          signal.addEventListener("abort", listener);
        }
      }
    });
  };
  reactServerDomWebpackClient_edge_production.registerServerReference = function(reference, id, encodeFormAction) {
    registerBoundServerReference(reference, id, null, encodeFormAction);
    return reference;
  };
  return reactServerDomWebpackClient_edge_production;
}
var reactServerDomWebpackClient_edge_development = {};
var hasRequiredReactServerDomWebpackClient_edge_development;
function requireReactServerDomWebpackClient_edge_development() {
  if (hasRequiredReactServerDomWebpackClient_edge_development) return reactServerDomWebpackClient_edge_development;
  hasRequiredReactServerDomWebpackClient_edge_development = 1;
  "production" !== process.env.NODE_ENV && (function() {
    function resolveClientReference(bundlerConfig, metadata2) {
      if (bundlerConfig) {
        var moduleExports = bundlerConfig[metadata2[0]];
        if (bundlerConfig = moduleExports && moduleExports[metadata2[2]])
          moduleExports = bundlerConfig.name;
        else {
          bundlerConfig = moduleExports && moduleExports["*"];
          if (!bundlerConfig)
            throw Error(
              'Could not find the module "' + metadata2[0] + '" in the React Server Consumer Manifest. This is probably a bug in the React Server Components bundler.'
            );
          moduleExports = metadata2[2];
        }
        return 4 === metadata2.length ? [bundlerConfig.id, bundlerConfig.chunks, moduleExports, 1] : [bundlerConfig.id, bundlerConfig.chunks, moduleExports];
      }
      return metadata2;
    }
    function resolveServerReference(bundlerConfig, id) {
      var name = "", resolvedModuleData = bundlerConfig[id];
      if (resolvedModuleData) name = resolvedModuleData.name;
      else {
        var idx = id.lastIndexOf("#");
        -1 !== idx && (name = id.slice(idx + 1), resolvedModuleData = bundlerConfig[id.slice(0, idx)]);
        if (!resolvedModuleData)
          throw Error(
            'Could not find the module "' + id + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.'
          );
      }
      return resolvedModuleData.async ? [resolvedModuleData.id, resolvedModuleData.chunks, name, 1] : [resolvedModuleData.id, resolvedModuleData.chunks, name];
    }
    function requireAsyncModule(id) {
      var promise = __vite_rsc_require__(id);
      if ("function" !== typeof promise.then || "fulfilled" === promise.status)
        return null;
      promise.then(
        function(value) {
          promise.status = "fulfilled";
          promise.value = value;
        },
        function(reason) {
          promise.status = "rejected";
          promise.reason = reason;
        }
      );
      return promise;
    }
    function ignoreReject() {
    }
    function preloadModule(metadata2) {
      for (var chunks = metadata2[1], promises = [], i = 0; i < chunks.length; ) {
        var chunkId = chunks[i++];
        chunks[i++];
        var entry = chunkCache.get(chunkId);
        if (void 0 === entry) {
          entry = __webpack_chunk_load__(chunkId);
          promises.push(entry);
          var resolve = chunkCache.set.bind(chunkCache, chunkId, null);
          entry.then(resolve, ignoreReject);
          chunkCache.set(chunkId, entry);
        } else null !== entry && promises.push(entry);
      }
      return 4 === metadata2.length ? 0 === promises.length ? requireAsyncModule(metadata2[0]) : Promise.all(promises).then(function() {
        return requireAsyncModule(metadata2[0]);
      }) : 0 < promises.length ? Promise.all(promises) : null;
    }
    function requireModule2(metadata2) {
      var moduleExports = __vite_rsc_require__(metadata2[0]);
      if (4 === metadata2.length && "function" === typeof moduleExports.then)
        if ("fulfilled" === moduleExports.status)
          moduleExports = moduleExports.value;
        else throw moduleExports.reason;
      if ("*" === metadata2[2]) return moduleExports;
      if ("" === metadata2[2])
        return moduleExports.__esModule ? moduleExports.default : moduleExports;
      if (hasOwnProperty.call(moduleExports, metadata2[2]))
        return moduleExports[metadata2[2]];
    }
    function prepareDestinationWithChunks(moduleLoading, chunks, nonce$jscomp$0) {
      if (null !== moduleLoading)
        for (var i = 1; i < chunks.length; i += 2) {
          var nonce = nonce$jscomp$0, JSCompiler_temp_const = ReactDOMSharedInternals.d, JSCompiler_temp_const$jscomp$0 = JSCompiler_temp_const.X, JSCompiler_temp_const$jscomp$1 = moduleLoading.prefix + chunks[i];
          var JSCompiler_inline_result = moduleLoading.crossOrigin;
          JSCompiler_inline_result = "string" === typeof JSCompiler_inline_result ? "use-credentials" === JSCompiler_inline_result ? JSCompiler_inline_result : "" : void 0;
          JSCompiler_temp_const$jscomp$0.call(
            JSCompiler_temp_const,
            JSCompiler_temp_const$jscomp$1,
            { crossOrigin: JSCompiler_inline_result, nonce }
          );
        }
    }
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable)
        return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function isObjectPrototype(object) {
      if (!object) return false;
      var ObjectPrototype2 = Object.prototype;
      if (object === ObjectPrototype2) return true;
      if (getPrototypeOf(object)) return false;
      object = Object.getOwnPropertyNames(object);
      for (var i = 0; i < object.length; i++)
        if (!(object[i] in ObjectPrototype2)) return false;
      return true;
    }
    function isSimpleObject(object) {
      if (!isObjectPrototype(getPrototypeOf(object))) return false;
      for (var names = Object.getOwnPropertyNames(object), i = 0; i < names.length; i++) {
        var descriptor = Object.getOwnPropertyDescriptor(object, names[i]);
        if (!descriptor || !descriptor.enumerable && ("key" !== names[i] && "ref" !== names[i] || "function" !== typeof descriptor.get))
          return false;
      }
      return true;
    }
    function objectName(object) {
      object = Object.prototype.toString.call(object);
      return object.slice(8, object.length - 1);
    }
    function describeKeyForErrorMessage(key) {
      var encodedKey = JSON.stringify(key);
      return '"' + key + '"' === encodedKey ? key : encodedKey;
    }
    function describeValueForErrorMessage(value) {
      switch (typeof value) {
        case "string":
          return JSON.stringify(
            10 >= value.length ? value : value.slice(0, 10) + "..."
          );
        case "object":
          if (isArrayImpl(value)) return "[...]";
          if (null !== value && value.$$typeof === CLIENT_REFERENCE_TAG)
            return "client";
          value = objectName(value);
          return "Object" === value ? "{...}" : value;
        case "function":
          return value.$$typeof === CLIENT_REFERENCE_TAG ? "client" : (value = value.displayName || value.name) ? "function " + value : "function";
        default:
          return String(value);
      }
    }
    function describeElementType(type) {
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if ("object" === typeof type)
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeElementType(type.render);
          case REACT_MEMO_TYPE:
            return describeElementType(type.type);
          case REACT_LAZY_TYPE:
            var payload = type._payload;
            type = type._init;
            try {
              return describeElementType(type(payload));
            } catch (x) {
            }
        }
      return "";
    }
    function describeObjectForErrorMessage(objectOrArray, expandedName) {
      var objKind = objectName(objectOrArray);
      if ("Object" !== objKind && "Array" !== objKind) return objKind;
      var start = -1, length = 0;
      if (isArrayImpl(objectOrArray))
        if (jsxChildrenParents.has(objectOrArray)) {
          var type = jsxChildrenParents.get(objectOrArray);
          objKind = "<" + describeElementType(type) + ">";
          for (var i = 0; i < objectOrArray.length; i++) {
            var value = objectOrArray[i];
            value = "string" === typeof value ? value : "object" === typeof value && null !== value ? "{" + describeObjectForErrorMessage(value) + "}" : "{" + describeValueForErrorMessage(value) + "}";
            "" + i === expandedName ? (start = objKind.length, length = value.length, objKind += value) : objKind = 15 > value.length && 40 > objKind.length + value.length ? objKind + value : objKind + "{...}";
          }
          objKind += "</" + describeElementType(type) + ">";
        } else {
          objKind = "[";
          for (type = 0; type < objectOrArray.length; type++)
            0 < type && (objKind += ", "), i = objectOrArray[type], i = "object" === typeof i && null !== i ? describeObjectForErrorMessage(i) : describeValueForErrorMessage(i), "" + type === expandedName ? (start = objKind.length, length = i.length, objKind += i) : objKind = 10 > i.length && 40 > objKind.length + i.length ? objKind + i : objKind + "...";
          objKind += "]";
        }
      else if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE)
        objKind = "<" + describeElementType(objectOrArray.type) + "/>";
      else {
        if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) return "client";
        if (jsxPropsParents.has(objectOrArray)) {
          objKind = jsxPropsParents.get(objectOrArray);
          objKind = "<" + (describeElementType(objKind) || "...");
          type = Object.keys(objectOrArray);
          for (i = 0; i < type.length; i++) {
            objKind += " ";
            value = type[i];
            objKind += describeKeyForErrorMessage(value) + "=";
            var _value2 = objectOrArray[value];
            var _substr2 = value === expandedName && "object" === typeof _value2 && null !== _value2 ? describeObjectForErrorMessage(_value2) : describeValueForErrorMessage(_value2);
            "string" !== typeof _value2 && (_substr2 = "{" + _substr2 + "}");
            value === expandedName ? (start = objKind.length, length = _substr2.length, objKind += _substr2) : objKind = 10 > _substr2.length && 40 > objKind.length + _substr2.length ? objKind + _substr2 : objKind + "...";
          }
          objKind += ">";
        } else {
          objKind = "{";
          type = Object.keys(objectOrArray);
          for (i = 0; i < type.length; i++)
            0 < i && (objKind += ", "), value = type[i], objKind += describeKeyForErrorMessage(value) + ": ", _value2 = objectOrArray[value], _value2 = "object" === typeof _value2 && null !== _value2 ? describeObjectForErrorMessage(_value2) : describeValueForErrorMessage(_value2), value === expandedName ? (start = objKind.length, length = _value2.length, objKind += _value2) : objKind = 10 > _value2.length && 40 > objKind.length + _value2.length ? objKind + _value2 : objKind + "...";
          objKind += "}";
        }
      }
      return void 0 === expandedName ? objKind : -1 < start && 0 < length ? (objectOrArray = " ".repeat(start) + "^".repeat(length), "\n  " + objKind + "\n  " + objectOrArray) : "\n  " + objKind;
    }
    function serializeNumber(number) {
      return Number.isFinite(number) ? 0 === number && -Infinity === 1 / number ? "$-0" : number : Infinity === number ? "$Infinity" : -Infinity === number ? "$-Infinity" : "$NaN";
    }
    function processReply(root, formFieldPrefix, temporaryReferences, resolve, reject) {
      function serializeTypedArray(tag, typedArray) {
        typedArray = new Blob([
          new Uint8Array(
            typedArray.buffer,
            typedArray.byteOffset,
            typedArray.byteLength
          )
        ]);
        var blobId = nextPartId++;
        null === formData && (formData = new FormData());
        formData.append(formFieldPrefix + blobId, typedArray);
        return "$" + tag + blobId.toString(16);
      }
      function serializeBinaryReader(reader) {
        function progress(entry) {
          entry.done ? (entry = nextPartId++, data.append(formFieldPrefix + entry, new Blob(buffer)), data.append(
            formFieldPrefix + streamId,
            '"$o' + entry.toString(16) + '"'
          ), data.append(formFieldPrefix + streamId, "C"), pendingParts--, 0 === pendingParts && resolve(data)) : (buffer.push(entry.value), reader.read(new Uint8Array(1024)).then(progress, reject));
        }
        null === formData && (formData = new FormData());
        var data = formData;
        pendingParts++;
        var streamId = nextPartId++, buffer = [];
        reader.read(new Uint8Array(1024)).then(progress, reject);
        return "$r" + streamId.toString(16);
      }
      function serializeReader(reader) {
        function progress(entry) {
          if (entry.done)
            data.append(formFieldPrefix + streamId, "C"), pendingParts--, 0 === pendingParts && resolve(data);
          else
            try {
              var partJSON = JSON.stringify(entry.value, resolveToJSON);
              data.append(formFieldPrefix + streamId, partJSON);
              reader.read().then(progress, reject);
            } catch (x) {
              reject(x);
            }
        }
        null === formData && (formData = new FormData());
        var data = formData;
        pendingParts++;
        var streamId = nextPartId++;
        reader.read().then(progress, reject);
        return "$R" + streamId.toString(16);
      }
      function serializeReadableStream(stream) {
        try {
          var binaryReader = stream.getReader({ mode: "byob" });
        } catch (x) {
          return serializeReader(stream.getReader());
        }
        return serializeBinaryReader(binaryReader);
      }
      function serializeAsyncIterable(iterable, iterator) {
        function progress(entry) {
          if (entry.done) {
            if (void 0 === entry.value)
              data.append(formFieldPrefix + streamId, "C");
            else
              try {
                var partJSON = JSON.stringify(entry.value, resolveToJSON);
                data.append(formFieldPrefix + streamId, "C" + partJSON);
              } catch (x) {
                reject(x);
                return;
              }
            pendingParts--;
            0 === pendingParts && resolve(data);
          } else
            try {
              var _partJSON = JSON.stringify(entry.value, resolveToJSON);
              data.append(formFieldPrefix + streamId, _partJSON);
              iterator.next().then(progress, reject);
            } catch (x$0) {
              reject(x$0);
            }
        }
        null === formData && (formData = new FormData());
        var data = formData;
        pendingParts++;
        var streamId = nextPartId++;
        iterable = iterable === iterator;
        iterator.next().then(progress, reject);
        return "$" + (iterable ? "x" : "X") + streamId.toString(16);
      }
      function resolveToJSON(key, value) {
        "__proto__" === key && console.error(
          "Expected not to serialize an object with own property `__proto__`. When parsed this property will be omitted.%s",
          describeObjectForErrorMessage(this, key)
        );
        var originalValue = this[key];
        "object" !== typeof originalValue || originalValue === value || originalValue instanceof Date || ("Object" !== objectName(originalValue) ? console.error(
          "Only plain objects can be passed to Server Functions from the Client. %s objects are not supported.%s",
          objectName(originalValue),
          describeObjectForErrorMessage(this, key)
        ) : console.error(
          "Only plain objects can be passed to Server Functions from the Client. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.%s",
          describeObjectForErrorMessage(this, key)
        ));
        if (null === value) return null;
        if ("object" === typeof value) {
          switch (value.$$typeof) {
            case REACT_ELEMENT_TYPE:
              if (void 0 !== temporaryReferences && -1 === key.indexOf(":")) {
                var parentReference = writtenObjects.get(this);
                if (void 0 !== parentReference)
                  return temporaryReferences.set(parentReference + ":" + key, value), "$T";
              }
              throw Error(
                "React Element cannot be passed to Server Functions from the Client without a temporary reference set. Pass a TemporaryReferenceSet to the options." + describeObjectForErrorMessage(this, key)
              );
            case REACT_LAZY_TYPE:
              originalValue = value._payload;
              var init2 = value._init;
              null === formData && (formData = new FormData());
              pendingParts++;
              try {
                parentReference = init2(originalValue);
                var lazyId = nextPartId++, partJSON = serializeModel(parentReference, lazyId);
                formData.append(formFieldPrefix + lazyId, partJSON);
                return "$" + lazyId.toString(16);
              } catch (x) {
                if ("object" === typeof x && null !== x && "function" === typeof x.then) {
                  pendingParts++;
                  var _lazyId = nextPartId++;
                  parentReference = function() {
                    try {
                      var _partJSON2 = serializeModel(value, _lazyId), _data = formData;
                      _data.append(formFieldPrefix + _lazyId, _partJSON2);
                      pendingParts--;
                      0 === pendingParts && resolve(_data);
                    } catch (reason) {
                      reject(reason);
                    }
                  };
                  x.then(parentReference, parentReference);
                  return "$" + _lazyId.toString(16);
                }
                reject(x);
                return null;
              } finally {
                pendingParts--;
              }
          }
          parentReference = writtenObjects.get(value);
          if ("function" === typeof value.then) {
            if (void 0 !== parentReference)
              if (modelRoot === value) modelRoot = null;
              else return parentReference;
            null === formData && (formData = new FormData());
            pendingParts++;
            var promiseId = nextPartId++;
            key = "$@" + promiseId.toString(16);
            writtenObjects.set(value, key);
            value.then(function(partValue) {
              try {
                var previousReference = writtenObjects.get(partValue);
                var _partJSON3 = void 0 !== previousReference ? JSON.stringify(previousReference) : serializeModel(partValue, promiseId);
                partValue = formData;
                partValue.append(formFieldPrefix + promiseId, _partJSON3);
                pendingParts--;
                0 === pendingParts && resolve(partValue);
              } catch (reason) {
                reject(reason);
              }
            }, reject);
            return key;
          }
          if (void 0 !== parentReference)
            if (modelRoot === value) modelRoot = null;
            else return parentReference;
          else
            -1 === key.indexOf(":") && (parentReference = writtenObjects.get(this), void 0 !== parentReference && (parentReference = parentReference + ":" + key, writtenObjects.set(value, parentReference), void 0 !== temporaryReferences && temporaryReferences.set(parentReference, value)));
          if (isArrayImpl(value)) return value;
          if (value instanceof FormData) {
            null === formData && (formData = new FormData());
            var _data3 = formData;
            key = nextPartId++;
            var prefix2 = formFieldPrefix + key + "_";
            value.forEach(function(originalValue2, originalKey) {
              _data3.append(prefix2 + originalKey, originalValue2);
            });
            return "$K" + key.toString(16);
          }
          if (value instanceof Map)
            return key = nextPartId++, parentReference = serializeModel(Array.from(value), key), null === formData && (formData = new FormData()), formData.append(formFieldPrefix + key, parentReference), "$Q" + key.toString(16);
          if (value instanceof Set)
            return key = nextPartId++, parentReference = serializeModel(Array.from(value), key), null === formData && (formData = new FormData()), formData.append(formFieldPrefix + key, parentReference), "$W" + key.toString(16);
          if (value instanceof ArrayBuffer)
            return key = new Blob([value]), parentReference = nextPartId++, null === formData && (formData = new FormData()), formData.append(formFieldPrefix + parentReference, key), "$A" + parentReference.toString(16);
          if (value instanceof Int8Array)
            return serializeTypedArray("O", value);
          if (value instanceof Uint8Array)
            return serializeTypedArray("o", value);
          if (value instanceof Uint8ClampedArray)
            return serializeTypedArray("U", value);
          if (value instanceof Int16Array)
            return serializeTypedArray("S", value);
          if (value instanceof Uint16Array)
            return serializeTypedArray("s", value);
          if (value instanceof Int32Array)
            return serializeTypedArray("L", value);
          if (value instanceof Uint32Array)
            return serializeTypedArray("l", value);
          if (value instanceof Float32Array)
            return serializeTypedArray("G", value);
          if (value instanceof Float64Array)
            return serializeTypedArray("g", value);
          if (value instanceof BigInt64Array)
            return serializeTypedArray("M", value);
          if (value instanceof BigUint64Array)
            return serializeTypedArray("m", value);
          if (value instanceof DataView) return serializeTypedArray("V", value);
          if ("function" === typeof Blob && value instanceof Blob)
            return null === formData && (formData = new FormData()), key = nextPartId++, formData.append(formFieldPrefix + key, value), "$B" + key.toString(16);
          if (parentReference = getIteratorFn(value))
            return parentReference = parentReference.call(value), parentReference === value ? (key = nextPartId++, parentReference = serializeModel(
              Array.from(parentReference),
              key
            ), null === formData && (formData = new FormData()), formData.append(formFieldPrefix + key, parentReference), "$i" + key.toString(16)) : Array.from(parentReference);
          if ("function" === typeof ReadableStream && value instanceof ReadableStream)
            return serializeReadableStream(value);
          parentReference = value[ASYNC_ITERATOR];
          if ("function" === typeof parentReference)
            return serializeAsyncIterable(value, parentReference.call(value));
          parentReference = getPrototypeOf(value);
          if (parentReference !== ObjectPrototype && (null === parentReference || null !== getPrototypeOf(parentReference))) {
            if (void 0 === temporaryReferences)
              throw Error(
                "Only plain objects, and a few built-ins, can be passed to Server Functions. Classes or null prototypes are not supported." + describeObjectForErrorMessage(this, key)
              );
            return "$T";
          }
          value.$$typeof === REACT_CONTEXT_TYPE ? console.error(
            "React Context Providers cannot be passed to Server Functions from the Client.%s",
            describeObjectForErrorMessage(this, key)
          ) : "Object" !== objectName(value) ? console.error(
            "Only plain objects can be passed to Server Functions from the Client. %s objects are not supported.%s",
            objectName(value),
            describeObjectForErrorMessage(this, key)
          ) : isSimpleObject(value) ? Object.getOwnPropertySymbols && (parentReference = Object.getOwnPropertySymbols(value), 0 < parentReference.length && console.error(
            "Only plain objects can be passed to Server Functions from the Client. Objects with symbol properties like %s are not supported.%s",
            parentReference[0].description,
            describeObjectForErrorMessage(this, key)
          )) : console.error(
            "Only plain objects can be passed to Server Functions from the Client. Classes or other objects with methods are not supported.%s",
            describeObjectForErrorMessage(this, key)
          );
          return value;
        }
        if ("string" === typeof value) {
          if ("Z" === value[value.length - 1] && this[key] instanceof Date)
            return "$D" + value;
          key = "$" === value[0] ? "$" + value : value;
          return key;
        }
        if ("boolean" === typeof value) return value;
        if ("number" === typeof value) return serializeNumber(value);
        if ("undefined" === typeof value) return "$undefined";
        if ("function" === typeof value) {
          parentReference = knownServerReferences.get(value);
          if (void 0 !== parentReference) {
            key = writtenObjects.get(value);
            if (void 0 !== key) return key;
            key = JSON.stringify(
              { id: parentReference.id, bound: parentReference.bound },
              resolveToJSON
            );
            null === formData && (formData = new FormData());
            parentReference = nextPartId++;
            formData.set(formFieldPrefix + parentReference, key);
            key = "$h" + parentReference.toString(16);
            writtenObjects.set(value, key);
            return key;
          }
          if (void 0 !== temporaryReferences && -1 === key.indexOf(":") && (parentReference = writtenObjects.get(this), void 0 !== parentReference))
            return temporaryReferences.set(parentReference + ":" + key, value), "$T";
          throw Error(
            "Client Functions cannot be passed directly to Server Functions. Only Functions passed from the Server can be passed back again."
          );
        }
        if ("symbol" === typeof value) {
          if (void 0 !== temporaryReferences && -1 === key.indexOf(":") && (parentReference = writtenObjects.get(this), void 0 !== parentReference))
            return temporaryReferences.set(parentReference + ":" + key, value), "$T";
          throw Error(
            "Symbols cannot be passed to a Server Function without a temporary reference set. Pass a TemporaryReferenceSet to the options." + describeObjectForErrorMessage(this, key)
          );
        }
        if ("bigint" === typeof value) return "$n" + value.toString(10);
        throw Error(
          "Type " + typeof value + " is not supported as an argument to a Server Function."
        );
      }
      function serializeModel(model, id) {
        "object" === typeof model && null !== model && (id = "$" + id.toString(16), writtenObjects.set(model, id), void 0 !== temporaryReferences && temporaryReferences.set(id, model));
        modelRoot = model;
        return JSON.stringify(model, resolveToJSON);
      }
      var nextPartId = 1, pendingParts = 0, formData = null, writtenObjects = /* @__PURE__ */ new WeakMap(), modelRoot = root, json = serializeModel(root, 0);
      null === formData ? resolve(json) : (formData.set(formFieldPrefix + "0", json), 0 === pendingParts && resolve(formData));
      return function() {
        0 < pendingParts && (pendingParts = 0, null === formData ? resolve(json) : resolve(formData));
      };
    }
    function encodeFormData(reference) {
      var resolve, reject, thenable = new Promise(function(res, rej) {
        resolve = res;
        reject = rej;
      });
      processReply(
        reference,
        "",
        void 0,
        function(body) {
          if ("string" === typeof body) {
            var data = new FormData();
            data.append("0", body);
            body = data;
          }
          thenable.status = "fulfilled";
          thenable.value = body;
          resolve(body);
        },
        function(e) {
          thenable.status = "rejected";
          thenable.reason = e;
          reject(e);
        }
      );
      return thenable;
    }
    function defaultEncodeFormAction(identifierPrefix) {
      var referenceClosure = knownServerReferences.get(this);
      if (!referenceClosure)
        throw Error(
          "Tried to encode a Server Action from a different instance than the encoder is from. This is a bug in React."
        );
      var data = null;
      if (null !== referenceClosure.bound) {
        data = boundCache.get(referenceClosure);
        data || (data = encodeFormData({
          id: referenceClosure.id,
          bound: referenceClosure.bound
        }), boundCache.set(referenceClosure, data));
        if ("rejected" === data.status) throw data.reason;
        if ("fulfilled" !== data.status) throw data;
        referenceClosure = data.value;
        var prefixedData = new FormData();
        referenceClosure.forEach(function(value, key) {
          prefixedData.append("$ACTION_" + identifierPrefix + ":" + key, value);
        });
        data = prefixedData;
        referenceClosure = "$ACTION_REF_" + identifierPrefix;
      } else referenceClosure = "$ACTION_ID_" + referenceClosure.id;
      return {
        name: referenceClosure,
        method: "POST",
        encType: "multipart/form-data",
        data
      };
    }
    function isSignatureEqual(referenceId, numberOfBoundArgs) {
      var referenceClosure = knownServerReferences.get(this);
      if (!referenceClosure)
        throw Error(
          "Tried to encode a Server Action from a different instance than the encoder is from. This is a bug in React."
        );
      if (referenceClosure.id !== referenceId) return false;
      var boundPromise = referenceClosure.bound;
      if (null === boundPromise) return 0 === numberOfBoundArgs;
      switch (boundPromise.status) {
        case "fulfilled":
          return boundPromise.value.length === numberOfBoundArgs;
        case "pending":
          throw boundPromise;
        case "rejected":
          throw boundPromise.reason;
        default:
          throw "string" !== typeof boundPromise.status && (boundPromise.status = "pending", boundPromise.then(
            function(boundArgs) {
              boundPromise.status = "fulfilled";
              boundPromise.value = boundArgs;
            },
            function(error) {
              boundPromise.status = "rejected";
              boundPromise.reason = error;
            }
          )), boundPromise;
      }
    }
    function createFakeServerFunction(name, filename, sourceMap, line, col, environmentName, innerFunction) {
      name || (name = "<anonymous>");
      var encodedName = JSON.stringify(name);
      1 >= line ? (line = encodedName.length + 7, col = "s=>({" + encodedName + " ".repeat(col < line ? 0 : col - line) + ":(...args) => s(...args)})\n/* This module is a proxy to a Server Action. Turn on Source Maps to see the server source. */") : col = "/* This module is a proxy to a Server Action. Turn on Source Maps to see the server source. */" + "\n".repeat(line - 2) + "server=>({" + encodedName + ":\n" + " ".repeat(1 > col ? 0 : col - 1) + "(...args) => server(...args)})";
      filename.startsWith("/") && (filename = "file://" + filename);
      sourceMap ? (col += "\n//# sourceURL=about://React/" + encodeURIComponent(environmentName) + "/" + encodeURI(filename) + "?s" + fakeServerFunctionIdx++, col += "\n//# sourceMappingURL=" + sourceMap) : filename && (col += "\n//# sourceURL=" + filename);
      try {
        return (0, eval)(col)(innerFunction)[name];
      } catch (x) {
        return innerFunction;
      }
    }
    function registerBoundServerReference(reference, id, bound, encodeFormAction) {
      knownServerReferences.has(reference) || (knownServerReferences.set(reference, {
        id,
        originalBind: reference.bind,
        bound
      }), Object.defineProperties(reference, {
        $$FORM_ACTION: {
          value: void 0 === encodeFormAction ? defaultEncodeFormAction : function() {
            var referenceClosure = knownServerReferences.get(this);
            if (!referenceClosure)
              throw Error(
                "Tried to encode a Server Action from a different instance than the encoder is from. This is a bug in React."
              );
            var boundPromise = referenceClosure.bound;
            null === boundPromise && (boundPromise = Promise.resolve([]));
            return encodeFormAction(referenceClosure.id, boundPromise);
          }
        },
        $$IS_SIGNATURE_EQUAL: { value: isSignatureEqual },
        bind: { value: bind }
      }));
    }
    function bind() {
      var referenceClosure = knownServerReferences.get(this);
      if (!referenceClosure) return FunctionBind.apply(this, arguments);
      var newFn = referenceClosure.originalBind.apply(this, arguments);
      null != arguments[0] && console.error(
        'Cannot bind "this" of a Server Action. Pass null or undefined as the first argument to .bind().'
      );
      var args = ArraySlice.call(arguments, 1), boundPromise = null;
      boundPromise = null !== referenceClosure.bound ? Promise.resolve(referenceClosure.bound).then(function(boundArgs) {
        return boundArgs.concat(args);
      }) : Promise.resolve(args);
      knownServerReferences.set(newFn, {
        id: referenceClosure.id,
        originalBind: newFn.bind,
        bound: boundPromise
      });
      Object.defineProperties(newFn, {
        $$FORM_ACTION: { value: this.$$FORM_ACTION },
        $$IS_SIGNATURE_EQUAL: { value: isSignatureEqual },
        bind: { value: bind }
      });
      return newFn;
    }
    function createBoundServerReference(metaData, callServer, encodeFormAction, findSourceMapURL) {
      function action() {
        var args = Array.prototype.slice.call(arguments);
        return bound ? "fulfilled" === bound.status ? callServer(id, bound.value.concat(args)) : Promise.resolve(bound).then(function(boundArgs) {
          return callServer(id, boundArgs.concat(args));
        }) : callServer(id, args);
      }
      var id = metaData.id, bound = metaData.bound, location = metaData.location;
      if (location) {
        var functionName = metaData.name || "", filename = location[1], line = location[2];
        location = location[3];
        metaData = metaData.env || "Server";
        findSourceMapURL = null == findSourceMapURL ? null : findSourceMapURL(filename, metaData);
        action = createFakeServerFunction(
          functionName,
          filename,
          findSourceMapURL,
          line,
          location,
          metaData,
          action
        );
      }
      registerBoundServerReference(action, id, bound, encodeFormAction);
      return action;
    }
    function parseStackLocation(error) {
      error = error.stack;
      error.startsWith("Error: react-stack-top-frame\n") && (error = error.slice(29));
      var endOfFirst = error.indexOf("\n");
      if (-1 !== endOfFirst) {
        var endOfSecond = error.indexOf("\n", endOfFirst + 1);
        endOfFirst = -1 === endOfSecond ? error.slice(endOfFirst + 1) : error.slice(endOfFirst + 1, endOfSecond);
      } else endOfFirst = error;
      error = v8FrameRegExp.exec(endOfFirst);
      if (!error && (error = jscSpiderMonkeyFrameRegExp.exec(endOfFirst), !error))
        return null;
      endOfFirst = error[1] || "";
      "<anonymous>" === endOfFirst && (endOfFirst = "");
      endOfSecond = error[2] || error[5] || "";
      "<anonymous>" === endOfSecond && (endOfSecond = "");
      return [
        endOfFirst,
        endOfSecond,
        +(error[3] || error[6]),
        +(error[4] || error[7])
      ];
    }
    function createServerReference$1(id, callServer, encodeFormAction, findSourceMapURL, functionName) {
      function action() {
        var args = Array.prototype.slice.call(arguments);
        return callServer(id, args);
      }
      var location = parseStackLocation(Error("react-stack-top-frame"));
      if (null !== location) {
        var filename = location[1], line = location[2];
        location = location[3];
        findSourceMapURL = null == findSourceMapURL ? null : findSourceMapURL(filename, "Client");
        action = createFakeServerFunction(
          "",
          filename,
          findSourceMapURL,
          line,
          location,
          "Client",
          action
        );
      }
      registerBoundServerReference(action, id, null, encodeFormAction);
      return action;
    }
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeof type)
        switch ("number" === typeof type.tag && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    function getArrayKind(array) {
      for (var kind = 0, i = 0; i < array.length; i++) {
        var value = array[i];
        if ("object" === typeof value && null !== value)
          if (isArrayImpl(value) && 2 === value.length && "string" === typeof value[0]) {
            if (0 !== kind && 3 !== kind) return 1;
            kind = 3;
          } else return 1;
        else {
          if ("function" === typeof value || "string" === typeof value && 50 < value.length || 0 !== kind && 2 !== kind)
            return 1;
          kind = 2;
        }
      }
      return kind;
    }
    function addObjectToProperties(object, properties, indent, prefix2) {
      for (var key in object)
        hasOwnProperty.call(object, key) && "_" !== key[0] && addValueToProperties(key, object[key], properties, indent, prefix2);
    }
    function addValueToProperties(propertyName, value, properties, indent, prefix2) {
      switch (typeof value) {
        case "object":
          if (null === value) {
            value = "null";
            break;
          } else {
            if (value.$$typeof === REACT_ELEMENT_TYPE) {
              var typeName = getComponentNameFromType(value.type) || "…", key = value.key;
              value = value.props;
              var propsKeys = Object.keys(value), propsLength = propsKeys.length;
              if (null == key && 0 === propsLength) {
                value = "<" + typeName + " />";
                break;
              }
              if (3 > indent || 1 === propsLength && "children" === propsKeys[0] && null == key) {
                value = "<" + typeName + " … />";
                break;
              }
              properties.push([
                prefix2 + "  ".repeat(indent) + propertyName,
                "<" + typeName
              ]);
              null !== key && addValueToProperties(
                "key",
                key,
                properties,
                indent + 1,
                prefix2
              );
              propertyName = false;
              for (var propKey in value)
                "children" === propKey ? null != value.children && (!isArrayImpl(value.children) || 0 < value.children.length) && (propertyName = true) : hasOwnProperty.call(value, propKey) && "_" !== propKey[0] && addValueToProperties(
                  propKey,
                  value[propKey],
                  properties,
                  indent + 1,
                  prefix2
                );
              properties.push([
                "",
                propertyName ? ">…</" + typeName + ">" : "/>"
              ]);
              return;
            }
            typeName = Object.prototype.toString.call(value);
            typeName = typeName.slice(8, typeName.length - 1);
            if ("Array" === typeName) {
              if (propKey = getArrayKind(value), 2 === propKey || 0 === propKey) {
                value = JSON.stringify(value);
                break;
              } else if (3 === propKey) {
                properties.push([
                  prefix2 + "  ".repeat(indent) + propertyName,
                  ""
                ]);
                for (propertyName = 0; propertyName < value.length; propertyName++)
                  typeName = value[propertyName], addValueToProperties(
                    typeName[0],
                    typeName[1],
                    properties,
                    indent + 1,
                    prefix2
                  );
                return;
              }
            }
            if ("Promise" === typeName) {
              if ("fulfilled" === value.status) {
                if (typeName = properties.length, addValueToProperties(
                  propertyName,
                  value.value,
                  properties,
                  indent,
                  prefix2
                ), properties.length > typeName) {
                  properties = properties[typeName];
                  properties[1] = "Promise<" + (properties[1] || "Object") + ">";
                  return;
                }
              } else if ("rejected" === value.status && (typeName = properties.length, addValueToProperties(
                propertyName,
                value.reason,
                properties,
                indent,
                prefix2
              ), properties.length > typeName)) {
                properties = properties[typeName];
                properties[1] = "Rejected Promise<" + properties[1] + ">";
                return;
              }
              properties.push([
                "  ".repeat(indent) + propertyName,
                "Promise"
              ]);
              return;
            }
            "Object" === typeName && (propKey = Object.getPrototypeOf(value)) && "function" === typeof propKey.constructor && (typeName = propKey.constructor.name);
            properties.push([
              prefix2 + "  ".repeat(indent) + propertyName,
              "Object" === typeName ? 3 > indent ? "" : "…" : typeName
            ]);
            3 > indent && addObjectToProperties(value, properties, indent + 1, prefix2);
            return;
          }
        case "function":
          value = "" === value.name ? "() => {}" : value.name + "() {}";
          break;
        case "string":
          value = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects." === value ? "…" : JSON.stringify(value);
          break;
        case "undefined":
          value = "undefined";
          break;
        case "boolean":
          value = value ? "true" : "false";
          break;
        default:
          value = String(value);
      }
      properties.push([
        prefix2 + "  ".repeat(indent) + propertyName,
        value
      ]);
    }
    function getIODescription(value) {
      try {
        switch (typeof value) {
          case "object":
            if (null === value) return "";
            if (value instanceof Error) return String(value.message);
            if ("string" === typeof value.url) return value.url;
            if ("string" === typeof value.href) return value.href;
            if ("string" === typeof value.src) return value.src;
            if ("string" === typeof value.currentSrc) return value.currentSrc;
            if ("string" === typeof value.command) return value.command;
            if ("object" === typeof value.request && null !== value.request && "string" === typeof value.request.url)
              return value.request.url;
            if ("object" === typeof value.response && null !== value.response && "string" === typeof value.response.url)
              return value.response.url;
            if ("string" === typeof value.id || "number" === typeof value.id || "bigint" === typeof value.id)
              return String(value.id);
            if ("string" === typeof value.name) return value.name;
            var str = value.toString();
            return str.startsWith("[object ") || 5 > str.length || 500 < str.length ? "" : str;
          case "string":
            return 5 > value.length || 500 < value.length ? "" : value;
          case "number":
          case "bigint":
            return String(value);
          default:
            return "";
        }
      } catch (x) {
        return "";
      }
    }
    function markAllTracksInOrder() {
      supportsUserTiming && (console.timeStamp(
        "Server Requests Track",
        1e-3,
        1e-3,
        "Server Requests ⚛",
        void 0,
        "primary-light"
      ), console.timeStamp(
        "Server Components Track",
        1e-3,
        1e-3,
        "Primary",
        "Server Components ⚛",
        "primary-light"
      ));
    }
    function getIOColor(functionName) {
      switch (functionName.charCodeAt(0) % 3) {
        case 0:
          return "tertiary-light";
        case 1:
          return "tertiary";
        default:
          return "tertiary-dark";
      }
    }
    function getIOLongName(ioInfo, description, env, rootEnv) {
      ioInfo = ioInfo.name;
      description = "" === description ? ioInfo : ioInfo + " (" + description + ")";
      return env === rootEnv || void 0 === env ? description : description + " [" + env + "]";
    }
    function getIOShortName(ioInfo, description, env, rootEnv) {
      ioInfo = ioInfo.name;
      env = env === rootEnv || void 0 === env ? "" : " [" + env + "]";
      var desc = "";
      rootEnv = 30 - ioInfo.length - env.length;
      if (1 < rootEnv) {
        var l = description.length;
        if (0 < l && l <= rootEnv) desc = " (" + description + ")";
        else if (description.startsWith("http://") || description.startsWith("https://") || description.startsWith("/")) {
          var queryIdx = description.indexOf("?");
          -1 === queryIdx && (queryIdx = description.length);
          47 === description.charCodeAt(queryIdx - 1) && queryIdx--;
          desc = description.lastIndexOf("/", queryIdx - 1);
          queryIdx - desc < rootEnv ? desc = " (…" + description.slice(desc, queryIdx) + ")" : (l = description.slice(desc, desc + rootEnv / 2), description = description.slice(
            queryIdx - rootEnv / 2,
            queryIdx
          ), desc = " (" + (0 < desc ? "…" : "") + l + "…" + description + ")");
        }
      }
      return ioInfo + desc + env;
    }
    function logComponentAwait(asyncInfo, trackIdx, startTime, endTime, rootEnv, value) {
      if (supportsUserTiming && 0 < endTime) {
        var description = getIODescription(value), name = getIOShortName(
          asyncInfo.awaited,
          description,
          asyncInfo.env,
          rootEnv
        ), entryName = "await " + name;
        name = getIOColor(name);
        var debugTask = asyncInfo.debugTask || asyncInfo.awaited.debugTask;
        if (debugTask) {
          var properties = [];
          "object" === typeof value && null !== value ? addObjectToProperties(value, properties, 0, "") : void 0 !== value && addValueToProperties("awaited value", value, properties, 0, "");
          asyncInfo = getIOLongName(
            asyncInfo.awaited,
            description,
            asyncInfo.env,
            rootEnv
          );
          debugTask.run(
            performance.measure.bind(performance, entryName, {
              start: 0 > startTime ? 0 : startTime,
              end: endTime,
              detail: {
                devtools: {
                  color: name,
                  track: trackNames[trackIdx],
                  trackGroup: "Server Components ⚛",
                  properties,
                  tooltipText: asyncInfo
                }
              }
            })
          );
        } else
          console.timeStamp(
            entryName,
            0 > startTime ? 0 : startTime,
            endTime,
            trackNames[trackIdx],
            "Server Components ⚛",
            name
          );
      }
    }
    function logIOInfoErrored(ioInfo, rootEnv, error) {
      var startTime = ioInfo.start, endTime = ioInfo.end;
      if (supportsUserTiming && 0 <= endTime) {
        var description = getIODescription(error), entryName = getIOShortName(ioInfo, description, ioInfo.env, rootEnv), debugTask = ioInfo.debugTask;
        debugTask ? (error = [
          [
            "rejected with",
            "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error)
          ]
        ], ioInfo = getIOLongName(ioInfo, description, ioInfo.env, rootEnv) + " Rejected", debugTask.run(
          performance.measure.bind(performance, "​" + entryName, {
            start: 0 > startTime ? 0 : startTime,
            end: endTime,
            detail: {
              devtools: {
                color: "error",
                track: "Server Requests ⚛",
                properties: error,
                tooltipText: ioInfo
              }
            }
          })
        )) : console.timeStamp(
          entryName,
          0 > startTime ? 0 : startTime,
          endTime,
          "Server Requests ⚛",
          void 0,
          "error"
        );
      }
    }
    function logIOInfo(ioInfo, rootEnv, value) {
      var startTime = ioInfo.start, endTime = ioInfo.end;
      if (supportsUserTiming && 0 <= endTime) {
        var description = getIODescription(value), entryName = getIOShortName(ioInfo, description, ioInfo.env, rootEnv), color = getIOColor(entryName), debugTask = ioInfo.debugTask;
        if (debugTask) {
          var properties = [];
          "object" === typeof value && null !== value ? addObjectToProperties(value, properties, 0, "") : void 0 !== value && addValueToProperties("Resolved", value, properties, 0, "");
          ioInfo = getIOLongName(ioInfo, description, ioInfo.env, rootEnv);
          debugTask.run(
            performance.measure.bind(performance, "​" + entryName, {
              start: 0 > startTime ? 0 : startTime,
              end: endTime,
              detail: {
                devtools: {
                  color,
                  track: "Server Requests ⚛",
                  properties,
                  tooltipText: ioInfo
                }
              }
            })
          );
        } else
          console.timeStamp(
            entryName,
            0 > startTime ? 0 : startTime,
            endTime,
            "Server Requests ⚛",
            void 0,
            color
          );
      }
    }
    function prepareStackTrace(error, structuredStackTrace) {
      error = (error.name || "Error") + ": " + (error.message || "");
      for (var i = 0; i < structuredStackTrace.length; i++)
        error += "\n    at " + structuredStackTrace[i].toString();
      return error;
    }
    function ReactPromise(status, value, reason) {
      this.status = status;
      this.value = value;
      this.reason = reason;
      this._children = [];
      this._debugChunk = null;
      this._debugInfo = [];
    }
    function unwrapWeakResponse(weakResponse) {
      weakResponse = weakResponse.weak.deref();
      if (void 0 === weakResponse)
        throw Error(
          "We did not expect to receive new data after GC:ing the response."
        );
      return weakResponse;
    }
    function closeDebugChannel(debugChannel) {
      debugChannel.callback && debugChannel.callback("");
    }
    function readChunk(chunk) {
      switch (chunk.status) {
        case "resolved_model":
          initializeModelChunk(chunk);
          break;
        case "resolved_module":
          initializeModuleChunk(chunk);
      }
      switch (chunk.status) {
        case "fulfilled":
          return chunk.value;
        case "pending":
        case "blocked":
        case "halted":
          throw chunk;
        default:
          throw chunk.reason;
      }
    }
    function getRoot(weakResponse) {
      weakResponse = unwrapWeakResponse(weakResponse);
      return getChunk(weakResponse, 0);
    }
    function createPendingChunk(response) {
      0 === response._pendingChunks++ && (response._weakResponse.response = response, null !== response._pendingInitialRender && (clearTimeout(response._pendingInitialRender), response._pendingInitialRender = null));
      return new ReactPromise("pending", null, null);
    }
    function releasePendingChunk(response, chunk) {
      "pending" === chunk.status && 0 === --response._pendingChunks && (response._weakResponse.response = null, response._pendingInitialRender = setTimeout(
        flushInitialRenderPerformance.bind(null, response),
        100
      ));
    }
    function moveDebugInfoFromChunkToInnerValue(chunk, value) {
      value = resolveLazy(value);
      "object" !== typeof value || null === value || !isArrayImpl(value) && "function" !== typeof value[ASYNC_ITERATOR] && value.$$typeof !== REACT_ELEMENT_TYPE && value.$$typeof !== REACT_LAZY_TYPE || (chunk = chunk._debugInfo.splice(0), isArrayImpl(value._debugInfo) ? value._debugInfo.unshift.apply(value._debugInfo, chunk) : Object.defineProperty(value, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: chunk
      }));
    }
    function wakeChunk(listeners, value, chunk) {
      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        "function" === typeof listener ? listener(value) : fulfillReference(listener, value, chunk);
      }
      moveDebugInfoFromChunkToInnerValue(chunk, value);
    }
    function rejectChunk(listeners, error) {
      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        "function" === typeof listener ? listener(error) : rejectReference(listener, error);
      }
    }
    function resolveBlockedCycle(resolvedChunk, reference) {
      var referencedChunk = reference.handler.chunk;
      if (null === referencedChunk) return null;
      if (referencedChunk === resolvedChunk) return reference.handler;
      reference = referencedChunk.value;
      if (null !== reference)
        for (referencedChunk = 0; referencedChunk < reference.length; referencedChunk++) {
          var listener = reference[referencedChunk];
          if ("function" !== typeof listener && (listener = resolveBlockedCycle(resolvedChunk, listener), null !== listener))
            return listener;
        }
      return null;
    }
    function wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners) {
      switch (chunk.status) {
        case "fulfilled":
          wakeChunk(resolveListeners, chunk.value, chunk);
          break;
        case "blocked":
          for (var i = 0; i < resolveListeners.length; i++) {
            var listener = resolveListeners[i];
            if ("function" !== typeof listener) {
              var cyclicHandler = resolveBlockedCycle(chunk, listener);
              if (null !== cyclicHandler)
                switch (fulfillReference(listener, cyclicHandler.value, chunk), resolveListeners.splice(i, 1), i--, null !== rejectListeners && (listener = rejectListeners.indexOf(listener), -1 !== listener && rejectListeners.splice(listener, 1)), chunk.status) {
                  case "fulfilled":
                    wakeChunk(resolveListeners, chunk.value, chunk);
                    return;
                  case "rejected":
                    null !== rejectListeners && rejectChunk(rejectListeners, chunk.reason);
                    return;
                }
            }
          }
        case "pending":
          if (chunk.value)
            for (i = 0; i < resolveListeners.length; i++)
              chunk.value.push(resolveListeners[i]);
          else chunk.value = resolveListeners;
          if (chunk.reason) {
            if (rejectListeners)
              for (resolveListeners = 0; resolveListeners < rejectListeners.length; resolveListeners++)
                chunk.reason.push(rejectListeners[resolveListeners]);
          } else chunk.reason = rejectListeners;
          break;
        case "rejected":
          rejectListeners && rejectChunk(rejectListeners, chunk.reason);
      }
    }
    function triggerErrorOnChunk(response, chunk, error) {
      if ("pending" !== chunk.status && "blocked" !== chunk.status)
        chunk.reason.error(error);
      else {
        releasePendingChunk(response, chunk);
        var listeners = chunk.reason;
        if ("pending" === chunk.status && null != chunk._debugChunk) {
          var prevHandler = initializingHandler, prevChunk = initializingChunk;
          initializingHandler = null;
          chunk.status = "blocked";
          chunk.value = null;
          chunk.reason = null;
          initializingChunk = chunk;
          try {
            initializeDebugChunk(response, chunk);
          } finally {
            initializingHandler = prevHandler, initializingChunk = prevChunk;
          }
        }
        chunk.status = "rejected";
        chunk.reason = error;
        null !== listeners && rejectChunk(listeners, error);
      }
    }
    function createResolvedModelChunk(response, value) {
      return new ReactPromise("resolved_model", value, response);
    }
    function createResolvedIteratorResultChunk(response, value, done) {
      return new ReactPromise(
        "resolved_model",
        (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}",
        response
      );
    }
    function resolveIteratorResultChunk(response, chunk, value, done) {
      resolveModelChunk(
        response,
        chunk,
        (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}"
      );
    }
    function resolveModelChunk(response, chunk, value) {
      if ("pending" !== chunk.status) chunk.reason.enqueueModel(value);
      else {
        releasePendingChunk(response, chunk);
        var resolveListeners = chunk.value, rejectListeners = chunk.reason;
        chunk.status = "resolved_model";
        chunk.value = value;
        chunk.reason = response;
        null !== resolveListeners && (initializeModelChunk(chunk), wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners));
      }
    }
    function resolveModuleChunk(response, chunk, value) {
      if ("pending" === chunk.status || "blocked" === chunk.status) {
        releasePendingChunk(response, chunk);
        response = chunk.value;
        var rejectListeners = chunk.reason;
        chunk.status = "resolved_module";
        chunk.value = value;
        chunk.reason = null;
        value = [];
        null !== value && chunk._debugInfo.push.apply(chunk._debugInfo, value);
        null !== response && (initializeModuleChunk(chunk), wakeChunkIfInitialized(chunk, response, rejectListeners));
      }
    }
    function initializeDebugChunk(response, chunk) {
      var debugChunk = chunk._debugChunk;
      if (null !== debugChunk) {
        var debugInfo = chunk._debugInfo;
        try {
          if ("resolved_model" === debugChunk.status) {
            for (var idx = debugInfo.length, c = debugChunk._debugChunk; null !== c; )
              "fulfilled" !== c.status && idx++, c = c._debugChunk;
            initializeModelChunk(debugChunk);
            switch (debugChunk.status) {
              case "fulfilled":
                debugInfo[idx] = initializeDebugInfo(
                  response,
                  debugChunk.value
                );
                break;
              case "blocked":
              case "pending":
                waitForReference(
                  debugChunk,
                  debugInfo,
                  "" + idx,
                  response,
                  initializeDebugInfo,
                  [""],
                  true
                );
                break;
              default:
                throw debugChunk.reason;
            }
          } else
            switch (debugChunk.status) {
              case "fulfilled":
                break;
              case "blocked":
              case "pending":
                waitForReference(
                  debugChunk,
                  {},
                  "debug",
                  response,
                  initializeDebugInfo,
                  [""],
                  true
                );
                break;
              default:
                throw debugChunk.reason;
            }
        } catch (error) {
          triggerErrorOnChunk(response, chunk, error);
        }
      }
    }
    function initializeModelChunk(chunk) {
      var prevHandler = initializingHandler, prevChunk = initializingChunk;
      initializingHandler = null;
      var resolvedModel = chunk.value, response = chunk.reason;
      chunk.status = "blocked";
      chunk.value = null;
      chunk.reason = null;
      initializingChunk = chunk;
      initializeDebugChunk(response, chunk);
      try {
        var value = JSON.parse(resolvedModel, response._fromJSON), resolveListeners = chunk.value;
        if (null !== resolveListeners)
          for (chunk.value = null, chunk.reason = null, resolvedModel = 0; resolvedModel < resolveListeners.length; resolvedModel++) {
            var listener = resolveListeners[resolvedModel];
            "function" === typeof listener ? listener(value) : fulfillReference(listener, value, chunk);
          }
        if (null !== initializingHandler) {
          if (initializingHandler.errored) throw initializingHandler.reason;
          if (0 < initializingHandler.deps) {
            initializingHandler.value = value;
            initializingHandler.chunk = chunk;
            return;
          }
        }
        chunk.status = "fulfilled";
        chunk.value = value;
        moveDebugInfoFromChunkToInnerValue(chunk, value);
      } catch (error) {
        chunk.status = "rejected", chunk.reason = error;
      } finally {
        initializingHandler = prevHandler, initializingChunk = prevChunk;
      }
    }
    function initializeModuleChunk(chunk) {
      try {
        var value = requireModule2(chunk.value);
        chunk.status = "fulfilled";
        chunk.value = value;
      } catch (error) {
        chunk.status = "rejected", chunk.reason = error;
      }
    }
    function reportGlobalError(weakResponse, error) {
      if (void 0 !== weakResponse.weak.deref()) {
        var response = unwrapWeakResponse(weakResponse);
        response._closed = true;
        response._closedReason = error;
        response._chunks.forEach(function(chunk) {
          "pending" === chunk.status ? triggerErrorOnChunk(response, chunk, error) : "fulfilled" === chunk.status && null !== chunk.reason && chunk.reason.error(error);
        });
        weakResponse = response._debugChannel;
        void 0 !== weakResponse && (closeDebugChannel(weakResponse), response._debugChannel = void 0, null !== debugChannelRegistry && debugChannelRegistry.unregister(response));
      }
    }
    function nullRefGetter() {
      return null;
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return "<>";
      if ("function" === typeof type) return '"use client"';
      if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
        return type._init === readChunk ? '"use client"' : "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function initializeElement(response, element, lazyNode) {
      var stack = element._debugStack, owner = element._owner;
      null === owner && (element._owner = response._debugRootOwner);
      var env = response._rootEnvironmentName;
      null !== owner && null != owner.env && (env = owner.env);
      var normalizedStackTrace = null;
      null === owner && null != response._debugRootStack ? normalizedStackTrace = response._debugRootStack : null !== stack && (normalizedStackTrace = createFakeJSXCallStackInDEV(
        response,
        stack,
        env
      ));
      element._debugStack = normalizedStackTrace;
      normalizedStackTrace = null;
      supportsCreateTask && null !== stack && (normalizedStackTrace = console.createTask.bind(
        console,
        getTaskName(element.type)
      ), stack = buildFakeCallStack(
        response,
        stack,
        env,
        false,
        normalizedStackTrace
      ), env = null === owner ? null : initializeFakeTask(response, owner), null === env ? (env = response._debugRootTask, normalizedStackTrace = null != env ? env.run(stack) : stack()) : normalizedStackTrace = env.run(stack));
      element._debugTask = normalizedStackTrace;
      null !== owner && initializeFakeStack(response, owner);
      null !== lazyNode && (lazyNode._store && lazyNode._store.validated && !element._store.validated && (element._store.validated = lazyNode._store.validated), "fulfilled" === lazyNode._payload.status && lazyNode._debugInfo && (response = lazyNode._debugInfo.splice(0), element._debugInfo ? element._debugInfo.unshift.apply(element._debugInfo, response) : Object.defineProperty(element, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: response
      })));
      Object.freeze(element.props);
    }
    function createLazyChunkWrapper(chunk, validated) {
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _payload: chunk,
        _init: readChunk
      };
      lazyType._debugInfo = chunk._debugInfo;
      lazyType._store = { validated };
      return lazyType;
    }
    function getChunk(response, id) {
      var chunks = response._chunks, chunk = chunks.get(id);
      chunk || (chunk = response._closed ? new ReactPromise("rejected", null, response._closedReason) : createPendingChunk(response), chunks.set(id, chunk));
      return chunk;
    }
    function fulfillReference(reference, value, fulfilledChunk) {
      var response = reference.response, handler2 = reference.handler, parentObject = reference.parentObject, key = reference.key, map = reference.map, path = reference.path;
      try {
        for (var i = 1; i < path.length; i++) {
          for (; "object" === typeof value && null !== value && value.$$typeof === REACT_LAZY_TYPE; ) {
            var referencedChunk = value._payload;
            if (referencedChunk === handler2.chunk) value = handler2.value;
            else {
              switch (referencedChunk.status) {
                case "resolved_model":
                  initializeModelChunk(referencedChunk);
                  break;
                case "resolved_module":
                  initializeModuleChunk(referencedChunk);
              }
              switch (referencedChunk.status) {
                case "fulfilled":
                  value = referencedChunk.value;
                  continue;
                case "blocked":
                  var cyclicHandler = resolveBlockedCycle(
                    referencedChunk,
                    reference
                  );
                  if (null !== cyclicHandler) {
                    value = cyclicHandler.value;
                    continue;
                  }
                case "pending":
                  path.splice(0, i - 1);
                  null === referencedChunk.value ? referencedChunk.value = [reference] : referencedChunk.value.push(reference);
                  null === referencedChunk.reason ? referencedChunk.reason = [reference] : referencedChunk.reason.push(reference);
                  return;
                case "halted":
                  return;
                default:
                  rejectReference(reference, referencedChunk.reason);
                  return;
              }
            }
          }
          var name = path[i];
          if ("object" === typeof value && null !== value && hasOwnProperty.call(value, name))
            value = value[name];
          else throw Error("Invalid reference.");
        }
        for (; "object" === typeof value && null !== value && value.$$typeof === REACT_LAZY_TYPE; ) {
          var _referencedChunk = value._payload;
          if (_referencedChunk === handler2.chunk) value = handler2.value;
          else {
            switch (_referencedChunk.status) {
              case "resolved_model":
                initializeModelChunk(_referencedChunk);
                break;
              case "resolved_module":
                initializeModuleChunk(_referencedChunk);
            }
            switch (_referencedChunk.status) {
              case "fulfilled":
                value = _referencedChunk.value;
                continue;
            }
            break;
          }
        }
        var mappedValue = map(response, value, parentObject, key);
        "__proto__" !== key && (parentObject[key] = mappedValue);
        "" === key && null === handler2.value && (handler2.value = mappedValue);
        if (parentObject[0] === REACT_ELEMENT_TYPE && "object" === typeof handler2.value && null !== handler2.value && handler2.value.$$typeof === REACT_ELEMENT_TYPE) {
          var element = handler2.value;
          switch (key) {
            case "3":
              transferReferencedDebugInfo(handler2.chunk, fulfilledChunk);
              element.props = mappedValue;
              break;
            case "4":
              element._owner = mappedValue;
              break;
            case "5":
              element._debugStack = mappedValue;
              break;
            default:
              transferReferencedDebugInfo(handler2.chunk, fulfilledChunk);
          }
        } else
          reference.isDebug || transferReferencedDebugInfo(handler2.chunk, fulfilledChunk);
      } catch (error) {
        rejectReference(reference, error);
        return;
      }
      handler2.deps--;
      0 === handler2.deps && (reference = handler2.chunk, null !== reference && "blocked" === reference.status && (value = reference.value, reference.status = "fulfilled", reference.value = handler2.value, reference.reason = handler2.reason, null !== value && wakeChunk(value, handler2.value, reference)));
    }
    function rejectReference(reference, error) {
      var handler2 = reference.handler;
      reference = reference.response;
      if (!handler2.errored) {
        var blockedValue = handler2.value;
        handler2.errored = true;
        handler2.value = null;
        handler2.reason = error;
        handler2 = handler2.chunk;
        if (null !== handler2 && "blocked" === handler2.status) {
          if ("object" === typeof blockedValue && null !== blockedValue && blockedValue.$$typeof === REACT_ELEMENT_TYPE) {
            var erroredComponent = {
              name: getComponentNameFromType(blockedValue.type) || "",
              owner: blockedValue._owner
            };
            erroredComponent.debugStack = blockedValue._debugStack;
            supportsCreateTask && (erroredComponent.debugTask = blockedValue._debugTask);
            handler2._debugInfo.push(erroredComponent);
          }
          triggerErrorOnChunk(reference, handler2, error);
        }
      }
    }
    function waitForReference(referencedChunk, parentObject, key, response, map, path, isAwaitingDebugInfo) {
      if (!(void 0 !== response._debugChannel && response._debugChannel.hasReadable || "pending" !== referencedChunk.status || parentObject[0] !== REACT_ELEMENT_TYPE || "4" !== key && "5" !== key))
        return null;
      if (initializingHandler) {
        var handler2 = initializingHandler;
        handler2.deps++;
      } else
        handler2 = initializingHandler = {
          parent: null,
          chunk: null,
          value: null,
          reason: null,
          deps: 1,
          errored: false
        };
      parentObject = {
        response,
        handler: handler2,
        parentObject,
        key,
        map,
        path
      };
      parentObject.isDebug = isAwaitingDebugInfo;
      null === referencedChunk.value ? referencedChunk.value = [parentObject] : referencedChunk.value.push(parentObject);
      null === referencedChunk.reason ? referencedChunk.reason = [parentObject] : referencedChunk.reason.push(parentObject);
      return null;
    }
    function loadServerReference(response, metaData, parentObject, key) {
      if (!response._serverReferenceConfig)
        return createBoundServerReference(
          metaData,
          response._callServer,
          response._encodeFormAction,
          response._debugFindSourceMapURL
        );
      var serverReference = resolveServerReference(
        response._serverReferenceConfig,
        metaData.id
      ), promise = preloadModule(serverReference);
      if (promise)
        metaData.bound && (promise = Promise.all([promise, metaData.bound]));
      else if (metaData.bound) promise = Promise.resolve(metaData.bound);
      else
        return promise = requireModule2(serverReference), registerBoundServerReference(
          promise,
          metaData.id,
          metaData.bound,
          response._encodeFormAction
        ), promise;
      if (initializingHandler) {
        var handler2 = initializingHandler;
        handler2.deps++;
      } else
        handler2 = initializingHandler = {
          parent: null,
          chunk: null,
          value: null,
          reason: null,
          deps: 1,
          errored: false
        };
      promise.then(
        function() {
          var resolvedValue = requireModule2(serverReference);
          if (metaData.bound) {
            var boundArgs = metaData.bound.value.slice(0);
            boundArgs.unshift(null);
            resolvedValue = resolvedValue.bind.apply(resolvedValue, boundArgs);
          }
          registerBoundServerReference(
            resolvedValue,
            metaData.id,
            metaData.bound,
            response._encodeFormAction
          );
          "__proto__" !== key && (parentObject[key] = resolvedValue);
          "" === key && null === handler2.value && (handler2.value = resolvedValue);
          if (parentObject[0] === REACT_ELEMENT_TYPE && "object" === typeof handler2.value && null !== handler2.value && handler2.value.$$typeof === REACT_ELEMENT_TYPE)
            switch (boundArgs = handler2.value, key) {
              case "3":
                boundArgs.props = resolvedValue;
                break;
              case "4":
                boundArgs._owner = resolvedValue;
            }
          handler2.deps--;
          0 === handler2.deps && (resolvedValue = handler2.chunk, null !== resolvedValue && "blocked" === resolvedValue.status && (boundArgs = resolvedValue.value, resolvedValue.status = "fulfilled", resolvedValue.value = handler2.value, resolvedValue.reason = null, null !== boundArgs && wakeChunk(boundArgs, handler2.value, resolvedValue)));
        },
        function(error) {
          if (!handler2.errored) {
            var blockedValue = handler2.value;
            handler2.errored = true;
            handler2.value = null;
            handler2.reason = error;
            var chunk = handler2.chunk;
            if (null !== chunk && "blocked" === chunk.status) {
              if ("object" === typeof blockedValue && null !== blockedValue && blockedValue.$$typeof === REACT_ELEMENT_TYPE) {
                var erroredComponent = {
                  name: getComponentNameFromType(blockedValue.type) || "",
                  owner: blockedValue._owner
                };
                erroredComponent.debugStack = blockedValue._debugStack;
                supportsCreateTask && (erroredComponent.debugTask = blockedValue._debugTask);
                chunk._debugInfo.push(erroredComponent);
              }
              triggerErrorOnChunk(response, chunk, error);
            }
          }
        }
      );
      return null;
    }
    function resolveLazy(value) {
      for (; "object" === typeof value && null !== value && value.$$typeof === REACT_LAZY_TYPE; ) {
        var payload = value._payload;
        if ("fulfilled" === payload.status) value = payload.value;
        else break;
      }
      return value;
    }
    function transferReferencedDebugInfo(parentChunk, referencedChunk) {
      if (null !== parentChunk) {
        referencedChunk = referencedChunk._debugInfo;
        parentChunk = parentChunk._debugInfo;
        for (var i = 0; i < referencedChunk.length; ++i) {
          var debugInfoEntry = referencedChunk[i];
          null == debugInfoEntry.name && parentChunk.push(debugInfoEntry);
        }
      }
    }
    function getOutlinedModel(response, reference, parentObject, key, map) {
      var path = reference.split(":");
      reference = parseInt(path[0], 16);
      reference = getChunk(response, reference);
      null !== initializingChunk && isArrayImpl(initializingChunk._children) && initializingChunk._children.push(reference);
      switch (reference.status) {
        case "resolved_model":
          initializeModelChunk(reference);
          break;
        case "resolved_module":
          initializeModuleChunk(reference);
      }
      switch (reference.status) {
        case "fulfilled":
          for (var value = reference.value, i = 1; i < path.length; i++) {
            for (; "object" === typeof value && null !== value && value.$$typeof === REACT_LAZY_TYPE; ) {
              value = value._payload;
              switch (value.status) {
                case "resolved_model":
                  initializeModelChunk(value);
                  break;
                case "resolved_module":
                  initializeModuleChunk(value);
              }
              switch (value.status) {
                case "fulfilled":
                  value = value.value;
                  break;
                case "blocked":
                case "pending":
                  return waitForReference(
                    value,
                    parentObject,
                    key,
                    response,
                    map,
                    path.slice(i - 1),
                    false
                  );
                case "halted":
                  return initializingHandler ? (parentObject = initializingHandler, parentObject.deps++) : initializingHandler = {
                    parent: null,
                    chunk: null,
                    value: null,
                    reason: null,
                    deps: 1,
                    errored: false
                  }, null;
                default:
                  return initializingHandler ? (initializingHandler.errored = true, initializingHandler.value = null, initializingHandler.reason = value.reason) : initializingHandler = {
                    parent: null,
                    chunk: null,
                    value: null,
                    reason: value.reason,
                    deps: 0,
                    errored: true
                  }, null;
              }
            }
            value = value[path[i]];
          }
          for (; "object" === typeof value && null !== value && value.$$typeof === REACT_LAZY_TYPE; ) {
            path = value._payload;
            switch (path.status) {
              case "resolved_model":
                initializeModelChunk(path);
                break;
              case "resolved_module":
                initializeModuleChunk(path);
            }
            switch (path.status) {
              case "fulfilled":
                value = path.value;
                continue;
            }
            break;
          }
          response = map(response, value, parentObject, key);
          (parentObject[0] !== REACT_ELEMENT_TYPE || "4" !== key && "5" !== key) && transferReferencedDebugInfo(initializingChunk, reference);
          return response;
        case "pending":
        case "blocked":
          return waitForReference(
            reference,
            parentObject,
            key,
            response,
            map,
            path,
            false
          );
        case "halted":
          return initializingHandler ? (parentObject = initializingHandler, parentObject.deps++) : initializingHandler = {
            parent: null,
            chunk: null,
            value: null,
            reason: null,
            deps: 1,
            errored: false
          }, null;
        default:
          return initializingHandler ? (initializingHandler.errored = true, initializingHandler.value = null, initializingHandler.reason = reference.reason) : initializingHandler = {
            parent: null,
            chunk: null,
            value: null,
            reason: reference.reason,
            deps: 0,
            errored: true
          }, null;
      }
    }
    function createMap(response, model) {
      return new Map(model);
    }
    function createSet(response, model) {
      return new Set(model);
    }
    function createBlob(response, model) {
      return new Blob(model.slice(1), { type: model[0] });
    }
    function createFormData(response, model) {
      response = new FormData();
      for (var i = 0; i < model.length; i++)
        response.append(model[i][0], model[i][1]);
      return response;
    }
    function applyConstructor(response, model, parentObject) {
      Object.setPrototypeOf(parentObject, model.prototype);
    }
    function defineLazyGetter(response, chunk, parentObject, key) {
      "__proto__" !== key && Object.defineProperty(parentObject, key, {
        get: function() {
          "resolved_model" === chunk.status && initializeModelChunk(chunk);
          switch (chunk.status) {
            case "fulfilled":
              return chunk.value;
            case "rejected":
              throw chunk.reason;
          }
          return "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.";
        },
        enumerable: true,
        configurable: false
      });
      return null;
    }
    function extractIterator(response, model) {
      return model[Symbol.iterator]();
    }
    function createModel(response, model) {
      return model;
    }
    function getInferredFunctionApproximate(code) {
      code = code.startsWith("Object.defineProperty(") ? code.slice(22) : code.startsWith("(") ? code.slice(1) : code;
      if (code.startsWith("async function")) {
        var idx = code.indexOf("(", 14);
        if (-1 !== idx)
          return code = code.slice(14, idx).trim(), (0, eval)("({" + JSON.stringify(code) + ":async function(){}})")[code];
      } else if (code.startsWith("function")) {
        if (idx = code.indexOf("(", 8), -1 !== idx)
          return code = code.slice(8, idx).trim(), (0, eval)("({" + JSON.stringify(code) + ":function(){}})")[code];
      } else if (code.startsWith("class") && (idx = code.indexOf("{", 5), -1 !== idx))
        return code = code.slice(5, idx).trim(), (0, eval)("({" + JSON.stringify(code) + ":class{}})")[code];
      return function() {
      };
    }
    function parseModelString(response, parentObject, key, value) {
      if ("$" === value[0]) {
        if ("$" === value)
          return null !== initializingHandler && "0" === key && (initializingHandler = {
            parent: initializingHandler,
            chunk: null,
            value: null,
            reason: null,
            deps: 0,
            errored: false
          }), REACT_ELEMENT_TYPE;
        switch (value[1]) {
          case "$":
            return value.slice(1);
          case "L":
            return parentObject = parseInt(value.slice(2), 16), response = getChunk(response, parentObject), null !== initializingChunk && isArrayImpl(initializingChunk._children) && initializingChunk._children.push(response), createLazyChunkWrapper(response, 0);
          case "@":
            return parentObject = parseInt(value.slice(2), 16), response = getChunk(response, parentObject), null !== initializingChunk && isArrayImpl(initializingChunk._children) && initializingChunk._children.push(response), response;
          case "S":
            return Symbol.for(value.slice(2));
          case "h":
            var ref = value.slice(2);
            return getOutlinedModel(
              response,
              ref,
              parentObject,
              key,
              loadServerReference
            );
          case "T":
            parentObject = "$" + value.slice(2);
            response = response._tempRefs;
            if (null == response)
              throw Error(
                "Missing a temporary reference set but the RSC response returned a temporary reference. Pass a temporaryReference option with the set that was used with the reply."
              );
            return response.get(parentObject);
          case "Q":
            return ref = value.slice(2), getOutlinedModel(response, ref, parentObject, key, createMap);
          case "W":
            return ref = value.slice(2), getOutlinedModel(response, ref, parentObject, key, createSet);
          case "B":
            return ref = value.slice(2), getOutlinedModel(response, ref, parentObject, key, createBlob);
          case "K":
            return ref = value.slice(2), getOutlinedModel(response, ref, parentObject, key, createFormData);
          case "Z":
            return ref = value.slice(2), getOutlinedModel(
              response,
              ref,
              parentObject,
              key,
              resolveErrorDev
            );
          case "i":
            return ref = value.slice(2), getOutlinedModel(
              response,
              ref,
              parentObject,
              key,
              extractIterator
            );
          case "I":
            return Infinity;
          case "-":
            return "$-0" === value ? -0 : -Infinity;
          case "N":
            return NaN;
          case "u":
            return;
          case "D":
            return new Date(Date.parse(value.slice(2)));
          case "n":
            return BigInt(value.slice(2));
          case "P":
            return ref = value.slice(2), getOutlinedModel(
              response,
              ref,
              parentObject,
              key,
              applyConstructor
            );
          case "E":
            response = value.slice(2);
            try {
              if (!mightHaveStaticConstructor.test(response))
                return (0, eval)(response);
            } catch (x) {
            }
            try {
              if (ref = getInferredFunctionApproximate(response), response.startsWith("Object.defineProperty(")) {
                var idx = response.lastIndexOf(',"name",{value:"');
                if (-1 !== idx) {
                  var name = JSON.parse(
                    response.slice(idx + 16 - 1, response.length - 2)
                  );
                  Object.defineProperty(ref, "name", { value: name });
                }
              }
            } catch (_) {
              ref = function() {
              };
            }
            return ref;
          case "Y":
            if (2 < value.length && (ref = response._debugChannel && response._debugChannel.callback)) {
              if ("@" === value[2])
                return parentObject = value.slice(3), key = parseInt(parentObject, 16), response._chunks.has(key) || ref("P:" + parentObject), getChunk(response, key);
              value = value.slice(2);
              idx = parseInt(value, 16);
              response._chunks.has(idx) || ref("Q:" + value);
              ref = getChunk(response, idx);
              return "fulfilled" === ref.status ? ref.value : defineLazyGetter(response, ref, parentObject, key);
            }
            "__proto__" !== key && Object.defineProperty(parentObject, key, {
              get: function() {
                return "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.";
              },
              enumerable: true,
              configurable: false
            });
            return null;
          default:
            return ref = value.slice(1), getOutlinedModel(response, ref, parentObject, key, createModel);
        }
      }
      return value;
    }
    function missingCall() {
      throw Error(
        'Trying to call a function from "use server" but the callServer option was not implemented in your router runtime.'
      );
    }
    function ResponseInstance(bundlerConfig, serverReferenceConfig, moduleLoading, callServer, encodeFormAction, nonce, temporaryReferences, findSourceMapURL, replayConsole, environmentName, debugChannel) {
      var chunks = /* @__PURE__ */ new Map();
      this._bundlerConfig = bundlerConfig;
      this._serverReferenceConfig = serverReferenceConfig;
      this._moduleLoading = moduleLoading;
      this._callServer = void 0 !== callServer ? callServer : missingCall;
      this._encodeFormAction = encodeFormAction;
      this._nonce = nonce;
      this._chunks = chunks;
      this._stringDecoder = new TextDecoder();
      this._fromJSON = null;
      this._closed = false;
      this._closedReason = null;
      this._tempRefs = temporaryReferences;
      this._timeOrigin = 0;
      this._pendingInitialRender = null;
      this._pendingChunks = 0;
      this._weakResponse = { weak: new WeakRef(this), response: this };
      this._debugRootOwner = bundlerConfig = void 0 === ReactSharedInteralsServer || null === ReactSharedInteralsServer.A ? null : ReactSharedInteralsServer.A.getOwner();
      this._debugRootStack = null !== bundlerConfig ? Error("react-stack-top-frame") : null;
      environmentName = void 0 === environmentName ? "Server" : environmentName;
      supportsCreateTask && (this._debugRootTask = console.createTask(
        '"use ' + environmentName.toLowerCase() + '"'
      ));
      this._debugStartTime = performance.now();
      this._debugFindSourceMapURL = findSourceMapURL;
      this._debugChannel = debugChannel;
      this._blockedConsole = null;
      this._replayConsole = replayConsole;
      this._rootEnvironmentName = environmentName;
      debugChannel && (null === debugChannelRegistry ? (closeDebugChannel(debugChannel), this._debugChannel = void 0) : debugChannelRegistry.register(this, debugChannel, this));
      replayConsole && markAllTracksInOrder();
      this._fromJSON = createFromJSONCallback(this);
    }
    function createStreamState(weakResponse, streamDebugValue) {
      var streamState = {
        _rowState: 0,
        _rowID: 0,
        _rowTag: 0,
        _rowLength: 0,
        _buffer: []
      };
      weakResponse = unwrapWeakResponse(weakResponse);
      var debugValuePromise = Promise.resolve(streamDebugValue);
      debugValuePromise.status = "fulfilled";
      debugValuePromise.value = streamDebugValue;
      streamState._debugInfo = {
        name: "RSC stream",
        start: weakResponse._debugStartTime,
        end: weakResponse._debugStartTime,
        byteSize: 0,
        value: debugValuePromise,
        owner: weakResponse._debugRootOwner,
        debugStack: weakResponse._debugRootStack,
        debugTask: weakResponse._debugRootTask
      };
      streamState._debugTargetChunkSize = MIN_CHUNK_SIZE;
      return streamState;
    }
    function addDebugInfo(chunk, debugInfo) {
      var value = resolveLazy(chunk.value);
      "object" !== typeof value || null === value || !isArrayImpl(value) && "function" !== typeof value[ASYNC_ITERATOR] && value.$$typeof !== REACT_ELEMENT_TYPE && value.$$typeof !== REACT_LAZY_TYPE ? chunk._debugInfo.push.apply(chunk._debugInfo, debugInfo) : isArrayImpl(value._debugInfo) ? value._debugInfo.push.apply(value._debugInfo, debugInfo) : Object.defineProperty(value, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugInfo
      });
    }
    function resolveChunkDebugInfo(streamState, chunk) {
      streamState = [{ awaited: streamState._debugInfo }];
      "pending" === chunk.status || "blocked" === chunk.status ? (streamState = addDebugInfo.bind(null, chunk, streamState), chunk.then(streamState, streamState)) : addDebugInfo(chunk, streamState);
    }
    function resolveBuffer(response, id, buffer, streamState) {
      var chunks = response._chunks, chunk = chunks.get(id);
      chunk && "pending" !== chunk.status ? chunk.reason.enqueueValue(buffer) : (chunk && releasePendingChunk(response, chunk), response = new ReactPromise("fulfilled", buffer, null), resolveChunkDebugInfo(streamState, response), chunks.set(id, response));
    }
    function resolveModule(response, id, model, streamState) {
      var chunks = response._chunks, chunk = chunks.get(id);
      model = JSON.parse(model, response._fromJSON);
      var clientReference = resolveClientReference(
        response._bundlerConfig,
        model
      );
      prepareDestinationWithChunks(
        response._moduleLoading,
        model[1],
        response._nonce
      );
      if (model = preloadModule(clientReference)) {
        if (chunk) {
          releasePendingChunk(response, chunk);
          var blockedChunk = chunk;
          blockedChunk.status = "blocked";
        } else
          blockedChunk = new ReactPromise("blocked", null, null), chunks.set(id, blockedChunk);
        resolveChunkDebugInfo(streamState, blockedChunk);
        model.then(
          function() {
            return resolveModuleChunk(response, blockedChunk, clientReference);
          },
          function(error) {
            return triggerErrorOnChunk(response, blockedChunk, error);
          }
        );
      } else
        chunk ? (resolveChunkDebugInfo(streamState, chunk), resolveModuleChunk(response, chunk, clientReference)) : (chunk = new ReactPromise(
          "resolved_module",
          clientReference,
          null
        ), resolveChunkDebugInfo(streamState, chunk), chunks.set(id, chunk));
    }
    function resolveStream(response, id, stream, controller, streamState) {
      var chunks = response._chunks, chunk = chunks.get(id);
      if (chunk) {
        if (resolveChunkDebugInfo(streamState, chunk), "pending" === chunk.status) {
          releasePendingChunk(response, chunk);
          id = chunk.value;
          if (null != chunk._debugChunk) {
            streamState = initializingHandler;
            chunks = initializingChunk;
            initializingHandler = null;
            chunk.status = "blocked";
            chunk.value = null;
            chunk.reason = null;
            initializingChunk = chunk;
            try {
              if (initializeDebugChunk(response, chunk), null !== initializingHandler && !initializingHandler.errored && 0 < initializingHandler.deps) {
                initializingHandler.value = stream;
                initializingHandler.reason = controller;
                initializingHandler.chunk = chunk;
                return;
              }
            } finally {
              initializingHandler = streamState, initializingChunk = chunks;
            }
          }
          chunk.status = "fulfilled";
          chunk.value = stream;
          chunk.reason = controller;
          null !== id && wakeChunk(id, chunk.value, chunk);
        }
      } else
        response = new ReactPromise("fulfilled", stream, controller), resolveChunkDebugInfo(streamState, response), chunks.set(id, response);
    }
    function startReadableStream(response, id, type, streamState) {
      var controller = null, closed = false;
      type = new ReadableStream({
        type,
        start: function(c) {
          controller = c;
        }
      });
      var previousBlockedChunk = null;
      resolveStream(
        response,
        id,
        type,
        {
          enqueueValue: function(value) {
            null === previousBlockedChunk ? controller.enqueue(value) : previousBlockedChunk.then(function() {
              controller.enqueue(value);
            });
          },
          enqueueModel: function(json) {
            if (null === previousBlockedChunk) {
              var chunk = createResolvedModelChunk(response, json);
              initializeModelChunk(chunk);
              "fulfilled" === chunk.status ? controller.enqueue(chunk.value) : (chunk.then(
                function(v) {
                  return controller.enqueue(v);
                },
                function(e) {
                  return controller.error(e);
                }
              ), previousBlockedChunk = chunk);
            } else {
              chunk = previousBlockedChunk;
              var _chunk3 = createPendingChunk(response);
              _chunk3.then(
                function(v) {
                  return controller.enqueue(v);
                },
                function(e) {
                  return controller.error(e);
                }
              );
              previousBlockedChunk = _chunk3;
              chunk.then(function() {
                previousBlockedChunk === _chunk3 && (previousBlockedChunk = null);
                resolveModelChunk(response, _chunk3, json);
              });
            }
          },
          close: function() {
            if (!closed)
              if (closed = true, null === previousBlockedChunk)
                controller.close();
              else {
                var blockedChunk = previousBlockedChunk;
                previousBlockedChunk = null;
                blockedChunk.then(function() {
                  return controller.close();
                });
              }
          },
          error: function(error) {
            if (!closed)
              if (closed = true, null === previousBlockedChunk)
                controller.error(error);
              else {
                var blockedChunk = previousBlockedChunk;
                previousBlockedChunk = null;
                blockedChunk.then(function() {
                  return controller.error(error);
                });
              }
          }
        },
        streamState
      );
    }
    function asyncIterator() {
      return this;
    }
    function createIterator(next) {
      next = { next };
      next[ASYNC_ITERATOR] = asyncIterator;
      return next;
    }
    function startAsyncIterable(response, id, iterator, streamState) {
      var buffer = [], closed = false, nextWriteIndex = 0, iterable = {};
      iterable[ASYNC_ITERATOR] = function() {
        var nextReadIndex = 0;
        return createIterator(function(arg) {
          if (void 0 !== arg)
            throw Error(
              "Values cannot be passed to next() of AsyncIterables passed to Client Components."
            );
          if (nextReadIndex === buffer.length) {
            if (closed)
              return new ReactPromise(
                "fulfilled",
                { done: true, value: void 0 },
                null
              );
            buffer[nextReadIndex] = createPendingChunk(response);
          }
          return buffer[nextReadIndex++];
        });
      };
      resolveStream(
        response,
        id,
        iterator ? iterable[ASYNC_ITERATOR]() : iterable,
        {
          enqueueValue: function(value) {
            if (nextWriteIndex === buffer.length)
              buffer[nextWriteIndex] = new ReactPromise(
                "fulfilled",
                { done: false, value },
                null
              );
            else {
              var chunk = buffer[nextWriteIndex], resolveListeners = chunk.value, rejectListeners = chunk.reason;
              chunk.status = "fulfilled";
              chunk.value = { done: false, value };
              chunk.reason = null;
              null !== resolveListeners && wakeChunkIfInitialized(
                chunk,
                resolveListeners,
                rejectListeners
              );
            }
            nextWriteIndex++;
          },
          enqueueModel: function(value) {
            nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
              response,
              value,
              false
            ) : resolveIteratorResultChunk(
              response,
              buffer[nextWriteIndex],
              value,
              false
            );
            nextWriteIndex++;
          },
          close: function(value) {
            if (!closed)
              for (closed = true, nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(response, value, true) : resolveIteratorResultChunk(
                response,
                buffer[nextWriteIndex],
                value,
                true
              ), nextWriteIndex++; nextWriteIndex < buffer.length; )
                resolveIteratorResultChunk(
                  response,
                  buffer[nextWriteIndex++],
                  '"$undefined"',
                  true
                );
          },
          error: function(error) {
            if (!closed)
              for (closed = true, nextWriteIndex === buffer.length && (buffer[nextWriteIndex] = createPendingChunk(response)); nextWriteIndex < buffer.length; )
                triggerErrorOnChunk(response, buffer[nextWriteIndex++], error);
          }
        },
        streamState
      );
    }
    function resolveErrorDev(response, errorInfo) {
      var name = errorInfo.name, env = errorInfo.env;
      var error = buildFakeCallStack(
        response,
        errorInfo.stack,
        env,
        false,
        Error.bind(
          null,
          errorInfo.message || "An error occurred in the Server Components render but no message was provided"
        )
      );
      var ownerTask = null;
      null != errorInfo.owner && (errorInfo = errorInfo.owner.slice(1), errorInfo = getOutlinedModel(
        response,
        errorInfo,
        {},
        "",
        createModel
      ), null !== errorInfo && (ownerTask = initializeFakeTask(response, errorInfo)));
      null === ownerTask ? (response = getRootTask(response, env), error = null != response ? response.run(error) : error()) : error = ownerTask.run(error);
      error.name = name;
      error.environmentName = env;
      return error;
    }
    function createFakeFunction(name, filename, sourceMap, line, col, enclosingLine, enclosingCol, environmentName) {
      name || (name = "<anonymous>");
      var encodedName = JSON.stringify(name);
      1 > enclosingLine ? enclosingLine = 0 : enclosingLine--;
      1 > enclosingCol ? enclosingCol = 0 : enclosingCol--;
      1 > line ? line = 0 : line--;
      1 > col ? col = 0 : col--;
      if (line < enclosingLine || line === enclosingLine && col < enclosingCol)
        enclosingCol = enclosingLine = 0;
      1 > line ? (line = encodedName.length + 3, enclosingCol -= line, 0 > enclosingCol && (enclosingCol = 0), col = col - enclosingCol - line - 3, 0 > col && (col = 0), encodedName = "({" + encodedName + ":" + " ".repeat(enclosingCol) + "_=>" + " ".repeat(col) + "_()})") : 1 > enclosingLine ? (enclosingCol -= encodedName.length + 3, 0 > enclosingCol && (enclosingCol = 0), encodedName = "({" + encodedName + ":" + " ".repeat(enclosingCol) + "_=>" + "\n".repeat(line - enclosingLine) + " ".repeat(col) + "_()})") : enclosingLine === line ? (col = col - enclosingCol - 3, 0 > col && (col = 0), encodedName = "\n".repeat(enclosingLine - 1) + "({" + encodedName + ":\n" + " ".repeat(enclosingCol) + "_=>" + " ".repeat(col) + "_()})") : encodedName = "\n".repeat(enclosingLine - 1) + "({" + encodedName + ":\n" + " ".repeat(enclosingCol) + "_=>" + "\n".repeat(line - enclosingLine) + " ".repeat(col) + "_()})";
      encodedName = 1 > enclosingLine ? encodedName + "\n/* This module was rendered by a Server Component. Turn on Source Maps to see the server source. */" : "/* This module was rendered by a Server Component. Turn on Source Maps to see the server source. */" + encodedName;
      filename.startsWith("/") && (filename = "file://" + filename);
      sourceMap ? (encodedName += "\n//# sourceURL=about://React/" + encodeURIComponent(environmentName) + "/" + encodeURI(filename) + "?" + fakeFunctionIdx++, encodedName += "\n//# sourceMappingURL=" + sourceMap) : encodedName = filename ? encodedName + ("\n//# sourceURL=" + encodeURI(filename)) : encodedName + "\n//# sourceURL=<anonymous>";
      try {
        var fn = (0, eval)(encodedName)[name];
      } catch (x) {
        fn = function(_) {
          return _();
        };
      }
      return fn;
    }
    function buildFakeCallStack(response, stack, environmentName, useEnclosingLine, innerCall) {
      for (var i = 0; i < stack.length; i++) {
        var frame = stack[i], frameKey = frame.join("-") + "-" + environmentName + (useEnclosingLine ? "-e" : "-n"), fn = fakeFunctionCache.get(frameKey);
        if (void 0 === fn) {
          fn = frame[0];
          var filename = frame[1], line = frame[2], col = frame[3], enclosingLine = frame[4];
          frame = frame[5];
          var findSourceMapURL = response._debugFindSourceMapURL;
          findSourceMapURL = findSourceMapURL ? findSourceMapURL(filename, environmentName) : null;
          fn = createFakeFunction(
            fn,
            filename,
            findSourceMapURL,
            line,
            col,
            useEnclosingLine ? line : enclosingLine,
            useEnclosingLine ? col : frame,
            environmentName
          );
          fakeFunctionCache.set(frameKey, fn);
        }
        innerCall = fn.bind(null, innerCall);
      }
      return innerCall;
    }
    function getRootTask(response, childEnvironmentName) {
      var rootTask = response._debugRootTask;
      return rootTask ? response._rootEnvironmentName !== childEnvironmentName ? (response = console.createTask.bind(
        console,
        '"use ' + childEnvironmentName.toLowerCase() + '"'
      ), rootTask.run(response)) : rootTask : null;
    }
    function initializeFakeTask(response, debugInfo) {
      if (!supportsCreateTask || null == debugInfo.stack) return null;
      var cachedEntry = debugInfo.debugTask;
      if (void 0 !== cachedEntry) return cachedEntry;
      var useEnclosingLine = void 0 === debugInfo.key, stack = debugInfo.stack, env = null == debugInfo.env ? response._rootEnvironmentName : debugInfo.env;
      cachedEntry = null == debugInfo.owner || null == debugInfo.owner.env ? response._rootEnvironmentName : debugInfo.owner.env;
      var ownerTask = null == debugInfo.owner ? null : initializeFakeTask(response, debugInfo.owner);
      env = env !== cachedEntry ? '"use ' + env.toLowerCase() + '"' : void 0 !== debugInfo.key ? "<" + (debugInfo.name || "...") + ">" : void 0 !== debugInfo.name ? debugInfo.name || "unknown" : "await " + (debugInfo.awaited.name || "unknown");
      env = console.createTask.bind(console, env);
      useEnclosingLine = buildFakeCallStack(
        response,
        stack,
        cachedEntry,
        useEnclosingLine,
        env
      );
      null === ownerTask ? (response = getRootTask(response, cachedEntry), response = null != response ? response.run(useEnclosingLine) : useEnclosingLine()) : response = ownerTask.run(useEnclosingLine);
      return debugInfo.debugTask = response;
    }
    function fakeJSXCallSite() {
      return Error("react-stack-top-frame");
    }
    function initializeFakeStack(response, debugInfo) {
      if (void 0 === debugInfo.debugStack) {
        null != debugInfo.stack && (debugInfo.debugStack = createFakeJSXCallStackInDEV(
          response,
          debugInfo.stack,
          null == debugInfo.env ? "" : debugInfo.env
        ));
        var owner = debugInfo.owner;
        null != owner && (initializeFakeStack(response, owner), void 0 === owner.debugLocation && null != debugInfo.debugStack && (owner.debugLocation = debugInfo.debugStack));
      }
    }
    function initializeDebugInfo(response, debugInfo) {
      void 0 !== debugInfo.stack && initializeFakeTask(response, debugInfo);
      if (null == debugInfo.owner && null != response._debugRootOwner) {
        var _componentInfoOrAsyncInfo = debugInfo;
        _componentInfoOrAsyncInfo.owner = response._debugRootOwner;
        _componentInfoOrAsyncInfo.stack = null;
        _componentInfoOrAsyncInfo.debugStack = response._debugRootStack;
        _componentInfoOrAsyncInfo.debugTask = response._debugRootTask;
      } else
        void 0 !== debugInfo.stack && initializeFakeStack(response, debugInfo);
      "number" === typeof debugInfo.time && (debugInfo = { time: debugInfo.time + response._timeOrigin });
      return debugInfo;
    }
    function getCurrentStackInDEV() {
      var owner = currentOwnerInDEV;
      if (null === owner) return "";
      try {
        var info = "";
        if (owner.owner || "string" !== typeof owner.name) {
          for (; owner; ) {
            var ownerStack = owner.debugStack;
            if (null != ownerStack) {
              if (owner = owner.owner) {
                var JSCompiler_temp_const = info;
                var error = ownerStack, prevPrepareStackTrace = Error.prepareStackTrace;
                Error.prepareStackTrace = prepareStackTrace;
                var stack = error.stack;
                Error.prepareStackTrace = prevPrepareStackTrace;
                stack.startsWith("Error: react-stack-top-frame\n") && (stack = stack.slice(29));
                var idx = stack.indexOf("\n");
                -1 !== idx && (stack = stack.slice(idx + 1));
                idx = stack.indexOf("react_stack_bottom_frame");
                -1 !== idx && (idx = stack.lastIndexOf("\n", idx));
                var JSCompiler_inline_result = -1 !== idx ? stack = stack.slice(0, idx) : "";
                info = JSCompiler_temp_const + ("\n" + JSCompiler_inline_result);
              }
            } else break;
          }
          var JSCompiler_inline_result$jscomp$0 = info;
        } else {
          JSCompiler_temp_const = owner.name;
          if (void 0 === prefix)
            try {
              throw Error();
            } catch (x) {
              prefix = (error = x.stack.trim().match(/\n( *(at )?)/)) && error[1] || "", suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
            }
          JSCompiler_inline_result$jscomp$0 = "\n" + prefix + JSCompiler_temp_const + suffix;
        }
      } catch (x) {
        JSCompiler_inline_result$jscomp$0 = "\nError generating stack: " + x.message + "\n" + x.stack;
      }
      return JSCompiler_inline_result$jscomp$0;
    }
    function resolveConsoleEntry(response, json) {
      if (response._replayConsole) {
        var blockedChunk = response._blockedConsole;
        if (null == blockedChunk)
          blockedChunk = createResolvedModelChunk(response, json), initializeModelChunk(blockedChunk), "fulfilled" === blockedChunk.status ? replayConsoleWithCallStackInDEV(response, blockedChunk.value) : (blockedChunk.then(
            function(v) {
              return replayConsoleWithCallStackInDEV(response, v);
            },
            function() {
            }
          ), response._blockedConsole = blockedChunk);
        else {
          var _chunk4 = createPendingChunk(response);
          _chunk4.then(
            function(v) {
              return replayConsoleWithCallStackInDEV(response, v);
            },
            function() {
            }
          );
          response._blockedConsole = _chunk4;
          var unblock = function() {
            response._blockedConsole === _chunk4 && (response._blockedConsole = null);
            resolveModelChunk(response, _chunk4, json);
          };
          blockedChunk.then(unblock, unblock);
        }
      }
    }
    function initializeIOInfo(response, ioInfo) {
      void 0 !== ioInfo.stack && (initializeFakeTask(response, ioInfo), initializeFakeStack(response, ioInfo));
      ioInfo.start += response._timeOrigin;
      ioInfo.end += response._timeOrigin;
      if (response._replayConsole) {
        response = response._rootEnvironmentName;
        var promise = ioInfo.value;
        if (promise)
          switch (promise.status) {
            case "fulfilled":
              logIOInfo(ioInfo, response, promise.value);
              break;
            case "rejected":
              logIOInfoErrored(ioInfo, response, promise.reason);
              break;
            default:
              promise.then(
                logIOInfo.bind(null, ioInfo, response),
                logIOInfoErrored.bind(null, ioInfo, response)
              );
          }
        else logIOInfo(ioInfo, response, void 0);
      }
    }
    function resolveIOInfo(response, id, model) {
      var chunks = response._chunks, chunk = chunks.get(id);
      chunk ? (resolveModelChunk(response, chunk, model), "resolved_model" === chunk.status && initializeModelChunk(chunk)) : (chunk = createResolvedModelChunk(response, model), chunks.set(id, chunk), initializeModelChunk(chunk));
      "fulfilled" === chunk.status ? initializeIOInfo(response, chunk.value) : chunk.then(
        function(v) {
          initializeIOInfo(response, v);
        },
        function() {
        }
      );
    }
    function mergeBuffer(buffer, lastChunk) {
      for (var l = buffer.length, byteLength = lastChunk.length, i = 0; i < l; i++)
        byteLength += buffer[i].byteLength;
      byteLength = new Uint8Array(byteLength);
      for (var _i3 = i = 0; _i3 < l; _i3++) {
        var chunk = buffer[_i3];
        byteLength.set(chunk, i);
        i += chunk.byteLength;
      }
      byteLength.set(lastChunk, i);
      return byteLength;
    }
    function resolveTypedArray(response, id, buffer, lastChunk, constructor, bytesPerElement, streamState) {
      buffer = 0 === buffer.length && 0 === lastChunk.byteOffset % bytesPerElement ? lastChunk : mergeBuffer(buffer, lastChunk);
      constructor = new constructor(
        buffer.buffer,
        buffer.byteOffset,
        buffer.byteLength / bytesPerElement
      );
      resolveBuffer(response, id, constructor, streamState);
    }
    function flushComponentPerformance(response$jscomp$0, root, trackIdx$jscomp$6, trackTime, parentEndTime) {
      if (!isArrayImpl(root._children)) {
        var previousResult = root._children, previousEndTime = previousResult.endTime;
        if (-Infinity < parentEndTime && parentEndTime < previousEndTime && null !== previousResult.component) {
          var componentInfo = previousResult.component, trackIdx = trackIdx$jscomp$6, startTime = parentEndTime;
          if (supportsUserTiming && 0 <= previousEndTime && 10 > trackIdx) {
            var color = componentInfo.env === response$jscomp$0._rootEnvironmentName ? "primary-light" : "secondary-light", entryName = componentInfo.name + " [deduped]", debugTask = componentInfo.debugTask;
            debugTask ? debugTask.run(
              console.timeStamp.bind(
                console,
                entryName,
                0 > startTime ? 0 : startTime,
                previousEndTime,
                trackNames[trackIdx],
                "Server Components ⚛",
                color
              )
            ) : console.timeStamp(
              entryName,
              0 > startTime ? 0 : startTime,
              previousEndTime,
              trackNames[trackIdx],
              "Server Components ⚛",
              color
            );
          }
        }
        previousResult.track = trackIdx$jscomp$6;
        return previousResult;
      }
      var children = root._children, debugInfo = root._debugInfo;
      if (debugInfo) {
        for (var startTime$jscomp$0 = 0, i = 0; i < debugInfo.length; i++) {
          var info = debugInfo[i];
          "number" === typeof info.time && (startTime$jscomp$0 = info.time);
          if ("string" === typeof info.name) {
            startTime$jscomp$0 < trackTime && trackIdx$jscomp$6++;
            trackTime = startTime$jscomp$0;
            break;
          }
        }
        for (var _i4 = debugInfo.length - 1; 0 <= _i4; _i4--) {
          var _info = debugInfo[_i4];
          if ("number" === typeof _info.time && _info.time > parentEndTime) {
            parentEndTime = _info.time;
            break;
          }
        }
      }
      var result = {
        track: trackIdx$jscomp$6,
        endTime: -Infinity,
        component: null
      };
      root._children = result;
      for (var childrenEndTime = -Infinity, childTrackIdx = trackIdx$jscomp$6, childTrackTime = trackTime, _i5 = 0; _i5 < children.length; _i5++) {
        var childResult = flushComponentPerformance(
          response$jscomp$0,
          children[_i5],
          childTrackIdx,
          childTrackTime,
          parentEndTime
        );
        null !== childResult.component && (result.component = childResult.component);
        childTrackIdx = childResult.track;
        var childEndTime = childResult.endTime;
        childEndTime > childTrackTime && (childTrackTime = childEndTime);
        childEndTime > childrenEndTime && (childrenEndTime = childEndTime);
      }
      if (debugInfo)
        for (var componentEndTime = 0, isLastComponent = true, endTime = -1, endTimeIdx = -1, _i6 = debugInfo.length - 1; 0 <= _i6; _i6--) {
          var _info2 = debugInfo[_i6];
          if ("number" === typeof _info2.time) {
            0 === componentEndTime && (componentEndTime = _info2.time);
            var time = _info2.time;
            if (-1 < endTimeIdx)
              for (var j = endTimeIdx - 1; j > _i6; j--) {
                var candidateInfo = debugInfo[j];
                if ("string" === typeof candidateInfo.name) {
                  componentEndTime > childrenEndTime && (childrenEndTime = componentEndTime);
                  var componentInfo$jscomp$0 = candidateInfo, response = response$jscomp$0, componentInfo$jscomp$1 = componentInfo$jscomp$0, trackIdx$jscomp$0 = trackIdx$jscomp$6, startTime$jscomp$1 = time, componentEndTime$jscomp$0 = componentEndTime, childrenEndTime$jscomp$0 = childrenEndTime;
                  if (isLastComponent && "rejected" === root.status && root.reason !== response._closedReason) {
                    var componentInfo$jscomp$2 = componentInfo$jscomp$1, trackIdx$jscomp$1 = trackIdx$jscomp$0, startTime$jscomp$2 = startTime$jscomp$1, childrenEndTime$jscomp$1 = childrenEndTime$jscomp$0, error = root.reason;
                    if (supportsUserTiming) {
                      var env = componentInfo$jscomp$2.env, name = componentInfo$jscomp$2.name, entryName$jscomp$0 = env === response._rootEnvironmentName || void 0 === env ? name : name + " [" + env + "]", properties = [
                        [
                          "Error",
                          "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error)
                        ]
                      ];
                      null != componentInfo$jscomp$2.key && addValueToProperties(
                        "key",
                        componentInfo$jscomp$2.key,
                        properties,
                        0,
                        ""
                      );
                      null != componentInfo$jscomp$2.props && addObjectToProperties(
                        componentInfo$jscomp$2.props,
                        properties,
                        0,
                        ""
                      );
                      performance.measure("​" + entryName$jscomp$0, {
                        start: 0 > startTime$jscomp$2 ? 0 : startTime$jscomp$2,
                        end: childrenEndTime$jscomp$1,
                        detail: {
                          devtools: {
                            color: "error",
                            track: trackNames[trackIdx$jscomp$1],
                            trackGroup: "Server Components ⚛",
                            tooltipText: entryName$jscomp$0 + " Errored",
                            properties
                          }
                        }
                      });
                    }
                  } else {
                    var componentInfo$jscomp$3 = componentInfo$jscomp$1, trackIdx$jscomp$2 = trackIdx$jscomp$0, startTime$jscomp$3 = startTime$jscomp$1, childrenEndTime$jscomp$2 = childrenEndTime$jscomp$0;
                    if (supportsUserTiming && 0 <= childrenEndTime$jscomp$2 && 10 > trackIdx$jscomp$2) {
                      var env$jscomp$0 = componentInfo$jscomp$3.env, name$jscomp$0 = componentInfo$jscomp$3.name, isPrimaryEnv = env$jscomp$0 === response._rootEnvironmentName, selfTime = componentEndTime$jscomp$0 - startTime$jscomp$3, color$jscomp$0 = 0.5 > selfTime ? isPrimaryEnv ? "primary-light" : "secondary-light" : 50 > selfTime ? isPrimaryEnv ? "primary" : "secondary" : 500 > selfTime ? isPrimaryEnv ? "primary-dark" : "secondary-dark" : "error", entryName$jscomp$1 = isPrimaryEnv || void 0 === env$jscomp$0 ? name$jscomp$0 : name$jscomp$0 + " [" + env$jscomp$0 + "]", debugTask$jscomp$0 = componentInfo$jscomp$3.debugTask;
                      if (debugTask$jscomp$0) {
                        var properties$jscomp$0 = [];
                        null != componentInfo$jscomp$3.key && addValueToProperties(
                          "key",
                          componentInfo$jscomp$3.key,
                          properties$jscomp$0,
                          0,
                          ""
                        );
                        null != componentInfo$jscomp$3.props && addObjectToProperties(
                          componentInfo$jscomp$3.props,
                          properties$jscomp$0,
                          0,
                          ""
                        );
                        debugTask$jscomp$0.run(
                          performance.measure.bind(
                            performance,
                            "​" + entryName$jscomp$1,
                            {
                              start: 0 > startTime$jscomp$3 ? 0 : startTime$jscomp$3,
                              end: childrenEndTime$jscomp$2,
                              detail: {
                                devtools: {
                                  color: color$jscomp$0,
                                  track: trackNames[trackIdx$jscomp$2],
                                  trackGroup: "Server Components ⚛",
                                  properties: properties$jscomp$0
                                }
                              }
                            }
                          )
                        );
                      } else
                        console.timeStamp(
                          "​" + entryName$jscomp$1,
                          0 > startTime$jscomp$3 ? 0 : startTime$jscomp$3,
                          childrenEndTime$jscomp$2,
                          trackNames[trackIdx$jscomp$2],
                          "Server Components ⚛",
                          color$jscomp$0
                        );
                    }
                  }
                  componentEndTime = time;
                  result.component = componentInfo$jscomp$0;
                  isLastComponent = false;
                } else if (candidateInfo.awaited && null != candidateInfo.awaited.env) {
                  endTime > childrenEndTime && (childrenEndTime = endTime);
                  var asyncInfo = candidateInfo, env$jscomp$1 = response$jscomp$0._rootEnvironmentName, promise = asyncInfo.awaited.value;
                  if (promise) {
                    var thenable = promise;
                    switch (thenable.status) {
                      case "fulfilled":
                        logComponentAwait(
                          asyncInfo,
                          trackIdx$jscomp$6,
                          time,
                          endTime,
                          env$jscomp$1,
                          thenable.value
                        );
                        break;
                      case "rejected":
                        var asyncInfo$jscomp$0 = asyncInfo, trackIdx$jscomp$3 = trackIdx$jscomp$6, startTime$jscomp$4 = time, endTime$jscomp$0 = endTime, rootEnv = env$jscomp$1, error$jscomp$0 = thenable.reason;
                        if (supportsUserTiming && 0 < endTime$jscomp$0) {
                          var description = getIODescription(error$jscomp$0), entryName$jscomp$2 = "await " + getIOShortName(
                            asyncInfo$jscomp$0.awaited,
                            description,
                            asyncInfo$jscomp$0.env,
                            rootEnv
                          ), debugTask$jscomp$1 = asyncInfo$jscomp$0.debugTask || asyncInfo$jscomp$0.awaited.debugTask;
                          if (debugTask$jscomp$1) {
                            var properties$jscomp$1 = [
                              [
                                "Rejected",
                                "object" === typeof error$jscomp$0 && null !== error$jscomp$0 && "string" === typeof error$jscomp$0.message ? String(error$jscomp$0.message) : String(error$jscomp$0)
                              ]
                            ], tooltipText = getIOLongName(
                              asyncInfo$jscomp$0.awaited,
                              description,
                              asyncInfo$jscomp$0.env,
                              rootEnv
                            ) + " Rejected";
                            debugTask$jscomp$1.run(
                              performance.measure.bind(
                                performance,
                                entryName$jscomp$2,
                                {
                                  start: 0 > startTime$jscomp$4 ? 0 : startTime$jscomp$4,
                                  end: endTime$jscomp$0,
                                  detail: {
                                    devtools: {
                                      color: "error",
                                      track: trackNames[trackIdx$jscomp$3],
                                      trackGroup: "Server Components ⚛",
                                      properties: properties$jscomp$1,
                                      tooltipText
                                    }
                                  }
                                }
                              )
                            );
                          } else
                            console.timeStamp(
                              entryName$jscomp$2,
                              0 > startTime$jscomp$4 ? 0 : startTime$jscomp$4,
                              endTime$jscomp$0,
                              trackNames[trackIdx$jscomp$3],
                              "Server Components ⚛",
                              "error"
                            );
                        }
                        break;
                      default:
                        logComponentAwait(
                          asyncInfo,
                          trackIdx$jscomp$6,
                          time,
                          endTime,
                          env$jscomp$1,
                          void 0
                        );
                    }
                  } else
                    logComponentAwait(
                      asyncInfo,
                      trackIdx$jscomp$6,
                      time,
                      endTime,
                      env$jscomp$1,
                      void 0
                    );
                }
              }
            else {
              endTime = time;
              for (var _j = debugInfo.length - 1; _j > _i6; _j--) {
                var _candidateInfo = debugInfo[_j];
                if ("string" === typeof _candidateInfo.name) {
                  componentEndTime > childrenEndTime && (childrenEndTime = componentEndTime);
                  var _componentInfo = _candidateInfo, _env = response$jscomp$0._rootEnvironmentName, componentInfo$jscomp$4 = _componentInfo, trackIdx$jscomp$4 = trackIdx$jscomp$6, startTime$jscomp$5 = time, childrenEndTime$jscomp$3 = childrenEndTime;
                  if (supportsUserTiming) {
                    var env$jscomp$2 = componentInfo$jscomp$4.env, name$jscomp$1 = componentInfo$jscomp$4.name, entryName$jscomp$3 = env$jscomp$2 === _env || void 0 === env$jscomp$2 ? name$jscomp$1 : name$jscomp$1 + " [" + env$jscomp$2 + "]", properties$jscomp$2 = [
                      [
                        "Aborted",
                        "The stream was aborted before this Component finished rendering."
                      ]
                    ];
                    null != componentInfo$jscomp$4.key && addValueToProperties(
                      "key",
                      componentInfo$jscomp$4.key,
                      properties$jscomp$2,
                      0,
                      ""
                    );
                    null != componentInfo$jscomp$4.props && addObjectToProperties(
                      componentInfo$jscomp$4.props,
                      properties$jscomp$2,
                      0,
                      ""
                    );
                    performance.measure("​" + entryName$jscomp$3, {
                      start: 0 > startTime$jscomp$5 ? 0 : startTime$jscomp$5,
                      end: childrenEndTime$jscomp$3,
                      detail: {
                        devtools: {
                          color: "warning",
                          track: trackNames[trackIdx$jscomp$4],
                          trackGroup: "Server Components ⚛",
                          tooltipText: entryName$jscomp$3 + " Aborted",
                          properties: properties$jscomp$2
                        }
                      }
                    });
                  }
                  componentEndTime = time;
                  result.component = _componentInfo;
                  isLastComponent = false;
                } else if (_candidateInfo.awaited && null != _candidateInfo.awaited.env) {
                  var _asyncInfo = _candidateInfo, _env2 = response$jscomp$0._rootEnvironmentName;
                  _asyncInfo.awaited.end > endTime && (endTime = _asyncInfo.awaited.end);
                  endTime > childrenEndTime && (childrenEndTime = endTime);
                  var asyncInfo$jscomp$1 = _asyncInfo, trackIdx$jscomp$5 = trackIdx$jscomp$6, startTime$jscomp$6 = time, endTime$jscomp$1 = endTime, rootEnv$jscomp$0 = _env2;
                  if (supportsUserTiming && 0 < endTime$jscomp$1) {
                    var entryName$jscomp$4 = "await " + getIOShortName(
                      asyncInfo$jscomp$1.awaited,
                      "",
                      asyncInfo$jscomp$1.env,
                      rootEnv$jscomp$0
                    ), debugTask$jscomp$2 = asyncInfo$jscomp$1.debugTask || asyncInfo$jscomp$1.awaited.debugTask;
                    if (debugTask$jscomp$2) {
                      var tooltipText$jscomp$0 = getIOLongName(
                        asyncInfo$jscomp$1.awaited,
                        "",
                        asyncInfo$jscomp$1.env,
                        rootEnv$jscomp$0
                      ) + " Aborted";
                      debugTask$jscomp$2.run(
                        performance.measure.bind(
                          performance,
                          entryName$jscomp$4,
                          {
                            start: 0 > startTime$jscomp$6 ? 0 : startTime$jscomp$6,
                            end: endTime$jscomp$1,
                            detail: {
                              devtools: {
                                color: "warning",
                                track: trackNames[trackIdx$jscomp$5],
                                trackGroup: "Server Components ⚛",
                                properties: [
                                  [
                                    "Aborted",
                                    "The stream was aborted before this Promise resolved."
                                  ]
                                ],
                                tooltipText: tooltipText$jscomp$0
                              }
                            }
                          }
                        )
                      );
                    } else
                      console.timeStamp(
                        entryName$jscomp$4,
                        0 > startTime$jscomp$6 ? 0 : startTime$jscomp$6,
                        endTime$jscomp$1,
                        trackNames[trackIdx$jscomp$5],
                        "Server Components ⚛",
                        "warning"
                      );
                  }
                }
              }
            }
            endTime = time;
            endTimeIdx = _i6;
          }
        }
      result.endTime = childrenEndTime;
      return result;
    }
    function flushInitialRenderPerformance(response) {
      if (response._replayConsole) {
        var rootChunk = getChunk(response, 0);
        isArrayImpl(rootChunk._children) && (markAllTracksInOrder(), flushComponentPerformance(
          response,
          rootChunk,
          0,
          -Infinity,
          -Infinity
        ));
      }
    }
    function processFullBinaryRow(response, streamState, id, tag, buffer, chunk) {
      switch (tag) {
        case 65:
          resolveBuffer(
            response,
            id,
            mergeBuffer(buffer, chunk).buffer,
            streamState
          );
          return;
        case 79:
          resolveTypedArray(
            response,
            id,
            buffer,
            chunk,
            Int8Array,
            1,
            streamState
          );
          return;
        case 111:
          resolveBuffer(
            response,
            id,
            0 === buffer.length ? chunk : mergeBuffer(buffer, chunk),
            streamState
          );
          return;
        case 85:
          resolveTypedArray(
            response,
            id,
            buffer,
            chunk,
            Uint8ClampedArray,
            1,
            streamState
          );
          return;
        case 83:
          resolveTypedArray(
            response,
            id,
            buffer,
            chunk,
            Int16Array,
            2,
            streamState
          );
          return;
        case 115:
          resolveTypedArray(
            response,
            id,
            buffer,
            chunk,
            Uint16Array,
            2,
            streamState
          );
          return;
        case 76:
          resolveTypedArray(
            response,
            id,
            buffer,
            chunk,
            Int32Array,
            4,
            streamState
          );
          return;
        case 108:
          resolveTypedArray(
            response,
            id,
            buffer,
            chunk,
            Uint32Array,
            4,
            streamState
          );
          return;
        case 71:
          resolveTypedArray(
            response,
            id,
            buffer,
            chunk,
            Float32Array,
            4,
            streamState
          );
          return;
        case 103:
          resolveTypedArray(
            response,
            id,
            buffer,
            chunk,
            Float64Array,
            8,
            streamState
          );
          return;
        case 77:
          resolveTypedArray(
            response,
            id,
            buffer,
            chunk,
            BigInt64Array,
            8,
            streamState
          );
          return;
        case 109:
          resolveTypedArray(
            response,
            id,
            buffer,
            chunk,
            BigUint64Array,
            8,
            streamState
          );
          return;
        case 86:
          resolveTypedArray(
            response,
            id,
            buffer,
            chunk,
            DataView,
            1,
            streamState
          );
          return;
      }
      for (var stringDecoder = response._stringDecoder, row = "", i = 0; i < buffer.length; i++)
        row += stringDecoder.decode(buffer[i], decoderOptions);
      buffer = row += stringDecoder.decode(chunk);
      switch (tag) {
        case 73:
          resolveModule(response, id, buffer, streamState);
          break;
        case 72:
          id = buffer[0];
          streamState = buffer.slice(1);
          response = JSON.parse(streamState, response._fromJSON);
          streamState = ReactDOMSharedInternals.d;
          switch (id) {
            case "D":
              streamState.D(response);
              break;
            case "C":
              "string" === typeof response ? streamState.C(response) : streamState.C(response[0], response[1]);
              break;
            case "L":
              id = response[0];
              buffer = response[1];
              3 === response.length ? streamState.L(id, buffer, response[2]) : streamState.L(id, buffer);
              break;
            case "m":
              "string" === typeof response ? streamState.m(response) : streamState.m(response[0], response[1]);
              break;
            case "X":
              "string" === typeof response ? streamState.X(response) : streamState.X(response[0], response[1]);
              break;
            case "S":
              "string" === typeof response ? streamState.S(response) : streamState.S(
                response[0],
                0 === response[1] ? void 0 : response[1],
                3 === response.length ? response[2] : void 0
              );
              break;
            case "M":
              "string" === typeof response ? streamState.M(response) : streamState.M(response[0], response[1]);
          }
          break;
        case 69:
          tag = response._chunks;
          chunk = tag.get(id);
          buffer = JSON.parse(buffer);
          stringDecoder = resolveErrorDev(response, buffer);
          stringDecoder.digest = buffer.digest;
          chunk ? (resolveChunkDebugInfo(streamState, chunk), triggerErrorOnChunk(response, chunk, stringDecoder)) : (response = new ReactPromise("rejected", null, stringDecoder), resolveChunkDebugInfo(streamState, response), tag.set(id, response));
          break;
        case 84:
          tag = response._chunks;
          (chunk = tag.get(id)) && "pending" !== chunk.status ? chunk.reason.enqueueValue(buffer) : (chunk && releasePendingChunk(response, chunk), response = new ReactPromise("fulfilled", buffer, null), resolveChunkDebugInfo(streamState, response), tag.set(id, response));
          break;
        case 78:
          response._timeOrigin = +buffer - performance.timeOrigin;
          break;
        case 68:
          id = getChunk(response, id);
          "fulfilled" !== id.status && "rejected" !== id.status && "halted" !== id.status && "blocked" !== id.status && "resolved_module" !== id.status && (streamState = id._debugChunk, tag = createResolvedModelChunk(response, buffer), tag._debugChunk = streamState, id._debugChunk = tag, initializeDebugChunk(response, id), "blocked" !== tag.status || void 0 !== response._debugChannel && response._debugChannel.hasReadable || '"' !== buffer[0] || "$" !== buffer[1] || (streamState = buffer.slice(2, buffer.length - 1).split(":"), streamState = parseInt(streamState[0], 16), "pending" === getChunk(response, streamState).status && (id._debugChunk = null)));
          break;
        case 74:
          resolveIOInfo(response, id, buffer);
          break;
        case 87:
          resolveConsoleEntry(response, buffer);
          break;
        case 82:
          startReadableStream(response, id, void 0, streamState);
          break;
        case 114:
          startReadableStream(response, id, "bytes", streamState);
          break;
        case 88:
          startAsyncIterable(response, id, false, streamState);
          break;
        case 120:
          startAsyncIterable(response, id, true, streamState);
          break;
        case 67:
          (response = response._chunks.get(id)) && "fulfilled" === response.status && response.reason.close("" === buffer ? '"$undefined"' : buffer);
          break;
        default:
          if ("" === buffer) {
            if (streamState = response._chunks, (buffer = streamState.get(id)) || streamState.set(id, buffer = createPendingChunk(response)), "pending" === buffer.status || "blocked" === buffer.status)
              releasePendingChunk(response, buffer), response = buffer, response.status = "halted", response.value = null, response.reason = null;
          } else
            tag = response._chunks, (chunk = tag.get(id)) ? (resolveChunkDebugInfo(streamState, chunk), resolveModelChunk(response, chunk, buffer)) : (response = createResolvedModelChunk(response, buffer), resolveChunkDebugInfo(streamState, response), tag.set(id, response));
      }
    }
    function createFromJSONCallback(response) {
      return function(key, value) {
        if ("__proto__" !== key) {
          if ("string" === typeof value)
            return parseModelString(response, this, key, value);
          if ("object" === typeof value && null !== value) {
            if (value[0] === REACT_ELEMENT_TYPE)
              b: {
                var owner = value[4], stack = value[5];
                key = value[6];
                value = {
                  $$typeof: REACT_ELEMENT_TYPE,
                  type: value[1],
                  key: value[2],
                  props: value[3],
                  _owner: void 0 === owner ? null : owner
                };
                Object.defineProperty(value, "ref", {
                  enumerable: false,
                  get: nullRefGetter
                });
                value._store = {};
                Object.defineProperty(value._store, "validated", {
                  configurable: false,
                  enumerable: false,
                  writable: true,
                  value: key
                });
                Object.defineProperty(value, "_debugInfo", {
                  configurable: false,
                  enumerable: false,
                  writable: true,
                  value: null
                });
                Object.defineProperty(value, "_debugStack", {
                  configurable: false,
                  enumerable: false,
                  writable: true,
                  value: void 0 === stack ? null : stack
                });
                Object.defineProperty(value, "_debugTask", {
                  configurable: false,
                  enumerable: false,
                  writable: true,
                  value: null
                });
                if (null !== initializingHandler) {
                  owner = initializingHandler;
                  initializingHandler = owner.parent;
                  if (owner.errored) {
                    stack = new ReactPromise("rejected", null, owner.reason);
                    initializeElement(response, value, null);
                    owner = {
                      name: getComponentNameFromType(value.type) || "",
                      owner: value._owner
                    };
                    owner.debugStack = value._debugStack;
                    supportsCreateTask && (owner.debugTask = value._debugTask);
                    stack._debugInfo = [owner];
                    key = createLazyChunkWrapper(stack, key);
                    break b;
                  }
                  if (0 < owner.deps) {
                    stack = new ReactPromise("blocked", null, null);
                    owner.value = value;
                    owner.chunk = stack;
                    key = createLazyChunkWrapper(stack, key);
                    value = initializeElement.bind(null, response, value, key);
                    stack.then(value, value);
                    break b;
                  }
                }
                initializeElement(response, value, null);
                key = value;
              }
            else key = value;
            return key;
          }
          return value;
        }
      };
    }
    function close(weakResponse) {
      reportGlobalError(weakResponse, Error("Connection closed."));
    }
    function noServerCall() {
      throw Error(
        "Server Functions cannot be called during initial render. This would create a fetch waterfall. Try to use a Server Component to pass data to Client Components instead."
      );
    }
    function createResponseFromOptions(options) {
      return new ResponseInstance(
        options.serverConsumerManifest.moduleMap,
        options.serverConsumerManifest.serverModuleMap,
        options.serverConsumerManifest.moduleLoading,
        noServerCall,
        options.encodeFormAction,
        "string" === typeof options.nonce ? options.nonce : void 0,
        options && options.temporaryReferences ? options.temporaryReferences : void 0,
        options && options.findSourceMapURL ? options.findSourceMapURL : void 0,
        options ? true === options.replayConsoleLogs : false,
        options && options.environmentName ? options.environmentName : void 0,
        options && void 0 !== options.debugChannel ? {
          hasReadable: void 0 !== options.debugChannel.readable,
          callback: null
        } : void 0
      )._weakResponse;
    }
    function startReadingFromStream(response$jscomp$0, stream, onDone, debugValue) {
      function progress(_ref) {
        var value = _ref.value;
        if (_ref.done) return onDone();
        _ref = streamState;
        if (void 0 !== response$jscomp$0.weak.deref()) {
          var response = unwrapWeakResponse(response$jscomp$0), i = 0, rowState = _ref._rowState, rowID = _ref._rowID, rowTag = _ref._rowTag, rowLength = _ref._rowLength, buffer = _ref._buffer, chunkLength = value.length, debugInfo = _ref._debugInfo, endTime = performance.now(), previousEndTime = debugInfo.end, newByteLength = debugInfo.byteSize + chunkLength;
          newByteLength > _ref._debugTargetChunkSize || endTime > previousEndTime + 10 ? (_ref._debugInfo = {
            name: debugInfo.name,
            start: debugInfo.start,
            end: endTime,
            byteSize: newByteLength,
            value: debugInfo.value,
            owner: debugInfo.owner,
            debugStack: debugInfo.debugStack,
            debugTask: debugInfo.debugTask
          }, _ref._debugTargetChunkSize = newByteLength + MIN_CHUNK_SIZE) : (debugInfo.end = endTime, debugInfo.byteSize = newByteLength);
          for (; i < chunkLength; ) {
            debugInfo = -1;
            switch (rowState) {
              case 0:
                debugInfo = value[i++];
                58 === debugInfo ? rowState = 1 : rowID = rowID << 4 | (96 < debugInfo ? debugInfo - 87 : debugInfo - 48);
                continue;
              case 1:
                rowState = value[i];
                84 === rowState || 65 === rowState || 79 === rowState || 111 === rowState || 85 === rowState || 83 === rowState || 115 === rowState || 76 === rowState || 108 === rowState || 71 === rowState || 103 === rowState || 77 === rowState || 109 === rowState || 86 === rowState ? (rowTag = rowState, rowState = 2, i++) : 64 < rowState && 91 > rowState || 35 === rowState || 114 === rowState || 120 === rowState ? (rowTag = rowState, rowState = 3, i++) : (rowTag = 0, rowState = 3);
                continue;
              case 2:
                debugInfo = value[i++];
                44 === debugInfo ? rowState = 4 : rowLength = rowLength << 4 | (96 < debugInfo ? debugInfo - 87 : debugInfo - 48);
                continue;
              case 3:
                debugInfo = value.indexOf(10, i);
                break;
              case 4:
                debugInfo = i + rowLength, debugInfo > value.length && (debugInfo = -1);
            }
            endTime = value.byteOffset + i;
            if (-1 < debugInfo)
              rowLength = new Uint8Array(
                value.buffer,
                endTime,
                debugInfo - i
              ), processFullBinaryRow(
                response,
                _ref,
                rowID,
                rowTag,
                buffer,
                rowLength
              ), i = debugInfo, 3 === rowState && i++, rowLength = rowID = rowTag = rowState = 0, buffer.length = 0;
            else {
              value = new Uint8Array(
                value.buffer,
                endTime,
                value.byteLength - i
              );
              buffer.push(value);
              rowLength -= value.byteLength;
              break;
            }
          }
          _ref._rowState = rowState;
          _ref._rowID = rowID;
          _ref._rowTag = rowTag;
          _ref._rowLength = rowLength;
        }
        return reader.read().then(progress).catch(error);
      }
      function error(e) {
        reportGlobalError(response$jscomp$0, e);
      }
      var streamState = createStreamState(response$jscomp$0, debugValue), reader = stream.getReader();
      reader.read().then(progress).catch(error);
    }
    var ReactDOM = requireReactDom_reactServer(), React2 = requireReact_reactServer(), decoderOptions = { stream: true }, bind$1 = Function.prototype.bind, hasOwnProperty = Object.prototype.hasOwnProperty, chunkCache = /* @__PURE__ */ new Map(), ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, ASYNC_ITERATOR = Symbol.asyncIterator, isArrayImpl = Array.isArray, getPrototypeOf = Object.getPrototypeOf, jsxPropsParents = /* @__PURE__ */ new WeakMap(), jsxChildrenParents = /* @__PURE__ */ new WeakMap(), CLIENT_REFERENCE_TAG = /* @__PURE__ */ Symbol.for("react.client.reference"), ObjectPrototype = Object.prototype, knownServerReferences = /* @__PURE__ */ new WeakMap(), boundCache = /* @__PURE__ */ new WeakMap(), fakeServerFunctionIdx = 0, FunctionBind = Function.prototype.bind, ArraySlice = Array.prototype.slice, v8FrameRegExp = /^ {3} at (?:(.+) \((.+):(\d+):(\d+)\)|(?:async )?(.+):(\d+):(\d+))$/, jscSpiderMonkeyFrameRegExp = /(?:(.*)@)?(.*):(\d+):(\d+)/, REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), supportsUserTiming = "undefined" !== typeof console && "function" === typeof console.timeStamp && "undefined" !== typeof performance && "function" === typeof performance.measure, trackNames = "Primary Parallel Parallel​ Parallel​​ Parallel​​​ Parallel​​​​ Parallel​​​​​ Parallel​​​​​​ Parallel​​​​​​​ Parallel​​​​​​​​".split(
      " "
    ), prefix, suffix;
    var ReactSharedInteralsServer = React2.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE || ReactSharedInteralsServer;
    ReactPromise.prototype = Object.create(Promise.prototype);
    ReactPromise.prototype.then = function(resolve, reject) {
      var _this = this;
      switch (this.status) {
        case "resolved_model":
          initializeModelChunk(this);
          break;
        case "resolved_module":
          initializeModuleChunk(this);
      }
      var resolveCallback = resolve, rejectCallback = reject, wrapperPromise = new Promise(function(res, rej) {
        resolve = function(value) {
          wrapperPromise._debugInfo = _this._debugInfo;
          res(value);
        };
        reject = function(reason) {
          wrapperPromise._debugInfo = _this._debugInfo;
          rej(reason);
        };
      });
      wrapperPromise.then(resolveCallback, rejectCallback);
      switch (this.status) {
        case "fulfilled":
          "function" === typeof resolve && resolve(this.value);
          break;
        case "pending":
        case "blocked":
          "function" === typeof resolve && (null === this.value && (this.value = []), this.value.push(resolve));
          "function" === typeof reject && (null === this.reason && (this.reason = []), this.reason.push(reject));
          break;
        case "halted":
          break;
        default:
          "function" === typeof reject && reject(this.reason);
      }
    };
    var debugChannelRegistry = "function" === typeof FinalizationRegistry ? new FinalizationRegistry(closeDebugChannel) : null, initializingHandler = null, initializingChunk = null, mightHaveStaticConstructor = /\bclass\b.*\bstatic\b/, MIN_CHUNK_SIZE = 65536, supportsCreateTask = !!console.createTask, fakeFunctionCache = /* @__PURE__ */ new Map(), fakeFunctionIdx = 0, createFakeJSXCallStack = {
      react_stack_bottom_frame: function(response, stack, environmentName) {
        return buildFakeCallStack(
          response,
          stack,
          environmentName,
          false,
          fakeJSXCallSite
        )();
      }
    }, createFakeJSXCallStackInDEV = createFakeJSXCallStack.react_stack_bottom_frame.bind(
      createFakeJSXCallStack
    ), currentOwnerInDEV = null, replayConsoleWithCallStack = {
      react_stack_bottom_frame: function(response, payload) {
        var methodName = payload[0], stackTrace = payload[1], owner = payload[2], env = payload[3];
        payload = payload.slice(4);
        var prevStack = ReactSharedInternals.getCurrentStack;
        ReactSharedInternals.getCurrentStack = getCurrentStackInDEV;
        currentOwnerInDEV = null === owner ? response._debugRootOwner : owner;
        try {
          a: {
            var offset = 0;
            switch (methodName) {
              case "dir":
              case "dirxml":
              case "groupEnd":
              case "table":
                var JSCompiler_inline_result = bind$1.apply(
                  console[methodName],
                  [console].concat(payload)
                );
                break a;
              case "assert":
                offset = 1;
            }
            var newArgs = payload.slice(0);
            "string" === typeof newArgs[offset] ? newArgs.splice(
              offset,
              1,
              "\x1B[0m\x1B[7m%c%s\x1B[0m%c " + newArgs[offset],
              "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
              " " + env + " ",
              ""
            ) : newArgs.splice(
              offset,
              0,
              "\x1B[0m\x1B[7m%c%s\x1B[0m%c",
              "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
              " " + env + " ",
              ""
            );
            newArgs.unshift(console);
            JSCompiler_inline_result = bind$1.apply(
              console[methodName],
              newArgs
            );
          }
          var callStack = buildFakeCallStack(
            response,
            stackTrace,
            env,
            false,
            JSCompiler_inline_result
          );
          if (null != owner) {
            var task = initializeFakeTask(response, owner);
            initializeFakeStack(response, owner);
            if (null !== task) {
              task.run(callStack);
              return;
            }
          }
          var rootTask = getRootTask(response, env);
          null != rootTask ? rootTask.run(callStack) : callStack();
        } finally {
          currentOwnerInDEV = null, ReactSharedInternals.getCurrentStack = prevStack;
        }
      }
    }, replayConsoleWithCallStackInDEV = replayConsoleWithCallStack.react_stack_bottom_frame.bind(
      replayConsoleWithCallStack
    );
    reactServerDomWebpackClient_edge_development.createFromFetch = function(promiseForResponse, options) {
      var response = createResponseFromOptions(options);
      promiseForResponse.then(
        function(r) {
          if (options && options.debugChannel && options.debugChannel.readable) {
            var streamDoneCount = 0, handleDone = function() {
              2 === ++streamDoneCount && close(response);
            };
            startReadingFromStream(
              response,
              options.debugChannel.readable,
              handleDone
            );
            startReadingFromStream(response, r.body, handleDone, r);
          } else
            startReadingFromStream(
              response,
              r.body,
              close.bind(null, response),
              r
            );
        },
        function(e) {
          reportGlobalError(response, e);
        }
      );
      return getRoot(response);
    };
    reactServerDomWebpackClient_edge_development.createFromReadableStream = function(stream, options) {
      var response = createResponseFromOptions(options);
      if (options && options.debugChannel && options.debugChannel.readable) {
        var streamDoneCount = 0, handleDone = function() {
          2 === ++streamDoneCount && close(response);
        };
        startReadingFromStream(
          response,
          options.debugChannel.readable,
          handleDone
        );
        startReadingFromStream(response, stream, handleDone, stream);
      } else
        startReadingFromStream(
          response,
          stream,
          close.bind(null, response),
          stream
        );
      return getRoot(response);
    };
    reactServerDomWebpackClient_edge_development.createServerReference = function(id) {
      return createServerReference$1(id, noServerCall);
    };
    reactServerDomWebpackClient_edge_development.createTemporaryReferenceSet = function() {
      return /* @__PURE__ */ new Map();
    };
    reactServerDomWebpackClient_edge_development.encodeReply = function(value, options) {
      return new Promise(function(resolve, reject) {
        var abort = processReply(
          value,
          "",
          options && options.temporaryReferences ? options.temporaryReferences : void 0,
          resolve,
          reject
        );
        if (options && options.signal) {
          var signal = options.signal;
          if (signal.aborted) abort(signal.reason);
          else {
            var listener = function() {
              abort(signal.reason);
              signal.removeEventListener("abort", listener);
            };
            signal.addEventListener("abort", listener);
          }
        }
      });
    };
    reactServerDomWebpackClient_edge_development.registerServerReference = function(reference, id, encodeFormAction) {
      registerBoundServerReference(reference, id, null, encodeFormAction);
      return reference;
    };
  })();
  return reactServerDomWebpackClient_edge_development;
}
var hasRequiredClient_edge;
function requireClient_edge() {
  if (hasRequiredClient_edge) return client_edge.exports;
  hasRequiredClient_edge = 1;
  if (process.env.NODE_ENV === "production") {
    client_edge.exports = requireReactServerDomWebpackClient_edge_production();
  } else {
    client_edge.exports = requireReactServerDomWebpackClient_edge_development();
  }
  return client_edge.exports;
}
requireClient_edge();
function renderToReadableStream$1(data, options, extraOptions) {
  return server_edgeExports.renderToReadableStream(data, createClientManifest({ onClientReference: extraOptions?.onClientReference }), options);
}
function registerClientReference(proxy, id, name) {
  return server_edgeExports.registerClientReference(proxy, id, name);
}
function decodeReply(body, options) {
  return server_edgeExports.decodeReply(body, createServerManifest(), options);
}
const createTemporaryReferenceSet = server_edgeExports.createTemporaryReferenceSet;
const serverReferences = {};
initialize();
function initialize() {
  setRequireModule({ load: async (id) => {
    {
      const import_ = serverReferences[id];
      if (!import_) throw new Error(`server reference not found '${id}'`);
      return import_();
    }
  } });
}
function renderToReadableStream(data, options, extraOptions) {
  return renderToReadableStream$1(data, options, { onClientReference(metadata2) {
    assetsManifest.clientReferenceDeps[metadata2.id] ?? {};
  } });
}
var react_reactServerExports = requireReact_reactServer();
const __vite_rsc_react__ = /* @__PURE__ */ getDefaultExportFromCjs(react_reactServerExports);
const React = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: __vite_rsc_react__
}, [react_reactServerExports]);
let _serverContext = null;
let _getServerContext = () => _serverContext;
let _setServerContext = (ctx) => {
  _serverContext = ctx;
};
function _registerStateAccessors(accessors) {
  _getServerContext = accessors.getServerContext;
  _setServerContext = accessors.setServerContext;
}
function getNavigationContext() {
  return _getServerContext();
}
function setNavigationContext$1(ctx) {
  _setServerContext(ctx);
}
const isServer = typeof window === "undefined";
const _listeners = /* @__PURE__ */ new Set();
function notifyListeners() {
  for (const fn of _listeners)
    fn();
}
let _cachedSearch = !isServer ? window.location.search : "";
new URLSearchParams(_cachedSearch);
!isServer ? window.history.replaceState.bind(window.history) : null;
function restoreScrollPosition(state) {
  if (state && typeof state === "object" && "__vinext_scrollY" in state) {
    const { __vinext_scrollX: x, __vinext_scrollY: y } = state;
    Promise.resolve().then(() => {
      const pending = window.__VINEXT_RSC_PENDING__ ?? null;
      if (pending) {
        pending.then(() => {
          requestAnimationFrame(() => {
            window.scrollTo(x, y);
          });
        });
      } else {
        requestAnimationFrame(() => {
          window.scrollTo(x, y);
        });
      }
    });
  }
}
var RedirectType;
(function(RedirectType2) {
  RedirectType2["push"] = "push";
  RedirectType2["replace"] = "replace";
})(RedirectType || (RedirectType = {}));
if (!isServer) {
  window.addEventListener("popstate", (event) => {
    notifyListeners();
    restoreScrollPosition(event.state);
  });
  const originalPushState = window.history.pushState.bind(window.history);
  const originalReplaceState = window.history.replaceState.bind(window.history);
  window.history.pushState = function patchedPushState(data, unused, url) {
    originalPushState(data, unused, url);
    notifyListeners();
  };
  window.history.replaceState = function patchedReplaceState(data, unused, url) {
    originalReplaceState(data, unused, url);
    notifyListeners();
  };
}
const _ALS_KEY$3 = /* @__PURE__ */ Symbol.for("vinext.nextHeadersShim.als");
const _FALLBACK_KEY$3 = /* @__PURE__ */ Symbol.for("vinext.nextHeadersShim.fallback");
const _g$4 = globalThis;
const _als$2 = _g$4[_ALS_KEY$3] ??= new AsyncLocalStorage$1();
const _fallbackState$2 = _g$4[_FALLBACK_KEY$3] ??= {
  headersContext: null,
  dynamicUsageDetected: false,
  pendingSetCookies: [],
  draftModeCookieHeader: null
};
function _enterWith$1(state) {
  const enterWith = _als$2.enterWith;
  if (typeof enterWith === "function") {
    try {
      enterWith.call(_als$2, state);
      return;
    } catch {
    }
  }
  _fallbackState$2.headersContext = state.headersContext;
  _fallbackState$2.dynamicUsageDetected = state.dynamicUsageDetected;
  _fallbackState$2.pendingSetCookies = state.pendingSetCookies;
  _fallbackState$2.draftModeCookieHeader = state.draftModeCookieHeader;
}
function _getState$2() {
  const state = _als$2.getStore();
  return state ?? _fallbackState$2;
}
function markDynamicUsage() {
  _getState$2().dynamicUsageDetected = true;
}
function consumeDynamicUsage() {
  const state = _getState$2();
  const used = state.dynamicUsageDetected;
  state.dynamicUsageDetected = false;
  return used;
}
function setHeadersContext(ctx) {
  if (ctx !== null) {
    _enterWith$1({
      headersContext: ctx,
      dynamicUsageDetected: false,
      pendingSetCookies: [],
      draftModeCookieHeader: null
    });
    return;
  }
  const state = _als$2.getStore();
  if (state) {
    state.headersContext = null;
  } else {
    _fallbackState$2.headersContext = null;
  }
}
function runWithHeadersContext(ctx, fn) {
  const state = {
    headersContext: ctx,
    dynamicUsageDetected: false,
    pendingSetCookies: [],
    draftModeCookieHeader: null
  };
  _enterWith$1(state);
  _fallbackState$2.headersContext = ctx;
  _fallbackState$2.dynamicUsageDetected = false;
  _fallbackState$2.pendingSetCookies = [];
  _fallbackState$2.draftModeCookieHeader = null;
  return fn();
}
function headersContextFromRequest(request) {
  const cookies2 = /* @__PURE__ */ new Map();
  const cookieHeader = request.headers.get("cookie") || "";
  for (const part of cookieHeader.split(";")) {
    const [key, ...rest] = part.split("=");
    if (key) {
      cookies2.set(key.trim(), rest.join("=").trim());
    }
  }
  return {
    headers: request.headers,
    cookies: cookies2
  };
}
function getAndClearPendingCookies() {
  const state = _getState$2();
  const cookies2 = state.pendingSetCookies;
  state.pendingSetCookies = [];
  return cookies2;
}
function getDraftModeCookieHeader() {
  const state = _getState$2();
  const header = state.draftModeCookieHeader;
  state.draftModeCookieHeader = null;
  return header;
}
const ErrorBoundary = /* @__PURE__ */ registerClientReference(() => {
  throw new Error("Unexpectedly client reference export 'ErrorBoundary' is called on server");
}, "f29e6e234fea", "ErrorBoundary");
const NotFoundBoundary = /* @__PURE__ */ registerClientReference(() => {
  throw new Error("Unexpectedly client reference export 'NotFoundBoundary' is called on server");
}, "f29e6e234fea", "NotFoundBoundary");
const LayoutSegmentProvider = /* @__PURE__ */ registerClientReference(() => {
  throw new Error("Unexpectedly client reference export 'LayoutSegmentProvider' is called on server");
}, "0deffcb8ffd7", "LayoutSegmentProvider");
var jsxRuntime_reactServer = { exports: {} };
var reactJsxRuntime_reactServer_production = {};
var hasRequiredReactJsxRuntime_reactServer_production;
function requireReactJsxRuntime_reactServer_production() {
  if (hasRequiredReactJsxRuntime_reactServer_production) return reactJsxRuntime_reactServer_production;
  hasRequiredReactJsxRuntime_reactServer_production = 1;
  var React2 = requireReact_reactServer(), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
  if (!React2.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE)
    throw Error(
      'The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.'
    );
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_reactServer_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_reactServer_production.jsx = jsxProd;
  reactJsxRuntime_reactServer_production.jsxDEV = void 0;
  reactJsxRuntime_reactServer_production.jsxs = jsxProd;
  return reactJsxRuntime_reactServer_production;
}
var reactJsxRuntime_reactServer_development = {};
var hasRequiredReactJsxRuntime_reactServer_development;
function requireReactJsxRuntime_reactServer_development() {
  if (hasRequiredReactJsxRuntime_reactServer_development) return reactJsxRuntime_reactServer_development;
  hasRequiredReactJsxRuntime_reactServer_development = 1;
  "production" !== process.env.NODE_ENV && (function() {
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeof type)
        switch ("number" === typeof type.tag && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          JSCompiler_inline_result$jscomp$0
        );
        return testStringCoercion(value);
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return "<>";
      if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternalsServer.A;
      return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning) return false;
      }
      return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          displayName
        ));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      ));
      componentName = this.props.ref;
      return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
      var children = config.children;
      if (void 0 !== children)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
              validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else validateChildKeys(children);
      if (hasOwnProperty.call(config, "key")) {
        children = getComponentNameFromType(type);
        var keys = Object.keys(config).filter(function(k) {
          return "key" !== k;
        });
        isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
        didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
          'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
          isStaticChildren,
          children,
          keys,
          children
        ), didWarnAboutKeySpread[children + isStaticChildren] = true);
      }
      children = null;
      void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
      hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      children && defineKeyPropWarningGetter(
        maybeKey,
        "function" === typeof type ? type.displayName || type.name || "Unknown" : type
      );
      return ReactElement(
        type,
        children,
        maybeKey,
        getOwner(),
        debugStack,
        debugTask
      );
    }
    function validateChildKeys(node) {
      isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React2 = requireReact_reactServer(), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternalsServer = React2.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    if (!ReactSharedInternalsServer)
      throw Error(
        'The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.'
      );
    var hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    React2 = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React2.react_stack_bottom_frame.bind(
      React2,
      UnknownOwner
    )();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    reactJsxRuntime_reactServer_development.Fragment = REACT_FRAGMENT_TYPE;
    reactJsxRuntime_reactServer_development.jsx = function(type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternalsServer.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        false,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
    reactJsxRuntime_reactServer_development.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
      var trackActualOwner = 1e4 > ReactSharedInternalsServer.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        isStaticChildren,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
    reactJsxRuntime_reactServer_development.jsxs = function(type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternalsServer.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        true,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
  })();
  return reactJsxRuntime_reactServer_development;
}
var hasRequiredJsxRuntime_reactServer;
function requireJsxRuntime_reactServer() {
  if (hasRequiredJsxRuntime_reactServer) return jsxRuntime_reactServer.exports;
  hasRequiredJsxRuntime_reactServer = 1;
  if (process.env.NODE_ENV === "production") {
    jsxRuntime_reactServer.exports = requireReactJsxRuntime_reactServer_production();
  } else {
    jsxRuntime_reactServer.exports = requireReactJsxRuntime_reactServer_development();
  }
  return jsxRuntime_reactServer.exports;
}
var jsxRuntime_reactServerExports = requireJsxRuntime_reactServer();
async function resolveModuleViewport(mod, params) {
  if (typeof mod.generateViewport === "function") {
    const asyncParams = Object.assign(Promise.resolve(params), params);
    return await mod.generateViewport({ params: asyncParams });
  }
  if (mod.viewport && typeof mod.viewport === "object") {
    return mod.viewport;
  }
  return null;
}
function mergeViewport(viewportList) {
  const merged = {};
  for (const vp of viewportList) {
    Object.assign(merged, vp);
  }
  return merged;
}
function ViewportHead({ viewport }) {
  const elements = [];
  let key = 0;
  const parts = [];
  if (viewport.width !== void 0)
    parts.push(`width=${viewport.width}`);
  if (viewport.height !== void 0)
    parts.push(`height=${viewport.height}`);
  if (viewport.initialScale !== void 0)
    parts.push(`initial-scale=${viewport.initialScale}`);
  if (viewport.minimumScale !== void 0)
    parts.push(`minimum-scale=${viewport.minimumScale}`);
  if (viewport.maximumScale !== void 0)
    parts.push(`maximum-scale=${viewport.maximumScale}`);
  if (viewport.userScalable !== void 0)
    parts.push(`user-scalable=${viewport.userScalable ? "yes" : "no"}`);
  if (parts.length > 0) {
    elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "viewport", content: parts.join(", ") }, key++));
  }
  if (viewport.themeColor) {
    if (typeof viewport.themeColor === "string") {
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "theme-color", content: viewport.themeColor }, key++));
    } else if (Array.isArray(viewport.themeColor)) {
      for (const entry of viewport.themeColor) {
        elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "theme-color", content: entry.color, ...entry.media ? { media: entry.media } : {} }, key++));
      }
    }
  }
  if (viewport.colorScheme) {
    elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "color-scheme", content: viewport.colorScheme }, key++));
  }
  return jsxRuntime_reactServerExports.jsx(jsxRuntime_reactServerExports.Fragment, { children: elements });
}
function mergeMetadata(metadataList) {
  if (metadataList.length === 0)
    return {};
  const merged = {};
  let parentTemplate;
  for (let i = 0; i < metadataList.length; i++) {
    const meta = metadataList[i];
    const isPage = i === metadataList.length - 1;
    if (!isPage && meta.title && typeof meta.title === "object" && meta.title.template) {
      parentTemplate = meta.title.template;
    }
    for (const key of Object.keys(meta)) {
      if (key === "title")
        continue;
      merged[key] = meta[key];
    }
    if (meta.title !== void 0) {
      merged.title = meta.title;
    }
  }
  const finalTitle = merged.title;
  if (finalTitle) {
    if (typeof finalTitle === "string") {
      if (parentTemplate) {
        merged.title = parentTemplate.replace("%s", finalTitle);
      }
    } else if (typeof finalTitle === "object") {
      if (finalTitle.absolute) {
        merged.title = finalTitle.absolute;
      } else if (finalTitle.default) {
        merged.title = finalTitle.default;
      } else if (finalTitle.template && !finalTitle.default && !finalTitle.absolute) {
        merged.title = void 0;
      }
    }
  }
  return merged;
}
async function resolveModuleMetadata(mod, params, searchParams) {
  if (typeof mod.generateMetadata === "function") {
    const asyncParams = Object.assign(Promise.resolve(params), params);
    const sp = {};
    const asyncSp = Object.assign(Promise.resolve(sp), sp);
    return await mod.generateMetadata({ params: asyncParams, searchParams: asyncSp });
  }
  if (mod.metadata && typeof mod.metadata === "object") {
    return mod.metadata;
  }
  return null;
}
function MetadataHead({ metadata: metadata2 }) {
  const elements = [];
  let key = 0;
  const base = metadata2.metadataBase;
  function resolveUrl(url) {
    if (!url)
      return void 0;
    if (!base)
      return url;
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//"))
      return url;
    try {
      return new URL(url, base).toString();
    } catch {
      return url;
    }
  }
  const title = typeof metadata2.title === "string" ? metadata2.title : typeof metadata2.title === "object" ? metadata2.title.absolute || metadata2.title.default : void 0;
  if (title) {
    elements.push(jsxRuntime_reactServerExports.jsx("title", { children: title }, key++));
  }
  if (metadata2.description) {
    elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "description", content: metadata2.description }, key++));
  }
  if (metadata2.generator) {
    elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "generator", content: metadata2.generator }, key++));
  }
  if (metadata2.applicationName) {
    elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "application-name", content: metadata2.applicationName }, key++));
  }
  if (metadata2.referrer) {
    elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "referrer", content: metadata2.referrer }, key++));
  }
  if (metadata2.keywords) {
    const kw = Array.isArray(metadata2.keywords) ? metadata2.keywords.join(",") : metadata2.keywords;
    elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "keywords", content: kw }, key++));
  }
  if (metadata2.authors) {
    const authorList = Array.isArray(metadata2.authors) ? metadata2.authors : [metadata2.authors];
    for (const author of authorList) {
      if (author.name) {
        elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "author", content: author.name }, key++));
      }
      if (author.url) {
        elements.push(jsxRuntime_reactServerExports.jsx("link", { rel: "author", href: author.url }, key++));
      }
    }
  }
  if (metadata2.creator) {
    elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "creator", content: metadata2.creator }, key++));
  }
  if (metadata2.publisher) {
    elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "publisher", content: metadata2.publisher }, key++));
  }
  if (metadata2.formatDetection) {
    const parts = [];
    if (metadata2.formatDetection.telephone === false)
      parts.push("telephone=no");
    if (metadata2.formatDetection.address === false)
      parts.push("address=no");
    if (metadata2.formatDetection.email === false)
      parts.push("email=no");
    if (parts.length > 0) {
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "format-detection", content: parts.join(", ") }, key++));
    }
  }
  if (metadata2.category) {
    elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "category", content: metadata2.category }, key++));
  }
  if (metadata2.robots) {
    if (typeof metadata2.robots === "string") {
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "robots", content: metadata2.robots }, key++));
    } else {
      const { googleBot, ...robotsRest } = metadata2.robots;
      const robotParts = [];
      for (const [k, v] of Object.entries(robotsRest)) {
        if (v === true)
          robotParts.push(k);
        else if (v === false)
          robotParts.push(`no${k}`);
        else if (typeof v === "string" || typeof v === "number")
          robotParts.push(`${k}:${v}`);
      }
      if (robotParts.length > 0) {
        elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "robots", content: robotParts.join(", ") }, key++));
      }
      if (googleBot) {
        if (typeof googleBot === "string") {
          elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "googlebot", content: googleBot }, key++));
        } else {
          const gbParts = [];
          for (const [k, v] of Object.entries(googleBot)) {
            if (v === true)
              gbParts.push(k);
            else if (v === false)
              gbParts.push(`no${k}`);
            else if (typeof v === "string" || typeof v === "number")
              gbParts.push(`${k}:${v}`);
          }
          if (gbParts.length > 0) {
            elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "googlebot", content: gbParts.join(", ") }, key++));
          }
        }
      }
    }
  }
  if (metadata2.openGraph) {
    const og = metadata2.openGraph;
    if (og.title)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:title", content: og.title }, key++));
    if (og.description)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:description", content: og.description }, key++));
    if (og.url)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:url", content: resolveUrl(og.url) ?? og.url }, key++));
    if (og.siteName)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:site_name", content: og.siteName }, key++));
    if (og.type)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:type", content: og.type }, key++));
    if (og.locale)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:locale", content: og.locale }, key++));
    if (og.publishedTime)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "article:published_time", content: og.publishedTime }, key++));
    if (og.modifiedTime)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "article:modified_time", content: og.modifiedTime }, key++));
    if (og.authors) {
      for (const author of og.authors) {
        elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "article:author", content: author }, key++));
      }
    }
    if (og.images) {
      const imgList = typeof og.images === "string" ? [{ url: og.images }] : og.images;
      for (const img of imgList) {
        const imgUrl = typeof img === "string" ? img : img.url;
        elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:image", content: resolveUrl(imgUrl) ?? imgUrl }, key++));
        if (typeof img !== "string") {
          if (img.width)
            elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:image:width", content: String(img.width) }, key++));
          if (img.height)
            elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:image:height", content: String(img.height) }, key++));
          if (img.alt)
            elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:image:alt", content: img.alt }, key++));
        }
      }
    }
    if (og.videos) {
      for (const video of og.videos) {
        elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:video", content: resolveUrl(video.url) ?? video.url }, key++));
        if (video.width)
          elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:video:width", content: String(video.width) }, key++));
        if (video.height)
          elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:video:height", content: String(video.height) }, key++));
      }
    }
    if (og.audio) {
      for (const audio of og.audio) {
        elements.push(jsxRuntime_reactServerExports.jsx("meta", { property: "og:audio", content: resolveUrl(audio.url) ?? audio.url }, key++));
      }
    }
  }
  if (metadata2.twitter) {
    const tw = metadata2.twitter;
    if (tw.card)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "twitter:card", content: tw.card }, key++));
    if (tw.site)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "twitter:site", content: tw.site }, key++));
    if (tw.siteId)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "twitter:site:id", content: tw.siteId }, key++));
    if (tw.title)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "twitter:title", content: tw.title }, key++));
    if (tw.description)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "twitter:description", content: tw.description }, key++));
    if (tw.creator)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "twitter:creator", content: tw.creator }, key++));
    if (tw.creatorId)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "twitter:creator:id", content: tw.creatorId }, key++));
    if (tw.images) {
      const imgList = typeof tw.images === "string" ? [tw.images] : Array.isArray(tw.images) ? tw.images : [];
      for (const img of imgList) {
        const imgUrl = typeof img === "string" ? img : img.url;
        elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "twitter:image", content: resolveUrl(imgUrl) ?? imgUrl }, key++));
        if (typeof img !== "string" && img.alt) {
          elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "twitter:image:alt", content: img.alt }, key++));
        }
      }
    }
  }
  if (metadata2.icons) {
    const { icon, shortcut, apple, other } = metadata2.icons;
    if (shortcut) {
      const shortcuts = Array.isArray(shortcut) ? shortcut : [shortcut];
      for (const s of shortcuts) {
        elements.push(jsxRuntime_reactServerExports.jsx("link", { rel: "shortcut icon", href: resolveUrl(s) ?? s }, key++));
      }
    }
    if (icon) {
      const icons = typeof icon === "string" ? [{ url: icon }] : icon;
      for (const i of icons) {
        elements.push(jsxRuntime_reactServerExports.jsx("link", { rel: "icon", href: resolveUrl(i.url) ?? i.url, ...i.sizes ? { sizes: i.sizes } : {}, ...i.type ? { type: i.type } : {}, ...i.media ? { media: i.media } : {} }, key++));
      }
    }
    if (apple) {
      const apples = typeof apple === "string" ? [{ url: apple }] : apple;
      for (const a of apples) {
        elements.push(jsxRuntime_reactServerExports.jsx("link", { rel: "apple-touch-icon", href: resolveUrl(a.url) ?? a.url, ...a.sizes ? { sizes: a.sizes } : {}, ...a.type ? { type: a.type } : {} }, key++));
      }
    }
    if (other) {
      for (const o of other) {
        elements.push(jsxRuntime_reactServerExports.jsx("link", { rel: o.rel, href: resolveUrl(o.url) ?? o.url, ...o.sizes ? { sizes: o.sizes } : {} }, key++));
      }
    }
  }
  if (metadata2.manifest) {
    elements.push(jsxRuntime_reactServerExports.jsx("link", { rel: "manifest", href: resolveUrl(metadata2.manifest) ?? metadata2.manifest }, key++));
  }
  if (metadata2.alternates) {
    const alt = metadata2.alternates;
    if (alt.canonical) {
      elements.push(jsxRuntime_reactServerExports.jsx("link", { rel: "canonical", href: resolveUrl(alt.canonical) ?? alt.canonical }, key++));
    }
    if (alt.languages) {
      for (const [lang, href] of Object.entries(alt.languages)) {
        elements.push(jsxRuntime_reactServerExports.jsx("link", { rel: "alternate", hrefLang: lang, href: resolveUrl(href) ?? href }, key++));
      }
    }
    if (alt.media) {
      for (const [media, href] of Object.entries(alt.media)) {
        elements.push(jsxRuntime_reactServerExports.jsx("link", { rel: "alternate", media, href: resolveUrl(href) ?? href }, key++));
      }
    }
    if (alt.types) {
      for (const [type, href] of Object.entries(alt.types)) {
        elements.push(jsxRuntime_reactServerExports.jsx("link", { rel: "alternate", type, href: resolveUrl(href) ?? href }, key++));
      }
    }
  }
  if (metadata2.verification) {
    const v = metadata2.verification;
    if (v.google)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "google-site-verification", content: v.google }, key++));
    if (v.yahoo)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "y_key", content: v.yahoo }, key++));
    if (v.yandex)
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "yandex-verification", content: v.yandex }, key++));
    if (v.other) {
      for (const [name, content] of Object.entries(v.other)) {
        const values = Array.isArray(content) ? content : [content];
        for (const val of values) {
          elements.push(jsxRuntime_reactServerExports.jsx("meta", { name, content: val }, key++));
        }
      }
    }
  }
  if (metadata2.appleWebApp) {
    const awa = metadata2.appleWebApp;
    if (awa.capable !== false) {
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "mobile-web-app-capable", content: "yes" }, key++));
    }
    if (awa.title) {
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "apple-mobile-web-app-title", content: awa.title }, key++));
    }
    if (awa.statusBarStyle) {
      elements.push(jsxRuntime_reactServerExports.jsx("meta", { name: "apple-mobile-web-app-status-bar-style", content: awa.statusBarStyle }, key++));
    }
    if (awa.startupImage) {
      const imgs = typeof awa.startupImage === "string" ? [{ url: awa.startupImage }] : awa.startupImage;
      for (const img of imgs) {
        elements.push(jsxRuntime_reactServerExports.jsx("link", { rel: "apple-touch-startup-image", href: resolveUrl(img.url) ?? img.url, ...img.media ? { media: img.media } : {} }, key++));
      }
    }
  }
  if (metadata2.other) {
    for (const [name, content] of Object.entries(metadata2.other)) {
      const values = Array.isArray(content) ? content : [content];
      for (const val of values) {
        elements.push(jsxRuntime_reactServerExports.jsx("meta", { name, content: val }, key++));
      }
    }
  }
  return jsxRuntime_reactServerExports.jsx(jsxRuntime_reactServerExports.Fragment, { children: elements });
}
function sitemapToXml(entries) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];
  for (const entry of entries) {
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(entry.url)}</loc>`);
    if (entry.lastModified) {
      const date = entry.lastModified instanceof Date ? entry.lastModified.toISOString() : entry.lastModified;
      lines.push(`    <lastmod>${escapeXml(date)}</lastmod>`);
    }
    if (entry.changeFrequency) {
      lines.push(`    <changefreq>${escapeXml(entry.changeFrequency)}</changefreq>`);
    }
    if (entry.priority !== void 0) {
      lines.push(`    <priority>${entry.priority}</priority>`);
    }
    if (entry.images) {
      for (const image of entry.images) {
        lines.push("    <image:image>");
        lines.push(`      <image:loc>${escapeXml(image)}</image:loc>`);
        lines.push("    </image:image>");
      }
    }
    lines.push("  </url>");
  }
  lines.push("</urlset>");
  return lines.join("\n");
}
function robotsToText(config) {
  const lines = [];
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
  for (const rule of rules) {
    const agents = Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent ?? "*"];
    for (const agent of agents) {
      lines.push(`User-Agent: ${agent}`);
    }
    if (rule.allow) {
      const allows = Array.isArray(rule.allow) ? rule.allow : [rule.allow];
      for (const allow of allows) {
        lines.push(`Allow: ${allow}`);
      }
    }
    if (rule.disallow) {
      const disallows = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];
      for (const disallow of disallows) {
        lines.push(`Disallow: ${disallow}`);
      }
    }
    if (rule.crawlDelay !== void 0) {
      lines.push(`Crawl-delay: ${rule.crawlDelay}`);
    }
    lines.push("");
  }
  if (config.sitemap) {
    const sitemaps = Array.isArray(config.sitemap) ? config.sitemap : [config.sitemap];
    for (const sitemap of sitemaps) {
      lines.push(`Sitemap: ${sitemap}`);
    }
  }
  if (config.host) {
    lines.push(`Host: ${config.host}`);
  }
  return lines.join("\n").trim() + "\n";
}
function manifestToJson(config) {
  return JSON.stringify(config, null, 2);
}
function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
class MemoryCacheHandler {
  store = /* @__PURE__ */ new Map();
  tagRevalidatedAt = /* @__PURE__ */ new Map();
  async get(key, _ctx) {
    const entry = this.store.get(key);
    if (!entry)
      return null;
    for (const tag of entry.tags) {
      const revalidatedAt = this.tagRevalidatedAt.get(tag);
      if (revalidatedAt && revalidatedAt >= entry.lastModified) {
        this.store.delete(key);
        return null;
      }
    }
    if (entry.revalidateAt !== null && Date.now() > entry.revalidateAt) {
      return {
        lastModified: entry.lastModified,
        value: entry.value,
        cacheState: "stale"
      };
    }
    return {
      lastModified: entry.lastModified,
      value: entry.value
    };
  }
  async set(key, data, ctx) {
    const tags = [];
    if (data && "tags" in data && Array.isArray(data.tags)) {
      tags.push(...data.tags);
    }
    if (ctx && "tags" in ctx && Array.isArray(ctx.tags)) {
      tags.push(...ctx.tags);
    }
    let revalidateAt = null;
    if (ctx) {
      const revalidate = ctx.cacheControl?.revalidate ?? ctx.revalidate;
      if (typeof revalidate === "number" && revalidate > 0) {
        revalidateAt = Date.now() + revalidate * 1e3;
      }
    }
    if (data && "revalidate" in data && typeof data.revalidate === "number") {
      revalidateAt = Date.now() + data.revalidate * 1e3;
    }
    this.store.set(key, {
      value: data,
      tags,
      lastModified: Date.now(),
      revalidateAt
    });
  }
  async revalidateTag(tags, _durations) {
    const tagList = Array.isArray(tags) ? tags : [tags];
    const now = Date.now();
    for (const tag of tagList) {
      this.tagRevalidatedAt.set(tag, now);
    }
  }
  resetRequestCache() {
  }
}
let activeHandler = new MemoryCacheHandler();
function getCacheHandler() {
  return activeHandler;
}
const _ALS_KEY$2 = /* @__PURE__ */ Symbol.for("vinext.cache.als");
const _FALLBACK_KEY$2 = /* @__PURE__ */ Symbol.for("vinext.cache.fallback");
const _g$3 = globalThis;
const _cacheAls = _g$3[_ALS_KEY$2] ??= new AsyncLocalStorage$1();
const _cacheFallbackState = _g$3[_FALLBACK_KEY$2] ??= {
  requestScopedCacheLife: null
};
function _cacheEnterWith(state) {
  const enterWith = _cacheAls.enterWith;
  if (typeof enterWith === "function") {
    try {
      enterWith.call(_cacheAls, state);
      return;
    } catch {
    }
  }
  _cacheFallbackState.requestScopedCacheLife = state.requestScopedCacheLife;
}
function _getCacheState() {
  return _cacheAls.getStore() ?? _cacheFallbackState;
}
function _initRequestScopedCacheState() {
  _cacheEnterWith({ requestScopedCacheLife: null });
  _cacheFallbackState.requestScopedCacheLife = null;
}
function _consumeRequestScopedCacheLife() {
  const state = _getCacheState();
  const config = state.requestScopedCacheLife;
  state.requestScopedCacheLife = null;
  return config;
}
function buildFetchCacheKey(input, init2) {
  let url;
  let method = "GET";
  let body;
  if (typeof input === "string") {
    url = input;
  } else if (input instanceof URL) {
    url = input.toString();
  } else {
    url = input.url;
    method = input.method || "GET";
  }
  if (init2?.method)
    method = init2.method;
  if (init2?.body && typeof init2.body === "string")
    body = init2.body;
  const parts = [`fetch:${method}:${url}`];
  if (body)
    parts.push(body);
  return parts.join("|");
}
const _ORIG_FETCH_KEY = /* @__PURE__ */ Symbol.for("vinext.fetchCache.originalFetch");
const _gFetch = globalThis;
const originalFetch = _gFetch[_ORIG_FETCH_KEY] ??= globalThis.fetch;
const _ALS_KEY$1 = /* @__PURE__ */ Symbol.for("vinext.fetchCache.als");
const _FALLBACK_KEY$1 = /* @__PURE__ */ Symbol.for("vinext.fetchCache.fallback");
const _g$2 = globalThis;
const _als$1 = _g$2[_ALS_KEY$1] ??= new AsyncLocalStorage$1();
const _fallbackState$1 = _g$2[_FALLBACK_KEY$1] ??= {
  currentRequestTags: []
};
function _getState$1() {
  return _als$1.getStore() ?? _fallbackState$1;
}
function createPatchedFetch() {
  return async function patchedFetch(input, init2) {
    const nextOpts = init2?.next;
    const cacheDirective = init2?.cache;
    if (!nextOpts && !cacheDirective) {
      return originalFetch(input, init2);
    }
    if (cacheDirective === "no-store" || nextOpts?.revalidate === false || nextOpts?.revalidate === 0) {
      const cleanInit2 = stripNextFromInit(init2);
      return originalFetch(input, cleanInit2);
    }
    let revalidateSeconds;
    if (cacheDirective === "force-cache") {
      revalidateSeconds = nextOpts?.revalidate && typeof nextOpts.revalidate === "number" ? nextOpts.revalidate : 31536e3;
    } else if (typeof nextOpts?.revalidate === "number" && nextOpts.revalidate > 0) {
      revalidateSeconds = nextOpts.revalidate;
    } else {
      if (nextOpts?.tags && nextOpts.tags.length > 0) {
        revalidateSeconds = 31536e3;
      } else {
        const cleanInit2 = stripNextFromInit(init2);
        return originalFetch(input, cleanInit2);
      }
    }
    const tags = nextOpts?.tags ?? [];
    const cacheKey = buildFetchCacheKey(input, init2);
    const handler2 = getCacheHandler();
    const reqTags = _getState$1().currentRequestTags;
    if (tags.length > 0) {
      for (const tag of tags) {
        if (!reqTags.includes(tag)) {
          reqTags.push(tag);
        }
      }
    }
    try {
      const cached = await handler2.get(cacheKey, { kind: "FETCH", tags });
      if (cached?.value && cached.value.kind === "FETCH" && cached.cacheState !== "stale") {
        const cachedData = cached.value.data;
        return new Response(cachedData.body, {
          status: cachedData.status ?? 200,
          headers: cachedData.headers
        });
      }
      if (cached?.value && cached.value.kind === "FETCH" && cached.cacheState === "stale") {
        const staleData = cached.value.data;
        const cleanInit2 = stripNextFromInit(init2);
        originalFetch(input, cleanInit2).then(async (freshResp) => {
          const freshBody = await freshResp.text();
          const freshHeaders = {};
          freshResp.headers.forEach((v, k) => {
            freshHeaders[k] = v;
          });
          const freshValue = {
            kind: "FETCH",
            data: {
              headers: freshHeaders,
              body: freshBody,
              url: typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url,
              status: freshResp.status
            },
            tags,
            revalidate: revalidateSeconds
          };
          await handler2.set(cacheKey, freshValue, {
            fetchCache: true,
            tags,
            revalidate: revalidateSeconds
          });
        }).catch((err) => {
          console.error("[vinext] fetch cache background revalidation failed:", err);
        });
        return new Response(staleData.body, {
          status: staleData.status ?? 200,
          headers: staleData.headers
        });
      }
    } catch (cacheErr) {
      console.error("[vinext] fetch cache read error:", cacheErr);
    }
    const cleanInit = stripNextFromInit(init2);
    const response = await originalFetch(input, cleanInit);
    if (response.ok) {
      const cloned = response.clone();
      const body = await cloned.text();
      const headers = {};
      cloned.headers.forEach((v, k) => {
        headers[k] = v;
      });
      const cacheValue = {
        kind: "FETCH",
        data: {
          headers,
          body,
          url: typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url,
          status: cloned.status
        },
        tags,
        revalidate: revalidateSeconds
      };
      handler2.set(cacheKey, cacheValue, {
        fetchCache: true,
        tags,
        revalidate: revalidateSeconds
      }).catch((err) => {
        console.error("[vinext] fetch cache write error:", err);
      });
    }
    return response;
  };
}
function stripNextFromInit(init2) {
  if (!init2)
    return init2;
  if (!("next" in init2))
    return init2;
  const { next: _next, ...rest } = init2;
  return Object.keys(rest).length > 0 ? rest : void 0;
}
const _PATCH_KEY = /* @__PURE__ */ Symbol.for("vinext.fetchCache.patchInstalled");
function _ensurePatchInstalled() {
  if (_g$2[_PATCH_KEY])
    return;
  _g$2[_PATCH_KEY] = true;
  globalThis.fetch = createPatchedFetch();
}
async function runWithFetchCache(fn) {
  _ensurePatchInstalled();
  return _als$1.run({ currentRequestTags: [] }, fn);
}
new AsyncLocalStorage$1();
const _PRIVATE_ALS_KEY = /* @__PURE__ */ Symbol.for("vinext.cacheRuntime.privateAls");
const _PRIVATE_FALLBACK_KEY = /* @__PURE__ */ Symbol.for("vinext.cacheRuntime.privateFallback");
const _g$1 = globalThis;
const _privateAls = _g$1[_PRIVATE_ALS_KEY] ??= new AsyncLocalStorage$1();
const _privateFallbackState = _g$1[_PRIVATE_FALLBACK_KEY] ??= {
  cache: /* @__PURE__ */ new Map()
};
function _privateEnterWith(state) {
  const enterWith = _privateAls.enterWith;
  if (typeof enterWith === "function") {
    try {
      enterWith.call(_privateAls, state);
      return;
    } catch {
    }
  }
  _privateFallbackState.cache = state.cache;
}
function clearPrivateCache() {
  _privateEnterWith({ cache: /* @__PURE__ */ new Map() });
  _privateFallbackState.cache = /* @__PURE__ */ new Map();
}
const _ALS_KEY = /* @__PURE__ */ Symbol.for("vinext.navigation.als");
const _FALLBACK_KEY = /* @__PURE__ */ Symbol.for("vinext.navigation.fallback");
const _g = globalThis;
const _als = _g[_ALS_KEY] ??= new AsyncLocalStorage$1();
const _fallbackState = _g[_FALLBACK_KEY] ??= {
  serverContext: null,
  serverInsertedHTMLCallbacks: []
};
function _enterWith(state) {
  const enterWith = _als.enterWith;
  if (typeof enterWith === "function") {
    try {
      enterWith.call(_als, state);
      return;
    } catch {
    }
  }
  _fallbackState.serverContext = state.serverContext;
  _fallbackState.serverInsertedHTMLCallbacks = state.serverInsertedHTMLCallbacks;
}
function _getState() {
  return _als.getStore() ?? _fallbackState;
}
_registerStateAccessors({
  getServerContext() {
    return _getState().serverContext;
  },
  setServerContext(ctx) {
    if (ctx !== null) {
      const existing = _als.getStore();
      _enterWith({
        serverContext: ctx,
        serverInsertedHTMLCallbacks: existing?.serverInsertedHTMLCallbacks ?? _fallbackState.serverInsertedHTMLCallbacks ?? []
      });
      _fallbackState.serverContext = ctx;
      return;
    }
    const state = _als.getStore();
    if (state) {
      state.serverContext = null;
    }
    _fallbackState.serverContext = null;
  }
});
async function reportRequestError(error, request, context) {
  return;
}
function escapeCSSString(value) {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\a ").replace(/\r/g, "\\d ");
}
function sanitizeCSSVarName(name) {
  if (/^--[a-zA-Z0-9_-]+$/.test(name))
    return name;
  return void 0;
}
function sanitizeFallback(name) {
  const generics = /* @__PURE__ */ new Set([
    "serif",
    "sans-serif",
    "monospace",
    "cursive",
    "fantasy",
    "system-ui",
    "ui-serif",
    "ui-sans-serif",
    "ui-monospace",
    "ui-rounded",
    "emoji",
    "math",
    "fangsong"
  ]);
  const trimmed = name.trim();
  if (generics.has(trimmed))
    return trimmed;
  return `'${escapeCSSString(trimmed)}'`;
}
let classCounter = 0;
const injectedFonts = /* @__PURE__ */ new Set();
function toVarName(family) {
  return "--font-" + family.toLowerCase().replace(/\s+/g, "-");
}
function buildGoogleFontsUrl(family, options) {
  const params = new URLSearchParams();
  let spec = family;
  const weights = options.weight ? Array.isArray(options.weight) ? options.weight : [options.weight] : [];
  const styles = options.style ? Array.isArray(options.style) ? options.style : [options.style] : [];
  if (weights.length > 0 || styles.length > 0) {
    const hasItalic = styles.includes("italic");
    if (weights.length > 0) {
      if (hasItalic) {
        const pairs = [];
        for (const w of weights) {
          pairs.push(`0,${w}`);
          pairs.push(`1,${w}`);
        }
        spec += `:ital,wght@${pairs.join(";")}`;
      } else {
        spec += `:wght@${weights.join(";")}`;
      }
    }
  } else {
    spec += `:wght@100..900`;
  }
  params.set("family", spec);
  params.set("display", options.display ?? "swap");
  return `https://fonts.googleapis.com/css2?${params.toString()}`;
}
function injectFontStylesheet(url) {
  if (injectedFonts.has(url))
    return;
  injectedFonts.add(url);
  if (typeof document !== "undefined") {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }
}
const injectedClassRules = /* @__PURE__ */ new Set();
function injectClassNameRule(className, fontFamily) {
  if (injectedClassRules.has(className))
    return;
  injectedClassRules.add(className);
  const css = `.${className} { font-family: ${fontFamily}; }
`;
  if (typeof document === "undefined") {
    ssrFontStyles$1.push(css);
    return;
  }
  const style = document.createElement("style");
  style.textContent = css;
  style.setAttribute("data-vinext-font-class", className);
  document.head.appendChild(style);
}
const injectedVariableRules = /* @__PURE__ */ new Set();
const injectedRootVariables = /* @__PURE__ */ new Set();
function injectVariableClassRule(variableClassName, cssVarName, fontFamily) {
  if (injectedVariableRules.has(variableClassName))
    return;
  injectedVariableRules.add(variableClassName);
  let css = `.${variableClassName} { ${cssVarName}: ${fontFamily}; }
`;
  if (!injectedRootVariables.has(cssVarName)) {
    injectedRootVariables.add(cssVarName);
    css += `:root { ${cssVarName}: ${fontFamily}; }
`;
  }
  if (typeof document === "undefined") {
    ssrFontStyles$1.push(css);
    return;
  }
  const style = document.createElement("style");
  style.textContent = css;
  style.setAttribute("data-vinext-font-variable", variableClassName);
  document.head.appendChild(style);
}
const ssrFontStyles$1 = [];
function getSSRFontStyles$1() {
  return [...ssrFontStyles$1];
}
const ssrFontUrls = [];
function getSSRFontLinks() {
  return [...ssrFontUrls];
}
const ssrFontPreloads$1 = [];
const ssrFontPreloadHrefs = /* @__PURE__ */ new Set();
function getSSRFontPreloads$1() {
  return [...ssrFontPreloads$1];
}
function getFontMimeType(pathOrUrl) {
  if (pathOrUrl.endsWith(".woff2"))
    return "font/woff2";
  if (pathOrUrl.endsWith(".woff"))
    return "font/woff";
  if (pathOrUrl.endsWith(".ttf"))
    return "font/ttf";
  if (pathOrUrl.endsWith(".otf"))
    return "font/opentype";
  return "font/woff2";
}
function extractFontUrlsFromCSS(css) {
  const urls = [];
  const urlRegex = /url\(['"]?([^'")]+)['"]?\)/g;
  let match;
  while ((match = urlRegex.exec(css)) !== null) {
    const url = match[1];
    if (url && url.startsWith("/")) {
      urls.push(url);
    }
  }
  return urls;
}
function collectFontPreloadsFromCSS(css) {
  if (typeof document !== "undefined")
    return;
  const urls = extractFontUrlsFromCSS(css);
  for (const href of urls) {
    if (!ssrFontPreloadHrefs.has(href)) {
      ssrFontPreloadHrefs.add(href);
      ssrFontPreloads$1.push({ href, type: getFontMimeType(href) });
    }
  }
}
const injectedSelfHosted = /* @__PURE__ */ new Set();
function injectSelfHostedCSS(css) {
  if (injectedSelfHosted.has(css))
    return;
  injectedSelfHosted.add(css);
  collectFontPreloadsFromCSS(css);
  if (typeof document === "undefined") {
    ssrFontStyles$1.push(css);
    return;
  }
  const style = document.createElement("style");
  style.textContent = css;
  style.setAttribute("data-vinext-font-selfhosted", "true");
  document.head.appendChild(style);
}
function createFontLoader(family) {
  return function fontLoader(options = {}) {
    const id = classCounter++;
    const className = `__font_${family.toLowerCase().replace(/\s+/g, "_")}_${id}`;
    const fallback = options.fallback ?? ["sans-serif"];
    const fontFamily = `'${escapeCSSString(family)}', ${fallback.map(sanitizeFallback).join(", ")}`;
    const defaultVarName = toVarName(family);
    const cssVarName = options.variable ? sanitizeCSSVarName(options.variable) ?? defaultVarName : defaultVarName;
    const variableClassName = `__variable_${family.toLowerCase().replace(/\s+/g, "_")}_${id}`;
    if (options._selfHostedCSS) {
      injectSelfHostedCSS(options._selfHostedCSS);
    } else {
      const url = buildGoogleFontsUrl(family, options);
      injectFontStylesheet(url);
      if (typeof document === "undefined") {
        if (!ssrFontUrls.includes(url)) {
          ssrFontUrls.push(url);
        }
      }
    }
    injectClassNameRule(className, fontFamily);
    injectVariableClassRule(variableClassName, cssVarName, fontFamily);
    return {
      className,
      style: { fontFamily },
      variable: variableClassName
    };
  };
}
const googleFonts = new Proxy({}, {
  get(_target, prop) {
    if (prop === "__esModule")
      return true;
    if (prop === "default")
      return googleFonts;
    const family = prop.replace(/([a-z])([A-Z])/g, "$1 $2");
    return createFontLoader(family);
  }
});
const Geist = createFontLoader("Geist");
const Geist_Mono = createFontLoader("Geist Mono");
const ssrFontStyles = [];
const ssrFontPreloads = [];
function getSSRFontStyles() {
  return [...ssrFontStyles];
}
function getSSRFontPreloads() {
  return [...ssrFontPreloads];
}
var nestedKeys = /* @__PURE__ */ new Set(["style"]);
var isNewReact = "use" in React;
var fixedMap = {
  srcset: "srcSet",
  fetchpriority: isNewReact ? "fetchPriority" : "fetchpriority"
};
var camelize = (key) => {
  if (key.startsWith("data-") || key.startsWith("aria-")) {
    return key;
  }
  return fixedMap[key] || key.replace(/-./g, (suffix) => suffix[1].toUpperCase());
};
function camelizeProps(props) {
  return Object.fromEntries(
    Object.entries(props).map(([k, v]) => [
      camelize(k),
      nestedKeys.has(k) && v && typeof v !== "string" ? camelizeProps(v) : v
    ])
  );
}
var Image$1 = react_reactServerExports.forwardRef(
  function Image2(props, ref) {
    const camelizedProps = camelizeProps(
      transformProps(props)
    );
    return /* @__PURE__ */ jsxRuntime_reactServerExports.jsx("img", { ...camelizedProps, ref });
  }
);
react_reactServerExports.forwardRef(
  function Source2(props, ref) {
    const camelizedProps = camelizeProps(
      transformSourceProps(
        props
      )
    );
    return /* @__PURE__ */ jsxRuntime_reactServerExports.jsx("source", { ...camelizedProps, ref });
  }
);
function globToRegex(pattern, separator) {
  let regexStr = "^";
  const doubleStar = separator === "." ? ".+" : ".*";
  const singleStar = separator === "." ? "[^.]+" : "[^/]+";
  const parts = pattern.split("**");
  for (let i = 0; i < parts.length; i++) {
    if (i > 0) {
      regexStr += doubleStar;
    }
    const subParts = parts[i].split("*");
    for (let j = 0; j < subParts.length; j++) {
      if (j > 0) {
        regexStr += singleStar;
      }
      regexStr += subParts[j].replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    }
  }
  regexStr += "$";
  return new RegExp(regexStr);
}
function matchRemotePattern(pattern, url) {
  if (pattern.protocol !== void 0) {
    if (pattern.protocol.replace(/:$/, "") !== url.protocol.replace(/:$/, "")) {
      return false;
    }
  }
  if (pattern.port !== void 0) {
    if (pattern.port !== url.port) {
      return false;
    }
  }
  if (!globToRegex(pattern.hostname, ".").test(url.hostname)) {
    return false;
  }
  if (pattern.search !== void 0) {
    if (pattern.search !== url.search) {
      return false;
    }
  }
  const pathnamePattern = pattern.pathname ?? "**";
  if (!globToRegex(pathnamePattern, "/").test(url.pathname)) {
    return false;
  }
  return true;
}
function hasRemoteMatch(domains, remotePatterns, url) {
  return domains.some((domain) => url.hostname === domain) || remotePatterns.some((p) => matchRemotePattern(p, url));
}
const __imageRemotePatterns = (() => {
  try {
    return JSON.parse("[]");
  } catch {
    return [];
  }
})();
const __imageDomains = (() => {
  try {
    return JSON.parse("[]");
  } catch {
    return [];
  }
})();
const __hasImageConfig = __imageRemotePatterns.length > 0 || __imageDomains.length > 0;
const __isDev = process.env.NODE_ENV !== "production";
function validateRemoteUrl(src) {
  if (!__hasImageConfig) {
    return { allowed: true };
  }
  let url;
  try {
    url = new URL(src, "http://n");
  } catch {
    return { allowed: false, reason: `Invalid URL: ${src}` };
  }
  if (hasRemoteMatch(__imageDomains, __imageRemotePatterns, url)) {
    return { allowed: true };
  }
  return {
    allowed: false,
    reason: `Image URL "${src}" is not configured in images.remotePatterns or images.domains in next.config.js. See: https://nextjs.org/docs/messages/next-image-unconfigured-host`
  };
}
function sanitizeBlurDataURL(url) {
  if (!url.startsWith("data:image/"))
    return void 0;
  if (/[)(}{\\'"\n\r]/.test(url))
    return void 0;
  return url;
}
function isRemoteUrl(src) {
  return src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//");
}
const RESPONSIVE_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
function imageOptimizationUrl(src, width, quality = 75) {
  return `/_vinext/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}
function generateSrcSet(src, originalWidth, quality = 75) {
  const widths = RESPONSIVE_WIDTHS.filter((w) => w <= originalWidth * 2);
  if (widths.length === 0)
    return `${imageOptimizationUrl(src, originalWidth, quality)} ${originalWidth}w`;
  return widths.map((w) => `${imageOptimizationUrl(src, w, quality)} ${w}w`).join(", ");
}
const Image = react_reactServerExports.forwardRef(function Image22({ src: srcProp, alt, width, height, fill, priority, quality, placeholder, blurDataURL, loader, sizes, className, style, unoptimized: _unoptimized, overrideSrc: _overrideSrc, loading, ...rest }, ref) {
  const src = typeof srcProp === "string" ? srcProp : srcProp.src;
  const imgWidth = width ?? (typeof srcProp === "object" ? srcProp.width : void 0);
  const imgHeight = height ?? (typeof srcProp === "object" ? srcProp.height : void 0);
  const imgBlurDataURL = blurDataURL ?? (typeof srcProp === "object" ? srcProp.blurDataURL : void 0);
  if (loader) {
    const resolvedSrc = loader({ src, width: imgWidth ?? 0, quality: quality ?? 75 });
    return jsxRuntime_reactServerExports.jsx("img", { ref, src: resolvedSrc, alt, width: fill ? void 0 : imgWidth, height: fill ? void 0 : imgHeight, loading: priority ? "eager" : loading ?? "lazy", decoding: "async", sizes, className, style: fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style } : style, ...rest });
  }
  if (isRemoteUrl(src)) {
    const validation = validateRemoteUrl(src);
    if (!validation.allowed) {
      if (__isDev) {
        console.warn(`[next/image] ${validation.reason}`);
      } else {
        console.error(`[next/image] ${validation.reason}`);
        return null;
      }
    }
    const sanitizedBlur = imgBlurDataURL ? sanitizeBlurDataURL(imgBlurDataURL) : void 0;
    const bg = placeholder === "blur" && sanitizedBlur ? `url(${sanitizedBlur})` : void 0;
    if (fill) {
      return jsxRuntime_reactServerExports.jsx(Image$1, { src, alt, layout: "fullWidth", priority, sizes, className, background: bg });
    }
    if (imgWidth && imgHeight) {
      return jsxRuntime_reactServerExports.jsx(Image$1, { src, alt, width: imgWidth, height: imgHeight, layout: "constrained", priority, sizes, className, background: bg });
    }
  }
  const imgQuality = quality ?? 75;
  const skipOptimization = _unoptimized === true;
  const srcSet = imgWidth && !fill && !skipOptimization ? generateSrcSet(src, imgWidth, imgQuality) : imgWidth && !fill ? RESPONSIVE_WIDTHS.filter((w) => w <= imgWidth * 2).map((w) => `${src} ${w}w`).join(", ") || `${src} ${imgWidth}w` : void 0;
  const optimizedSrc = skipOptimization ? src : imgWidth ? imageOptimizationUrl(src, imgWidth, imgQuality) : imageOptimizationUrl(src, RESPONSIVE_WIDTHS[0], imgQuality);
  const sanitizedLocalBlur = imgBlurDataURL ? sanitizeBlurDataURL(imgBlurDataURL) : void 0;
  const blurStyle = placeholder === "blur" && sanitizedLocalBlur ? {
    backgroundImage: `url(${sanitizedLocalBlur})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  } : void 0;
  return jsxRuntime_reactServerExports.jsx("img", { ref, src: optimizedSrc, alt, width: fill ? void 0 : imgWidth, height: fill ? void 0 : imgHeight, loading: priority ? "eager" : loading ?? "lazy", fetchPriority: priority ? "high" : void 0, decoding: "async", srcSet, sizes: sizes ?? (fill ? "100vw" : void 0), className, "data-nimg": fill ? "fill" : "1", style: fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...blurStyle, ...style } : { ...blurStyle, ...style }, ...rest });
});
function Home() {
  return /* @__PURE__ */ jsxRuntime_reactServerExports.jsx("div", { className: "flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black", children: /* @__PURE__ */ jsxRuntime_reactServerExports.jsxs("main", { className: "flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start", children: [
    /* @__PURE__ */ jsxRuntime_reactServerExports.jsx(
      Image,
      {
        className: "dark:invert",
        src: "/next.svg",
        alt: "Next.js logo",
        width: 100,
        height: 20,
        priority: true
      }
    ),
    /* @__PURE__ */ jsxRuntime_reactServerExports.jsxs("div", { className: "flex flex-col items-center gap-6 text-center sm:items-start sm:text-left", children: [
      /* @__PURE__ */ jsxRuntime_reactServerExports.jsx("h1", { className: "max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50", children: "To get started, edit the page.tsx file." }),
      /* @__PURE__ */ jsxRuntime_reactServerExports.jsxs("p", { className: "max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400", children: [
        "Looking for a starting point or more instructions? Head over to",
        " ",
        /* @__PURE__ */ jsxRuntime_reactServerExports.jsx(
          "a",
          {
            href: "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
            className: "font-medium text-zinc-950 dark:text-zinc-50",
            children: "Templates"
          }
        ),
        " ",
        "or the",
        " ",
        /* @__PURE__ */ jsxRuntime_reactServerExports.jsx(
          "a",
          {
            href: "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
            className: "font-medium text-zinc-950 dark:text-zinc-50",
            children: "Learning"
          }
        ),
        " ",
        "center."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime_reactServerExports.jsxs("div", { className: "flex flex-col gap-4 text-base font-medium sm:flex-row", children: [
      /* @__PURE__ */ jsxRuntime_reactServerExports.jsxs(
        "a",
        {
          className: "flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]",
          href: "https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
          target: "_blank",
          rel: "noopener noreferrer",
          children: [
            /* @__PURE__ */ jsxRuntime_reactServerExports.jsx(
              Image,
              {
                className: "dark:invert",
                src: "/vercel.svg",
                alt: "Vercel logomark",
                width: 16,
                height: 16
              }
            ),
            "Deploy Now"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime_reactServerExports.jsx(
        "a",
        {
          className: "flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]",
          href: "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "Documentation"
        }
      )
    ] })
  ] }) });
}
const mod_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
const RemoveDuplicateServerCss = void 0;
const Resources = /* @__PURE__ */ ((React2, deps, RemoveDuplicateServerCss2, precedence) => {
  return function Resources2() {
    return React2.createElement(React2.Fragment, null, [...deps.css.map((href) => React2.createElement("link", {
      key: "css:" + href,
      rel: "stylesheet",
      ...{ precedence },
      href,
      "data-rsc-css-href": href
    })), RemoveDuplicateServerCss2]);
  };
})(
  __vite_rsc_react__,
  assetsManifest.serverResources["app/layout.tsx"],
  RemoveDuplicateServerCss,
  "vite-rsc/importer-resources"
);
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});
let metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};
function RootLayout({
  children
}) {
  return /* @__PURE__ */ jsxRuntime_reactServerExports.jsx(
    "html",
    {
      lang: "en",
      className: `${geistSans.variable} ${geistMono.variable} h-full antialiased`,
      children: /* @__PURE__ */ jsxRuntime_reactServerExports.jsx("body", { className: "min-h-full flex flex-col", children })
    }
  );
}
const $$wrap_RootLayout = /* @__PURE__ */ __vite_rsc_wrap_css__(RootLayout, "default");
function __vite_rsc_wrap_css__(value, name) {
  if (typeof value !== "function") return value;
  function __wrapper(props) {
    return __vite_rsc_react__.createElement(
      __vite_rsc_react__.Fragment,
      null,
      __vite_rsc_react__.createElement(Resources),
      __vite_rsc_react__.createElement(value, props)
    );
  }
  Object.defineProperty(__wrapper, "name", { value: name });
  return __wrapper;
}
const mod_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$wrap_RootLayout,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
function _getSSRFontStyles() {
  return [...getSSRFontStyles$1(), ...getSSRFontStyles()];
}
function _getSSRFontPreloads() {
  return [...getSSRFontPreloads$1(), ...getSSRFontPreloads()];
}
function setNavigationContext(ctx) {
  setNavigationContext$1(ctx);
}
function rscOnError(error) {
  if (error && typeof error === "object" && "digest" in error) {
    return String(error.digest);
  }
  return void 0;
}
const routes = [
  {
    pattern: "/",
    isDynamic: false,
    params: [],
    page: mod_0,
    routeHandler: null,
    layouts: [mod_1],
    layoutSegmentDepths: [0],
    templates: [],
    errors: [null],
    slots: {},
    loading: null,
    error: null,
    notFound: null,
    notFounds: [null],
    forbidden: null,
    unauthorized: null
  }
];
const metadataRoutes = [
  {
    type: "favicon",
    isDynamic: false,
    servedUrl: "/favicon.ico",
    contentType: "image/x-icon",
    fileDataBase64: "AAABAAQAEBAAAAEAIAAoBQAARgAAACAgAAABACAAKBQAAG4FAAAwMAAAAQAgACgtAACWGQAAAAAAAAEAIACNHgAAvkYAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAABdAAAAugAAALoAAABdAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAKAAAADyAAAA/wAAAP8AAAD/AAAA/wAAAPIAAACgAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAOAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAOAAAAA4AAAAAAAAAAAAAAAAAAAAHwAAAOIAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA4gAAAB8AAAAAAAAAAAAAAKEAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAChAAAAAAAAACMAAAD0AAAA/wAAAP9PT0//rq6u/6urq/+rq6v/q6ur/6urq/+tra3/Z2dn/wAAAP8AAAD/AAAA9AAAACMAAABZAAAA/wAAAP8AAAD/Hx8f/+3t7f///////////////////////f39/zU1Nf8AAAD/AAAA/wAAAP8AAABZAAAAuwAAAP8AAAD/AAAA/wAAAP9ra2v//////////////////////46Ojv8AAAD/AAAA/wAAAP8AAAD/AAAAuwAAALsAAAD/AAAA/wAAAP8AAAD/CQkJ/83Nzf///////////+Tk5P8YGBj/AAAA/wAAAP8AAAD/AAAA/wAAALsAAABZAAAA/wAAAP8AAAD/AAAA/wAAAP9KSkr//f39//////9ra2v/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAABZAAAAIwAAAPQAAAD/AAAA/wAAAP8AAAD/AQEB/7a2tv/V1dX/CQkJ/wAAAP8AAAD/AAAA/wAAAP8AAAD0AAAAIwAAAAAAAAChAAAA/wAAAP8AAAD/AAAA/wAAAP8xMTH/RERE/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAoQAAAAAAAAAAAAAAHwAAAOIAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA4gAAAB8AAAAAAAAAAAAAAAAAAAA4AAAA4AAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA4AAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAACgAAAA8gAAAP8AAAD/AAAA/wAAAP8AAADyAAAAoAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAABdAAAAugAAALoAAABdAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAsAAAAVQAAAIEAAADoAAAA6AAAAIEAAABVAAAALAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoAAACFAAAA0gAAAPkAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD5AAAA0gAAAIUAAAAqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAACWAAAA8wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPMAAACWAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABRAAAA4QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADhAAAAUQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcgAAAPsAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD7AAAAcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHIAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPAAAA+wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD7AAAATwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGwAAAOQAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADjAAAAGwAAAAAAAAAAAAAAAAAAAAAAAACXAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAACXAAAAAAAAAAAAAAAAAAAAKAAAAPUAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPQAAAAnAAAAAAAAAAAAAACGAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/ODg4/4uLi/+IiIj/iIiI/4iIiP+IiIj/iIiI/4iIiP+IiIj/iIiI/4iIiP+IiIj/iIiI/4iIiP+JiYn/X19f/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAIYAAAAAAAAABwAAANQAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8eHh7/7u7u//////////////////////////////////////////////////////////////////////9TU1P/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA1AAAAAcAAAArAAAA+gAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP9oaGj/////////////////////////////////////////////////////////////////rq6u/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD6AAAAKwAAAFQAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wgICP/Ly8v///////////////////////////////////////////////////////T09P8sLCz/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAABUAAAAggAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0dHR//9/f3/////////////////////////////////////////////////jY2N/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAIEAAADpAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/62trf///////////////////////////////////////////+Tk5P8XFxf/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA6QAAAOkAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/Kysr//Pz8///////////////////////////////////////ampq/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADpAAAAgQAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/i4uL/////////////////////////////////8zMzP8ICAj/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAIIAAABUAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8WFhb/4+Pj///////////////////////9/f3/SUlJ/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAVAAAACsAAAD6AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP9oaGj//////////////////////6+vr/8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPoAAAArAAAABwAAANQAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wgICP/Ly8v////////////09PT/LCws/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA1AAAAAcAAAAAAAAAhgAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0dHR//9/f3//////42Njf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAACGAAAAAAAAAAAAAAAnAAAA9AAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/7Gxsf/s7Oz/FxcX/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA9QAAACgAAAAAAAAAAAAAAAAAAACXAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/MzMz/19fX/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAACXAAAAAAAAAAAAAAAAAAAAAAAAABoAAADjAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA5AAAABsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE8AAAD7AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPsAAABPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHIAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHIAAAD7AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA+wAAAHIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFEAAADhAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAOEAAABRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAACWAAAA8wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPMAAACWAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqAAAAhQAAANIAAAD5AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA+QAAANIAAACFAAAAKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAACwAAABVAAAAgQAAAOgAAADoAAAAgQAAAFUAAAAsAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAwAAAAYAAAAAEAIAAAAAAAAC0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJAAAAKAAAAEwAAABqAAAAswAAAPgAAAD3AAAAswAAAGoAAABLAAAAKAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAVgAAAKAAAADYAAAA+AAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA+AAAANgAAACgAAAAVQAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJQAAAIsAAADhAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAOEAAACLAAAAJgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYAAACLAAAA7wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA7wAAAIsAAAAWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUQAAANwAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADcAAAAUgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAACKAAAA/gAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/gAAAIoAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAK0AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAACtAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAuAAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAuAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAACuAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAK4AAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIoAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAACKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAP0AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD9AAAATwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVAAAA3wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA3wAAABUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACLAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAIsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACMAAADxAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPEAAAAjAAAAAAAAAAAAAAAAAAAAAAAAAIwAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAACLAAAAAAAAAAAAAAAAAAAAEQAAAOQAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8kJCT/aGho/2VlZf9lZWX/ZWVl/2VlZf9lZWX/ZWVl/2VlZf9lZWX/ZWVl/2VlZf9lZWX/ZWVl/2VlZf9lZWX/ZWVl/2VlZf9lZWX/ZWVl/2VlZf9lZWX/ZWVl/1BQUP8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADkAAAAEQAAAAAAAAAAAAAAVQAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8cHBz/6+vr/////////////////////////////////////////////////////////////////////////////////////////////////////////////////3Nzc/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAVQAAAAAAAAAAAAAAoQAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/ZWVl////////////////////////////////////////////////////////////////////////////////////////////////////////////zMzM/wgICP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAoQAAAAAAAAAJAAAA2gAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/BwcH/8nJyf/////////////////////////////////////////////////////////////////////////////////////////////////9/f3/SEhI/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA2gAAAAkAAAAoAAAA+QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0VFRf/8/Pz///////////////////////////////////////////////////////////////////////////////////////////+urq7/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA+AAAACgAAABLAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+qqqr///////////////////////////////////////////////////////////////////////////////////////T09P8sLCz/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAEwAAABqAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8pKSn/8vLy/////////////////////////////////////////////////////////////////////////////////4yMjP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAGoAAAC0AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/iIiI////////////////////////////////////////////////////////////////////////////4+Pj/xYWFv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAALMAAAD4AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/FBQU/+Hh4f//////////////////////////////////////////////////////////////////////aWlp/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPgAAAD4AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/2VlZf/////////////////////////////////////////////////////////////////Ly8v/CAgI/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPgAAACzAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wcHB//Jycn///////////////////////////////////////////////////////39/f9ISEj/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAALQAAABqAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP9FRUX//Pz8/////////////////////////////////////////////////66urv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAGoAAABMAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/qqqq////////////////////////////////////////////9PT0/ywsLP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAEsAAAAoAAAA+AAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/KSkp//Ly8v//////////////////////////////////////jIyM/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA+QAAACgAAAAJAAAA2gAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/4iIiP/////////////////////////////////j4+P/FhYW/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA2gAAAAkAAAAAAAAAoQAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/xQUFP/h4eH///////////////////////////9paWn/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAoQAAAAAAAAAAAAAAVQAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP9lZWX//////////////////////8zMzP8ICAj/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAVQAAAAAAAAAAAAAAEQAAAOQAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/ycnJ/////////////f39/0hISP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADkAAAAEQAAAAAAAAAAAAAAAAAAAIsAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/RUVF//z8/P//////rq6u/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAACMAAAAAAAAAAAAAAAAAAAAAAAAACMAAADxAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/6ysrP/7+/v/LCws/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPEAAAAjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACLAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/zIyMv99fX3/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAIsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVAAAA3wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA3wAAABUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATwAAAP0AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD9AAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIoAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAACKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAACuAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAK4AAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAuAAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAuAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAK0AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAACtAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAACKAAAA/gAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/gAAAIoAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUgAAANwAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADcAAAAUQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYAAACLAAAA7wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA7wAAAIsAAAAWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJgAAAIsAAADhAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAOEAAACLAAAAJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAVQAAAKAAAADYAAAA+AAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA+AAAANgAAACgAAAAVgAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJAAAAKAAAAEsAAABqAAAAswAAAPcAAAD4AAAAswAAAGoAAABMAAAAKAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACJUE5HDQoaCgAAAA1JSERSAAABAAAAAQAIBgAAAFxyqGYAAAABc1JHQgCuzhzpAAAAOGVYSWZNTQAqAAAACAABh2kABAAAAAEAAAAaAAAAAAACoAIABAAAAAEAAAEAoAMABAAAAAEAAAEAAAAAAEQiOHMAAB4DSURBVHgB7V0JsBXVmW6UXQg8FhFRVkGW6MRoJAnKToyOMTMqiHGwwmSqBsSNqUmhiAiYRJNMMpOqKM4UKNSYMtbEmdEYGUcJi8FxX0DlsYjghoobEngIyJvvu9CPvo97b/e9vZ3T/f1V33t9u0+f5Tvn//v0+c853cKRZIGBrihEZ6AT0BE4CegD9AROALoBXYDuQAugDmgDeKURP3YADcBO4DPgPWA78DbwLvAmsAvgdeIT4CAgsZQBNgaJHQxQganQvYDBQP/DoFLTAFD5aQRaA3HKXkRO4+AagHdwvA3YDLwB0FjQaNCYSAxnQAbAzAo6GdniE3wI8DVgIHAiQAPAJ7zJsgeZc3sN63D8KvAywN4DjYXEIAZkANKvjJbIAhV8KDAS+AowAOCTPkvyFgqzBXgeWAOsBzYBBwBJSgzIAKRDfD8kS0UfBwwHTgHYfc+TfIrC8rXhGeB/AfYWaCAkCTIgA5AM2Xwvp8KPAC4ATgN6AJIjDLyPw1eAZcAK4DWA4w2SGBmQAYiP3LaI+gzgO8B5AJW+FSDxZ+BzBKkHHgZoEF4AGgBJxAzIAERMKKI7E7gEOB+g0h8LSGpngGMEHEh8CHgQoDGgy1IiBoxhgO/004GVAEfB2UCF6DlgL2AlMAPoDUjEQGoM8L1+LLAIoNtLCp8sB3QpLgbOAehJkYiBRBjogVSmAk8C+wEpfrocsA5WA+yBdQUkYiAWBuiqmw3QVSWlN5ODjaib+QBfySRiIBIGOEHn18AHgBTfDg74SvYzYBggEQM1MTAEd1HxPwak+HZy8NHhOvwy/kvEQCAGpPh2KnslI+0agkGBWoAC5ZKBXij1zwE98bNnAFzjwFeD2wGNEYAEySEGOuDfLGAb4DYU/c82FzQEM4E6QJJjBi5G2Z8DpPD55IB1PxHQPAKQkCfhFN0HgIOAlF8c3I92cDogyTgDHVG+mwEOCknxxYG3DXB7M87z0GsBSMiijEehngK8la5j8dG8DTyNNjImiwqQ1zJ1Q8H/BeDa8uaVrd/ipFQb+DPaCr0F6g2ABJuFO+68CJSqZJ0TL35tgL0BLviSWMZAe+R3LrAb8KtkXRdHldoAewNsS9zgRWIBA5z//ShQqVJ1TfxU2wYeQ5vS2gLDDcBk5O9dKb+MX0xt4D3E+z1AYhgDnM33S4DbR1Vr2RVenFXTBtjG2Nb4mikxgIEByAO7Z9VUosKKr7BtYDnaXH8D2n+us8BR/s1A2MrU/eKwljbwOtqe1V4Cm3esnQby7wG4RZdEDKTBAOcJ/DWwE+C6AuvERgPQBizfBtwK8FgiBtJkgG3wPIBuQn7y7AtAEhMDtLj3ArV013SPeIu7Dfw72mbePvEWk6ofHe1JOLUCiLsSFb84DtMGuEMx26okQga4lROnZYapGN0r/pJqA2yr3EVaEgEDwxHHJiCpylM64jqKNrABbfbrEbT/XEcxGqXnF2CiqBDFIR6TbgNsu2zDxorJXoBRYO23QE9j2VPGxEBlBrgBzbcBugi556RxYqoBcJX/BOMYU4bEQHUMcJq6sUbARANA5b8P0JO/uoam0OYyQCPAuQLG9QRMMwCjQZKUHyRIMscAXwdoBJ4HtgJGSAsjcnEoExzt/0/gRIPypKyIgagZ4HJ1bkdPV2HqYooBGAAmlgEDU2dEGRAD8TPARUTnA3RvpyrHpJr6ocQ5a4rdfim/AZWhLCTCAB94vwFSnzGYdg/gSyDhD8A5gEQM5I2BVSjwdwGuJkxF0hwE5Oqpu4ALUym5EhUD6TPQF1k4GXgEOAAkLmkagAUo7YzES6wExYBZDJyO7PBhyF2tEpe0DMA0lPTHgAljEImTrgTFQDMGuGbgA4DzBBKVNMYAxqKE/w3QLyoRA2LgEAP8/gDHA/6YJCFJG4B+hwvYN8lCKi0xYAkDbyCfEwC6CRORJLvgx6FEi4G+iZRMiYgB+xjgA/LfAOpKIpLkGMBPUaLLEymVEhED9jJAI9AOeDSJIiRlAKj4twNJ9jiS4E9piIE4GPgaIt0AvBpH5N44W3h/xHQ8FPEuB7S0NyaCFW0mGdiOUo0HXouzdHH3ANiV4S6+p8VZCMUtBjLIAL1kpwIPAPvjKl/cBuAmZHxqXJlXvGIg4wz0R/n2AaviKmecrwCjkemHgcRGNOMiSfGKgRQZ2IO0LwBiMQJxGYBOyPDjwFmARAyIgXAMvIzbOYHu43DRHH13XK8A85HUpKOT0xkxIAZqYIAD6BxP+58a7q14Sxw9gNFI8fcA90GTiAExEA0DnyMavgpEOlU4agPA9f10+anrDxIkYiBiBp5BfHwV2B1VvFG/AvwDMjYlqswpHjEgBooY6IVfDcDqorMhfkTZA+C65pUAv+ArEQNiIB4GPkG03Dp/XRTRHxNFJIijNTAXkPJHRGhS0XTo0MHp3bt3UskpnfAMUMcWAJHobiSRIDPc1usSQGIZA1OnTnWWLFnitGrVyrKc5zq7F6H03DvACOHA3/NAo2AXB8cff3zjli1bGimTJ09W/dnVhqlzRnjarpPi26X4bn3NmzevoPz8s379+sa6ujoZAbuMwA9Rl6lKX6TOVUtqOJZxMHjw4MYdO3Y0GQAezJ49W/VoVz2+Cd3rCaQmtyFlNRrLOGjRokXj3XffXaT8/PHhhx829u/fX/VpV33+U1raPwgJvy8DYJ8BHDt2bOO+ffuOMgA8sWjRIhkAuwzAp9BB7rmRuNyBFNVYLOOgbdu2jStWrCip/Dy5d+/exhEjRqhe7arXO5PW/mFI8GMZAPsM4JQpU8oqv3th+fLljXALygjYYwQ4OSjRXoCe/vY0jiZFpttvw4YNrp5X/C+3oHXGPbFegJ7+Fio/e2tet19F7cfF+vp6uQXtqmf2AoYAVUkti4HoexxXVSoKnDoDcPs5CxcudNq3bx8oL926dXM+++wz54knnggUXoFSZ4DfF+TankfizElfRK6Rf7ueDI3l3H5+vQC5Ba17DfgI+tk/TgMwH5E3vVPq2A4uxo0b17h//34/fS95XW5BO+rYo4uz4zIAXRDxRk9CMgQWGEM/t19JrfeclFvQOgOwBTraPQ4jwE96S+kt4yCI28+j7yUP5Ra0rt1/P2oD0AYR/kkGwK6GUI3br6Tme07KLWhV3f8fdJU6G5mcg5j4gQL1ACzioBq3n0fXSx7KLWhV2+cGomODaH9QNyAH/84MEqHCmMFAtW4/v1zTLbhr1y65Bf2IMuM69fog8GAU2eFGhNsBPf0t4aBWt1/JR7/npNyCVukA3fV9ojAAV0n5rar4Rrr9yq328+hzTYdyC1rVFjhwH0q4UdwqQE9/SzgI6/bzswpyC1qlC9TdlmEsAN/7d8sA2FPpV155pZ8Oh74ut6A17WEPdDfU2N2PpPzWVHYj3X4bN24MreBBIrj88svVK7SjV/gT6HBNwsUFLwGqaEs4iNLt52cE5Ba0Ri9ehA63q8UCjMBNe2UA7KjoUpt8+ilx2Os33XSTHg7mPxw4J+AbtRiAH0v57VB+uv3uueeesPpc9f1yC9rRPqDHt1VrANhlUPfffOteeALH6fbzswqLFy9WL8D8dvIC9Jmv9IHlDITkCKIq13AO4nb7+RkAuQWt0BG+yp9dSvvLfRuQ84hrGjgolYjOxcfAxIkTndGjR8eXgE/Mbdq0cRYsWKBvC/rwlPJlLgzimF4goVF4HNDT33AOknT7+fUE5BY0Xl8eg06Xe+AXGYa++MV5xDIAhnOQpNvPzwDQLdi5c2e1GXPbzAfQaep2kZRaDTgKIX5QFEo/jGOAq/3uuuuuwJt8xl0ArhbcvXu3s3r16riTUvy1MXAcbuPU4Hrv7aW6BBO8AXRsHgNw+zmzZs1yunbtalTmrr/+egffFjQqT8pMEQPji36V+NEa554D1JUzmIM03X5+rwJyCxqtO9Rt6nhZGYwr/MCADIChHKTt9vMzAHILGq071G3qeJM0fwXg98U6N13VgXEMTJo0KVW3nx8hcgv6MZTqdeo2v+zVJM0NwDebrujAOAa6d+/uzJkzx7h8Nc8QPj/uXHrppc1P67cZDJzrzYbXAPD4LO9FHZvFwIwZM5yBAwealakyubnlllucurq6Mld1OkUGvoK0m7x/XgNwAi4MSDFjSroCA3T7XX311RVCmHXp1FNPda66irvJSQxjgE+QnqXyxCWDBwANABrGQVqr/fwG/Pyua7WgkbpEHT/HNQDeHkBR18ANoP/pM8B36iuuuCL9jFSZA85TwJ4BVd6l4DEzwO4/B/sL4jUATSfdi/qfPgNw+xUG/lq1apV+ZmrIAQ3XiBGB16HUkIJuqYGBprE+1wDw/2k1RKRbYmYg7dV+YYsnt2BYBmO5n+MALbwx82uimwG9/xvEgUmr/fze9/2ua7WgUbrFr3zza99NywPpASg5MshAknQYsMnt58cQ3YJYLegXTNeTYYD6TjQZgJNx3J4nJGYwQLcfDUBWhG5Bm9yYWeG9TDk64nwvXnPHAPqXCajTKTBg6mq/sFRcd911Wi0YlsTo7h/CqFwDoAlA0REbOqaxY+10+/kVnHsGyC3ox1Ji1/sxJdcA9EksWSVUkQHb3X4VC4eLcgv6MZTY9cJDnwaAHw8svA8klrQSKsuA6av9ymY84AW5BQMSFX8wev6OpQHoBGjVRvyE+6YAt58Vq/18C+ITgK84Wi3oQ1L8l7mdVGfXANAISFJmgItnbFntF5aquXPnyi0YlsRw99MnKwMQjsPo7rZttV/YkmfNzRmWjxTu50O/E3sA9AnywwGSlBjIqtvPj86ZM2fKLehHUnzXuTdgRxqA3vGloZiDMJBVt59f2bVa0I+h2K+fRAOgKcCx81w+gay7/cqX/NAVuQX9GIr1eh8aAE4DlqTEQNbdfn60yi3ox1Cs13tyc4C/BbQXQKw8l46cm3wuXbrUuA98lM5tfGf79evnrF+/3nnllVfiS0Qxl2LgTb0ClKIloXNcHJMXt58fpXIL+jEUy/Vu7AFcCxSWBsaShCItyQDdYAsXLjTm234lM5ngSX1bMEGyjyS1kz0ALdI+QkgiR67bj41ecoQBrRY8wkVCR91pANollJiSOcxAXt1+fg1AqwX9GIr8+jHcF+wLgIZAkgADdPstW7bM6M97JUBD2STwbUFn/Pjxzpo1a8qG0YXIGPicii/lj4xP/4hs3+TTv4ThQtBALliwwLF1F+RwpU/87jYcBJyXeLI5TVBuv2AV37dvX6e+vl5uwWB0hQqlp38o+qq7mYNccvv5c8ZB0nnz5unbgv5UhQ6hHkBoCoNFMGzYMOfOO+902rXTmGsQxrhOoKGhwVm1alWQ4ApTIwPsAXxe4726LSADfKLdcMMNTpcuha3YA96lYNdee616TPE2g4M0AJ/Em4Zi56j2ZZddJiKqZIAGc86cOVXepeBVMPAhDcDBKm5Q0CoZYJf/5ptv1qh2lby5wWk4R40a5f7U/2gZaKAB2BFtnIrNy8DkyZOdc88913tKx1UwwNWC8+fPd1q35v4VkogZ+JSDgOyb9o04YkUHBnr06OEsWbJE7/4hW0OfPn2cjRs3OmvXrg0Zk25vxsBm9gA+anZSPyNigINYAwYMiCi2/EbDQVS+RtXVafPqiFvBe+wBsH96dsQR5z66oUOHyu0XYSuQWzBCMo9EtZw9gO1HfusoCgb4xLrxxhvV9Y+CTE8c11xzjdyCHj4iOHyLBmBbBBEpCg8DEyZMcDj4J4mWAfYC5BaMlNPtNABvRxplziOj248fwGzZkl9ck0TNgNyCkTJa2BJsF6LcF2m0OY6MDXTkyJE5ZiDeosstGBm/nAG8iz2AnYcRWcx5jYhuP3VR4699GljNrAzNc0HvaQA+PYzQMeY9Ag5Sye0XfyvgICsNrdyCobguMgCaCxCKS+yrDrff9OnTQ8ai24MyMGjQIIfLqyU1M8A1QIVNQbklmKYD18yj48jtF4K8ELdqW/UQ5DnOO7j7AF8BKK8f+qe/tTDA1X5y+9XCXLh79G3BUPwV3P+uAXgjVFQ5vpluP76Pyu2XTiOg4ZXXpSbuCw991wCsrykK3VQYjVYDTK8huN8W1GrBqutgC+9wDQDfBzgfQFIFA3L7VUFWjEHlFqya3D244y3e5RqA93BMSKpgQG6/KsiKMajcglWTy/U/BX13DQBdAuwFSAIyQLfftGnTAoZWsLgZoFuQy68lgRjg9P+C6981AI04sSnQrQpUYICbfHIUWmIOA1otGLgu1iFkYStA1wDwzucC357zgFrtZ2YDkFswcL285ob0GgCe5KQgSQUGtMlnBXIMuCS3oG8lUMdfckN5DcBWnHzfvaD/pRngIhRt8lmaGxPOyi3oWwscAGzaA8RrAHhB4wAV+JPbrwI5Bl2iW3DSpEkG5ciorHACUJPHz2sAiroGRmXZkMzI7WdIRfhkg25BbSJaliSO9TV9C4SbgnrlOPyQ6fQycvhYm3yWIMXgUxwQ3Lt3r7Ny5UqDc5lK1n6BVJtm/np7AMzNqwD3B5B4GNBqPw8ZFh1qteBRlUXdbvIA8GpzA8D5wXxHkHgY0Lf9PGRYdCi34FGVRd0urAFwrzQ3ANwb8Cn3ov47hc95c7Vfq1atRIeFDMgtWFRp1O2i/T+bGwCGfrzolpz/kNvP7gYgt2BR/T1W9As/mg8C8vpe4AqAA4K5Frr9li5dqg98WN4K9G3BQgV+gL8/AorG+Er1AN5EoJcLt+T8j9x+2WgAcgsW6pHz/6nbRVKqB8CFQd2A84pC5uwH3X533HGH0759+5yVPJvFlVvQuQM1+2Tz2i3VA2CYNQA/HJBLcd1+bDSS7DBAt+App5ySnQIFL0kDgq4oFbycAeCH2Iv8haVuzuo5uf2yWbM06JwhmEPZiDLXlyp3OQPAgcBHS92Q9XPuJp9y+2WzpnP66bY/oDbZCzhKyhkABnwIKPIZHnV3Bk/ktIFksCZLFymHbkG+yj9Smo3SbkA3LLcMugg4wT2R9f9y+2W9hg+Vj27BTZs2OWvX8k0388Lp/bcCB0qVtFIPgF2GZaVuyuo5uf2yWrPF5eIgLz/hnpNvCz6M0vOVvqSUcgN6A3LSwBQg8/Ng5fbzVnv2j7t16+Y0NDQ4q1atynJh96BwswDu9VFSWpQ8e+RkSxwuB0YeOZW9I35U4r777nMuvvji7BVOJSrLAA3A8OHDnXXrOEcmk7IapRoP7C9XOip4JeF7w31Apg0Au4JsBPX19U5jI+dBSfLAwLHHHpv1ad73ox7LKj/r2K8HwDB9gGeA4/lDIgbEgBUMcNuvs4CK3/uoNAjolpIbCNKPKBEDYsAeBjiAX1H5WZQgBoDh7gVyNyeABZeIAQsZYLf/7iD5DmoAuDbghSARKowYEAOpM8BX9meD5CKoAeBson8NEqHCiAExkDoD7LFTZ30lyCCgGwkHAbmlUD/3hP6LATFgHAObkKOvAx8HyVnQHgDj4o4ii4JEqjBiQAykxgDd9oGUnzmspgfA8P0Bvlt04Q+JGBADRjHAh/RwYGvQXFXTA2Cc3FL4t0EjVzgxIAYSZWApUttaTYrV9gAY9xCAWwt15g+JGBADRjDwCXJxLsDVf4Gl2h4AI14P8D1DIgbEgDkMUCerUn5mvZYeAO8bCnBugHoBZEMiBtJloKanP7NcSw+A970GqBdAJiRiIH0Ganr6M9u19gB4L3sBHAvoxB8SMSAGUmGAI/989+fGn1VLrT0AJsRegOYFVE25bhADkTLAOf81KT9zEaYHwPt7Ak8DJ/OHRAyIgUQZ4JLfbwBba03Vb0swv3j/jADcVGSCX0BdFwNiIHIG5iDGR8PEGrYHwLQ7AKuAr/KHRAyIgUQY4OrcMcBnYVIL2wNg2twnYAcwEYjCoCAaiRgQAz4MXI3rL/mE8b0cZhDQG/mD+PGQ94SOxYAYiI2B3yFmbvcdWqJ8Yp+G3PBVoC50rhSBGBAD5RjgpJ/RwNpyAao5H8UrgJse/ZGtgLHuCf0XA2IgcgZuRYwPRBVrlD0A5uk44I/A2fwhEQNiIFIGnkNs44BQA3/eHEXZA2C83IyQS4YnA37fHEAQiRgQAwEZoMt9KrAhYPhAwaI2AEz0DaA7wI0JJGJADETDwD8jmshn3kb9CuAWtQsOVgIcGJSIATEQjgF2/ccDO8NFc/TdUbkBm8fMPcmuA/Y0v6DfYkAMVMXAboT+IRC58jMXcbwCMF7KVoDjAGMAiRgQA7Ux8BPctrS2W/3viusVwE25PQ44SYjdF4kYEAPVMUCP2oVAQ3W3BQ8dtwFgTrhvwOMAVw5KxIAYCMYAV/rR5cdl97FJnK8Abqa5TuBt4K+AuMYc3LT0XwxkgYEDKMQ0YEXchUnCALAMrwKcIsy1yxIxIAYqM/ArXP5F5SDRXE3iFcDNKWcJcsGQpgq7jOi/GDiaAT71vwNw9D92SdIAsDADgMeAfvwhEQNioIiBrfjFByQn0yUiSb+Tv45S/R3AaY0SMSAGjjCwC4c/ABJTfiad1BgA03KFBeSSxguApHsgbh70XwyYxMAXyMxM4D+SzlQaBoBl5NTGjsA3+UMiBnLOwE9RfiJxScsAsKBPABwLOJ0/JGIgpwzci3L/I0DXX+KSdhe8E0rMmYKjEi+5EhQD6TPwJ2ThL4HI1vdXW6SkBwGb528nTvwN8GzzC/otBjLOANv85UBqyk9+0+4BMA+UgcAyYAB/SMRAxhnYhPKdD9Arlqqk3QNwC09CrgDedU/ovxjIKANs41OA1JWf/KY5CMj0vfIOfvBjB98GOngv6FgMZIQBLvD5HrDGlPKYZADIyVbgeUBGACRIMsUAlZ/v/CtNKpVpBoDcbAU4T0BGACRIMsEAlZ8b5a4yrTQmGgBytA1QT8C01qL81MKA++Q3TvlZGFMNAPO2FaAR+BbAWYMSMWAbAxzw4zv/SlMzbrIBIGdbgSeBkUBXQCIGbGFgMzLKbj8n+0hCMnAK7n8aaBTEgQVtgG11ECCJkIGTENdqQEZAHJjcBlagjbKtWiGmvwJ4SeSUyf8CSK4WEHmZ0bEpDPwGGfk+wA/lWiE2GQASuhfglGHOYOT+gqbMZERWJDlmgOv5fwlwTb82u0moIUxHOlxMZHJ3UHnLfv1Q4acl1OaVTDMGxuE351RL0cRBGm2AbW98szapnwkz0B/pLQfSaABKM7+8P442NyDhth55craNAZQigPsL/g7gZ8jOBjQuABIksTHA9/1fAX8PvB9bKoq4Jga4pJhTL/VkFgdxtAHO7OPkHonBDAxD3h4D4mgAijO/vD6KNsW2JbGAgbbI41yAI7RSWnEQpg3wCz1sS3zFlFjGwFjkV1OIZQBqNQAvof3Q0ySxmIE65P12QL0BGYKghoATzjjQ1w2QZISBMSiHegMyAn5G4Cm0E/n2M6L0zYvB3sBsgK5Dv4ag6/ni6CO0iZsB7T0BErIuXEx0PyAlFwcH0Q4eAE4DJDlioCXKOhHg/oMyBPnkgHV/CSDJMQN8LZgJbAdkCPLBAfecnAV0ACRioMBAP/ylt0CGILtG4GPU78+BXoBEDJRkgFs5/RrgoJB6BNnggIrPOh0KSMRAIAa+jFAyBHYbACl+oKauQJUY4PzvnwF6NbDHGHyA+tITv1Kr1rWqGeAYwXxgI6BXAzM52IK64TwP7iItEQOxMMDvE1wFPAHsB2QM0uWAdcBvR0wFegASMZAIA5xHcA6wGOCXjWUIkuWAr2SLAC74ag1IxEBqDPRGyjOAlUADIGMQDwd7DnM8Hf/5SiYJyUCLkPfr9mIGuB3ZGcB3gYsADiCypyCpnQFuwbUO4HbwnLL7PCCJiAEZgIiILBFNO5z7KnA+cCEwGGgDSPwZ4Hs9lZ678PweeBHgEl1JxAzIAERMaJno2uI8J6GMAWgQOMdAA1YgwSPv45hK/wiwBuBmHPsASYwMyADESG6FqPvjGleffQvgTsZ0W3UG8iSforCbgaeB5QAV/g1AkiADMgAJkl0mKY4RDASGACOAMwEaiJOBLAk9Ja8DVPTVwGvAJuAAIEmJARmAlIj3SbYXrtOz8BcABxLZWzgJ6Am0B0yWXcgcXXTvAlTwZ4H1wDbgLUBiEAMyAAZVhk9WuuM6DQANQT+Arw19ABoLLmnuBHwJ4HhDnML3cnbfdwIfATsAzsAj6gE+6WkAOA9fYjgDMgCGV1CA7NH16BoAGoGOAHsPJwJur+EEHNM48Ho7gMaked1/jnOfAJzDQKWmAn8IvAdQobcBbwN8wlP5aQRoACQWM/D/QN+5DmrsiuEAAAAASUVORK5CYII="
  }
];
const rootNotFoundModule = null;
const rootForbiddenModule = null;
const rootUnauthorizedModule = null;
const rootLayouts = [mod_1];
async function renderHTTPAccessFallbackPage(route, statusCode, isRscRequest, request, opts) {
  let BoundaryComponent = opts?.boundaryComponent ?? null;
  if (!BoundaryComponent) {
    let boundaryModule;
    if (statusCode === 403) {
      boundaryModule = route?.forbidden ?? rootForbiddenModule;
    } else if (statusCode === 401) {
      boundaryModule = route?.unauthorized ?? rootUnauthorizedModule;
    } else {
      boundaryModule = route?.notFound ?? rootNotFoundModule;
    }
    BoundaryComponent = boundaryModule?.default ?? null;
  }
  const layouts = opts?.layouts ?? route?.layouts ?? rootLayouts;
  if (!BoundaryComponent) return null;
  const metadataList = [];
  const viewportList = [];
  for (const layoutMod of layouts) {
    if (layoutMod) {
      const meta = await resolveModuleMetadata(layoutMod);
      if (meta) metadataList.push(meta);
      const vp = await resolveModuleViewport(layoutMod);
      if (vp) viewportList.push(vp);
    }
  }
  const resolvedMetadata = metadataList.length > 0 ? mergeMetadata(metadataList) : null;
  const resolvedViewport = viewportList.length > 0 ? mergeViewport(viewportList) : null;
  const charsetMeta = react_reactServerExports.createElement("meta", { charSet: "utf-8" });
  const noindexMeta = react_reactServerExports.createElement("meta", { name: "robots", content: "noindex" });
  const headElements = [charsetMeta, noindexMeta];
  if (resolvedMetadata) headElements.push(react_reactServerExports.createElement(MetadataHead, { metadata: resolvedMetadata }));
  const effectiveViewport = resolvedViewport ?? { width: "device-width", initialScale: 1 };
  headElements.push(react_reactServerExports.createElement(ViewportHead, { viewport: effectiveViewport }));
  let element = react_reactServerExports.createElement(react_reactServerExports.Fragment, null, ...headElements, react_reactServerExports.createElement(BoundaryComponent));
  if (isRscRequest) {
    const layoutDepths = route?.layoutSegmentDepths;
    for (let i = layouts.length - 1; i >= 0; i--) {
      const LayoutComponent = layouts[i]?.default;
      if (LayoutComponent) {
        element = react_reactServerExports.createElement(LayoutComponent, { children: element });
        const layoutDepth = layoutDepths ? layoutDepths[i] : 0;
        element = react_reactServerExports.createElement(LayoutSegmentProvider, { depth: layoutDepth }, element);
      }
    }
    const rscStream2 = renderToReadableStream(element, { onError: rscOnError });
    setHeadersContext(null);
    setNavigationContext(null);
    return new Response(rscStream2, {
      status: statusCode,
      headers: { "Content-Type": "text/x-component; charset=utf-8" }
    });
  }
  for (let i = layouts.length - 1; i >= 0; i--) {
    const LayoutComponent = layouts[i]?.default;
    if (LayoutComponent) {
      element = react_reactServerExports.createElement(LayoutComponent, { children: element });
    }
  }
  const rscStream = renderToReadableStream(element, { onError: rscOnError });
  const fontData = {
    links: getSSRFontLinks(),
    styles: _getSSRFontStyles(),
    preloads: _getSSRFontPreloads()
  };
  const ssrEntry = await import("./ssr/index.js");
  const htmlStream = await ssrEntry.handleSsr(rscStream, getNavigationContext(), fontData);
  setHeadersContext(null);
  setNavigationContext(null);
  const _respHeaders = { "Content-Type": "text/html; charset=utf-8" };
  const _linkParts = (fontData.preloads || []).map(function(p) {
    return "<" + p.href + ">; rel=preload; as=font; type=" + p.type + "; crossorigin";
  });
  if (_linkParts.length > 0) _respHeaders["Link"] = _linkParts.join(", ");
  return new Response(htmlStream, {
    status: statusCode,
    headers: _respHeaders
  });
}
async function renderNotFoundPage(route, isRscRequest, request) {
  return renderHTTPAccessFallbackPage(route, 404, isRscRequest);
}
async function renderErrorBoundaryPage(route, error, isRscRequest, request) {
  let ErrorComponent = route?.error?.default ?? null;
  if (!ErrorComponent && route?.errors) {
    for (let i = route.errors.length - 1; i >= 0; i--) {
      if (route.errors[i]?.default) {
        ErrorComponent = route.errors[i].default;
        break;
      }
    }
  }
  ErrorComponent = ErrorComponent;
  if (!ErrorComponent) return null;
  const errorObj = error instanceof Error ? error : new Error(String(error));
  let element = react_reactServerExports.createElement(ErrorComponent, {
    error: errorObj
  });
  const layouts = route?.layouts ?? rootLayouts;
  if (isRscRequest) {
    const layoutDepths = route?.layoutSegmentDepths;
    for (let i = layouts.length - 1; i >= 0; i--) {
      const LayoutComponent = layouts[i]?.default;
      if (LayoutComponent) {
        element = react_reactServerExports.createElement(LayoutComponent, { children: element });
        const layoutDepth = layoutDepths ? layoutDepths[i] : 0;
        element = react_reactServerExports.createElement(LayoutSegmentProvider, { depth: layoutDepth }, element);
      }
    }
    const rscStream2 = renderToReadableStream(element, { onError: rscOnError });
    setHeadersContext(null);
    setNavigationContext(null);
    return new Response(rscStream2, {
      status: 200,
      headers: { "Content-Type": "text/x-component; charset=utf-8" }
    });
  }
  for (let i = layouts.length - 1; i >= 0; i--) {
    const LayoutComponent = layouts[i]?.default;
    if (LayoutComponent) {
      element = react_reactServerExports.createElement(LayoutComponent, { children: element });
    }
  }
  const rscStream = renderToReadableStream(element, { onError: rscOnError });
  const fontData = {
    links: getSSRFontLinks(),
    styles: _getSSRFontStyles(),
    preloads: _getSSRFontPreloads()
  };
  const ssrEntry = await import("./ssr/index.js");
  const htmlStream = await ssrEntry.handleSsr(rscStream, getNavigationContext(), fontData);
  setHeadersContext(null);
  setNavigationContext(null);
  const _errHeaders = { "Content-Type": "text/html; charset=utf-8" };
  const _errLinkParts = (fontData.preloads || []).map(function(p) {
    return "<" + p.href + ">; rel=preload; as=font; type=" + p.type + "; crossorigin";
  });
  if (_errLinkParts.length > 0) _errHeaders["Link"] = _errLinkParts.join(", ");
  return new Response(htmlStream, {
    status: 200,
    headers: _errHeaders
  });
}
function matchRoute(url, routes2) {
  const pathname = url.split("?")[0];
  let normalizedUrl = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  try {
    normalizedUrl = decodeURIComponent(normalizedUrl);
  } catch {
  }
  for (const route of routes2) {
    const params = matchPattern(normalizedUrl, route.pattern);
    if (params !== null) return { route, params };
  }
  return null;
}
function matchPattern(url, pattern) {
  const urlParts = url.split("/").filter(Boolean);
  const patternParts = pattern.split("/").filter(Boolean);
  const params = /* @__PURE__ */ Object.create(null);
  for (let i = 0; i < patternParts.length; i++) {
    const pp = patternParts[i];
    if (pp.endsWith("+")) {
      const paramName = pp.slice(1, -1);
      const remaining = urlParts.slice(i);
      if (remaining.length === 0) return null;
      params[paramName] = remaining;
      return params;
    }
    if (pp.endsWith("*")) {
      const paramName = pp.slice(1, -1);
      params[paramName] = urlParts.slice(i);
      return params;
    }
    if (pp.startsWith(":")) {
      if (i >= urlParts.length) return null;
      params[pp.slice(1)] = urlParts[i];
      continue;
    }
    if (i >= urlParts.length || urlParts[i] !== pp) return null;
  }
  if (urlParts.length !== patternParts.length) return null;
  return params;
}
const interceptLookup = [];
for (let ri = 0; ri < routes.length; ri++) {
  const r = routes[ri];
  if (!r.slots) continue;
  for (const [slotName, slotMod] of Object.entries(r.slots)) {
    if (!slotMod.intercepts) continue;
    for (const intercept of slotMod.intercepts) {
      interceptLookup.push({
        sourceRouteIndex: ri,
        slotName,
        targetPattern: intercept.targetPattern,
        page: intercept.page,
        params: intercept.params
      });
    }
  }
}
function findIntercept(pathname) {
  for (const entry of interceptLookup) {
    const params = matchPattern(pathname, entry.targetPattern);
    if (params !== null) {
      return { ...entry, matchedParams: params };
    }
  }
  return null;
}
async function buildPageElement(route, params, opts, searchParams) {
  const PageComponent = route.page?.default;
  if (!PageComponent) {
    return react_reactServerExports.createElement("div", null, "Page has no default export");
  }
  const metadataList = [];
  const viewportList = [];
  for (const layoutMod of route.layouts) {
    if (layoutMod) {
      const meta = await resolveModuleMetadata(layoutMod, params);
      if (meta) metadataList.push(meta);
      const vp = await resolveModuleViewport(layoutMod, params);
      if (vp) viewportList.push(vp);
    }
  }
  if (route.page) {
    const pageMeta = await resolveModuleMetadata(route.page, params);
    if (pageMeta) metadataList.push(pageMeta);
    const pageVp = await resolveModuleViewport(route.page, params);
    if (pageVp) viewportList.push(pageVp);
  }
  const resolvedMetadata = metadataList.length > 0 ? mergeMetadata(metadataList) : null;
  const resolvedViewport = viewportList.length > 0 ? mergeViewport(viewportList) : null;
  const asyncParams = Object.assign(Promise.resolve(params), params);
  const pageProps = { params: asyncParams };
  if (searchParams) {
    const spObj = {};
    let hasSearchParams = false;
    if (searchParams.forEach) searchParams.forEach(function(v, k) {
      hasSearchParams = true;
      if (k in spObj) {
        spObj[k] = Array.isArray(spObj[k]) ? spObj[k].concat(v) : [spObj[k], v];
      } else {
        spObj[k] = v;
      }
    });
    if (hasSearchParams) markDynamicUsage();
    pageProps.searchParams = Object.assign(Promise.resolve(spObj), spObj);
  }
  let element = react_reactServerExports.createElement(PageComponent, pageProps);
  {
    const headElements = [];
    headElements.push(react_reactServerExports.createElement("meta", { charSet: "utf-8" }));
    if (resolvedMetadata) headElements.push(react_reactServerExports.createElement(MetadataHead, { metadata: resolvedMetadata }));
    const effectiveViewport = resolvedViewport ?? { width: "device-width", initialScale: 1 };
    headElements.push(react_reactServerExports.createElement(ViewportHead, { viewport: effectiveViewport }));
    element = react_reactServerExports.createElement(react_reactServerExports.Fragment, null, ...headElements, element);
  }
  if (route.loading?.default) {
    element = react_reactServerExports.createElement(
      react_reactServerExports.Suspense,
      { fallback: react_reactServerExports.createElement(route.loading.default) },
      element
    );
  }
  {
    const lastLayoutError = route.errors ? route.errors[route.errors.length - 1] : null;
    if (route.error?.default && route.error !== lastLayoutError) {
      element = react_reactServerExports.createElement(ErrorBoundary, {
        fallback: route.error.default,
        children: element
      });
    }
  }
  {
    const NotFoundComponent = route.notFound?.default ?? null;
    if (NotFoundComponent) {
      element = react_reactServerExports.createElement(NotFoundBoundary, {
        fallback: react_reactServerExports.createElement(NotFoundComponent),
        children: element
      });
    }
  }
  if (route.templates) {
    for (let i = route.templates.length - 1; i >= 0; i--) {
      const TemplateComponent = route.templates[i]?.default;
      if (TemplateComponent) {
        element = react_reactServerExports.createElement(TemplateComponent, { children: element, params });
      }
    }
  }
  for (let i = route.layouts.length - 1; i >= 0; i--) {
    if (route.errors && route.errors[i]?.default) {
      element = react_reactServerExports.createElement(ErrorBoundary, {
        fallback: route.errors[i].default,
        children: element
      });
    }
    const LayoutComponent = route.layouts[i]?.default;
    if (LayoutComponent) {
      {
        const LayoutNotFound = route.notFounds?.[i]?.default;
        if (LayoutNotFound) {
          element = react_reactServerExports.createElement(NotFoundBoundary, {
            fallback: react_reactServerExports.createElement(LayoutNotFound),
            children: element
          });
        }
      }
      const layoutProps = { children: element, params: Object.assign(Promise.resolve(params), params) };
      if (route.slots) {
        for (const [slotName, slotMod] of Object.entries(route.slots)) {
          const targetIdx = slotMod.layoutIndex >= 0 ? slotMod.layoutIndex : route.layouts.length - 1;
          if (i !== targetIdx) continue;
          let SlotPage = null;
          let slotParams = params;
          if (opts && opts.interceptSlot === slotName && opts.interceptPage) {
            SlotPage = opts.interceptPage.default;
            slotParams = opts.interceptParams || params;
          } else {
            SlotPage = slotMod.page?.default || slotMod.default?.default;
          }
          if (SlotPage) {
            let slotElement = react_reactServerExports.createElement(SlotPage, { params: Object.assign(Promise.resolve(slotParams), slotParams) });
            const SlotLayout = slotMod.layout?.default;
            if (SlotLayout) {
              slotElement = react_reactServerExports.createElement(SlotLayout, {
                children: slotElement,
                params: Object.assign(Promise.resolve(slotParams), slotParams)
              });
            }
            if (slotMod.loading?.default) {
              slotElement = react_reactServerExports.createElement(
                react_reactServerExports.Suspense,
                { fallback: react_reactServerExports.createElement(slotMod.loading.default) },
                slotElement
              );
            }
            if (slotMod.error?.default) {
              slotElement = react_reactServerExports.createElement(ErrorBoundary, {
                fallback: slotMod.error.default,
                children: slotElement
              });
            }
            layoutProps[slotName] = slotElement;
          }
        }
      }
      element = react_reactServerExports.createElement(LayoutComponent, layoutProps);
      const layoutDepth = route.layoutSegmentDepths ? route.layoutSegmentDepths[i] : 0;
      element = react_reactServerExports.createElement(LayoutSegmentProvider, { depth: layoutDepth }, element);
    }
  }
  return element;
}
const __basePath = "";
const __configRedirects = [];
const __configRewrites = { "beforeFiles": [], "afterFiles": [], "fallback": [] };
const __configHeaders = [];
const __allowedOrigins = [];
function __isOriginAllowed(origin, allowed) {
  for (const pattern of allowed) {
    if (pattern.startsWith("*.")) {
      const suffix = pattern.slice(1);
      if (origin === pattern.slice(2) || origin.endsWith(suffix)) return true;
    } else if (origin === pattern) {
      return true;
    }
  }
  return false;
}
function __validateCsrfOrigin(request) {
  const originHeader = request.headers.get("origin");
  if (!originHeader || originHeader === "null") return null;
  let originHost;
  try {
    originHost = new URL(originHeader).host.toLowerCase();
  } catch {
    return new Response("Forbidden", { status: 403, headers: { "Content-Type": "text/plain" } });
  }
  const hostHeader = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "").split(",")[0].trim().toLowerCase();
  if (!hostHeader) return null;
  if (originHost === hostHeader) return null;
  if (__allowedOrigins.length > 0 && __isOriginAllowed(originHost, __allowedOrigins)) return null;
  console.warn(
    `[vinext] CSRF origin mismatch: origin "${originHost}" does not match host "${hostHeader}". Blocking server action request.`
  );
  return new Response("Forbidden", { status: 403, headers: { "Content-Type": "text/plain" } });
}
function __isSafeRegex(pattern) {
  const quantifierAtDepth = [];
  let depth = 0;
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i];
    if (ch === "\\") {
      i += 2;
      continue;
    }
    if (ch === "[") {
      i++;
      while (i < pattern.length && pattern[i] !== "]") {
        if (pattern[i] === "\\") i++;
        i++;
      }
      i++;
      continue;
    }
    if (ch === "(") {
      depth++;
      if (quantifierAtDepth.length <= depth) quantifierAtDepth.push(false);
      else quantifierAtDepth[depth] = false;
      i++;
      continue;
    }
    if (ch === ")") {
      const hadQ = depth > 0 && quantifierAtDepth[depth];
      if (depth > 0) depth--;
      const next = pattern[i + 1];
      if (next === "+" || next === "*" || next === "{") {
        if (hadQ) return false;
        if (depth >= 0 && depth < quantifierAtDepth.length) quantifierAtDepth[depth] = true;
      }
      i++;
      continue;
    }
    if (ch === "+" || ch === "*") {
      if (depth > 0) quantifierAtDepth[depth] = true;
      i++;
      continue;
    }
    if (ch === "?") {
      const prev = i > 0 ? pattern[i - 1] : "";
      if (prev !== "+" && prev !== "*" && prev !== "?" && prev !== "}") {
        if (depth > 0) quantifierAtDepth[depth] = true;
      }
      i++;
      continue;
    }
    if (ch === "{") {
      let j = i + 1;
      while (j < pattern.length && /[\d,]/.test(pattern[j])) j++;
      if (j < pattern.length && pattern[j] === "}" && j > i + 1) {
        if (depth > 0) quantifierAtDepth[depth] = true;
        i = j + 1;
        continue;
      }
    }
    i++;
  }
  return true;
}
function __safeRegExp(pattern, flags) {
  if (!__isSafeRegex(pattern)) {
    console.warn("[vinext] Ignoring potentially unsafe regex pattern (ReDoS risk): " + pattern);
    return null;
  }
  try {
    return new RegExp(pattern, flags);
  } catch {
    return null;
  }
}
function __matchConfigPattern(pathname, pattern) {
  if (pattern.includes("(") || pattern.includes("\\") || /:\w+[*+][^/]/.test(pattern)) {
    try {
      const paramNames = [];
      const regexStr = pattern.replace(/\./g, "\\.").replace(/:([a-zA-Z_]\w*)\*(?:\(([^)]+)\))?/g, (_, name, c) => {
        paramNames.push(name);
        return c ? "(" + c + ")" : "(.*)";
      }).replace(/:([a-zA-Z_]\w*)\+(?:\(([^)]+)\))?/g, (_, name, c) => {
        paramNames.push(name);
        return c ? "(" + c + ")" : "(.+)";
      }).replace(/:([a-zA-Z_]\w*)\(([^)]+)\)/g, (_, name, c) => {
        paramNames.push(name);
        return "(" + c + ")";
      }).replace(/:([a-zA-Z_]\w*)/g, (_, name) => {
        paramNames.push(name);
        return "([^/]+)";
      });
      const re = __safeRegExp("^" + regexStr + "$");
      if (!re) return null;
      const match = re.exec(pathname);
      if (!match) return null;
      const params2 = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < paramNames.length; i++) params2[paramNames[i]] = match[i + 1] || "";
      return params2;
    } catch {
    }
  }
  const catchAllMatch = pattern.match(/:([a-zA-Z_]\w*)(\*|\+)$/);
  if (catchAllMatch) {
    const prefix = pattern.slice(0, pattern.lastIndexOf(":"));
    const paramName = catchAllMatch[1];
    const isPlus = catchAllMatch[2] === "+";
    if (!pathname.startsWith(prefix.replace(/\/$/, ""))) return null;
    const rest = pathname.slice(prefix.replace(/\/$/, "").length);
    if (isPlus && (!rest || rest === "/")) return null;
    let restValue = rest.startsWith("/") ? rest.slice(1) : rest;
    try {
      restValue = decodeURIComponent(restValue);
    } catch {
    }
    return { [paramName]: restValue };
  }
  const parts = pattern.split("/");
  const pathParts = pathname.split("/");
  if (parts.length !== pathParts.length) return null;
  const params = /* @__PURE__ */ Object.create(null);
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith(":")) params[parts[i].slice(1)] = pathParts[i];
    else if (parts[i] !== pathParts[i]) return null;
  }
  return params;
}
function __parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  const cookies = {};
  for (const part of cookieHeader.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (key) cookies[key] = value;
  }
  return cookies;
}
function __checkSingleCondition(condition, ctx) {
  switch (condition.type) {
    case "header": {
      const v = ctx.headers.get(condition.key);
      if (v === null) return false;
      if (condition.value !== void 0) {
        const re = __safeRegExp(condition.value);
        return re ? re.test(v) : v === condition.value;
      }
      return true;
    }
    case "cookie": {
      const v = ctx.cookies[condition.key];
      if (v === void 0) return false;
      if (condition.value !== void 0) {
        const re = __safeRegExp(condition.value);
        return re ? re.test(v) : v === condition.value;
      }
      return true;
    }
    case "query": {
      const v = ctx.query.get(condition.key);
      if (v === null) return false;
      if (condition.value !== void 0) {
        const re = __safeRegExp(condition.value);
        return re ? re.test(v) : v === condition.value;
      }
      return true;
    }
    case "host": {
      if (condition.value !== void 0) {
        const re = __safeRegExp(condition.value);
        return re ? re.test(ctx.host) : ctx.host === condition.value;
      }
      return ctx.host === condition.key;
    }
    default:
      return false;
  }
}
function __checkHasConditions(has, missing, ctx) {
  if (has) {
    for (const c of has) {
      if (!__checkSingleCondition(c, ctx)) return false;
    }
  }
  if (missing) {
    for (const c of missing) {
      if (__checkSingleCondition(c, ctx)) return false;
    }
  }
  return true;
}
function __buildRequestContext(request) {
  const url = new URL(request.url);
  return {
    headers: request.headers,
    cookies: __parseCookies(request.headers.get("cookie")),
    query: url.searchParams,
    host: request.headers.get("host") || url.host
  };
}
function __applyConfigRedirects(pathname, ctx) {
  for (const rule of __configRedirects) {
    const params = __matchConfigPattern(pathname, rule.source);
    if (params) {
      if (ctx && (rule.has || rule.missing)) {
        if (!__checkHasConditions(rule.has, rule.missing, ctx)) continue;
      }
      let dest = rule.destination;
      for (const [key, value] of Object.entries(params)) {
        dest = dest.replace(":" + key + "*", value);
        dest = dest.replace(":" + key + "+", value);
        dest = dest.replace(":" + key, value);
      }
      return { destination: dest, permanent: rule.permanent };
    }
  }
  return null;
}
function __applyConfigRewrites(pathname, rules, ctx) {
  for (const rule of rules) {
    const params = __matchConfigPattern(pathname, rule.source);
    if (params) {
      if (ctx && (rule.has || rule.missing)) {
        if (!__checkHasConditions(rule.has, rule.missing, ctx)) continue;
      }
      let dest = rule.destination;
      for (const [key, value] of Object.entries(params)) {
        dest = dest.replace(":" + key + "*", value);
        dest = dest.replace(":" + key + "+", value);
        dest = dest.replace(":" + key, value);
      }
      return dest;
    }
  }
  return null;
}
function __isExternalUrl(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}
const __hopByHopHeaders = /* @__PURE__ */ new Set(["connection", "keep-alive", "proxy-authenticate", "proxy-authorization", "te", "trailers", "transfer-encoding", "upgrade"]);
async function __proxyExternalRequest(request, externalUrl) {
  const originalUrl = new URL(request.url);
  const targetUrl = new URL(externalUrl);
  for (const [key, value] of originalUrl.searchParams) {
    if (!targetUrl.searchParams.has(key)) targetUrl.searchParams.set(key, value);
  }
  const headers = new Headers(request.headers);
  headers.set("host", targetUrl.host);
  headers.delete("connection");
  const method = request.method;
  const hasBody = method !== "GET" && method !== "HEAD";
  const init2 = { method, headers, redirect: "manual" };
  if (hasBody && request.body) {
    init2.body = request.body;
    init2.duplex = "half";
  }
  let upstream;
  try {
    upstream = await fetch(targetUrl.href, init2);
  } catch (e) {
    console.error("[vinext] External rewrite proxy error:", e);
    return new Response("Bad Gateway", { status: 502 });
  }
  const respHeaders = new Headers();
  upstream.headers.forEach(function(value, key) {
    if (!__hopByHopHeaders.has(key.toLowerCase())) respHeaders.append(key, value);
  });
  return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: respHeaders });
}
function __applyConfigHeaders(pathname) {
  const result = [];
  for (const rule of __configHeaders) {
    const groups = [];
    const withPlaceholders = rule.source.replace(/\(([^)]+)\)/g, (_, inner) => {
      groups.push(inner);
      return "___GROUP_" + (groups.length - 1) + "___";
    });
    const escaped = withPlaceholders.replace(/\./g, "\\.").replace(/\+/g, "\\+").replace(/\?/g, "\\?").replace(/\*/g, ".*").replace(/:[a-zA-Z_]\w*/g, "[^/]+").replace(/___GROUP_(\d+)___/g, (_, idx) => "(" + groups[Number(idx)] + ")");
    const sourceRegex = __safeRegExp("^" + escaped + "$");
    if (sourceRegex && sourceRegex.test(pathname)) result.push(...rule.headers);
  }
  return result;
}
async function handler(request) {
  const headersCtx = headersContextFromRequest(request);
  return runWithHeadersContext(headersCtx, async () => {
    _initRequestScopedCacheState();
    clearPrivateCache();
    return runWithFetchCache(async () => {
      const response = await _handleRequest(request);
      if (__configHeaders.length && response && response.headers && !(response.status >= 300 && response.status < 400)) {
        const url = new URL(request.url);
        let pathname = url.pathname;
        const extraHeaders = __applyConfigHeaders(pathname);
        for (const h of extraHeaders) {
          response.headers.set(h.key, h.value);
        }
      }
      return response;
    });
  });
}
async function _handleRequest(request) {
  const url = new URL(request.url);
  let pathname = url.pathname;
  if (pathname.startsWith("//")) {
    return new Response("404 Not Found", { status: 404 });
  }
  if (pathname !== "/" && !pathname.startsWith("/api")) {
    const hasTrailing = pathname.endsWith("/");
    if (hasTrailing) {
      return Response.redirect(new URL(__basePath + pathname.replace(/\/+$/, "") + url.search, request.url), 308);
    }
  }
  const __reqCtx = __buildRequestContext(request);
  if (__configRedirects.length) {
    const __redir = __applyConfigRedirects(pathname, __reqCtx);
    if (__redir) {
      const __redirDest = __redir.destination;
      return new Response(null, {
        status: __redir.permanent ? 308 : 307,
        headers: { Location: __redirDest }
      });
    }
  }
  if (__configRewrites.beforeFiles && __configRewrites.beforeFiles.length) {
    const __rewritten = __applyConfigRewrites(pathname, __configRewrites.beforeFiles, __reqCtx);
    if (__rewritten) {
      if (__isExternalUrl(__rewritten)) {
        setHeadersContext(null);
        setNavigationContext(null);
        return __proxyExternalRequest(request, __rewritten);
      }
      pathname = __rewritten;
    }
  }
  const isRscRequest = pathname.endsWith(".rsc") || request.headers.get("accept")?.includes("text/x-component");
  let cleanPathname = pathname.replace(/\.rsc$/, "");
  if (cleanPathname === "/_vinext/image") {
    const __imgUrl = url.searchParams.get("url");
    if (!__imgUrl || !__imgUrl.startsWith("/") || __imgUrl.startsWith("//")) {
      return new Response(!__imgUrl ? "Missing url parameter" : "Only relative URLs allowed", { status: 400 });
    }
    return Response.redirect(new URL(__imgUrl, request.url).href, 302);
  }
  for (const metaRoute of metadataRoutes) {
    if (cleanPathname === metaRoute.servedUrl) {
      if (metaRoute.isDynamic) {
        const metaFn = metaRoute.module.default;
        if (typeof metaFn === "function") {
          const result = await metaFn();
          let body;
          if (result instanceof Response) return result;
          if (metaRoute.type === "sitemap") body = sitemapToXml(result);
          else if (metaRoute.type === "robots") body = robotsToText(result);
          else if (metaRoute.type === "manifest") body = manifestToJson(result);
          else body = JSON.stringify(result);
          return new Response(body, {
            headers: { "Content-Type": metaRoute.contentType }
          });
        }
      } else {
        try {
          const binary = atob(metaRoute.fileDataBase64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
          return new Response(bytes, {
            headers: {
              "Content-Type": metaRoute.contentType,
              "Cache-Control": "public, max-age=0, must-revalidate"
            }
          });
        } catch {
          return new Response("Not Found", { status: 404 });
        }
      }
    }
  }
  setNavigationContext({
    pathname: cleanPathname,
    searchParams: url.searchParams,
    params: {}
  });
  const actionId = request.headers.get("x-rsc-action");
  if (request.method === "POST" && actionId) {
    const csrfResponse = __validateCsrfOrigin(request);
    if (csrfResponse) return csrfResponse;
    try {
      const contentType = request.headers.get("content-type") || "";
      const body = contentType.startsWith("multipart/form-data") ? await request.formData() : await request.text();
      const temporaryReferences = createTemporaryReferenceSet();
      const args = await decodeReply(body, { temporaryReferences });
      const action = await loadServerAction(actionId);
      let returnValue;
      let actionRedirect = null;
      try {
        const data = await action.apply(null, args);
        returnValue = { ok: true, data };
      } catch (e) {
        if (e && typeof e === "object" && "digest" in e) {
          const digest = String(e.digest);
          if (digest.startsWith("NEXT_REDIRECT;")) {
            const parts = digest.split(";");
            actionRedirect = {
              url: parts[2],
              type: parts[1] || "replace",
              // "push" or "replace"
              status: parts[3] ? parseInt(parts[3], 10) : 307
            };
            returnValue = { ok: true, data: void 0 };
          } else if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;")) {
            returnValue = { ok: false, data: e };
          } else {
            returnValue = { ok: false, data: e };
          }
        } else {
          returnValue = { ok: false, data: e };
        }
      }
      if (actionRedirect) {
        const actionPendingCookies2 = getAndClearPendingCookies();
        const actionDraftCookie2 = getDraftModeCookieHeader();
        setHeadersContext(null);
        setNavigationContext(null);
        const redirectHeaders = new Headers({
          "Content-Type": "text/x-component; charset=utf-8",
          "x-action-redirect": actionRedirect.url,
          "x-action-redirect-type": actionRedirect.type,
          "x-action-redirect-status": String(actionRedirect.status)
        });
        for (const cookie of actionPendingCookies2) {
          redirectHeaders.append("Set-Cookie", cookie);
        }
        if (actionDraftCookie2) redirectHeaders.append("Set-Cookie", actionDraftCookie2);
        return new Response("", { status: 200, headers: redirectHeaders });
      }
      const match2 = matchRoute(cleanPathname, routes);
      let element2;
      if (match2) {
        const { route: actionRoute, params: actionParams } = match2;
        setNavigationContext({
          pathname: cleanPathname,
          searchParams: url.searchParams,
          params: actionParams
        });
        element2 = buildPageElement(actionRoute, actionParams, void 0, url.searchParams);
      } else {
        element2 = react_reactServerExports.createElement("div", null, "Page not found");
      }
      const rscStream2 = renderToReadableStream(
        { root: element2, returnValue },
        { temporaryReferences, onError: rscOnError }
      );
      const actionPendingCookies = getAndClearPendingCookies();
      const actionDraftCookie = getDraftModeCookieHeader();
      setHeadersContext(null);
      setNavigationContext(null);
      const actionHeaders = { "Content-Type": "text/x-component; charset=utf-8" };
      const actionResponse = new Response(rscStream2, { headers: actionHeaders });
      if (actionPendingCookies.length > 0 || actionDraftCookie) {
        for (const cookie of actionPendingCookies) {
          actionResponse.headers.append("Set-Cookie", cookie);
        }
        if (actionDraftCookie) actionResponse.headers.append("Set-Cookie", actionDraftCookie);
      }
      return actionResponse;
    } catch (err) {
      getAndClearPendingCookies();
      console.error("[vinext] Server action error:", err);
      reportRequestError(
        err instanceof Error ? err : new Error(String(err)),
        { method: request.method, headers: Object.fromEntries(request.headers.entries()) }
      ).catch(() => {
      });
      setHeadersContext(null);
      setNavigationContext(null);
      return new Response(
        process.env.NODE_ENV === "production" ? "Internal Server Error" : "Server action failed: " + (err && err.message ? err.message : String(err)),
        { status: 500 }
      );
    }
  }
  if (__configRewrites.afterFiles && __configRewrites.afterFiles.length) {
    const __afterRewritten = __applyConfigRewrites(cleanPathname, __configRewrites.afterFiles, __reqCtx);
    if (__afterRewritten) {
      if (__isExternalUrl(__afterRewritten)) {
        setHeadersContext(null);
        setNavigationContext(null);
        return __proxyExternalRequest(request, __afterRewritten);
      }
      cleanPathname = __afterRewritten;
    }
  }
  let match = matchRoute(cleanPathname, routes);
  if (!match && __configRewrites.fallback && __configRewrites.fallback.length) {
    const __fallbackRewritten = __applyConfigRewrites(cleanPathname, __configRewrites.fallback, __reqCtx);
    if (__fallbackRewritten) {
      if (__isExternalUrl(__fallbackRewritten)) {
        setHeadersContext(null);
        setNavigationContext(null);
        return __proxyExternalRequest(request, __fallbackRewritten);
      }
      cleanPathname = __fallbackRewritten;
      match = matchRoute(cleanPathname, routes);
    }
  }
  if (!match) {
    const notFoundResponse = await renderNotFoundPage(null, isRscRequest);
    if (notFoundResponse) return notFoundResponse;
    setHeadersContext(null);
    setNavigationContext(null);
    return new Response("Not Found", { status: 404 });
  }
  const { route, params } = match;
  setNavigationContext({
    pathname: cleanPathname,
    searchParams: url.searchParams,
    params
  });
  if (route.routeHandler) {
    const handler2 = route.routeHandler;
    const method = request.method.toUpperCase();
    const HTTP_METHODS = ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"];
    const exportedMethods = HTTP_METHODS.filter((m) => typeof handler2[m] === "function");
    if (exportedMethods.includes("GET") && !exportedMethods.includes("HEAD")) {
      exportedMethods.push("HEAD");
    }
    const hasDefault = typeof handler2["default"] === "function";
    if (method === "OPTIONS" && typeof handler2["OPTIONS"] !== "function") {
      const allowMethods = hasDefault ? HTTP_METHODS : exportedMethods;
      if (!allowMethods.includes("OPTIONS")) allowMethods.push("OPTIONS");
      setHeadersContext(null);
      setNavigationContext(null);
      return new Response(null, {
        status: 204,
        headers: { "Allow": allowMethods.join(", ") }
      });
    }
    let handlerFn = handler2[method] || handler2["default"];
    let isAutoHead = false;
    if (method === "HEAD" && typeof handler2["HEAD"] !== "function" && typeof handler2["GET"] === "function") {
      handlerFn = handler2["GET"];
      isAutoHead = true;
    }
    if (typeof handlerFn === "function") {
      try {
        const response = await handlerFn(request, { params });
        const pendingCookies = getAndClearPendingCookies();
        const draftCookie2 = getDraftModeCookieHeader();
        setHeadersContext(null);
        setNavigationContext(null);
        if (pendingCookies.length > 0 || draftCookie2) {
          const newHeaders = new Headers(response.headers);
          for (const cookie of pendingCookies) {
            newHeaders.append("Set-Cookie", cookie);
          }
          if (draftCookie2) newHeaders.append("Set-Cookie", draftCookie2);
          if (isAutoHead) {
            return new Response(null, {
              status: response.status,
              statusText: response.statusText,
              headers: newHeaders
            });
          }
          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
          });
        }
        if (isAutoHead) {
          return new Response(null, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
        }
        return response;
      } catch (err) {
        getAndClearPendingCookies();
        if (err && typeof err === "object" && "digest" in err) {
          const digest = String(err.digest);
          if (digest.startsWith("NEXT_REDIRECT;")) {
            const parts = digest.split(";");
            const redirectUrl = parts[2];
            const statusCode = parts[3] ? parseInt(parts[3], 10) : 307;
            setHeadersContext(null);
            setNavigationContext(null);
            return new Response(null, {
              status: statusCode,
              headers: { Location: new URL(redirectUrl, request.url).toString() }
            });
          }
          if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;")) {
            const statusCode = digest === "NEXT_NOT_FOUND" ? 404 : parseInt(digest.split(";")[1], 10);
            setHeadersContext(null);
            setNavigationContext(null);
            return new Response(null, { status: statusCode });
          }
        }
        setHeadersContext(null);
        setNavigationContext(null);
        console.error("[vinext] Route handler error:", err);
        reportRequestError(
          err instanceof Error ? err : new Error(String(err)),
          { method: request.method, headers: Object.fromEntries(request.headers.entries()) },
          { routePath: route.pattern }
        ).catch(() => {
        });
        return new Response(null, { status: 500 });
      }
    }
    setHeadersContext(null);
    setNavigationContext(null);
    return new Response(null, {
      status: 405,
      headers: { Allow: exportedMethods.join(", ") }
    });
  }
  const PageComponent = route.page?.default;
  if (!PageComponent) {
    setHeadersContext(null);
    setNavigationContext(null);
    return new Response("Page has no default export", { status: 500 });
  }
  let revalidateSeconds = typeof route.page?.revalidate === "number" ? route.page.revalidate : null;
  const dynamicConfig = route.page?.dynamic;
  const dynamicParamsConfig = route.page?.dynamicParams;
  const isForceStatic = dynamicConfig === "force-static";
  const isDynamicError = dynamicConfig === "error";
  if (isForceStatic) {
    setHeadersContext({ headers: new Headers(), cookies: /* @__PURE__ */ new Map() });
    setNavigationContext({
      pathname: cleanPathname,
      searchParams: new URLSearchParams(),
      params
    });
  }
  if (isDynamicError) {
    const errorMsg = 'Page with `dynamic = "error"` used a dynamic API. This page was expected to be fully static, but headers(), cookies(), or searchParams was accessed. Remove the dynamic API usage or change the dynamic config to "auto" or "force-dynamic".';
    const throwingHeaders = new Proxy(new Headers(), {
      get(target, prop) {
        if (typeof prop === "string" && prop !== "then") throw new Error(errorMsg);
        return Reflect.get(target, prop);
      }
    });
    const throwingCookies = new Proxy(/* @__PURE__ */ new Map(), {
      get(target, prop) {
        if (typeof prop === "string" && prop !== "then") throw new Error(errorMsg);
        return Reflect.get(target, prop);
      }
    });
    setHeadersContext({ headers: throwingHeaders, cookies: throwingCookies });
    setNavigationContext({
      pathname: cleanPathname,
      searchParams: new URLSearchParams(),
      params
    });
  }
  if (dynamicParamsConfig === false && route.isDynamic && typeof route.page?.generateStaticParams === "function") {
    try {
      const staticParams = await route.page.generateStaticParams({ params });
      if (Array.isArray(staticParams)) {
        const paramKeys = Object.keys(params);
        const isAllowed = staticParams.some(
          (sp) => paramKeys.every((key) => {
            const val = params[key];
            const staticVal = sp[key];
            if (staticVal === void 0) return true;
            if (Array.isArray(val)) return JSON.stringify(val) === JSON.stringify(staticVal);
            return String(val) === String(staticVal);
          })
        );
        if (!isAllowed) {
          setHeadersContext(null);
          setNavigationContext(null);
          return new Response("Not Found", { status: 404 });
        }
      }
    } catch (err) {
      console.error("[vinext] generateStaticParams error:", err);
    }
  }
  const isForceDynamic = dynamicConfig === "force-dynamic";
  let interceptOpts = void 0;
  if (isRscRequest) {
    const intercept = findIntercept(cleanPathname);
    if (intercept) {
      const sourceRoute = routes[intercept.sourceRouteIndex];
      if (sourceRoute && sourceRoute !== route) {
        const sourceMatch = matchRoute(sourceRoute.pattern, routes);
        const sourceParams = sourceMatch ? sourceMatch.params : {};
        setNavigationContext({
          pathname: cleanPathname,
          searchParams: url.searchParams,
          params: intercept.matchedParams
        });
        const interceptElement = await buildPageElement(sourceRoute, sourceParams, {
          interceptSlot: intercept.slotName,
          interceptPage: intercept.page,
          interceptParams: intercept.matchedParams
        }, url.searchParams);
        const interceptStream = renderToReadableStream(interceptElement, { onError: rscOnError });
        setHeadersContext(null);
        setNavigationContext(null);
        return new Response(interceptStream, {
          headers: { "Content-Type": "text/x-component; charset=utf-8" }
        });
      }
      interceptOpts = {
        interceptSlot: intercept.slotName,
        interceptPage: intercept.page,
        interceptParams: intercept.matchedParams
      };
    }
  }
  let element;
  try {
    element = await buildPageElement(route, params, interceptOpts, url.searchParams);
  } catch (buildErr) {
    if (buildErr && typeof buildErr === "object" && "digest" in buildErr) {
      const digest = String(buildErr.digest);
      if (digest.startsWith("NEXT_REDIRECT;")) {
        const parts = digest.split(";");
        const redirectUrl = parts[2];
        const statusCode = parts[3] ? parseInt(parts[3], 10) : 307;
        setHeadersContext(null);
        setNavigationContext(null);
        return Response.redirect(new URL(redirectUrl, request.url), statusCode);
      }
      if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;")) {
        const statusCode = digest === "NEXT_NOT_FOUND" ? 404 : parseInt(digest.split(";")[1], 10);
        const fallbackResp = await renderHTTPAccessFallbackPage(route, statusCode, isRscRequest);
        if (fallbackResp) return fallbackResp;
        setHeadersContext(null);
        setNavigationContext(null);
        const statusText = statusCode === 403 ? "Forbidden" : statusCode === 401 ? "Unauthorized" : "Not Found";
        return new Response(statusText, { status: statusCode });
      }
    }
    const errorBoundaryResp = await renderErrorBoundaryPage(route, buildErr, isRscRequest);
    if (errorBoundaryResp) return errorBoundaryResp;
    throw buildErr;
  }
  async function handleRenderError(err) {
    if (err && typeof err === "object" && "digest" in err) {
      const digest = String(err.digest);
      if (digest.startsWith("NEXT_REDIRECT;")) {
        const parts = digest.split(";");
        const redirectUrl = parts[2];
        const statusCode = parts[3] ? parseInt(parts[3], 10) : 307;
        setHeadersContext(null);
        setNavigationContext(null);
        return Response.redirect(new URL(redirectUrl, request.url), statusCode);
      }
      if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;")) {
        const statusCode = digest === "NEXT_NOT_FOUND" ? 404 : parseInt(digest.split(";")[1], 10);
        const fallbackResp = await renderHTTPAccessFallbackPage(route, statusCode, isRscRequest);
        if (fallbackResp) return fallbackResp;
        setHeadersContext(null);
        setNavigationContext(null);
        const statusText = statusCode === 403 ? "Forbidden" : statusCode === 401 ? "Unauthorized" : "Not Found";
        return new Response(statusText, { status: statusCode });
      }
    }
    return null;
  }
  if (route.layouts && route.layouts.length > 0) {
    const asyncParams = Object.assign(Promise.resolve(params), params);
    for (let li = route.layouts.length - 1; li >= 0; li--) {
      const LayoutComp = route.layouts[li]?.default;
      if (!LayoutComp) continue;
      try {
        const lr = LayoutComp({ params: asyncParams, children: null });
        if (lr && typeof lr === "object" && typeof lr.then === "function") await lr;
      } catch (layoutErr) {
        if (layoutErr && typeof layoutErr === "object" && "digest" in layoutErr) {
          const digest = String(layoutErr.digest);
          if (digest.startsWith("NEXT_REDIRECT;")) {
            const parts = digest.split(";");
            const redirectUrl = parts[2];
            const statusCode = parts[3] ? parseInt(parts[3], 10) : 307;
            setHeadersContext(null);
            setNavigationContext(null);
            return Response.redirect(new URL(redirectUrl, request.url), statusCode);
          }
          if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;")) {
            const statusCode = digest === "NEXT_NOT_FOUND" ? 404 : parseInt(digest.split(";")[1], 10);
            let parentNotFound = null;
            if (route.notFounds) {
              for (let pi = li - 1; pi >= 0; pi--) {
                if (route.notFounds[pi]?.default) {
                  parentNotFound = route.notFounds[pi].default;
                  break;
                }
              }
            }
            if (!parentNotFound) parentNotFound = null;
            const parentLayouts = route.layouts.slice(0, li);
            const fallbackResp = await renderHTTPAccessFallbackPage(
              route,
              statusCode,
              isRscRequest,
              request,
              { boundaryComponent: parentNotFound, layouts: parentLayouts }
            );
            if (fallbackResp) return fallbackResp;
            setHeadersContext(null);
            setNavigationContext(null);
            const statusText = statusCode === 403 ? "Forbidden" : statusCode === 401 ? "Unauthorized" : "Not Found";
            return new Response(statusText, { status: statusCode });
          }
        }
      }
    }
  }
  const _hasLoadingBoundary = !!(route.loading && route.loading.default);
  const _origConsoleError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("Invalid hook call")) return;
    _origConsoleError.apply(console, args);
  };
  try {
    const testResult = PageComponent({ params });
    if (testResult && typeof testResult === "object" && typeof testResult.then === "function") {
      if (!_hasLoadingBoundary) {
        await testResult;
      } else {
        testResult.catch(() => {
        });
      }
    }
  } catch (preRenderErr) {
    const specialResponse = await handleRenderError(preRenderErr);
    if (specialResponse) return specialResponse;
  } finally {
    console.error = _origConsoleError;
  }
  const rscStream = renderToReadableStream(element, { onError: rscOnError });
  if (isRscRequest) {
    const responseHeaders = { "Content-Type": "text/x-component; charset=utf-8" };
    if (params && Object.keys(params).length > 0) {
      responseHeaders["X-Vinext-Params"] = JSON.stringify(params);
    }
    if (isForceDynamic) {
      responseHeaders["Cache-Control"] = "no-store, must-revalidate";
    } else if ((isForceStatic || isDynamicError) && !revalidateSeconds) {
      responseHeaders["Cache-Control"] = "s-maxage=31536000, stale-while-revalidate";
      responseHeaders["X-Vinext-Cache"] = "STATIC";
    } else if (revalidateSeconds) {
      responseHeaders["Cache-Control"] = "s-maxage=" + revalidateSeconds + ", stale-while-revalidate";
    }
    return new Response(rscStream, { status: 200, headers: responseHeaders });
  }
  const fontData = {
    links: getSSRFontLinks(),
    styles: _getSSRFontStyles(),
    preloads: _getSSRFontPreloads()
  };
  const fontPreloads = fontData.preloads || [];
  const fontLinkHeaderParts = [];
  for (const preload of fontPreloads) {
    fontLinkHeaderParts.push("<" + preload.href + ">; rel=preload; as=font; type=" + preload.type + "; crossorigin");
  }
  const fontLinkHeader = fontLinkHeaderParts.length > 0 ? fontLinkHeaderParts.join(", ") : "";
  let htmlStream;
  try {
    const ssrEntry = await import("./ssr/index.js");
    htmlStream = await ssrEntry.handleSsr(rscStream, getNavigationContext(), fontData);
  } catch (ssrErr) {
    const specialResponse = await handleRenderError(ssrErr);
    if (specialResponse) return specialResponse;
    const errorBoundaryResp = await renderErrorBoundaryPage(route, ssrErr, isRscRequest);
    if (errorBoundaryResp) return errorBoundaryResp;
    throw ssrErr;
  }
  const draftCookie = getDraftModeCookieHeader();
  setHeadersContext(null);
  setNavigationContext(null);
  function attachMiddlewareContext(response) {
    if (draftCookie) {
      response.headers.append("Set-Cookie", draftCookie);
    }
    if (fontLinkHeader) {
      response.headers.set("Link", fontLinkHeader);
    }
    return response;
  }
  const dynamicUsedDuringRender = consumeDynamicUsage();
  const requestCacheLife = _consumeRequestScopedCacheLife();
  if (requestCacheLife && requestCacheLife.revalidate !== void 0 && revalidateSeconds === null) {
    revalidateSeconds = requestCacheLife.revalidate;
  }
  if (isForceDynamic) {
    return attachMiddlewareContext(new Response(htmlStream, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, must-revalidate"
      }
    }));
  }
  if ((isForceStatic || isDynamicError) && (revalidateSeconds === null || revalidateSeconds === 0)) {
    return attachMiddlewareContext(new Response(htmlStream, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "s-maxage=31536000, stale-while-revalidate",
        "X-Vinext-Cache": "STATIC"
      }
    }));
  }
  if (dynamicUsedDuringRender) {
    return attachMiddlewareContext(new Response(htmlStream, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, must-revalidate"
      }
    }));
  }
  if (revalidateSeconds !== null && revalidateSeconds > 0) {
    return attachMiddlewareContext(new Response(htmlStream, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "s-maxage=" + revalidateSeconds + ", stale-while-revalidate"
      }
    }));
  }
  return attachMiddlewareContext(new Response(htmlStream, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  }));
}
export {
  handler as default
};
