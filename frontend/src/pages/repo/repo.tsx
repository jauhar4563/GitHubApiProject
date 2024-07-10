import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../utils/context/store";
import { fetchFollowers, User } from "../../utils/context/userSlice";
import "./repo.css"; // Import the CSS file

const Repositories: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: User | undefined = useSelector(
    (state: any) => state.user.users[username || ""]
  );

  const handleFollowersClick = () => {
    if (typeof user.followers === 'number'|| user?.followers.length===0) {
      dispatch(fetchFollowers(username || ""));
    }
    navigate(`/${username}/followers`);
  };

  if (!user) {
    return <div>User not found</div>;
  }




  return (
    <div className="repositories-container">
      <div className="user-details">
        <div className="user-profile">
          <img className="user-avatar" src={user.profile} alt="" />
        </div>
        <div className="user-credentials">
          <h1 className="user-name">{user.name}</h1>
          <p>{user.username}</p>
          <div className="user-connections">
            <p className="user-friends" onClick={handleFollowersClick} style={{color:'#0366d6'}}>followers : <span style={{color:'black'}}>{Array.isArray(user.followers)?user.followers.length:user.followers}</span> </p>
            <p className="user-friends" onClick={handleFollowersClick} style={{color:'#0366d6'}}>followers : <span style={{color:'black'}}>{user.following}</span> </p>
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
                  <h3 className="repository-name">{repo.name}</h3>
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
