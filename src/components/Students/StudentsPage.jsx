import React, { useState, useEffect } from "react";
import Header from "../Header";
import StudentsList from "./StudentsList";
import { getStudents } from "../../lib/StudentAPI.js";

function StudentsPage() {
  const [students, setStudents] = useState();
  const [displayStudents, setDisplayStudents] = useState(false);

  useEffect(() => {
    async function getStudentsFromServer() {
      let students = await getStudents();
      setStudents(students);
      setDisplayStudents(true);
    }
    getStudentsFromServer();
  }, []);

  return (
    <div className="main">
      <Header header="Existing Students" />
      {displayStudents && <StudentsList students={students} />}
    </div>
  );
}
export default StudentsPage;
