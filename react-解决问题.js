// 1. 为什么hooks 不能嵌套if
const React = require("./react4lianbiao");

function Counter() {
  if (Math.random() > 0.5) {
    const num = useRef(0);
  }
  React.useEffect(/**effect */);
  return; //...
}

/***
 * first render
 * 如果math.random > 0.5 [ num ,effect]
 *
 * second render
 * 如果math.random < 0.5 走到了effect中，取值的时候，就会取到num的值了，而不是effect本来要变化的值   [effect]
 *
 */

// 2. 为什么只能在函数组件中调用，不能在外部组件中 或者class中调用， 如果在外面调用的话 会出现什么问题
/**
 * 如果useState是存在数组里面的话，在外部调用，就会把你数组里面的你不知道的某个位置插入一个值，
 * 因为你不在这个函数的作用域里边，那你就不知道当前react到底执行在哪，其实数组是不知道的
 * 你这时候往他的数组里面插入一个值，那你下次再去渲染这个函数的时候，他可能就会取到一个奇奇怪怪的值，包括调用这些在这个里面都是会出错的
 * 所以hooks 也很依赖调用顺序
 */

React.useState("hello world");

function Comp() {
  const [text, settext] = React.useState("www.baidu.com");
  // 在外面调用了useState 我们刚才实现的时候  最开始index = 0，所以这里的SetText set是set不到正确的值的

  return { type: (txt) => settext(txt), render: () => console.log(txt) };
}
