import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Col, Row, FormGroup, ControlLabel, FormControl, Button, Glyphicon, ButtonToolbar, Modal, HelpBlock, Tabs, Tab, Radio, Checkbox} from 'react-bootstrap';

const formFields = ["name", "email", "phone", "salary", "age", "pets", "tenantsNum", "space", "floor", "roomsNum", "rentPeriod"];
const BookingsTableRow = ({name, email}) => {
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
        this.handlePetsCheckbox = this.handlePetsCheckbox.bind(this);

        this.state = {
            key: 1,
            show: false,
            hasPets: false
        };
    }

    handleSelect(key) {
        this.setState({ key });
        this.props.actions.fetchBookings();
      }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    handlePetsCheckbox() {
        if (this.state.hasPets) {
            this.setState({ hasPets: false });
        } else {
            this.setState({ hasPets: true });
        }
        
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data);
        this.props.actions.submitRegistration(
                                                data.get(formFields[0]),
                                                data.get(formFields[1]),
                                                data.get(formFields[2]),
                                                data.get(formFields[3]),
                                                data.get(formFields[4]),
                                                this.state.hasPets,
                                                data.get(formFields[6]),
                                                data.get(formFields[7]),
                                                data.get(formFields[8]),
                                                data.get(formFields[9]),
                                                data.get(formFields[10])
                                            );
        this.props.actions.fetchBookings();
    }

    componentDidMount() {
        this.props.actions.fetchBookings();
        
    }

    render() {
        // console.log(this.state.validationStatus);
       
        let validationStatus = {}
        for (let field of formFields) {
            validationStatus[field] = {};
            validationStatus[field]["state"] = null;
            validationStatus[field]["message"] = "";

            // if (registration.errors) {
            //     if (registration.errors[field]) {
            //         validationStatus[field]["state"] = "error";
            //         validationStatus[field]["message"] = registration.errors[field].join(". ");
            //     }
            // } else {
            //     if (Object.keys(registration).length > 0) {
            //         validationStatus[field]["state"] = "success";
            //     }
            // }  
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
                                controlId="emailGroup"
                                validationState={validationStatus[formFields[1]]["state"]}
                            >
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your email address"
                                    name={formFields[1]} 
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[1]]["message"]}</HelpBlock>
                            </FormGroup>
                            
                            <FormGroup
                                controlId="phoneGroup"
                                validationState={validationStatus[formFields[2]]["state"]}
                            >
                                <ControlLabel>Phone number</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your phone number"
                                    name={formFields[2]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[2]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="salaryGroup"
                                validationState={validationStatus[formFields[3]]["state"]}
                            >
                                <ControlLabel>Salary</ControlLabel>
                                <p>
                                    <Radio name={formFields[3]} value="0" inline>
                                        0 - 1.000
                                    </Radio>{' '}
                                    <Radio name={formFields[3]} value="1" inline>
                                        1.000 - 2.000
                                    </Radio>{' '}
                                    <Radio name={formFields[3]} value="2" inline>
                                        2.000 - 3.000
                                    </Radio>
                                    <Radio name={formFields[3]} value="3" inline>
                                        3.000 - 4.000
                                    </Radio>
                                    <Radio name={formFields[3]} value="4" inline>
                                        Mehr als 4.000
                                    </Radio>
                                </p>
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[3]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="ageGroup"
                                validationState={validationStatus[formFields[4]]["state"]}
                            >
                                <ControlLabel>Age</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your age"
                                    name={formFields[4]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[4]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="petsGroup"
                            >
                                <ControlLabel>Do you have any pets?</ControlLabel>
                                <p>
                                    <Checkbox
                                        name={formFields[4]}
                                        checked={this.state.hasPets}
                                        onChange={this.handlePetsCheckbox} 
                                        inline
                                    >I do have pets</Checkbox>
                                </p>
                            </FormGroup>

                            <FormGroup
                                controlId="tenantsNumGroup"
                                validationState={validationStatus[formFields[6]]["state"]}
                            >
                                <ControlLabel>Number of tenants</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter the number of tenants"
                                    name={formFields[6]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[6]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="spaceGroup"
                                validationState={validationStatus[formFields[7]]["state"]}
                            >
                                <ControlLabel>Desired size of the apartment (in square meters)</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter the desired size of the apartment"
                                    name={formFields[7]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[7]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="floorGroup"
                                validationState={validationStatus[formFields[8]]["state"]}
                            >
                                <ControlLabel>Desired floor</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter the desired floor"
                                    name={formFields[8]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[8]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="roomsNumGroup"
                                validationState={validationStatus[formFields[9]]["state"]}
                            >
                                <ControlLabel>Desired number of rooms</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter the desired number of rooms"
                                    name={formFields[9]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[9]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="rentPeriodGroup"
                                validationState={validationStatus[formFields[10]]["state"]}
                            >
                                <ControlLabel>Approximate rent period (in months)</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter the rent period"
                                    name={formFields[10]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[10]]["message"]}</HelpBlock>
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
                            {  this.props.bookings.map(visitor =>
                                <BookingsTableRow
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
    bookings: PropTypes.array.isRequired
};

export default Registration;
