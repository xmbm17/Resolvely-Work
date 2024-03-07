import React from "react";
import { Row, Col } from "react-bootstrap";
import bg2 from "./student-grad.png";
import "./landingpage.css";
import Section from "components/common/Section";

const Overview = () => (
  <Section
    overlay
    position="center top"
    className="bg-light"
    data-bs-theme="light"
  >
    <Row className="justify-content-center text-center">
      <Col lg={8}>
        <div className="overview">
          <p className="fs-3 fs-sm-4  overview-message">
            We believe that education
            <span
              className=""
              style={{ fontSize: "40px" }}
              role="img"
              aria-label="student"
            >
              🧑‍🎓
            </span>
            is a <br /> right,
            <span style={{ color: "rgb(87,204,2)" }}> not a privilege</span>
            <span
              className=""
              style={{ fontSize: "40px" }}
              role="img"
              aria-label="student"
            >
              🤑
            </span>
            , and we&apos;re <br /> committed to making college
            <span
              className=""
              style={{ fontSize: "40px" }}
              role="img"
              aria-label="student"
            >
              🏫
            </span>
            <br />
            more accessible to
            <span style={{ color: "rgb(235,77,0)" }}> everyone</span>
            <span
              className=""
              style={{ fontSize: "40px" }}
              role="img"
              aria-label="student"
            >
              😀
            </span>
          </p>
        </div>
      </Col>
      <Col lg={8} className="overview-bottom-container">
        <div className="overview-text">
          <h2 style={{ fontWeight: "bold" }}>
            Navigate the College <br /> Admissions Process
          </h2>
          <h5 style={{ marginTop: "20px" }}>
            With Resolvely, you&apos;ll be able to:{" "}
          </h5>
          <ul className="overview-ul">
            <li>
              Take a college admissions assessment to identify your <br />{" "}
              strengths and weaknesses.
            </li>
            <li style={{ marginTop: "20px" }}>
              Learn about different colleges and find out which ones are a<br />
              good fit for you.
            </li>
            <li style={{ marginTop: "20px" }}>
              Get personalized college advice from experts.
            </li>
            <li style={{ marginTop: "20px" }}>
              Connect with other students and professionals who can help
              <br /> you through the college admissions process
            </li>
          </ul>
        </div>

        <div className="img-bg">
          <img alt="" src={bg2} className="overview-img" />
        </div>
      </Col>
    </Row>
  </Section>
);

export default Overview;
