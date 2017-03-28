import React from 'react';
import BpkButton from 'bpk-component-button';
import Flight from './Flight';
import { basicPluralise } from '/utils';
import './Item.scss';

class Item extends React.Component {
  constructor (props) {
    super(props);
    this.pricingOptions = this.props.itinerary.pricingOptions;
  }


  render () {
    return (
      <div className="sr_item-container">
        <ul className="sr_item-flight-list">
          {this.props.itinerary.flights.map((flight, index) => {
            return (
              <li className="sr_item-flight-item" key={index}>
                <Flight
                  carriers={flight.carrierList}
                  departureTime={flight.departureDate}
                  arrivalTime={flight.arrivalDate}
                  origin={flight.originPlace}
                  destination={flight.destinationPlace}
                  duration={flight.duration}
                  stops={flight.stops}
                />
              </li>
            );
          })}
        </ul>
        {this.pricingOptions.slice(0, 1).map((option, index) => {
          return (
            <div className="sr_item-footer" key={index}>
              <div className="sr_item-pricing">
                <span className="sr_item-price">
                  {`£${parseInt(option.price)}`}
                </span>
                <span className="sr_item-agent">
                  {option.agents.join(', ')}
                  {this.pricingOptions.length > 1
                  ? <span className="sr_item-agent--more">{` (+${this.pricingOptions.length - 1} more ${basicPluralise('deal', this.pricingOptions.length - 1)})`}</span>
                  : null}
                </span>
              </div>
              <div className="sr_item-action">
                <BpkButton large href={option.link} rel="nofollow" target="_blank">Select</BpkButton>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
Item.propTypes = {
  itinerary: React.PropTypes.object.isRequired
};

export default Item;
