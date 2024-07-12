import React, { useState } from "react";
import "./App.css";
import ProfileCard from "./components/ProfileCard";

interface Profile {
  id: number;
  name: string;
  email: string;
  description: string;
  likes: number;
}

const App: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: 1,
      name: "Wojciech",
      email: "wojciech@poz.pl",
      description: "Anaesthesiologist",
      likes: 34,
    },
    {
      id: 2,
      name: "Maria",
      email: "maria@poz.pl",
      description: "Radiologist",
      likes: 28,
    },
    {
      id: 3,
      name: "Anna",
      email: "anna@poz.pl",
      description: "Surgeon",
      likes: 53,
    },
  ]);

  const [comments, setComments] = useState<{ [key: number]: string[] }>({});
  const [newProfile, setNewProfile] = useState({
    name: "",
    email: "",
    description: "",
    likes: 0,
  });

  const sortAsc = () => {
    const sortedProfiles = [...profiles].sort((a, b) => a.likes - b.likes);
    setProfiles(sortedProfiles);
  };

  const sortDesc = () => {
    const sortedProfiles = [...profiles].sort((a, b) => b.likes - a.likes);
    setProfiles(sortedProfiles);
  };

  const handleCommentSubmit = (id: number, comment: string) => {
    setComments({
      ...comments,
      [id]: [...(comments[id] || []), comment],
    });
  };

  const handleNewProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const handleAddProfile = () => {
    const newId = profiles.length ? profiles[profiles.length - 1].id + 1 : 1;
    const profile = { ...newProfile, id: newId, likes: 0 };
    setProfiles([...profiles, profile]);
    setNewProfile({ name: "", email: "", description: "", likes: 0 });
  };

  return (
    <div id="app">
      <div className="section">
        <p>Profiles List</p>
        <div className="flex-row">
          <label className="label" htmlFor="filter">
            Find profile:
          </label>
          <input className="input" />
        </div>
        <div className="buttons">
          <button onClick={sortAsc}>&#9650;</button>
          <button onClick={sortDesc}>&#9660;</button>
        </div>

        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            comments={comments[profile.id] || []}
            onCommentSubmit={handleCommentSubmit}
          />
        ))}
      </div>

      <div className="section">
        <p className="header">Add new profile</p>
        <div className="flex-row">
          <label className="label">Name:</label>
          <input
            className="input"
            name="name"
            value={newProfile.name}
            onChange={handleNewProfileChange}
          />
        </div>
        <div className="flex-row">
          <label className="label" htmlFor="email">
            Email:
          </label>
          <input
            className="input"
            name="email"
            value={newProfile.email}
            onChange={handleNewProfileChange}
          />
        </div>
        <div className="flex-row">
          <label className="label">Specialisation:</label>
          <input
            className="input"
            name="description"
            value={newProfile.description}
            onChange={handleNewProfileChange}
          />
        </div>
        <button onClick={handleAddProfile}>Add</button>
      </div>
    </div>
  );
};

export default App;
