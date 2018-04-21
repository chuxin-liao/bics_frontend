import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import Page from 'components/Page';
import { Link, Redirect } from 'react-router-dom';
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

class Register extends Component {
  constructor(props){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    var payload={
    "role": data.get('role'), 
    "matric": data.get('matric'),
    "department": data.get('department'),
    "first_name": data.get('first_name'),
    "last_name":data.get('last_name'),
    "email":data.get('email'),
    "id": "3"
    }
   
    fetch('http://localhost:1235/register', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
      }).then(function(res) {
         window.location = '/login';
      }).catch(function(err) {
        console.log(err);
      });
    }

  render() {
    return (
      <MuiThemeProvider>
      <Page title="Register">
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="Role">Role</Label>
                  <Input type="select" name="role">
                    <option>Student</option>
                    <option>Department Staff</option>
                    <option>Vendor</option>
                    <option>NUS</option>
                    <option>Financial Guarantor</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="Identification Number">Identification Number</Label>
                  <Input
                    name="matric"
                  />
                </FormGroup>

               <FormGroup>
                      <Label for="Department">Department</Label>
                      <Input type="select" name="department">
                        <option>School of Computing</option>
                        <option>Faculty of Science</option>
                        <option>Faculty of Engineering</option>
                        <option>Kent Ridge Hall</option>
                        <option>Temasek Hall</option>
                     </Input>
                  </FormGroup>

                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="First Name">First Name</Label>
                  <Input
                    name="first_name"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="Last Name">Last Name</Label>
                  <Input
                    name="last_name"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="examplePassword">Confirm Password</Label>
                  <Input
                    type="password"
                    name="password"
                  />
                </FormGroup>

                <FormGroup row>
                  <Col sm={{ size: 10, offset: 0 }}>
                    <Button>Submit</Button>
                  </Col>
                </FormGroup>
                
                <FormGroup row>
                <Label for = "registered" sm={2}>Not registered yet? </Label>
                  <Col sm={{ size: 10, offset: 0 }}>
                    <Link to={{pathname:'/login'}}>
                      <RaisedButton label="Sign In" primary={true}/>
                    </Link> 
                  </Col>
                </FormGroup>
                
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
    </MuiThemeProvider>

    );
  }
}
const style = {
  margin: 15,
};
export default Register;