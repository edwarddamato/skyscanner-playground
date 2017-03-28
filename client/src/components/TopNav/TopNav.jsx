import React from 'react';
import './TopNav.scss';
import TOKENS from 'bpk-tokens/tokens/base.common';
import { BpkInlineLogo } from 'bpk-component-logo';

class TopNav extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      menuOpen: this.props.menuOpen
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.setState({ menuOpen: event.target.checked }, () => {
      this.props.onStateChange(this.state);
    });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.menuOpen !== this.state.menuOpen) {
      this.setState({ menuOpen: nextProps.menuOpen });
    }
  }

  render () {
    return (
      <header className="header">
        <a href="/" className="header_link">
          <BpkInlineLogo fill={TOKENS.colorBlue500} />
        </a>
        <div className="header_burger">
          <input
            id="chkHeaderBurger"
            type="checkbox"
            className="header_burger-checkbox"
            checked={this.state.menuOpen}
            onChange={this.handleChange} />
          <label htmlFor="chkHeaderBurger" className="header_burger-label"><div className="header_burger-layer">Menu</div></label>
        </div>
      </header>
    );
  }
};
TopNav.propTypes = {
  onStateChange: React.PropTypes.func,
  menuOpen: React.PropTypes.bool.isRequired
};

export default TopNav;
