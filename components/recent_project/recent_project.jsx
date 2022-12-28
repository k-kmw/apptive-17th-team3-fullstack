import React,{useEffect, useState} from 'react';
import styles from'../recent_project/recent_project.module.css';
import ProjectInfoRow from './ProjectInfoRow';
import axios from 'axios';

function RecentProject({currentTime, setUpdate, update, status}){
    let [data, setData] = useState([]);
    
    const getData = async() =>{
      const res = await axios.get(`/api/recent`);
      setData(res.data);
  }
  // console.log(data);
  useEffect(() => {
    if (status == 'authenticated') {
      getData(); // project 리스트 받아오기
    }
  }, [status, update]);

    let cnt = 0;
    return(
      <div className={styles.recentAll}>
          <div className={styles.title}>
              최근 작업
          </div>
            
          <div className={styles.columnName}>
              <span style={{width:"11.5%"}}>&nbsp;&nbsp;상태</span>
                <span style={{ width: "24%", marginRight: "3px"}}>마감일</span>
              <span style={{ width:"32%"}}>시작일</span>
              <span></span>
          </div> 

          <div className={styles.projectBox}>
          {data && data.map((item) => {
            if (cnt === 4)
              return;
            cnt++;
            return <ProjectInfoRow key= {item.id} data={item} currentTime={currentTime} setUpdate={setUpdate} update={update} />
              })}
          </div>
      </div>

    );
}

export default React.memo(RecentProject);