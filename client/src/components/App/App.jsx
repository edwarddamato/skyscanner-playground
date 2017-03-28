import React from 'react';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import Loader from '../Loader';
import TopNav from '../TopNav';
import SearchForm from '../SearchForm';
import SearchResults from '../SearchResults';
import { store, dispatch } from '/store';
import './App.scss';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      menuOpen: store.getState().menuOpen,
      loading: store.getState().loading,
      searchState: store.getState().searchState
    };

    this.handleNavStateChange = this.handleNavStateChange.bind(this);

    store.subscribe(() => {
      this.setState({ menuOpen: store.getState().menuOpen, loading: store.getState().loading });
    });
  }

  handleNavStateChange (state) {
    dispatch.toggleMenu(state.menuOpen);
  }

  render () {
    return (
      <div className="root_container">
        <Loader loading={this.state.loading} />
        <TopNav menuOpen={this.state.menuOpen} onStateChange={this.handleNavStateChange} />
        {this.state.menuOpen
          ? <BpkGridContainer padded={false}>
              <BpkGridRow>
                <BpkGridColumn width={12} tabletWidth={12} mobileWidth={12}>
                  <SearchForm
                    originPlace={this.state.searchState.originPlace}
                    destinationPlace={this.state.searchState.destinationPlace}
                    outboundDate={this.state.searchState.outboundDate}
                    inboundDate={this.state.searchState.inboundDate} />
                </BpkGridColumn>
              </BpkGridRow>
            </BpkGridContainer>
          : null}
        <SearchResults />
      </div>
    );
  }
}

export default App;
