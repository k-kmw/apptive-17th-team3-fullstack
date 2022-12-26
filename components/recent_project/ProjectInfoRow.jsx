import React, {useEffect, useState} from 'react'
import styles from "./ProjectInfoRow.module.css"
import axios from 'axios';


function ProjectInfoRow({data}) {
    // console.log(data);
    const title = data.summary; // string으로 저장
    const start =  data.start.dateTime.split('-'); //[2022,12,30]
    const end = data.end.dateTime.split('-');
    
  //  console.log(data);
    let statusColor = '#3E9FFF';
    let status = '완료'
    //왜 안되는거
    const index = () => {
      if(data.status=='confirmed'){ 
        status = '완료'
        statusColor = '#3E9FFF'
      }else if(data.status =='작업중'){
        status = '작업 중'
        statusColor = '#3E9FFF'
      }else if(data.status =='작업전'){
        status = '작업 전'
        statusColor = '#3E9FFF'
      }else{
        status = '만료'
        statusColor = '#3E9FFF'
      }
    }

  const status2 = ['완료', '작업 중', '작업 전', '만료'];
  let i=0;
  const changeStatus = async (id, projectID) => {
    if (i == 4) {
      i = 0
    }
    const res = await axios.patch('http://localhost:4000/api/e/status_update', {
      projectID: projectID,
      eventID: id,
      status: 'test',
    })
      .then(res => {
        console.log(res);
    })
    i += 1;
  }
  console.log(data);
    return(
      <div className={styles.ProjectInfoRow}>
            <div className={styles.title}><span>{title}</span></div>     
            <div className={styles.start}><span>{start[0]}년 {start[1]}월 {start[2].slice(0,2)}일</span></div>
            <div className={styles.end}><span>{end[0]}년 {end[1]}월 {end[2].slice(0,2)}일</span></div>
            <div className={styles.status}><span onClick={() => changeStatus(data.id, data.projectID)} style={{color:statusColor, fontWeight:'700',fontSize: '16px'}}>{status}</span></div>
      </div>
    );
}

export default React.memo(ProjectInfoRow); 
