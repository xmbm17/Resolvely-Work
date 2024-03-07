import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import video1 from "./students_vid.mp4";
import Section from "components/common/Section";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <Section
      className="py-0 overflow-hidden"
      data-bs-theme="light"
      bg={"dark"}
      position="center bottom"
      overlay
    >
      <Row className="justify-content-center align-items-center pt-8 pb-lg-9 pb-xl-0">
        <Col
          md={11}
          lg={8}
          xl={4}
          className="pb-7 pb-xl-9 text-center text-xl-start"
        >
          <h1 className="text-white fw-light">
            <span className="fw-bold">Get Into Your Dream College</span>
          </h1>

          <p className="lead text-white opacity-75">
            Resolvely uses personalized college counseling, interactive
            learning, and community networking to help you navigate the college
            admissions process.
          </p>
          <Button
            as={Link}
            variant="outline-light"
            size="lg"
            className="border-2 rounded-pill mt-4 fs-0 py-2"
            to="register"
          >
            Let&apos;s get started
            <FontAwesomeIcon icon="play" transform="shrink-6 down-1 right-5" />
          </Button>
        </Col>
        <Col
          xl={{ span: 7, offset: 1 }}
          className="align-self-end mt-4 mt-xl-0"
        >
          <video
            className="img-fluid"
            src={video1}
            controls
            style={{ marginBottom: "100px" }}
          ></video>
        </Col>
      </Row>
    </Section>
  );
};
export default Hero;
