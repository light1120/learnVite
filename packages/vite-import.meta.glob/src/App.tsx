import "./App.css";
import { Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

const viewsPath = import.meta.glob("./pages/**/*.tsx");
const routes = Object.entries(viewsPath).map(
  ([path, component]: [string, any]) => {
    return {
      path: path.slice(7).slice(0, -4),
      component: lazy(component),
    };
  }
);
console.log(routes);

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          {routes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />}></Route>
          ))}
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

// v6 版本 用 Routes 替换了 Switch
// Route 中添加了 element 属性，替代 v5 中的 children

// react-router-dom : v6
// <Routes>
//  <Route></Route>
// </Routes>
// react-router-dom : v5
// <Switch>
//  <Route></Route>
// </Switch>

export default App;
