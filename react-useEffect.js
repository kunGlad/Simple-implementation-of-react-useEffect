// 一定是自执行函数 因为要获得return 返回的内容 即render & useState
const React = (function () {
  // 这里加下 闭包存储deps
  let _val, _deps;
  return {
    // 加个render方法 模拟React dom挂载
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState(initialSatte) {
      _val = _val || initialSatte;
      function setState(newVal) {
        _val = newVal;
      }

      return [_val, setState];
    },
    // 在 实现useState的基础上 实现useEffect
    // 1. 如果没有依赖数组 即depArray不写 useEffect 的 callback执行
    // 2. 依赖数组 和 闭包中存储的旧数组 作比较 有一个不相等 则 useEffect 的 callback执行
    // 3. !_deps 代表首次渲染， 即_deps为undefined ，depArray = []  ,every作比较为false， 取!false 为true, 执行callback
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray; // 对应 1.
      // 全等号需要类型转换做比较的时候使用。这里应该用全等号，但是我不会打，JavaScript在两个等号时是内部做类型转换的，如果你不需要这样，就用三个等号。
      const hasChangedDeps =
        !depArray?.every((el, i) => el == _deps?.[i]) || !_deps;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        _deps = depArray;
      }
    },
  };
})();

exports = exports.default = React;
