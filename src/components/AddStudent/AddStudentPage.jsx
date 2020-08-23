import React from "react";
import Header from "../Header";
import StudentForm from "./StudentForm";

function AddStudentPage() {
  return (
    <div className="main">
      <Header header="Enroll Student" />
      <StudentForm />
    </div>
  );
}

export default AddStudentPage;
