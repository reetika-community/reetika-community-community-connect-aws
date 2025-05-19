import { useEffect, useState } from 'react';
import axios from '../axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/projects').then(res => setProjects(res.data));
  }, []);

  const apply = async (id) => {
    await axios.post(`/projects/${id}/apply`);
    alert('Applied!');
  };

  return (
    <div className="p-4">
      {projects.map(p => (
        <div key={p._id} className="border p-2 mb-2">
          <h2>{p.title}</h2>
          <p>{p.description}</p>
          <button onClick={() => apply(p._id)}>Apply</button>
        </div>
      ))}
    </div>
  );
};

export default Projects;
