const actions = {
  INIT_STATE: "INIT_STATE",
  TOGGLE_CELL: "TOGGLE_CELL",
  NEXT_GENERATION: "NEXT_GENERATION",
  INITIAL_GENERATION: "INITIAL_GENERATION",
  START_GENERATION: "START_GENERATION",
  STOP_GENERATION: "STOP_GENERATION"
};

export default actions;

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
