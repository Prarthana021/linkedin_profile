import React from "react";
import "./ProfilePreview.css";
import data from "./dummy.json";
import { FaLinkedin } from "react-icons/fa";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { cleanDescription, getCorrectCompanyName, getLocation } from "./utils";

const ProfilePreview = () => {
  return (
    <div className="resume-container">
      <div className="left-panel">
        <img
          src={data.profilePicture}
          alt="Profile"
          className="profile-image"
        />

        <div className="contact-section">
          <h3>Contact</h3>
          <p>{data?.contactInfo?.email}</p>
          <p>
            <a
              href={data.contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link"
            >
              <span className="linkedin-icon-container">
                <FaLinkedin
                  style={{
                    marginRight: "8px",
                    color: "#0077b5",
                    fontSize: "1.3em",
                    position: "relative",
                    top: "0 px",
                  }}
                />
              </span>
              <span style={{ color: "black", fontWeight: "normal" }}>
                LinkedIn Profile
              </span>
            </a>
          </p>
        </div>

        <div className="skills-section">
          <h3>Skills</h3>
          <p className="skills-list">
            {data?.skills?.length > 0 &&
              data.skills.slice(0, 7).map((skill, index) => (
                <span key={index} className="skill-item">
                  {skill}
                </span>
              ))}
          </p>
        </div>
      </div>

      <div className="right-panel">
        <h1 className="name">{data.name.toUpperCase().split(" ")[0]}</h1>
        <h1 className="surname">{data.name.toUpperCase().split(" ")[1]}</h1>

        <section className="section timeline-section">
          <h3>Education</h3>
          <Timeline position="right" className="left-aligned-timeline">
            {data.education.map((edu, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="timeline-content">
                  <p>
                    <strong>{edu.school_name}</strong> | {edu.years}
                  </p>
                  {edu?.fieldOfStudy ? (
                    <p>
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                  ) : (
                    <p>{edu.degree}</p>
                  )}
                  <p>{edu.description}</p>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </section>

        <section className="section">
          <h3>Experience</h3>
          <Timeline position="right" className="left-aligned-timeline">
            {data.experience.map((exp, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="timeline-content">
                  <p>
                    <strong>{getCorrectCompanyName(exp.company)}</strong> |{" "}
                    {getLocation(exp.location)}
                  </p>
                  <p>
                    <em>{exp.title}</em> | {exp.startDate} - {exp.endDate}
                  </p>
                  <p>{cleanDescription(exp.description)}</p>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </section>
      </div>
    </div>
  );
};

export default ProfilePreview;
