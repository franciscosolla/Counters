import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks'

import { useSelected } from '~/hooks'

function trasnformHookResult<P>({ result }: RenderHookResult<P, ReturnType<(typeof useSelected)>>) {
    return ({
        current: {
            get selected() {
                return result.current[0]
            },
            get setSelected() {
                return result.current[1]
            }
        }
    })
}

it('useSelected; selected should change to new selected value when setted', () => {
    const { current } = trasnformHookResult(renderHook(() => useSelected()))
    expect(current.selected).toBe(0)
    act(() => {
        current.setSelected(1)
    })
    expect(current.selected).toBe(1)
})