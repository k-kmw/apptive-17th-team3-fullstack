import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({numOfSchedule, colors, nums }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const label = numOfSchedule && numOfSchedule.map((item) => item.title)
  const borderColor = colors.map(color => color.replace(0.2, 1));

  const Chartdata = {
  labels: label,
  datasets: [
    {
      label: '# of Schedule',
      data: nums,
      backgroundColor: colors,
      borderColor: borderColor,
      borderWidth: 1,
    },
  ],
  };
    const options ={
    responsive : true,
    plugins: {
      legend: {
          labels: {
              // This more specific font property overrides the global property
              font: {size: 10},
              padding : 10,
          }, 
          position : "bottom"
      }
      },
    maintainAspectRatio: true,
  }

  return (
      <Doughnut data={Chartdata} options={options}/>
  );
}

export default React.memo(DoughnutChart);
