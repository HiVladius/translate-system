import React from "react";
import "../history/finishproject.style.css";




interface Project{
    name: string;
    dateAdded: string;
    project: string;
    dateStarted: string;
    dateEnded: string;
    status: string;
}

interface ProjectTableProps {
    projects?: Project[] | null;
    title?: string;
}



export const FinishProjects: React.FC<ProjectTableProps> = ({projects = [], title = 'Proyectos'}) => {

const projectsList = Array.isArray(projects) ? projects : [];


  return (
    <div className="projects-table-container">
    {title && <h3 className="projects-table-title">{title}</h3>}
    <div className="projects-table-wrapper">
      <table className="projects-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Fecha agregado</th>
            <th>Proyecto</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {projectsList.length > 0 ? (
            projectsList.map((project, index) => (
              <tr key={index}>
                <td>{project.name}</td>
                <td>{project.dateAdded}</td>
                <td>{project.project}</td>
                <td>{project.dateStarted}</td>
                <td>{project.dateEnded}</td>
                <td>
                <span className={`status-badge status-${(project?.status || 'unknown').toLowerCase()}`}>
                      {project?.status || 'Desconocido'}
                    </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="no-projects">No hay proyectos para mostrar</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  )
}
