import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import calcSchema from "schemas/gpaCalcSchema";
import "./calcgpa.css";
import debug from "sabio-debug";
import lookUpService from "services/lookUpService";
import { mapLookUpItem } from "../../helpers/utils";
import PropTypes from "prop-types";
import gpaCalcService from "services/gpaCalcService";
import SubtleBadge from "components/common/SubtleBadge";

function GpaAccItem({ calcComp, onRowAddedHandler, activeLevel }) {
  const _logger = debug.extend("Calculator");

  const [lookUps, setLookUps] = useState({
    courses: [],
    mappedCourses: [],
    gradeTypes: [],
    mappedGradeTypes: [],
    courseWeight: [],
    mappedCourseWeight: [],
  });

  useEffect(() => {
    lookUpService
      .lookUp(["CourseName", "GradeTypes", "CourseWeight"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, []);

  const onLookUpSuccess = (data) => {
    const { courseName, gradeTypes, courseWeight } = data.item;
    setLookUps((prevState) => {
      let newInfo = { ...prevState };
      newInfo.courses = courseName;
      newInfo.mappedCourses = courseName.map(mapLookUpItem);
      newInfo.gradeTypes = gradeTypes;
      newInfo.mappedGradeTypes = gradeTypes.map(mapLookUpItem);
      newInfo.courseWeight = courseWeight;
      newInfo.mappedCourseWeight = courseWeight.map(mapLookUpItem);
      return newInfo;
    });
  };

  const onLookUpError = (response) => {
    _logger("There was an error.", response);
  };

  const onSubmit = (values) => {
    const newObj = {
      gpaCalc: values.components,
    };
    gpaCalcService.addRow(newObj).then(oAddRowSuccess).catch(onSubmitError);
  };

  const oAddRowSuccess = (response) => {
    _logger(response, "response from submitting");
    onRowAddedHandler();
  };
  const onSubmitError = (error) => {
    _logger(error, "error from submitting");
  };

  const onDelete = (id) => {
    gpaCalcService.deleteRow(id).then(onDeleteSuccess).catch(onDeleteError);
  };
  const onDeleteSuccess = (response) => {
    _logger("response from deletion", response);
    onRowAddedHandler();
  };
  const onDeleteError = (error) => {
    _logger("deletion error", error);
  };

  const onUpdate = (values) => {
    gpaCalcService
      .update(values.id, values)
      .then(onUpdateSuccess)
      .catch(onUpdateError);
  };
  const onUpdateSuccess = (response) => {
    _logger(response, "OnUpdateSuccess");
    onRowAddedHandler();
  };
  const onUpdateError = (error) => {
    _logger(error, "OnUpdateError");
  };
  const totalGpa = (numbers) => {
    if (numbers.components === null || numbers.components.length === 0) {
      return "GPA: " + 0;
    } else {
      const credits = numbers.components
        .map((obj) => obj.credits)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
      const credLength = numbers.components.length;
      const grades = numbers.components.map((obj) => obj.gradeTypeId);
      const weight = numbers.components.map((obj) => obj.courseWeightTypeId);
      let gradeValue = 0;
      let total = 0;

      for (let i = 0; i < grades.length; i++) {
        const element = Number(grades[i]);

        if (element === 0) {
          gradeValue = 0;
        }
        if (element === 1) {
          gradeValue = 4.3;
        } else if (element === 2) {
          gradeValue = 4;
        } else if (element === 3) {
          gradeValue = 3.7;
        } else if (element === 4) {
          gradeValue = 3.3;
        } else if (element === 5) {
          gradeValue = 3;
        } else if (element === 6) {
          gradeValue = 2.7;
        } else if (element === 7) {
          gradeValue = 2.3;
        } else if (element === 8) {
          gradeValue = 2;
        } else if (element === 9) {
          gradeValue = 1.7;
        } else if (element === 10) {
          gradeValue = 1.3;
        } else if (element === 11) {
          gradeValue = 1;
        } else if (element === 12) {
          gradeValue = 0.7;
        } else if (element === 13) {
          gradeValue = 0;
        }

        total += gradeValue;
      }

      for (let i = 0; i < weight.length; i++) {
        const element = Number(weight[i]);
        if (element === 0) {
          gradeValue = 0;
        }
        if (element === 1) {
          gradeValue = 0;
        } else if (element === 2) {
          gradeValue = 0.5;
        } else {
          gradeValue = 1;
        }

        total += gradeValue;
      }

      let res = (total * credits) / credits / credLength;

      if (isNaN(res)) {
        return "GPA: " + 0;
      } else {
        return "GPA: " + Math.round(res * 100) / 100;
      }
    }
  };

  return (
    <Accordion.Body>
      <div className="row">
        <div className="col-12">
          <Formik
            enableReinitialize={true}
            initialValues={calcComp}
            onSubmit={onSubmit}
            validationSchema={calcSchema}
          >
            {({ values }) => (
              <Form>
                <div className="form-group">
                  <FieldArray name="components">
                    {({ push, remove }) => (
                      <div className="gpa-accordion-body">
                        {values.components &&
                          values.components.map((gpaRow, index) => (
                            <div className="row" key={index}>
                              <div className="row">
                                <div className="gpa-error-container">
                                  <div className="gpa-error-messages">
                                    <ErrorMessage
                                      name={`components.${index}.courseId`}
                                      component="label"
                                      className="form-label"
                                    />
                                  </div>

                                  <div className="gpa-error-messages">
                                    <ErrorMessage
                                      name={`components.${index}.gradeTypeId`}
                                      component="label"
                                      className="form-label "
                                    />
                                  </div>
                                  <div className="error-messages">
                                    <ErrorMessage
                                      name={`components.${index}.courseWeightTypeId`}
                                      component="label"
                                      className="form-label"
                                    />
                                  </div>
                                  <div className="gpa-error-messages">
                                    <ErrorMessage
                                      name={`components.${index}.credits`}
                                      component="label"
                                      className="form-label"
                                    />
                                  </div>
                                  <div className="gpa-error-messages">
                                    <ErrorMessage
                                      name={`components.${index}.semester`}
                                      component="label"
                                      className="form-label"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="gpa-accordion-inputs">
                                <div className="form-group">
                                  <label
                                    htmlFor={`components.${index}.courseId`}
                                    className="form-label"
                                  >
                                    Select Course
                                  </label>
                                  <Field
                                    component="select"
                                    name={`components.${index}.courseId`}
                                    className="gpa-error-messages-width"
                                  >
                                    <option label="Select Course"></option>
                                    {lookUps.mappedCourses}
                                  </Field>
                                </div>
                                <div className="form-group">
                                  <label
                                    htmlFor={`components.${index}.gradeTypeId`}
                                    className="form-label"
                                  >
                                    Grade Type
                                  </label>

                                  <Field
                                    component="select"
                                    name={`components.${index}.gradeTypeId`}
                                  >
                                    <option label="Select Grade"></option>
                                    {lookUps.mappedGradeTypes}
                                  </Field>
                                </div>
                                <div className="form-group">
                                  <label
                                    htmlFor={`components.${index}.courseWeightTypeId`}
                                    className="form-label"
                                  >
                                    Course Weight
                                  </label>
                                  <Field
                                    component="select"
                                    type="number"
                                    name={`components.${index}.courseWeightTypeId`}
                                  >
                                    <option label="Select Weight"></option>
                                    {lookUps.mappedCourseWeight}
                                  </Field>
                                </div>
                                <div className="form-group">
                                  <label
                                    htmlFor={`components.${index}.credits`}
                                    className="form-label"
                                  >
                                    Credits
                                  </label>
                                  <Field
                                    type="number"
                                    name={`components.${index}.credits`}
                                    placeholder="Enter Credits"
                                    className="gpa-error-messages-width"
                                  />
                                </div>
                                <div className="form-group">
                                  <label
                                    htmlFor={`components.${index}.semester`}
                                    className="form-label"
                                  >
                                    Semester
                                  </label>
                                  <Field
                                    as="select"
                                    name={`components.${index}.semester`}
                                    placeholder="Enter Semester"
                                    className="gpa-error-messages-width"
                                  >
                                    <option value={1}>First Semester</option>
                                    <option value={2}>Second Semester</option>
                                  </Field>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-info gpa-btn-small px-2"
                                  onClick={() => {
                                    remove(index);
                                    onDelete(values.components[index].id);
                                  }}
                                >
                                  <FontAwesomeIcon icon="fa-solid fa-trash" />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-info gpa-updateBtn gpa-btn-small py-2 px-2 "
                                  hidden={!values.components[index].id}
                                  onClick={() => {
                                    onUpdate(values.components[index]);
                                  }}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          ))}
                        <button
                          type="button"
                          className="btn btn-info gpa-submit-btn m-1"
                          onClick={() =>
                            push({
                              levelTypeId: activeLevel,
                              courseId: "",
                              gradeTypeId: "",
                              courseWeightTypeId: "",
                              credits: "",
                              semester: 1,
                            })
                          }
                        >
                          <FontAwesomeIcon icon="fa-solid fa-plus" />
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="gpa-total-submit-contianer">
                  <button type="submit" className="btn btn-info add-submit-btn">
                    Submit
                  </button>
                  <div>
                    <SubtleBadge bg="primary" className="me-2 gpa-pill-gpa">
                      {totalGpa(calcComp)}
                    </SubtleBadge>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Accordion.Body>
  );
}
GpaAccItem.propTypes = {
  calcComp: PropTypes.shape({
    components: PropTypes.arrayOf(
      PropTypes.shape({
        levelTypeId: PropTypes.number.isRequired,
        courseId: PropTypes.number.isRequired,
        gradeTypeId: PropTypes.number.isRequired,
        courseWeightTypeId: PropTypes.number.isRequired,
        credits: PropTypes.number.isRequired,
        semester: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  onRowAddedHandler: PropTypes.func.isRequired,
  activeLevel: PropTypes.number.isRequired,
};

export default GpaAccItem;
