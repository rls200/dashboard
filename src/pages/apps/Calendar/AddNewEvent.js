import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	FormGroup,
	Container,
	Row,
	Col,
} from 'reactstrap';
import {AvFeedback, AvForm, AvGroup, AvInput, AvField} from "availity-reactstrap-validation";
import Flatpickr from "react-flatpickr";
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import {UpdateBtnDisabled} from "../Project/ProjectOption/ProjectEditForm";
import Suggest from "./Suggest";
import PositionEvents from './PositionEvent';
import Contacts from './Contacts';
import Tags from './Tags';
import RepeatEvent from './RepeatEvent'
import {
	addDataDateClick,
	addEvent,
	addEventModalOpen,
	getCities,
	setDateStart,
	setDateEnd,
	setDateRepeat,
	setTimeStart,
	setTimeEnd,
	setDisabledDaily,
	setDisabledWeekly,
	setCityStatus,
	setCityName,
	addCityCoordinates,
	setOraganizationName,
} from "../../../redux/calendar/action";

class AddNewEvent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
		};
		this.handleValidSubmitEvent = this.handleValidSubmitEvent.bind(this);
	}

	toggle = () => {
		this.props.addEventModalOpen();
	};

	handleValidSubmitEvent(event, values) {
		const addEventData = this.props.addEventData;
		const listsForAddingEvent = this.props.listsForAddingEvent;
		let locationID = null, phone = null;
		const project_id =  values.projectList ? values.projectList : listsForAddingEvent.projects && listsForAddingEvent.projects[0].id;
		const name =  values.nameEvent || null;
		const guarantee =  values.honorariumEvent || null;
		const comment =  values.descriptionEvent || null;
		const type_id =  values.typeEvent ? values.typeEvent : listsForAddingEvent.types && listsForAddingEvent.types[0].id;
		const cityCoords = this.props.cityCoordinates.coordinates ? {x: this.props.cityCoordinates.coordinates[0], y: this.props.cityCoordinates.coordinates[1]} : null;
		const orgzItem = addEventData.organizationItem;
		const orgzCoords = orgzItem.geometry ? {x: orgzItem.geometry.coordinates[0], y: orgzItem.geometry.coordinates[1]} : null;
		const properties = orgzItem.properties ? orgzItem.properties : null;
		if (properties) {
			locationID = properties.CompanyMetaData.id || null;
			phone = properties.CompanyMetaData.Phones ? properties.CompanyMetaData.Phones[0].formatted : null;
		}

		const newEventData = {
			project_id: project_id,
			name: name,
			place: {
				name: addEventData.city,
				coords: cityCoords,
			},
			location: {
				locationID: locationID,
				name: addEventData.organization,
				phone: phone,
				coords: orgzCoords,
			},
			contact_id: addEventData.contact.value || null,
			guarantee: guarantee,
			comment: comment,
			type_id: type_id,
			tag_id: addEventData.tagsId,
			manager_id: null,
			date: {
				begin_date: addEventData.dateStart.getDate() + '-' + (parseInt(addEventData.dateStart.getMonth())+1) + '-' + addEventData.dateStart.getFullYear(),
				end_date: addEventData.dateEnd.getDate() + '-' + (parseInt(addEventData.dateEnd.getMonth())+1) + '-' + addEventData.dateEnd.getFullYear(),
				begin_time: addEventData.timeStart.getHours() + ':' + addEventData.timeStart.getMinutes(),
				end_time: addEventData.timeEnd.getHours() + ':' + addEventData.timeEnd.getMinutes(),
				repeat_date: addEventData.dateRepeat && addEventData.dateRepeat.getDate() + '-' + (parseInt(addEventData.dateRepeat.getMonth())+1) + '-' + addEventData.dateRepeat.getFullYear(),
				repeat_type: addEventData.periodRepeat
			}
		};

		this.props.addEvent(newEventData);
	};

	daysResult = () => {
		const addEventData = this.props.addEventData;
		let timeDiff = Math.abs(addEventData.dateEnd.getTime() - addEventData.dateStart.getTime());
		let colDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		if (colDays !== 0) {
			this.props.setDisabledDaily(true)
		} else {
			this.props.setDisabledDaily(false)
		}

		if (colDays > 6) {
			this.props.setDisabledWeekly(true)
		} else {
			this.props.setDisabledWeekly(false)
		}

	};
	onChangeDateStart = date => {
		console.log(date[0].getDate()+'-'+date[0].getMonth()+ '-' + date[0].getFullYear())
		this.props.setDateStart(date);
		this.daysResult();
	};
	onChangeDateEnd = date => {
		this.props.setDateEnd(date);
		this.daysResult();
	};

	render() {
		const lists = this.props.listsForAddingEvent;
		const addEventData = this.props.addEventData;

		return (
			<React.Fragment>
				<Modal
					isOpen={this.props.openModal}
					toggle={this.toggle}
					size={'lg'}
					className="popup-modal-content"
				>
					<ModalHeader
						toggle={this.toggle}
						className="popup-modal-head"
					>
						Добавить событие
					</ModalHeader>
					<ModalBody>
						<Container className="themed-container pb-4">
							<Row className="justify-content-md-center">
								<Col sm="12" md="12">
									<div className="px-3">
										<AvForm onValidSubmit={this.handleValidSubmitEvent} className="authentication-form" id="addEventForm">
											<Row>
												<Col md="6">
													<AvField
														className="event-form-item popup-modal-input"
														type="select"
														name="projectList"
														label="Проект"
														validate={{required: {value: true, errorMessage: 'Поле обязательно для заполнения!'}}}
													>
														<option value="" disabled>Выберите проект</option>
														{lists.projects && lists.projects.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
													</AvField>
												</Col>
												<Col md="6">
													<AvGroup className={'event-form-item'}>
														<Label for="nameEvent">Название</Label>
														<AvInput
															className="popup-modal-input"
															autocomplete="off"
															type="text"
															name="nameEvent"
															id="nameEvent"
															placeholder="Название"
															required
														/>
														<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
													</AvGroup>
												</Col>
											</Row>
											<Row>
												<Col md="6">
													<AvGroup className={'event-form-item'}>
														<AvField
															className="event-form-item popup-modal-input"
															type="select" name="typeEvent"
															label="Тип события"
															validate={{required: {value: true, errorMessage: 'Поле обязательно для заполнения!'}}}
														>
															<option value="" disabled>Выберите тип</option>
															{lists.types && lists.types.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
														</AvField>
														<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
													</AvGroup>
												</Col>
												<Col md="6">
													<AvGroup className={'event-form-item'}>
														<Contacts />
														<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
													</AvGroup>
												</Col>
											</Row>
											<Row>
												<Col md="6">
													<AvGroup className={'event-form-item'}>
														<Label for="cityEvent">Город</Label>
														<Suggest
															getCities={this.props.getCities}
															cityCoordinates={this.props.cityCoordinates}
															setCityStatus={this.props.setCityStatus}
															city={addEventData.city}
															setCityName={this.props.setCityName}
															addCityCoordinates={this.props.addCityCoordinates}
															setOraganizationName={this.props.setOraganizationName}
														/>
														<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
													</AvGroup>
												</Col>
												<Col md="6">
													<AvGroup className={'event-form-item'}>
														<Label for="positionEvent">Место</Label>
														<PositionEvents />
														<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
													</AvGroup>
												</Col>
											</Row>
											<Row>
												<Col md="6">
													<AvGroup className={'event-form-item'}>
														<Label for="dateStartEvent">Дата начала</Label>
														<Flatpickr
															value={addEventData.dateStart}
															options={{
																dateFormat: "d-m-Y",
																minDate: "today",
																locale: Russian,
															}}
															onChange={this.onChangeDateStart}
															className="form-control popup-modal-input"
															name="dateStartEvent"
															id="dateStartEvent"
														/>
													</AvGroup>
												</Col>
												<Col md="6">
													<AvGroup className={'event-form-item'}>
														<Label for="dateEndEvent">Дата окончания</Label>
														<Flatpickr
															value={addEventData.dateEnd}
															options={{
																dateFormat: "d-m-Y",
																locale: Russian,
																minDate: new Date(addEventData.dateStart)
															}}
															onChange={this.onChangeDateEnd}
															className="form-control popup-modal-input"
															name="dateEndEvent"
															id="dateEndEvent"
														/>
													</AvGroup>
												</Col>
											</Row>
											<Row>
												<Col md="6">
													<AvGroup className={'event-form-item'}>
														<Label for="timeStartEvent">Время начала</Label>
														<Flatpickr
															value={addEventData.timeStart}
															options={{
																enableTime: true,
																noCalendar: true,
																dateFormat: "H:i",
																time_24hr: true,
															}}
															onChange={time => { this.props.setTimeStart(time) }}
															className="form-control popup-modal-input"
															name="timeStartEvent"
															id="timeStartEvent"
														/>
													</AvGroup>
												</Col>
												<Col md="6">
													<AvGroup className={'event-form-item'}>
														<Label for="timeEndEvent">Время окончания</Label>
														<Flatpickr
															value={addEventData.timeEnd}
															options={{
																enableTime: true,
																noCalendar: true,
																dateFormat: "H:i",
																time_24hr: true,
															}}
															onChange={time => { this.props.setTimeEnd(time) }}
															className="form-control popup-modal-input"
															name="timeEndEvent"
															id="timeEndEvent"
														/>
													</AvGroup>
												</Col>
											</Row>
											<Row>
												<Col md="6">
													<Tags />
												</Col>
												<Col md="6">
													<AvGroup className={'event-form-item'}>
														<Label for="honorariumEvent">Гонорар</Label>
														<AvInput className="popup-modal-input" type="text" name="honorariumEvent" id="honorariumEvent" placeholder="100000" />
														<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
													</AvGroup>
												</Col>
											</Row>
											<Row>
												<Col md={12}>
													<RepeatEvent />
												</Col>
											</Row>
											<Row>
												<Col md="12">
													<AvGroup className="mb-5">
														<Label for="descriptionEvent">Описание</Label>
														<AvInput className="popup-modal-input" type="textarea" name="descriptionEvent" id="descriptionEvent" placeholder="Описание" rows="5" />
														<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
													</AvGroup>
												</Col>
											</Row>
											<Row className="justify-content-md-center">
												<Col sm="12" md="5">
													<FormGroup className="form-group mb-0 text-center">
														{this.props.isLoading ?
															<UpdateBtnDisabled /> :
															<Button className="btn-block popup-modal-button" size="lg">Сохранить</Button>
														}
													</FormGroup>
												</Col>
											</Row>
										</AvForm>
									</div>
								</Col>
							</Row>
						</Container>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		openModal: state.Calendar.openModal,
		listsForAddingEvent: state.Calendar.listsForAddingEvent,
		dataDateClick: state.Calendar.dataDateClick,
		cityCoordinates: state.Calendar.cityCoordinates,
		addEventData: state.Calendar.addEventData,
	}
};
const mapDispatchToProps = dispatch => bindActionCreators({
	addEventModalOpen,
	addEvent,
	getCities,
	addDataDateClick,
	setDateStart,
	setDateEnd,
	setDateRepeat,
	setTimeStart,
	setTimeEnd,
	setDisabledDaily,
	setDisabledWeekly,
	setCityStatus,
	setCityName,
	addCityCoordinates,
	setOraganizationName,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewEvent);