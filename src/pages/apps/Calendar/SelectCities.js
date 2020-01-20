import React from 'react';
import Select from 'react-select';

class SelectCities extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: '',
			clearable: true,
			cities: [],
		};
		this.onLoad= this.onLoad.bind(this);
	};
	componentDidMount() {
		const script = document.createElement("script");
		script.async = true;
		script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;load=SuggestView&amp;onload=onLoad";
		document.head.appendChild(script);
		this.onLoad();
	};
	onLoad (ymaps){
		console.log("onLoad");
		const suggestView = new ymaps.SuggestView("suggest", {
			results: 10,
		});
		suggestView.events.add('select', function(e){
			console.log(e);
		});
	};
	render(){
	const handleChange = (selectedOption) => {
		console.log(selectedOption.label);
		this.props.getCities(selectedOption.label);
	};
	let options = [
		{value: 1, label: 'а'},
		{value: 2, label: 'q2'},
		{value: 3, label: 'q3'},
		{value: 4, label: 'q4'},
		{value: 5, label: 'q5'},
	];
	return (
			<div>
				<input type="text" id="suggest"/>
				<Select
					name="form-field-name"
					value={this.state.value}
					onChange={handleChange}
					clearable={this.state.clearable}
					searchable={this.state.searchable}
					options={options}
				/>
			</div>
		)
	}
}

export default SelectCities;