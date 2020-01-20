import {Card, CardBody, CardTitle, Spinner} from "reactstrap";
import React from "react";

const DefaultBlock = (props) => {
	return (
		<Card style={{
			minHeight: props.height,
		}}>
			<CardBody>
				<CardTitle style={{
					color: '#6c757d',
					textTransform: 'uppercase',
					fontWeight: '700',
					fontSize: '12px',
				}}>
					{props.title}
				</CardTitle>
				<div>
					{/*<Spinner color="dark" style={{ width: '3rem', height: '3rem' }}/>*/}
				</div>
			</CardBody>
		</Card>
	)
};

export default DefaultBlock;