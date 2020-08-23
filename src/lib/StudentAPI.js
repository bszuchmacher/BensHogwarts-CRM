import axios from "axios";

const baseURL = "http://127.0.0.1:5000";

export async function getStudents() {
  try {
    let response = await axios.get(`${baseURL}/students`);
    let students = response.data;
    for (let i = 0; i < students.length; i++) {
      let createDate = new Date(students[i].create_date);
      createDate =
        createDate.getMonth() +
        1 +
        "/" +
        createDate.getDate() +
        "/" +
        createDate.getFullYear();
      students[i].create_date = createDate;
      let lastUpdate = new Date(students[i].last_update_time);
      lastUpdate =
        lastUpdate.getMonth() +
        1 +
        "/" +
        lastUpdate.getDate() +
        "/" +
        lastUpdate.getFullYear() +
        " at " +
        lastUpdate.getHours() +
        ":" +
        lastUpdate.getMinutes(); 
      students[i].last_update_time = lastUpdate.toString();
    }

    return students;
  } catch (error) {
    return error.response;
  }
}

export async function getStudentById(studentId) {
  try {
    let response = await axios.get(`${baseURL}/student/${studentId}`);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function enrollStudent(
  first_name,
  last_name,
  existing_skills,
  desired_skills,
  courses
) {
  try {
    let response = await axios.post(`${baseURL}/student`, {
      first_name,
      last_name,
      existing_skills,
      desired_skills,
      courses,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateStudent(
  studentId,
  first_name,
  last_name,
  existing_skills,
  desired_skills,
  courses
) {
  try {
    let response = await axios.post(
      `${baseURL}/student/update_student/${studentId}`,
      {
        first_name,
        last_name,
        existing_skills,
        desired_skills,
        courses,
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deleteStudent(studentId, deletePassword) {
  try {
    let response = await axios.delete(
      `${baseURL}/student/${studentId}?delete_key=${deletePassword}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getStudentSkills() {
  try {
    let response = await axios.get(`${baseURL}/students/skills`);
    return response;
  } catch (error) {}
}

export async function getStudentsInEachCourse() {
  try {
    let response = await axios.get(`${baseURL}/students/courses`);
    return response;
  } catch (error) {}
}

export async function getStudentsEnrolledOnDate(date) {
  try {
    let response = await axios.get(`${baseURL}/students?date=${date}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
