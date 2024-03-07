import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import book from "./open-book.png";
import science from "./experiment (1).png";
import pencil from "./pencil.png";
import PropTypes from "prop-types";
import quiz from "./quizSvg.png";
import lock from "./lockedpng.png";
import { useNavigate } from "react-router-dom";

const DashRoadMap = ({ currentUser, moduleDetails, isCurrent }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({
    allTasks: [{
      dateCreated: "",
      dateModified: "",
      description: "",
      duration: "",
      id: 0,
      imageUrl: "",
      moduleId: 0,
      name: "",
      sortOrder: "",
      status: "",
      title: "",
      typeId: 0,
    },],
    mappedTasks: [],
  });

  useEffect(() => {
    setTasks((prevState) => {
      let tempTasks = { ...prevState };
      if (moduleDetails.tasks !== null) {
        tempTasks.allTasks =moduleDetails.tasks
      }
      tempTasks.mappedTasks = tempTasks.allTasks.map(mapTasks);
      return tempTasks;
    });
  }, []);

  const goToTask = (taskTarget) => {
    let taskId = taskTarget.target.id;
    navigate(`/task/details/${taskId}`);
  };

  const mapTasks = (aTask, index) => {
    let customClass = "button-cols";

    switch (index) {
      case 0:
        customClass += " task-left";
        break;
      case 1:
        customClass += " task-mid";
        break;
      case 2:
        customClass += " task-right";
        break;
      case 3:
        customClass += " task-mid";
        break;
      case 4:
        customClass += " task-left";
        break;
      case 5:
        customClass += " task-mid";
        break;
      default:
        customClass += " task-mid";
    }

    const chooseBtnImg = (taskType) => {
      const svgs = {
        Basic: pencil,
        Blog: book,
        Quiz: quiz,
      };

      let customSvg = svgs[taskType] || science;
      return customSvg;
    };

    return (
      <Col lg={10} className={customClass}>
        <button
          type="button"
          className="button-route"
          id={aTask.id}
          onClick={goToTask}
          disabled={!isCurrent}
        >
          {index === 0 && isCurrent && (
            <img
              alt=""
              className="dash-profile-img start object-fit-cover ratio ratio-1x1"
              id={aTask.id}
              src={currentUser.avatarUrl}
            ></img>
          )}
          {index !== 0 && isCurrent && (
            <img alt="" id={aTask.id} src={chooseBtnImg(aTask.name)}></img>
          )}
          {!isCurrent && <img alt="" id={aTask.id} src={lock}></img>}
        </button>
      </Col>
    );
  };

  return (
    <div className="tasks-router">
      {!isCurrent && (
        <div className="route-title locked-module">
          <h5 className="">{moduleDetails.title}</h5>
          <img alt="" className="locked-module-img" src={lock}></img>
        </div>
      )}
      {isCurrent && (
        <div className="route-title ">
          <h5 className="">{moduleDetails.title}</h5>
        </div>
      )}
      <div className="tasks-container">
        <Row className="button-row">{tasks.mappedTasks}</Row>
      </div>
    </div>
  );
};

DashRoadMap.propTypes = {
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
  isCurrent: PropTypes.bool.isRequired,
  moduleDetails: PropTypes.shape({
    createdBy: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      avatarUrl: PropTypes.string.isRequired,
    }),
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    hasTasks: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    isDeleted: PropTypes.bool.isRequired,
    modifiedBy: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      avatarUrl: PropTypes.string.isRequired,
    }),
    sortOrder: PropTypes.number.isRequired,
    status: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        dateCreated: PropTypes.string.isRequired,
        dateModified: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        imageUrl: PropTypes.string,
        moduleId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        sortOrder: PropTypes.number.isRequired,
        statusName: PropTypes.string.isRequired,
        statusTypeId: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        typeId: PropTypes.number.isRequired,
      })
    ),

    title: PropTypes.string,
  }),
};

export default DashRoadMap;
