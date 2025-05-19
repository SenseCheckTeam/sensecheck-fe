import React from 'react';
import '../App.css';

function TeamMember({ photo, name, className }) {
  return (
    <div className="team-member">
      <div className="team-member-photo">
        {photo ? (
          <img src={photo} alt={name} className="team-member-img" />
        ) : (
          <div className="team-member-placeholder">
            {name ? name.charAt(0) : "?"}
          </div>
        )}
      </div>
      <h3 className="team-member-name">{name}</h3>
      <p className="team-member-class">{className}</p>
    </div>
  );
}

export default TeamMember;
