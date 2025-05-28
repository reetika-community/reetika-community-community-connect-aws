import React, { useState } from 'react';
import styles from './AddProjectModal.module.css';
import axios from '../axios';

const AddProjectPopup = ({ onClose, onProjectAdded, projectDetails }) => {
  let projectData = {
    title: '',
    description: '',
    location: '',
    requiredSkills: '',
    volunteersNeeded: '',
  }
  if(projectDetails!=null){
    projectData = {...projectData, ...projectDetails}
  //  projectData.title = projectDetails.title;
  //  projectData.description = projectDetails.description;
  //  projectData.location = projectDetails.location;
  //  projectData.requiredSkills = projectDetails.requiredSkills;
  //  projectData.volunteersNeeded = projectDetails.volunteersNeeded;
}
console.log('projectdata',projectData)
const [form, setForm] = useState(projectData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      ...form,
      requiredSkills: form.requiredSkills,
      volunteersNeeded: Number(form.volunteersNeeded),
    };

    await axios.post('/projects', projectData);
    // onClose();
    onProjectAdded(); // Let parent handle closing and any refresh logic
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {projectDetails? (
          <h2>Edit Project</h2>
        ):(
          <h2>Add New Project</h2>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="Required Skills (comma-separated)"
            value={form.requiredSkills}
            onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })}
          />
          <input
            type="number"
            placeholder="Volunteers Needed"
            value={form.volunteersNeeded}
            onChange={(e) => setForm({ ...form, volunteersNeeded: e.target.value })}
          />
          <div className={styles.modalActions}>
            <button type="submit" className={styles.submitButton}>Submit</button>
            <button onClick={onClose} type="button" className={styles.cancelButton}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectPopup;
