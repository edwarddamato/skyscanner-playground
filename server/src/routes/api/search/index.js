import { livePricing } from 'api';
import { livePricingFormatter } from 'utils';

export default {
  method: 'post',
  name: '/api/search',
  action: (req, res) => {
    const searchParams = req.body;

    livePricing.getFlights(searchParams)
      .then(results => {
        res.send(JSON.stringify(livePricingFormatter(results)));
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
