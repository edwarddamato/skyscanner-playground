import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../';

describe('Search Results, Header', () => {
  it('renders correctly', () => {
    const header = renderer.create(
      <Header searchParams={{
        originPlace: 'MLA',
        destinationPlace: 'LHR',
        cabinClass: 'Economy',
        adults: 2,
        children: 2,
        infants: 0
      }} />
    ).toJSON();
    expect(header).toMatchSnapshot();
  });
});

