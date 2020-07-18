export default counterReducer

interface Counter {
    value: number
}

const initialState = {
    counters: [] as Counter[],
    selected: 0
}

export type CounterState = typeof initialState

const counterActionTypes = ['ADD_COUNTER', 'REMOVE_COUNTER', 'SELECT_COUNTER', 'INCREMENT_SELECTED', 'DECREMENT_SELECTED', 'RESET_SELECTED'] as const
export type CounterActionType = typeof counterActionTypes[number]
export const CounterActionType = counterActionTypes.reduce(<T extends CounterActionType>(o: any, t: T) => {
    o[t] = t
    return o
}, {} as { [key in CounterActionType]: key })

interface GeneralCounterAction { type: 'ADD_COUNTER' | 'REMOVE_COUNTER' | 'INCREMENT_SELECTED' | 'DECREMENT_SELECTED' | 'RESET_SELECTED' }
interface SelectCounterAction { type: 'SELECT_COUNTER', index: number }

export type CounterAction = SelectCounterAction | GeneralCounterAction
  
function counterReducer(state = initialState, action: CounterAction): CounterState {
    switch (action.type) {
        case 'ADD_COUNTER': {
            return {
                ...state,
                selected: state.counters.length,
                counters: state.counters.concat([{ value: 0 }])
            }
        }
        case 'REMOVE_COUNTER': {
            const counters = [ ...state.counters ]
            counters.splice(state.selected, 1)
            return {
                ...state,
                selected: state.selected > 0 ? state.selected-1 : 0,
                counters
            }
        }
        case 'SELECT_COUNTER': {
            return {
                ...state,
                selected: action.index
            }
            
        }
        case 'INCREMENT_SELECTED': {
            if (state.counters.length > state.selected && state.counters[state.selected].value < 9999) {
                state.counters[state.selected] = { value: state.counters[state.selected].value + 1 }
                return {
                    ...state,
                    counters: [ ...state.counters ]
                }
            }
            else return state
        }
        case 'DECREMENT_SELECTED': {
            if (state.counters.length > state.selected && state.counters[state.selected].value > 0) {
                state.counters[state.selected] = { value: state.counters[state.selected].value - 1 }
                return {
                    ...state,
                    counters: [ ...state.counters ]
                }
            }
            else return state
        }
        case 'RESET_SELECTED': {
            if (state.counters.length > state.selected && state.counters[state.selected].value !== 0) {
                state.counters[state.selected] = { value: 0 }
                return {
                    ...state,
                    counters: [ ...state.counters ]
                }
            }
            else return state
        }
        default: {
            return state
        }
    }
}