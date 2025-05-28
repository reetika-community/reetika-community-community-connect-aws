import React from 'react';
import { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../axios';
import styles from './Project.module.css';
import VolunteerDashboard from './VolunteerDashboard';
import AdminDashboard from './AdminDashboard';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
    const { auth, logout } = useContext(AuthContext);
    const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef();
      // setIsAdmin({
      //   if(auth.user.role == "admin"? true:false)
      // })

useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
      // (auth.user.role == "admin")? setIsAdmin(true):setIsAdmin(false)
      useEffect(() => {
    if (auth?.user?.role) {
      setIsAdmin(auth.user.role === 'admin');
    }
  }, [auth?.user?.role]);
// let dashboard;
//   useEffect(() => {
//     // axios.get('/projects').then(res => setProjects(res.data));
// if(auth.user.role == "volunteer"){
// dashboard = <VolunteerDashboard/>
// }
//   }, [auth]);

  const apply = async (id) => {
    await axios.post(`/projects/${id}/apply`);
    alert('Applied!');
  };

  return (
    <div className="p-4">
    
            <header className={styles.header}>
      <h1 className={styles.headerTitle}>{auth.user.role=='admin'? 'Admin':'Volunteer'} Dashboard</h1>

      <div className={styles.profileSection} ref={dropdownRef}>
        <button onClick={() => setShowProfile(!showProfile)} className={styles.profileButton}>
          {auth.user?.name[0] || 'User'}
        </button>
        <button
              onClick={logout}
              className ={ styles.button}
            >
              Logout
            </button>

        {showProfile && (
          <div className={styles.profileDropdown}>
            <h2 className={styles.profileDropdownTitle}>Your Profile</h2>
            <p><strong>Name:</strong> {auth.user.name}</p>
            <p><strong>Email:</strong> {auth.user.email}</p>
            <p><strong>Skills:</strong> {auth.user.skills?.join(', ') || 'N/A'}</p>
          </div>
        )}
      </div>
    </header>
            {isAdmin ? (
          <>
              <AdminDashboard/>
          </>
        ) : (
          
           <VolunteerDashboard/>
        )
            }
      {/*{projects.map(p => (
        <div key={p._id} className="border p-2 mb-2">
          <h2>{p.title}</h2>
          <p>{p.description}</p>
          <button onClick={() => apply(p._id)}>Apply</button>
        </div>
      ))}*/}
    </div>
  );
};

export default Projects;