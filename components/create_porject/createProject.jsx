import React from 'react';
import ProjectInfo from '../project_info/projectInfo';
import styles from './create_project.module.css';

const CreateProject = ({ openForm, sortedData, openFormForProject, setUpdate, update }) => {
    let cnt = 0;
    return (
        <div className={styles.projectAll}>
            <div className={styles.createProject}>
                <h2>프로젝트를 새로 시작해보세요</h2>
                <p className={styles.text}>현재 진행중인 프로젝트 총 현황을 파악하고 새로운<br></br>프로젝트를 진행해보세요</p>
                <div className={styles.newProject}>
                    <button className={styles.newProjectBtn}
                        onClick={openFormForProject}>
                        <span className={styles.btnImg}>+</span>
                        <span className={styles.btnText}>CREATE NEW PROJECT</span>
                    </button>
                </div>
            </div>

            <div className={styles.project}>
                {sortedData && sortedData.map((item) => {
                    if (cnt === 3)
                        return;
                    cnt++;
                    return <ProjectInfo key={item.projectID} id={item.projectID} data={item} openForm={openForm} setUpdate={setUpdate} update={update}/> 
                })}
            </div>
        </div>
    )
};

export default React.memo(CreateProject);