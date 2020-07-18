import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { ActionType as ReducerActionType } from '~/reducers'


const sagaActionTypes = [
    'ADD_COUNTER_ASYNC',
    'REMOVE_COUNTER_ASYNC',
    'SELECT_COUNTER_ASYNC',
    'INCREMENT_SELECTED_ASYNC',
    'DECREMENT_SELECTED_ASYNC',
    'RESET_SELECTED_ASYNC'
] as const

export type CounterSagaActionType = typeof sagaActionTypes[number]

export const CounterSagaActionType = sagaActionTypes.reduce(<T extends CounterSagaActionType>(o: any, t: T) => {
    o[t] = t
    return o
}, {} as { [key in CounterSagaActionType]: key })

export type CounterSagaAction = { type: CounterSagaActionType }


// ADD_COUNTER_ASYNC

function* addCounterAsync() {
    yield put({
        type: ReducerActionType.ADD_COUNTER
    })
}

export function* watchAddCounter() {
    yield takeLatest(CounterSagaActionType.ADD_COUNTER_ASYNC, addCounterAsync)
}

// REMOVE_COUNTER_ASYNC

function* removeCounterAsync() {
    yield put({
        type: ReducerActionType.REMOVE_COUNTER
    })
}

export function* watchRemoveCounter() {
    yield takeLatest(CounterSagaActionType.REMOVE_COUNTER_ASYNC, removeCounterAsync)
}

// SELECT_COUNTER_ASYNC

function* selectCounterAsync(action: any) {
    yield put({ ...action, type: 'SELECT_COUNTER' })
}

export function* watchSelectCounter() {
    yield takeEvery(CounterSagaActionType.SELECT_COUNTER_ASYNC, selectCounterAsync)
}

// INCREMENT_SELECTED_ASYNC

function* incrementSelectedAsync() {
    yield put({ type: 'INCREMENT_SELECTED' })
}

export function* watchIncrementSelected() {
  yield takeEvery(CounterSagaActionType.INCREMENT_SELECTED_ASYNC, incrementSelectedAsync);
}

// DECREMENT_SELECTED_ASYNC

function* decrementSelectedAsync() {
    yield put({ type: ReducerActionType.DECREMENT_SELECTED });
}

export function* watchDecrementSelected() {
  yield takeEvery(CounterSagaActionType.DECREMENT_SELECTED_ASYNC, decrementSelectedAsync);
}

// RESET_SELECTED_ASYNC

function* resetSelectedAsync() {
    yield put({ type: ReducerActionType.RESET_SELECTED });
}

export function* watchResetSelected() {
  yield takeEvery(CounterSagaActionType.RESET_SELECTED_ASYNC, resetSelectedAsync);
}