import React from 'react';

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
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

import { Link } from "react-router-dom";
import Page from 'components/Page';

class CreateProposalPage extends React.Component {
   
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const state = {
      'email': this.props.login.email,
      'department': data.get('department'),
      'vendor': data.get('vendor'),
      'description': data.get('description'),
      'cost': data.get('cost'),
    }

    console.log(state)
    
    fetch('http://localhost:1235/create_proposal', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(state)
    }).then(function(res) {
        document.getElementById("form").reset();
    }).catch(function(err) {
      console.log(err);
    });
  }

  render(){
  return (
    <Page title="New Proposal">
      <Row>
        
        <Col>
          <Card>
            <CardHeader>Proposal</CardHeader>
            <CardBody>
              <Form id="form" onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Label for="exampleSelect" sm={2}>
                    Department
                  </Label>
                  <Col sm={10}>
                    <FormGroup>
                  
                      <Input type="select" name="department">
                        <option>School of Computing</option>
                        <option>Faculty of Science</option>
                        <option>Faculty of Engineering</option>
                        <option>Kent Ridge Hall</option>
                        <option>Temasek Hall</option>
                     </Input>
                  </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleSelect" sm={2}>
                    Vendor
                  </Label>
                  <Col sm={10}>
                    <FormGroup>
                  
                  <Input type="select" name="vendor">
                    <option>NTUC FairPrice</option>
                    <option>PGP Nanyang Mart</option>
                    <option>Popular Bookstore</option>
                    <option>NBC Stationery & Gifts</option>
                    <option>PaperMarket</option>
                  </Input>
                  </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleText" sm={2}>
                    Description
                  </Label>
                  <Col sm={10}>
                    <Input type="textarea" name="description" />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleText" sm={2}>
                    Total Cost
                  </Label>
                  <Col sm={10}>
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input placeholder="Amount" type="number" step = "0.1" name="cost"/>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleFile" sm={2}>
                    Supporting Files
                  </Label>
                  <Col sm={10}>
                    <Input type="file" name="file" />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  
                  <Col sm={{ size: 10 }}>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" id="checkbox2" /> I agree to the terms and conditions
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={{ size: 10, offset: 0 }}>
                    <Button>Submit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};
}

export default CreateProposalPage;
