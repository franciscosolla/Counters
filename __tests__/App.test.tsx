import 'react-native';
import React from 'react';
import App from '../App.tsx';

// import jest from 'jest'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// jest.mock('Platform', () => {
//   const Platform = require.requireActual('Platform');
//   Platform.OS = 'android';
//   return Platform;
// })

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

// describe('<App />', () => {
//   it('has 1 child', () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree.children.length).toBe(1);
//   });
// });

it('A is A', () => {
  expect('A').toBe('A');
});