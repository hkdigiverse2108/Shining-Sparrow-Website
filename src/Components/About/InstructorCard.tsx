import React from "react";
import type { InstructorCardProps } from "../../Types";

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  const { name, designation, image, facebook, twitter, linkedin } = instructor;

  return (
    <div className="edublink-team-8-widget edublink-col-lg-4 edublink-col-md-6 edublink-col-sm-6 sal-animate">
      <div className="edublink-team-item">
        <div className="thumbnail-wrap">
          <div className="thumbnail">
            <div className="thumbnail-link">
              <img decoding="async" src={image} alt={name} />
            </div>
          </div>

          <ul className="team-share-info">
            {facebook && (
              <li>
                <a href={facebook} target="_blank" rel="noreferrer">
                  <i className="icon-facebook"></i>
                </a>
              </li>
            )}

            {twitter && (
              <li>
                <a href={twitter} target="_blank" rel="noreferrer">
                  <i className="icon-twitter"></i>
                </a>
              </li>
            )}

            {linkedin && (
              <li>
                <a href={linkedin} target="_blank" rel="noreferrer">
                  <i className="icon-linkedin2"></i>
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="content">
          <h4 className="title">
            <a>{name}</a>
          </h4>
          <span className="designation">{designation}</span>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
