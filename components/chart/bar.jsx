import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, BarElement, Tooltip, Legend,LinearScale, Title, Ticks } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { bodyStreamToNodeStream } from 'next/dist/server/body-streams';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function BarChart({colors, dayOfSchedule}) {

  // 현재 날짜 불러오기
  let now = new Date();
  let todayMonth = (now.getMonth() + 1);
  let todayDate = now. getDate();
  let thisYear = now.getFullYear();
  // let todayMonth = 2;
  // let todayDate = 29;
  // let thisYear = 2020; 

  // 일주전 - 일주후 날짜만
  const xlabel = Array.from(Array(14).keys());
  let index = 0;
  for (let i =-7; i<7; i++){
    let crntDate = todayDate + i
    let crntMonth = todayMonth
    // console.log(crntDate)

    // 유효하지않은날짜 바꾸기
    if(crntDate<=0){
      if(crntMonth == 5 || crntMonth== 7 || crntMonth== 10 || crntMonth== 12 ){
        crntDate = 30-i-1;
      }else if(crntMonth == 3){
        if(thisYear%4 ==0){
          if(thisYear%400 != 0 && thisYear%100 == 0){ // 윤년 아닌경우
            crntDate = 28-i-1;
          }else{
            crntDate = 29-i-1; // 윤년
          }
        }
      }else{
        crntDate = 31-i-1;
      }      
    }else if((crntMonth == 4 || crntMonth== 6 || crntMonth== 9 || crntMonth== 11) && crntDate>30){
      crntDate = crntDate - 30;
    }else if(crntMonth == 2 && crntDate > 28){
      if(thisYear%4 ==0){
        if(thisYear%400 != 0 && thisYear%100 == 0){ // 윤년 아닌경우
          crntDate = crntDate - 28;
        }else if(crntDate != 29){
          crntDate = crntDate - 29; // 윤년
        }
      }
    }else if ((crntMonth == 1 || crntMonth== 3 || crntMonth== 5 || crntMonth== 7 || crntMonth == 8 || crntMonth== 10 || crntMonth== 12) && crntDate > 31){
      crntDate = crntDate - 31;
    }

    xlabel[index] = crntDate;
    index++;
  }
  // console.log(todayDate);
  // console.log(xlabel);
  
  let b= dayOfSchedule && dayOfSchedule.map((item) => 
    parseInt(item.end.dateTime.substring(8, 10)))
  const end = b.sort()
  //console.log(end)

  let d= dayOfSchedule && dayOfSchedule.map((item) => 
    parseInt(item.start.dateTime.substring(8, 10)))
  const start = d.sort()
  //console.log(start) // 2022-12-22이면 22만 들어감 

  const l = [];
  for(let i =0; i<start.length; i++){
    for(let j = start[i]; j<=end[i]; j++){
      l.push(j);
    }
  }

  //console.log(l);

  // ylabel값 세기 
  // xlabel의 날짜에 해당하는 일정의 수 추가 (인덱스맞춰서)
  const ylabel = Array.from(Array(14).keys(0))
  let max = 0
  for(let i =0; i<14; i++){
    const result = l.reduce((count, item) => item === xlabel[i]  ? count+=1 : count, 0 );
    ylabel[i] = result;
    if(max<result){
      max = result;
    }
  }
  // console.log(ylabel); 
  // console.log(max);
  

  //barchart 생성
  const data =  {
    labels: xlabel,
    datasets: [
      {
        type: 'bar',
        label: '# 프로젝트',
        backgroundColor: colors,
        data: ylabel,
        borderWidth: 1
      },
    ],
  };

  // barchart 속성
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
          labels: {
              // This more specific font property overrides the global property
              font: {size: 10},
              padding : 5,
          }, 
          position : "bottom"
      }
    },
    scales: {
      x: {
        grid :{
          display : false,
        },
        axios : "x",
        ticks : {
          padding : 0,
          font :{
            size : 10
          }
        }
      },
      y:{
        grid :{
          display : false
        },
        axios: "y",
        ticks : {
          padding : 0,
          font :{
            size : 10
          },
          stepSize:1
        }
      }
    },
  }
  return (
      <Bar options={options} type="line" data={data} style={{ width: '90%', height: "100%"}}/>
  );
};
  


export default React.memo(BarChart);