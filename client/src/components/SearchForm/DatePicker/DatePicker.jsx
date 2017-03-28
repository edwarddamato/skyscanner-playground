import React from 'react';
import format from 'date-fns/format';
import BpkDatepicker from 'bpk-component-datepicker';

const formatDate = date => format(date, 'ddd Do MMM YYYY');
const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');
const formatMonth = date => format(date, 'MMMM YYYY');
const daysOfWeek = () => {
  return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    .map((day, index) => {
      return {
        name: day,
        nameAbbr: day.substr(0, 3),
        index,
        isWeekend: index === 5 || index === 6
      };
    });
};

const handleDateChange = (name, date) => {
  return {
    target: {
      name,
      value: date
    }
  };
};

class DatePicker extends React.Component {
  render () {
    return (
        <BpkDatepicker
          id={this.props.id}
          name={this.props.name}
          changeMonthLabel="Change month"
          closeButtonText="Close"
          popoverLabel="Date"
          date={this.props.date}
          minDate={this.props.minDate}
          onDateSelect={date => this.props.onDateSelect(handleDateChange(this.props.name, date))}
          formatMonth={formatMonth}
          formatDate={formatDate}
          formatDateFull={formatDateFull}
          daysOfWeek={daysOfWeek()}
          weekStartsOn={0}
          getApplicationElement={() => document.getElementById('react-mount')}
        />
    );
  }
}
DatePicker.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onDateSelect: React.PropTypes.func,
  date: React.PropTypes.object.isRequired,
  minDate: React.PropTypes.object
};

export default DatePicker;
