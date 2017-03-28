# A Skyscanner Playground

## CLIENT

### How to start:
1. Clone the repository
2. cd `client/`
3. `yarn install`
4. `yarn start`


### Tests:
- `yarn test`
- `yarn test -- -u` to update Jest snapshots
- `yarn test -- --coverage` to run tests with coverage report


### Notes:
- Requires server to be running in order to get flights
- Works with `npm` too

----------------------

## SERVER

### How to start:
1. Clone the repository
2. cd `server/`
3. `yarn install`
4. `APIKEY=<APIKEY> yarn start` **OR**
4. Add `.config.js` in root with the following:

```javascript
export default { apiKey: '<APIKEY>' }; // just yarn start if setting APIKEY here
```

### Tests:
- `yarn test`


### Notes:
- Works with `npm` too
