import { createContext } from "react";


export const initialContext = {
    cells: {
        initial: [],
        alive: [],
        generation: 0
    }
}

export default createContext({});

