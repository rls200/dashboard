import React, { Component } from 'react';
import { Row, Col, Spinner } from 'reactstrap';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import OverviewWidget from '../../components/OverviewWidget';

import Statistics from './Statistics';
import RevenueChart from './RevenueChart';
import TargetChart from './TargetChart';
import SalesChart from './SalesChart';

import SelectProject from './SelectProject'
import {bindActionCreators} from "redux";
import {
    fetchGetIndicators,
    fetchGetProjectsList,
    setSelectProjectId,
    setSelectCountDay,
    fetchProjectIndicatorsData,
    fetchGetNewIndicators
} from "../../redux/dashboard/actions";
import {connect} from "react-redux";
import BarChart from "../charts/BarChart";
import ResponsiveTable from './ResponsiveTable';
import SelectDay from './SelectDay';
import DashboardDefault from './dashboardDefault';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: getLoggedInUser(),
            filterDate: [oneWeekAgo, new Date()]
        };
    }

    componentDidMount() {
        if (this.props.defaultProjectId) {
            this.props.fetchProjectIndicatorsData(4, this.props.defaultProjectVkId, this.props.selectCountDay)
        } else {
            this.props.fetchGetProjectsList(4, this.props.selectCountDay);
        }

    }

    render() {

        return (
            <React.Fragment>
                {this.props.getDataStatus ? <DashboardDefault isLoading={this.props.isLoading} /> :
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader/>}

                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-1 mt-0 card-text">Dashboard</h4>
                        </Col>
                        <Col sm={8} xl={6}>
                            <Row className="align-items-center">
                                <Col sm={1} xl={1}>
                                    {!this.props.indicatorsStatus && <Spinner color="danger" />}
                                </Col>
                                <Col sm={6} xl={6}>
                                    <div className={"select-dashboard-mg"}>
                                        <SelectProject
                                          projectList={this.props.projectList}
                                          fetchGetIndicators={this.props.fetchGetIndicators}
                                          setSelectProjectId={this.props.setSelectProjectId}
                                          selectCountDay={this.props.selectCountDay}
                                          defaultProjectId={this.props.defaultProjectId}
                                        />
                                    </div>
                                </Col>
                                <Col sm={2} xl={2}>
                                    <div className={"select-dashboard-mg"}>
                                        <SelectDay
                                          fetchGetIndicators={this.props.fetchGetIndicators}
                                          selectProjectId={this.props.selectProjectId}
                                          setSelectCountDay={this.props.setSelectCountDay}
                                        />
                                    </div>
                                </Col>
                                <Col sm={3} xl={3}>
                                    <div className={"select-dashboard-mg"}>
                                        <button
                                          type="button"
                                          onClick={() => this.props.fetchGetNewIndicators(
                                            4,
                                            this.props.selectCountDay,
                                            this.props.selectProjectId,
                                          )}
                                          className="btn btn-danger w-100">
                                            <i className="uil-refresh mr-1"></i>
                                            Обновить
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* stats */}
                    <Statistics indicatorsData={this.props.indicatorsData}/>
                    {/* charts */}
                    <Row>
                        <Col xl={3}>
                            <OverviewWidget statisticsData={this.props.statisticsData.interests}/>
                        </Col>

                        <Col xl={6}>
                            <RevenueChart subscribersData={this.props.indicatorsData.followers}/>
                        </Col>
                        <Col xl={3}>
                            <TargetChart involvementData={this.props.indicatorsData}/>
                        </Col>
                    </Row>

                    {/* charts */}
                    <Row>
                        <Col xl={5}>
                            <SalesChart ageData={this.props.statisticsData.age}/>
                        </Col>
                        <Col xl={3}>
                            <BarChart sexData={this.props.statisticsData.sex}/>
                        </Col>
                        <Col xl={4}>
                            <ResponsiveTable cityData={this.props.statisticsData.relation} title={'Семейное положение'}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={4}>
                            <ResponsiveTable cityData={this.props.statisticsData.country} title={'Страна'}/>
                        </Col>
                        <Col xl={4}>
                            <ResponsiveTable cityData={this.props.statisticsData.city} title={'География'}/>
                        </Col>
                        <Col xl={4}>
                            <ResponsiveTable cityData={this.props.statisticsData.occupation} title={'Занятость'}/>
                        </Col>
                    </Row>
                </div>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        projectList: state.Dashboard.projectListData,
        indicatorsData: state.Dashboard.indicatorsData,
        indicatorsStatus: state.Dashboard.indicatorsStatus,
        statisticsData: state.Dashboard.statisticsData,
        getDataStatus: state.Dashboard.getDataStatus,
        selectProjectId: state.Dashboard.selectProjectId,
        selectCountDay: state.Dashboard.selectCountDay,
        defaultProjectId: state.Dashboard.defaultProjectId,
        defaultProjectVkId: state.Dashboard.defaultProjectVkId,
        isLoading: state.Dashboard.isLoading,
    }
};
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchGetProjectsList,
    fetchGetIndicators,
    setSelectProjectId,
    setSelectCountDay,
    fetchProjectIndicatorsData,
    fetchGetNewIndicators
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);