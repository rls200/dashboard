import React, { useState } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Alert} from 'reactstrap';
import {fetchProjectsError} from '../../../../redux/projects/actions';

const Notification = (props) => {
	const [visible, setVisible] = useState(true);

	if (visible === true) {
		setTimeout(
			() => {
				props.fetchProjectsError(null);
			}, 4000
		)
	}
	const onDismiss = () => {
		setVisible(false);
		props.fetchProjectsError(null);
	};

	return (
		<Alert
			className={props.className}
			color={props.color}
			isOpen={visible}
			toggle={onDismiss}
		>
			{props.message}
		</Alert>
	);
};

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchProjectsError
}, dispatch);

export default connect(null, mapDispatchToProps)(Notification);