import React from 'react';
import { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';


import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';

import componentQueries from 'react-component-queries';
import { Link, withRouter } from "react-router-dom";

import {
  // MdCardGiftcard,
  MdLoyalty,
  MdImportantDevices,
} from 'react-icons/lib/md';
import NotificationSystem from 'react-notification-system';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// layouts
import { Header, Sidebar, Content, Footer } from 'components/Layout';

import GAListener from 'components/GAListener';

// pages
import CreateProposal from 'pages/CreateProposal'
import ViewProposal from 'pages/ViewProposal'
import ProposalDetailPage from 'pages/ProposalDetailPage'
import CreateTokensPage from 'pages/CreateTokensPage'
import CashOutPage from 'pages/CashOutPage'
import Login from 'pages/Login'
import Register from 'pages/Register'
import CashOutRequest from 'pages/CashOutRequest'
import './styles/reduction.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.getBalance = this.getBalance.bind(this);
  }

  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);

    setTimeout(() => {
      this.notificationSystem.addNotification({
        title: <MdImportantDevices />,
        message: 'Welome to Blockchain Integrated Claiming System!',
        level: 'info',
      });
    }, 1500);

  }

  // close sidebar when
  handleContentClick = event => {
    // close sidebar if sidebar is open and screen size is less than `md`
    if (
      App.isSidebarOpen() &&
      (this.props.breakpoint === 'xs' ||
        this.props.breakpoint === 'sm' ||
        this.props.breakpoint === 'md')
    ) {
      this.openSidebar('close');
    }
  };

  checkBreakpoint(breakpoint) {

    return this.openSidebar('close');

    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === 'open') {
      return document
        .querySelector('.cr-sidebar')
        .classList.add('cr-sidebar--open');
    }

    document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
  }

  setLoginStatus(status) {
    this.setState({login: status});
    if (!status) {
      this.setState({balance: undefined});
    } else if (
      status.role == 'Vendor' ||
      status.role == 'NUS') {
        var ts = this;
        this.getBalance(status, function(res) {
          res.json().then(ret => {
            console.log(ret.balance);
            ts.setState({balance: ret.balance});
          });
        });
    }
  }

  getBalance(loginstatus, callback) {
    fetch('http://localhost:1235/get_balance', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(loginstatus)
    }).then(function(res) {
      callback(res);
    }).catch(function(err) {
      console.log(err);
    });
  }

  render() {
    var routes = (
                <switch>
                <Route path="/createproposal" render={()=><CreateProposal login={this.state.login} />} />
                <Route path="/viewproposal" render={()=><ViewProposal login={this.state.login} />}/>
                <Route path="/proposal" component={ProposalDetailPage} />
                <Route path="/createtokens" component={CreateTokensPage} />
                <Route path="/cashout" component={CashOutPage} />
                <Route path="/register" component={Register} />
                <Route path="/cashoutrequest" component={CashOutRequest} />
                <Route path="/login" render={()=><Login openSidebar={this.openSidebar.bind(this)} setLogin={this.setLoginStatus.bind(this)}/>}/>
                <Redirect to="/viewproposal" />
                </switch>);
    var start = (
                <switch>
                <Route path="/login" render={()=><Login openSidebar={this.openSidebar.bind(this)} setLogin={this.setLoginStatus.bind(this)}/>}/>
                <Redirect to="/login" />
                </switch>);
    var r = this.state.login ? routes : start;
    return (
      <BrowserRouter>
        <GAListener>
          <main className="cr-app bg-light">
            <Sidebar login={this.state.login}/>
            <Content fluid onClick={this.handleContentClick}>
              <Header login={this.state.login} balance={this.state.balance}/>
                {r}
              <Footer />
            </Content>

            <NotificationSystem
              dismissible={false}
              ref={notificationSystem =>
                (this.notificationSystem = notificationSystem)
              }
              style={NOTIFICATION_SYSTEM_STYLE}
            />
          </main>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
