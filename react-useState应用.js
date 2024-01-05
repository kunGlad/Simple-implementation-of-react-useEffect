// 一定是自执行函数 因为要获得return 返回的内容 即render & useState
const React = (function () {
  let _val;
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

        return [_val, setState];
      }

      return [_val, setState];
    },
  };
})();

function Counter() {
  const [counter, setCounter] = React.useState(0);
  return {
    click: () => {
      console.log("click", counter);
      setCounter(counter + 1);
    },
    // 简化的 相当于React.Dom(render)
    render: () => console.log("render", { counter }),
  };
}

let App;
App = React.render(Counter); // 首次调用
App.click(); // 改变值调用
App = React.render(Counter);
App.click(); // 改变值调用
App = React.render(Counter);

/****
 * render { counter: 0 }
 * click 0
 * render { counter: 1 }
 * click 1
 * render { counter: 2 }
 */
