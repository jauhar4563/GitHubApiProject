import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowers, fetchUser, selectUserStatus, User } from "../../utils/context/userSlice";
import "./repo.css"; // Import the CSS file
import { ArrowBigLeft, CircleCheck } from "lucide-react";

const Repositories: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector(selectUserStatus);
  const user: User | undefined = useSelector(
    (state: any) => state.user.users[username || ""]
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser(username));
    }
  }, [dispatch, username, user]);

  const handleFollowersClick = () => {
    if (typeof user.followers === 'number' || user?.followers.length === 0) {
      dispatch(fetchFollowers(username || ""));
    }
    navigate(`/${username}/followers`);
  };

  if (userStatus === 'loading') {
    return <div className="loader-container"><div className="loader "></div></div>;
  }

  if (!user) {
    return <div className="User-not-found"><p><span style={{color:'red'}}>User</span> not found</p>
    
    <ArrowBigLeft className="back-arrow" size={35}  onClick={() => navigate(-1)} /> 

    </div>;
  }

  return (
    <div className="repositories-container">
      <ArrowBigLeft className="back-arrow" size={35} onClick={() => navigate(-1)} />
      <div className="user-details">
        <div className="user-profile">
          <img className="user-avatar" src={user.profile} alt="" />
        </div>
        <div className="user-credentials">
          <h1 className="user-name">{user.name}</h1>
          <p>{user.username}</p>
          <div className="user-connections">
            <p className="user-friends" onClick={handleFollowersClick} style={{ color: '#0366d6' }}>followers : <span style={{ color: 'black' }}>{Array.isArray(user.followers) ? user.followers.length : user.followers}</span> </p>
            <p className="user-friends" onClick={handleFollowersClick} style={{ color: '#0366d6' }}>following : <span style={{ color: 'black' }}>{user.following}</span> </p>
          </div>
          <p className="user-bio">{user.bio}</p>
        </div>
      </div>
      <h1 className="Repo-heading">Repositories</h1>
      <ul className="repository-list">
        {user.repos &&
          user.repos.map((repo: any) => (
            <li key={repo.id} className="repository-item">
              <Link
                to={`/${username}/repos/${repo.name}`}
                className="repository-link"
              >
                <img
                  src={repo.owner.avatar_url}
                  alt={`${repo.owner.login} avatar`}
                  className="repository-avatar"
                />
                <div className="repository-details">
                  <div className="repsotory-name-container">
                    <h3 className="repository-name">{repo.name}</h3>
                    <CircleCheck size={22} color="white" fill="green" />
                  </div>
                  <p className="repository-description">{repo.description}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Repositories;
