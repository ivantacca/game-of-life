import actions from "./actions";
import logger from "./logger";
import { initialContext } from "./index";

import { toggleInitialCell, getNextGeneration, getInitialFromFile, getAliveFromGeneration } from "utils/reducer";

const reducer = (state: any, action: any) => {
  let nextState;

  switch (action.type) {
    case actions.INIT_STATE:
      nextState = {
        ...initialContext,
        ...action.state,
        cells: {
          ...state.cells,
          alive: state.cells.initial,
        },
      };
      break;

    case actions.TOGGLE_CELL:
      const newCells = toggleInitialCell(
        state.cells.generation === 0 ? state.cells.initial : state.cells.alive,
        action.cell
      );
      nextState = {
        ...state,
        cells: {
          ...state.cells,
          initial: newCells,
          alive: newCells,
          generation: 0,
        },
        started: false,
      };
      break;

    case actions.NEXT_GENERATION:
      const newGen = getNextGeneration(state.cells.alive);
      nextState = {
        ...state,
        cells: {
          ...state.cells,
          alive: newGen,
          generation: state.cells.generation + 1,
        },
      };
      break;

    case actions.INITIAL_GENERATION:
      nextState = {
        ...state,
        cells: {
          ...state.cells,
          alive: state.cells.initial,
          generation: 0
        },
      };
      break;

    case actions.START_GENERATION:
      nextState = {
        ...state,
        started: true,
      };
      break;

    case actions.STOP_GENERATION:
      nextState = {
        ...state,
        started: false,
      };
      break;

    case actions.SET_INPUT:
      const initial = getInitialFromFile(action.data)
      const alive = action.data.generation === 0 ? initial : getAliveFromGeneration(initial,action.data.generation);
      
      nextState = {
        ...state,
        input: action.data,
        cells: {
          ...state.cells,
          alive,
          initial,
          generation: action.data.generation
        }
      }
      break;

    default:
      return state;
  }

  logger(state, nextState, action);

  return nextState;
};

export default reducer;
