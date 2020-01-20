import React, { Component } from 'react';
import {
	Modal,
	ModalHeader,
	ModalBody,
	Container,
	Row,
	Col,
} from 'reactstrap';

import ProjectEditForm from './ProjectEditForm';


class ProjectEdit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
		};

		this.toggle = this.toggle.bind(this);
		this.openModalWithSize = this.openModalWithSize.bind(this);
		this.openModalWithClass = this.openModalWithClass.bind(this);
		this.handleValidSubmit = this.handleValidSubmit.bind(this);
	}


	/**
	 * Show/hide the modal
	 */
	toggle = () => {
		this.setState(prevState => ({
			modal: !prevState.modal,
		}));
	};

	/**
	 * Opens large modal
	 */
	openModalWithSize = size => {
		this.setState({ size: size, className: null });
		this.toggle();
	};

	/**
	 * Opens modal with custom class
	 */
	openModalWithClass = className => {
		this.props.fetchEditProjects(this.props.id);
		this.setState({ className: className, size: null });
		this.toggle();
	};

	handleValidSubmit = (event, values) => {
		this.props.fetchUpdateProjects(this.props.id, values.name, values.link_vk, values.description)
	};

	render() {
		return (
			<React.Fragment>
				<i
					className="uil uil-edit-alt mr-2 project-icon vx-project-icon-green project-option-icon"
					onClick={() => this.openModalWithClass('modal-dialog-centered')}
				>
				</i>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.state.className}
					size={'lg'}>
					<ModalHeader toggle={this.toggle}>Редактировать</ModalHeader>
					<ModalBody>
						<Container className="themed-container pb-4">
							<Row className="justify-content-md-center">
								<Col sm="12" md="10">
									<ProjectEditForm
										onValidSubmit={this.handleValidSubmit}
										initialValues={this.props.initialValues}
										isLoading={this.props.isLoading}
									/>
								</Col>
							</Row>
						</Container>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

export default ProjectEdit;


