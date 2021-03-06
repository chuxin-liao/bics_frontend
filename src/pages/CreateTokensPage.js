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

import Page from 'components/Page';

class CreateTokensPage extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const state = {
      'tokens': data.get('tokens')
    }

    console.log(state)

    fetch('http://localhost:1235/create_tokens', {
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
    <Page title="Create Tokens">
      <Row>
        
        <Col>
          <Card>
            <CardHeader>Tokens Transfer</CardHeader>
            <CardBody>
              <Form id="form" onSubmit={this.handleSubmit}>
                
                <FormGroup row>
                  <Label for="exampleText" sm={2}>
                    Tokens
                  </Label>
                  <Col sm={10}>
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input placeholder="Amount" type="number" step = "0.1" name="tokens"/>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleDate" sm={2}>Date</Label>
                  <Col sm={10}>
                  <Input
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                  />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="Full Name" sm={2}>Full Name</Label>
                  <Col sm={10}>
                  <Input
                    name="fullname"
                  />
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

export default CreateTokensPage;
