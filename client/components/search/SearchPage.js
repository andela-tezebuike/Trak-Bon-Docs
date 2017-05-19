import React, { Component } from 'react';
import { Tabs, Tab } from 'react-mdl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchUsers, searchDocuments } from '../../actions/searchActions';
import UserSearch from './UserSearch';
import DocumentSearch from './DocumentSearch';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      user: true
    };

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  componentWillMount() {
    this.props.searchUsers();
    this.props.searchDocuments();
  }

  setActiveTab(tabId) {
    if (tabId === 1) {
      this.setState({
        activeTab: 1,
        user: false
      });
    }
  }


  render() {
    return (
      <div>
        <Tabs
          ripple
          activeTab={this.state.activeTab}
          onChange={this.setActiveTab}>
          <Tab>
            User Search</Tab>
          <Tab>
            Document Search</Tab>
        </Tabs>
        {this.state.user ?
        <section>
          <div className="content">
            Content for the tab for u:
            {/*<UserSearch userResults={this.props.userResults}/>*/}
          </div>
        </section>
        :
        <section>
          <div className="content">
            Content for the tab
            {/*<DocumentSearch documentResults={this.props.documentResults}/>*/}
          </div>
        </section>
        }
      </div>
    );
  }
}

SearchPage.propTypes = {
  userResults: PropTypes.array.isRequired,
  documentResults: PropTypes.array.isRequired,
  searchUsers: PropTypes.func.isRequired,
  searchDocuments: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const userResults = state.search.users.users || [];
  const documentResults = state.search.documents.documents || [];
  let DocumentCount;
  if (userResults) {
    DocumentCount = (userResults
    .filter(user => userResults.userDocuments));
  }

  console.log('docpage', state);
  console.log('ctvbhj', DocumentCount);
  return {
    userResults,
    documentResults,
    DocumentCount
  };
}

export default connect(mapStateToProps,
{ searchUsers, searchDocuments })(SearchPage);