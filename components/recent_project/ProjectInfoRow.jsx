import React, {useEffect, useState} from 'react'
import styles from "./ProjectInfoRow.module.css"
import axios from 'axios';


function ProjectInfoRow({ data, currentTime, setUpdate, update }) {
  const [status, setStatus] = useState('작업 전');
  const [statusIndex, setStatusIndex] = useState(0);
  const [statusList, setStatusList] = useState(['작업 중', '완료', '만료', '작업 전']);
  const [statusColorList, setStatusColorList] = useState(['#3E9FFF', '#87FF3E', '#FF3E3E', '#FF8F3E']);
  const [statusColor, setStatusColor] = useState('#FF8F3E');
    // console.log(data);
    const title = data.summary; // string으로 저장
    const start =  data.start.dateTime.split('-'); //[2022,12,30]
    const end = data.end.dateTime.split('-');

  useEffect(() => {
    if ((currentTime == data.end.dateTime) && (new Date(currentTime.getTime()+ 1000 * 60 * 60 * 9).toISOString().substring(11, 16) == '00:00')) {
      setStatus('만료');
      data.status = '만료';
    }
    else {
      setStatus(data.status);
    }
    if (!data.status) {
      setStatus('작업 전');
      data.status = '작업 전';
    }

    if (data.status == '작업 중') {
      setStatusColor('#3E9FFF');
    }
    else if (data.status == '완료') {
      setStatusColor('#87FF3E');
    }
    else if (data.status == '만료') {
      setStatusColor('#FF3E3E');
    }
    else if (data.status == '작업 전') {
      setStatusColor('#FF8F3E');
    }
    else {
      setStatusColor('black');
    }
  }, [])

  const changeStatus = async (id, projectID) => {
    if (statusIndex == 3) {
      setStatusIndex(-1);
    }
    await axios.patch('https://ancient-fjord-87078.herokuapp.com/api/e/status_update', {
      projectID: projectID,
      eventID: id,
      status: statusList[statusIndex],
    })
    setStatus(statusList[statusIndex]);
    setStatusIndex(prev => prev + 1)
    setStatusColor(statusColorList[statusIndex]);
    setUpdate({...update});
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
