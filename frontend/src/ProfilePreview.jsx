import React from 'react';
import './ProfilePreview.css';
import data from './dummy.json';

const ProfilePreview = () => {
  return (
    <div className="resume-container">
      <div className="left-panel">
        <img src={data.profilePicture} alt="Profile" className="profile-image" />

        <div className="contact-section">
          <h3>Contact</h3>
          <p>{data.contactInfo.email}</p>
          <p><a href={data.contactInfo.linkedin} target="_blank" rel="noopener noreferrer">{data.contactInfo.linkedin}</a></p>
        </div>

        <div className="skills-section">
          <h3>Skills</h3>
          <p>{data.skills.join('  |  ')}</p>
        </div>
      </div>

      <div className="right-panel">
        <h1 className="name">{data.name.toUpperCase()}</h1>
        <h2 className="headline">{data.headline}</h2>

        <section className="section">
          <h3>Education</h3>
          {data.education.map((edu, index) => (
            <div key={index}>
              <p><strong>{edu.school}</strong> | {edu.degree} in {edu.fieldOfStudy}</p>
              <p>{edu.startDate} - {edu.endDate}</p>
              <p>{edu.description}</p>
            </div>
          ))}
        </section>

        <section className="section">
          <h3>Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index}>
              <p><strong>{exp.title}</strong> | {exp.company}</p>
              <p>{exp.startDate} - {exp.endDate}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ProfilePreview;
