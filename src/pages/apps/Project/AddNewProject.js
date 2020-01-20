import React, { Component } from 'react';
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
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {UpdateBtnDisabled} from  './ProjectOption/ProjectEditForm';


class AddProject extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.openModalWithClass = this.openModalWithClass.bind(this);
		this.handleValidSubmit = this.handleValidSubmit.bind(this);
	}

	toggle = () => {
		this.props.addProjectStatus(!this.props.projectStatus);
	};

	openModalWithClass = className => {
		this.setState({ className: className, size: null });
		this.toggle();
	};

	handleValidSubmit = (event, values) => {
		this.props.addProject(values.name, values.link_vk, values.description);
	};

	render() {
		return (
			<React.Fragment>
				<button
					type="button"
					onClick={() => this.openModalWithClass('modal-dialog-centered')}
					className="btn btn-danger mr-4 mb-3  mb-sm-0">
						<i className="uil-plus mr-1"></i>
						Создать проект
				</button>
				<Modal
					isOpen={this.props.projectStatus}
					toggle={this.toggle}
					size={'lg'}>
					<ModalHeader toggle={this.toggle}>Новый проект</ModalHeader>
					<ModalBody>
						<Container className="themed-container pb-4">
							<Row className="justify-content-md-center">
								<Col sm="12" md="10">
									<AvForm onValidSubmit={this.handleValidSubmit} className="authentication-form">
										<AvGroup className="">
											<Label for="name">Название</Label>
											<AvInput type="text" name="name" id="name" placeholder="Название" required />
											<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
										</AvGroup>
										<AvGroup className="">
											<Label for="link_vk">Ссылка VK</Label>
											<AvInput
												type="text"
												name="link_vk"
												id="link_vk"
												placeholder="https://vk.com/"
												required
												value={"https://vk.com/"}/>
											<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
										</AvGroup>
										<AvGroup className="mb-5">
											<Label for="description">Описание</Label>
											<AvInput type="textarea" name="description" id="description" placeholder="Описание" rows="5" required />
											<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
										</AvGroup>
										<Row className="justify-content-md-center">
											<Col sm="12" md="5">
												<FormGroup className="form-group mb-0 text-center">
													{this.props.isLoading ?
														<UpdateBtnDisabled /> :
														<Button color="primary" className="btn-block" size="lg">Сохранить</Button>
													}
												</FormGroup>
											</Col>
										</Row>
									</AvForm>
								</Col>
							</Row>
						</Container>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

export default AddProject;
