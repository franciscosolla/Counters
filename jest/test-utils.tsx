import React, { ReactNode, ReactElement } from 'react'
import { render as rntlRender, RenderOptions } from 'react-native-testing-library'
import { createStore, Store as rStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer, { Store } from '~/reducers'
import { rootSaga } from '~/sagas'

export * from 'react-native-testing-library'

export function createTestStore(initialState?: Store) {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(rootSaga)
    return store
} 

export function render(
    ui: ReactElement<any>,
    {
        initialState = undefined,
        store = createTestStore(initialState),
        ...renderOptions
    }: {
        initialState?: Store,
        store?: rStore,
    } & RenderOptions = {}
) {
    
    function Wrapper({ children }: { children: ReactNode | ReactNode[] }) {
        return (
            <Provider store={store} >
                {children}
            </Provider>
        )
    }

    return rntlRender(
        ui,
        {
            wrapper: Wrapper,
            ...renderOptions
        }
    )
}