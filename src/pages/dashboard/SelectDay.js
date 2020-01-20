import React from 'react';
import {bindActionCreators} from "redux";
import {fetchGetProjectsList, fetchGetIndicators} from '../../redux/dashboard/actions';
import {connect} from "react-redux";
import Select from "react-select";


const SelectDay = (props) => {
	const options = [
		{ value: '7', label: '7 дней' },
		{ value: '14', label: '14 дней' },
		{ value: '30', label: '30 дней' },
		{ value: '90', label: '90 дней' }
	];
	const handleChange = selectedOption => {
		props.setSelectCountDay(selectedOption.value);
		props.fetchGetIndicators(4, selectedOption.value, props.selectProjectId);
	};

	return (
		<React.Fragment>
			<Select
				defaultValue={options[0]}
				onChange={handleChange}
				classNamePrefix="react-select"
				options={options}>
			</Select>
		</React.Fragment>
	)
};

const mapStateToProps = state => {
	return {
		projectList: state.Dashboard.projectListData
	}
};
const mapDispatchToProps = dispatch => bindActionCreators({
	fetchGetProjectsList,
	fetchGetIndicators,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SelectDay);