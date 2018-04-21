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
  ButtonGroup
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
import { Link } from 'react-router-dom';

class ProposalDetailPage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {};
      if (props.location.state) {
        this.state = props.location.state;
        console.log(this.state);
      }
  }

  handleApproval() {
    if (this.state.rSelected == 1) {
      fetch('http://localhost:1235/approve', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          by: this.state.login.role,
          email: this.state.login.email,
          proposalId: this.state.proposal.proposalId
        })
      }).then(function(res) {
        document.getElementById("form").reset();
      }).catch(function(err) {
        console.log(err);
      });
    } else {
      alert("No changes made.");
    }
  }

  render() {

    var studentApproval = this.state.proposal.vendorApproval && !this.state.proposal.transferred && this.state.login.role == 'Student' ? 
                  (<ButtonGroup>
                  <Button
                    outline color="primary"
                    onClick={() => {
                      this.setState({ rSelected: 1 });
                    }}
                    active={this.state.rSelected === 1}
                  >
                    Approve
                  </Button>
                  <Button
                    outline color="primary"
                    onClick={() => {
                      this.setState({ rSelected: 2 });
                    }}
                    active={this.state.rSelected === 2}
                  >
                    Disapprove
                  </Button>
                </ButtonGroup>)
                : 
                (<Input type="name" name="text" value={this.state.proposal.transferred ? "Approved" : "Not Approved"} disabled={true}/>);

  var vendorApproval = this.state.proposal.deptApproval && !this.state.proposal.vendorApproval && this.state.login.role == 'Vendor' ? 
                  (<ButtonGroup>
                  <Button
                    outline color="primary"
                    onClick={() => {
                      this.setState({ rSelected: 1 });
                    }}
                    active={this.state.rSelected === 1}
                  >
                    Approve
                  </Button>
                  <Button
                    outline color="primary"
                    onClick={() => {
                      this.setState({ rSelected: 2 });
                    }}
                    active={this.state.rSelected === 2}
                  >
                    Disapprove
                  </Button>
                </ButtonGroup>)
                : 
                (<Input type="name" name="text" value={this.state.proposal.vendorApproval ? "Approved" : "Not Approved"} disabled={true}/>);

  var deptApproval = !this.state.proposal.deptApproval && this.state.login.role == 'Department Staff' ?
                  (<ButtonGroup>
                  <Button
                    outline color="primary"
                    onClick={() => {
                      this.setState({ rSelected: 1 });
                    }}
                    active={this.state.rSelected === 1}
                  >
                    Approve
                  </Button>
                  <Button
                    outline color="primary"
                    onClick={() => {
                      this.setState({ rSelected: 2 });
                    }}
                    active={this.state.rSelected === 2}
                  >
                    Disapprove
                  </Button>
                </ButtonGroup>)
                : 
                (<Input type="name" name="text" value={this.state.proposal.deptApproval ? "Approved" : "Not Approved"} disabled={true}/>);

  return (
    <Page title="View Proposal">
      <Row>
        
        <Col>
          <Card>
            <CardHeader>Proposal</CardHeader>
            <CardBody>
              <Form id="form">
                  
                <FormGroup row>
                  <Label for="exampleText" sm={2}>
                    Owner
                  </Label>
                  <Col sm={10}>
                    <Input name="owner" placeholder={this.state.proposal.student.slice(-1)} disabled={true}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleSelect" sm={2}>
                    Department
                  </Label>
                  <Col sm={10}>
                    <FormGroup>
                  
                    <Input name="department" placeholder={this.state.proposal.representingBody} disabled={true}/>
                  </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleSelect" sm={2}>
                    Vendor
                  </Label>
                  <Col sm={10}>
                    <FormGroup>
                  
                  <Input name="vendor" placeholder={this.state.proposal.vendor} disabled={true} />
                  </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleText" sm={2}>
                    Description
                  </Label>
                  <Col sm={10}>
                    <Input type="textarea" name="text" value = {this.state.proposal.Description} disabled={true}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleText" sm={2}>
                    Total Cost
                  </Label>
                  <Col sm={10}>
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input placeholder="Amount" value={this.state.proposal.totalCost} disabled={true}/>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleText" sm={2}>
                    Department Approval
                  </Label>
                  <Col sm={10}>
                    {deptApproval}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleText" sm={2}>
                    Vendor Approval
                  </Label>
                  <Col sm={10}>
                    {vendorApproval}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleText" sm={2}>
                    Student Approval
                  </Label>
                  <Col sm={10}>
                    {studentApproval}
                  </Col>
                </FormGroup>
          
                <FormGroup row>
                  <Col sm={{ size: 10, offset: 0 }}>
     
                    <Button onClick={()=>{ 
                      this.handleApproval();
                    }}>Save</Button>

                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  )};
}


export default ProposalDetailPage;
