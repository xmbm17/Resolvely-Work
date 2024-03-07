import React, { useEffect, useState } from "react";
import "./dashboard.css";
import SideComps from "./SideComponents";
import PageHeader from "components/common/PageHeader";
import PropTypes from "prop-types";
import DashRoadMap from "./DashRoadMap";
import studentModuleService from "services/studentModuleService";
import toastr from "toastr";

const MainDash = ({ currentUser }) => {
  const [modules, setModules] = useState({
    arrayOfModuleInformation: [],
    mappedModules: [],
  });

  useEffect(() => {
    studentModuleService
      .GetAssignedStudentModules(currentUser.id)
      .then(onGetModuleIdSuccess)
      .catch(onGetModuleIdError);
  }, []);

  const onGetModuleIdSuccess = (response) => {
    setModules((prevState) => {
      let newMod = { ...prevState };
      newMod.arrayOfModuleInformation = response.items;
      newMod.mappedModules = newMod.arrayOfModuleInformation.map(mapModules);
      return newMod;
    });
  };

  const mapModules = (mod, index) => {
    return (
      <DashRoadMap
        key={mod.id}
        currentUser={currentUser}
        moduleDetails={mod}
        isCurrent={index === 0 ? true : false}
      ></DashRoadMap>
    );
  };

  const onGetModuleIdError = (error) => {
    toastr.error("Could not get modules please try again.", error);
  };

  return (
    <div className="container">
      <PageHeader title="Home" className="mb-3"></PageHeader>
      <div className="body-container">
        <div className="tasks-router">{modules.mappedModules}</div>
        <SideComps currentUser={currentUser}></SideComps>
      </div>
    </div>
  );
};
MainDash.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    mi: PropTypes.string,
    avatarUrl: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }),
};

export default MainDash;
