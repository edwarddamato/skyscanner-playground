import React from 'react';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkLargeLongArrowRight from 'bpk-component-icon/lg/long-arrow-right';
import { basicPluralise } from '/utils';
import './Header.scss';

const getTravellers = ({adults, children, infants}) => {
  const total = parseInt(adults + children + infants);
  return `${total} ${basicPluralise('traveller', total)}`;
};

class Header extends React.Component {
  render () {
    return (
      <header className="sr_header">
        <BpkGridContainer>
          <BpkGridRow>
            <BpkGridColumn width={12} tabletWidth={12} mobileWidth={12}>
              <div className="sr_header-title">
                <div className="sr_header-location">{this.props.searchParams.originPlace.toUpperCase()}</div>
                <div className="sr_header-arrow"><BpkLargeLongArrowRight /></div>
                <div className="sr_header-location">{this.props.searchParams.destinationPlace.toUpperCase()}</div>
              </div>
              <ul className="sr_header-info-list">
                <li className="sr_header-info-item">
                  {getTravellers(this.props.searchParams)}
                </li>
                <li className="sr_header-info-item">
                  {this.props.searchParams.cabinClass}
                </li>
              </ul>
            </BpkGridColumn>
          </BpkGridRow>
        </BpkGridContainer>
      </header>
    );
  }
}
Header.propTypes = {
  searchParams: React.PropTypes.object
};

export default Header;
