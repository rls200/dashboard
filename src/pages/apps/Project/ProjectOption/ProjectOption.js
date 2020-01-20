import React from "react";

import ProjectEdit from './ProjectEdit';
import {bindActionCreators} from "redux";
import {fetchDeleteProjects, fetchEditProjects, fetchUpdateProjects} from "../../../../redux/projects/actions";
import {connect} from "react-redux";
import { Spinner } from 'reactstrap';

const ProjectOption = (props) => {
	return (
		<div className="float-right">
			<ProjectEdit
				fetchUpdateProjects={props.fetchUpdateProjects}
				fetchEditProjects={props.fetchEditProjects}
				id={props.id}
				initialValues={props.initialValues}
				isLoading={props.isLoading}
				status={props.status}
				error={props.error}
			/>
			{props.deleteStatus.status && props.deleteStatus.id === props.id ?
				<i className="uil mr-2 project-icon">
					<Spinner style={{ width: '22px', height: '22px' }} color="danger" />
				</i> :
				<i
					className="uil uil-trash mr-2 project-icon vx-project-icon-red project-option-icon"
					onClick={() => props.fetchDeleteProjects(props.id)}></i>
			}
		</div>
	)
};

const mapStateToProps = state => {
	return {
		initialValues: {
			name: state.Projects.editData.name,
			link_vk: state.Projects.editData.link_vk,
			description: state.Projects.editData.description,
		},
		error: state.Projects.error,
		status: state.Projects.status,
		isLoading: state.Projects.isLoading,
		deleteStatus: state.Projects.deleteStatus,
	}
};
const mapDispatchToProps = dispatch => bindActionCreators({
	fetchEditProjects,
	fetchUpdateProjects,
	fetchDeleteProjects,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOption);

