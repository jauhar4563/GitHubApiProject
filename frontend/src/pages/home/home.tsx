import './home.css'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, deleteUser, selectUser, selectUserStatus } from '../../utils/context/userSlice';
import { User } from '../../utils/context/userSlice';
import { useNavigate } from 'react-router-dom';
import { Github, X } from 'lucide-react';

function Home() {
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state: any) => selectUser(state, username));
  const users: Record<string, User> = useSelector((state: any) => state.user.users);
  const userStatus = useSelector(selectUserStatus);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userStatus === 'idle' || !user) {
      dispatch(fetchUser(username));
      navigate(`/${username}/repos`);
    } else {
      navigate(`/${username}/repos`);
    }
  };

  const handleDeleteClick = (username: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation(); // Stop event propagation
    setSelectedUser(username);
    setShowModal(true);
  };
  

  const handleConfirmDelete = () => {
    dispatch(deleteUser(selectedUser));
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    
    setShowModal(false);
  };

  return (
    <div className="home-div">
      <div className='Main-heading'>
        <Github size={32} color='white' fill='black'/>
        <h1>Github Users</h1>
      </div>
      <div className="input-div">
        <input
          type="text"
          className='search-input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub User Name"
        />
        <button className='search-button' onClick={handleSubmit}>Search</button>
      </div>
      <div className="users-list">
        {Object.keys(users).length !== 0 && Object.values(users).map((val: User) => (
          <div key={val.username} onClick={()=>navigate(`/${val.username}/repos`)} className="user-card">
            <img src={val.profile} alt={val.username} className="user-avatar" />
            <div className="user-info">
              <h4>{val.name}</h4>
              <p>{val.username}</p>
            </div>
            <div style={{ display: 'flex', cursor: 'pointer' }}>
              <X onClick={(e) => handleDeleteClick(val.username,e)} color='red' />
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete user <strong style={{color:'red'}}>{selectedUser}</strong>?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmDelete}>Delete</button>
              <button onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
