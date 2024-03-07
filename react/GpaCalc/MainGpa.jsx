import React, { useEffect, useState } from "react";
import debug from "sabio-debug";
import gpaCalcService from "services/gpaCalcService";
import PageHeader from "components/common/PageHeader";
import lookUpService from "services/lookUpService";
import { mapLookUpItem } from "../../helpers/utils";
import "./calcgpa.css";
import GpaCard from "./CardGpa";
import GpaAccItem from "./GpaAccItem";
import { Accordion } from "react-bootstrap";

function GpaCalc() {
  const _logger = debug.extend("Calculator");
  const [activeLevel, setActiveLevel] = useState(1);
  const [Calculator, setCalculator] = useState({
    data: [
      {
        levelTypeId: activeLevel,
        courseId: "",
        gradeTypeId: "",
        courseWeightTypeId: "",
        credits: "",
        semester: 1,
      },
    ],
    components: [],
  });
  const [lookUps, setLookUps] = useState({
    levelTypes: [],
    mappedLevelTypes: [],
  });

  useEffect(() => {
    lookUpService
      .lookUp(["LevelTypes"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, []);

  useEffect(() => {
    gpaCalcService.getAll().then(onGetAllSuccess).catch(onGetAllError);
  }, []);

  useEffect(() => {
    setCalculator((prev) => {
      const clone = { ...prev };
      clone.components = clone.data.filter(
        (object) => object.levelTypeId === activeLevel
      );
      return clone;
    });
  }, [activeLevel]);

  const onRowAdded = () => {
    gpaCalcService.getAll().then(onGetAllSuccess).catch(onGetAllError);
  };

  const onGetAllSuccess = (response) => {
    if (response.items !== null) {
      setCalculator((prevState) => {
        let newObj = { ...prevState };
        newObj.data = response.items;
        newObj.components = newObj.data.filter(
          (obj) => obj.levelTypeId === activeLevel
        );
        return newObj;
      });
    }
  };
  const onGetAllError = (error) => {
    _logger("THIS ERROR:", error);
  };

  const onLookUpSuccess = (data) => {
    const { levelTypes } = data.item;
    setLookUps((prevState) => {
      let newInfo = { ...prevState };
      newInfo.levelTypes = levelTypes;
      newInfo.mappedLevelTypes = levelTypes.map(mapLookUpItem);
      return newInfo;
    });
  };

  const onLookUpError = (response) => {
    _logger("There was an error.", response);
  };

  const changeTabValue = (val) => {
    setActiveLevel(val);
  };

  return (
    <>
      <div className="container">
        <PageHeader title="GPA Calc">
          Enter the data below and see what your overall GPA is.
        </PageHeader>

        <div className="gpa-container">
          <Accordion defaultActiveKey={"0"} className="gpa-accordion-container">
            <Accordion.Item eventKey="0">
              <Accordion.Header
                onClick={() => {
                  changeTabValue(1);
                }}
              >
                {lookUps.mappedLevelTypes[0]}
              </Accordion.Header>
              <GpaAccItem
                calcComp={Calculator}
                onRowAddedHandler={onRowAdded}
                activeLevel={activeLevel}
              ></GpaAccItem>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header
                onClick={() => {
                  changeTabValue(2);
                }}
              >
                {lookUps.mappedLevelTypes[1]}
              </Accordion.Header>
              <GpaAccItem
                calcComp={Calculator}
                onRowAddedHandler={onRowAdded}
                activeLevel={activeLevel}
              ></GpaAccItem>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header
                onClick={() => {
                  changeTabValue(3);
                }}
              >
                {lookUps.mappedLevelTypes[2]}
              </Accordion.Header>
              <GpaAccItem
                calcComp={Calculator}
                onRowAddedHandler={onRowAdded}
                activeLevel={activeLevel}
              ></GpaAccItem>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header
                onClick={() => {
                  changeTabValue(4);
                }}
              >
                {lookUps.mappedLevelTypes[3]}
              </Accordion.Header>
              <GpaAccItem
                calcComp={Calculator}
                onRowAddedHandler={onRowAdded}
                activeLevel={activeLevel}
              ></GpaAccItem>
            </Accordion.Item>
          </Accordion>

          <GpaCard calcInfo={Calculator.data}></GpaCard>
        </div>
      </div>
    </>
  );
}

export default GpaCalc;
