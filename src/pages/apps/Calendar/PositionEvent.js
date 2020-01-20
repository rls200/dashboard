import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {
    getOrganization,
    clearOrganizationData,
    setOraganizationName,
    setOrganizationItem,
} from "../../../redux/calendar/action";
import {AvInput} from "availity-reactstrap-validation";
import {Tooltip} from 'reactstrap';


class PositionEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: '',
            tooltipOpen: false,
        };
        this.orgzContainer = React.createRef();
    };
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    };
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    };
    handleClickOutside = e => {
        if(this.orgzContainer.current && !this.orgzContainer.current.contains(e.target)) {
            this.setState({
                open: false,
            })
        }
    };
    handleInput = e =>{
        if(this.props.cityCoordinates.coordinates) {
            if(e.target.value.length >= 3) {
                this.props.getOrganization(
                    e.target.value,
                    this.props.cityCoordinates.coordinates,
                    this.props.cityCoordinates.boundedBy
                );
                this.setState({open: true})
            } else {
                this.props.clearOrganizationData();
            }
        } else {
            this.props.setOraganizationName(e.target.value)
        }

    };
    handleClick = item => {
        this.props.setOraganizationName(item.properties.name);
        this.props.setOrganizationItem(item);
        this.setState({
            open: false
        });
    };
    handleClickAvInput = (e) => {
        if(e.target.value.length >= 3) {
            this.props.getOrganization(
                e.target.value,
                this.props.cityCoordinates.coordinates,
                this.props.cityCoordinates.boundedBy
            );
            this.setState({open: true})
        }
    };

    orgzToggle = () => {
        if (this.props.cityStatus) {
            this.setState({
                tooltipOpen: !this.state.tooltipOpen
            });
        }
    };

    render() {
        let organization = this.props.organization;
        return (
            <>
                <div className="orgz-result-container" ref={this.orgzContainer} id="orgzContainer">
                    <AvInput
                        className="popup-modal-input"
                        type="text"
                        name="orgz"
                        id="orgz"
                        onInput={(e)=>this.handleInput(e)}
                        value={organization}
                        autoComplete="off"
                        disabled={this.props.cityStatus}
                        onClick={(e)=>this.handleClickAvInput(e)}
                        placeholder="Место"
                        required
                    />
                    {(this.props.organizations.length > 0) && this.state.open &&
                    <div className="orgz-result">
                        <ul>
                            {this.props.organizations.map((item, index)=> {
                                if (item.properties) {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => this.handleClick(item)}
                                        >
                                            <p>{item.properties.name}</p>
                                            <span>{item.properties.description}</span>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                    }
                </div>
                <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="orgzContainer" toggle={this.orgzToggle}>
                    Введите название города
                </Tooltip>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        cityCoordinates: state.Calendar.cityCoordinates,
        organizations: state.Calendar.organizations,
        cityStatus: state.Calendar.cityStatus,
        organization: state.Calendar.addEventData.organization
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    getOrganization,
    clearOrganizationData,
    setOraganizationName,
    setOrganizationItem
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PositionEvents);