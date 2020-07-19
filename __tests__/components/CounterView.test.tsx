import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';

import { renderHook } from '@testing-library/react-hooks'

import { useTexts } from '~/hooks'
import { CounterView } from '~/components'


it('renders correctly', () => {

    renderHook(() => useTexts('components/CounterView'))

    renderer.create(
        <CounterView
            counter={{ value: 10 }}
            index={5}
            isSelected={true}
        />
    );
});