(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "../dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;let ShortKey = {}
let mapFunctions = {}
let objAvoided = []
let objAllowed = []
let elementAvoided = []
let keyPressed = false

const parseValue = (value) => {
  value = typeof value === 'string' ? JSON.parse(value.replace(/\'/gi, '"')) : value
  if (value instanceof Array) {
    return {'': value};
  }
  return value
}

const bindValue = (value, el, binding, vnode) => {
  const push = binding.modifiers.push === true
  const avoid = binding.modifiers.avoid === true
  const focus = !binding.modifiers.focus === true
  const once = binding.modifiers.once === true
  const allow = binding.modifiers.allow === true
  if (avoid) {
    objAvoided.push(el)
  } else if (allow) {
    objAvoided = objAvoided.filter(obj => obj !== el)
    objAllowed = Array.from(new Set([...objAllowed, el]))
  } else {
    mappingFunctions({b: value, push, once, focus, el: vnode.elm})
  }
}

const unbindValue = (value, el) => {
  for (let item in value) {
    const k = value[item].join('')
    const idxElm = mapFunctions[k].el.indexOf(el)
    if (mapFunctions[k].el.length > 1 && idxElm > -1) {
      mapFunctions[k].el.splice(idxElm, 1)
    } else {
      delete mapFunctions[k]
    }

    objAvoided = objAvoided.filter(itm => {
      return !itm === el;
    })
    objAllowed = objAllowed.filter(itm => {
      return !itm === el;
    })
  }
}

ShortKey.install = (Vue, options) => {
  elementAvoided = [...(options && options.prevent ? options.prevent : [])]
  Vue.directive('shortkey', {
    bind: (el, binding, vnode) => {
      // Mapping the commands
      const value = parseValue(binding.value)
      bindValue(value, el, binding, vnode)
    },
    update: (el, binding, vnode) => {
      const oldValue = parseValue(binding.oldValue)
      unbindValue(oldValue, el)

      const newValue = parseValue(binding.value)
      bindValue(newValue, el, binding, vnode)
    },
    unbind: (el, binding) => {
      const value = parseValue(binding.value)
      unbindValue(value, el)
    }
  })
}

ShortKey.decodeKey = (pKey) => {
  let k = ''
  if (pKey.key === 'Shift' || pKey.shiftKey) { k += 'shift' }
  if (pKey.key === 'Control' || pKey.ctrlKey) { k += 'ctrl' }
  if (pKey.key === 'Meta'|| pKey.metaKey) { k += 'meta' }
  if (pKey.key === 'Alt' || pKey.altKey) { k += 'alt' }
  if (pKey.key === 'ArrowUp') { k += 'arrowup' }
  if (pKey.key === 'ArrowLeft') { k += 'arrowleft' }
  if (pKey.key === 'ArrowRight') { k += 'arrowright' }
  if (pKey.key === 'ArrowDown') { k += 'arrowdown' }
  if (pKey.key === 'AltGraph') { k += 'altgraph' }
  if (pKey.key === 'Escape') { k += 'esc' }
  if (pKey.key === 'Enter') { k += 'enter' }
  if (pKey.key === 'Tab') { k += 'tab' }
  if (pKey.key === ' ') { k += 'space' }
  if (pKey.key === 'PageUp') { k += 'pageup' }
  if (pKey.key === 'PageDown') { k += 'pagedown' }
  if (pKey.key === 'Home') { k += 'home' }
  if (pKey.key === 'End') { k += 'end' }
  if (pKey.key === 'Delete') { k += 'del' }
  if (pKey.key === 'Insert') { k += 'insert' }
  if (pKey.key === 'NumLock') { k += 'numlock' }
  if (pKey.key === 'CapsLock') { k += 'capslock' }
  if (pKey.key === 'Pause') { k += 'pause' }
  if (pKey.key === 'ContextMenu') { k += 'contextmenu' }
  if (pKey.key === 'ScrollLock') { k += 'scrolllock' }
  if (pKey.key === 'BrowserHome') { k += 'browserhome' }
  if (pKey.key === 'MediaSelect') { k += 'mediaselect' }
  if ((pKey.key && pKey.key !== ' ' && pKey.key.length === 1) || /F\d{1,2}|\//g.test(pKey.key)) k += pKey.key.toLowerCase()
  return k
}

const dispatchShortkeyEvent = (pKey) => {
  const e = new Event('shortkey', { bubbles: false })
  if (mapFunctions[pKey].key) e.srcKey = mapFunctions[pKey].key
  const elm = mapFunctions[pKey].el
  elm[elm.length - 1].dispatchEvent(e)
}

ShortKey.keyDown = (pKey) => {
  if ((!mapFunctions[pKey].once && !mapFunctions[pKey].push) || (mapFunctions[pKey].push && !keyPressed)) {
    dispatchShortkeyEvent(pKey)
  }
}

if (true) {
  ;(function () {
    document.addEventListener('keydown', (pKey) => {
      const decodedKey = ShortKey.decodeKey(pKey)

      // Check evict
      if (filteringElement(pKey)) {
        pKey.preventDefault()
        pKey.stopPropagation()
        if (mapFunctions[decodedKey].focus) {
          ShortKey.keyDown(decodedKey)
          keyPressed = true
        } else if (!keyPressed) {
          const elm = mapFunctions[decodedKey].el
          elm[elm.length - 1].focus()
          keyPressed = true
        }
      }
    }, true)

    document.addEventListener('keyup', (pKey) => {
      const decodedKey = ShortKey.decodeKey(pKey)
      if (filteringElement(pKey)) {
        pKey.preventDefault()
        pKey.stopPropagation()
        if (mapFunctions[decodedKey].once || mapFunctions[decodedKey].push) {
          dispatchShortkeyEvent(decodedKey);
        }
      }
      keyPressed = false
    }, true)
  })()
}

const mappingFunctions = ({b, push, once, focus, el}) => {
  for (let key in b) {
    const k = b[key].join('')
    const elm = mapFunctions[k] && mapFunctions[k].el ? mapFunctions[k].el : []
    elm.push(el)
    mapFunctions[k] = {
      push,
      once,
      focus,
      key,
      el: elm
    }
  }
}

const filteringElement = (pKey) => {
  const decodedKey = ShortKey.decodeKey(pKey)
  const objectAllow = objAllowed.find(r => r === document.activeElement)
  const objectAvoid = objAvoided.find(r => r === document.activeElement)
  const elementSeparate = checkElementType()
  const elementTypeAvoid = elementSeparate.avoidedTypes
  const elementClassAvoid = elementSeparate.avoidedClasses
  const filterTypeAvoid = elementTypeAvoid.find(r => document.activeElement && r === document.activeElement.tagName.toLowerCase())
  const filterClassAvoid = elementClassAvoid.find(r => document.activeElement && r === '.' + document.activeElement.className.toLowerCase())
  return (objectAllow && mapFunctions[decodedKey]) || (!objectAvoid && mapFunctions[decodedKey] && !filterTypeAvoid && !filterClassAvoid)
}

const checkElementType = () => {
  let elmTypeAvoid = []
  let elmClassAvoid = []
  elementAvoided.forEach(r => {
    const dotPosition = r.indexOf('.')
    if (dotPosition === 0) {
      elmClassAvoid.push(r)
    } else if (dotPosition > 0) {
      elmTypeAvoid.push(r.split('.')[0])
      elmClassAvoid.push('.' + r.split('.')[1])
    } else {
      elmTypeAvoid.push(r)
    }
  })
  return {avoidedTypes: elmTypeAvoid, avoidedClasses: elmClassAvoid}
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = ShortKey;
} else if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return ShortKey; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  window.ShortKey = ShortKey;
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map