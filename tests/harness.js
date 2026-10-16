'use strict';
const vm = require('node:vm');

function createHarness(html, initialStorage = {}) {
  const inline = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!inline) throw new Error('Nie znaleziono głównego skryptu inline w index.html');

  const listeners = new Map();
  const storage = new Map(Object.entries(initialStorage));
  const noop = () => {};
  const ctx = new Proxy({
    createLinearGradient: () => ({ addColorStop: noop }),
    createRadialGradient: () => ({ addColorStop: noop }),
    measureText: () => ({ width: 10 }),
    canvas: { width: 960, height: 540 }
  }, {
    get(target, prop) {
      if (prop in target) return target[prop];
      return noop;
    },
    set(target, prop, value) { target[prop] = value; return true; }
  });

  class FakeElement {
    constructor(id = '') {
      this.id = id; this.style = {}; this.dataset = {}; this.children = [];
      this.listeners = new Map(); this.textContent = ''; this.innerHTML = '';
      this.className = ''; this.disabled = false; this.hidden = false;
      this.width = 960; this.height = 540; this.value = '';
    }
    addEventListener(type, fn) {
      const list = this.listeners.get(type) || [];
      list.push(fn); this.listeners.set(type, list);
    }
    dispatch(type, event = {}) {
      for (const fn of this.listeners.get(type) || []) fn({ preventDefault: noop, ...event });
    }
    append(child) { this.children.push(child); }
    appendChild(child) { this.append(child); }
    getContext() { return ctx; }
    setAttribute(name, value) { this[name] = value; }
    focus() {}
    remove() {}
  }

  const elements = new Map();
  for (const match of html.matchAll(/\bid=["']([^"']+)["']/g)) {
    if (!elements.has(match[1])) elements.set(match[1], new FakeElement(match[1]));
  }
  const getElementById = id => {
    if (!elements.has(id)) elements.set(id, new FakeElement(id));
    return elements.get(id);
  };
  const document = {
    getElementById,
    createElement: tag => new FakeElement(tag),
    querySelector: selector => selector.startsWith('#') ? getElementById(selector.slice(1)) : null,
    querySelectorAll: () => [],
    addEventListener(type, fn) {
      const list = listeners.get('document:' + type) || [];
      list.push(fn); listeners.set('document:' + type, list);
    }
  };
  const localStorage = {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); },
    removeItem(key) { storage.delete(key); },
    clear() { storage.clear(); }
  };
  const window = {
    addEventListener(type, fn) {
      const list = listeners.get(type) || [];
      list.push(fn); listeners.set(type, list);
    },
    dispatch(type, event = {}) {
      for (const fn of listeners.get(type) || []) fn({ preventDefault: noop, repeat: false, ...event });
    },
    localStorage, __iskra3dActive: false, devicePixelRatio: 1
  };
  const sandbox = {
    window, document, localStorage, console, Math, JSON, Number, Array, Object, Set, Map,
    Date, parseInt, parseFloat, isFinite, confirm: () => true, alert: noop,
    requestAnimationFrame: noop, cancelAnimationFrame: noop,
    performance: { now: () => 0 }, URLSearchParams,
    setTimeout: noop, clearTimeout: noop
  };
  vm.createContext(sandbox);
  const hookAt = inline[1].lastIndexOf('})();');
  if (hookAt < 0) throw new Error('Nie można wstrzyknąć hooka testowego do IIFE gry');
  const testableSource = inline[1].slice(0, hookAt) +
    'window.__testEval = (expression) => eval(expression);\\n' +
    inline[1].slice(hookAt);
  vm.runInContext(testableSource, sandbox, { timeout: 3000, filename: 'index.inline.js' });

  return {
    evaluate(expression) { return window.__testEval(expression); },
    dispatch(type, event) { window.dispatch(type, event); },
    element: getElementById, storage, context: sandbox
  };
}
module.exports = { createHarness };
