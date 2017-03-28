import React from 'react';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
import Item from './Item';
import './List.scss';

class List extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      dataSet: this.props.dataSet
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ dataSet: nextProps.dataSet });
  }

  render () {
    return (
      <section className="sr_list-section">
        <BpkGridContainer>
          <BpkGridRow>
            <BpkGridColumn width={12} tabletWidth={12} mobileWidth={12}>
              {
                this.state.dataSet.length > 0
                ? <ul className="sr_list">
                  {
                    this.state.dataSet.map((itinerary, index) => {
                      return (
                        <li className="sr_item" key={index}>
                          <Item itinerary={itinerary} />
                        </li>
                      );
                    })
                  }
                </ul>
                : <BpkBannerAlert
                    message="No flights could be found with your search criteria. You may want to try alternative dates."
                    type={ALERT_TYPES.WARN}
                  >
                  </BpkBannerAlert>
              }
            </BpkGridColumn>
          </BpkGridRow>
        </BpkGridContainer>
      </section>
    );
  }
}
List.propTypes = {
  dataSet: React.PropTypes.array.isRequired
};

export default List;
