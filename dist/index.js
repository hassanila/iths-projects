"use strict";

// TODO:TEST TOP LEVEL AWAIT
// TODO: IMPORTING AND EXPORTING JS MODULES
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
var _readOnly,
  _readOnly2,
  _obj,
  _mutatorMap,
  _ref,
  _x,
  _this = void 0;
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(generator);
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineEnumerableProperties(obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }
  if (Object.getOwnPropertySymbols) {
    var objectSymbols = Object.getOwnPropertySymbols(descs);
    for (var i = 0; i < objectSymbols.length; i++) {
      var sym = objectSymbols[i];
      var desc = descs[sym];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, sym, desc);
    }
  }
  return obj;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
console.time("test");
var lastTime = performance.now();

/*
import {id} from './module.js';

console.log(id);
*/

// USE CONST BY DEFAULT
var students = [];

// UPPERCASE FOR CONFIG VARIABLES
var UPPERCASE_VAR_TEST = "TEST123";

// CLASS
var Student = /*#__PURE__*/function () {
  function Student(id, firstName, lastName, email) {
    var startDate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : new Date();
    _classCallCheck(this, Student);
    var error;
    if (!(id && firstName && lastName && email)) {
      error = "Required argument missing!";
      console.error(error);
      return error;
    }
    Object.assign(this, {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      startDate: startDate,
      testObj: {
        anotherTestObj: {
          randomkey: "lol"
        }
      }
    });
  }
  _createClass(Student, [{
    key: "changeEmail",
    value: function changeEmail(newEmail) {
      this.email = newEmail;
    }
  }]);
  return Student;
}();
var obj8345 = (_obj = {
  method1: function method1() {},
  method2: function method2() {},
  property1: 'test'
}, _defineProperty(_obj, 'property2', 'test2'), _readOnly = "readOnly", _mutatorMap = {}, _mutatorMap[_readOnly] = _mutatorMap[_readOnly] || {}, _mutatorMap[_readOnly].set = function (value) {
  console.error('CANNOT SET READ_ONLY VALUE');
}, _readOnly2 = "readOnly", _mutatorMap[_readOnly2] = _mutatorMap[_readOnly2] || {}, _mutatorMap[_readOnly2].get = function () {
  return 'HELLO';
}, _defineEnumerableProperties(_obj, _mutatorMap), _obj);

// MAKE PROPERTY READ ONLY
/*Object.defineProperty(obj8345, 'readOnly', {
    writable: false
})*/

// Generate random students
// and push them to students array
// MATH.RANDOM RETURNS A NUMBER BETWEEN 0 AND 1 (EXCLUDING 1)
var idCounter = 1;
var duplicateCounter = 0;
var min = 1,
  max = 10000;
var _loop = function _loop(_idCounter) {
  var id = "97" + String(Math.floor(Math.random() * (max - min) + min)).padStart(4, "0");
  students.some(function (o) {
    return o.id === id;
  }) && duplicateCounter++;

  // for (const { id: id2 } of students) {
  //   if (id === id2) {
  //     error = "DUPLICATE IDs NOT ALLOWED! id: " + id;

  //     console.error(error);
  //   }
  // }

  students.push(new Student(id, "Joe", "Doe", "testemail@gmail.com"));
};
for (var _idCounter = 1; _idCounter <= 10; _idCounter++) {
  _loop(_idCounter);
}
console.error("DUPLICATES: " + duplicateCounter);

// .some( ) returns true if any of the elements match the set criteria
console.log("979999 " + (students.some(function (student) {
  return student.id === "979999";
}) ? "FOUND" : "NOT FOUND!"));
console.table(students);

// OBJECT DESTRUCTURING (in this case first array element and randomkey property within anotherTestObj within testObj)
var key = students[0].testObj.anotherTestObj.randomkey;
console.log("OBJECT DESCTRUCTURING randomkey renamed to key = ".concat(key));
var array1 = [1, 30, 4, 21, 100000, 5, 7, 6, 2];
var array2 = ["alltså", "hjälp", "åka", "löpare"];

// ARRAY DESTRUCTURING
var firstvalue = array1[0]; // 1

for (var index in students) {
  for (var _key in students[index]) {
    //console.log(key + ": " + students[index][key]);
  }
  if (index < students.length - 1) {
    //console.log(index, students.length - 1);
    //console.log("---------------");
  }
}

// PROMISE
function wait(time) {
  return new Promise(function (resolve, reject) {
    if (typeof time !== 'number' /*Number.isNaN(time)*/) {
      return reject("Time is not a number");
    }
    setTimeout(function () {
      return resolve("PROMISE SUCCESS!");
    }, time * 1000);
    //setTimeout(reject.bind(this, "ERROR: 404 NOT FOUND!"), time * 1000);
  });
}

wait(1).then(function (result) {
  return console.log("%c" + result, "background-color: green; color: white; padding: .5rem; border-radius: .5rem;");
})["finally"](function () {
  // This will be run no matter whether the promise was resolved or rejected
})
// CATCH WILL BE CALLED IF PROMISE IS REJECTED OR ERROR IS THROWN
["catch"](function (e) {
  return console.error('wait promise error:', e);
});
var object1 = {
  name: "from-object1"
};
var object2 = {
  test: "from-object2"
};
var object3 = _objectSpread(_objectSpread(_objectSpread({}, object1), object2), {
  test2: "from-object3"
});
console.log(object3);
var str = "hello there!";
var arr = [];
arr[5000] = "3";
var strLength = str.length - 1;

//for (let i = 1; i <= 500; i++) {
// 18ms @ 500000 iterations with string length recalc at every iteration
//arr.push(undefined);

// 500ms @ 500000 iterations
//arr.push([...str].pop());
//}0

console.timeEnd("test");
var o = {
  date: "Object yesss"
};

//OPTIONAL CHAINING OPERATOR
var jibberish = console.log.bind(void 0, (_ref = null) !== null && _ref !== void 0 ? _ref : o && (o === null || o === void 0 ? void 0 : o["date"]));
jibberish();

// NESTED FUNCTIONS AND FUNCTION RETURNING
// <<<FUNCTION STATEMENT>>>
function test1() {
  return function () {
    return function () {
      return function () {
        return function () {
          console.log(o);
          return "YEAH";
        };
      };
    };
  };
}

// <<<FUNCTION DECLARATION/EXPRESSION>>>
var testF = function testF() {
  return null;
};
console.log(test1()()()()());
var o1 = {
  a: 777
};
console.log(o1);

// PROMISES
var promise = fetch("https://randomuser.me/api/");
promise.then(function (response) {
  return console.log("RESPONSE STATUS: " + (response === null || response === void 0 ? void 0 : response.status));
})["catch"](function (error) {
  return console.log("%cFETCH ERROR", "background-color: red; color: white; padding: .5em; border-radius: .2em");
});
console.log(promise);

// SELF CALLING FUNCTION
(function () {
  console.log("test");
})();

// SET UNIQUE ARRAY ITERATOR
// SPREAD & REST OPERATOR
var duplicatesArr = ["a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c"];
var duplicatesString = "abc abc abc abc abc abc abc abc abc abc abc abc abc abc";
var uniquesArr = _toConsumableArray(new Set(duplicatesArr));
var uniqueString = _toConsumableArray(new Set(duplicatesString)).join("").trimEnd();
console.log(duplicatesArr, uniquesArr);
console.log(duplicatesString);
console.log(uniqueString);

//debugger;

// MILLISECONDS DIFFERENCE
var diff = Math.round(performance.now() - lastTime);
console.log("Diff: ".concat(diff, "ms"));

// REMAINDER
console.log("Remainder check: " + String(5 % 4 === 1).toUpperCase());

// STRING REPLACEMENTS
console.log("Hello %s! What's up this %s? Call me at %s", "Someone", "Friday", "0720549244");

// GENERATOR FUNCTION
// RETURNS AN ITERATOR THAT WILL YIELD A DIFFERENT VALUE EACH TIME .next is invoked on it
// YIELD PAUSES THE GENERATOR FUNCTION
function generator() {
  return _regeneratorRuntime().wrap(function generator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return "first";
        case 2:
          _context.next = 4;
          return "second";
        case 4:
          _context.next = 6;
          return 3;
        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

// LOGICAL OR, AND & NULLISH ASSIGNMENTS
var x = 1,
  xBefore = x;
x || (x = "||"); // SAME AS x || (x = "||"), NOT x = x || "||", it evaluates only if x has a falsy value
(_x = x) !== null && _x !== void 0 ? _x : x = "??"; // it evaluates only if x has a nullish (null or undefined) value
x && (x = "&&"); // it evaluates only if x has a truthy value

// FALSY VALUES
/*
*
* ""
* false
* NaN
* null
* undefined
* 0
*
* */

console.log("xBefore: %s\nxAfter: %s", xBefore, x);

// DEEP OBJECT CLONING WITHOUT REFERENCES TO OLD OBJECT (ES13/2022)
//structuredClone(object)

// OBJECT CLONING (NO DEEP CLONING)
/* const food = { beef: "🥩", bacon: "🥓" };
{ ...food }
Object.assign({}, food);
JSON.parse(JSON.stringify(food))
 */

// OBJ DEEP CLONING VIA JSON (WILL IGNORE FUNCTIONS)
// var newObject = JSON.parse(JSON.stringify(oldObject))

// MULTIPLE VARIABLES SAME VALUE DECLARATION
var m, u, l, t, i;
m = u = l = t = i = "YES";
console.log(m, u, l, t, i);

// VAR (FUNCTION SCOPE or global) VS LET (BLOCK SCOPE or function or global)
{
  var varvar = "var";
  var _letlet = "let";
  console.log("var inside block: " + varvar);
  console.log("let inside block: " + _letlet);
}
try {
  console.log("var outside block: " + varvar);
  console.log("let outside block: " + letlet);
} catch (_ref2) {
  var e = _ref2.message;
  console.log("let outside block: " + e);
} finally {
  // This will always run after
}

// LEXICAL SCOPING MEANS THAT A FUNCTION OR A BLOCK WILL REMEMBER
// ALL THE VARIABLES/FUNCTIONS IN THE SCOPE CHAIN (PARENTS)
(function () {
  // VAR WILL HAVE THIS FUNCTION AS IT'S SCOPE, if we didn't have it inside a function
  // it would have a global scope

  for (var i = 0; i < 10; i++) {
    // same as if var was initialized here everytime
    setTimeout(function () {
      return console.log("VAR SETTIMEOUT: " + i);
    }, i * 1000);
  }
  var _loop2 = function _loop2(_i) {
    //LET WILL HAVE THIS BLOCK AS IT'S SCOPE
    // let will also be initialized here everytime but to this block scope only
    setTimeout(function () {
      return console.log("LET SETTIMEOUT: " + (_i + 1));
    }, _i * 1000);
  };
  for (var _i = 0; _i < 10; _i++) {
    _loop2(_i);
  }

  // let i won't exist here because it has a block scope
  // var i will exist here and be the last value that it was set to, var i has a function scope
})();

// REST PARAMETERS AND SPREAD OPERATOR
(function () {
  var _console;
  for (var _len = arguments.length, rest = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    rest[_key2] = arguments[_key2];
  }
  return (_console = console).log.apply(_console, ["REST PARAMETERS:"].concat(rest));
})("param1, param2, param3");

/** ARROW FUNCTIONS THIS, ARROW FUNCTIONS SHOULD NOT BE USED AS METHODS BECAUSE
THEY DON'T CREATE A NEW SCOPE, AND THEY DON'T HAVE THEIR OWN THIS, THEY HAVE GLOBAL SCOPE?
call, apply and bind does not bind this in arrow functions?
 **/
var obj = {
  // does not create a new scope
  scopetest: 10,
  b: function b() {
    var _this$scopetest;
    return console.log((_this$scopetest = _this.scopetest) !== null && _this$scopetest !== void 0 ? _this$scopetest : "ARROW FUNCTIONS HAVE GLOBAL THIS");
  },
  c: function c() {
    console.log(typeof this.scopetest !== "undefined" && "NORMAL FUNCTIONS HAVE LEXICAL SCOPE THIS");
  }
};
obj.b();
obj.c();

// CONTINUE
for (var _key3 in obj) {
  if (!obj.hasOwnProperty(_key3)) continue;
  console.log(_key3);
}

// TODO: TRY TO UNDERSTAND
// REDUCE OBJS AND ARRAYS
// https://itnext.io/explode-an-array-into-a-deeply-nested-object-with-this-simple-recursive-function-4094ac1eeb8b
/*
const explode = (array, key, ...rest) =>
    array.reduce((acc, item) => ({
        ...acc,
        [item[key]]: rest.length ? {
            ...acc[item[key]],
            ...explode([item], ...rest)
        } : item
    }), {})*/

// USING A VARIABLE AS A KEY NAME
var keyName = 'test';
var newObj = _defineProperty({}, keyName, 'value-here');

// OBJ CONDITIONALLY ADD PROPERTY INLINE
var obj345 = _objectSpread({}, true && {
  someProperty: 'value'
});

/** REFERENCE VS VALUE COPY
PRIMITIVES ARE COPIED AS VALUE
OBJS AND ARRS ARE REFERENCED, they "disconnect" only if new value is assigned to them
FILL ARRAY WITH INDEX NR + 1
 **/
var arr346 = new Array(10).fill(0).reduce(function (prev, curr, i) {
  return prev.push(i + 1) && prev;
}, []);
console.log('arr346', arr346);
var arr777 = arr346;
arr777.push('THIS IS FROM ARR 777 PUSH');
console.log('arr777:', arr777);
console.log('arr346:', arr346);

// CONSOLE.ASSERT() FOR TESTING
console.assert(true === false, 'TRUE IS NOT FALSE');

// ADDING NUMBERS WITH DECIMALS
console.log('ADDING NUMBERS WITH DECIMALS, this should be 0.0065', 0.005 + 0.0015);

// TOP LEVEL AWAIT, ONLY VALID IN JS MODULES
// THIS CODE WILL RESOLVE AFTER 20s
/*console.log('%cAWAIT', 'color: green;')
await new Promise((resolve, reject) => setTimeout(resolve, 20000))*/

// NUMBER WITH X AMOUNT OF DECIMALS TO FIXED SIZE
// IT WILL AUTO ROUND
console.log('NUMBER TOFIXED: ', 0.459939.toFixed(2));

// MAP, can have objects, booleans etc as keys, must use set, get, has, delete
// .size instead of .length
var map = new Map();
map.set(true, 'map value for true');
map.set(undefined, 'map value for undefined');
console.log('map', map.get(true));
console.log('map', map.get(undefined));

// FETCH
fetch('https://avancera.app/cities/', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'GET'
}).then(function (response) {
  return response.json();
}).then(function (arr) {
  return console.log(arr[0]);
})["catch"](function (error) {
  return console.error('FETCH ERROR', error);
});

// ASYNC FUNCTIONS
// THEY RETURN A PROMISE BY DEFAULT?
function asyncTest() {
  return _asyncTest.apply(this, arguments);
}
function _asyncTest() {
  _asyncTest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return new Promise(function (resolve, reject) {
              setTimeout(resolve, 5000);
            });
          case 2:
            console.log('This should be logged after 5s');
          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));
  return _asyncTest.apply(this, arguments);
}
asyncTest();

/** THIS WILL CONSOLE.LOG UNDEFINED
IF LET OR CONST WAS USED IT WOULD THROW AN ERROR: FOO IS NOT DEFINED, aka TDZ, temporal dead zone
THIS IS DUE TO HOISTING, WHERE VARIABLES ARE INITIATED (ALLOCATED MEMORY) AND FUNCTION STATEMENTS MOVED TO THE TOP
and FUNCTION STATEMENTS ARE INITIATED BEFORE THE CODE EXECUTES
 **/
var foo = 1;
var foobar = function foobar() {
  console.log(foo); //undefined
  var foo = 2;
};
foobar();
try {
  var foo2 = 1;
  var foobar2 = function foobar2() {
    console.log(foo2); // Cannot access 'foo2' before initialization // Because of TDZ
    var foo2 = 2;
  };
  foobar2();
} catch (e) {
  console.error(e);
}

// will log undefined as void runs the statement and then returns undefined and the statement will not be defined
console.log(void true);

// this function statement will not be defined because of void, it can be run inline but won't be defined
try {
  void function hellothere() {
    console.log('%cFUNCTION', 'color:red;');
  }();
  console.log(hellothere); // ReferenceError: hellothere is not defined
} catch (e) {
  console.error(e);
}

// MORE OBJECT/ARRAY DESTRUCTURING
var body = {
  data: [{
    occasions: [{
      examinationTypeId: 3
    }, {
      examinationTypeId: 4
    }]
  }]
};
var _body$data = _slicedToArray(body.data, 1),
  _body$data$0$occasion = _slicedToArray(_body$data[0].occasions, 2),
  occasion1 = _body$data$0$occasion[0],
  occasion2 = _body$data$0$occasion[1]; //same as const occasion1 = body.data[0].occasions[0], occasion2 = body.data[0].occasions[1];

// This will log A, D, C, B
// setTimeout is async, so the function callback gets added to the end of the call stack / queue
console.log('A');
setTimeout(function () {
  return console.log('B');
}, 50);
setTimeout(function () {
  return console.log('C');
}, 0);
console.log('D');

// PASS BY REFERENCE VS PASS BY VALUE
var byReference = {}; // objs and arrays get passed as reference
var byValue = 'string'; // any primitive type will be passed by value
var someFunction = function someFunction(parameter1, parameter2) {
  parameter1.someProperty = 'Hello'; // this will change the object called byReference

  parameter1 = {}; // This will overwrite the object parameter1 but only locally in this function scope
  parameter2 = 30; /* This will overwrite the string parameter2 but only locally in this function scope
                      and because parameter2 is passed by value it cannot be changed inside this function scope */
};

someFunction(byReference, byValue);
console.log(byReference); // {someProperty: 'Hello'}
console.log(byValue); // 'string';
//# sourceMappingURL=index.js.map