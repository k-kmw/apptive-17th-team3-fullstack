import React, {useEffect, useState} from 'react'
import styles from "./ProjectInfoRow.module.css"
import axios from 'axios';


function ProjectInfoRow({ data }) {
  const [status, setStatus] = useState('작업 전');
  const [statusIndex, setStatusIndex] = useState(0);
  const [statusList, setStatusList] = useState(['작업 중', '완료', '만료', '작업 전']);
  const [statusColorList, setStatusColorList] = useState(['#3E9FFF', '#87FF3E', '#FF3E3E', '#FF8F3E']);
  const [statusColor, setStatusColor] = useState('#FF8F3E');
    // console.log(data);
    const title = data.summary; // string으로 저장
    const start =  data.start.dateTime.split('-'); //[2022,12,30]
    const end = data.end.dateTime.split('-');

  const changeStatus = async (id, projectID) => {
    if (statusIndex == 3) {
      setStatusIndex(0);
    }
    const res = await axios.patch('http://localhost:4000/api/e/status_update', {
      projectID: projectID,
      eventID: id,
      status: statusList[statusIndex],
    })
    // console.log(statusList[i]);
    setStatus(statusList[statusIndex]);
    setStatusIndex(prev => prev + 1)
    setStatusColor(statusColorList[statusIndex]);
  }
  // console.log(data);
    return(
      <div className={styles.ProjectInfoRow}>
            <div className={styles.title}><span>{title}</span></div>     
            <div className={styles.start}><span>{start[0]}년 {start[1]}월 {start[2].slice(0,2)}일</span></div>
            <div className={styles.end}><span>{end[0]}년 {end[1]}월 {end[2].slice(0,2)}일</span></div>
        <div className={styles.status}>
          {status && <span onClick={() => changeStatus(data.id, data.projectID)}
            style={{ cursor: 'pointer', color: statusColor, fontWeight: '700', fontSize: '16px' }}>{status}</span>}
        </div>
      </div>
    );
}

export default React.memo(ProjectInfoRow); 
