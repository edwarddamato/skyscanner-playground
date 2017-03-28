import React from 'react';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkLargePriceAlerts from 'bpk-component-icon/lg/price-alerts';
import './Nav.scss';

class Nav extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    };
  }


  render () {
    return (
      <nav className="sr_nav">
        <BpkGridContainer>
          <BpkGridRow>
            <BpkGridColumn width={12} tabletWidth={12} mobileWidth={12}>
              <ul className="sr_nav-list">
                <li className="sr_nav-item">Filter</li>
                <li className="sr_nav-item">Sort</li>
                <li className="sr_nav-item sr_nav-item--price-alert"><BpkLargePriceAlerts />&nbsp;Price Alert</li>
              </ul>
            </BpkGridColumn>
          </BpkGridRow>
        </BpkGridContainer>
      </nav>
    );
  }
}

export default Nav;
