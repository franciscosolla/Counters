// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';

// Imports: Redux Sagas
import { CounterSagaActionType, CounterSagaAction, watchAddCounter, watchRemoveCounter, watchSelectCounter, watchIncrementSelected, watchDecrementSelected, watchResetSelected } from './counterSaga';

// Redux Saga: Root Saga
export function* rootSaga () {
  yield all([
    fork(watchAddCounter),
    fork(watchRemoveCounter),
    fork(watchSelectCounter),
    fork(watchIncrementSelected),
    fork(watchDecrementSelected),
    fork(watchResetSelected)
  ]);
};

export const SagaActionType = CounterSagaActionType
export type SagaActionType = CounterSagaActionType

export type SagaAction = CounterSagaAction