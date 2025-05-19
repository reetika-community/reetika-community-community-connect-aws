import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VolunteerDashboard = () => {
  const [volunteer, setVolunteer] = useState(null);
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);

  const token = localStorage.getItem('token'); // Assumes JWT token storage

  useEffect(() => {
    fetchVolunteerProfile();
    fetchProjects();
    fetchApplications();
  }, []);

  const fetchVolunteerProfile = async () => {
    try {
      const res = await axios.get('/api/volunteers/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVolunteer(res.data);
    } catch (err) {
      console.error('Error fetching volunteer profile:', err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get('/api/applications/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const applyToProject = async (projectId) => {
    try {
      await axios.post(
        `/api/applications`,
        { projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Application submitted!');
      fetchApplications();
    } catch (err) {
      alert('Application failed or already submitted.');
    }
  };

  const hasApplied = (projectId) => {
    return applications.some(app => app.project === projectId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Volunteer Dashboard</h1>

      {volunteer && (
        <div className="mb-6 p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold">Your Profile</h2>
          <p><strong>Name:</strong> {volunteer.name}</p>
          <p><strong>Email:</strong> {volunteer.email}</p>
          <p><strong>Skills:</strong> {volunteer.skills.join(', ')}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Available Projects</h2>
        {projects.map((project) => (
          <div key={project._id} className="mb-4 p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Location:</strong> {project.location}</p>
            <p><strong>Skills Required:</strong> {project.requiredSkills.join(', ')}</p>
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
        ))}
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
