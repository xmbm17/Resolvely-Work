import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

function GpaCard({ calcInfo }) {
  useEffect(() => {
    totalGpa(calcInfo);
  }, [calcInfo]);

  const totalGpa = (numbers) => {
    if (numbers === null || numbers.length === 0) {
      return 0;
    } else {
      const credits = numbers
        .map((obj) => obj.credits)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
      const credLength = numbers.length;
      const grades = numbers.map((obj) => obj.gradeTypeId);
      const weight = numbers.map((obj) => obj.courseWeightTypeId);
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
        return 0;
      } else {
        return Math.round(res * 100) / 100;
      }
    }
  };

  return (
    <Card className="gpa-card">
      <Card.Body className="gpa-card-body">
        <Card.Title className="gpa-card-title">CGPA</Card.Title>
        <Card.Text className="gpa-card-text">{totalGpa(calcInfo)}</Card.Text>
      </Card.Body>
    </Card>
  );
}
GpaCard.propTypes = {
  calcInfo: PropTypes.arrayOf(
    PropTypes.shape({
      levelTypeId: PropTypes.number.isRequired,
      courseId: PropTypes.number.isRequired,
      gradeTypeId: PropTypes.number.isRequired,
      courseWeightTypeId: PropTypes.number.isRequired,
      credits: PropTypes.number.isRequired,
      semester: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default GpaCard;
