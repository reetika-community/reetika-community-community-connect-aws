import React, { useEffect, useState, useContext } from 'react';
import axios from '../axios'; // Import the configured axios instance
import { AuthContext } from './AuthContext'; // Import AuthContext

const VolunteerDashboard = () => {
  const { auth } = useContext(AuthContext); // Get auth state from AuthContext
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Ensure user is authenticated before attempting to fetch data
    if (auth && auth.token) {
      fetchProjects();
      // fetchApplications will be called after projects are fetched
    }
  }, [auth]); // Depend on auth to re-run when user logs in/out

  useEffect(() => {
    // Once projects are loaded, fetch applications and enrich them with project titles
    if (projects.length > 0 && auth && auth.token) {
      fetchApplications();
    }
  }, [projects, auth]); // Depend on projects and auth

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/projects'); // Use the configured axios instance
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get('/applications/my'); // Use the configured axios instance
      // Enrich applications with project titles
      const enrichedApplications = res.data.map(app => {
        const project = projects.find(p => p._id === app.project);
        return { ...app, projectTitle: project ? project.title : 'Unknown Project' };
      });
      setApplications(enrichedApplications);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const applyToProject = async (projectId) => {
    try {
      await axios.post(`/applications`, { projectId }); // Use the configured axios instance
      alert('Application submitted!');
      fetchApplications(); // Re-fetch applications to update status
    } catch (err) {
      alert('Application failed or already submitted.');
      console.error('Error applying to project:', err);
    }
  };

  const hasApplied = (projectId) => {
    return applications.some(app => app.project === projectId);
  };

  if (!auth) {
    return <div className="max-w-4xl mx-auto p-4">Please log in to view the volunteer dashboard.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Volunteer Dashboard</h1>

      {auth.user && ( // Use auth.user directly for profile information
        <div className="mb-6 p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold">Your Profile</h2>
          <p><strong>Name:</strong> {auth.user.name}</p>
          <p><strong>Email:</strong> {auth.user.email}</p>
          <p><strong>Skills:</strong> {auth.user.skills ? auth.user.skills.join(', ') : 'N/A'}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Available Projects</h2>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="mb-4 p-4 bg-gray-100 rounded shadow">
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p>{project.description}</p>
              <p><strong>Location:</strong> {project.location}</p>
              <p><strong>Skills Required:</strong> {project.requiredSkills ? project.requiredSkills.join(', ') : 'N/A'}</p>
              <p><strong>Volunteers Needed:</strong> {project.volunteersNeeded}</p>
              {hasApplied(project._id) ? (
                <button className="mt-2 px-4 py-1 bg-gray-400 text-white rounded" disabled>
                  Already Applied
                </button>
              ) : (
                <button
                  onClick={() => applyToProject(project._id)}
                  className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Apply
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No projects available at the moment.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">My Applications</h2>
        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app._id} className="p-3 mb-2 border rounded bg-white shadow">
              <p><strong>Project:</strong> {app.projectTitle}</p>
              <p><strong>Status:</strong> {app.status}</p>
            </div>
          ))
        ) : (
          <p>You have not applied to any projects yet.</p>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;