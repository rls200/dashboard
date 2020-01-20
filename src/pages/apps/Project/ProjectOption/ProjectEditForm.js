import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {Button, Col, FormGroup, Label, Row, Spinner} from "reactstrap";
import React from "react";

export const UpdateBtnDisabled = () => {
	return (
		<Button color="primary" className="btn-block" size="lg" disabled>
			<div style={{ position: 'absolute', zIndex: '2', top: '0', left: '42%'}}>
				<Spinner className="m-2" color="secondary" style={{ width: '30px', height: '30px', margin: '0' }} />
			</div>
			<div style={{position: 'relative', zIndex: '1' }}>
				Сохранить
			</div>
		</Button>
	)
};

const ProjectEditForm  = (props) => {
		return (
			<AvForm onValidSubmit={props.onValidSubmit} className="authentication-form">
				<AvGroup className="">
					<Label for="name">Название</Label>
					<AvInput type="text" name="name" id="name" placeholder="Название" required  value={props.initialValues.name}/>
					<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
				</AvGroup>
				<AvGroup className="">
					<Label for="link_vk">Ссылка VK</Label>
					<AvInput type="text" name="link_vk" id="link_vk" placeholder="vk.com/feed" required value={props.initialValues.link_vk} />
					<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
				</AvGroup>
				<AvGroup className="mb-3">
					<Label for="description">Описание</Label>
					<AvInput type="textarea" name="description" id="description" placeholder="Описание" rows="5" required value={props.initialValues.description} />
					<AvFeedback>Поле обязательно для заполнения!</AvFeedback>
				</AvGroup>
				<Row className="justify-content-md-center">
					<Col sm="12" md="5">
						<FormGroup className="form-group mb-0 text-center">
							{props.isLoading ?
								<UpdateBtnDisabled /> :
								<Button color="primary" className="btn-block" size="lg">Сохранить</Button>
							}
						</FormGroup>
					</Col>
				</Row>
			</AvForm>
		)
};


export default ProjectEditForm;