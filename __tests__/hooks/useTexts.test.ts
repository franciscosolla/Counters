import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks'

import { useTexts, TextsKeys } from '~/hooks'

export function useTextsRender<T extends TextsKeys>(key: T) {
    const { result } = renderHook(() => useTexts(key))
    return ({
        current: {
            get texts() {
                return result.current[0]
            },
            get setTexts() {
                return result.current[1]
            },
            get textCode() {
                return result.current[2]
            }
        }
    })
}

describe('useTexts should', () => {

    it('change value to the setted one', () => {
        const { current } = useTextsRender('components/CounterView')
        act(() => {
            current.setTexts('pt')
        })
        expect(current.textCode).toBe('pt')
        act(() => {
            current.setTexts('en')
        })
        expect(current.textCode).toBe('en')
    })
})