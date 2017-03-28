import React from 'react';
import renderer from 'react-test-renderer';
import SearchForm from '../';

describe('SearchForm', () => {
  it('renders correctly', () => {
    const searchForm = renderer.create(
      <SearchForm
        originPlace={'MLA'}
        destinationPlace={'LGW'}
        outboundDate={new Date('2017-01-01')}
        inboundDate={new Date('2017-01-02')} />
    ).toJSON();
    expect(searchForm).toMatchSnapshot();
  });
});
