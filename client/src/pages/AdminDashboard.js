import React from 'react';
import { useEffect, useState } from 'react';
import axios from '../axios';
import AddProjectPopup from './AddProjectPopup';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [projects, setProjects] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const handleProjectAdded = async () => {
    const updatedProjects =  await axios.get('/projects');
      setProjects(updatedProjects.data);
    setShowPopup(false);
    // You can also trigger re-fetching the project list here
   
    
  };

  const deleteProject = async (projectId) => {
    const res = await axios.delete(`/projects/${projectId}`)
    const updatedProjects =  await axios.get('/projects');
      setProjects(updatedProjects.data);
      setRefresh((prev) => !prev);
  }

  useEffect(() => {
    axios.get('/projects').then(async (res) => {
      const allApps = [];
      setProjects(res.data);
      for (let project of res.data) {
        const full = await axios.get(`/projects/${project._id}`);
        
        for (let app of full.data.applications) {
          allApps.push({ ...app, projectTitle: project.title });
        }
      }
      setApplications(allApps);
    });
  }, [refresh]);

  const updateStatus = async (id, status) => {
    await axios.put(`/projects/applications/${id}`, { status });
    alert('Status updated and email sent');
    setRefresh((prev) => !prev);
  };

  return (
    <div className="p-4">
      
      {showPopup && (
        <AddProjectPopup
          onClose={() => setShowPopup(false)}
          onProjectAdded={handleProjectAdded}
          projectDetails={selectedProject}
        />
      )}
      <h3> Applications </h3>
      <table className={styles.table}>
      <thead>
        <tr>
          <th>Project</th>
          <th>Volunteer Name </th>
          <th>Volunteer Skills </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app._id}>
            <td>
    {app.projectTitle}
  </td>
            
            <td>{app.volunteer.name}</td>
            <td>
  {app.volunteer.skills.map((skill, index) => (
    <span key={index} style={{ marginRight: '6px' }}>
      {skill}
      {index < app.volunteer.skills.length - 1 && ','}
    </span>
  ))}
</td>
<td>{app.status}</td>
            <td>
              {app.status!='Pending'? (
                <span>NA</span>
              ):(
              <>
              <button
                className={`${styles.btn} ${styles.accept}`}
                onClick={() => updateStatus(app._id, 'Accepted')}
              >
                Accept
              </button>
              <button
                className={`${styles.btn} ${styles.reject}`}
                onClick={() => updateStatus(app._id, 'Rejected')}
              >
                Reject
              </button>
              </>
              )
              }
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>

<span className={styles.allProjects}> All Projects </span>
<button className={styles.btn} onClick={() => {
      setSelectedProject(null); // assumes `app.project` has the full project data
      setShowPopup(true)
    }}>
        Add Project
      </button>
{projects?.length > 0 ? (
         <div className={styles.projectGrid}>
  {projects.map((project) => (
    <div key={project._id} className={styles.projectCard}>
      <h3 className={styles.projectTitle}>{project.title}</h3>
      <p className={styles.projectDescription}>{project.description}</p>
      <p className={styles.projectMeta}><strong>Location:</strong> {project.location}</p>
      <p className={styles.projectMeta}>
        <strong>Skills Required:</strong> {project.requiredSkills ? project.requiredSkills.join(', ') : 'N/A'}
      </p>
      <p className={styles.projectMeta}><strong>Volunteers Needed:</strong> {project.volunteersNeeded}</p>

      <button
           onClick={() => {
      setSelectedProject(project); // assumes `app.project` has the full project data
      setShowPopup(true)
    }}
          className={styles.editButton}
        >
          Edit
        </button>
        <button className={styles.deleteButton}
        onClick={() => {
      deleteProject(project._id)
    }}
    >
          Delete
        </button>
        
    </div>
  ))}
    </div>
    
        ) : (
          <p>No projects available at the moment.</p>
        )}
      </div>
  );
};

export default AdminDashboard;