import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

export * from '~/reducers'
import rootReducer, { Action as ReducerAction, ActionType as ReducerActionType } from '~/reducers'

import { rootSaga, SagaActionType, SagaAction } from '../sagas/index'

export const ActionType = { ...ReducerActionType, ...SagaActionType }
export type ActionType = ReducerActionType | SagaActionType
export type Action = ReducerAction | SagaAction

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  rootReducer,
  applyMiddleware(
    sagaMiddleware,
    createLogger(),
  ),
);

sagaMiddleware.run(rootSaga)