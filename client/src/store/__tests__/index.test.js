import { dispatch } from '../';

describe('store', () => {
  it('to have all dispatch actions', () => {
    expect(dispatch.toggleLoading).toBeDefined;
    expect(dispatch.toggleMenu).toBeDefined;
    expect(dispatch.search).toBeDefined;
    expect(dispatch.results).toBeDefined;
  });
});
