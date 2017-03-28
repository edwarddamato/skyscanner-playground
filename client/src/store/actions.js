const actions = [
  { type: 'toggleLoading', stateKey: 'loading' },
  { type: 'toggleMenu', stateKey: 'menuOpen' },
  { type: 'search', stateKey: 'searchState' },
  { type: 'results', stateKey: 'results' }
];

const execute = (action, op) => {
  const partialState =
    actions
      .filter(act => act.type === action.type)
      .map(act => ({ [act.stateKey]: action.data }));
  return partialState.length === 1 ? op(partialState[0]) : undefined;
};

export { actions, execute };
