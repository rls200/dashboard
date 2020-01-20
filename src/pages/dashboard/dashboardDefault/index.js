import React, { Component } from 'react';
import {Row, Col, Spinner} from 'reactstrap';
import DefaultBlock from './defaultBlock';
import Select from "react-select";

class DashboardDefault extends Component {

    render() {

        return (
            <React.Fragment>
                <div>
                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-1 mt-0 card-text">
                                Dashboard
                                {this.props.isLoading && <Spinner color="danger" className={"ml-3"} />}
                            </h4>
                        </Col>
                        <Col sm={8} xl={6}>
                            <Row className="align-items-center">
                                <Col sm={7} xl={7}>
                                    <div className={"select-dashboard-mg"}>
                                        <Select />
                                    </div>
                                </Col>
                                <Col sm={2} xl={2}>
                                    <div className={"select-dashboard-mg"}>
                                        <Select />
                                    </div>
                                </Col>
                                <Col sm={3} xl={3}>
                                    <div className={"select-dashboard-mg"}>
                                        <button
                                          type="button"
                                          className="btn btn-danger w-100 disabled">
                                            <i className="uil-refresh mr-1"></i>
                                            Обновить
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* stats */}
                    <Row>
                        <Col md={6} xl={3} >
                            <DefaultBlock title={'Нравится'} height={'98px'} />
                        </Col>
                        <Col md={6} xl={3}>
                            <DefaultBlock title={'Репосты'} height={'98px'} />
                        </Col>
                        <Col md={6} xl={3}>
                            <DefaultBlock title={'Комментарии'} height={'98px'} />
                        </Col>
                        <Col md={6} xl={3}>
                            <DefaultBlock title={'Просмотры'} height={'98px'} />
                        </Col>
                    </Row>

                    {/* charts */}
                    <Row>
                        <Col xl={3}>
                            <DefaultBlock title={'Интересы участников'} height={'362px'} />
                        </Col>

                        <Col xl={6}>
                            <DefaultBlock title={'Подписчики'} height={'362px'} />
                        </Col>
                        <Col xl={3}>
                            <DefaultBlock title={'Вовлеченность'} height={'362px'} />
                        </Col>
                    </Row>
                    {/* charts */}
                    <Row>
                        <Col xl={5}>
                            <DefaultBlock title={'Возраст участников'} height={'280px'} />
                        </Col>
                        <Col xl={3}>
                            <DefaultBlock title={'Пол'} height={'280px'} />
                        </Col>
                        <Col xl={4}>
                            <DefaultBlock title={'Семейное положение'} height={'280px'} />
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={4}>
                            <DefaultBlock title={'Страна'} height={'350px'} />
                        </Col>
                        <Col xl={4}>
                            <DefaultBlock title={'География'} height={'350px'} />
                        </Col>
                        <Col xl={4}>
                            <DefaultBlock title={'Занятость'} height={'350px'} />
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default DashboardDefault;