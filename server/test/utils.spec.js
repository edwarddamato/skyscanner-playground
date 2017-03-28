import { expect } from 'chai';
import { getQuerystringFromObject, livePricingFormatter, mockResults } from 'utils';

describe('Utils', () => {
  context('getQuerystringFromObject()', () => {
    it('should transform an object into a querystring', () => {
      const dummyObject = {
        foo: 'bar',
        moo: 'cow'
      };
      const dummyObjectQuerystring = getQuerystringFromObject(dummyObject);
      expect(dummyObjectQuerystring).to.be.equal('foo=bar&moo=cow');
    });
  });
  context('livePricingFormatter()', () => {
    it('should transform the raw flight search results into a specific object', () => {
      const transformed = livePricingFormatter(mockResults);
      expect(transformed.searchId).to.be.ok;
      expect(transformed.itineraries).to.be.ok;
      expect(transformed.itineraries.length).to.equal(245);

      const randomItinerary = transformed.itineraries[parseInt(Math.random() * 245)];
      expect(randomItinerary.flights).to.be.ok;
      expect(randomItinerary.pricingOptions).to.be.ok;
    });
  });
});
