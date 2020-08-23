import React, { useState, useEffect } from "react";
import Header from "../Header";
import NumberStudents from "./NumberStudents";
import MagicSkills from "./MagicSkills";
import EnrollmentDatePicker from "./DatePicker";
import { getStudents } from "../../lib/StudentAPI.js";
import "../../css/Dashboard.css";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [numStudentsEnrolledOnDate, setNumStudentsEnrolledOnDate] = useState(0);

  useEffect(() => {
    async function getStudentsFromServer() {
      let students = await getStudents();
      setStudents(students);
    }
    getStudentsFromServer();
  }, []);

  return (
    <>
    <div className="box">
      <Header header="Dashboard" />
      <h2 className="dashboard-header">
        Number of Students Enrolled at Hogwarts
      </h2>
      <NumberStudents students={students} />

      <h2 className="dashboard-header">
        Number of Students Enrolled on
        <span>
          <EnrollmentDatePicker
            handleNumStudents={(students) => {
              setNumStudentsEnrolledOnDate(students);
            }}
          />
        </span>
      </h2>
      <h2>{numStudentsEnrolledOnDate}</h2>
      <h2 className="dashboard-header">
        Number of Students with Each Magic Skill
      </h2>
      </div>
      <MagicSkills students={students} />
    </>
  );
}

export default Dashboard;
