import config from 'config';
import { getQuerystringFromObject } from 'utils';
import session from './session';

const pricingApiUrl = `${config.apiUrl}apiservices/pricing/v1.0`;

const getSessionParams = query =>
  (getQuerystringFromObject(
    Object.assign({}, {
      country: 'UK',
      currency: 'GBP',
      locale: 'en-GB',
      locationSchema: 'iata' },
      query)));

const getFlights = params => {
  const sessionParams = getSessionParams(params);
  const livePricingSession = session({
    apiKey: config.apiKey,
    apiUrl: pricingApiUrl
  }, sessionParams);

  // return new Promise((resolve, reject) => {
  //   resolve(mockResults);
  // });

  return livePricingSession
    .getSessionKey()
    .then(livePricingSession.getResults);
};

export { getFlights };
