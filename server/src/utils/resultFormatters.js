const livePricingFormatter = results => {
  const legs = {};
  const carriers = {};
  const agents = {};
  const places = {};

  for (const carrier of results.Carriers) {
    carriers[`c${carrier.Id}`] = carrier;
  }
  for (const agent of results.Agents) {
    agents[`a${agent.Id}`] = agent;
  };
  for (const leg of results.Legs) {
    legs[`l${leg.Id}`] = leg;
  };
  for (const place of results.Places) {
    places[`p${place.Id}`] = place;
  };

  const itins = results.Itineraries.map(itin => {
    const outboundLegId = itin.OutboundLegId;
    const inboundLegId = itin.InboundLegId;
    const itinLegs = [legs[`l${outboundLegId}`]];
    if (inboundLegId) itinLegs.push(legs[`l${inboundLegId}`]);

    const flights = itinLegs.map(leg => {
      return {
        carrierList: leg.Carriers.map(carrier => {
          return carriers[`c${carrier}`];
        }),
        originPlace: places[`p${leg.OriginStation}`].Code,
        destinationPlace: places[`p${leg.DestinationStation}`].Code,
        departureDate: leg.Departure,
        arrivalDate: leg.Arrival,
        duration: leg.Duration,
        stops: leg.Stops.length
      };
    });

    return {
      flights,
      pricingOptions: itin.PricingOptions.map(option => {
        return {
          price: option.Price,
          agents: option.Agents.map(agent => {
            return agents[`a${agent}`].Name;
          }),
          link: option.DeeplinkUrl
        };
      })
    };
  });

  return {
    searchId: Math.ceil(Math.random() * 100000000),
    itineraries: itins
  };
};

export { livePricingFormatter };
