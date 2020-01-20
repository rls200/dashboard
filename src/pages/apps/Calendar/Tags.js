import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {Col, FormGroup, Label, Row} from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {UpdateBtnDisabled} from "../Project/ProjectOption/ProjectEditForm";

import {
    setTagStatus,
    addTag,
    setNewTagsColor,
    setSelectTags
} from '../../../redux/calendar/action';
import ColorTag from './ColorTag';


class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: this.props.tags,
        };
        this.handleChange = this.handleChange.bind(this);
        this.beforeSubmit = this.beforeSubmit.bind(this);
        this.toggleTags = this.toggleTags.bind(this);
        this.handleValidSubmitTag = this.handleValidSubmitTag.bind(this);
        this.tegsRef = React.createRef();
    }

    beforeSubmit(e) {
        e.stopPropagation();
    };
    handleChange(e) {
        if (e.target.value === "addTag") {
            this.tegsRef.current.value = this.props.tags.value;
            this.toggleTags();
        } else {
            this.props.setSelectTags(
                e.target.value,
                e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text
            );
        }
    }

    toggleTags = () => {
        this.props.setTagStatus(!this.props.addTagStatus);
    };

    handleValidSubmitTag = (event, values) => {
        this.props.addTag(values.nameTag, this.props.addNewTagsData.color);
        this.tegsRef.current.value = '';
    };
    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.props.addTagStatus}
                    toggle={this.toggleTags}
                >
                    <ModalHeader toggle={this.toggleTags}>Создать тег</ModalHeader>
                    <ModalBody className="px-5 pb-4">
                        <AvForm
                            beforeSubmitValidation={this.beforeSubmit}
                            onValidSubmit={this.handleValidSubmitTag}
                            className="authentication-form"
                            id="addNewTag"
                        >
                            <Row className="justify-content-md-center align-items-center">
                                <Col xs="9" sm="10" md="10">
                                    <div className="input-tags-text">
                                        <AvGroup>
                                            <Label for="nameTag">Тег</Label>
                                            <AvInput type="text" name="nameTag" id="nameTag" placeholder="Тег" required />
                                            <AvFeedback>Поле обязательно для заполнения!</AvFeedback>
                                        </AvGroup>
                                    </div>
                                </Col>
                                <Col xs="3" sm="2" md="2">
                                    <div className="input-tags-text">
                                        <ColorTag
                                            addNewTagsData={this.props.addNewTagsData}
                                            setNewTagsColor={this.props.setNewTagsColor}
                                        />
                                    </div>
                                </Col>
                            </Row>
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
                <Label for="tagsEvent">Тег</Label>
                <AvInput
                    className="event-form-item popup-modal-input"
                    type="select"
                    name="tagsEvent"
                    value={this.state.defaultValue}
                    onChange={this.handleChange}
                    ref={this.tegsRef}
                >
                    <option value="" disabled style={{color: 'red', borderBottom: '1px solid red'}}>Выберите тег</option>
                    <option value="addTag">Создать тег</option>
                    <option value="">Без тега</option>
                    {
                        this.props.lists.tags && this.props.lists.tags.map(item => <option value={item.id} key={item.id}>{item.name}</option>)
                    }
                </AvInput>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        lists: state.Calendar.listsForAddingEvent,
        isLoadingCalendar: state.Calendar.isLoadingCalendar,
        addTagStatus: state.Calendar.addTagStatus,
        addNewTagsData: state.Calendar.addNewTagsData,
        tags: state.Calendar.addEventData.tags,
    }
};
const mapDispatchToProps = dispatch => bindActionCreators({
    setTagStatus,
    addTag,
    setNewTagsColor,
    setSelectTags
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tags);

