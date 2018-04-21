import React from 'react';

import bn from 'utils/bemnames';

import {
  Navbar,
  Nav,
  NavItem,
  NavLink as BSNavLink,
  // UncontrolledTooltip,
  Collapse,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import {
  MdDashboard,
  MdWidgets,
  MdTextFields,
  MdNotificationsActive,
  MdBorderAll,
  MdRadioButtonChecked,
  MdWeb,
  MdStar,
  MdGroupWork,
  MdArrowDropDownCircle,
  MdBrush,
  MdViewDay,
  MdChromeReaderMode,
  MdViewList,
  MdInsertChart,
  MdExtension,
  MdSend,
  MdKeyboardArrowDown,
} from 'react-icons/lib/md';
import FaGithub from 'react-icons/lib/fa/github';

import SourceLink from 'components/SourceLink';

const sidebarBackground = {
  backgroundImage: 'url("/img/sidebar/sidebar-4.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navComponents = [
  { to: '/buttons', name: 'buttons', exact: false, Icon: MdRadioButtonChecked },
  {
    to: '/button-groups',
    name: 'button groups',
    exact: false,
    Icon: MdGroupWork,
  },
  { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
  { to: '/input-groups', name: 'input groups', exact: false, Icon: MdViewList },
  {
    to: '/dropdowns',
    name: 'dropdowns',
    exact: false,
    Icon: MdArrowDropDownCircle,
  },
  { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
  { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
  { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
  { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
];

const navContents = [
  { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
  { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
];
/*
const navItems = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/cards', name: 'cards', exact: false, Icon: MdWeb },
  { to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
  { to: '/widgets', name: 'widgets', exact: false, Icon: MdWidgets },
  { to: '/createproposal', name: 'create proposal', exact: false, Icon: MdBrush},
  { to: '/viewproposal', name: 'view proposal', exact: false, Icon: MdChromeReaderMode },
  { to: '/createtokens', name: 'create tokens', exact: false, Icon: MdStar },
  { to: '/cashout', name: 'cash out', exact: false, Icon: MdWeb }
];
*/

const createproposal = { to: '/createproposal', name: 'create proposal', exact: false, Icon: MdBrush};
const viewproposal = { to: '/viewproposal', name: 'view proposal', exact: false, Icon: MdChromeReaderMode };
const createtokens = { to: '/createtokens', name: 'create tokens', exact: false, Icon: MdStar };
const cashout = { to: '/cashout', name: 'cash out', exact: false, Icon: MdWeb };
const logout = { to: '/login', name: 'log out', exact: false, Icon: MdDashboard };
const cashoutrequest = { to: '/cashoutrequest', name: 'cashout request', exact: false, Icon: MdInsertChart };

const navItems = {
  'Student': [createproposal, viewproposal,logout],
  'Financial Guarantor': [viewproposal, createtokens, cashout,logout],
  'Vendor': [viewproposal,cashoutrequest,logout],
  'Department Staff': [viewproposal,logout],
  'NUS': [viewproposal,logout]
}

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    //this.setNavItems = this.setNavItems.bind(this);
  }

  state = {
    isOpenComponents: true,
    isOpenContents: true,
  };
  /*
  componentWillMount() {
    this.setNavItems();
  }

  componentWillReceiveProps() {
    this.setNavItems();
  }


  setNavItems() {
    if (!this.props.login) {
      this.setState({navItems:[
        viewproposal
      ]});
    } else if (this.props.login.role == 'Student') {
      this.setState({navItems:[
        createproposal, viewproposal
      ]});
    } else if (this.props.login.role == 'Financial Guarantor') {
      this.setState({navItems:[
        viewproposal, createtokens, cashout
      ]});
    } else {
      this.setState({navItems:[
        viewproposal
      ]});
    }
  }
*/
  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };
  render() {
    const loginrole = this.props.login ? this.props.login.role : 'Student';
    console.log(navItems['Student']);
    return (
      <aside className={bem.b()} data-image="/img/sidebar/sidebar-4.jpg">
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src="/img/logo/logo1.png"
                width="130"
                height="70"
                className="pr-2"
                alt=""
              />
              
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems[loginrole].map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} size="1.5rem" />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
