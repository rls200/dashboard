import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Collapse, CardBody, Card, Row, Col, Label} from 'reactstrap';
import {AvGroup, AvInput} from "availity-reactstrap-validation";
import Flatpickr from "react-flatpickr";
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import {setDateRepeat, setPeriodRepeat, setRepeatUpdate} from '../../../redux/calendar/action';

class RepeatEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
        this.repeatRef = React.createRef();
    };
    componentDidUpdate() {
        if (this.props.repeatUpdate) {
            this.repeatRef.current.value = '';
            this.props.setRepeatUpdate();
        }
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        })
    };


    render() {
        const addEventData = this.props.addEventData;
        const periodRepeatData = this.props.periodRepeatData;
        return (
            <div>
                <div className="material-switch mt-1">
                    <span className="material-switch-text">Повторять</span>
                    <input
                        id="someSwitchOptionPrimary"
                        name="someSwitchOption001"
                        type="checkbox"
                        onClick={this.toggle}
                    />
                    <label htmlFor="someSwitchOptionPrimary" className="label-primary"></label>
                </div>
                <Collapse
                    isOpen={this.state.collapse}
                >
                    <Card className="repeat-card">
                        <CardBody className="p-0">
                            <Row>
                                <Col md={4}>
                                    <Label for="repeatPeriodEvent">Период повторения</Label>
                                    <AvInput
                                        className="event-form-item popup-modal-input"
                                        type="select"
                                        name="repeatPeriodEvent"
                                        id="repeatPeriodEvent"
                                        onChange={e => this.props.setPeriodRepeat(e.target.value)}
                                        ref={this.repeatRef}
                                    >
                                        <option value="" disabled>Выберите период</option>
                                        {
                                            periodRepeatData.map(item =>
                                            <option
                                                key={item.id}
                                                value={item.value}
                                                disabled={item.disabled}>
                                                    {item.name}
                                            </option>)
                                        }
                                    </AvInput>
                                </Col>
                                <Col md={8}>
                                    <AvGroup className={'event-form-item'}>
                                        <Label for="repeatPeriodDateEvent">Дата окончания повторения</Label>
                                        <Flatpickr
                                            placeholder="Выберите дату"
                                            defaultValue={null}
                                            options={{
                                                dateFormat: "d-m-Y",
                                                locale: Russian,
                                                minDate: new Date(addEventData.dateEnd)
                                            }}
                                            onChange={date => this.props.setDateRepeat(date)}
                                            className="form-control popup-modal-input"
                                            name="repeatPeriodDateEvent"
                                            id="repeatPeriodDateEvent"
                                        />
                                    </AvGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        addEventData: state.Calendar.addEventData,
        periodRepeatData: state.Calendar.periodRepeatData,
        repeatUpdate: state.Calendar.repeatUpdate,
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    setDateRepeat,
    setPeriodRepeat,
    setRepeatUpdate
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RepeatEvent);