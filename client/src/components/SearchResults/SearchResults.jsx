import React from 'react';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
import { store } from '/store';
import Header from './Header';
import Nav from './Nav';
import List from './List';
import './SearchResults.scss';

class SearchResults extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      searchState: store.getState().searchState,
      results: store.getState().results
    };

    this.handleResultsChange = this.handleResultsChange.bind(this);

    store.subscribe(() => {
      this.handleResultsChange(store.getState().searchState, store.getState().results);
    });
  }

  handleResultsChange (searchState, results) {
    this.setState({ searchState, results });
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.state.results.searchId !== nextState.results.searchId;
  }

  render () {
    return (
      this.state.searchState.state > 0
      ? <section className="search-results">
          <Header searchParams={this.state.searchState} />
          <Nav />
          <List dataSet={this.state.results.itineraries} />
        </section>
      : <BpkGridContainer>
          <BpkGridRow>
            <BpkGridColumn width={12} tabletWidth={12} mobileWidth={12}>
              <BpkBannerAlert
                message="Click the menu at the top right to search for flights!"
                type={ALERT_TYPES.WARN}
              >
              </BpkBannerAlert>
            </BpkGridColumn>
          </BpkGridRow>
        </BpkGridContainer>
    );
  }
}

export default SearchResults;
