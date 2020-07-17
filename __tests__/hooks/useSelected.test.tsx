import { renderHook, act } from '@testing-library/react-hooks'

import { useSelected } from '~/hooks'

it('useSelected works as expected', () => {
    const { result } = renderHook(() => useSelected())
    expect(result.current[0]).toBe(0)
    act(() => {
        result.current[1](1)
    })
    expect(result.current[0]).toBe(1)
})