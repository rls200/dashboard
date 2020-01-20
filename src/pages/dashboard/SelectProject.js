import React, { Component } from 'react';
import Select from "react-select";

class SelectProject extends Component {

    handleChange = selectedOption => {
      this.props.fetchGetIndicators(4, this.props.selectCountDay, selectedOption.vk_id);
      /*this.props.setSelectProjectId(selectedOption.vk_id);*/
    };

    render() {
        const projectList = this.props.projectList;
        let defaultValueId = null;
        const selectOption = projectList.map(item => ({value: item.id, label: item.name, vk_id: item.vk_id}));
        if (this.props.defaultProjectId) {
          defaultValueId = selectOption.findIndex(item => item.value === this.props.defaultProjectId);
        }
        return (
            <React.Fragment>
                <Select
                  maxMenuHeight={250}
                  defaultValue={selectOption[defaultValueId ? defaultValueId : 0]}
                  onChange={this.handleChange}
                  className="basic-single"
                  classNamePrefix="select"
                  options={selectOption}
                >
                </Select>
            </React.Fragment>
        )
    }
}


export default SelectProject;