import { useEffect, useState } from 'react';
import axios from '../axios';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get('/projects').then(async (res) => {
      const allApps = [];
      for (let project of res.data) {
        const full = await axios.get(`/projects/${project._id}`);
        for (let app of full.data.applications) {
          allApps.push({ ...app, projectTitle: project.title });
        }
      }
      setApplications(allApps);
    });
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`/projects/applications/${id}`, { status });
    alert('Status updated and email sent');
  };

  return (
    <div className="p-4">
      {applications.map(app => (
        <div key={app._id} className="border p-2 mb-2">
          <p>Project: {app.projectTitle}</p>
          <p>Status: {app.status}</p>
          <button onClick={() => updateStatus(app._id, 'Accepted')}>Accept</button>
          <button onClick={() => updateStatus(app._id, 'Rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
