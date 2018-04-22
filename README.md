## Preview

This is the React frontend of IS4302 project - Blockchain Integrated Claims Systems(BICS). BICS is intended to utilise blockchain technology and its benefits to effectively tackle the pain points of the current claims process faced by students and staff.

## Quick Start

1.  Clone the repo `git clone https://github.com/chuxin-liao/Bics.git`
2.  Go to your project folder from your terminal
3.  Run: `npm install`
4.  After install, run: `npm start`
5.  It will open your browser(http://localhost:3007)

## Note

This repository contains the frontend of the project. In order for this application to function, the backend server and the blockchain rest server also need to be run. For details of how to run the backend and the blockchain rest server, you can refer [BICS Backend](https://github.com/chuxin-liao/bics_backend) and [BICS Business Network Archive](https://github.com/chuxin-liao/bics_network_archive).

## Manual Testing - DEMO Example
### Preconditions
On composer playground, create a Financial Guarantor, Create a Governing Body(NUS, Balance 100 biccoins), Create an Approver(approver1, School of Computing, 40 biccoins), Create a vendor (NTUC FairPrice, Balance 0 biccoins), Create a submitter (submitter1, School of Computing), Create a proposal (By submitter1, from NTUC FairPrice, with a cost of 50 biccoins)

### Features to be tested

#### Register
Register an account as a student and fill in all the fields in the registration form. Once the form is submitted, a new participant should be created on the blockchain which can be seen on the composer playground.
Test1: Register an account as a student with ID - `A0131000M`, email - `submitter2@a.com`, first name - `submitter`, last name - `two`, password - `12345`, confirm password - `12345`. Click submit. A student participant with email `submitter2@a.com` will be created on the blockchain.

#### Login
Select a role and login with an existing account. You should be directed to the view proposals page where all the proposals related this account will be displayed.
Test1: Login as `submitter1@a.com`, you should see one proposal from NTUC FairPrice with a cost of 50 biccoins
Test2: Register a new account and login. The view proposal page will be empty since the new account has not yet created any proposal.

#### Create Proposal
Login with an existing student account. Navigate to CREATE PROPOSAL page. Fill in all the details in the create proposal form and submit. A new asset proposal should be created on the blockchain.
Test1: Login as `submitter1@a.com`, you can click on the menu button on top the screen to open the sidebar. Select CREATE PROPOSAL. Select `School of Computing`, `NTUC FairPrice`, fill in `Test` for Description, enter `30` as the total cost, agree to the terms and conditions. Click on the submit button. A new proposal will be created on the blockchain. If you navigate back to VIEW PROPOSAL page, a new proposal with 0% approval status will appear.  

#### View Proposal
Select a role and login with an existing account. You should view all the proposals related to this account.
Test1: Login as `submitter1@a.com`. You should only see the proposals created by submitter1.
Test2: Login as `approver1@a.com`. You should view all the proposals under School of Computing.
Test3: Login as `NTUC FairPrice`. You should view all the proposals invloving NTUC FairPrice.
Test4: Login as a `financial guarantor`. You should view all the proposals.
Test5: Login as `NUS`. You should view all the proposals.

#### Approve Proposal
Approvers can approvals all the proposals that belong to their deparments and within their budget. They cannot update the status once they approve a proposal. Vendor can only approve a proposal it has been approved by an approver. Student cannot approve a proposal until it has been approved by a department head and then by a vendor.
Test1: Login as `submitter1@a.com`. Click on the proposal with a cost of $50. You should not be able to update any approve status. (It has not been approved by department head nor vendor)
Test2: Login as `approver1@a.com`. The proposal with a cost of $50 will have a status of 0%. Click on the proposal. Choose approve and save the form. Navigate back to VIEW PROPOSAL. The approval status will be updated to 33.3%. Login as `NTUC FairPrice`. The proposal with a cost of $50 will have a status of 33.3%. Choose approve and save the form. Navigate back to VIEW PROPOSAL. The approval status will be updated to 66.6%. Note the balance of NTUC FairPrice. Login as `submitter1@a.com`. The proposal with a cost of $50 will have a status of 66.6%. Choose approve and save the form. Navigate back to VIEW PROPOSAL. The approval status will be updated to 100%. Login as `NTUC FairPrice`. The balance should increase by $50. Login as the governing body. The balance should descrease by $50.

#### View Balance
Login as vendors or NUS, you should be able to see the balance on the top right corner.
Test1: Login as `NTUC Fairprice`. The balance will be shown on the top right corner. It should be the same as the number on the blockchain.
Test2: Login as `NUS`. The balance will be shown on the top right corner. It should be the same as the number on the blockchain.

#### Submit cashout request
Login as vendors, you should be able to submit a cash out request.
Test1: Login as `NTUC FairPrice`. Navigate to CASHOUT REQUEST. Fill in the form with `$10, 04/05/2018, NTUC` and submit.

#### Destroy tokens
Login as financial guarantor. You can navigate to CASH OUT page to update the balances of vendors.
Test1: Login as `NTUC FairPrice`. Note the balance. Login as a financial guarantor. Navigate to CASH OUT page. Input `NTUC FairPrice, $10, 04/05/2018, FIN` and submit. Login as `NTUC FairPrice`. The balance should decrease by $10. 

#### Create tokens
Login as financial guarantor. You can navigate to CREATE TOKENS page to update the balances of the governing body.
Test1: Login as `NUS`. Note the balance. Login as a `financial guarantor`. Navigate to CREATE TOKENS page. Input `$80, 04/05/2018, FIN` and submit. Login as `NUS`. The balance should increase by $80. 

## Acknowledgments
This project is built on top of [React Reduction](https://github.com/reduction-admin/react-reduction).

