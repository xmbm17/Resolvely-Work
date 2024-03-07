import React, { useEffect, useState } from "react";
import Avatar from "components/common/Avatar";
import { IoIosSettings } from "react-icons/io";
import { Button, Modal } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { updateBasicUserProfile } from "services/usersService";
import { toast } from "react-toastify";
import profileUpdateSchema from "components/schemas/studentDashboard";
import MyEvents from "components/events/MyEvents";

const SideComps = ({ currentUser }) => {
  const [percent] = useState(0.4);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  let updatedInfo = {};

  useEffect(() => {
    setUserInfo((prevState) => {
      let newUserInfo = { ...prevState };
      newUserInfo.firstName = currentUser.firstName;
      newUserInfo.lastName = currentUser.lastName;
      newUserInfo.email = currentUser.email;
      return newUserInfo;
    });
  }, []);

  const [modalShow, setModalShow] = React.useState(false);

  const handleSubmit = (values) => {
    updatedInfo = values;
    updateBasicUserProfile(values)
      .then(OnUpdateProfileSuccess)
      .catch(onUpdateProfileError);
  };

  const OnUpdateProfileSuccess = () => {
    setUserInfo((prevState) => {
      let newUserInfo = { ...prevState };
      newUserInfo.firstName = updatedInfo.firstName;
      newUserInfo.lastName = updatedInfo.lastName;
      newUserInfo.email = updatedInfo.email;
      return newUserInfo;
    });
    toast.success("Profile update was successful", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const onUpdateProfileError = (error) => {
    toast.error(
      `${error}Profile was not updated successfully, please try again`,
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  };
  return (
    <div className="side-container">
      <div className="user-card">
        <button
          type="button"
          className="user-btn"
          onClick={() => setModalShow(true)}
        >
          <IoIosSettings />
        </button>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Formik
            enableReinitialize={true}
            initialValues={userInfo}
            validationSchema={profileUpdateSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  User Settings
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  className="form-control"
                  name="firstName"
                ></Field>
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  className="form-control"
                  name="lastName"
                ></Field>
                <label htmlFor="email">Email</label>
                <Field
                  type="text"
                  className="form-control"
                  name="email"
                ></Field>
              </Modal.Body>
              <Modal.Footer>
                <Button type="button" href="/user/profilewizard">
                  Change Avatar
                </Button>
                <Button type="button" href="/forgot">
                  Change Password
                </Button>
                <Button type="submit">Submit</Button>
              </Modal.Footer>
            </Form>
          </Formik>
        </Modal>
        <div className="user-container">
          <div className="user-img">
            <Avatar src={currentUser.avatarUrl} rounded="circle" size="3xl" />
          </div>
          <div className="user-info">
            <h6>{`${userInfo.firstName} ${userInfo.lastName} `}</h6>
            <h6>{userInfo.email}</h6>
          </div>
        </div>
      </div>
      <div className="side-cards">
        <p className="progress-bar-title">Your monthly progress</p>
        <div className="gauge">
          <div className="gauge__body">
            <div
              className="gauge__fill"
              style={{ "--val2": `${percent / 2}turn` }}
            ></div>

            <div className="gauge__cover">
              {Math.round(percent * 100) + "%"}
            </div>
          </div>
        </div>
      </div>
      <MyEvents currentUser={currentUser}></MyEvents>
    </div>
  );
};

SideComps.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    role: PropTypes.string,
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.string,
    avatarUrl: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
};
export default SideComps;
