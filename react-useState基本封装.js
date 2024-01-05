const React = (function () {
  let _val;
  return {
    useState(initialSatte) {
      _val = _val || initialSatte;
      function setState(newVal) {
        _val = newVal;
      }
      return [_val, setState];
    },
  };
})();
