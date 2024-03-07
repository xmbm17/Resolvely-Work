import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import person1 from "../../../assets/img/team/1.jpg";
import person2 from "../../../assets/img/team/2.jpg";
import person3 from "../../../assets/img/team/3.jpg";
import person4 from "../../../assets/img/team/4.jpg";
import person5 from "../../../assets/img/team/5.jpg";
import person6 from "../../../assets/img/team/6.jpg";
import person7 from "../../../assets/img/team/7.jpg";

import "./landingpage.css";

const AboutCard = () => (
  <Row className="justify-content-center text-center">
    <Col lg={8} style={{ width: "max-content" }}>
      <img src={person1} className="about-avatar-img" alt="" />
      <img src={person2} className="about-avatar-img upside-down-img" alt="" />
      <img src={person3} className="about-avatar-img" alt="" />
      <img src={person4} className="about-avatar-img upside-down-img" alt="" />
      <img src={person5} className="about-avatar-img" alt="" />
      <img src={person6} className="about-avatar-img upside-down-img" alt="" />
      <img src={person7} className="about-avatar-img" alt="" />
    </Col>
    <Col lg={8} style={{ marginLeft:"225px" }}>
      <p className="text-black about-text">
        Resolvely is designed to help you find <br /> the right college for you,
        through <br /> personalized guidance, interactive <br /> learning, and
        peer support.
      </p>
    </Col>
    <Row className="justify-content-center text-center card-container">
      <Card className="card-style">
        <span
          className="me-2"
          style={{ fontSize: "70px" }}
          role="img"
          aria-label="student"
        >
          🧑‍🎓
        </span>
        <Card.Body>
          <Card.Title>Personalized college counseling</Card.Title>
          <Card.Text>
            We offer personalized college counseling to help you understand your
            strengthsand weaknesses and choose the right college for you.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="card-style">
        <span
          className="me-2"
          style={{ fontSize: "70px" }}
          role="img"
          aria-label="student"
        >
          📚
        </span>
        <Card.Body>
          <Card.Title>Interactive learning</Card.Title>
          <Card.Text>
            We provide interactive learning resources to help you learn about
            different colleges and find the right one for you.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="card-style">
        <span
          className="me-2"
          style={{ fontSize: "70px" }}
          role="img"
          aria-label="student"
        >
          👋
        </span>
        <Card.Body>
          <Card.Title>Community Support</Card.Title>
          <Card.Text>
            We offer a supportive community where you can connect with other
            students and professionals who can help you through the college
            admissions process.
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  </Row>
);

export default AboutCard;
