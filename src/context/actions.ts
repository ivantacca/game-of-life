// Actions for state update
const actions = {
  INIT_STATE: "INIT_STATE",
  TOGGLE_CELL: "TOGGLE_CELL",
  NEXT_GENERATION: "NEXT_GENERATION",
  INITIAL_GENERATION: "INITIAL_GENERATION",
  START_GENERATION: "START_GENERATION",
  STOP_GENERATION: "STOP_GENERATION",
  SET_INPUT: "SET_INPUT",
};

export default actions;

// Functions to trigger state update
export function initState(dispatch: any) {
  dispatch({ type: actions.INIT_STATE });
}

export function toggleCell(dispatch: any, data: { x: number; y: number }) {
  dispatch({ type: actions.TOGGLE_CELL, cell: data });
}

export function nextGeneration(dispatch: any) {
  dispatch({ type: actions.NEXT_GENERATION });
}

export function setInitialGeneration(dispatch: any) {
  dispatch({ type: actions.INITIAL_GENERATION });
}

export function startGeneration(dispatch: any) {
  dispatch({ type: actions.START_GENERATION });
}

export function stopGeneration(dispatch: any) {
  dispatch({ type: actions.STOP_GENERATION });
}

export function setInput(dispatch: any, data: any) {
  if (
    data.height &&
    data.width &&
    data.population_state &&
    typeof data.height === "number" &&
    typeof data.width === "number" &&
    typeof data?.generation === "number" &&
    Array.isArray(data.population_state) &&
    data.population_state.length === data.height &&
    data.population_state.every((r: Array<number>) => r.length === data.width)
  ) {
    dispatch({ type: actions.SET_INPUT, data });
    return true;
  }
  return false;
}
