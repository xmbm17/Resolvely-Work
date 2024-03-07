import React from "react";
import stars from "./five-yellow-stars-customer-product-rating-icon-vector-31048456.png";
import Section from "components/common/Section";
import { Card, Col, Row } from "react-bootstrap";
import basicPerson4 from "assets/img/team/17.jpg";
import basicPerson3 from "assets/img/team/8.jpg";
import basicPerson2 from "assets/img/team/7.jpg";
import basicPerson from "assets/img/team/9.jpg";

const Reviews = () => (
  <Section
    overlay
    position="center top"
    className="bg-dark"
    data-bs-theme="light"
    style={{ padding: "70px" }}
  >
    <Row className="justify-content-center text-center">
      <Col
        style={{ display: "flex", alignItems: "center", justifyContent: "" }}
      >
        <div className="stars-text">
          <img alt="" src={stars}></img>
          <p>
            What people
            <br /> say about us
          </p>
        </div>
      </Col>
      <Col className="review-cols">
        <Card className="review-card">
          <Card.Text>
            Resolvely helped me boost my GPA and secure scholarships. Highly
            Recomended!
          </Card.Text>
          <Card.Body className="review-card-body">
            <Card.Img
              src={basicPerson}
              variant="bottom"
              className="review-img"
            />
            <div>
              <Card.Title as="h5">Randall Aguirre</Card.Title>
              <Card.Text style={{ width: "fit-content" }}>Harvard</Card.Text>
            </div>
          </Card.Body>
        </Card>

        <Card className="review-card">
          <Card.Text>
            I was so lost about what i wanted to do with my life.This platform
            helped me figure it out and I&apos;m so grateful.
          </Card.Text>
          <Card.Body className="review-card-body">
            <Card.Img
              src={basicPerson2}
              variant="bottom"
              className="review-img"
            />
            <div>
              <Card.Title as="h5">Altuğ GÜrkaynak</Card.Title>
              <Card.Text style={{ width: "fit-content" }}>
                Columbia University
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col className="review-cols second-col-cards">
        <Card className="review-card">
          <Card.Text>
            I used this platform to find my dream career as a software engineer.
            It was so helpful to have personalized guidance and interactive
            learning.
          </Card.Text>
          <Card.Body className="review-card-body">
            <Card.Img
              src={basicPerson3}
              variant="bottom"
              className="review-img"
            />
            <div>
              <Card.Title as="h5">Diana Mancia</Card.Title>
              <Card.Text style={{ width: "fit-content" }}>Stanford</Card.Text>
            </div>
          </Card.Body>
        </Card>
        <Card className="review-card">
          <Card.Text>
            I found my dream college using Resolvely.It&apos;s a game changer!
          </Card.Text>
          <Card.Body className="review-card-body">
            <Card.Img
              src={basicPerson4}
              variant="bottom"
              className="review-img"
            />
            <div>
              <Card.Title as="h5">Paula Vianna Kletzer</Card.Title>
              <Card.Text style={{ width: "fit-content" }}>
                University of California
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Section>
);

export default Reviews;
