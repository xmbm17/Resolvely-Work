import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import person1 from "../../../assets/img/team/1.jpg"
import person2 from "../../../assets/img/team/2.jpg"
import person3 from "../../../assets/img/team/3.jpg"
import person4 from "../../../assets/img/team/4.jpg"
import "./landingpage.css";
import Section from "components/common/Section";
import Avatar, { AvatarGroup } from "components/common/Avatar";

const Membership = () => (
  <Section
    overlay
    position="center top"
    className="membership-bg"
    data-bs-theme="dark"
  >
    <Row className="justify-content-center text-center">
      <Col >
        <AvatarGroup className="mem-avatar" >
          <Avatar className="flex-shrink-0" src={person1} size={"3xl"} />
          <Avatar className="flex-shrink-0" src={person2} size={"3xl"} />
          <Avatar className="flex-shrink-0" src={person3} size={"3xl"} />
          <Avatar className="flex-shrink-0" src={person4} size={"3xl"} />
        </AvatarGroup>
        <div className="mem-text-btn">
          <p>Achieve more with a pro membership!</p>
          <Button variant="light" className="border-2 rounded-pill">
            Learn more
          </Button>
        </div>
      </Col>
      <Col>
        <ul className="mem-ul">
          <li>Access to personalized career guidance</li>
          <li>Access to interactive learning modules</li>
          <li>Access to community forum</li>
        </ul>
      </Col>
    </Row>
  </Section>
);

export default Membership;
