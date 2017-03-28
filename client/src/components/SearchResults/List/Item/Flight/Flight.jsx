import React from 'react';
import formatDate from 'date-fns/format';
import dayDiff from 'date-fns/difference_in_calendar_days';
import BpkLargeLongArrowRight from 'bpk-component-icon/lg/long-arrow-right';
import { basicPluralise } from '/utils';
import './Flight.scss';

const getDurationString = duration => {
  const hours = Math.floor(duration / 60);
  const days = Math.floor(hours / 24);
  const remHours = days > 0 ? hours % 24 : hours;
  const minutes = Math.floor(duration % 60);

  const durationArr = [];
  if (days > 0) {
    durationArr.push(`${days}d`);
  }
  durationArr.push(`${remHours}h`);
  if (minutes > 0) {
    durationArr.push(`${minutes}m`);
  }
  return durationArr.join(' ');
};

class Flight extends React.Component {
  constructor (props) {
    super(props);

    this.carrierString =
      this.props.carriers
        .map(carrier => { return carrier.Name; })
        .join(', ');

    this.arriveDaysAfter = dayDiff(this.props.arrivalTime, this.props.departureTime);
  }


  render () {
    return (
      <ul className="sr_info-list">
        <li title={this.carrierString} className={`sr_info-item sr_info-item--logo ${this.props.carriers.length > 1 ? 'sr_info-item--logo--extra' : ''}`} data-carrier-count={`+ ${this.props.carriers.length - 1} more`}>
          <img alt={this.carrierString} src={`https://logos.skyscnr.com/images/airlines/favicon/${this.props.carriers[0].Code}.png`} />
        </li>
        <li className="sr_info-item sr_info-item--part">
          <span className="sr_info-time">{formatDate(this.props.departureTime, 'HH:mm')}</span>
          <span className="sr_info-airport">{this.props.origin}</span>
        </li>
        <li className="sr_info-item sr_info-item--arrow"><BpkLargeLongArrowRight /></li>
        <li className="sr_info-item sr_info-item--part sr_info-item--part--arrival">
          <span className="sr_info-time">{formatDate(this.props.arrivalTime, 'HH:mm')} {
            this.arriveDaysAfter > 0
            ? <span className="sr_info-item--days">(+{this.arriveDaysAfter})</span>
            : null
          }
          </span>
          <span className="sr_info-airport">{this.props.destination}</span>
        </li>
        <li className="sr_info-item sr_info-item--duration">
          <span className="sr_info-duration">{getDurationString(this.props.duration)}</span>
          <span className={`sr_info-stops sr_info-stops--${this.props.stops}`}>{this.props.stops === 0 ? 'Direct' : `${this.props.stops} ${basicPluralise('stop', this.props.stops)}`}</span>
        </li>
      </ul>
    );
  }
}
Flight.propTypes = {
  carriers: React.PropTypes.array.isRequired,
  departureTime: React.PropTypes.string.isRequired,
  arrivalTime: React.PropTypes.string.isRequired,
  origin: React.PropTypes.string.isRequired,
  destination: React.PropTypes.string.isRequired,
  duration: React.PropTypes.number.isRequired,
  stops: React.PropTypes.number.isRequired
};

export default Flight;
