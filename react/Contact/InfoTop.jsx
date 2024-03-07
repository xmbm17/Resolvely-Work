import React from "react";
import { Row, Col } from "react-bootstrap";
import locationPing from "../../assets/img/icons/location.png";
import emailLogo from "../../assets/img/icons/email.svg";
import callLogo from "../../assets/img/icons/call.svg";
import contactPhoto from "../../assets/img/team/avatar.png";
import "./contact-us.css";
import Section from "components/common/Section";

const InfoTop = () => {
  return (
    <Section
      overlay
      position="center top"
      className="bg-purple"
      data-bs-theme="light"
    >
      <div className="question-box">
        <h1 className="contact-us-title">Got a question?</h1>
        <Row className="justify-content-center text-center">
          <Col>
            <div className="vl">
              <img alt="" src={locationPing}></img>
              <p>Address</p>
              <p>Downtown LA, LA 90012, US</p>
            </div>
          </Col>
          <Col>
            <div className="vl">
              <img alt="" src={emailLogo}></img>
              <p>Email</p>
              <p>Support@youremail.com</p>
            </div>
          </Col>
          <Col>
            <div className="vl">
              <img alt="" src={callLogo}></img>

              <p>Phone Number</p>
              <p>+1(424) 535 3523</p>
            </div>
          </Col>
          <Col>
            <div className="vl">
              <img alt="" src={contactPhoto}></img>
              <p>Contact</p>
              <p>John Doe</p>
            </div>
          </Col>

          <div className="vl" style={{ width: "0px" }}></div>
        </Row>
      </div>
    </Section>
  );
};

export default InfoTop;
