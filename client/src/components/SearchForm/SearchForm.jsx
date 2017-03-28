import React from 'react';
import addDays from 'date-fns/add_days';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
import BpkLabel from 'bpk-component-label';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import BpkSelect from 'bpk-component-select';
import BpkRadio from 'bpk-component-radio';
import BpkButton from 'bpk-component-button';
import DatePicker from './DatePicker';
import './SearchForm.scss';
import { searchPrototype } from '/utils';
import { getFlights } from '/api';
import { dispatch } from '/store';

const persons = () => {
  const options = [];
  for (let i = 0; i < 10; i++) {
    options.push(<option key={i} value={i}>{i}</option>);
  }
  return options;
};

const handleFlightSearchError = (error, componentHandler) => {
  const validationErrors = error.ValidationErrors || [];
  if (validationErrors.length > 0) {
    componentHandler(
      <div>
        <strong>Validation errors:</strong>
        {validationErrors.map((valErr, index) => {
          return (
            <div key={index}>{valErr.ParameterName ? `${valErr.ParameterName}: ` : ''}{valErr.Message}</div>
          );
        })}
      </div>
    );
  } else {
    componentHandler('Flights could not be retrieved at this moment. Please try again later.');
  }
};

/*
  TODO: Known issue - does not update app wide state with search form state.
  When menu is toggled, the search form state resets to default.
*/
class SearchForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      ...searchPrototype,
      originPlace: this.props.originPlace,
      destinationPlace: this.props.destinationPlace,
      outboundDate: this.props.outboundDate,
      inboundDate: this.props.inboundDate,
      cabinClass: 'Economy',
      adults: 1,
      tripType: 'return',
      exception: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOutboundDateChange = this.handleOutboundDateChange.bind(this);
    this.handleException = this.handleException.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value });

    // special case for trip type - need to set inbound date to undefined if one-way
    if (event.target.name === 'tripType' &&
        event.target.value !== this.state.tripType) {
      switch (event.target.value) {
        case 'return':
          this.setState({ inboundDate: addDays(this.state.outboundDate, 1) });
          break;
        case 'oneway':
          this.setState({ inboundDate: undefined });
          break;
      }
    }
  }

  handleOutboundDateChange (event) {
    const outboundDate = event.target.value;
    this.setState({
      inboundDate: this.state.inboundDate < outboundDate ? outboundDate : this.state.inboundDate
    });
    this.handleChange(event);
  }

  handleException (exception) {
    this.setState({ exception });
  }

  doSearch () {
    dispatch.toggleLoading(true);
    dispatch.results({ searchId: '', itineraries: [] });

    const searchState = this.state;

    // this is to allow loader to load properly
    window.setTimeout(() => {
      getFlights(searchState)
        .then(response => {
          this.setState({ exception: undefined });
          dispatch.toggleMenu(false);
          dispatch.search(Object.assign({}, searchState, { state: 1 }));
          dispatch.results(response);
        })
        .catch(err => {
          handleFlightSearchError(err, this.handleException);
        })
        .then(() => {
          dispatch.toggleLoading(false);
        });
    }, 500);
  }

  render () {
    return (
      <section className="search-form">
        {
          this.state.exception
          ? <BpkBannerAlert
              message="Oops! Something went wrong when trying to fetch your flights!"
              type={ALERT_TYPES.ERROR}
              toggleButtonLabel="More Info"
            >
            {this.state.exception || ''}
            </BpkBannerAlert>
          : null
        }
        <ul className="search-form_input-list">
          <li className="search-form_input-item search-form_input-item--origin">
            <BpkLabel label="Origin" htmlFor="originPlace" />
            <BpkInput
              id="originPlace"
              type={INPUT_TYPES.TEXT}
              name="originPlace"
              value={this.state.originPlace}
              onChange={this.handleChange}
              placeholder="Airport Code (ex: LHR)"
              maxLength="4"
            />
          </li>
          <li className="search-form_input-item search-form_input-item--destination">
            <BpkLabel label="Destination" htmlFor="destinationPlace" />
            <BpkInput
              id="destinationPlace"
              type={INPUT_TYPES.TEXT}
              name="destinationPlace"
              value={this.state.destinationPlace}
              onChange={this.handleChange}
              placeholder="Airport Code (ex: MLA)"
              maxLength="4"
            />
          </li>
          <li className="search-form_input-item search-form_input-item--depart">
            <BpkLabel label="Departure Date" htmlFor="outboundDate" />
             <DatePicker
              id="outboundDate"
              name="outboundDate"
              onDateSelect={this.handleOutboundDateChange}
              date={this.state.outboundDate}
            />
          </li>
          <li className="search-form_input-item search-form_input-item--return">
            <BpkLabel label="Return Date" htmlFor="inboundDate" />
            {
              this.state.tripType === 'return'
              ? <DatePicker
                id="inboundDate"
                name="inboundDate"
                minDate={this.state.outboundDate}
                onDateSelect={this.handleChange}
                date={this.state.inboundDate}
              />
              : <BpkInput
                id="inboundDate"
                type={INPUT_TYPES.TEXT}
                name="inboundDate"
                value=""
                onChange={this.handleChange}
                placeholder="One Way"
                disabled
              />
            }
          </li>
        </ul>
        <ul className="search-form_input-list">
          <li className="search-form_input-item search-form_input-item--class">
            <BpkLabel label="Class" htmlFor="cabinClass" />
            <BpkSelect
              id="cabinClass"
              name="cabinClass"
              value={this.state.cabinClass}
              onChange={this.handleChange}>
              <option value="economy">Economy</option>
              <option value="premiumeconomy">Premium Economy</option>
              <option value="business">Business Class</option>
              <option value="first">First Class</option>
            </BpkSelect>
          </li>
          <li className="search-form_input-item search-form_input-item--type">
            <BpkLabel label="Trip Type" htmlFor="tripType" />
            <BpkRadio
              name="tripType"
              id="tripType-return"
              value="return"
              label="Return"
              onChange={this.handleChange}
              checked={this.state.tripType === 'return'}
            />
            <BpkRadio
              name="tripType"
              id="tripType-oneway"
              value="oneway"
              label="One Way"
              onChange={this.handleChange}
              checked={this.state.tripType === 'oneway'}
            />
            <BpkRadio
              name="tripType"
              id="tripType-multi"
              label="Multi-city"
              onChange={() => console.log('Not yet implemented')}
              disabled
            />
          </li>
        </ul>
        <ul className="search-form_input-list">
          <li className="search-form_input-item search-form_input-item--adults">
            <BpkLabel label="Adults" htmlFor="adults" />
            <BpkSelect
              id="adults"
              name="adults"
              value={this.state.adults.toString()}
              onChange={this.handleChange}>
              {persons()}
            </BpkSelect>
          </li>
          <li className="search-form_input-item search-form_input-item--children">
            <BpkLabel label="Children" htmlFor="children" />
            <BpkSelect
              id="children"
              name="children"
              value={this.state.children.toString()}
              onChange={this.handleChange}>
              {persons()}
            </BpkSelect>
          </li>
          <li className="search-form_input-item search-form_input-item--infants">
            <BpkLabel label="Infants" htmlFor="infants" />
            <BpkSelect
              id="infants"
              name="infants"
              value={this.state.infants.toString()}
              onChange={this.handleChange}>
              {persons()}
            </BpkSelect>
          </li>
          <li className="search-form_input-item search-form_input-item--search">
            <BpkButton large onClick={this.doSearch}>Search!</BpkButton>
          </li>
        </ul>
      </section>
    );
  }
};
SearchForm.propTypes = {
  originPlace: React.PropTypes.string.isRequired,
  destinationPlace: React.PropTypes.string.isRequired,
  outboundDate: React.PropTypes.object.isRequired,
  inboundDate: React.PropTypes.object.isRequired
};

export default SearchForm;
