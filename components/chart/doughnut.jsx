import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import randomColor from 'randomcolor';

function DoughnutChart({ data, numOfSchedule }) {
    
  
    
  ChartJS.register(ArcElement, Tooltip, Legend);
  // console.log('p', data)
  const num = numOfSchedule && numOfSchedule.map((item) => item.num)
  const label = numOfSchedule && numOfSchedule.map((item) => item.title)
  const colors = []
  for (let i = 0; i < num.length; i++) {
    const color = randomColor({
      luminosity: 'dark',
      format: 'rgba',  
      alpha: 0.2,
    })
    colors.push(color)
  }
  const borderColor = colors.map(color => color.replace(0.2, 1));
  const Chartdata = {
  labels: label,
  datasets: [
    {
      label: '# of Schedule',
      data: num,
      backgroundColor: colors,
      borderColor: borderColor,
      borderWidth: 1,
    },
  ],
};
  return (
    <div style={{ width: '500px' }}>
      {<Doughnut data={Chartdata} />}
    </div>
  );
}

export default React.memo(DoughnutChart);
