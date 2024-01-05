const React = require("./react-useEffect").default;

function Counter() {
  const [count, setCount] = React.useState(0);
  const getCount = () => {
    console.log("getCount", count);
  };
  // 加上useEffect测试代码
  React.useEffect(() => {
    console.log("effect", count);
  }, [count]);

  return {
    click: () => {
      setCount(count + 1);
      getCount();
    },
    noop: () => {
      // 值不变 所以不会触发effect
      setCount(count);
      getCount();
    },
    render: () => console.log("render", { count }),
  };
}

let App;
App = React.render(Counter); // 首次调用
console.log("执行第一次click");
App.click();
App = React.render(Counter);
console.log("执行noop");
App.noop();
App = React.render(Counter);
console.log("执行第二次click");
App.click();
App = React.render(Counter);

/*****
 * effect 0  // 首次渲染
 * render { count:0 } // 首次渲染
 *
 * 执行第一次click
 * getCount: 0 --click
 * effect 1
 * render { count:1 }
 *
 * 执行noop
 * getCount: 1 --noop
 * render { count:1 }
 *
 * 执行第二次click
 * getCount: 1 --click
 * effect 2
 * render { count:2 }
 */
