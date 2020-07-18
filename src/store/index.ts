import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

export * from '~/reducers'
import rootReducer, { Action as ReducerAction, ActionType as ReducerActionType } from '~/reducers'

import { rootSaga, SagaActionType, SagaAction } from '../sagas/index'

export const ActionType = { ...ReducerActionType, ...SagaActionType }
export type ActionType = ReducerActionType | SagaActionType
export type Action = ReducerAction | SagaAction

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  persistReducer({ key: 'root', storage: AsyncStorage}, rootReducer),
  applyMiddleware(
    sagaMiddleware,
    createLogger(),
  ),
);

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)