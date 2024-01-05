// 一定是自执行函数 因为要获得return 返回的内容 即render & useState
const React = (function () {
  let hooks = [];
  currentHook = 0;
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      currentHook = 0; // 为什么要归0？组件重新渲染，因为currentHook是+1的，在setState变化的时候，如果不置为0，则hooks找不到这个index的值，也就不会触发更新
      return Comp;
    },
    useState(initialSatte) {
      hooks[currentHook] = hooks[currentHook] || initialSatte;
      console.log("useState currentHook==", currentHook);

      const setStateHookIndex = currentHook;
      const setState = (newState) => (hooks[setStateHookIndex] = newState);
      // 为了下次执行useState的时候 就会去设置新的值
      // 其实本质是根据下标来取值的，所以什么名字并不重要 这里面就相当于数组里面每一对 都是一个set, get方法
      return [hooks[currentHook++], setState];
    },
    // depArray拿到的值永远都是最新的   deps是上一个值
    useEffect(callback, depArray) {
      console.log("hooks==", hooks);
      const hasNoDeps = !depArray; // 对应 1.
      const deps = hooks[currentHook];
      console.log("hooks currentHook==", currentHook);
      console.log("deps===", deps, "depArray==", depArray);

      const hasChangedDeps =
        !depArray?.every((el, i) => el == deps?.[i]) || !deps;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        hooks[currentHook] = depArray;

        currentHook++;
      }
    },
  };
})();

// 以上图解
/***
 * 每次useState useHooks 以后 currentHook 的索引 都会+1  所以链表就是按照代码的书写顺序 依次排开的
 *
 * hooks:[count, text, depArray, depArray]
 *       [0,     foo,  [0, foo], [foo]   ]
 */

module.exports = React;
