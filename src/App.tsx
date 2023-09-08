import { useReducer, useEffect } from "react";

/* Components */
import Game from "./components/Game";
import Controller from "components/Controller";

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
import FileInput from "components/FileInput";

function App() {
  // State is managed with a combination of useContext and useReducer
  const [state, dispatch] = useReducer(reducer, initialContext);

  useEffect(() => {
    // Init app state
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
        {state.input ? (
          <>
            <Game height={state.input.height} width={state.input.width} />
            <Controller
              onStartClick={onStartClick}
              onNextClick={onNextClick}
              onResetClick={onResetClick}
              onStopClick={onStopClick}
            />
          </>
        ) : <FileInput />}
      </div>
    </Context.Provider>
  );
}

export default App;
