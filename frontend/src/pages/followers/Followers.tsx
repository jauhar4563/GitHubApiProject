import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../utils/context/store";
import { fetchFollowers } from "../../utils/context/userSlice";
import "./followers.css";
import { ArrowBigLeft } from "lucide-react";

const Followers: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.users[username || ""]);

  useEffect(() => {
    if (user && typeof user.followers === 'number') {
      dispatch(fetchFollowers(username || ""));
    }
  }, []);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="followers-container">
            <ArrowBigLeft className="back-arrow" size={35} onClick={()=>navigate(-1)} />
        <div className="current-user-details">
            <img className="user-profile" src={user.profile} alt="" />
            <div>
                <h3>{user?.name.length!==0?user.name:user.username}'s Friends</h3>
                <p>{user.bio}</p>
            </div>
        </div>
      <ul className="followers-list">
        {Array.isArray(user.followers) && user.followers.map((follower: any) => (
          <li key={follower.id} className="follower-item">
            <Link to={`/${follower.username}/repos`} className="follower-link">
              <img
                src={follower.profile}
                alt={`${follower.login} avatar`}
                className="follower-avatar"
              />
              <div className="follower-details">
                <h3 className="follower-name">{follower.username}</h3>
                <p className="follower-bio">{follower.bio}</p>
              </div>
            </Link>
          </li>
        ))}
        {(!Array.isArray(user.followers) || user.followers.length ===0) && (
          <div className="loader-container">
            <div className="loader "></div>
          </div>
        )

        }
      </ul>
    </div>
  );
};

export default Followers;
