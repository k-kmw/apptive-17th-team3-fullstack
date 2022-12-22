import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './projectInfo.module.css'

const ProjectInfo = ({ id, openForm, data }) => {
    const [projectInfo, setProjectInfo] = useState();
    const getProjectInfo = async () => {
        const encoded_url = encodeURIComponent(id);
        // const res = await axios.get(`http://localhost:4000/api/p/events?projectID=${encoded_url}`);

        fetch(`/api/p/events?projectID=${encoded_url}`)
            .then((response) => response.json())
            .then((data) => setProjectInfo(data));
        
        // console.log(res.data);
        // console.log(test_res);
        
        // setProjectInfo(res.data);
    }
    useEffect(() => {
        getProjectInfo();
    }, [])
    // projectInfo && console.log('project', projectInfo.lists.length);
    return (
        <div className={styles.info}>
            <p className={styles.title}>{data && data.title}</p>
            <button className={styles.btn} onClick={(e) => openForm(data.title, data.projectID, e)}>+ 일정 추가하기</button>
            <div className={styles.completion}>
                <div className={styles.completionText}>
                    <span>Completion</span>
                    <span>{projectInfo && projectInfo.percent}%</span>
                </div>
                <div className={styles.completionBar}>
                    <div className={styles.completionValue} style={{width: `${projectInfo && projectInfo.percent}%`}}></div>
                </div>
            </div>            
        </div>
    )
}

export default React.memo(ProjectInfo);