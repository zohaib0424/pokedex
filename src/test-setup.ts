import '@testing-library/jest-dom';

// Mock ResizeObserver for Recharts
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock getBoundingClientRect for Recharts ResponsiveContainer
Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
  configurable: true,
  value: function() {
    return {
      width: this.offsetWidth || 800,
      height: this.offsetHeight || 600,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    };
  },
});

// Set default offsetWidth and offsetHeight for elements
Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  configurable: true,
  get: function() {
    return parseFloat(this.style.width) || 800;
  },
});

Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  configurable: true,
  get: function() {
    return parseFloat(this.style.height) || 600;
  },
});
