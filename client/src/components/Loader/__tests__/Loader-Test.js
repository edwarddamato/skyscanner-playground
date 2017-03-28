import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../';

describe('Loader, when loading', () => {
  it('renders correctly', () => {
    const loader = renderer.create(
      <Loader loading={true} />
    ).toJSON();
    expect(loader).toMatchSnapshot();
  });
});

describe('Loader, when not loading', () => {
  it('renders nothing', () => {
    const loader = renderer.create(
      <Loader loading={false} />
    ).toJSON();
    expect(loader).toMatchSnapshot();
  });
});
