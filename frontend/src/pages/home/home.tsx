import './home.css'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser, selectUserStatus } from '../../utils/context/userSlice';
import { RootState, AppDispatch } from '../../utils/context/store';
import { User } from '../../utils/context/userSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => selectUser(state, username));
  const users: Record<string, User> = useSelector((state: RootState) => state.user.users);
  const userStatus = useSelector(selectUserStatus);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userStatus === 'idle' || !user) {
       dispatch(fetchUser(username));
        navigate(`/${username}/repos`);
      
    }
  };

  return (
    <div className="home-div">
      <div>
        <h1>Enter Github User Name</h1>
      </div>
      <div className="input-div">
        <input
          type="text"
          className='search-input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter User Name"
        />
        <button className='search-button' onClick={handleSubmit}>Search</button>
      </div>
      <div>
        {Object.keys(users).length !== 0 && Object.values(users).map((val: User) => (
          <div key={val.username}>
            <p>{val.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
