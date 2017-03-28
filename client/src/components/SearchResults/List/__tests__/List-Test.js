import React from 'react';
import renderer from 'react-test-renderer';
import List from '../';

describe('List', () => {
  it('renders correctly with empty data set', () => {
    const list = renderer.create(
      <List dataSet={[]} />
    ).toJSON();
    expect(list).toMatchSnapshot();
  });

  it('renders correctly with populated data set sample 1', () => {
    const itinerary = {
      flights: [{
        carrierList: [{
          Id: 885,
          Code: 'BE',
          Name: 'Flybe',
          ImageUrl: 'http://s1.apideeplink.com/images/airlines/BE.png',
          DisplayCode: 'BE'
        }, {
          Id: 885,
          Code: 'BE',
          Name: 'Flybe',
          ImageUrl: 'http://s1.apideeplink.com/images/airlines/BE.png',
          DisplayCode: 'BE'
        }],
        originPlace: 'MLA',
        destinationPlace: 'LHR',
        departureDate: '2017-06-06 11:00',
        arrivalDate: '2017-06-07 13:00',
        duration: 252,
        stops: 3
      }],
      pricingOptions: [{
        price: '£332.22',
        agents: ['Agent 1', 'Agent 2'],
        link: 'http://'
      }, {
        price: '£332.22',
        agents: ['Agent 1', 'Agent 2'],
        link: 'http://'
      }]
    };
    const dataSet = [itinerary, itinerary];

    const list = renderer.create(
      <List dataSet={dataSet} />
    ).toJSON();
    expect(list).toMatchSnapshot();
  });


  it('renders correctly with populated data set sample 2', () => {
    const itinerary = {
      flights: [{
        carrierList: [{
          Id: 885,
          Code: 'BE',
          Name: 'Flybe',
          ImageUrl: 'http://s1.apideeplink.com/images/airlines/BE.png',
          DisplayCode: 'BE'
        }],
        originPlace: 'MLA',
        destinationPlace: 'LHR',
        departureDate: '2017-06-06 11:00',
        arrivalDate: '2017-06-07 13:00',
        duration: 252,
        stops: 3
      }, {
        carrierList: [{
          Id: 885,
          Code: 'BE',
          Name: 'Flybe',
          ImageUrl: 'http://s1.apideeplink.com/images/airlines/BE.png',
          DisplayCode: 'BE'
        }],
        originPlace: 'MLA',
        destinationPlace: 'LHR',
        departureDate: '2017-06-06 11:00',
        arrivalDate: '2017-06-07 13:00',
        duration: 252,
        stops: 3
      }],
      pricingOptions: [{
        price: '£332.22',
        agents: ['Agent 1', 'Agent 2'],
        link: 'http://'
      }]
    };
    const dataSet = [itinerary, itinerary];

    const list = renderer.create(
      <List dataSet={dataSet} />
    ).toJSON();
    expect(list).toMatchSnapshot();
  });


  it('renders correctly with populated data set sample 3', () => {
    const itinerary = {
      flights: [{
        carrierList: [{
          Id: 885,
          Code: 'BE',
          Name: 'Flybe',
          ImageUrl: 'http://s1.apideeplink.com/images/airlines/BE.png',
          DisplayCode: 'BE'
        }],
        originPlace: 'MLA',
        destinationPlace: 'LHR',
        departureDate: '2017-06-06 11:00',
        arrivalDate: '2017-06-07 13:00',
        duration: 1000,
        stops: 1
      }, {
        carrierList: [{
          Id: 885,
          Code: 'BE',
          Name: 'Flybe',
          ImageUrl: 'http://s1.apideeplink.com/images/airlines/BE.png',
          DisplayCode: 'BE'
        }],
        originPlace: 'MLA',
        destinationPlace: 'LHR',
        departureDate: '2017-06-06 11:00',
        arrivalDate: '2017-06-07 13:00',
        duration: 1552,
        stops: 2
      }],
      pricingOptions: [{
        price: '£332.22',
        agents: ['Agent 1', 'Agent 2'],
        link: 'http://'
      }, {
        price: '£332.22',
        agents: ['Agent 1', 'Agent 2'],
        link: 'http://'
      }]
    };
    const dataSet = [itinerary, itinerary];

    const list = renderer.create(
      <List dataSet={dataSet} />
    ).toJSON();
    expect(list).toMatchSnapshot();
  });
});
