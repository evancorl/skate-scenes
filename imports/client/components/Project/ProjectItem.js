import React from 'react';

import BuildingWithPoetic from './BuildingWithPoetic';
import ProjectInfoList from './ProjectInfoList';

const poeticUrl = 'http://www.poeticsystems.com';

class ProjectItem extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { project } = this.props;

    return (
      <li className="project-item">
        <a href={project.url || poeticUrl} target="_blank" className="project-img-container">
          <div className="project-img-overlay"></div>
          <img className="project-img" src={project.image} />
        </a>
        <div className="project-info">
          <h1 className="project-name">{project.name}</h1>
          <p className="project-description">{project.description}</p>
          <ProjectInfoList subtitle="Languages" list={project.languages} />
          <ProjectInfoList subtitle="Tools" list={project.tools} />
          <a href={project.url || poeticUrl} target="_blank" className="project-btn button red">
            {project.url ? 'View' : <BuildingWithPoetic />}
          </a>
        </div>
      </li>
    );
  }
}

ProjectItem.propTypes = {
  project: React.PropTypes.object.isRequired,
};

export default ProjectItem;
