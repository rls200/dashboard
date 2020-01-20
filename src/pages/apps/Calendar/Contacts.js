import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {Col, FormGroup, Label, Row} from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {UpdateBtnDisabled} from "../Project/ProjectOption/ProjectEditForm";
import {addContacts, setContactStatus, setSelectContact} from '../../../redux/calendar/action';


class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: this.props.contact || '',
            telRequired: true,
            emailRequired: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.beforeSubmit = this.beforeSubmit.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.handleChangeTel = this.handleChangeTel.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.contactRef = React.createRef();
    }
    beforeSubmit(e) {
        e.stopPropagation();
    };
    handleChange(e) {
        if (e.target.value === "addContact") {
            this.contactRef.current.value = this.props.contact.value || '';
            this.toggleNested();
        } else {
            this.props.setSelectContact(
                e.target.value,
                e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text
            );
        }
    }
    toggleNested() {
        this.props.setContactStatus(!this.props.addContactStatus);
    };
    handleValidSubmit(event, values) {
        this.props.addContacts(values.nameTel, values.telTel, values.telEmail, values.lastNameTel, values.telPlace, values.telNotes);
        this.contactRef.current.value = '';
    };
    handleChangeTel(e) {
        if (e.target.value.length !== 0) {
            this.setState({
                emailRequired: false
            })
        } else {
            this.setState({
                emailRequired: true
            })
        }
    }
    handleChangeEmail(e) {
        if(e.target.value.length !== 0) {
            this.setState({
                telRequired: false
            })
        } else {
            this.setState({
                telRequired: true
            })
        }
    }
    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.props.addContactStatus}
                    toggle={this.toggleNested}
                >
                    <ModalHeader toggle={this.toggleNested}>Создать контакт</ModalHeader>
                    <ModalBody className="px-5 pb-4">
                        <AvForm
                            beforeSubmitValidation={this.beforeSubmit}
                            onValidSubmit={this.handleValidSubmit}
                            className="authentication-form"
                        >
                                    <AvGroup>
                                        <Label for="nameTel">Имя</Label>
                                        <AvInput type="text" name="nameTel" id="nameTel" placeholder="Имя" required />
                                        <AvFeedback>Поле обязательно для заполнения!</AvFeedback>
                                    </AvGroup>
                                    <AvGroup>
                                        <Label for="lastNameTel">Фамилия</Label>
                                        <AvInput type="text" name="lastNameTel" id="lastNameTel" placeholder="Фамилия" />
                                    </AvGroup>
                                    <AvGroup>
                                        <Label for="telTel">Телефон</Label>
                                        <AvInput 
                                            type="text"
                                            name="telTel"
                                            id="telTel"
                                            placeholder="89xxxxxxxxx"
                                            onChange={this.handleChangeTel}
                                            validate={{
                                                required: {value: this.state.telRequired},
                                            }}
                                        />
                                        <AvFeedback>Поле обязательно для заполнения!</AvFeedback>
                                    </AvGroup>
                                    <AvGroup>
                                        <Label for="telEmail">Email</Label>
                                        <AvInput
                                            type="email"
                                            name="telEmail"
                                            id="telEmail"
                                            placeholder="Email"
                                            onChange={this.handleChangeEmail}
                                            validate={{
                                                required: {value: this.state.emailRequired}
                                            }}
                                        />
                                        <AvFeedback>Поле обязательно для заполнения!</AvFeedback>
                                    </AvGroup>
                                    <AvGroup>
                                        <Label for="telPlace">Место</Label>
                                        <AvInput type="text" name="telPlace" id="telPlace" placeholder="Место" />
                                    </AvGroup>
                                    <AvGroup>
                                        <Label for="telNotes">Заметки</Label>
                                        <AvInput type="text" name="telNotes" id="telNotes" placeholder="Заметки" />
                                    </AvGroup>
                            <Row className="justify-content-md-center">
                                <Col sm="12" md="5">
                                    <FormGroup className="form-group mb-0 text-center">
                                        {this.props.isLoadingCalendar ?
                                            <UpdateBtnDisabled /> :
                                            <Button color="primary" className="btn-block" size="lg">Сохранить</Button>
                                        }
                                    </FormGroup>
                                </Col>
                            </Row>
                        </AvForm>
                    </ModalBody>
                </Modal>
                <Label for="telEvent">Связать с контактом</Label>
                <AvInput
                    className="event-form-item popup-modal-input"
                    type="select"
                    name="telEvent"
                    onChange={this.handleChange}
                    ref={this.contactRef}
                    value={this.state.defaultValue}
                    required
                >
                    <option value='' disabled>Выберите контакт</option>
                    <option value="addContact">Создать контакт</option>
                    {this.props.lists.contacts && this.props.lists.contacts.map(item => <option value={item.id} key={item.id}>{item.firstname}</option>)}
                </AvInput>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        lists: state.Calendar.listsForAddingEvent,
        isLoadingCalendar: state.Calendar.isLoadingCalendar,
        addContactStatus: state.Calendar.addContactStatus,
        contactsList: state.Calendar.listsForAddingEvent.contacts,
        contact: state.Calendar.addEventData.contact
    }
};
const mapDispatchToProps = dispatch => bindActionCreators({
    addContacts,
    setContactStatus,
    setSelectContact
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);

