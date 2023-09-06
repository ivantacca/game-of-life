export default function (prevState: object, newState: object, action: object) {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
        logPrevState(prevState)
        logAction(action)
        logNextState(newState)
    }
}

const logAction = (action: object) => {
    console.log('%c action', 'color: #03A9F4; font-weight: bold', action)
}

const logPrevState = (state: object) => {
    console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', state)
}

const logNextState = (state: object) => {
    console.log('%c next state', 'color: #4CAF50; font-weight: bold', state)
    console.groupEnd()
}