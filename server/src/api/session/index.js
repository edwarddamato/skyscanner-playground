import fetch from 'node-fetch';
import poller from './poller';

const requests = {
  makeSessionRequest: (apiUrl, apiKey, params) => {
    return fetch(`${apiUrl}?apikey=${apiKey}`, {
      method: 'POST',
      body: params,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },
  makeResultsRequest: (apiUrl, apiKey, sessionKey) => {
    return fetch(`${apiUrl}/${sessionKey}?apiKey=${apiKey}`, {
      method: 'GET'
    });
  }
};

const handleAndResolve = (response, resolve, reject) => {
  if (response.status !== 201) {
    console.error(response.status, 'An error has occurred!');
    response.json().then(error => {
      console.error(error);
      reject(error);
    });
  } else {
    // session created
    resolve(response);
  }
};

const retrieveSessionKey = response => {
  try {
    const location = response.headers.get('location');
    return location.substring(location.lastIndexOf('/') + 1);
  } catch (e) {
    throw new Error(`Unable to retrieve LOCATION string in response headers when creating session. ${e}`);
  }
};

const sessionManager = state => ({
  getSessionKey: () => {
    return new Promise((resolve, reject) => {
      requests.makeSessionRequest(state.apiUrl, state.apiKey, state.parameters)
        .then(response => {
          handleAndResolve(response, () => {
            resolve(response);
          },
          error => {
            reject(error);
          });
        });
    }).then(retrieveSessionKey);
  },
  getResults: sessionKey => {
    return poller(() => {
      return requests.makeResultsRequest(state.apiUrl, state.apiKey, sessionKey);
    }).begin();
  }
});

const session = ({ apiKey, apiUrl }, parameters) => {
  const state = {
    apiKey,
    apiUrl,
    parameters
  };

  return Object.assign(
    {},
    sessionManager(state)
  );
};

export default session;
