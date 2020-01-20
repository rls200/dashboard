import React from "react";
import {Card, CardBody, Col, Progress, Row} from "reactstrap";
import { Link } from 'react-router-dom';

import ProjectOption from './ProjectOption/ProjectOption';
import ProjectDescription from './ProjectDescription';

const Project = props => {
	const project = props.project || {};
	var dateFormat = require('dateformat');
	var now = new Date(project.created_at);
	let created_at = dateFormat(now, "yyyy-mm-dd");

	return (
		<Card>
			<CardBody>
				<ProjectOption id={project.id}/>
				<h5>
					<Link
						to={props.link}
						className="vx-project-blue"
						onClick={() => props.setDefaultProjectId(project.id, project.vk_id)}
					>
						{project.name}
					</Link>
				</h5>
				<ProjectDescription text={project.description} id={project.id} size={100}/>
			</CardBody>

			<CardBody>
				<Row className="align-items-center">
					<Col className="col-sm-auto">
						<ul className="list-inline mb-0">
							<li className="list-inline-item pr-2">
								<a
									href={project.link_vk}
									className="text-muted d-inline-block"
									id={`dueDate-${project.id}`}
									target="_blank">
										<i className="uil uil-external-link-alt mr-1 vx-project-icon-orange"></i>
								</a>
							</li>
							<li className="list-inline-item pr-2 vx-project-icon-dark">
								<i className="uil uil-calender mr-1 vx-project-icon-dark"></i>
								{created_at}
							</li>
						</ul>
					</Col>
					<Col className="offset-sm-1">
						<Progress value={80} color="success" className="progress-sm" />
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};

export default Project;