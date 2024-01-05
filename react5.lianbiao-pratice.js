let document = {};
const React = require("./react4lianbiao");

function Counter() {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState("foo");

  React.useEffect(() => {
    console.log("effect", count, text);
  }, [count, text]);
  React.useEffect(() => (document.title = text), [text]);

  return {
    click: () => setCount(count + 1),
    noop: () => setText("Counter"),
    render: () => console.log("render", { count }),
    // render: () => {},
  };
}
let App;
App = React.render(Counter);

App.click();
App = React.render(Counter);

App.noop();
App = React.render(Counter);

App.click();
App = React.render(Counter);

/****
 * effect 0 foo // !!!!effect 初次渲染！！！不要忘记
 * render { count: 0 }
 *
 * effect 1 foo
 * render { count: 1 }
 *
 * effect 1 Counter
 * render { count: 1 }
 *
 * effect 2 Counter
 * render { count: 2 }
 */
