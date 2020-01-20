import React from 'react';
import {AvInput} from "availity-reactstrap-validation";
import {addCityCoordinates} from "../../../redux/calendar/action";


class Suggest extends React.Component {
	constructor(props) {
		super(props);
		this.init = this.init.bind(this);
	}

	componentDidMount() {
		const {ymaps} = window;
		ymaps && ymaps.ready(()=>this.init(this.props.getCities));
	};
	suggestSelect = (e, getCities, ymaps) => {
		getCities(ymaps, e.get('item').value);
		this.props.setCityName(e.get('item').value);
	};
	init(getCities) {
		const {ymaps} = window;
		if (ymaps) {
			let suggestView = new ymaps.SuggestView('cityEvent');
			suggestView.events.add("select", (e)=>this.suggestSelect(e, getCities, ymaps))
		}
	};
	handleChangeSuggest = e => {
		this.props.setCityName(e.target.value);
		if(e.target.value.length !== 0) {
			this.props.setCityStatus(false);
		} else {
			this.props.setCityStatus(true);
			this.props.setOraganizationName('');
			this.props.addCityCoordinates({}, true);
		}
	};

	render() {
		let city = this.props.city;
		return (
			<AvInput
				className="popup-modal-input"
				type="text"
				name="cityEvent"
				id="cityEvent"
				placeholder="Город"
				value={city}
				onChange={this.handleChangeSuggest}
				required
			/>
		)
	}
}
export default Suggest;