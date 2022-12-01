import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import styles from './form.module.css'
import Hour from './hour';
import Minute from './minute';

function Form({projectID, projectName, closeForm, formRef}) {
  const [focus, setFocus] = useState(false);
  const [ischeckTime, setIscheckTime] = useState(false);

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


  return (
    <div className={styles.container}>
      <form action={projectName == null ? "http://localhost:4000/api/p/insert" : "http://localhost:4000/api/e/insert"}
        method="POST" className={styles.project_form} ref={formRef}>
          <input type="hidden" name="projectID" value={projectID}/>
          {projectName && <input type="hidden" name="projectName" value={projectName} />}
          <label htmlFor="title" className={styles.text}>프로젝트 명</label>
          <input type="text" id='title' name='title'
          className={styles.input}
            required
            value={projectName !== null ? projectName : undefined}
            disabled = {projectName!==null ? true : false
            }
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