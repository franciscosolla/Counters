import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks'

import { useCounters, useSelected } from '~/hooks'

export function useCountersRender() {
    const { result, ...others } = renderHook(() => useCounters())
    return ({
        current: {
            get counters() {
                return result.current[0]
            },
            get actions() {
                return result.current[1]
            },
            get selected() {
                return result.current[2]
            }
        },

        ...others
    })
}

describe('useCounters should', () => {

    it('start with an empty array', () => {
        const { current } = useCountersRender()
        expect(current.counters).toEqual([])
    })

    it('be able to add counters at the end of array, with value = 0', () => {
        const { current } = useCountersRender()
        act(() => {
            current.actions.addCounter()
        })
        expect(current.counters.length).toBe(current.selected+1)
        expect(current.counters[current.selected].value).toBe(0)
    })

    it('be able to increment the value on the selected counter', () => {
        const { current } = useCountersRender()
        const previousValue = current.counters[current.selected].value
        act(() => {
            current.actions.incrementSelected()
        })
        expect(current.counters[current.selected].value).toBe(previousValue < 9999 ? previousValue + 1 : 9999)
    })

    it('be able to decrement the value on the selected counter', () => {
        const { current } = useCountersRender()
        const previousValue = current.counters[current.selected].value
        act(() => {
            current.actions.decrementSelected()
        })
        expect(current.counters[current.selected].value).toBe(previousValue > 0 ? previousValue - 1 : 0)
    })

    it('be able to reset the value on the selected counter', () => {
        const { current } = useCountersRender()
        act(() => {
            current.actions.resetSelected()
        })
        expect(current.counters[current.selected].value).toBe(0)
    })

    it('be able to remove the selected counter', () => {
        const { current } = useCountersRender()
        const previousLength = current.counters.length
        const selectedCounter = current.counters[current.selected]
        act(() => {
            current.actions.removeCounter()
        })
        expect(current.counters.length).toBe(previousLength > 0 ? previousLength-1 : 0)
        expect(current.counters.find((counter, index, counters) => counter === selectedCounter)).toBe(undefined)
    })
})