import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks'

import { useTheme } from '~/hooks'

function trasnformHookResult<P>({ result }: RenderHookResult<P, ReturnType<(typeof useTheme)>>) {
    return ({
        current: {
            get theme() {
                return result.current[0]
            },
            get setTheme() {
                return result.current[1]
            },
            get themeName() {
                return result.current[2]
            }
        }
    })
}

describe('useTheme should', () => {

    it('change value to the setted one', () => {
        const { current } = trasnformHookResult(renderHook(() => useTheme()))
        act(() => {
            current.setTheme('light')
        })
        expect(current.themeName).toBe('light')
        act(() => {
            current.setTheme('dark')
        })
        expect(current.themeName).toBe('dark')
    })
})