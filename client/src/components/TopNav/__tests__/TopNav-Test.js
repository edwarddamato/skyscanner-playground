import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TopNav from '../';

describe('TopNav', () => {
  it('renders correctly', () => {
    const topNav = renderer.create(
      <TopNav menuOpen={true} onStateChange={() => {}} />
    ).toJSON();
    expect(topNav).toMatchSnapshot();
  });

  it('sets the correct state when burger icon changed', () => {
    const topNav = shallow(
      <TopNav menuOpen={true} onStateChange={() => {}} />
    );

    topNav.find('#chkHeaderBurger').simulate('change', { target: { checked: false } });
    expect(topNav.state('menuOpen')).toBe(false);

    topNav.find('#chkHeaderBurger').simulate('change', { target: { checked: true } });
    expect(topNav.state('menuOpen')).toBe(true);
  });

  it('is updated if menuOpen property is updated', () => {
    const topNav = shallow(
      <TopNav menuOpen={false} onStateChange={() => {}} />
    );

    topNav.setProps({ menuOpen: true });
    expect(topNav.state('menuOpen')).toBe(true);

    topNav.setProps({ menuOpen: false });
    expect(topNav.state('menuOpen')).toBe(false);
  });
});
