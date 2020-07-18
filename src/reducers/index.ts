import { combineReducers } from 'redux'

import counterReducer, { CounterState, CounterAction, CounterActionType } from './counterReducer'

export type Store = { counterState: CounterState }
export type State = CounterState
export type Action = CounterAction
export type ActionType = CounterActionType
export const ActionType = { ...CounterActionType }

const rootReducer = combineReducers({
  counterState: counterReducer
})

export default rootReducer