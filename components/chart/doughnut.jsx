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
  return (
      <Doughnut data={Chartdata} />
  );
}

export default React.memo(DoughnutChart);
