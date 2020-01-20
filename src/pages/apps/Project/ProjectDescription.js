import React from 'react';

class ProjectDescription extends React.Component {
	constructor(props) {
		super(props);
		this.state =  {btnText: 'подробнее'}
	}
	render() {
		let btnLeanMore = String(this.props.text).length < this.props.size ? 'none' : 'inline';

		const handleClick = (id) => {
			if (document.getElementById(id).style.display === 'inline') {
				document.getElementById(id).style.display = 'none';
				this.setState({btnText: 'подробнее'});
			} else {
				document.getElementById(id).style.display = 'inline';
				this.setState({btnText: 'скрыть'});
			}
		};

		const strPrev = (text, size) => {
			let stText = String(text);
			return stText.trim().substr(0, size);
		};

		const strNext = (text, size) => {
			let stText = String(text);
			return stText.trim().substr(size, stText.length);
		};

		return (
			<p className="card-text mb-2">
				{strPrev(this.props.text, this.props.size)}
				<span style={{display: 'none'}} id={this.props.id}>{strNext(this.props.text, this.props.size)}</span>
				<span
					className="vx-project-blue read-more-btn"
					style={{display: btnLeanMore}}
					color="link"
					onClick={() => handleClick(this.props.id)}>
						{this.state.btnText}
				</span>
			</p>
		)
	}
}

export default ProjectDescription;