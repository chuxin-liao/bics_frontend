import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ViewProposal from 'pages/ViewProposal';
import Page from 'components/Page';
import createHistory from "history/createBrowserHistory"
import { Link } from "react-router-dom";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
} from 'reactstrap';

class Login extends React.Component {

  constructor(props){
    super(props);
    try {
      this.props.openSidebar('close');
    } catch (e) {}
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogin();
    this.state={role: 'Student'}
  }

  setRole(e) {
    this.setState({role: e.target.value});
  }

  setEmail(e) {
    this.setState({email: e.target.value});
  }

  setPassword(e) {
    this.setState({password: e.target.value});
  }

  handleLogin(){
    this.props.setLogin(this.state);
  }

  render() {
    return (

      <div>
        <MuiThemeProvider>
          
          <div>
          
            <Page title="Login">
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="Role" sm={2}>Role</Label>
                  <Col>
                  <Input type="select" name="role" onChange={this.setRole.bind(this)}>
                    <option>Student</option>
                    <option>Department Staff</option>
                    <option>Vendor</option>
                    <option>NUS</option>
                    <option>Financial Guarantor</option>
                  </Input>
                </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>Email</Label>
                  <Col>
                  <Input
                    type="email"
                    name="email"
                    onChange={this.setEmail.bind(this)}
                  />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>Password</Label>
                  <Col>
                  <Input
                    type="password"
                    name="password"
                    onChange={this.setPassword.bind(this)}
                  />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={{ size: 10, offset: 0 }}>
                    <Link to={{pathname:'/viewproposal'}} onClick={this.handleLogin} >
                      <RaisedButton label="Submit" secondary={true}/>
                    </Link> 
                  </Col>
                </FormGroup>

                <FormGroup row>
                <Label for = "registered" sm={2}>Not registered yet? </Label>
                  <Col sm={{ size: 9, offset: 0 }}>
                    <Link to={{pathname:'/register'}}>
                      <RaisedButton label="Register" primary={true}/>
                    </Link> 
                  </Col>
                </FormGroup>
                
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
         </div>
         </MuiThemeProvider>
      </div>

    );
  }
}
const style = {
 margin: 15,
};
export default Login;