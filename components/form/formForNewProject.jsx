import React from 'react';
import styles from './formForNewProject.module.css';

const FormForNewProject = ({ closeFormForProject, formRef }) => {
    return (
        <div className={styles.container}>
            <form action="/api/p/insert" method="POST" className={styles.project_form} ref={formRef}>
                <label htmlFor="title" className={styles.text}>프로젝트 명</label>
                <input type="text" id='title' name='title' className={styles.input} required/>
                
                <label htmlFor="title" className={styles.text}>상세 작업 명</label>
                <input type="text" className={styles.input} id='description' name='description' />

                <div className={styles.btns}> 
                    <button className={styles.btn} style={{ backgroundColor: '#3E9FFF', color: 'white' }} >적용</button>      
                    <button className={styles.btn} style={{backgroundColor: '#F3F5F7'}} onClick={closeFormForProject}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default React.memo(FormForNewProject);