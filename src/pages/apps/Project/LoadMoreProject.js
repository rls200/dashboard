import React from 'react';
import {Button, Col, FormGroup, Row, Spinner} from "reactstrap";


const LoadMoreProject = (props) => {
	const last_page = props.last_page;
	const current_page = props.current_page;
	let isLoadingLoadMore = props.isLoadingLoadMore;
	let displayBtn = 'block';

	if (current_page === last_page) {
		displayBtn = 'none'
	}
	const LoadMoreBtnDisabled = () => {
		return (
			<Button color="primary" size="lg" disabled>
				<div style={{ position: 'absolute', zIndex: '2', top: '0', left: '30%'}}>
					<Spinner className="m-2" color="secondary" style={{ width: '30px', height: '30px', margin: '0' }} />
				</div>
				<div style={{position: 'relative', zIndex: '1' }}>
					Показать еще
				</div>
			</Button>
		)
	};
	const loadNextPage = () => {
		props.fetchLoadMoreProject(current_page + 1)
	};

	return (
		<div style={{display: displayBtn}}>
			<Row className="justify-content-md-center">
				<Col sm="12" md="5">
					<FormGroup className="form-group mb-0 text-center">
						{isLoadingLoadMore ?
							<LoadMoreBtnDisabled /> :
							<Button
								onClick={loadNextPage}
								color="primary"
								size="lg">
								Показать еще
							</Button>
						}
					</FormGroup>
				</Col>
			</Row>
		</div>
	)
};


export default LoadMoreProject;