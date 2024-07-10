import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/context/store";
import { User } from "../../utils/context/userSlice";
import "./RepoDetails.css"; // Import the CSS file
import { ArrowBigLeft, CircleCheck } from "lucide-react";

const RepositoryDetails: React.FC = () => {
  const navitate = useNavigate();
  const { username, repoName } = useParams<{
    username: string;
    repoName: string;
  }>();
  const user: User | undefined = useSelector(
    (state: RootState) => state.user.users[username || ""]
  );

  if (!user) {
    return <div>User not found</div>;
  }

  const repo = user.repos.find((repo: any) => repo.name === repoName);

  if (!repo) {
    return <div>Repository not found</div>;
  }

  return (
    <div className="repository-details-container">
      <ArrowBigLeft className="back-arrow" size={25} onClick={()=>navitate(-1)} />
      <div className="repository-header">
        <img
          src={repo.owner.avatar_url}
          alt={`${repo.owner.login} avatar`}
          className="repository-owner-avatar"
        />
        <p className="repository-owner">{repo.owner.login}</p>
        <p className="repository-description">
          {" "}
          <CircleCheck size={20} color="white" fill="green" /> Verified by
          GitHub
        </p>
        <p style={{ width: "250px" }}>
          GitHub confirms that this app meets the requirements for verfication
        </p>
      </div>
      <div className="repository-content">
        <h2 className="sub-heading">Application</h2>
        <h1 className="repository-name">{repo.name}</h1>
        <button className="setup-plan-button">Set up a plan</button>
        <p className="repository-description">{repo.description}</p>
      </div>
      <div className="repository-data">
        <p>Stars: {repo.stargazers_count}</p>
        <p>Forks: {repo.forks_count}</p>
        <p>Open Issues: {repo.open_issues_count}</p>
        <p>Watchers: {repo.watchers_count}</p>
        <p>Language: {repo.language}</p>
        <p>Created At: {new Date(repo.created_at).toLocaleDateString()}</p>
        <p>Updated At: {new Date(repo.updated_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default RepositoryDetails;
