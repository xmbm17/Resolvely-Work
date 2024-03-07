import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import debug from "sabio-debug";
import { Button, Col, Row } from "react-bootstrap";
import emailService from "services/emailService";
import contactValidation from "components/schemas/contactUsSchema";
import toastr from "toastr";

const ContactForm = () => {
  const [email] = useState({
    firstName: "",
    lastName: "",
    from: "",
    email: "",
    subject: "",
    message: "",
  });
  const _logger = debug.extend("CF");

  const onSubmit = (values) => {
    let from = values.firstName + " " + values.lastName;

    values.from = from;

    emailService
      .sendContactEmail(values)
      .then(onSubmitSuccess)
      .catch(onSubmitError);
  };

  const onSubmitSuccess = (response) => {
    _logger("response success:", response);
    toastr.success("Email Sent Successfully, Thank you for contacting us.");
  };
  const onSubmitError = (error) => {
    _logger("response error:", error);
    toastr.error("Email could not be sent, please try again.");
  };

  return (
    <div className="bg-purple">
      <Formik
        enableReinitialize={true}
        initialValues={email}
        onSubmit={onSubmit}
        validationSchema={contactValidation}
      >
        <Form>
          <div className="card mx-auto p-2 email-box">
            <h3 className="text-center p-4" style={{ color: "white" }}>
              Contact Us
            </h3>
            <h5 className="text-center" style={{ color: "white" }}>
              Whether you have questions or you just want to say hello.
            </h5>
            <Row>
              <Col xs={6} className="form-group">
                <label className="contact-us-label" htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  className="form-control"
                  name="firstName"
                ></Field>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger"
                />
              </Col>
              <Col xs={6} className="form-group">
                <label className="contact-us-label" htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  className="form-control"
                  name="lastName"
                ></Field>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger"
                />
              </Col>
            </Row>

            <Row>
              <Col xs={6} className="form-group">
                <label className="contact-us-label" htmlFor="email">Email</label>
                <Field
                  className="form-control"
                  type="email"
                  name="email"
                ></Field>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </Col>
              <Col xs={6} className="form-group">
                <label className="contact-us-label" htmlFor="subject">Subject</label>
                <Field
                  className="form-control"
                  type="text"
                  name="subject"
                ></Field>
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-danger"
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} className="form-group">
                <label className="contact-us-label" htmlFor="message">Your Message</label>
                <Field
                  as="textarea"
                  className="form-control"
                  name="message"
                  rows={3}
                ></Field>
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-danger"
                />
              </Col>
            </Row>
            <hr />
            <Button id="submitBtn" type="submit" className="me-2 mb-1">
              Submit
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
