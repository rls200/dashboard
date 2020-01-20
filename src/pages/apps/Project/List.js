import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {
    fetchProjects,
    addProject,
    fetchLoadMoreProject,
    fetchProjectsError,
    addProjectStatus,
} from '../../../redux/projects/actions';
import { setDefaultProjectId } from '../../../redux/dashboard/actions';
import {Row, Col} from 'reactstrap';
import AddNewProject from './AddNewProject';
import Project from "./Project";
import LoadMoreProject from './LoadMoreProject';

class Projects extends React.Component {
    componentDidMount() {
        this.props.fetchProjects();
    }

    render() {
        const projects = this.props.projects;

        return (
          <React.Fragment>
              <Row className="page-title">
                  <Col md={3} xl={6}>
                      <h4 className="mb-1 mt-0 card-text">Проекты</h4>
                  </Col>
                  <Col md={9} xl={6} className="text-md-right">
                      <div className="mt-4 mt-md-0">
                          <AddNewProject
                            addProject={this.props.addProject}
                            isLoading={this.props.isLoading}
                            error={this.props.error}
                            status={this.props.status}
                            projectStatus={this.props.projectStatus}
                            addProjectStatus={this.props.addProjectStatus}
                          />
                          {/*<div className="btn-group mb-3 mb-sm-0">
                              <button type="button" className="btn btn-primary">All</button>
                          </div>
                          <div className="btn-group ml-1">
                              <button type="button" className="btn btn-white">Ongoing</button>
                              <button type="button" className="btn btn-white">Finished</button>
                          </div>
                          <div className="btn-group ml-2 d-none d-sm-inline-block">
                              <button type="button" className="btn btn-primary btn-sm"><i
                                className="uil uil-apps"></i></button>
                          </div>
                          <div className="btn-group d-none d-sm-inline-block ml-1">
                              <button type="button" className="btn btn-white btn-sm"><i
                                className="uil uil-align-left-justify"></i></button>
                          </div>*/}
                      </div>
                  </Col>
              </Row>
              <Row>
                  {projects.map((project, i) => {
                      return (
                        <Col lg={6} xl={4} key={'proj-' + project.id}>
                            <Project
                              project={project}
                              link={'/dashboard'}
                              setDefaultProjectId={this.props.setDefaultProjectId}
                            />
                        </Col>
                      );
                  })}
              </Row>

              <Row className="mb-3 mt-2">
                  <Col>
                      <div className="text-center">
                          <LoadMoreProject
                            last_page={this.props.last_page}
                            current_page={this.props.current_page}
                            isLoadingLoadMore={this.props.isLoadingLoadMore}
                            fetchLoadMoreProject={this.props.fetchLoadMoreProject}
                          />
                      </div>
                  </Col>
              </Row>
          </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        projects: state.Projects.projects,
        error: state.Projects.error,
        isLoading: state.Projects.isLoading,
        isLoadingLoadMore: state.Projects.isLoadingLoadMore,
        last_page: state.Projects.last_page,
        current_page: state.Projects.current_page,
        status: state.Projects.status,
        projectStatus: state.Projects.projectStatus,
    }
};
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProjects,
    addProject,
    fetchLoadMoreProject,
    fetchProjectsError,
    addProjectStatus,
    setDefaultProjectId,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);