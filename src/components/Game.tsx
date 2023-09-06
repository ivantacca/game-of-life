import { useContext } from "react"
import Context from "context";

import { toggleCell } from 'context/actions';

// Game Board
export default function Game({ height, width }: { height: number; width: number }) {
    return <div className="flex flex-col gap-1">
        {Array.from({ length: height }, (_, rowIndex) => {
            return <div key={`y-${rowIndex}`} className="flex gap-1">
                {Array.from({ length: width }, (_, columnIndex) => {
                    return <Cell x={columnIndex} y={rowIndex} key={`${columnIndex}-${rowIndex}`} />;
                })}
            </div>
        })}
    </div>
}

// Game Board Cells
function Cell({ x, y }: { x: number, y: number }) {
    const { state, dispatch } = useContext<any>(Context);

    const onCellPress = () => {
        toggleCell(dispatch, { x, y })
    }

    const getCellClassName = () => {
        const isActive = state.cells.alive.find((c:any) => c.x === x && c.y === y)
        const className = "game-cell h-5 w-5 border border-gray-300"
        
        // Add alive cell background-color className
        return isActive ? className + ' bg-black' : className
    }

    return <div onClick={onCellPress} className={getCellClassName()}></div>
}