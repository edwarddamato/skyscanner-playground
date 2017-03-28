import { createStore } from 'redux';
import addDays from 'date-fns/add_days';
import { searchPrototype } from '/utils';
import { actions, execute } from './actions';

const reducer = (state, action) => {
  const newState = execute(action, partialState => {
    return Object.assign({}, state, partialState);
  });
  return newState || state;
};

const getNextMonday = () => {
  const tomorrow = addDays(new Date(), 1);
  tomorrow.setDate(tomorrow.getDate() + (1 + 7 - tomorrow.getDay()) % 7);
  return tomorrow;
};

const store = createStore(reducer, {
  menuOpen: true,
  loading: false,
  searchState: {
    state: 0,
    ...searchPrototype,
    originPlace: 'EDI',
    destinationPlace: 'LON',
    outboundDate: getNextMonday(),
    inboundDate: addDays(getNextMonday(), 1),
    adults: 1,
    cabinClass: 'Economy'
  },
  results: {
    searchId: '',
    itineraries: []
  }
});

store.subscribe(() => {
  console.info('Store change', store.getState());
});

const dispatch = {};
for (const action of actions) {
  dispatch[action.type] = data => {
    store.dispatch({ type: action.type, data });
  };
};

export { store, dispatch };
