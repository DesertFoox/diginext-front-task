import React, { useState } from "react";
import "../assets/style/ProfileCard.css";
import DoctorIcon from "./DoctorIcon";

interface Profile {
  id: number;
  name: string;
  email: string;
  description: string;
  likes: number;
}

interface ProfileCardProps {
  profile: Profile;
  comments: string[];
  onCommentSubmit: (id: number, comment: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  comments,
  onCommentSubmit,
}) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    onCommentSubmit(profile.id, comment);
    setComment("");
  };

  return (
    <div className="profile">
      <div className="card">
        <div className="avatar">
          <DoctorIcon />
        </div>
        <div className="data">
          <div className="profile-content">
            <div>
              <strong>{profile.name}</strong>
              <a href={`mailto:${profile.email}`} className="email">
                {profile.email}
              </a>
            </div>
            <div className="description">{profile.description}</div>
          </div>
          <div className="likes">
            <span className="likes-icon">&#10084;</span>
            <span className="likes-value">{profile.likes}</span>
          </div>
        </div>
      </div>
      <div className="comments-section">
        <strong>Comments:</strong>
        <div className="comments">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              {comment}
            </div>
          ))}
        </div>
        <div className="comment-input-section">
          <input
            className="comment-input"
            placeholder="Write your comment..."
            value={comment}
            onChange={handleCommentChange}
          />
          <button onClick={handleCommentSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
