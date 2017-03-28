import React from 'react';
import { BpkExtraLargeSpinner } from 'bpk-component-spinner';
import './Loader.scss';

class Loader extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: this.props.loading
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loading !== this.state.loading) {
      this.setState({ loading: nextProps.loading });
    }
  }

  render () {
    return (
      this.state.loading
      ? <div className="loader">
          <div className="loader_spinner-container">
            <BpkExtraLargeSpinner />
            <span className="loader_spinner-text">Getting your flights</span>
          </div>
          <ul className="loader_box-list">
            {
              ['blue', 'green', 'yellow', 'red'].map(color => {
                return <li key={color} className={`loader_box-item loader_box-item--${color}`}></li>;
              })
            }
          </ul>
        </div>
      : null);
  }
}
Loader.propTypes = {
  loading: React.PropTypes.bool.isRequired
};

export default Loader;
