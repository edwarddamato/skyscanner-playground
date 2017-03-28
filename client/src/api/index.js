import formatDate from 'date-fns/format';
import config from '/config';
import { searchPrototype } from '/utils';
import { fetchWrapper as fetch } from '/utils/fetchWrapper';

const prepareSearchParams = params => {
  const searchParams = {};
  Object.keys(searchPrototype).forEach(param => {
    searchParams[param] = params[param];
  });

  // set dates to correct format
  searchParams.outboundDate = formatDate(searchParams.outboundDate, 'YYYY-MM-DD');
  searchParams.inboundDate = typeof searchParams.inboundDate !== 'undefined' ? formatDate(searchParams.inboundDate, 'YYYY-MM-DD') : undefined;

  return searchParams;
};

const getFlights = params => {
  const searchParams = prepareSearchParams(params);
  const fetchFlightsRequest = {
    method: 'POST',
    body: JSON.stringify(searchParams),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    fetch({ url: config.apiUrl, request: fetchFlightsRequest })
      .then(response => {
        response.json().then(json => {
          if (!response.ok) {
            reject(json);
          } else {
            resolve(json);
          }
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export { getFlights };
