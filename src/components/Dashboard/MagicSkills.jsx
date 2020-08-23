import React, { useState, useEffect } from "react";
import { getStudentSkills } from "../../lib/StudentAPI.js";
import {Doughnut} from 'react-chartjs-2';
import "../../css/ChartMagicSkills.css";

function MagicSkills(props) {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    async function getStudentSkillsFromServer() {
      let response = await getStudentSkills();
      let skills = response.data;
      let keys = Object.keys(skills);
      let values = Object.values(skills);
      setChartData({
        labels: keys,
        datasets: [
          {
            label: "Number of students in each course",
            data: values,
            backgroundColor: [
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              '#FF1333',
              '#FA8072',
              '	#6A5ACD'
            ],
          },
        ],
      });
    }
    getStudentSkillsFromServer();
  }, [props.students]);

  return (
    <>
      <div className="chart">
      <Doughnut
          data={chartData}
          options={{
            title:{
              display:true,
              text:'Students By Skill',
              fontSize: 25,
            },
            legend:{
              display:true,
              position:'top'
            }
          }}
        />
      </div>
    </>
  );
}

export default MagicSkills;
