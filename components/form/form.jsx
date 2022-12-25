import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import styles from './form.module.css'
import Hour from './hour';
import Minute from './minute';

function Form({projectID, projectName, closeForm, formRef, projectTitleToIdObject, currentTime}) {
  const [focus, setFocus] = useState(false);
  const [ischeckTime, setIscheckTime] = useState(false);
  const [title, setTitle] = useState("");
  const [titleToID, setTitleToID] = useState();
  // selection custom
    const focusSelection = () => {
        setFocus(true);
    }

    const blurSelection = () => {
        setFocus(false);
  }
  
  // 하루종일 체크시 설정
  const checkAlltime = () => {
    setIscheckTime(!ischeckTime);
  }

  const titleChange = (e) => {
    setTitle(e.target.value);
  }

  useEffect(() => {
    if (projectID === '') {
      // console.log(projectTitleToIdObject[title]);
      setTitleToID(projectTitleToIdObject[title]);
      // console.log(projectID);
    }
  }, [title]);

  useEffect(() => {
    document.getElementById('start').value = currentTime && currentTime.toISOString().substring(0, 10);
    !projectName ? document.getElementById('end').value = currentTime && currentTime.toISOString().substring(0, 10) : null;
    document.getElementById('hour').value = currentTime && currentTime.getHours();
    if (currentTime && currentTime.getMinutes() % 5 !== 0) {
      document.getElementById('minute').value = currentTime && currentTime.getMinutes() - (currentTime && currentTime.getMinutes() % 5);
    } else {
      document.getElementById('minute').value = currentTime && currentTime.getMinutes();
    }
  }, [currentTime]);


  return (
    <div className={styles.container}>
      <form action="http://localhost:4000/api/e/insert" method="POST" className={styles.project_form} ref={formRef}>
          <input type="hidden" name="projectID" value={projectID === "" ? titleToID : projectID} />
          {/* {projectName && <input type="hidden" name="projectName" value={projectName} />} */}
          <label htmlFor="title" className={styles.text}>프로젝트 명</label>
          <input type="text" id='projectName' name="projectName"
          className={styles.input}
            required
            value={projectName ? projectName : null}
            disabled={projectName ? true : false}
            onChange={titleChange}
        />
        
        <label htmlFor="title" className={styles.text}>상세 작업 명</label>
        <input type="text" className={styles.input} id='title' name='title' />
        
        <div className={styles.allTime}>
            <label htmlFor="timeCheckbox" >하루종일</label>
            <input type="checkbox" id="allday" name="allday" onChange={checkAlltime}/>
        </div>
        
        <div className={styles.date}>
          <label htmlFor="start" style={{marginRight: '14px'}}>시작일</label>
          <input className={styles.inputDate} type="date" id='start' name="start" />
        </div>
        
        <div className={styles.time}>
            <Hour ischeckTime={ischeckTime}/>
            <Minute ischeckTime={ischeckTime} />
        </div>        
        
        <div className={styles.date}>
          <label htmlFor="end" style={{marginRight: '14px'}}>종료일</label>            
          <input className={styles.inputDate} type="date" id='end' name="end" />
        </div>
        
            <div className={styles.time}>
                <Hour ischeckTime={ischeckTime}/>
                <Minute ischeckTime={ischeckTime} />          
            </div>                  
            <label htmlFor="description" className={styles.text}>메모</label>      
        <textarea className={styles.memo} name="description" id="description" cols="30" rows="10"></textarea>
        
        <div className={styles.btns}> 
          <button className={styles.btn} style={{ backgroundColor: '#3E9FFF', color: 'white' }} >적용</button>      
          <button className={styles.btn} style={{backgroundColor: '#F3F5F7'}} onClick={closeForm}>취소</button>
        </div>
        </form>
    </div>
  );
}

export default React.memo(Form);