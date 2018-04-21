import React from 'react';

import { Row, Col, Progress} from 'reactstrap';

import Page from 'components/Page';
import { NumberWidget, IconWidget } from 'components/Widget';

import { iconWidgetsData, numberWidgetsData } from 'demos/widgetPage';
import SearchInput from 'components/SearchInput';
import { Link } from 'react-router-dom'

class WidgetPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.fetchProposals(this);
  }

  fetchProposals(ts) {
    fetch('http://localhost:1235/retrieve_proposals', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({'email': this.props.login ? this.props.login.email: '', 'role':this.props.login.role })
    }).then(function(res) {
      res.json().then(ret => {
        console.log(ret);
        ts.setState({proposals: ret});
      });
    }).catch(function(err) {
      console.log(err);
    });
  }

  getProgress(vendorApproval, deptApproval, transferred) {
    if (transferred) return 100;
    if (vendorApproval) return 66.6;
    if (deptApproval) return 33.3;
    else return 0;
  }

  render() {
    var allproposals = this.state.proposals ? this.state.proposals.map(({ totalCost, proposalId, vendor, vendorApproval, deptApproval, transferred }, index) => (
          <Col key={index} lg={4} md={6} sm={6} xs={12} className="mb-3">
            <Link to = {{pathname: '/proposal', state: {proposal: this.state.proposals[index], login: this.props.login}}}>
            <NumberWidget
              title={"Proposal " + proposalId}
              subtitle={vendor}
              number={"$" + totalCost}
              progress={{
                value: this.getProgress(vendorApproval, deptApproval, transferred),
                label: 'Approval Status',
              }}
            />
            </Link>
          </Col>
        )) : null;

    return (
    <Page
      className="WidgetPage"
      title="Proposals"
    >
    <Row>

    <Col>
    <SearchInput />
    </Col>
   
    </Row>
      
    <Row>
        {allproposals}
      </Row>

      
    </Page>
  );};
};

export default WidgetPage;
