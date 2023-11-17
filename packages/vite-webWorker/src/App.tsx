import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { mockBrowsweCrash, memoryMonitorWorker } from "./app";

function App() {
  const [count, setCount] = useState(0);
  const [bigData, setBigData] = useState<string[]>([]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img
            src={viteLogo}
            elementtiming="big-image"
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            elementtiming="big-image"
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => memoryMonitorWorker.postMessage("start")}>
          start memoryMonitorWorker
        </button>
        <button onClick={() => setBigData(mockBrowsweCrash())}>
          mock crash {bigData.length}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
