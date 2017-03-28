import React from 'react';
import BpkCheckbox from 'bpk-component-checkbox';

const handleSelection = event => {
  return {
    target: {
      name: event.target.name,
      value: event.target.value
    }
  };
};

const stopsCheckboxes = context => {
  return [{
    id: 'direct',
    label: 'Direct'
  }, {
    id: 'one',
    label: '1 Stop'
  }, {
    id: 'two',
    label: '2+ Stops'
  }].map(stop => {
    return (<BpkCheckbox
          name="stops"
          onChange={handleSelection}
          id={`stops-${stop.id}`}
          key={`stops-${stop.id}`}
          label={stop.label}
          // checked={this.state.stopsOne}
        />);
  });
};

class Stops extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      checked: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render () {
    return (
      <div>
        {stopsCheckboxes(this)}
      </div>
    );
  }
}

export default Stops;
