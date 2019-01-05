import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Col, Row, FormGroup, ControlLabel, FormControl, Button, Glyphicon, ButtonToolbar, Modal, HelpBlock, Tabs, Tab} from 'react-bootstrap';

const formFields = ["name", "password", "address", "email", "phone"];
const VisitorsTableRow = ({name, email}) => {
    return (
        <Row style={{marginTop:10}}>
            <Col xs={4} sm={4} md={4} lg={4} >
                {name}
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} >
                {email}
            </Col>
        </Row>
    );
}
class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            key: 1,
            show: false
        };
    }

    handleSelect(key) {
        this.setState({ key });
        this.props.actions.fetchVisitors();
      }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.actions.submitRegistration(
                                                data.get(formFields[0]),
                                                data.get(formFields[1]),
                                                data.get(formFields[2]),
                                                data.get(formFields[3]),
                                                data.get(formFields[4])
                                            );
        this.props.actions.fetchVisitors();
    }

    componentDidMount() {
        this.props.actions.fetchVisitors();
    }

    render() {
        const registration = (this.props.registration ? this.props.registration : {});
        let validationStatus = {};
        for (let field of formFields) {
            validationStatus[field] = {};
            validationStatus[field]["state"] = null;
            validationStatus[field]["message"] = "";

            if (registration.errors) {
                if (registration.errors[field]) {
                    validationStatus[field]["state"] = "error";
                    validationStatus[field]["message"] = registration.errors[field].join(". ");
                }
            } else {
                if (Object.keys(registration).length > 0) {
                    validationStatus[field]["state"] = "success";
                }
            }  
        }
        return(
                <div>
                    <Tabs
                        activeKey={this.state.key}
                        onSelect={this.handleSelect}
                        id="controlled-tab-example"
                    >
                        <Tab eventKey={1} title="Enter your data">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup
                                controlId="nameGroup"
                                validationState={validationStatus[formFields[0]]["state"]}
                            >
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your name"
                                    name={formFields[0]}                                        
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[0]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="passwordGroup"
                                validationState={validationStatus[formFields[1]]["state"]}
                            >
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    type="password" 
                                    placeholder="Enter your password"
                                    name={formFields[1]}                                        
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[1]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="addressGroup"
                                validationState={validationStatus[formFields[2]]["state"]}
                            >
                                <ControlLabel>Address</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your address"
                                    name={formFields[2]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[2]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="emailGroup"
                                validationState={validationStatus[formFields[3]]["state"]}
                            >
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your email address"
                                    name={formFields[3]}                                        
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[3]]["message"]}</HelpBlock>
                            </FormGroup>
                            
                            <FormGroup
                                controlId="phoneGroup"
                                validationState={validationStatus[formFields[4]]["state"]}
                            >
                                <ControlLabel>Phone number</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your phone number"
                                    name={formFields[4]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[4]]["message"]}</HelpBlock>
                            </FormGroup>
                            <ButtonToolbar>
                                <Button type="submit">Register</Button>
                                <Button title="Get help" onClick={this.handleShow}>
                                    <Glyphicon glyph="info-sign" />
                                </Button>
                            </ButtonToolbar>                    
                        </form> 


                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>About this application</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h4>User registration form {this.props.apiinfo.version}</h4>
                                <p>
                                    This application was developed by {this.props.apiinfo.author}
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </Tab>
                    <Tab eventKey={2} title="Complete list">
                        <Grid style={{width:600}}>
                            <Row>
                                <Col xs={4} sm={4} md={4} lg={4} ><b>Name</b></Col>
                                <Col xs={4} sm={4} md={4} lg={4} ><b>Email</b></Col>
                            </Row>
                            {  this.props.visitors.map(visitor =>
                                <VisitorsTableRow
                                    key={visitor.id}
                                    name={visitor.name}
                                    email={visitor.email}
                                />
                            )
                            }
                        </Grid>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

Registration.propTypes = {
    apiinfo: PropTypes.object.isRequired,
    registration: PropTypes.object.isRequired,
    visitors: PropTypes.array.isRequired
};

export default Registration;
