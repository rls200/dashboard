import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Calendar from "./Calendar";
import {
	addEventModalOpen,
	addEvent,
	getDataForAddingEvent,
	getCities,
	addDataDateClick,
	getEventsList
} from '../../../redux/calendar/action';

class CalendarContainer extends React.Component {
	componentDidMount() {
		this.props.getDataForAddingEvent();
		this.props.getEventsList();
	}
	render() {
		return <Calendar
			openModal={this.props.openModal}
			events={this.props.events}
			addEventModalOpen={this.props.addEventModalOpen}
			addEvent={this.props.addEvent}
			listsForAddingEvent={this.props.listsForAddingEvent}
			getCities={this.props.getCities}
			dataDateClick={this.props.dataDateClick}
			addDataDateClick={this.props.addDataDateClick}
			getCities={this.props.getCities}
			cityCoordinates={this.props.cityCoordinates}
		/>
	}
}

const mapStateToProps = state => {
	return {
		openModal: state.Calendar.openModal,
		events: state.Calendar.events,
		listsForAddingEvent: state.Calendar.listsForAddingEvent,
		dataDateClick: state.Calendar.dataDateClick,
		cityCoordinates: state.Calendar.cityCoordinates,
	}
};

const mapDispatchToProps = dispatch => bindActionCreators({
	addEventModalOpen,
	addEvent,
	getDataForAddingEvent,
	getCities,
	addDataDateClick,
	getEventsList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);