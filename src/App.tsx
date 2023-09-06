import Game from "./components/Game";
import { useReducer, useEffect } from "react";
import { FiPlay, FiPause, FiArrowRight, FiRefreshCw } from "react-icons/fi";

/* Context Management */
import Context, { initialContext } from "./context";
import reducer from "context/reducer";
import {
  initState,
  nextGeneration,
  setInitialGeneration,
  startGeneration,
  stopGeneration,
} from "context/actions";

import "./App.css";

function App() {
  // State is managed with a combination of useContext and useReducer
  const [state, dispatch] = useReducer(reducer, initialContext);

  useEffect(() => {
    initState(dispatch);
  }, []);

  useEffect(() => {
    // Automatcally go to next generation if play is pressed.
    if (state.started) {
      setTimeout(() => nextGeneration(dispatch), 300);
    }
  }, [state.cells.generation, state.started]);

  
  // Button commands
  const onStartClick = () => {
    startGeneration(dispatch);
  };
  const onNextClick = () => {
    nextGeneration(dispatch);
  };
  const onResetClick = () => {
    setInitialGeneration(dispatch);
  };
  const onStopClick = () => {
    stopGeneration(dispatch);
  };

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <Game height={20} width={30} />
        <div className="flex gap-2 absolute bottom-10">
          <button onClick={onResetClick} className="p-5 rounded-full bg-gray-100 mt-10 disabled:opacity-40 hover:bg-black duration-200 [&>*]:hover:stroke-white">
            <FiRefreshCw />
          </button>
          
          <button disabled={!state.started} onClick={onStopClick} className="p-5 rounded-full bg-gray-100 mt-10 disabled:opacity-40 hover:bg-black duration-200 [&>*]:hover:stroke-white">
            <FiPause />
          </button>

          <button disabled={state.started} onClick={onStartClick} className="p-5 rounded-full bg-gray-100 mt-10 disabled:opacity-40 hover:bg-black duration-200 [&>*]:hover:stroke-white">
            <FiPlay />
          </button>

          <button onClick={onNextClick} className="p-5 rounded-full bg-gray-100 mt-10 disabled:opacity-40 hover:bg-black duration-200 [&>*]:hover:stroke-white">
            <FiArrowRight />
          </button>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
