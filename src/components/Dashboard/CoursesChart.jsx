// import React, { useState, useEffect } from "react";
// import { getStudentsInEachCourse } from "../../lib/StudentAPI.js";
// import {Doughnut} from 'react-chartjs-2';
// import "../../css/ChartMagicSkills.css";

// function Courses(props) {
//   const [chartData, setChartData] = useState();

//   useEffect(() => {
//     async function getStudentSkillsFromServer() {
//       let response = await getStudentsInEachCourse();
//       let courses = response.data;
//       let keys = Object.keys(courses);
//       let values = Object.values(courses);
//       setChartData({
//         labels: keys,
//         datasets: [
//           {
//             label: "Number of students in each course",
//             data: values,
//             backgroundColor: [
//               '#B21F00',
//               '#C9DE00',
//               '#2FDE00',
//               '#00A6B4',
//               '#FF1333',
//               '#FA8072',
//               '	#6A5ACD'
//             ],
//           },
//         ],
//       });
//     }
//     getStudentSkillsFromServer();
//   }, [props.students]);

//   return (
//     <>
//       <div className="chart">
//       <Doughnut
//           data={chartData}
//           options={{
//             title:{
//               display:true,
//               text:'Number of students in each course',
//               fontSize:25,
//             },
//             legend:{
//               display:true,
//               position:'top'
//             }
//           }}
//         />
//       </div>
//     </>
//   );
// }

// export default Courses;
